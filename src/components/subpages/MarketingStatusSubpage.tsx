import React, { useState } from 'react';
import { 
  Share2, Sparkles, TrendingUp, Eye, Heart, MessageCircle, 
  Globe, BarChart3, Info 
} from 'lucide-react';
import type { CompleteServiceIntelligence } from '../../types/intelligence';
import { BrandLogo } from '../BrandLogo';
import { SnsMonthlyComparisonSheet } from '../SnsMonthlyComparisonSheet';
import { PdfReportButton } from '../PdfReportButton';

interface FormulaTooltipProps {
  formula?: string;
  detail?: string;
  note?: string;
  align?: 'left' | 'right' | 'center';
}

const EngagementFormulaTooltip: React.FC<FormulaTooltipProps> = ({
  formula = '반응합계 / 조회수 X 100',
  align = 'right'
}) => {
  const alignClass =
    align === 'left'
      ? 'left-0'
      : align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'right-0';

  return (
    <span
      className="relative inline-flex items-center group cursor-help ml-1 align-middle"
      title={formula}
    >
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-cyan-500/15 text-brand-cyan border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors">
        <Info className="w-2.5 h-2.5" />
      </span>
      <span
        className={`pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 absolute bottom-full ${alignClass} mb-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-dark-950/95 backdrop-blur-md border border-cyan-500/40 shadow-xl z-50 text-xs font-bold text-brand-cyan font-sans`}
      >
        {formula}
      </span>
    </span>
  );
};

import type { SubViewId } from '../Header';

interface Props {
  data: CompleteServiceIntelligence;
  activeSubView?: SubViewId;
  onSubViewChange?: (subView: SubViewId) => void;
}

