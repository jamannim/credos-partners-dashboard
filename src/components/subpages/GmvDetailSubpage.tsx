import React from 'react';
import { 
  CreditCard, ShieldCheck, TrendingUp,
  Sparkles, Building2, Coins, Percent,
  Wallet, CheckCircle2, ExternalLink
} from 'lucide-react';
import type { CompleteServiceIntelligence } from '../../types/intelligence';
import { BrandLogo } from '../BrandLogo';
import { PdfReportButton } from '../PdfReportButton';

interface Props {
  data: CompleteServiceIntelligence;
}

export const GmvDetailSubpage: React.FC<Props> = ({ data }) => {
  const { service } = data;

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* 1. 상단 인트로 브리핑 헤더 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-700 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>AUM · 솔루션 실적</span>
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-sans">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NICE평가정보 결산 검증</span>
              </span>
              <span className="text-xs text-slate-400 font-sans">
                23년 ~ 25년 공시 확정치
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 pt-1">
              <BrandLogo domain={service.domain} size="md" />
              <span>GMV · AUM</span>
              <span className="text-sm font-normal text-slate-400 font-sans">| 3대 솔루션 수익 · 잔여자금 분석</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
              NICE평가정보 공시 기반 <strong>실제 수익(영업익·순익)</strong> 및 <strong>AIP·TOMS·PDAS 솔루션별 매출 분해</strong> 핵심 요약
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-2.5 self-end md:self-start shrink-0">
            {/* PDF 다운로드 버튼 (박스 우측 상단 통일) */}
            <PdfReportButton data={data} tab="gmv" />
          </div>
        </div>

        {/* 4대 주요 핵심 지표 바 (25년 결산 단일 기준) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5 pt-4 border-t border-dark-750/80">
          
          {/* 카드 1: 25년 총 매출액 */}
          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>25년 총 매출액</span>
              </span>
              <span className="text-brand-emerald font-bold font-mono">+57.5% YoY</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1.5">
              38.6억 원
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              24년 24.5억 원 대비 +14.1억 원
            </span>
          </div>

          {/* 카드 2: 25년 영업이익 */}
          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
                <span>25년 영업이익</span>
              </span>
              <span className="text-brand-emerald font-bold font-mono">OPM 17.6%</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-brand-emerald font-mono mt-1.5">
              +6.8억 원
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              25년 당기순이익 +6.1억 원 (NPM 15.8%)
            </span>
          </div>

          {/* 카드 3: 25년 가용 현금 */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/30 via-dark-900 to-dark-900 border border-cyan-500/50">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-cyan-300">
                <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                <span>25년 가용 현금 잔액</span>
              </span>
              <span className="text-brand-cyan font-bold font-mono">25년 결산</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-brand-cyan font-mono mt-1.5">
              29.8억 원
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              26년 반기 기준 34.2억 원+ (Pre-A 20억 반영)
            </span>
          </div>

          {/* 카드 4: 신탁 수탁고 · 유동화 풀 */}
          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>연동 신탁·유동화 자산</span>
              </span>
              <span className="text-purple-300 font-bold font-mono">금융위 특례</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-300 font-mono mt-1.5">
              1,650억 원
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              신탁업자 분리 보관 (회사 고유자금과 분리)
            </span>
          </div>
        </div>
      </div>

      {/* 2. 재무 실적 및 수익성 지표 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-dark-750">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-brand-emerald" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-normal">
                재무 실적 및 수익성 지표 (23년 ~ 25년)
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-sans">
                NICE 결산 검증
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              (주)크레도스파트너스 NICE평가정보 결산 데이터 및 금융위 혁신금융 지정 공시 교차 검증
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono self-start sm:self-auto">
            단위: 원화(KRW) / 비율(%)
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-dark-750">
          <table className="w-full text-left text-xs sm:text-sm table-fixed min-w-[760px]">
            <thead className="bg-dark-850 text-slate-300 font-bold border-b border-dark-750 text-xs font-sans">
              <tr>
                <th className="py-2.5 px-3.5 w-[20%]">지표 구분</th>
                <th className="py-2.5 px-3 text-right w-[14%]">23년</th>
                <th className="py-2.5 px-3 text-right w-[14%]">24년</th>
                <th className="py-2.5 px-3 text-right w-[14%] text-brand-cyan">25년</th>
                <th className="py-2.5 px-3 text-right w-[14%]">전년 대비 (25년 YoY)</th>
                <th className="py-2.5 px-3.5 w-[24%]">산출 및 검증 기준</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750/70 text-xs sm:text-sm">
              
              {/* 연간 총 매출액 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>연간 총 매출액</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">11.2억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">
                  24.5억 원 <span className="text-xs text-brand-emerald font-normal block">▲ +118.8%</span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-cyan">
                  38.6억 원 <span className="text-xs text-brand-emerald font-normal block">▲ +57.5%</span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald font-bold">
                  +14.1억 원 <span className="text-xs text-slate-400 font-normal block">+57.5% 증가</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300">
                  크레도스파트너스 매출 결산 일치
                </td>
              </tr>

              {/* 영업이익 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>영업이익 (실질 수익)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-rose-400">-4.1억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-emerald bg-brand-emerald/5">
                  +3.2억 원
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-emerald">
                  +6.8억 원
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald font-bold">
                  +3.6억 원 <span className="text-xs text-slate-400 font-normal block">영업이익 +112.5%</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300">
                  손익계산서 영업이익 확정치
                </td>
              </tr>

              {/* 매출액 영업이익률 (OPM) */}
              <tr className="bg-dark-850/60 hover:bg-dark-800/60 transition-colors font-bold border-y border-dark-700">
                <td className="py-2.5 px-3.5 align-middle text-amber-300">
                  <div className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-amber-400" />
                    <span>매출액 영업이익률 (OPM)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-rose-400">-36.6%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald bg-brand-emerald/10">
                  +13.1% <span className="text-xs text-brand-emerald font-bold block">▲ +49.7%p</span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">+17.6%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">
                  +4.5%p <span className="text-xs text-slate-400 font-normal block">6.8억 ÷ 38.6억</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 font-normal">
                  영업이익 ÷ 매출액 산출
                </td>
              </tr>

              {/* 당기순이익 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>당기순이익 (최종 순익)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-rose-400">-4.3억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-emerald">+2.9억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-emerald">+6.1억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald font-bold">
                  +3.2억 원 <span className="text-xs text-slate-400 font-normal block">순이익 +110.3%</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300">
                  손익계산서 당기순이익 확정치
                </td>
              </tr>

              {/* 매출액 순이익률 (NPM) */}
              <tr className="bg-dark-850/40 hover:bg-dark-800/60 transition-colors font-semibold">
                <td className="py-2.5 px-3.5 align-middle text-purple-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>매출액 순이익률 (NPM)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-rose-400">-38.4%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">+11.8%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">+15.8%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">
                  +4.0%p <span className="text-xs text-slate-400 font-normal block">6.1억 ÷ 38.6억</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 font-normal">
                  당기순이익 ÷ 매출액 산출
                </td>
              </tr>

              {/* 회사 보유 가용 자금 */}
              <tr className="bg-dark-850/70 hover:bg-dark-800/70 transition-colors font-bold border-y border-brand-cyan/30">
                <td className="py-2.5 px-3.5 align-middle text-brand-cyan">
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>회사 남은 자금 (가용 현금)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">11.4억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">23.6억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-cyan font-bold">29.8억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">
                  +6.2억 원 <span className="text-xs text-slate-400 font-normal block">+26.3% 증가</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 font-normal">
                  재무상태표 현금성자산 기준
                </td>
              </tr>

              {/* 신탁 수탁고 및 유동화 기초자산 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>연동 신탁·유동화 풀 (별도)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-300">540억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-300">1,050억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-purple-300">1,650억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">+600억 원 (+57.1%)</td>
                <td className="py-2.5 px-3.5 text-slate-300">
                  신탁업자 분리보관 수탁고
                </td>
              </tr>

              {/* 연간 총 취급액 (AUM/GMV) */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                    <span>연간 총 취급액 (AUM/GMV)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">850억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">1,520억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-cyan">2,400억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-cyan">+880억 원 (+57.9%)</td>
                <td className="py-2.5 px-3.5 text-slate-300">
                  AIP·TOMS·PDAS 총 파이프라인
                </td>
              </tr>

              {/* GMV 대비 매출 전환율 */}
              <tr className="bg-dark-850/40 hover:bg-dark-800/60 transition-colors font-semibold">
                <td className="py-2.5 px-3.5 align-middle text-brand-cyan">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                    <span>플랫폼 Take Rate (수익률)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-300">1.32%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-cyan">1.61%</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-cyan font-bold">1.61%</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-300 font-bold">
                  유지 <span className="text-xs text-slate-400 font-normal block">38.6억 ÷ 2,400억</span>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 font-normal">
                  총매출 ÷ 총취급액 역산 (1.61%)
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 3. 세부 솔루션 실적(추정) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-dark-750">
          <div>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-normal">
                3대 핵심 솔루션별 매출 분해 (추정)
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                수익 분해 역산
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              금융기관 도입 계약 단가 및 NICE 공시 총매출(38.6억) 기반 100% 정합성 역산
            </p>
          </div>
          <span className="text-xs text-brand-cyan font-mono self-start sm:self-auto">
            공식 총매출 일치
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-dark-750">
          <table className="w-full text-left text-xs sm:text-sm table-fixed min-w-[760px]">
            <thead className="bg-dark-850 text-slate-300 font-bold border-b border-dark-750 text-xs font-sans">
              <tr>
                <th className="py-2.5 px-3.5 w-[30%]">세부 분류 항목</th>
                <th className="py-2.5 px-3 text-right w-[17%]">23년</th>
                <th className="py-2.5 px-3 text-right w-[17%]">24년</th>
                <th className="py-2.5 px-3 text-right w-[17%] text-amber-300">25년</th>
                <th className="py-2.5 px-3.5 w-[19%]">단가 및 추정 마진율</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750/70 text-xs sm:text-sm">
              
              {/* 총 솔루션 도입 금융기관 */}
              <tr className="bg-dark-850/30 hover:bg-dark-800/40 transition-colors font-semibold">
                <td className="py-2.5 px-3.5 align-middle text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
                    <span>누적 도입·제휴 금융기관 수</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">11개 기관</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">21개 기관</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-300">30개+ 기관</td>
                <td className="py-2.5 px-3.5 font-mono text-slate-300 text-xs">기관당 연평균 1.28억</td>
              </tr>

              {/* AIP · TOMS 도입 기관 */}
              <tr className="hover:bg-dark-800/40 transition-colors text-slate-300">
                <td className="py-2 px-3.5 pl-6 align-middle">
                  <span className="text-slate-400 mr-1.5">├</span>
                  <span>AIP · TOMS 도입 증권·은행</span>
                </td>
                <td className="py-2 px-3 text-right font-mono">7개 기관 (64%)</td>
                <td className="py-2 px-3 text-right font-mono">13개 기관 (62%)</td>
                <td className="py-2 px-3 text-right font-mono text-slate-100 font-medium">18개 기관 (60%)</td>
                <td className="py-2 px-3.5 text-slate-400 font-mono text-xs">SaaS + 중개수수료 (마진 72%)</td>
              </tr>

              {/* PDAS 유동화 제휴 기관 */}
              <tr className="hover:bg-dark-800/40 transition-colors text-slate-300">
                <td className="py-2 px-3.5 pl-6 align-middle font-semibold text-amber-300">
                  <span className="text-slate-400 mr-1.5">└</span>
                  <span>PDAS 유동화·담보검증 제휴</span>
                </td>
                <td className="py-2 px-3 text-right font-mono text-amber-400">4개 기관 (36%)</td>
                <td className="py-2 px-3 text-right font-mono text-amber-400">8개 기관 (38%)</td>
                <td className="py-2 px-3 text-right font-mono font-bold text-amber-300">12개 기관 (40%)</td>
                <td className="py-2 px-3.5 text-slate-400 font-mono text-xs">유동화 발행 연동 (마진 75%)</td>
              </tr>

              {/* 1. AIP 해외채권 · 대체투자 중개 매출 */}
              <tr className="bg-dark-850/20 hover:bg-dark-800/40 transition-colors font-semibold border-t border-dark-750">
                <td className="py-2.5 px-3.5 align-middle text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>1. AIP 해외채권·대체투자 중개 (A)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">약 5.2억 원</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">약 11.4억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-300">약 18.2억 원</td>
                <td className="py-2.5 px-3.5 font-mono text-slate-300 text-xs">부문 마진 약 65.0%</td>
              </tr>

              {/* 2. TOMS 신탁전산화 SaaS 구독 */}
              <tr className="bg-dark-850/20 hover:bg-dark-800/40 transition-colors font-semibold border-t border-dark-750">
                <td className="py-2.5 px-3.5 align-middle text-brand-emerald">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald"></span>
                    <span>2. TOMS 신탁전산화 SaaS (B)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">약 3.9억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-emerald">약 8.1억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-emerald">약 12.4억 원</td>
                <td className="py-2.5 px-3.5 text-brand-emerald font-bold font-mono text-xs">부문 마진 약 82.0%</td>
              </tr>

              {/* 3. PDAS 동적 유동화 수수료 */}
              <tr className="bg-dark-850/20 hover:bg-dark-800/40 transition-colors font-semibold border-t border-dark-750">
                <td className="py-2.5 px-3.5 align-middle text-brand-cyan">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
                    <span>3. PDAS 동적 유동화 수수료 (C)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-200">약 2.1억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-cyan">약 5.0억 원</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-cyan">약 8.0억 원</td>
                <td className="py-2.5 px-3.5 text-brand-cyan font-bold font-mono text-xs">부문 마진 약 75.0%</td>
              </tr>

              {/* 전사 종합 공헌 마진율 */}
              <tr className="bg-dark-850/60 hover:bg-dark-800/60 transition-colors font-bold border-y border-dark-700">
                <td className="py-2.5 px-3.5 align-middle text-brand-emerald">
                  <div className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-brand-emerald" />
                    <span>전사 총 공헌이익 (마진율)</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                  약 8.1억 <span className="text-xs text-slate-400 font-normal block">(마진 72.3%)</span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald">
                  약 17.8억 <span className="text-xs text-brand-emerald font-normal block">(마진 72.6%)</span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-emerald font-bold">
                  약 28.0억 <span className="text-xs text-brand-emerald font-bold block">(마진 72.5%)</span>
                </td>
                <td className="py-2.5 px-3.5 font-mono text-brand-emerald text-xs">25년 마진 72.5%</td>
              </tr>

              {/* 합산 총 매출액 (정합성) */}
              <tr className="bg-dark-800/90 font-bold border-t-2 border-dark-700 text-xs sm:text-sm">
                <td className="py-3 px-3.5 align-middle text-white">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                    <span>합계 총 매출액 (A + B + C)</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-white">11.2억 원</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-white">24.5억 원</td>
                <td className="py-3 px-3 text-right font-mono font-black text-amber-300">38.6억 원</td>
                <td className="py-3 px-3.5 text-brand-emerald font-semibold text-xs">
                  <span>NICE 공시 100% 일치</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 4. BM 3대 핵심 축 및 부문별 수익 메커니즘 요약 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-dark-750">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-amber" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-normal">
                수익 구조(BM) 3대 핵심 축 및 부문별 수익 메커니즘
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              구축형 SI에서 기관용 SaaS 구독 및 취급액(AUM) 연동 수수료 모델로의 고마진 피봇
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-dark-850 text-slate-300 border border-dark-750 font-sans self-start sm:self-auto">
            핵심 요약
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-dark-750">
          <table className="w-full text-left text-xs sm:text-sm table-fixed min-w-[650px]">
            <thead className="bg-dark-850 text-slate-300 font-bold border-b border-dark-750 text-xs font-sans">
              <tr>
                <th className="py-2.5 px-3.5 w-[30%]">수익 엔진 구분</th>
                <th className="py-2.5 px-3 w-[48%]">핵심 모델 및 수익 구조</th>
                <th className="py-2.5 px-3 text-center w-[22%]">추정 마진율</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750/70 text-xs sm:text-sm">
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 font-bold text-white">
                  1. AIP 해외채권 · 대체투자
                </td>
                <td className="py-2.5 px-3 text-slate-300">
                  Mizuho·ICBC·Santander 연동 해외채권 중개 및 API 라이선스 (연 18.2억 원)
                </td>
                <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-200">
                  약 65.0%
                </td>
              </tr>
              <tr className="hover:bg-dark-800/40 transition-colors bg-brand-emerald/5">
                <td className="py-2.5 px-3.5 font-bold text-brand-emerald">
                  2. TOMS 신탁전산화 SaaS
                </td>
                <td className="py-2.5 px-3 text-slate-200">
                  금융위 혁신금융 지정 2건 기반 신탁계약 자동화 월 구독료 (연 12.4억 원)
                </td>
                <td className="py-2.5 px-3 text-center font-mono font-black text-brand-emerald">
                  약 82.0%
                </td>
              </tr>
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 font-bold text-amber-300">
                  3. PDAS 동적 유동화 엔진
                </td>
                <td className="py-2.5 px-3 text-slate-300">
                  매출채권 동적 풀링·담보검증 특허 기반 유동화 발행 수수료 (연 8.0억 원)
                </td>
                <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-300">
                  약 75.0%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. 하단 출처 메타 (각 사이트 로고 및 바로가기 URL 링크) */}
      <div className="p-4 rounded-xl bg-dark-900 border border-dark-750 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-slate-400 gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0" />
            <span className="font-semibold text-slate-300 font-sans">실적·공시 원문 바로가기:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="https://www.nicebizinfo.com/ep/EP0100M002GE.nice?kiscode=PG7387"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all group font-sans text-xs"
              title="NICE평가정보 (주)크레도스파트너스(사업자번호 418-88-02418) 기업·재무공시 상세 바로가기"
            >
              <BrandLogo brandKey="nice" size="xs" className="w-3.5 h-3.5 p-0 border-0 bg-transparent rounded shrink-0" />
              <span className="font-semibold group-hover:text-brand-cyan">NICE 기업공시</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0" />
            </a>
            <a
              href="https://www.fsc.go.kr/no010101/81880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all group font-sans text-xs"
              title="금융위원회 크레도스파트너스·DB금융투자 업무수탁 온라인관리 서비스(TOMS) 지정 공고 바로가기"
            >
              <BrandLogo brandKey="fsc" size="xs" className="w-3.5 h-3.5 p-0 border-0 bg-transparent rounded shrink-0" />
              <span className="font-semibold group-hover:text-brand-cyan">혁신금융 지정공고</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0" />
            </a>
            <a
              href="https://www.fsc.go.kr/no010101/81327"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all group font-sans text-xs"
              title="금융위원회 크레도스파트너스 금융규제 샌드박스 위탁테스트·특례 선정 공고 바로가기"
            >
              <BrandLogo brandKey="fsc" size="xs" className="w-3.5 h-3.5 p-0 border-0 bg-transparent rounded shrink-0" />
              <span className="font-semibold group-hover:text-brand-cyan">특례정보</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0" />
            </a>
          </div>
        </div>
        <span className="font-sans text-slate-400 shrink-0 text-xs">
          * (주)크레도스파트너스 공식 공시 및 재무 결산 기준
        </span>
      </div>

    </div>
  );
};

export default GmvDetailSubpage;
