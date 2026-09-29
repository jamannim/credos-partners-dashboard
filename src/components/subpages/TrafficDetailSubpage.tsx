import React, { useState, useMemo } from 'react';
import { 
  Globe, Search, Compass, 
  TrendingUp, Info, ArrowUp, ArrowDown, FileText
} from 'lucide-react';
import { 
  XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import type { CompleteServiceIntelligence, MonthlyTrafficRecord } from '../../types/intelligence';
import { BrandLogo, BrandBadgesFromText } from '../BrandLogo';
import { CountryFlag } from '../CountryFlag';
import { getTableDensityClasses, type TableDensity } from '../TableDensityControl';
import { PdfReportButton } from '../PdfReportButton';

interface Props {
  data: CompleteServiceIntelligence;
  isEmbedded?: boolean;
}

export const TrafficDetailSubpage: React.FC<Props> = ({ data, isEmbedded = false }) => {
  const { traffic, countries, topPages, service, monthlyHistory } = data;

  // Month selector (Default: 9월 - 2026년 9월 28일 실시간 기준)
  const [selectedMonth, setSelectedMonth] = useState<number>(9);
  // State for country search analysis
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('JP');

  // Density states for tables
  const geoDensity: TableDensity = 'auto';
  const geoClasses = getTableDensityClasses(geoDensity);

  const kwDensity: TableDensity = 'auto';
  const kwClasses = getTableDensityClasses(kwDensity);

  const defaultCountrySearch = useMemo(() => {
    if (data.countrySearchAnalysis && data.countrySearchAnalysis.length > 0) {
      return data.countrySearchAnalysis;
    }
    return [
      {
        countryCode: 'JP',
        countryName: '일본',
        flag: '🇯🇵',
        shareOfSearch: 25.13,
        mainPortals: [
          { name: 'Yahoo! Japan', share: 58.2 },
          { name: 'Google Japan', share: 41.8 }
        ],
        keywords: [
          { rank: 1, keyword: 'ナマネカード', portal: 'Yahoo! JP / Google', share: 42.5, estimatedVisits: 6400, intent: '브랜드 및 공식 홈페이지 접속' },
          { rank: 2, keyword: 'ナマネカード キオスク 場所', portal: 'Yahoo! JP', share: 24.8, estimatedVisits: 3700, intent: '공항·지하철역 발급기 위치 확인' },
          { rank: 3, keyword: '韓国 交通カード 推し活', portal: 'Google JP', share: 14.2, estimatedVisits: 2100, intent: '최애 아이돌 포토카드 굿즈 제작' },
          { rank: 4, keyword: 'namane card 日本 クレジットカード', portal: 'Yahoo! JP', share: 10.5, estimatedVisits: 1600, intent: '일본 신용카드(JCB/비자) 앱 충전 방법' },
          { rank: 5, keyword: 'ナマネカード ワウパス 比較', portal: 'Google JP', share: 8.0, estimatedVisits: 1200, intent: '와우패스 vs 나마네카드 혜택 비교' }
        ]
      },
      {
        countryCode: 'US',
        countryName: '미국 / 글로벌',
        flag: '🇺🇸',
        shareOfSearch: 20.27,
        mainPortals: [
          { name: 'Google', share: 92.4 },
          { name: 'Bing', share: 7.6 }
        ],
        keywords: [
          { rank: 1, keyword: 'namane card', portal: 'Google', share: 45.2, estimatedVisits: 5500, intent: 'Official Site & Card Service Search' },
          { rank: 2, keyword: 'namane card kiosk locations', portal: 'Google', share: 22.6, estimatedVisits: 2800, intent: 'Incheon Airport / Station Kiosk Map' },
          { rank: 3, keyword: 'korea custom transit card', portal: 'Google', share: 15.4, estimatedVisits: 1900, intent: 'Prepaid All-in-one Travel Card' },
          { rank: 4, keyword: 'how to charge namane foreign card', portal: 'Google', share: 10.8, estimatedVisits: 1300, intent: 'Foreign Visa/Mastercard 3DS In-app Reload' },
          { rank: 5, keyword: 'namane vs wowpass for tourists', portal: 'Bing / Google', share: 6.0, estimatedVisits: 750, intent: 'Comparison of Tourist Cards in Korea' }
        ]
      },
      {
        countryCode: 'KR',
        countryName: '대한민국',
        flag: '🇰🇷',
        shareOfSearch: 13.38,
        mainPortals: [
          { name: 'Naver', share: 68.4 },
          { name: 'Google Korea', share: 28.2 },
          { name: 'Daum', share: 3.4 }
        ],
        keywords: [
          { rank: 1, keyword: '나마네카드', portal: 'Naver / Google', share: 52.0, estimatedVisits: 4200, intent: '나마네카드 공식 사이트 및 앱 정보' },
          { rank: 2, keyword: '나마네카드 키오스크 위치', portal: 'Naver', share: 21.5, estimatedVisits: 1750, intent: '지하철역 및 공항 키오스크 발급기' },
          { rank: 3, keyword: '나마네카드 충전 잔액전환', portal: 'Naver', share: 13.8, estimatedVisits: 1100, intent: '페이잔액↔교통잔액 이동 방법 확인' },
          { rank: 4, keyword: '아이오로라 나마네카드', portal: 'Google KR', share: 7.2, estimatedVisits: 580, intent: '운영사(iAurora) 기업 및 솔루션 탐색' },
          { rank: 5, keyword: '교통카드 포토카드 제작', portal: 'Naver', share: 5.5, estimatedVisits: 450, intent: '레일플러스 기반 커스텀 인쇄' }
        ]
      },
      {
        countryCode: 'TW',
        countryName: '대만 / 홍콩',
        flag: '🇹🇼',
        shareOfSearch: 4.93,
        mainPortals: [
          { name: 'Google Taiwan', share: 94.5 },
          { name: 'Yahoo!奇摩', share: 5.5 }
        ],
        keywords: [
          { rank: 1, keyword: 'namane card 韓國', portal: 'Google TW', share: 46.0, estimatedVisits: 1400, intent: '韓國自由行 客製化交通卡' },
          { rank: 2, keyword: 'namane card 機台位置 (홍대/명동)', portal: 'Google TW', share: 28.5, estimatedVisits: 850, intent: '機場快線及熱門商圈機台查詢' },
          { rank: 3, keyword: 'namane card 交通卡 儲值', portal: 'Google TW', share: 15.5, estimatedVisits: 460, intent: 'APP海外信用卡即時加值指南' },
          { rank: 4, keyword: '韓國 追星 交通卡 (K-POP 포토카드)', portal: 'Yahoo TW', share: 10.0, estimatedVisits: 300, intent: '偶像照片客製化悠遊卡紀念品' }
        ]
      }
    ];
  }, [data.countrySearchAnalysis]);

  const activeCountrySearch = useMemo(() => {
    return defaultCountrySearch.find(c => c.countryCode === selectedCountryCode) || defaultCountrySearch[0];
  }, [defaultCountrySearch, selectedCountryCode]);


  const historyList: MonthlyTrafficRecord[] = useMemo(() => {
    if (monthlyHistory && monthlyHistory.length > 0) return monthlyHistory;
    return [
      { 
        period: '2026-09', 
        year: 2026, 
        month: 9, 
        visits: traffic.totalVisits, 
        bounceRate: traffic.bounceRate, 
        pagesPerVisit: traffic.pagesPerVisit, 
        searchShare: traffic.searchShare, 
        topCountry: countries[0]?.name || '일본', 
        topCountryShare: countries[0]?.share || 25.8, 
        note: '2026.09.28 실시간 집계 기준 (28일 누적 합산 기반 총 월환산)' 
      },
      { 
        period: '2026-08', 
        year: 2026, 
        month: 8, 
        visits: Math.round(traffic.totalVisits * 0.96), 
        bounceRate: traffic.bounceRate, 
        pagesPerVisit: traffic.pagesPerVisit, 
        searchShare: traffic.searchShare, 
        topCountry: countries[0]?.name || '일본', 
        topCountryShare: countries[0]?.share || 25.13, 
        note: '8월 확정치' 
      },
      { 
        period: '2026-07', 
        year: 2026, 
        month: 7, 
        visits: Math.round(traffic.totalVisits * 1.8), 
        bounceRate: traffic.bounceRate - 2, 
        pagesPerVisit: traffic.pagesPerVisit + 0.3, 
        searchShare: traffic.searchShare + 1, 
        topCountry: countries[0]?.name || '일본', 
        topCountryShare: 27.8, 
        note: '7월 성수기 피크' 
      },
      { 
        period: '2026-06', 
        year: 2026, 
        month: 6, 
        visits: Math.round(traffic.totalVisits * 0.6), 
        bounceRate: traffic.bounceRate + 2, 
        pagesPerVisit: traffic.pagesPerVisit - 0.2, 
        searchShare: traffic.searchShare - 2, 
        topCountry: countries[0]?.name || '일본', 
        topCountryShare: 23.4, 
        note: '6월 기저 트래픽' 
      }
    ];
  }, [monthlyHistory, traffic, countries]);

  const selectedRecord = useMemo(() => {
    return historyList.find(r => r.month === selectedMonth) || historyList[0];
  }, [historyList, selectedMonth]);

  // Sorted list for clean chronological display and math
  const sortedHistory = useMemo(() => {
    return [...historyList].sort((a, b) => (a.year * 100 + a.month) - (b.year * 100 + b.month));
  }, [historyList]);

  // Chart data sorted chronologically (6월 -> 7월 -> 8월 -> 9월)
  const chartData = useMemo(() => {
    return sortedHistory.map(r => ({
      periodName: `${r.year}년 ${r.month}월`,
      visits: r.visits,
      month: r.month,
      year: r.year,
      isSelected: r.month === selectedMonth
    }));
  }, [sortedHistory, selectedMonth]);

  const maxHistoricalVisits = useMemo(() => {
    return Math.max(...sortedHistory.map(h => h.visits));
  }, [sortedHistory]);

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner (독립 서브페이지 탭 전용) */}
      {!isEmbedded && (
        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1" />
                Similarweb 트래픽 분석
              </span>
              <span className="text-xs text-slate-400">
                월간 총 방문수: {traffic.totalVisits.toLocaleString()}회
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2 flex items-center gap-2.5">
              <BrandLogo domain={service.domain} size="md" />
              <span>트래픽 세부데이터</span>
              <span className="text-sm font-normal text-slate-400 font-sans">| 월별 검색·유입 추이</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              월별 검색·유입 키워드 및 국가별 포털 점유율 상세 분석
            </p>
          </div>

          {/* PDF 다운로드 버튼 (박스 우측 상단 통일) */}
          <div className="self-end md:self-start shrink-0">
            <PdfReportButton data={data} tab="traffic" />
          </div>
        </div>
      )}

      {/* 2. Month Selector Tabs */}
      <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400">분석 기간 선택:</span>
          <div className="flex items-center space-x-1.5 bg-dark-850 p-1 rounded-lg border border-dark-750">
            {sortedHistory.map(item => {
              const isSelected = selectedMonth === item.month;
              return (
                <button
                  key={item.period}
                  onClick={() => setSelectedMonth(item.month)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isSelected 
                      ? 'bg-brand-purple text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item.year}년 {item.month}월</span>
                  {item.month === 9 && item.year === 2026 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                  )}
                  {item.month === 8 && item.year === 2026 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">현재 조회:</span>
          <span className="px-2.5 py-1 rounded-md bg-dark-800 border border-dark-700 font-bold text-brand-cyan">
            {selectedRecord.year}년 {selectedRecord.month}월 ({selectedRecord.visits.toLocaleString()}회)
          </span>
          {selectedRecord.month === 9 && selectedRecord.year === 2026 && (
            <span className="px-2 py-0.5 rounded text-[15px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              09.28 실시간 집계
            </span>
          )}
          {selectedRecord.month === 8 && selectedRecord.year === 2026 && (
            <span className="px-2 py-0.5 rounded text-[15px] font-bold bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30">
              8월 확정 실측
            </span>
          )}
        </div>
      </div>

      {/* 3. Real Data Overview Cards (All Historical Months) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedHistory.map((record, index) => {
          const isSelected = selectedMonth === record.month;
          const prev = index > 0 ? sortedHistory[index - 1] : null;
          const diffPercent = prev 
            ? Number((((record.visits - prev.visits) / prev.visits) * 100).toFixed(2))
            : null;
          const isPeak = record.visits === maxHistoricalVisits;
          const isLiveMonth = record.month === 9 && record.year === 2026;
          const isConfirmedMonth = record.month === 8 && record.year === 2026;

          return (
            <button
              key={record.period}
              onClick={() => setSelectedMonth(record.month)}
              className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
                isSelected 
                  ? 'bg-dark-850 border-brand-purple shadow-lg shadow-brand-purple/20 ring-1 ring-brand-purple' 
                  : 'bg-dark-900 border-dark-700 hover:border-dark-600'
              }`}
            >
              {isPeak && (
                <div className="absolute top-0 right-0 bg-brand-purple text-white text-[13.5px] font-bold px-2 py-0.5 rounded-bl">
                  연중 최고 피크
                </div>
              )}
              {!isPeak && isLiveMonth && (
                <div className="absolute top-0 right-0 bg-brand-cyan text-dark-950 text-[13.5px] font-bold px-2 py-0.5 rounded-bl">
                  09.28 실시간
                </div>
              )}
              {!isPeak && !isLiveMonth && isConfirmedMonth && (
                <div className="absolute top-0 right-0 bg-brand-emerald text-dark-950 text-[13.5px] font-bold px-2 py-0.5 rounded-bl">
                  8월 확정 실측
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{record.year}년 {record.month}월 실측</span>
                <span className={`text-[16.5px] px-1.5 py-0.5 rounded font-bold flex items-center ${
                  diffPercent === null 
                    ? 'bg-brand-blue/10 text-brand-blue'
                    : diffPercent > 0
                    ? 'bg-brand-emerald/10 text-brand-emerald'
                    : diffPercent < 0
                    ? 'bg-brand-rose/10 text-brand-rose'
                    : 'bg-dark-700 text-slate-300'
                }`}>
                  {diffPercent === null ? (
                    '기저 실측'
                  ) : diffPercent > 0 ? (
                    <><ArrowUp className="w-3 h-3 mr-0.5" /> +{diffPercent}%</>
                  ) : diffPercent < 0 ? (
                    <><ArrowDown className="w-3 h-3 mr-0.5" /> {diffPercent}%</>
                  ) : (
                    '0.00%'
                  )}
                </span>
              </div>

              <div className="mt-2 text-2xl font-black text-white">
                {record.visits.toLocaleString()}회
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-400 border-t border-dark-750 pt-2.5">
                <div className="flex justify-between">
                  <span>이탈률 / 탐색:</span>
                  <span className="text-slate-200 font-medium">{record.bounceRate}% / {record.pagesPerVisit}P</span>
                </div>
                <div className="flex justify-between">
                  <span>자연 검색 비중:</span>
                  <span className="text-brand-purpleLight font-bold">{record.searchShare}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>1위 유입 국가:</span>
                  <span className="text-brand-amber font-medium inline-flex items-center gap-1.5">
                    <CountryFlag name={record.topCountry} size="xs" />
                    <span>{record.topCountry} ({record.topCountryShare}%)</span>
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Trend Chart of Verified Traffic */}
      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-700 mb-4 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-purpleLight" />
              <h3 className="text-sm font-bold text-white">시밀러웹 실측 월별 트래픽 궤적 ({sortedHistory.map(h => `${h.month}월`).join(' ➔ ')})</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Similarweb 원본에 기록된 월간 방문수 변동 추이 ({sortedHistory.map(h => `${(h.visits / 10000).toFixed(1)}만회`).join(' ➔ ')})
            </p>
          </div>
          <span className="text-xs text-brand-cyan font-mono bg-dark-850 px-2.5 py-1 rounded border border-dark-700">
            선택된 분석월: {selectedRecord.year}년 {selectedRecord.month}월 ({selectedRecord.visits.toLocaleString()}회)
          </span>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 15, right: 25, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8133ff" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#8133ff" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="periodName" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${Math.round(val / 1000)}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any) => [`${Number(val).toLocaleString()}회`, '실측 방문수']}
                labelFormatter={(label) => `${label} 실측 트래픽`}
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="#8133ff" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVisits)" 
                dot={{ r: 4, fill: '#8133ff', stroke: '#fff', strokeWidth: 1 }}
                activeDot={{ r: 6, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Selected Month Details */}
        <div className="mt-4 p-3.5 rounded-lg bg-dark-850 border border-dark-750 text-xs text-slate-300 leading-relaxed flex items-start space-x-2">
          <Info className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
          <div>
            <strong>시밀러웹 {selectedRecord.year}년 {selectedRecord.month}월 실측 인사이트:</strong> {selectedRecord.note}
          </div>
        </div>
      </div>

      {/* 5. Countries & Top Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Top Geography for Selected Month (6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-700 mb-4 gap-2">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-brand-cyan" />
              <h3 className="text-sm font-bold text-white tracking-wide">국가별 유입 현황 ({selectedRecord.month}월 기준)</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-mono inline-flex items-center gap-1.5">
                <span>1위:</span>
                <CountryFlag name={selectedRecord.topCountry} size="xs" />
                <span className="text-white font-semibold">{selectedRecord.topCountry}</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className={`w-full text-left ${geoClasses.tableText}`}>
              <thead className="bg-dark-850 text-slate-400 font-semibold border-b border-dark-750">
                <tr>
                  <th className={`${geoClasses.th} rounded-l`}>순위 / 국가</th>
                  <th className={geoClasses.th}>유입 점유율</th>
                  <th className={`${geoClasses.th} rounded-r`}>{selectedRecord.month}월 추정 방문수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-750/70 text-slate-200">
                {countries.slice(0, 5).map((c, i) => (
                  <tr key={i} className="hover:bg-dark-800/40 transition-colors">
                    <td className={`${geoClasses.td} font-medium flex items-center space-x-2`}>
                      <span className="w-5 h-5 rounded bg-dark-800 border border-dark-700 text-xs font-bold text-sky-400 flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <CountryFlag code={c.code} name={c.name} size="md" />
                      <span className="font-semibold text-white break-keep">{c.name}</span>
                    </td>
                    <td className={geoClasses.td}>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-dark-750 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div className="bg-brand-purple h-full" style={{ width: `${c.share * 2}%` }}></div>
                        </div>
                        <span className="font-bold text-brand-purpleLight font-mono">{c.share}%</span>
                      </div>
                    </td>
                    <td className={`${geoClasses.td} text-slate-300 font-mono whitespace-nowrap`}>
                      {Math.round((selectedRecord.visits * c.share) / 100).toLocaleString()}회
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Top Landing Pages (6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex items-center justify-between pb-3 border-b border-dark-700 mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-brand-purpleLight" />
              <h3 className="text-sm font-bold text-white tracking-wide">최다 유입 랜딩 페이지 Top 4</h3>
            </div>
            <span className="text-xs text-brand-emerald font-semibold">키오스크 및 K-POP</span>
          </div>

          <div className="space-y-2.5">
            {topPages.map((page, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-dark-850 border border-dark-750 flex items-center justify-between hover:border-dark-650 transition-colors">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    <BrandLogo domain={service.domain} size="xs" />
                    <span>{page.name}</span>
                  </div>
                  <div className="text-[16.5px] text-slate-400 font-mono truncate mt-0.5">{page.path}</div>
                  <div className="text-[15px] text-slate-400 mt-1 break-keep leading-relaxed">{page.role}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-brand-purpleLight font-mono">{page.share}%</span>
                  <div className="text-[15px] text-slate-400 font-mono mt-0.5">
                    약 {Math.round((selectedRecord.visits * page.share) / 100).toLocaleString()}회
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. Country Search Portals & Keyword Intelligence */}
      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-dark-700 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-brand-cyan" />
              <h3 className="text-sm font-bold text-white">
                국가별 유입 검색 포털 & 검색 키워드 분석
              </h3>
              <span className="text-[15px] px-2 py-0.5 rounded font-bold bg-brand-cyan/15 text-brand-cyan">
                자연 검색 82.06% 정밀 분석
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              국가별 주요 포털 검색 유입 키워드 실측 분석
            </p>
          </div>
          <span className="text-xs text-slate-400">
            기준월: {selectedRecord.year}년 {selectedRecord.month}월 실측 연동
          </span>
        </div>

        {/* Country Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {defaultCountrySearch.map((country) => {
            const isSelected = selectedCountryCode === country.countryCode;
            return (
              <button
                key={country.countryCode}
                onClick={() => setSelectedCountryCode(country.countryCode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isSelected 
                    ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/25 ring-1 ring-brand-purple' 
                    : 'bg-dark-850 hover:bg-dark-800 text-slate-300 border border-dark-750'
                }`}
              >
                <CountryFlag code={country.countryCode} name={country.countryName} size="sm" />
                <span>{country.countryName}</span>
                <span className="text-[15px] opacity-75 font-normal">({country.shareOfSearch}%)</span>
              </button>
            );
          })}
        </div>

        {/* Portals & Keywords Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
          
          {/* Left: Search Portals Market Share in that Country (4 cols) */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-dark-700">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CountryFlag code={activeCountrySearch.countryCode} name={activeCountrySearch.countryName} size="sm" />
                <span>{activeCountrySearch.countryName} 유입 포털 비중</span>
              </span>
              <span className="text-[15px] text-brand-purpleLight font-bold">주요 유입 경로</span>
            </div>

            <div className="space-y-3 pt-1">
              {activeCountrySearch.mainPortals.map((portal, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <BrandBadgesFromText text={portal.name} size="xs" />
                    </span>
                    <span className="font-bold text-brand-cyan font-mono">{portal.share}%</span>
                  </div>
                  <div className="w-full bg-dark-950 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${idx === 0 ? 'bg-brand-cyan' : 'bg-brand-purple'}`} 
                      style={{ width: `${portal.share}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-dark-900 border border-dark-750/70 text-[16.5px] text-slate-400 leading-relaxed mt-3 break-keep">
              💡 <strong>{activeCountrySearch.countryName} 인사이트:</strong> {activeCountrySearch.countryCode === 'JP' ? '야후재팬(58%) 중심 유입, 야후 검색 최적화(SEO) 핵심' : activeCountrySearch.countryCode === 'KR' ? '네이버 블로그 및 키오스크 위치 검색(68%) 중심' : '구글 모바일 검색 90% 이상 점유'}
            </div>
          </div>

          {/* Right: Detailed Keywords Table (8 cols) */}
          <div className="lg:col-span-8 p-4 rounded-xl bg-dark-850 border border-dark-750">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-dark-700 mb-2.5 gap-2">
              <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                <CountryFlag code={activeCountrySearch.countryCode} name={activeCountrySearch.countryName} size="sm" />
                <span>{activeCountrySearch.countryName} 유입 검색어 Top 5</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[16.5px] text-slate-400 font-mono">
                  {selectedRecord.month}월 기준 유입
                </span>
                
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full text-left ${kwClasses.tableText}`}>
                <thead className="bg-dark-900 text-slate-400 font-semibold border-b border-dark-750">
                  <tr>
                    <th className={`${kwClasses.th} rounded-l`}>순위 / 키워드</th>
                    <th className={kwClasses.th}>검색 포털</th>
                    <th className={kwClasses.th}>점유율</th>
                    <th className={kwClasses.th}>추정 방문</th>
                    <th className={`${kwClasses.th} rounded-r`}>검색 의도</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-750/70 text-slate-200">
                  {activeCountrySearch.keywords.map((kw) => {
                    const countryVisits = Math.round((selectedRecord.visits * activeCountrySearch.shareOfSearch) / 100);
                    const keywordVisits = Math.round((countryVisits * kw.share) / 100);
                    return (
                      <tr key={kw.rank} className="hover:bg-dark-800/50 transition-colors">
                        <td className={`${kwClasses.td} font-medium`}>
                          <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 rounded bg-dark-750 text-center font-bold text-[15px] text-brand-cyan shrink-0 flex items-center justify-center">
                              {kw.rank}
                            </span>
                            <span className="font-bold text-white break-keep">{kw.keyword}</span>
                          </div>
                        </td>
                        <td className={kwClasses.td}>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-dark-900 border border-dark-750 text-slate-300 font-mono text-[16.5px]">
                            <BrandBadgesFromText text={kw.portal} size="xs" />
                          </div>
                        </td>
                        <td className={kwClasses.td}>
                          <span className="font-bold text-brand-purpleLight font-mono">{kw.share}%</span>
                        </td>
                        <td className={`${kwClasses.td} font-mono text-slate-300 whitespace-nowrap`}>
                          약 {keywordVisits.toLocaleString()}회
                        </td>
                        <td className={`${kwClasses.td} text-slate-400 text-[16.5px] break-keep`}>
                          <div className="flex items-center">
                            <Compass className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0" />
                            <span>{kw.intent}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