export const MarketingStatusSubpage: React.FC<Props> = ({ data, activeSubView, onSubViewChange }) => {
  const { service } = data;
  const [localShowSns, setLocalShowSns] = useState<boolean>(false);

  const showSnsMonthlyComparison = activeSubView ? activeSubView === 'sns-sheet' : localShowSns;

  const toggleSnsMonthlyComparison = () => {
    const next = !showSnsMonthlyComparison;
    setLocalShowSns(next);
    onSubViewChange?.(next ? 'sns-sheet' : 'main');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. 상단 인트로 브리핑 헤더 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-700 shadow-lg relative">
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1 font-sans">
                <Share2 className="w-3.5 h-3.5" />
                <span>공식 마케팅 실측 분석</span>
              </span>
              <span className="text-xs text-slate-400 font-sans">
                2026년 9월 실시간 기준
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 pt-1">
              <BrandLogo domain={service.domain} size="md" />
              <span>{showSnsMonthlyComparison ? '월별 SNS 성과비교' : '마케팅'}</span>
              <span className="text-sm font-normal text-slate-400 font-sans">| SNS 성과 분석</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              링크드인(글로벌 크로스보더)·네이버 금융 PR·유튜브 기술 데모 3대 채널의 실측 반응 및 월별 성과 비교
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-2.5 self-end md:self-start shrink-0">
            {/* 1. SNS월별 합산 성과비교 토글 버튼 (Default: 접힌 상태, 보기 ▼) */}
            <button
              type="button"
              onClick={toggleSnsMonthlyComparison}
              className={`h-10 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all shadow-sm cursor-pointer font-sans border ${
                showSnsMonthlyComparison
                  ? 'bg-brand-cyan text-dark-950 border-cyan-400'
                  : 'bg-dark-800 hover:bg-dark-750 text-white border-dark-650 hover:border-brand-cyan/50'
              }`}
              title="SNS월별 합산 성과비교 내용 펼치기/접기"
            >
              <BarChart3 className={`w-4 h-4 shrink-0 ${showSnsMonthlyComparison ? 'text-dark-950' : 'text-brand-cyan'}`} />
              <span>{showSnsMonthlyComparison ? 'SNS월별 합산 성과비교 접기 ▲' : 'SNS월별 합산 성과비교 보기 ▼'}</span>
            </button>

            {/* 2. PDF 다운로드 버튼 (박스 우측 상단 통일) */}
            <PdfReportButton data={data} tab="marketing-status" />
          </div>
        </div>

        {/* 4대 주요 지표 요약 바 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-dark-750/80">
          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                <span>3개월 누적 조회수</span>
              </span>
              <span className="text-brand-emerald font-bold font-sans">+23.8%</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-sans mt-1">
              12.95만 회
            </div>
            <span className="text-xs text-slate-400 mt-0.5 block">
              9월 4.48만 회 포함
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Heart className="w-3.5 h-3.5 text-slate-400" />
                <span>3개월 누적 공감·추천</span>
              </span>
              <span className="text-brand-emerald font-bold font-sans">+30.8%</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-sans mt-1">
              7,710개
            </div>
            <span className="text-xs text-slate-400 mt-0.5 block">
              링크드인 추천·보도 공감 누적
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>3개월 누적 문의·댓글</span>
              </span>
              <span className="text-brand-emerald font-bold font-sans">+31.7%</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-sans mt-1">
              831개
            </div>
            <span className="text-xs text-slate-400 mt-0.5 block">
              금융사 실무진 참여·문의 피드백
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" />
                <span>가중 평균 참여율</span>
              </span>
              <span className="text-brand-emerald font-bold font-sans">+0.37%p</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-brand-cyan font-sans mt-1 flex items-center">
              <span>6.60%</span>
              <EngagementFormulaTooltip />
            </div>
            <span className="text-xs text-slate-400 mt-0.5 block">
              B2B 채널별 인터랙션 가중 집계
            </span>
          </div>
        </div>

        {/* SNS월별 합산 성과비교 리포트 (상단 마케팅현황 카드 내부 일체화) */}
        {showSnsMonthlyComparison && (
          <div className="mt-6 pt-5 border-t border-dark-750/90">
            <SnsMonthlyComparisonSheet 
              onToggle={toggleSnsMonthlyComparison}
              embedded
            />
          </div>
        )}
      </div>

      {/* 3. 채널별 운영 포지셔닝 및 타깃 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-dark-750">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>채널별 운영 포지셔닝 및 타깃</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              B2B 금융기관 의사결정자 및 글로벌 파트너 타깃 채널별 콘텐츠 전략
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-dark-850 text-slate-300 border border-dark-750 font-sans self-start sm:self-auto">
            3대 B2B 채널 분석
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 채널 1: 링크드인 글로벌 */}
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrandLogo brandKey="linkedin" size="sm" />
                <div>
                  <div className="font-bold text-white text-sm">링크드인 글로벌 공식</div>
                  <div className="text-xs text-slate-400 font-sans">@credos-partners</div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-semibold bg-dark-800 text-slate-300 border border-dark-700 font-sans">
                크로스보더 딜
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate whitespace-nowrap" title="미국 ViewTrade 채권 중개 · 홍콩 NHW · 베트남 소매대출 유동화 협약">
              미국 ViewTrade 채권 중개 · 홍콩 NHW · 베트남 소매대출 유동화 협약
            </p>
            <div className="pt-2 border-t border-dark-750/80 flex items-center justify-between text-xs text-slate-400">
              <span>타깃: 해외 운용사 · IB 심사역</span>
              <span className="text-brand-cyan font-semibold font-sans inline-flex items-center">
                <span>참여율 6.8%</span>
                <EngagementFormulaTooltip
                  detail="링크드인 글로벌(@credos-partners) 3개월 피드 평균: (반응 합계 ÷ 조회수) × 100 = 6.8%"
                />
              </span>
            </div>
          </div>

          {/* 채널 2: 네이버 PR · 금융 미디어 */}
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrandLogo brandKey="naver" size="sm" />
                <div>
                  <div className="font-bold text-white text-sm">네이버 PR · 금융 뉴스룸</div>
                  <div className="text-xs text-slate-400 font-sans">credospartners.com</div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-semibold bg-dark-800 text-slate-300 border border-dark-700 font-sans">
                혁신금융·IR 공시
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate whitespace-nowrap" title="금융위원회 혁신금융 2건 지정 및 케이넷 Pre-A 20억 투자 보도">
              금융위원회 혁신금융 2건 지정 및 케이넷 Pre-A 20억 투자 보도
            </p>
            <div className="pt-2 border-t border-dark-750/80 flex items-center justify-between text-xs text-slate-400">
              <span>타깃: 국내 금융지주 · 신탁사 · VC</span>
              <span className="text-brand-cyan font-semibold font-sans inline-flex items-center">
                <span>참여율 6.5%</span>
                <EngagementFormulaTooltip
                  detail="네이버 PR·뉴스룸 3개월 평균: (반응 합계 ÷ 조회수) × 100 = 6.5%"
                />
              </span>
            </div>
          </div>

          {/* 채널 3: 유튜브 · 핀테크 위크 데모 */}
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrandLogo brandKey="youtube" size="sm" />
                <div>
                  <div className="font-bold text-white text-sm">유튜브 · 핀테크 데모</div>
                  <div className="text-xs text-slate-400 font-sans">@CredosPartners</div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-semibold bg-dark-800 text-slate-300 border border-dark-700 font-sans">
                솔루션 기술 시연
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate whitespace-nowrap" title="TOMS 신탁전산화 · PDAS 동적 자산유동화 특허 및 핀테크 위크 시연">
              TOMS 신탁전산화 · PDAS 동적 자산유동화 특허 및 핀테크 위크 시연
            </p>
            <div className="pt-2 border-t border-dark-750/80 flex items-center justify-between text-xs text-slate-400">
              <span>타깃: 금융 IT · 구조화금융 실무진</span>
              <span className="text-brand-cyan font-semibold font-sans inline-flex items-center">
                <span>참여율 6.4%</span>
                <EngagementFormulaTooltip
                  detail="유튜브·핀테크 데모(@CredosPartners) 3개월 평균: (반응 합계 ÷ 조회수) × 100 = 6.4%"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 채널별 유도형 반응 분석 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-dark-750">
          <div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-normal">
                채널별 유도형 반응 분석
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-bold bg-cyan-500/20 text-brand-cyan border border-cyan-500/40 font-sans">
                월별 합계 실측치
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              3대 채널(링크드인 글로벌, 네이버 금융 PR, 유튜브 기술 데모) 월별 인터랙션 합계 비교
            </p>
          </div>
          <span className="text-xs text-slate-400 font-sans self-start sm:self-auto">
            9월 · 8월 · 7월 실측
          </span>
        </div>

        {/* 9월 | 8월 | 7월 각 월별 데이터 합계 3열 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 9월 실시간 */}
          <div className="p-4 rounded-xl bg-dark-850 border border-cyan-500/40 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-dark-750">
              <span className="text-xs font-bold text-brand-cyan font-sans">2026년 9월 (실시간)</span>
              <span className="text-xs text-slate-400 font-sans">전월(8월) 대비</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">조회수</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans">4.48만 회</span>
                  <span className="text-xs font-semibold text-emerald-400 font-sans bg-emerald-500/10 px-1.5 py-0.5 rounded">+23.8%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">총 반응 (추천+문의+공유)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans">3,055건</span>
                  <span className="text-xs font-semibold text-emerald-400 font-sans bg-emerald-500/10 px-1.5 py-0.5 rounded">+30.9%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">평균 참여율</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans inline-flex items-center">
                    <span>6.82%</span>
                    <EngagementFormulaTooltip
                      detail="9월 실측: 3,055건(추천+문의+공유) ÷ 44,800회 × 100 = 6.82%"
                    />
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 font-sans bg-emerald-500/10 px-1.5 py-0.5 rounded">+0.37%p</span>
                </div>
              </div>
            </div>
          </div>

          {/* 8월 확정 */}
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-dark-750">
              <span className="text-xs font-bold text-slate-200 font-sans">2026년 8월 (확정)</span>
              <span className="text-xs text-slate-400 font-sans">전월(7월) 대비</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">조회수</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans">3.62만 회</span>
                  <span className="text-xs font-semibold text-rose-400 font-sans bg-rose-500/10 px-1.5 py-0.5 rounded">-25.4%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">총 반응 (추천+문의+공유)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans">2,334건</span>
                  <span className="text-xs font-semibold text-rose-400 font-sans bg-rose-500/10 px-1.5 py-0.5 rounded">-26.0%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">평균 참여율</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans inline-flex items-center">
                    <span>6.45%</span>
                    <EngagementFormulaTooltip
                      detail="8월 실측: 2,334건(추천+문의+공유) ÷ 36,200회 × 100 = 6.45%"
                    />
                  </span>
                  <span className="text-xs font-semibold text-rose-400 font-sans bg-rose-500/10 px-1.5 py-0.5 rounded">-0.05%p</span>
                </div>
              </div>
            </div>
          </div>

          {/* 7월 피크 */}
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-dark-750">
              <span className="text-xs font-bold text-slate-200 font-sans">2026년 7월 (피크)</span>
              <span className="text-xs text-slate-400 font-sans">기준월</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">조회수</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans">4.85만 회</span>
                  <span className="text-xs font-semibold text-slate-400 font-sans bg-dark-750 px-1.5 py-0.5 rounded">기준</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">총 반응 (추천+문의+공유)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans">3,152건</span>
                  <span className="text-xs font-semibold text-slate-400 font-sans bg-dark-750 px-1.5 py-0.5 rounded">기준</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900/80 border border-dark-750/70">
                <span className="text-xs text-slate-400">평균 참여율</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-sans inline-flex items-center">
                    <span>6.50%</span>
                    <EngagementFormulaTooltip
                      detail="7월 실측: 3,152건(추천+문의+공유) ÷ 48,500회 × 100 = 6.50%"
                    />
                  </span>
                  <span className="text-xs font-semibold text-slate-400 font-sans bg-dark-750 px-1.5 py-0.5 rounded">기준</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3대 채널별 유도형 반응 실측 요약 표 */}
        <div className="overflow-x-auto sm:overflow-visible rounded-xl border border-dark-750">
          <table 
            className="w-full text-left text-xs sm:text-sm table-fixed min-w-[700px] font-sans"
            style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <thead className="bg-dark-850 text-slate-300 font-bold border-b border-dark-750 text-xs">
              <tr>
                <th className="py-2.5 px-3.5 w-[22%]">운영 채널</th>
                <th className="py-2.5 px-3.5 w-[26%]">핵심 콘텐츠 테마</th>
                <th className="py-2.5 px-3.5 w-[26%]">9월 반응 실측치 (조회수/반응/참여율)</th>
                <th className="py-2.5 px-3.5 w-[26%]">유저 유도 반응</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750/70 text-xs sm:text-sm font-sans">
              
              {/* 1. 링크드인 글로벌 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle">
                  <div className="flex items-center gap-2">
                    <BrandLogo brandKey="linkedin" size="xs" />
                    <div>
                      <div className="font-bold text-white">링크드인 글로벌 공식</div>
                      <div className="text-xs text-slate-400 font-sans">@credos-partners</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 text-xs">
                  해외채권(ViewTrade)·홍콩 NHW·베트남 유동화 파트너십
                </td>
                <td className="py-2.5 px-3.5 text-slate-200 text-xs font-sans">
                  <span>2.15만 회 / 1,480건 / </span>
                  <strong className="text-brand-cyan">6.88%</strong>
                  <EngagementFormulaTooltip
                    detail="링크드인 글로벌 9월: 1,480건 ÷ 21,500회 × 100 = 6.88%"
                    align="center"
                  />
                </td>
                <td className="py-2.5 px-3.5 text-slate-200 text-xs">
                  해외 IB·자산운용사 제휴 문의 및 영문 백서 다운로드
                </td>
              </tr>

              {/* 2. 네이버 PR · 뉴스룸 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle">
                  <div className="flex items-center gap-2">
                    <BrandLogo brandKey="naver" size="xs" />
                    <div>
                      <div className="font-bold text-white">네이버 PR · 금융 뉴스룸</div>
                      <div className="text-xs text-slate-400 font-sans">credospartners.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 text-xs">
                  혁신금융 2건 지정 · 케이넷 Pre-A 20억 투자 유치 공시
                </td>
                <td className="py-2.5 px-3.5 text-slate-200 text-xs font-sans">
                  <span>1.48만 회 / 1,015건 / </span>
                  <strong className="text-brand-cyan">6.86%</strong>
                  <EngagementFormulaTooltip
                    detail="네이버 PR·뉴스룸 9월: 1,015건 ÷ 14,800회 × 100 = 6.86%"
                    align="center"
                  />
                </td>
                <td className="py-2.5 px-3.5 text-slate-200 text-xs">
                  국내 금융지주·신탁사 TOMS·AIP 도입 상담 신청
                </td>
              </tr>

              {/* 3. 유튜브 · 핀테크 데모 */}
              <tr className="hover:bg-dark-800/40 transition-colors">
                <td className="py-2.5 px-3.5 align-middle">
                  <div className="flex items-center gap-2">
                    <BrandLogo brandKey="youtube" size="xs" />
                    <div>
                      <div className="font-bold text-white">유튜브 · 핀테크 데모</div>
                      <div className="text-xs text-slate-400 font-sans">@CredosPartners</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3.5 text-slate-300 text-xs">
                  PDAS 동적 유동화 특허 아키텍처 및 핀테크 위크 시연
                </td>
                <td className="py-2.5 px-3.5 text-slate-200 text-xs font-sans">
                  <span>0.85만 회 / 560건 / </span>
                  <strong className="text-brand-cyan">6.59%</strong>
                  <EngagementFormulaTooltip
                    detail="유튜브 데모 9월: 560건 ÷ 8,500회 × 100 = 6.59%"
                    align="center"
                  />
                </td>
                <td className="py-2.5 px-3.5 text-slate-200 text-xs">
                  구조화금융·IT 실무진 기술 검증 및 PoC 미팅 전환
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default MarketingStatusSubpage;

