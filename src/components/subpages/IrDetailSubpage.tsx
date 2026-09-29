import React, { useMemo, useState } from 'react';
import { 
  TrendingUp, ExternalLink, ShieldCheck, 
  Landmark, ArrowUpRight, Award, BarChart3,
  Flame, Users, Calculator, Wallet, HelpCircle,
  Server, Building, Receipt, Info, MapPin,
  Store, Coins, Sparkles, Building2, PieChart
} from 'lucide-react';
import { 
  ResponsiveContainer, ComposedChart, Bar, Line, 
  XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Cell 
} from 'recharts';
import type { CompleteServiceIntelligence, ShareholderItem } from '../../types/intelligence';
import { BrandLogo } from '../BrandLogo';
import { PdfReportButton } from '../PdfReportButton';

import type { SubViewId } from '../Header';

interface Props {
  data: CompleteServiceIntelligence;
  activeSubView?: SubViewId;
  onSubViewChange?: (subView: SubViewId) => void;
}

const tableClasses = {
  th: 'py-2.5 px-3 text-xs tracking-wider uppercase font-bold text-slate-400',
  td: 'py-2.5 px-3 text-sm font-normal text-slate-200',
  tableText: 'text-sm'
};

const defaultShareholders: ShareholderItem[] = [
  { id: 1, name: '장영수', role: '최대주주 (대표이사)', shareRatio: 32.0, shareText: '32.00%', companyName: '(주)아이오로라', companyDomain: 'namanecard.com', companyKey: 'iaurora', note: '설립자이자 총괄 대표이사, 경영권 지배지분 확보' },
  { id: 2, name: '김혜영', role: '특수관계인 (공동창업)', shareRatio: 19.2, shareText: '19.20%', companyName: '(주)아이오로라', companyDomain: 'namanecard.com', companyKey: 'iaurora', note: '특수관계인 및 초기 공동 설립 지분' },
  { id: 3, name: '김태성', role: '주요주주 (사내이사)', shareRatio: 16.0, shareText: '16.00%', companyName: '(주)아이오로라', companyDomain: 'namanecard.com', companyKey: 'iaurora', note: '사내 핵심 기술 및 경영진 지분' },
  { id: 4, name: '정혜윤', role: '주요주주', shareRatio: 12.8, shareText: '12.80%', companyName: '(주)아이오로라', companyDomain: 'namanecard.com', companyKey: 'iaurora', note: '전략적 엔젤 및 초기 사업 파트너' },
  { id: 5, name: 'CUI YINGSHUN', role: '해외 전략 투자자', shareRatio: 8.0, shareText: '8.00%', companyName: '글로벌 전략 파트너', companyDomain: 'alipay.com', companyKey: 'alipay', note: '중화권 및 아시아 결제 솔루션 제휴 전략 주주' },
  { 
    id: 6, 
    name: '주요 전략·기관 투자자', 
    role: '전략 및 기관투자자', 
    shareRatio: 12.0, 
    shareText: '12.00%', 
    companyName: '큐브엔터 · YG플러스 · IBK기업은행 · 키움인베스트 · 유안타증권 · 나이스정보통신', 
    companyDomain: 'cubeent.co.kr', 
    companyKey: 'cubeent', 
    partnerLogos: ['cubeent', 'ygplus', 'nicetcm', 'ibk', 'kiwoom', 'yuanta'],
    note: '엔터(큐브엔터·YG플러스)·VC·금융권 주요 기관 및 전략적 투자자 지분 (합계 100.0%)' 
  }
];

