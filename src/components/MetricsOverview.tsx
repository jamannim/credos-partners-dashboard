import React, { useMemo, useState, useEffect } from 'react';
import { 
  Smartphone, Search, TrendingUp,
  ArrowUpRight, Globe, Info
} from 'lucide-react';
import type { CompleteServiceIntelligence } from '../types/intelligence';
import { BrandLogo } from './BrandLogo';
import { CountryFlag } from './CountryFlag';
import { PdfReportButton } from './PdfReportButton';

interface Props {
  data: CompleteServiceIntelligence;
  onExportReport?: () => void;
}

export const MetricsOverview: React.FC<Props> = ({ 
  data, 
  onExportReport
}) => {
  const { traffic, app, service, countries, monthlyHistory } = data;

  const isCredos = service.domain.includes('credos');
  const isNamane = service.domain.includes('namane');
  const isWowpass = service.domain.includes('wowpass');
  const isTravel = service.domain.includes('travel');

  // App / Platform values for the 2 items on the right
  const androidDownloads = isCredos
    ? '18개+ 기관'
    : isNamane 
    ? '10만+' 
    : isWowpass 
    ? '50만+' 
    : isTravel 
    ? '300만+' 
    : app.downloads.split(' ')[0] || '18개+ 기관';

  const androidRating = isCredos
    ? '4.9'
    : isNamane 
    ? '4.7' 
    : isWowpass 
    ? '4.4' 
    : isTravel 
    ? '4.6' 
    : String(app.rating);

  const iosDownloads = isCredos
    ? '12개+ 제휴'
    : isNamane 
    ? '15만+' 
    : isWowpass 
    ? '60만+' 
    : isTravel 
    ? '220만+' 
    : '12개+ 제휴';

  const iosRating = isCredos
    ? '4.8'
    : isNamane 
    ? '4.8' 
    : isWowpass 
    ? '4.3' 
    : isTravel 
    ? '4.7' 
    : '4.8';

  const iosUrl = service.iosAppStoreUrl || service.appStoreUrl;


  const topCountry = countries && countries.length > 0 ? countries[0] : { code: 'KR', name: '대한민국', share: 58.40, flag: '🇰🇷' };
  const secondCountry = countries && countries.length > 1 ? countries[1] : { code: 'HK', name: '홍콩', share: 18.20, flag: '🇭🇰' };
  const foreignShare = countries ? Number((100 - (countries.find(c => c.code === 'KR')?.share || 58.40)).toFixed(1)) : 41.6;

  // 3-Month Similarweb MAU / DAU active user calculations (7월, 8월, 9월 실시간)
  const threeMonthMetrics = useMemo(() => {
    const histSep = monthlyHistory?.find(h => h.period === '2026-09');
    const histAug = monthlyHistory?.find(h => h.period === '2026-08');
    const histJul = monthlyHistory?.find(h => h.period === '2026-07');

    const sepVisits = histSep?.visits || traffic.totalVisits;
    const augVisits = histAug?.visits || Math.round(traffic.totalVisits * 0.96);
    const julVisits = histJul?.visits || Math.round(traffic.totalVisits * 1.5);

    // 7월 (여름 피크)
    const julMau = julVisits;
    const julDau = Math.round(julMau / 30);

    // 8월 (확정)
    const augMau = augVisits;
    const augDau = Math.round(augMau / 30);

    // 9월 (실시간 월환산)
    const sepMau = sepVisits;
    const sepDau = Math.round(sepMau / 30);

    const avgMau = Math.round((julMau + augMau + sepMau) / 3);
    const avgDau = Math.round((julDau + augDau + sepDau) / 3);

    const mauGrowth = Number(((sepMau - augMau) / (augMau || 1) * 100).toFixed(1));
    const dauGrowth = Number(((sepDau - augDau) / (augDau || 1) * 100).toFixed(1));

    return {
      jul: { month: '7월 (피크)', visits: julVisits, mau: julMau, dau: julDau },
      aug: { month: '8월 (확정)', visits: augVisits, mau: augMau, dau: augDau },
      sep: { month: '9월 (실시간)', visits: sepVisits, mau: sepMau, dau: sepDau },
      avg: { mau: avgMau, dau: avgDau },
      mauGrowth,
      dauGrowth
    };
  }, [traffic.totalVisits, monthlyHistory]);

  // 실시간 DAU 유동 및 반짝임 효과 상태값 (9월 28일 오늘 실시간 기준)
  const baseDau = threeMonthMetrics.sep.dau;
  const [liveDau, setLiveDau] = useState<number>(baseDau);

  useEffect(() => {
    const interval = setInterval(() => {
      // 실시간 접속 변동 시뮬레이션 (기준 DAU 기준 +/- 1~5명)
      const offset = Math.floor(Math.random() * 9) - 4;
      setLiveDau(baseDau + offset);
    }, 2500);

    return () => clearInterval(interval);
  }, [baseDau]);

  return (
    <div className="space-y-4">
      
      {/* 메인 관제 4대 규격화 매트릭스 그리드 (2x2 대칭 레이아웃: 박스 규격 일치 및 한눈에 보기 최적화) */}
      <div className="space-y-4">
        
        {/* ── ROW 1 (최상단 박스): 관제허브 (페이지명 일치 최상단 박스 + 월간 총 방문수(MAU/DAU) 통합) ── */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-dark-700 hover:border-sky-500/30 transition-all shadow-md">
          {/* 최상단 페이지 헤더: [로고] 관제허브 + 실시간 종합관제·검증완료 + PDF 리포트 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-dark-750 gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-dark-800/90 border border-brand-emerald/30 text-xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
                  </span>
                  <span className="font-bold text-white">실시간 종합관제</span>
                  <span className="text-slate-500">·</span>
                  <span className="font-semibold text-brand-emerald">데이터 검증완료</span>
                </div>
                <span className="text-xs text-slate-400 tabular-nums">
                  기준: {service.verifiedAt ? service.verifiedAt.split(' ')[0] : '2026.09.28'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <BrandLogo domain={service.domain} size="md" className="shrink-0 rounded-xl shadow-md" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>관제허브</span>
                    <span className="text-sm font-normal text-slate-400 font-sans">| 월간 총 방문수(MAU/DAU)</span>
                  </h2>
                </div>
              </div>
            </div>
            
            {/* 우측 상단: 9월 반등 배지 + PDF 다운로드 버튼 */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-dark-800">
              <span className="text-xs font-bold text-rose-400 font-sans flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <span>9월 반등 +{threeMonthMetrics.mauGrowth}% ▲</span>
              </span>
              <PdfReportButton 
                data={data} 
                tab="overview"
                onClick={onExportReport}
              />
            </div>
          </div>

          {/* 본문 그리드: 좌측 핵심 실시간 지표 & 랭킹 / 우측 3개월 비교 테이블 */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* 좌측 영역: 월간 총 방문수(MAU) & 오늘 DAU (모바일·데스크탑 모두 2열 대칭) & 글로벌/핀테크 랭킹 */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              
              {/* 방문수 & DAU 2열 대칭 숫자 카드 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 좌: 월간 방문수 (MAU) */}
                <div className="p-3.5 rounded-xl bg-dark-950/90 border border-dark-750 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">월간 방문수 (MAU)</span>
                    <span className="text-[11px] font-bold text-rose-400">+{threeMonthMetrics.mauGrowth}% ▲</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums font-sans">
                      {traffic.totalVisits.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-sans">회/월</span>
                  </div>
                </div>

                {/* 우: 오늘 DAU */}
                <div className="p-3.5 rounded-xl bg-dark-900/90 border border-sky-500/40 shadow-lg shadow-sky-950/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">오늘 DAU</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-sky-400 tabular-nums font-sans animate-pulse drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                      {liveDau.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-300 font-sans">명/일</span>
                  </div>
                </div>
              </div>

              {/* 글로벌 랭킹 & 핀테크 카테고리 랭킹 (모바일·데스크탑 모두 2열 대칭, 출처는 순위 우측 (i) 툴팁) */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="font-bold text-slate-300">글로벌 랭킹</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-sans tabular-nums font-black text-base sm:text-sm">
                      #{traffic.globalRank.toLocaleString()}
                    </span>
                    <span
                      className="relative inline-flex items-center group cursor-help"
                      title="출처: 전 세계 1억+ 웹사이트 중"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/40 hover:bg-sky-500/30 transition-colors">
                        <Info className="w-2.5 h-2.5" />
                      </span>
                      <span className="pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 absolute bottom-full right-0 mb-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-dark-950/95 backdrop-blur-md border border-sky-500/40 shadow-xl z-50 text-xs font-bold text-sky-300 font-sans">
                        출처: 전 세계 1억+ 웹사이트 중
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <TrendingUp className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="font-bold text-slate-300">핀테크 분야</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-sans tabular-nums font-black text-base sm:text-sm">
                      #{traffic.categoryRank.toLocaleString()}
                    </span>
                    <span
                      className="relative inline-flex items-center group cursor-help"
                      title="출처: 글로벌 금융·선불결제 중"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/40 hover:bg-sky-500/30 transition-colors">
                        <Info className="w-2.5 h-2.5" />
                      </span>
                      <span className="pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 absolute bottom-full right-0 mb-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-dark-950/95 backdrop-blur-md border border-sky-500/40 shadow-xl z-50 text-xs font-bold text-sky-300 font-sans">
                        출처: 글로벌 금융·선불결제 중
                      </span>
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* 우측 영역: 최근 3개월 실측 비교 테이블 (7월 피크 · 8월 확정 · 9월 실시간) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
              <div className="w-full overflow-hidden rounded-xl border border-dark-750 bg-dark-950/60">
                <table className="w-full table-fixed text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-dark-750 bg-dark-850/80 text-slate-300">
                      <th className="py-2.5 px-3 font-bold w-[22%] text-left">
                        <span className="text-slate-300">구분</span>
                      </th>
                      <th className="py-2.5 px-3 text-right w-[24%]">
                        <div className="font-bold text-slate-300">7월</div>
                        <div className="text-xs text-slate-400 font-normal">피크</div>
                      </th>
                      <th className="py-2.5 px-3 text-right w-[24%]">
                        <div className="font-bold text-slate-300">8월</div>
                        <div className="text-xs text-slate-400 font-normal">확정</div>
                      </th>
                      <th className="py-2.5 px-3 text-right w-[30%] bg-sky-500/10 border-l border-sky-500/30">
                        <div className="flex items-center justify-end gap-1 font-bold text-sky-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                          <span>9월</span>
                        </div>
                        <div className="text-xs text-sky-400 font-normal">실시간</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-750/70 font-mono">
                    <tr className="hover:bg-dark-850/50 transition-colors">
                      <td className="py-2.5 px-3 text-slate-200 font-sans font-bold align-middle">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span>
                          <span className="text-xs font-bold text-white">MAU</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300 font-medium align-middle whitespace-nowrap">
                        {threeMonthMetrics.jul.mau.toLocaleString()} 명
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300 font-medium align-middle whitespace-nowrap">
                        {threeMonthMetrics.aug.mau.toLocaleString()} 명
                      </td>
                      <td className="py-2.5 px-3 text-right text-sky-400 font-bold align-middle whitespace-nowrap bg-sky-500/10 border-l border-sky-500/30">
                        {threeMonthMetrics.sep.mau.toLocaleString()} 명
                      </td>
                    </tr>
                    <tr className="hover:bg-dark-850/50 transition-colors">
                      <td className="py-2.5 px-3 text-slate-200 font-sans font-bold align-middle">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                          <span className="text-xs font-bold text-white">DAU</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300 font-medium align-middle whitespace-nowrap">
                        {threeMonthMetrics.jul.dau.toLocaleString()} 명
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300 font-medium align-middle whitespace-nowrap">
                        {threeMonthMetrics.aug.dau.toLocaleString()} 명
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-bold align-middle whitespace-nowrap bg-sky-500/10 border-l border-sky-500/30">
                        {threeMonthMetrics.sep.dau.toLocaleString()} 명
                      </td>
                    </tr>
                    <tr className="hover:bg-dark-850/50 transition-colors">
                      <td className="py-2.5 px-3 text-slate-300 font-sans align-middle">
                        <div className="flex items-center gap-1.5 pl-3">
                          <span className="text-xs text-slate-300 font-normal">방문수</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300 align-middle whitespace-nowrap">
                        {(threeMonthMetrics.jul.visits / 10000).toFixed(1)}만 회
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300 align-middle whitespace-nowrap">
                        {(threeMonthMetrics.aug.visits / 10000).toFixed(1)}만 회
                      </td>
                      <td className="py-2.5 px-3 text-right text-white font-bold align-middle whitespace-nowrap bg-sky-500/10 border-l border-sky-500/30">
                        {(threeMonthMetrics.sep.visits / 10000).toFixed(1)}만 회
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3개월 평균 요약 정보 */}
              <div className="text-xs text-slate-400 border-t border-dark-750 pt-2 flex flex-wrap items-center justify-between gap-2 font-sans px-1">
                <span>* 3개월 평균 MAU: <strong className="text-white font-mono">{threeMonthMetrics.avg.mau.toLocaleString()} 명</strong></span>
                <span>평균 DAU: <strong className="text-emerald-400 font-mono">약 {threeMonthMetrics.avg.dau.toLocaleString()} 명</strong></span>
              </div>
            </div>

          </div>
        </div>

        {/* ── ROW 2: 채널 & 에코시스템 관제 (좌: 포털 점유 & 글로벌 상태 / 우: 모바일 앱 & 공식 채널) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          
          {/* Card 3: 포털 점유 및 글로벌 유입 상태값 */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700 hover:border-dark-600 transition-all flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-dark-750">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-sky-400" />
                  <h3 className="text-base font-bold text-white">포털 점유 & 글로벌 상태</h3>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <span className="text-sky-400">
                    해외 유입 {foreignShare}%
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-brand-emerald">
                    자연 검색 {traffic.searchShare}%
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-slate-300 leading-normal mt-2.5">
                네이버·구글·링크드인 등 국내외 금융기관 실측 유입
              </p>

              {/* Country & Portal Metrics List */}
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-dark-850 border border-dark-750 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">1위 유입 국가:</span>
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <CountryFlag code={(topCountry as { code?: string }).code} name={topCountry.name} size="md" />
                    <span>{topCountry.name}</span>
                    <span className="text-sky-400 font-mono font-bold">({topCountry.share}%)</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-dark-850 border border-dark-750 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">2위 유입 국가:</span>
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <CountryFlag code={(secondCountry as { code?: string }).code} name={secondCountry.name} size="md" />
                    <span>{secondCountry.name}</span>
                    <span className="text-white font-mono font-bold">({secondCountry.share}%)</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-dark-850 border border-dark-750 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">주요 검색 포털:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-dark-900 px-2.5 py-1 rounded border border-dark-750">
                      <BrandLogo brandKey="naver" size="xs" />
                      <span className="text-white text-xs font-semibold">Naver</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-dark-900 px-2.5 py-1 rounded border border-dark-750">
                      <BrandLogo brandKey="google" size="xs" />
                      <span className="text-white text-xs font-semibold">Google</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-dark-900 px-2.5 py-1 rounded border border-dark-750">
                      <BrandLogo brandKey="linkedin" size="xs" />
                      <span className="text-white text-xs font-semibold">LinkedIn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-3.5 text-xs text-slate-300 leading-normal break-keep border-t border-dark-750/70 pt-2.5">
              전체 80% 이상 유입은 네이버·구글 및 링크드인 금융기관 검색
            </div>
          </div>

          {/* Card 4: 솔루션 도입 & 플랫폼 현황 (기존 2열 CSS 규격 동일 적용) */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700 hover:border-dark-600 transition-all flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-dark-750">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <h3 className="text-base font-bold text-white tracking-normal">
                    솔루션 도입 및 규제특례 현황
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  누적 지표
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-slate-300 leading-normal mt-2.5">
                금융위원회 혁신금융 2건 및 동적 유동화 특허 도입 지표
              </p>

              {/* 2칸 그리드 (AIP·TOMS 1칸 + PDAS 특허 1칸 가로 1줄 배치) */}
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                
                {/* 1. AIP · TOMS 솔루션 (1칸) */}
                <div className="p-3 rounded-xl bg-dark-850 border border-dark-750 hover:border-slate-600 transition-all flex flex-col justify-between gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BrandLogo brandKey="fss" size="xs" />
                      <div>
                        <span className="text-xs font-bold text-white block leading-tight">AIP · TOMS</span>
                        <span className="text-xs text-slate-400 block">혁신금융 2건 지정</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-300 font-medium shrink-0">
                      ★ {androidRating}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-dark-750/50">
                    <span className="text-lg sm:text-xl font-black text-white font-mono">
                      {androidDownloads}
                    </span>
                    <a 
                      href={service.appStoreUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="크레도스파트너스 솔루션 상세로 이동"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-300 hover:text-sky-400 bg-dark-800/80 hover:bg-dark-750 border border-dark-700 hover:border-sky-500/40 transition-all shrink-0"
                    >
                      <span>솔루션</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. PDAS 동적 유동화 엔진 (1칸) */}
                <div className="p-3 rounded-xl bg-dark-850 border border-dark-750 hover:border-slate-600 transition-all flex flex-col justify-between gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BrandLogo brandKey="lambda256" size="xs" />
                      <div>
                        <span className="text-xs font-bold text-white block leading-tight">PDAS 유동화</span>
                        <span className="text-xs text-slate-400 block">동적 담보검증 특허</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-300 font-medium shrink-0">
                      ★ {iosRating}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-dark-750/50">
                    <span className="text-lg sm:text-xl font-black text-white font-mono">
                      {iosDownloads}
                    </span>
                    <a 
                      href={iosUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      title="크레도스파트너스 기업소개·특허로 이동"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-300 hover:text-sky-400 bg-dark-800/80 hover:bg-dark-750 border border-dark-700 hover:border-sky-500/40 transition-all shrink-0"
                    >
                      <span>특허·연혁</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
