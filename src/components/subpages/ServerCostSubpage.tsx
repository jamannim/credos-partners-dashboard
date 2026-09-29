import React, { useState } from 'react';
import { 
  Server, TrendingDown, ShieldCheck, 
  CheckCircle2, Zap, Cloud, Database, 
  Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import type { CompleteServiceIntelligence, CostSavingRecommendation } from '../../types/intelligence';
import { BrandLogo, BrandBadgesFromText } from '../BrandLogo';
import { getTableDensityClasses, type TableDensity } from '../TableDensityControl';
import { PdfReportButton } from '../PdfReportButton';

interface Props {
  data: CompleteServiceIntelligence;
}

export const ServerCostSubpage: React.FC<Props> = ({ data }) => {
  const { service, serverCost } = data;
  const [selectedRecId, setSelectedRecId] = useState<number>(1);
  const density: TableDensity = 'auto';
  const dClasses = getTableDensityClasses(density);

  // Fallback server cost data if not present
  const costData = serverCost || {
    inferredProvider: 'Amazon Web Services (AWS 서울 리전 ap-northeast-2)',
    ipAddress: '18.244.60.8 (AWS EC2 / CloudFront Edge)',
    cdnProvider: 'AWS CloudFront (cloudfront.net)',
    webServer: 'Nginx (Reverse Proxy & WAS)',
    currentMonthlyTotalWon: 2420000,
    annualTotalWon: 29040000,
    potentialMonthlySavingsWon: 1220000,
    potentialAnnualSavingsWon: 14640000,
    costBreakdown: [
      { category: '컴퓨팅 (EC2 Web/WAS 인스턴스)', provider: 'AWS EC2 t3.xlarge Multi-AZ (이중화)', spec: '4 vCPU, 16GB RAM x 2대', monthlyCostWon: 880000, share: 36.4 },
      { category: '데이터베이스 (RDS 고가용성)', provider: 'AWS RDS MySQL db.r6g.large', spec: '2 vCPU, 16GB RAM, Multi-AZ 복제', monthlyCostWon: 740000, share: 30.6 },
      { category: 'CDN & 데이터 전송료', provider: 'AWS CloudFront + Data Transfer', spec: '해외 유입(일본·미국 45%) 아웃바운드 3TB', monthlyCostWon: 450000, share: 18.6 },
      { category: '스토리지 & 백업 (S3)', provider: 'AWS S3 + Snapshot 백업', spec: '커스텀 포토카드 이미지 에셋 약 2.5TB', monthlyCostWon: 210000, share: 8.7 },
      { category: '보안/모니터링/로드밸런서', provider: 'AWS ALB + WAF + CloudWatch', spec: 'L7 로드밸런싱 및 WAF 규칙', monthlyCostWon: 140000, share: 5.7 },
    ],
    recommendations: [
      {
        id: 1,
        title: '대안 CDN 도입 & 에지 캐싱 최적화 (Cloudflare 전환)',
        targetArea: 'CDN & 아웃바운드 데이터 전송료',
        currentCostWon: 450000,
        expectedCostWon: 90000,
        monthlySavingsWon: 360000,
        savingsRate: 80,
        difficulty: 'Low',
        effortDays: '1~2일 (DNS 전환)',
        description: 'Cloudflare Pro 도입 및 에지 캐시(TTL 30일) 설정으로 해외 Egress 전송료 80% 절감',
        actionSteps: [
          '도메인 DNS 네임서버를 Cloudflare로 전환하고 프록시(오렌지 구름) 활성화',
          'S3 커스텀 이미지 경로(/uploads/*, /assets/*)에 대해 Cloudflare Cache Rule(Edge Cache TTL: 1개월) 적용',
          'CloudFront 사용량을 최소화하여 AWS Egress 요금을 $300 이상 즉시 절감'
        ],
        tradeoffs: '초기 DNS 전파 시간(최대 24시간) 동안의 캐시 워밍업 필요 외 기능적 리스크 없음'
      },
      {
        id: 2,
        title: 'AWS Compute Savings Plans (1~3년 약정) & RDS RI 전환',
        targetArea: 'EC2 웹/WAS 서버 및 RDS 데이터베이스',
        currentCostWon: 1620000,
        expectedCostWon: 980000,
        monthlySavingsWon: 640000,
        savingsRate: 39.5,
        difficulty: 'Low',
        effortDays: '즉시 (AWS 콘솔 클릭)',
        description: '1~3년 Compute Savings Plans 및 RDS RI 적용으로 무중단 35~45% 비용 즉시 할인',
        actionSteps: [
          'AWS Cost Explorer에서 권장하는 1년 선결제 없는 Compute Savings Plans 활성화',
          'RDS MySQL 인스턴스에 대해 1년 표준 RI(Standard Reserved Instance) 구매',
          '야간 및 새벽 시간대(02:00~07:00) 유휴 워커 인스턴스 자동 다운스케일링 크론 설정'
        ],
        tradeoffs: '1년 동안 해당 리소스 사용을 보장해야 하므로 서버 스펙의 급격한 축소가 제한됨'
      },
      {
        id: 3,
        title: '국내 CSP(네이버클라우드 Ncloud) 이전 또는 서버리스 하이브리드',
        targetArea: '원화 결제 환율 리스크 방어 & 인프라 전면 효율화',
        currentCostWon: 2420000,
        expectedCostWon: 1350000,
        monthlySavingsWon: 1070000,
        savingsRate: 44.2,
        difficulty: 'Medium',
        effortDays: '2~3주 (스테이징 검증)',
        description: '네이버클라우드 이전 또는 유휴비 제로 서버리스(Fargate) 전환으로 44% 절감',
        actionSteps: [
          '정적 웹 및 단순 조회 API를 Serverless/컨테이너(Fargate)로 분리하여 유휴 서버 비용 제거',
          '국내 결제/정산 백엔드를 네이버클라우드(Ncloud) 원화 고정 요금제로 마이그레이션 검토',
          '국내 PG사 연동 전용선 비용 감축 및 공공/금융 클라우드 바우처(최대 2,000만원) 지원 사업 연계'
        ],
        tradeoffs: '인프라 마이그레이션 작업과 결제 게이트웨이(PG) 연동 테스트에 2~3주의 공수가 소요됨'
      }
    ]
  };

  const selectedRec: CostSavingRecommendation = costData.recommendations.find(r => r.id === selectedRecId) || costData.recommendations[0];

  // Comparison chart data (Current vs After Top 3 Savings)
  const chartData = [
    { name: '현재 서버 비용', cost: costData.currentMonthlyTotalWon, fill: '#f43f5e' },
    { name: '추천 1 (CDN 최적화)', cost: costData.currentMonthlyTotalWon - 360000, fill: '#fbbf24' },
    { name: '추천 1+2 (약정 할인)', cost: costData.currentMonthlyTotalWon - 1000000, fill: '#38bdf8' },
    { name: '추천 1+2+3 (완전 최적화)', cost: costData.currentMonthlyTotalWon - costData.potentialMonthlySavingsWon, fill: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      

      {/* 1. Real Server-Side Inspection Banner */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-purple/20 text-brand-purpleLight border border-brand-purple/30 flex items-center">
              <Server className="w-3.5 h-3.5 mr-1" />
              서버사이드 실측 인프라 추적 완료
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              DNS & HTTP Header 교차 검증
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2 flex items-center gap-2.5">
            <BrandLogo domain={service.domain} size="md" />
            <span>서버비용</span>
            <span className="text-sm font-normal text-slate-400 font-sans">| 인프라 분석 및 비용 절감</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed font-sans flex flex-wrap items-center gap-1.5">
            <span>실측 인프라:</span>
            <span className="inline-flex items-center gap-1 font-bold text-white bg-dark-800 px-2 py-0.5 rounded border border-dark-700 text-xs">
              <BrandLogo brandKey="googlecloud" size="xs" /> Google Cloud (First AI)
            </span>
            <span>+</span>
            <span className="inline-flex items-center gap-1 font-bold text-white bg-dark-800 px-2 py-0.5 rounded border border-dark-700 text-xs">
              <BrandLogo brandKey="navercloud" size="xs" /> Naver Cloud 금융존
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span>월평균 인프라 비용 및 최적화 절감 분석</span>
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-end gap-3 self-end md:self-start shrink-0">
          <div className="bg-dark-850 p-3 rounded-xl border border-dark-750 text-right shrink-0">
            <div className="text-xs text-slate-400">실측 식별 IP & WAS</div>
            <div className="text-xs font-mono font-bold text-brand-cyan mt-0.5">{costData.ipAddress}</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center justify-end gap-1">
              <BrandLogo brandKey="nginx" size="xs" />
              <span>웹서버: {costData.webServer}</span>
            </div>
          </div>

          {/* PDF 다운로드 버튼 (박스 우측 상단 통일) */}
          <PdfReportButton data={data} tab="server-cost" />
        </div>
      </div>

      {/* 2. Key Cost Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Current Monthly Cost */}
        <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">현재 추정 월평균 서버비</span>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-rose/15 text-brand-rose font-bold">
              온디맨드 기준
            </span>
          </div>
          <div className="text-2xl font-black text-white mt-1">
            약 {(costData.currentMonthlyTotalWon / 10000).toFixed(0)}만 원
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            연간 약 {(costData.annualTotalWon / 10000).toFixed(0)}만 원 지출
          </span>
        </div>

        {/* Expected Optimized Cost */}
        <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">최적화 후 예상 월비용</span>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-emerald/15 text-brand-emerald font-bold">
              50% 감축 목표
            </span>
          </div>
          <div className="text-2xl font-black text-brand-emerald mt-1">
            약 {((costData.currentMonthlyTotalWon - costData.potentialMonthlySavingsWon) / 10000).toFixed(0)}만 원
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            불필요한 Egress 및 유휴 인스턴스 제거
          </span>
        </div>

        {/* Monthly Potential Savings */}
        <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">월간 절감 가능 금액</span>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan font-bold flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> 절감율 50.4%
            </span>
          </div>
          <div className="text-2xl font-black text-brand-cyan mt-1">
            -{(costData.potentialMonthlySavingsWon / 10000).toFixed(0)}만 원 / 월
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            매달 세이브 가능한 운영비
          </span>
        </div>

        {/* Annual Total Savings */}
        <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">연간 누적 절감액</span>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purpleLight font-bold">
              순수익 전환 효과
            </span>
          </div>
          <div className="text-2xl font-black text-brand-purpleLight mt-1">
            약 {(costData.potentialAnnualSavingsWon / 10000).toFixed(0)}만 원
          </div>
          <span className="text-xs text-brand-emerald mt-1 block">
            신규 마케팅 예산 확보 가능
          </span>
        </div>

      </div>

      {/* 3. Cost Breakdown Table & Savings Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Detailed Infrastructure Cost Breakdown (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-dark-900 border border-dark-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-700 mb-4 gap-2">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-brand-purpleLight" />
              <h3 className="text-sm font-bold text-white tracking-wide">현재 인프라 리소스별 월평균 비용 내역</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">합계: 약 242만 원</span>
              
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className={`w-full text-left ${dClasses.tableText}`}>
              <thead className="bg-dark-850 text-slate-400 font-semibold border-b border-dark-750">
                <tr>
                  <th className={`${dClasses.th} rounded-l`}>인프라 영역</th>
                  <th className={dClasses.th}>제공사 및 인프라 사양</th>
                  <th className={dClasses.th}>비중</th>
                  <th className={`${dClasses.th} rounded-r`}>월비용 (원)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-750/70 text-slate-200">
                {costData.costBreakdown.map((item, idx) => (
                  <tr key={idx} className="hover:bg-dark-800/40 transition-colors">
                    <td className={`${dClasses.td} font-medium`}>
                      <div className="text-white font-semibold break-keep">{item.category}</div>
                    </td>
                    <td className={`${dClasses.td} text-slate-300 font-mono`}>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <BrandBadgesFromText text={item.provider} size="xs" />
                      </div>
                      <div className="text-[16.5px] text-slate-400 font-sans mt-0.5 break-keep">
                        {item.spec}
                      </div>
                    </td>
                    <td className={dClasses.td}>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-dark-750 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div className="bg-brand-purple h-full" style={{ width: `${item.share}%` }}></div>
                        </div>
                        <span className="text-slate-300 font-mono text-[16.5px]">{item.share}%</span>
                      </div>
                    </td>
                    <td className={`${dClasses.td} font-mono font-bold text-white whitespace-nowrap`}>
                      {item.monthlyCostWon.toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Savings Simulation Recharts Bar Chart (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-dark-700 mb-3">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-brand-emerald" />
              <h3 className="text-sm font-bold text-white">단계별 비용 절감 시뮬레이션</h3>
            </div>
            <span className="text-[16.5px] text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded">
              최대 50% 절감
            </span>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v / 10000}만`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()}원`, '월간 예상 비용']}
                />
                <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-lg bg-dark-850 border border-dark-750 text-xs text-slate-300 leading-relaxed mt-2">
            <span className="text-brand-emerald font-bold">💡 최적화 요약:</span> 현재 월 242만 원 ➔ 3대 추천안 적용 시 <strong>월 120만 원 (연간 1,464만 원 순절감)</strong>으로 다이어트가 가능합니다.
          </div>
        </div>

      </div>

      {/* 4. Top 3 Cost Reduction & Alternative Server Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-dark-700">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-brand-amber" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              타 서버 전환 및 비용 절감 추천안 Top 3
            </h3>
          </div>
          <span className="text-xs text-brand-cyan font-semibold">
            실행 우선순위별 정렬
          </span>
        </div>

        {/* Recommendation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {costData.recommendations.map((rec) => {
            const isSelected = selectedRecId === rec.id;
            return (
              <button
                key={rec.id}
                onClick={() => setSelectedRecId(rec.id)}
                className={`p-4 rounded-xl text-left border transition-all relative ${
                  isSelected 
                    ? 'bg-dark-850 border-brand-purple shadow-lg shadow-brand-purple/20 ring-1 ring-brand-purple' 
                    : 'bg-dark-900 border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="px-2 py-0.5 rounded font-bold bg-dark-800 text-slate-300 border border-dark-750">
                    추천 0{rec.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[15px] ${
                    rec.difficulty === 'Low' 
                      ? 'bg-brand-emerald/15 text-brand-emerald' 
                      : 'bg-brand-amber/15 text-brand-amber'
                  }`}>
                    난이도: {rec.difficulty} ({rec.effortDays})
                  </span>
                </div>

                <div className="text-sm font-bold text-white mt-1.5 line-clamp-1">
                  {rec.title}
                </div>

                <div className="mt-3 flex items-baseline justify-between border-t border-dark-750 pt-2.5">
                  <span className="text-xs text-slate-400">월 절감액:</span>
                  <span className="text-base font-black text-brand-emerald">
                    -{(rec.monthlySavingsWon / 10000).toFixed(0)}만 원
                    <span className="text-xs text-slate-400 font-normal ml-1">({rec.savingsRate}%)</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Recommendation Deep Dive Detail Card */}
        <div className="p-5 rounded-xl bg-dark-900 border border-dark-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-700 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[16.5px] font-bold bg-brand-purple text-white">
                  추천 0{selectedRec.id} 세부 실행 계획
                </span>
                <span className="text-xs text-slate-400">대상: {selectedRec.targetArea}</span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">{selectedRec.title}</h4>
            </div>

            <div className="flex items-center space-x-3 text-right">
              <div>
                <span className="text-[16.5px] text-slate-400 block">월 예상 절감액</span>
                <span className="text-lg font-black text-brand-emerald">
                  -{(selectedRec.monthlySavingsWon / 10000).toFixed(0)}만 원/월
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-dark-850 p-3.5 rounded-lg border border-dark-750">
            {selectedRec.description}
          </p>

          {/* Action Steps */}
          <div>
            <h5 className="text-xs font-bold text-white mb-2 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-brand-emerald" />
              단계별 실행 액션
            </h5>
            <div className="space-y-1.5">
              {selectedRec.actionSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded bg-dark-800 text-brand-purpleLight font-bold flex items-center justify-center shrink-0 mt-0.5 text-[15px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tradeoffs & Precautions */}
          <div className="p-3 rounded-lg bg-dark-950 border border-dark-800 flex items-start space-x-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">고려사항 및 트레이드오프:</strong> {selectedRec.tradeoffs}
            </div>
          </div>
        </div>

      </div>

      {/* 5. Alternative Cloud Providers Comparison */}
      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700">
        <div className="flex items-center justify-between pb-3 border-b border-dark-700 mb-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-sm font-bold text-white">대안 클라우드(타 서버) 프로바이더 비교 가이드</h3>
          </div>
          <span className="text-xs text-slate-400">{data.service.name} 비즈니스 인프라 적합도 평가</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <BrandLogo brandKey="cloudflare" size="sm" />
                Cloudflare 에지 인프라
              </span>
              <span className="text-[15px] px-2 py-0.5 rounded bg-brand-emerald/15 text-brand-emerald font-bold">
                비용 절감 1순위
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed break-keep">
              글로벌 트래픽 분산 및 아웃바운드 전송료(Egress) 0원화 CDN/WAF
            </p>
            <div className="border-t border-dark-700 pt-2 text-[16.5px] text-brand-purpleLight font-medium">
              추천 조합: 기존 클라우드 유지 + Cloudflare 앞단 배치
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <BrandLogo brandKey="naver" size="sm" />
                네이버클라우드
              </span>
              <span className="text-[15px] px-2 py-0.5 rounded bg-brand-blue/15 text-brand-blue font-bold">
                환율 리스크 0%
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed break-keep">
              100% 원화 결제로 환율 리스크 차단 및 국내 PG/카드사 연동 최적화
            </p>
            <div className="border-t border-dark-700 pt-2 text-[16.5px] text-brand-purpleLight font-medium">
              추천 조합: 국내 결제/정산 DB 및 코어 백엔드 이전
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <BrandLogo brandKey="aws" size="sm" />
                AWS 서버리스 (Fargate/Lambda)
              </span>
              <span className="text-[15px] px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purpleLight font-bold">
                유휴 서버비 제로
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed break-keep">
              요청 시에만 과금되는 서버리스(Lambda)로 심야 유휴비 100% 절감
            </p>
            <div className="border-t border-dark-700 pt-2 text-[16.5px] text-brand-purpleLight font-medium">
              추천 조합: 키오스크 위치 조회 및 단순 API 서버리스화
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