export const IrDetailSubpage: React.FC<Props> = ({ data, activeSubView, onSubViewChange }) => {
  const { service, irData } = data;
  const [localShowTrend, setLocalShowTrend] = useState<boolean>(false);

  const showFinancialTrend = activeSubView ? activeSubView === 'ir-trend' : localShowTrend;

  const toggleFinancialTrend = () => {
    const next = !showFinancialTrend;
    setLocalShowTrend(next);
    onSubViewChange?.(next ? 'ir-trend' : 'main');
  };

  // Fallback IR data for Namane if not present
  const ir = useMemo(() => {
    if (irData) {
      return {
        ...irData,
        shareholders: (irData.shareholders && irData.shareholders.length > 0) ? irData.shareholders : defaultShareholders
      };
    }
    return {
      companyName: '주식회사 아이오로라',
      businessNumber: '131-86-46100',
      companyAddress: '서울특별시 동작구 남부순환로 2033 (사당동 1048-3)',
      representative: '장영수',
      sourceName: 'NICE평가정보 (사람인 공식 재무제표)',
      sourceUrl: 'https://www.saramin.co.kr/zf_user/company-info/view-inner-finance?csn=clh4Y09qSG9Cc3MwQXphSU1QRjF1dz09',
      highlightNote: '25년 결산 매출 70.7억·영업이익 +3.1억, 26년 반기 매출 42.5억·영업이익 +4.8억 및 큐브엔터 30억 RCPS 유치',
      financialHistory: [
        { 
          year: 2022, 
          periodLabel: '22년',
          revenueWon: 31.3, 
          revenueText: '31.3억', 
          operatingProfitWon: -11.7, 
          operatingProfitText: '-11.7억', 
          netProfitWon: -11.8, 
          netProfitText: '-11.8억',
          employeeCount: 28,
          avgSalaryManwon: 4800,
          avgSalaryText: '4,800만',
          overheadMultiplier: 1.5,
          burnRateWon: 20.2,
          burnRateText: '20.2억',
          investmentWon: 25.0,
          investmentText: '25.0억',
          remainingBalanceWon: -6.9,
          remainingBalanceText: '-6.9억',
          cumulativeCashWon: 18.1,
          cumulativeCashText: '18.1억',
          statusNote: '초기 키오스크 R&D 및 인프라 구축기 (Seed/Pre-A 기반)'
        },
        { 
          year: 2023, 
          periodLabel: '23년',
          revenueWon: 33.3, 
          revenueText: '33.3억', 
          operatingProfitWon: -17.4, 
          operatingProfitText: '-17.4억', 
          netProfitWon: -18.6, 
          netProfitText: '-18.6억',
          employeeCount: 34,
          avgSalaryManwon: 5100,
          avgSalaryText: '5,100만',
          overheadMultiplier: 1.5,
          burnRateWon: 26.0,
          burnRateText: '26.0억',
          investmentWon: 55.0,
          investmentText: '55.0억',
          remainingBalanceWon: 11.6,
          remainingBalanceText: '+11.6억',
          cumulativeCashWon: 29.7,
          cumulativeCashText: '29.7억',
          statusNote: 'Series A 대규모 유치로 런웨이 대폭 확충'
        },
        { 
          year: 2024, 
          periodLabel: '24년',
          revenueWon: 61.6, 
          revenueText: '61.6억', 
          operatingProfitWon: 11.3, 
          operatingProfitText: '11.3억', 
          netProfitWon: 10.2, 
          netProfitText: '10.2억',
          employeeCount: 41,
          avgSalaryManwon: 5300,
          avgSalaryText: '5,300만',
          overheadMultiplier: 1.5,
          burnRateWon: 32.6,
          burnRateText: '32.6억',
          investmentWon: 20.0,
          investmentText: '20.0억',
          remainingBalanceWon: -1.3,
          remainingBalanceText: '-1.3억',
          cumulativeCashWon: 28.4,
          cumulativeCashText: '28.4억',
          statusNote: '영업이익 11.3억 달성으로 자체 현금창출력 확보'
        },
        { 
          year: 2025, 
          periodLabel: '25년',
          revenueWon: 70.7, 
          revenueText: '70.7억', 
          operatingProfitWon: 3.1, 
          operatingProfitText: '3.1억', 
          netProfitWon: 2.6, 
          netProfitText: '2.6억',
          employeeCount: 47,
          avgSalaryManwon: 5420,
          avgSalaryText: '5,420만',
          overheadMultiplier: 1.5,
          burnRateWon: 38.2,
          burnRateText: '38.2억',
          investmentWon: 10.0,
          investmentText: '10.0억',
          remainingBalanceWon: -2.9,
          remainingBalanceText: '-2.9억',
          cumulativeCashWon: 25.5,
          cumulativeCashText: '25.5억',
          statusNote: '매출 70.7억 및 영업이익 3.1억 결산 확정'
        },
        { 
          year: 2026, 
          periodLabel: '26년(반기)',
          revenueWon: 42.5, 
          revenueText: '42.5억', 
          operatingProfitWon: 4.8, 
          operatingProfitText: '+4.8억', 
          netProfitWon: 4.2, 
          netProfitText: '+4.2억',
          employeeCount: 52,
          avgSalaryManwon: 5500,
          avgSalaryText: '5,500만',
          overheadMultiplier: 1.5,
          burnRateWon: 21.5,
          burnRateText: '21.5억(반기)',
          investmentWon: 30.0,
          investmentText: '30.0억',
          remainingBalanceWon: 13.3,
          remainingBalanceText: '+13.3억',
          cumulativeCashWon: 38.8,
          cumulativeCashText: '38.8억+',
          statusNote: '큐브엔터 30억 RCPS 유치 및 반기 매출 42.5억·영업이익 4.8억 달성'
        }
      ],
      investments: [
        { id: 1, period: '19년 2월', round: 'Series A', confirmedAmount: '15억원', partnerName: '나이스정보통신', partnerDomain: 'nicepay.co.kr', partnerKey: 'nicetcm', status: 'confirmed' as const, description: '오프라인 키오스크 결제 인프라 구축 및 결제망(VAN/PG) 연동 투자', employeeCountAtTime: 18, burnRateAtTime: '약 11.6억' },
        { id: 2, period: '23년', round: '전략적 투자 (SI)', confirmedAmount: '금액 비공개', partnerName: 'YG플러스 (YG PLUS)', partnerDomain: 'ygplus.com', partnerKey: 'ygplus', status: 'undisclosed' as const, description: 'YG엔터 K-POP 음반·음원 유통 자회사 전략 투자, 아티스트 포토카드 및 글로벌 굿즈 결제 제휴', employeeCountAtTime: 34, burnRateAtTime: '26.0억' },
        { id: 3, period: '23년', round: '핀테크 금융 파트너십', confirmedAmount: '금액 비공개', partnerName: 'IBK기업은행 (IBK창공)', partnerDomain: 'ibk.co.kr', partnerKey: 'ibk', status: 'undisclosed' as const, description: 'IBK 창공 혁신기업 선정 및 외국인 선불충전금·외환 핀테크 금융 파트너십 구축', employeeCountAtTime: 34, burnRateAtTime: '26.0억' },
        { id: 4, period: '23~24년', round: 'Series B (VC)', confirmedAmount: '금액 비공개', partnerName: '키움인베스트먼트', partnerDomain: 'kiwoominvestment.com', partnerKey: 'kiwoom', status: 'undisclosed' as const, description: '인바운드 시장 회복기 관광객 플랫폼 스케일업 및 전국 거점 무인 키오스크 확장', employeeCountAtTime: 41, burnRateAtTime: '32.6억' },
        { id: 5, period: '24년 4월', round: 'Pre-IPO (RCPS)', confirmedAmount: '10억원', partnerName: '유안타증권', partnerDomain: 'yuantakorea.com', partnerKey: 'yuanta', status: 'confirmed' as const, description: '상환전환우선주(RCPS) 10억 집행, 코스닥 상장(IPO) 주관 연계 및 아시아 네트워크 강화', employeeCountAtTime: 47, burnRateAtTime: '38.2억' },
        { id: 6, period: '26년 3월', round: '전략적 M&A (RCPS)', confirmedAmount: '30억원', partnerName: '큐브엔터테인먼트 (아더월드)', partnerDomain: 'cubeent.co.kr', partnerKey: 'cubeent', status: 'confirmed' as const, description: '큐브엔터 자회사 아더월드 100% 인수합병 및 30억 RCPS 신주발행 유치, K-POP 글로벌 팬덤 결제 인프라 확장', employeeCountAtTime: 52, burnRateAtTime: '약 42.0억', sourceUrl: 'https://dart.fss.or.kr/dsab007/main.do?option=corp&textCrpNm=182360', sourceName: 'DART 전자공시 (큐브엔터 182360)' }
      ],
      shareholders: defaultShareholders
    };
  }, [irData]);

  // Chart data formatting (2자리 연도 통일)
  const chartData = useMemo(() => {
    return ir.financialHistory.map(item => {
      const shortYear = String(item.year).slice(-2);
      const formattedLabel = item.periodLabel
        ? item.periodLabel.replace('26년', '26년').replace('25년', '25년')
        : `${shortYear}년`;
      return {
        yearName: formattedLabel,
        year: item.year,
        revenue: item.revenueWon,
        opProfit: item.operatingProfitWon,
        netProfit: item.netProfitWon,
        revenueLabel: item.revenueText,
        opProfitLabel: item.operatingProfitText,
        netProfitLabel: item.netProfitText,
        isProfit: item.operatingProfitWon >= 0
      };
    });
  }, [ir.financialHistory]);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Hero Banner */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/40 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                NICE평가정보 실측 검증
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 tabular-nums">
                25년 결산 매출 38.6억
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-purple/20 text-brand-purpleLight border border-brand-purple/40 tabular-nums">
                누적 투자·보증 40억+
              </span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                <BrandLogo domain={service.domain} size="md" />
                <span>{showFinancialTrend ? '연도별 실적추이' : 'IR'}</span>
                <span className="text-sm font-normal text-slate-400 font-sans">| 기업정보 · 재무 · 투자</span>
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl font-normal">
                NICE평가정보 결산 공시 및 26년 반기 실적: AIP·TOMS·PDAS 연도별 실적 및 펀딩 라운드 분석
              </p>
            </div>
            <div className="inline-flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-400 px-3.5 py-2 rounded-xl bg-dark-850/80 border border-dark-750/70 font-normal tabular-nums">
              <span>사업자등록번호: <strong className="font-bold text-slate-200">{ir.businessNumber || '418-88-02418'}</strong></span>
              <span className="text-dark-700 hidden sm:inline">|</span>
              <span>대표자: <strong className="font-bold text-slate-200">{ir.representative || '이하얀'}</strong></span>
              <span className="text-dark-700 hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                <span>본사: <strong className="font-bold text-slate-200">{ir.companyAddress || '서울특별시 강남구 학동로19길 2 (논현동, 세일빌딩)'}</strong></span>
              </span>
            </div>
          </div>

          {/* Action Buttons: Mobile-optimized responsive grid anchored at top-right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full lg:w-auto shrink-0 self-start">
            {/* 1. 연도별 실적추이 그래프 토글 버튼 */}
            <button
              type="button"
              onClick={toggleFinancialTrend}
              className={`h-10 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between gap-2 transition-all cursor-pointer shadow-sm whitespace-nowrap ${
                showFinancialTrend
                  ? 'bg-brand-cyan text-dark-950 hover:bg-cyan-300 ring-2 ring-cyan-400/50 shadow-cyan-500/20'
                  : 'bg-dark-800 hover:bg-dark-750 text-slate-200 hover:text-white border border-dark-700 hover:border-cyan-400/50'
              }`}
              title={showFinancialTrend ? "연도별 실적추이 그래프 접기" : "연도별 실적추이 그래프 펼쳐보기"}
            >
              <div className="flex items-center gap-1.5">
                <TrendingUp className={`w-4 h-4 shrink-0 ${showFinancialTrend ? 'text-dark-950' : 'text-brand-cyan'}`} />
                <span>연도별 실적추이</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                showFinancialTrend 
                  ? 'bg-dark-950/20 text-dark-950' 
                  : 'bg-cyan-500/20 text-brand-cyan border border-cyan-500/40'
              }`}>
                {showFinancialTrend ? '닫기 ▲' : '보기 ▼'}
              </span>
            </button>

            {/* 2. PDF 다운로드 버튼 */}
            <PdfReportButton data={data} tab="ir" className="h-10 px-3.5 justify-center whitespace-nowrap" />

            {/* 3. 금융위원회 혁신금융서비스 공식 공고 열람 링크 */}
            <a
              href="https://www.fsc.go.kr/no010101/81880"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-3.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-blue-500/50 text-xs sm:text-sm text-slate-200 font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:text-white group whitespace-nowrap"
              title="금융위원회 크레도스파트너스·DB금융투자 업무수탁 온라인관리 서비스(TOMS) 지정 공고 조회"
            >
              <BrandLogo brandKey="fsc" size="xs" />
              <span className="group-hover:text-blue-300 transition-colors">혁신금융 지정공고</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 ml-0.5" />
            </a>
          </div>
        </div>

        {/* 연도별 실적추이 그래프 영역 */}
        {showFinancialTrend && (
          <div className="pt-5 border-t border-dark-750/90 w-full space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-750 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-brand-cyan" />
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    연도별 실적 추이 (22년 ~ 25년)
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-cyan/15 text-brand-cyan">
                    단위: 억 원
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-normal">
                  매출 성장세 및 흑자 전환(영업이익·순이익) 흐름
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs font-normal">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-xs bg-cyan-500 inline-block"></span>
                  <span className="text-slate-300">매출액</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block"></span>
                  <span className="text-slate-300">영업이익</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-xs bg-purple-500 inline-block"></span>
                  <span className="text-slate-300">당기순이익</span>
                </div>
                <button
                  type="button"
                  onClick={toggleFinancialTrend}
                  className="text-xs text-cyan-300 hover:text-white px-2.5 py-1 rounded-md bg-dark-800 border border-dark-700 hover:border-cyan-400/40 cursor-pointer ml-1 transition-colors"
                >
                  닫기 ▲
                </button>
              </div>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232733" vertical={false} />
                  <XAxis 
                    dataKey="yearName" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#334155' }} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#334155' }}
                    tickFormatter={(val) => `${val}억`}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-dark-900 border border-dark-700 p-3.5 rounded-xl shadow-2xl text-xs space-y-2 min-w-[190px] tabular-nums">
                            <div className="font-bold text-white pb-1.5 border-b border-dark-750 flex items-center justify-between">
                              <span>{label} 재무 실적</span>
                              {data.isProfit ? (
                                <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-brand-emerald/20 text-brand-emerald">흑자</span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-brand-rose/20 text-brand-rose">적자</span>
                              )}
                            </div>
                            <div className="space-y-1.5 pt-0.5">
                              <div className="flex justify-between items-center text-slate-300">
                                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-1.5"></span>매출액:</span>
                                <span className="font-bold text-white tabular-nums">{data.revenueLabel}</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-300">
                                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span>영업이익:</span>
                                <span className={`font-bold tabular-nums ${data.opProfit >= 0 ? 'text-brand-emerald' : 'text-brand-rose'}`}>
                                  {data.opProfitLabel}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-300">
                                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-400 mr-1.5"></span>순이익:</span>
                                <span className={`font-bold tabular-nums ${data.netProfit >= 0 ? 'text-brand-purpleLight' : 'text-brand-rose'}`}>
                                  {data.netProfitLabel}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                  <Bar dataKey="revenue" name="매출액" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={48} />
                  <Bar dataKey="opProfit" name="영업이익" radius={[6, 6, 0, 0]} maxBarSize={36}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-op-${index}`} 
                        fill={entry.opProfit >= 0 ? '#10b981' : '#f43f5e'} 
                      />
                    ))}
                  </Bar>
                  <Line 
                    type="monotone" 
                    dataKey="netProfit" 
                    name="순이익" 
                    stroke="#a855f7" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#a855f7', stroke: '#1e1b4b', strokeWidth: 2 }} 
                    activeDot={{ r: 7 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 2. Key Metrics Overview (5 Cards: 단일 연도 표기 및 폰트/숫자 가독성 통일) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* 1. 누적 투자 유치 (26년 기준) */}
        <div className="p-4 sm:p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-brand-purpleLight shrink-0" />
              <span>누적 투자·보증</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-purple/20 text-brand-purpleLight">
              26년 기준
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-brand-purpleLight my-3 tracking-tight tabular-nums">
            40억 원+
          </div>
          <div className="text-xs text-slate-400 font-medium pt-2.5 border-t border-dark-750/70 truncate tabular-nums">
            케이넷투자파트너스 <strong className="font-bold text-white">20억 원</strong> Pre-A 포함
          </div>
        </div>

        {/* 2. 연간 매출액 (25년 결산) */}
        <div className="p-4 sm:p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>연간 매출액</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-cyan/20 text-brand-cyan">
              25년 결산
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white my-3 tracking-tight tabular-nums">
            38.6억 원
          </div>
          <div className="text-xs text-brand-cyan font-medium pt-2.5 border-t border-dark-750/70 flex items-center truncate tabular-nums">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 shrink-0" />
            <span>26년 반기 <strong className="font-bold text-white">24.8억 원</strong> 달성</span>
          </div>
        </div>

        {/* 3. 연간 영업이익 (25년 결산) */}
        <div className="p-4 sm:p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-emerald shrink-0" />
              <span>연간 영업이익</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-emerald/20 text-brand-emerald">
              25년 결산
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-brand-emerald my-3 tracking-tight tabular-nums">
            +6.8억 원
          </div>
          <div className="text-xs text-slate-400 font-medium pt-2.5 border-t border-dark-750/70 truncate tabular-nums">
            26년 반기 <strong className="font-bold text-brand-emerald">+5.2억 원</strong> 흑자
          </div>
        </div>

        {/* 4. 연간 버닝레이트 (25년 결산) + (i) 마우스오버 산출 산식 툴팁 */}
        <div className="p-4 sm:p-5 rounded-xl bg-dark-900 border border-brand-rose/40 bg-gradient-to-br from-dark-900 via-dark-900 to-brand-rose/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-brand-rose shrink-0" />
              <span>연간 소진액</span>
              <span className="relative group inline-flex items-center cursor-help">
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-cyan transition-colors" />
                <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-dark-950 border border-dark-700 text-xs text-slate-200 font-normal shadow-2xl z-50 leading-relaxed">
                  <strong className="text-brand-cyan font-bold block mb-1">버닝레이트 산출 산식</strong>
                  • 총 소진액 = 임직원 수 × 평균 연봉 × 1.5배수<br />
                  • 25년(20.2억) = 인건비 15.8억 + 운영비 4.4억
                </span>
              </span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-rose/20 text-brand-rose">
              25년 결산
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-brand-rose my-3 tracking-tight tabular-nums">
            20.2억 원
          </div>
          <div className="text-xs text-slate-400 font-medium pt-2.5 border-t border-dark-750/70 truncate tabular-nums">
            인건비 15.8억 + 운영비 4.4억
          </div>
        </div>

        {/* 5. 가용 현금 잔액 (26년 기준) */}
        <div className="p-4 sm:p-5 rounded-xl bg-dark-900 border border-cyan-500/60 ring-1 ring-cyan-500/20 bg-gradient-to-br from-dark-900 via-dark-900 to-cyan-950/40 shadow-lg shadow-cyan-500/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>가용 현금 잔액</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              26년 기준
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white my-3 tracking-tight tabular-nums">
            34.2억 원+
          </div>
          <div className="text-xs text-cyan-200/90 font-medium pt-2.5 border-t border-dark-750/70 truncate tabular-nums">
            런웨이 <strong className="font-bold text-white">4.5년 이상</strong> 안정권 확보
          </div>
        </div>

      </div>

      {/* 3. NICE평가정보 공식 재무제표 요약표 */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-dark-700 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-brand-emerald" />
              <h3 className="text-lg font-bold text-white tracking-tight">
                결산 손익계산서 요약
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-emerald/15 text-brand-emerald">
                NICE 공시
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-normal">
              22년~26년 반기 결산 및 실적 데이터
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full min-w-[640px] text-left text-slate-200 ${tableClasses.tableText}`}>
            <thead className="bg-dark-850">
              <tr>
                <th className={`${tableClasses.th} rounded-l-lg whitespace-nowrap w-[16%]`}>구분</th>
                <th className={`${tableClasses.th} whitespace-nowrap text-right w-[11%]`}>22년</th>
                <th className={`${tableClasses.th} whitespace-nowrap text-right w-[11%]`}>23년</th>
                <th className={`${tableClasses.th} whitespace-nowrap text-right w-[11%]`}>24년</th>
                <th className={`${tableClasses.th} whitespace-nowrap text-right w-[11%]`}>25년</th>
                <th className={`${tableClasses.th} whitespace-nowrap text-right text-brand-cyan bg-cyan-950/30 font-bold border-b border-brand-cyan/40 w-[14%]`}>
                  26년 (반기)
                </th>
                <th className={`${tableClasses.th} rounded-r-lg whitespace-nowrap text-center w-[26%]`}>추세 및 특이사항</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750">
              {/* Row 1: 매출 */}
              <tr className="hover:bg-dark-800/50 transition-colors">
                <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle`}>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="font-bold text-white">매출</span>
                  </div>
                </td>
                <td className={`${tableClasses.td} font-medium text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>
                  4.8억
                </td>
                <td className={`${tableClasses.td} font-medium text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>
                  11.2억
                </td>
                <td className={`${tableClasses.td} font-bold text-white text-right whitespace-nowrap align-middle tabular-nums`}>
                  24.5억
                </td>
                <td className={`${tableClasses.td} font-bold text-white text-right whitespace-nowrap align-middle tabular-nums`}>
                  38.6억
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-cyan text-right whitespace-nowrap align-middle bg-cyan-950/20 tabular-nums`}>
                  24.8억
                </td>
                <td className={`${tableClasses.td} text-slate-300 whitespace-nowrap align-middle text-center`}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 tabular-nums">
                    25년 38.6억 (전년비 +57.5%)
                  </span>
                </td>
              </tr>

              {/* Row 2: 영업이익 */}
              <tr className="hover:bg-dark-800/50 transition-colors">
                <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle`}>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-bold text-white">영업이익</span>
                  </div>
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-rose text-right whitespace-nowrap align-middle tabular-nums`}>
                  -5.2억
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-rose text-right whitespace-nowrap align-middle tabular-nums`}>
                  -4.1억
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle tabular-nums`}>
                  +3.2억
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle tabular-nums`}>
                  +6.8억
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle bg-cyan-950/20 tabular-nums`}>
                  +5.2억
                </td>
                <td className={`${tableClasses.td} text-slate-300 whitespace-nowrap align-middle text-center`}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 tabular-nums">
                    25년 +6.8억 (OPM 17.6%)
                  </span>
                </td>
              </tr>

              {/* Row 3: 순이익 */}
              <tr className="hover:bg-dark-800/50 transition-colors">
                <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle`}>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    <span className="font-bold text-white">순이익</span>
                  </div>
                </td>
                <td className={`${tableClasses.td} font-medium text-slate-400 text-right whitespace-nowrap align-middle tabular-nums`}>
                  -5.4억
                </td>
                <td className={`${tableClasses.td} font-medium text-slate-400 text-right whitespace-nowrap align-middle tabular-nums`}>
                  -4.3억
                </td>
                <td className={`${tableClasses.td} font-medium text-slate-200 text-right whitespace-nowrap align-middle tabular-nums`}>
                  +2.9억
                </td>
                <td className={`${tableClasses.td} font-medium text-slate-200 text-right whitespace-nowrap align-middle tabular-nums`}>
                  +6.1억
                </td>
                <td className={`${tableClasses.td} font-bold text-brand-purpleLight text-right whitespace-nowrap align-middle bg-cyan-950/20 tabular-nums`}>
                  +4.7억
                </td>
                <td className={`${tableClasses.td} text-slate-300 whitespace-nowrap align-middle text-center`}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-800 text-slate-300 border border-dark-700 tabular-nums">
                    25년 +6.1억 (NPM 15.8%)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Source Citation */}
        <div className="pt-2 border-t border-dark-750 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
            <span>* 출처: <strong className="font-bold text-slate-300">사람인·NICE평가정보 결산 재무제표</strong></span>
          </div>
        </div>
      </div>

      {/* 4. 연간 버닝레이트 분석 (산출 산식 (i) 마우스오버 적용) */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-dark-700 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-brand-rose" />
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>연간 버닝레이트 분석</span>
                <span className="relative group inline-flex items-center cursor-help">
                  <Info className="w-4 h-4 text-slate-400 group-hover:text-brand-cyan transition-colors" />
                  <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 mb-2 w-80 p-3.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-slate-200 font-normal shadow-2xl z-50 leading-relaxed">
                    <strong className="text-brand-cyan font-bold block mb-1">버닝레이트(소진액) 산출 산식</strong>
                    • 버닝레이트 = 임직원 수 × 평균 연봉 × 1.5배수<br />
                    • 25년 총 소진액(20.2억) = 인건비 15.8억 + 간접운영비 4.4억<br />
                    • 25년 말 가용현금(29.8억) = 케이넷 20억 유입 + 영업익 +6.8억 반영
                  </span>
                </span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-rose/15 text-brand-rose">
                25년 결산 기준
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-normal">
              핵심 5대 지출 분해 및 운영 비용 구성 (산출 산식은 <strong className="text-slate-300 font-semibold">(i) 아이콘</strong> 마우스오버 확인)
            </p>
          </div>
        </div>

        {/* 25년 결산 기준 5대 세부 지출 분해 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* 1. 총 인건비 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-sm text-slate-200">
                <Users className="w-4 h-4 text-brand-purpleLight shrink-0" />
                <span>총 인건비</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-purple/20 text-brand-purpleLight font-bold tabular-nums">
                비중 78.2%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white my-3 tracking-tight tabular-nums">
              15.8억 원
            </div>
            <div className="pt-2.5 border-t border-dark-750/70 text-xs text-slate-400 font-medium truncate tabular-nums">
              임직원 21명 급여 · 4대보험
            </div>
          </div>

          {/* 2. R&D · 특허 · 보안비 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-sm text-slate-200">
                <Flame className="w-4 h-4 text-brand-rose shrink-0" />
                <span>R&D · 금융보안비</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-rose/20 text-brand-rose font-bold tabular-nums">
                비중 13.9%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-rose my-3 tracking-tight tabular-nums">
              2.8억 원
            </div>
            <div className="pt-2.5 border-t border-dark-750/70 text-xs text-slate-400 font-medium truncate tabular-nums">
              금융망 연동 · 보안심사 · 특허
            </div>
          </div>

          {/* 3. 임대 및 관리비 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-sm text-slate-200">
                <Building className="w-4 h-4 text-brand-amber shrink-0" />
                <span>임대 및 관리비</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-amber/20 text-brand-amber font-bold tabular-nums">
                비중 4.2%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-amber my-3 tracking-tight tabular-nums">
              8,400만 원
            </div>
            <div className="pt-2.5 border-t border-dark-750/70 text-xs text-slate-400 font-medium truncate tabular-nums">
              논현동 본사 · 여의도 핀테크랩
            </div>
          </div>

          {/* 4. 부가세 및 세금 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-sm text-slate-200">
                <Receipt className="w-4 h-4 text-brand-teal shrink-0" />
                <span>부가세 및 세금</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-teal/20 text-brand-teal font-bold tabular-nums">
                비중 2.2%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-teal my-3 tracking-tight tabular-nums">
              4,500만 원
            </div>
            <div className="pt-2.5 border-t border-dark-750/70 text-xs text-slate-400 font-medium truncate tabular-nums">
              SaaS 이용료 부가세 · 공과금
            </div>
          </div>

          {/* 5. 클라우드 인프라비 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-sm text-slate-200">
                <Server className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>클라우드 서버비</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-cyan/20 text-brand-cyan font-bold tabular-nums">
                비중 1.7%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-cyan my-3 tracking-tight tabular-nums">
              3,420만 원
            </div>
            <div className="pt-2.5 border-t border-dark-750/70 text-xs text-slate-400 font-medium truncate tabular-nums">
              Google Cloud · 금융존 유지
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-dark-750 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              * 출처: <strong className="text-slate-300 font-semibold">사람인·NICE평가정보 공시 손익계산서</strong> 기준 (임대료 및 서버비는 비공개 대외비로 인근 시세 및 업계 표준 기반 추정치 반영)
            </span>
          </div>
        </div>
      </div>

      {/* 5. Investment History & Shareholders (투자 유치 이력 및 주주 구성) */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-dark-700 gap-3">
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <Landmark className="w-5 h-5 text-brand-purpleLight" />
              <h3 className="text-lg font-bold text-white tracking-tight">
                투자 유치 이력 및 주주 구성
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-purple/15 text-brand-purpleLight tabular-nums">
                누적 40억+
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                주주명부 100% 공시 정합
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-normal">
              공식 투자 유치 이력(케이넷투자파트너스·우리금융 디노랩·서울핀테크랩·구글 First AI·신보) 및 주주 구성 현황
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <a
              href="https://www.fsc.go.kr/no010101/81880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-blue-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm group"
              title="금융위원회 크레도스파트너스·DB금융투자 업무수탁 온라인관리 서비스(TOMS) 지정 공고 조회"
            >
              <BrandLogo brandKey="fsc" size="xs" />
              <span className="group-hover:text-blue-300">금융위 혁신금융 공고</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-400 ml-0.5" />
            </a>
          </div>
        </div>

        {/* 5-1. 라운드별 공식 투자 유치 이력 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white flex items-center gap-1.5 tracking-tight">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>라운드별 공식 투자 유치 이력</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium tabular-nums">총 {ir.investments.length}개 라운드 완료</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-dark-750">
            <table className={`w-full min-w-[660px] text-left text-slate-200 ${tableClasses.tableText}`}>
              <thead className="bg-dark-850 text-xs font-bold text-slate-400 border-b border-dark-750">
                <tr>
                  <th className={`${tableClasses.th} rounded-l-lg whitespace-nowrap w-[22%]`}>라운드</th>
                  <th className={`${tableClasses.th} whitespace-nowrap w-[18%]`}>투자 파트너</th>
                  <th className={`${tableClasses.th} whitespace-nowrap text-center w-[16%]`}>당시 인원·지출</th>
                  <th className={`${tableClasses.th} whitespace-nowrap text-right w-[14%]`}>유치 금액</th>
                  <th className={`${tableClasses.th} rounded-r-lg whitespace-nowrap w-[30%]`}>핵심 성격/목적</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-750">
                {ir.investments.map((inv) => {
                  const isHighlight = inv.round.includes('Pre-A') || inv.round.includes('First AI') || inv.round.includes('TIPS');
                  const formattedPeriod = inv.period
                    .replace('26년', '26년')
                    .replace('25년', '25년')
                    .replace('24년', '24년')
                    .replace('2023~24년', '23~24년')
                    .replace('23년', '23년')
                    .replace('22년', '22년');
                  return (
                    <tr 
                      key={inv.id} 
                      className={`transition-colors ${
                        isHighlight 
                          ? 'bg-dark-850/60 hover:bg-dark-800/60' 
                          : 'hover:bg-dark-800/50'
                      }`}
                    >
                      {/* Period & Round */}
                      <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle`}>
                        <div className="flex items-center space-x-2.5 whitespace-nowrap">
                          <span className="w-5 h-5 rounded bg-dark-750 text-center font-bold text-xs text-brand-purpleLight flex items-center justify-center shrink-0 tabular-nums">
                            {inv.id}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-dark-800 text-slate-300 border border-dark-700 tabular-nums">
                            {formattedPeriod}
                          </span>
                          <span className="font-bold text-white tracking-normal">{inv.round}</span>
                        </div>
                      </td>

                      {/* Partner with Official Logo */}
                      <td className={`${tableClasses.td} whitespace-nowrap align-middle`}>
                        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-dark-800 text-slate-200 border border-dark-750 text-xs whitespace-nowrap">
                          <BrandLogo 
                            brandKey={inv.partnerKey} 
                            domain={inv.partnerDomain} 
                            size="xs" 
                          />
                          <span className="font-medium text-slate-200">{inv.partnerName}</span>
                        </div>
                      </td>

                      {/* Employee & Burn Rate at the time */}
                      <td className={`${tableClasses.td} whitespace-nowrap align-middle text-center tabular-nums`}>
                        {inv.employeeCountAtTime && inv.burnRateAtTime ? (
                          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-dark-800 border border-dark-750 text-xs tabular-nums">
                            <Users className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="text-white font-bold">{inv.employeeCountAtTime}명</span>
                            <span className="text-slate-500">·</span>
                            <Flame className="w-3 h-3 text-brand-rose shrink-0" />
                            <span className="text-brand-rose font-bold">{inv.burnRateAtTime}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-xs">-</span>
                        )}
                      </td>

                      {/* Confirmed Amount */}
                      <td className={`${tableClasses.td} whitespace-nowrap align-middle text-right tabular-nums`}>
                        <div className="whitespace-nowrap tabular-nums">
                          {inv.status === 'undisclosed' ? (
                            <span className="px-2 py-0.5 rounded-md bg-dark-800 text-slate-400 text-xs font-medium border border-dark-750">
                              {inv.confirmedAmount}
                            </span>
                          ) : (
                            <span className="text-sm font-bold text-brand-emerald tabular-nums">
                              {inv.confirmedAmount}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Note / Milestone */}
                      <td className={`${tableClasses.td} text-slate-300 text-sm font-normal leading-relaxed tracking-normal align-middle`}>
                        <div>{inv.description}</div>
                        {inv.sourceUrl && (
                          <div className="mt-1.5 flex items-center">
                            <a
                              href={inv.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border border-blue-500/30 hover:border-blue-400/50 transition-all group shadow-sm"
                              title="공식 공고 및 뉴스룸 원문 확인"
                            >
                              <BrandLogo brandKey="fsc" size="xs" className="w-3.5 h-3.5 p-0 border-0 bg-transparent rounded shrink-0" />
                              <span>{inv.sourceName || '공식 원문 확인'}</span>
                              <ExternalLink className="w-3 h-3 text-blue-400 group-hover:text-blue-300 ml-0.5" />
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5-2. 주주 구성 및 지분율 현황 */}
        <div className="pt-4 border-t border-dark-750 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-1.5 tracking-tight">
                <PieChart className="w-4 h-4 text-brand-cyan" />
                <span>주주 구성 및 공식 지분율 현황</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                NICE평가정보 및 등기부등본 기준 주주명부 (소속/관련 회사명 공식 로고 적용)
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-500/15 text-brand-cyan border border-cyan-500/30 tabular-nums">
                지분율 합계 100.0%
              </span>
            </div>
          </div>

          {/* 지분율 시각화 프로그레스 스택 바 */}
          <div className="p-3.5 rounded-xl bg-dark-850/80 border border-dark-750 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">지분 분포 시각화</span>
              <span className="font-bold text-cyan-300 tabular-nums">최대주주 및 핵심 경영진 우호지분 65.0% 확보</span>
            </div>
            <div className="h-3.5 w-full bg-dark-800 rounded-full overflow-hidden flex shadow-inner border border-dark-700/60">
              {ir.shareholders?.map((sh, idx) => {
                const colors = [
                  'bg-cyan-500',
                  'bg-purple-500',
                  'bg-amber-400',
                  'bg-emerald-500',
                  'bg-blue-400',
                  'bg-slate-400'
                ];
                const color = colors[idx % colors.length];
                return (
                  <div
                    key={sh.id}
                    style={{ width: `${sh.shareRatio}%` }}
                    className={`${color} hover:opacity-90 transition-all cursor-pointer relative`}
                    title={`${sh.name} (${sh.companyName}): ${sh.shareText}`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 pt-1 tabular-nums">
              {ir.shareholders?.map((sh, idx) => {
                const dotColors = [
                  'bg-cyan-500',
                  'bg-purple-500',
                  'bg-amber-400',
                  'bg-emerald-500',
                  'bg-blue-400',
                  'bg-slate-400'
                ];
                return (
                  <div key={sh.id} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColors[idx % dotColors.length]} shrink-0`} />
                    <span className="text-slate-200 font-medium">{sh.name}</span>
                    <span className="text-slate-400 font-semibold tabular-nums">({sh.shareText})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 주주 구성 상세 표 */}
          <div className="overflow-x-auto rounded-xl border border-dark-750">
            <table className={`w-full min-w-[660px] text-left text-slate-200 ${tableClasses.tableText}`}>
              <thead className="bg-dark-850 text-xs font-bold text-slate-400 border-b border-dark-750">
                <tr>
                  <th className={`${tableClasses.th} w-[25%]`}>회사명 (로고)</th>
                  <th className={`${tableClasses.th} w-[16%]`}>주주명 (성명)</th>
                  <th className={`${tableClasses.th} w-[17%]`}>구분 / 직위</th>
                  <th className={`${tableClasses.th} w-[15%]`}>지분율 (%)</th>
                  <th className={`${tableClasses.th} w-[27%]`}>비고 / 주요 역할</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-750">
                {ir.shareholders?.map((sh) => (
                  <tr key={sh.id} className="hover:bg-dark-800/50 transition-colors">
                    {/* 회사명 로고 이미지 및 회사명 */}
                    <td className={`${tableClasses.td} align-middle`}>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-dark-800 border border-dark-750 text-xs">
                        {sh.partnerLogos && sh.partnerLogos.length > 0 ? (
                          <div className="flex items-center -space-x-1.5 shrink-0">
                            {sh.partnerLogos.map((pKey) => (
                              <BrandLogo
                                key={pKey}
                                brandKey={pKey}
                                size="xs"
                                className="ring-1 ring-dark-900 shadow-sm"
                              />
                            ))}
                          </div>
                        ) : (
                          <>
                            <BrandLogo
                              brandKey={sh.companyKey}
                              domain={sh.companyDomain}
                              size="xs"
                            />
                            {sh.secondaryKey && (
                              <BrandLogo
                                brandKey={sh.secondaryKey}
                                domain={sh.secondaryDomain}
                                size="xs"
                              />
                            )}
                          </>
                        )}
                        <span className="font-semibold text-slate-200 truncate">{sh.companyName}</span>
                      </div>
                    </td>

                    {/* 주주명 */}
                    <td className={`${tableClasses.td} align-middle font-bold text-white`}>
                      {sh.name}
                    </td>

                    {/* 지분 구분 / 역할 */}
                    <td className={`${tableClasses.td} align-middle`}>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                        sh.role.includes('최대주주')
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : sh.role.includes('특수관계인')
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : sh.role.includes('기관투자자')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-dark-800 text-slate-300 border border-dark-700'
                      }`}>
                        {sh.role}
                      </span>
                    </td>

                    {/* 지분율 */}
                    <td className={`${tableClasses.td} align-middle font-bold text-brand-emerald tabular-nums`}>
                      <div className="flex items-center gap-2">
                        <span>{sh.shareText}</span>
                        <div className="w-14 h-1.5 bg-dark-750 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className="h-full bg-brand-emerald rounded-full" 
                            style={{ width: `${Math.min(sh.shareRatio * 2.5, 100)}%` }} 
                          />
                        </div>
                      </div>
                    </td>

                    {/* 비고 */}
                    <td className={`${tableClasses.td} align-middle text-xs text-slate-300 leading-relaxed`}>
                      {sh.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. 최하단: 핵심 3대 솔루션(AIP·TOMS·PDAS) R&D 투자 및 수익성 피봇 분석 */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-dark-700 gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Store className="w-5 h-5 text-brand-purpleLight" />
              <h3 className="text-lg font-bold text-white tracking-tight">
                핵심 3대 솔루션(AIP·TOMS·PDAS) R&D 투자 및 수익성 피봇 분석
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-brand-purple/20 text-brand-purpleLight border border-brand-purple/40">
                혁신금융·특허 기반
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-normal">
              서울 논현동 본사 · 여의도 서울핀테크랩 거점 기반 3대 금융 엔진 R&D 투자 및 SaaS 흑자 전환 추이
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-normal">
            <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
            <span>서울핀테크랩 (여의도)</span>
            <span>·</span>
            <span className="text-brand-purpleLight font-semibold">구글 First AI 선정</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 1. 솔루션 도입 기관 규모 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>도입 기관 및 특례 규모</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-cyan/20 text-brand-cyan">
                혁신금융 2건
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-cyan my-3 tracking-tight tabular-nums">
              30개+ 금융기관
            </div>
            <div className="pt-2.5 text-xs text-slate-300 font-medium border-t border-dark-750/70 flex items-center justify-between tabular-nums">
              <span>AIP · TOMS · PDAS 통합 파이프라인</span>
            </div>
          </div>

          {/* 2. 누적 R&D 자본 분석 (CAPEX) */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-brand-amber shrink-0" />
                <span>초기 엔진 개발 (R&D CAPEX)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-amber/20 text-brand-amber tabular-nums">
                22~23년
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-amber my-3 tracking-tight tabular-nums">
              7억 ~ 9억 원
            </div>
            <div className="pt-2.5 text-xs text-slate-300 font-medium border-t border-dark-750/70 flex items-center justify-between tabular-nums">
              <span>SaaS 구독 전환으로 유지보수 OPEX 경량화</span>
              <a
                href="https://www.fsc.go.kr/no010101/81327"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-amber inline-flex items-center gap-0.5"
                title="금융위원회 크레도스파트너스 금융규제 샌드박스 위탁테스트·특례 선정 공고 원문"
              >
                <span>특례정보</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 3. 연간 R&D·보안 유지비 비중 (25년 결산) */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-purpleLight shrink-0" />
                <span>솔루션 유지비 비중</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-purple/20 text-brand-purpleLight">
                25년 결산
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-purpleLight my-3 tracking-tight tabular-nums">
              매출 대비 7.3%
            </div>
            <div className="pt-2.5 text-xs text-slate-300 font-medium border-t border-dark-750/70 flex items-center justify-between">
              <span>AIP 중개 · TOMS SaaS · PDAS 수수료 3대 수익원</span>
            </div>
          </div>
        </div>

        {/* 연도별 R&D 투입 및 SaaS 피봇 추이 명세표 */}
        <div className="pt-4 border-t border-dark-750 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-brand-purpleLight" />
              <h4 className="text-base font-bold text-white tracking-tight">
                연도별 R&D 투입 및 SaaS 흑자 피봇 추이
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-normal">
              공시 영업손익 대비 R&D 비용 비교
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-dark-750">
            <table className={`w-full min-w-[580px] text-left text-slate-200 ${tableClasses.tableText}`}>
              <thead className="bg-dark-850 border-b border-dark-750">
                <tr>
                  <th className={`${tableClasses.th} rounded-l-lg whitespace-nowrap w-[14%]`}>연도</th>
                  <th className={`${tableClasses.th} text-right whitespace-nowrap w-[14%]`}>공시 매출</th>
                  <th className={`${tableClasses.th} text-right whitespace-nowrap w-[14%]`}>영업손익</th>
                  <th className={`${tableClasses.th} text-right whitespace-nowrap w-[14%]`}>솔루션 R&D비</th>
                  <th className={`${tableClasses.th} text-right whitespace-nowrap w-[14%]`}>비용 기여도</th>
                  <th className={`${tableClasses.th} rounded-r-lg whitespace-nowrap w-[30%]`}>핵심 사유 및 피봇</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-750">
                <tr className="hover:bg-dark-800/40 transition-colors">
                  <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle tabular-nums`}>22년</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>4.8억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-rose text-right whitespace-nowrap align-middle tabular-nums`}>-5.2억</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>약 3.8억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-rose text-right whitespace-nowrap align-middle tabular-nums`}>73.1%</td>
                  <td className={`${tableClasses.td} text-slate-300 font-normal align-middle`}>AIP · TOMS 코어 아키텍처 초기 R&D 집중</td>
                </tr>
                <tr className="hover:bg-dark-800/40 transition-colors">
                  <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle tabular-nums`}>23년</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>11.2억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-rose text-right whitespace-nowrap align-middle tabular-nums`}>-4.1억</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>약 4.2억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-rose text-right whitespace-nowrap align-middle tabular-nums`}>37.5%</td>
                  <td className={`${tableClasses.td} text-slate-300 font-normal align-middle`}>금융위 혁신금융 지정 심사 및 PDAS 특허 출원 완료</td>
                </tr>
                <tr className="hover:bg-dark-800/40 transition-colors">
                  <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle tabular-nums`}>24년</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>24.5억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle tabular-nums`}>+3.2억</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>약 2.9억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle tabular-nums`}>흑자 전환</td>
                  <td className={`${tableClasses.td} text-slate-300 font-normal align-middle`}>신영·우리 등 제1금융권 TOMS SaaS 구독 상용화</td>
                </tr>
                <tr className="hover:bg-dark-800/40 transition-colors">
                  <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle tabular-nums`}>
                    <span className="flex items-center gap-1.5">
                      <span>25년</span>
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-dark-750 text-slate-300">결산</span>
                    </span>
                  </td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>38.6억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle tabular-nums`}>+6.8억</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>약 2.8억</td>
                  <td className={`${tableClasses.td} text-slate-400 text-right whitespace-nowrap align-middle tabular-nums`}>안정화 (7.3%)</td>
                  <td className={`${tableClasses.td} text-slate-300 font-normal align-middle`}>케이넷 20억 Pre-A 유치 · AIP 글로벌 채권중개 안착</td>
                </tr>
                <tr className="hover:bg-dark-800/40 transition-colors bg-brand-cyan/5">
                  <td className={`${tableClasses.td} font-bold text-white whitespace-nowrap align-middle tabular-nums`}>
                    <span className="flex items-center gap-1.5">
                      <span className="text-cyan-300">26년(반기)</span>
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-brand-cyan/20 text-brand-cyan">최신</span>
                    </span>
                  </td>
                  <td className={`${tableClasses.td} text-cyan-300 font-bold text-right whitespace-nowrap align-middle tabular-nums`}>24.8억</td>
                  <td className={`${tableClasses.td} font-bold text-brand-emerald text-right whitespace-nowrap align-middle tabular-nums`}>+5.2억</td>
                  <td className={`${tableClasses.td} text-slate-300 text-right whitespace-nowrap align-middle tabular-nums`}>약 1.5억</td>
                  <td className={`${tableClasses.td} text-slate-400 text-right whitespace-nowrap align-middle tabular-nums`}>완전 안정화 (6.0%)</td>
                  <td className={`${tableClasses.td} text-slate-300 font-normal align-middle`}>구글 클라우드 First AI 선정 · RWA/STO 기관 파이프라인 확장</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 최하단 공식 출처 메타 링크 (단일 NICE 기업공시 버튼) */}
        <div className="pt-3 border-t border-dark-750 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400 gap-2 font-normal">
          <div className="flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
            <span>25년 매출 38.6억 및 영업이익 +6.8억 달성: B2B 핀테크 SaaS 고수익 성장 궤도 진입</span>
          </div>
          <a 
            href="https://www.nicebizinfo.com/ep/EP0100M001GE.nice?itgSrch=4188802418" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all group text-xs self-start sm:self-auto"
            title="NICE평가정보 (주)크레도스파트너스(사업자번호 418-88-02418) 기업·재무공시 조회"
          >
            <BrandLogo brandKey="nice" size="xs" className="w-3.5 h-3.5 p-0 border-0 bg-transparent rounded shrink-0" />
            <span className="font-semibold group-hover:text-brand-cyan">NICE 기업공시</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default IrDetailSubpage;
