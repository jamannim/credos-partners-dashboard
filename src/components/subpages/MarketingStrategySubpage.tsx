import React, { useState } from 'react';
import { 
  Rocket, Compass, CheckCircle2, Sparkles, 
  Calendar, Share2, MapPin, Search, Zap, ArrowRight
} from 'lucide-react';
import type { CompleteServiceIntelligence } from '../../types/intelligence';
import { BrandBadgesFromText, BrandLogo } from '../BrandLogo';
import { getTableDensityClasses, type TableDensity } from '../TableDensityControl';
import { PdfReportButton } from '../PdfReportButton';
import { KeywordConquestGuidePage } from './KeywordConquestGuidePage';

import type { SubViewId } from '../Header';

interface Props {
  data: CompleteServiceIntelligence;
  activeSubView?: SubViewId;
  onSubViewChange?: (subView: SubViewId) => void;
}

export const MarketingStrategySubpage: React.FC<Props> = ({
  data,
  activeSubView = 'main',
  onSubViewChange,
}) => {
  const { service, marketingStrategy } = data;
  const [selectedKeywordGuideRank, setSelectedKeywordGuideRank] = useState<number | null>(null);
  const density: TableDensity = 'auto';
  const dClasses = getTableDensityClasses(density);

  // Fallback pillars for Namane if not dynamically supplied
  const defaultPillars = [
    {
      id: 'global',
      title: '구글 & 레딧 커뮤니티 상단 선점',
      targetPortal: '구글 / 빙',
      budget: '자체 채널',
      timeline: '1순위 · 1주차 실행',
      goal: '자유여행객 유입 +55% (월 1.5만 ➔ 2.3만 회)',
      accentColor: 'border-brand-cyan/50 bg-brand-cyan/5',
      badgeColor: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
      keyPoint: '구글 검색 상위에 노출되는 레딧 커뮤니티 비교 정보글 선점',
      coreActions: [
        '레딧 한국여행 커뮤니티에 [한국 교통·선불카드 비교 가이드] 기고',
        '킬러 기능: "해외 신용카드 즉시 앱 충전 + 사진 인쇄" 강조',
        '인천공항·홍대·명동 등 20개 거점별 영문 키오스크 페이지 배포',
        '트립어드바이저 여행 포럼 질의응답 게시판에 공식 키오스크 지도 연결'
      ]
    },
    {
      id: 'korea',
      title: '네이버 스마트플레이스 등록 및 숏폼 확산',
      targetPortal: '네이버 / 구글',
      budget: '자체 등록',
      timeline: '2순위 · 1~2주차 실행',
      goal: '발급처 검색 전환율 2.5배 상승',
      accentColor: 'border-brand-emerald/50 bg-brand-emerald/5',
      badgeColor: 'bg-brand-emerald/20 text-brand-emerald border-brand-emerald/40',
      keyPoint: '네이버 검색 상단 스마트플레이스 지도 영역 1위 선점',
      coreActions: [
        '공항철도 및 주요 역사·편의점 키오스크를 스마트플레이스에 공식 등록',
        '플레이스 상세 사진에 "즉석 포토카드 출력 가능" 안내 등록',
        '유튜브 쇼츠·틱톡에 "3초 만에 폰 사진으로 카드 뽑기" 15초 영상 업로드',
        '숏폼 2편: "개찰구 잔액 부족 1초 해결법 (페이↔교통 전환)" 제작'
      ]
    },
    {
      id: 'japan',
      title: '야후재팬 & 트위터 팬덤 바이럴',
      targetPortal: '야후재팬 / 구글',
      budget: '자체 바이럴',
      timeline: '3순위 · 2~3주차 실행',
      goal: '팬덤 유입 +70% (월 1.3만 ➔ 2.2만 회)',
      accentColor: 'border-brand-purple/50 bg-brand-purple/5',
      badgeColor: 'bg-brand-purple/20 text-brand-purpleLight border-brand-purple/40',
      keyPoint: '최애 굿즈를 소장하려는 K-POP 팬덤 심리를 자극하여 자발적 공유 유도',
      coreActions: [
        '트위터에 [아이돌 생일/컴백 맞춤 포토 프레임 템플릿] 무료 배포',
        '팬덤 해시태그 기반 실물 카드 인증샷 리트윗 챌린지',
        '야후 지혜주머니 "한국 교통카드 추천" 질문에 공식 답변 배치',
        '전용 키오스크 위치 안내 페이지 검색 1위 노출'
      ]
    },
    {
      id: 'ai',
      title: '인공지능 검색 추천 1순위 선점',
      targetPortal: '챗GPT / 퍼플렉시티 / 구글',
      budget: '자체 배포',
      timeline: '4순위 · 3~4주차 실행',
      goal: 'AI 추천 질문 답변 시 와우패스와 함께 대표 카드로 동시 추천',
      accentColor: 'border-brand-amber/50 bg-brand-amber/5',
      badgeColor: 'bg-brand-amber/20 text-brand-amber border-brand-amber/40',
      keyPoint: '여행객이 활용하는 AI 챗봇 추천 답변에 대표 카드로 노출',
      coreActions: [
        '공식 웹사이트에 AI 챗봇이 인식하기 쉬운 서비스 정보 구조화 태그 적용',
        '영문 위키피디아 한국 교통카드 항목에 공식 정보 등재',
        '인공지능 챗봇 검색 대응 공식 서비스 소개서 배포',
        '글로벌 여행 플랫폼 리뷰에 "포토카드 겸용 교통카드" 키워드 집약'
      ]
    }
  ];

  const defaultKeywordMatrix = [
    { rank: 1, keyword: 'namane card', portal: '구글', country: '', channel: '레딧 커뮤니티 & 영문 검색', action: '3사 비교 가이드 기고 및 영문 검색 태그 최적화', impact: '+45% 유입 증대' },
    { rank: 2, keyword: '나마네카드 키오스크 위치', portal: '네이버', country: '', channel: '네이버 스마트플레이스', action: '전국 키오스크 20곳 스마트플레이스 공식 등록', impact: '+150% 지도 노출' },
    { rank: 3, keyword: '포토 교통카드 제작', portal: '야후재팬 / 트위터', country: '', channel: '트위터 & 야후 지혜주머니', action: '팬덤 포토 프레임 무료 배포 및 리트윗 챌린지', impact: '+65% 유입 증대' },
    { rank: 4, keyword: '공항·역사 무인발급기', portal: '구글 / 야후', country: '', channel: '거점별 검색 최적화', action: '공항·역사별 20개 단독 랜딩페이지 생성 및 인덱싱', impact: '+80% 유입 증대' },
    { rank: 5, keyword: 'korea custom transit card', portal: '구글 / 인공지능', country: '', channel: '인공지능 검색 최적화', action: '구조화 태그 적용 및 위키피디아 공식 등재', impact: '+50% AI 추천 노출' },
  ];

  const defaultRoadmap = [
    {
      week: '1주차',
      title: '지도 & 거점 페이지 등록',
      budget: '자체 운영',
      actions: [
        '네이버 지도에 키오스크 20곳 전수 등록',
        '거점별 영문/일문 안내 페이지 배포',
        '웹사이트 AI 챗봇 인식용 태그 삽입'
      ]
    },
    {
      week: '2주차',
      title: '글로벌 커뮤니티 선점',
      budget: '자체 운영',
      actions: [
        '레딧 한국여행 커뮤니티에 [교통카드 올인원 가이드] 기고',
        '야후 지혜주머니 추천 질의응답 공식 답변 배치',
        '글로벌 여행 포럼에 키오스크 지도 링크 연결'
      ]
    },
    {
      week: '3주차',
      title: '팬덤 바이럴 & 숏폼 확산',
      budget: '자체 운영',
      actions: [
        '트위터에 [최애 포토카드 프레임] 무료 배포',
        '나마네 실물 카드 인증샷 리트윗 챌린지 오픈',
        '유튜브 쇼츠 / 틱톡에 15초 튜토리얼 2편 업로드'
      ]
    },
    {
      week: '4주차',
      title: '성과 측정 & 전환율 극대화',
      budget: '자체 운영',
      actions: [
        '포털별 검색 순위 변동 추적 분석',
        '유입자의 앱 다운로드 버튼 클릭률 최적화',
        '성과 높은 키워드 중심 2차 콘텐츠 보강'
      ]
    }
  ];

  const pillars = marketingStrategy?.pillars || defaultPillars;
  const keywordMatrix = marketingStrategy?.keywordMatrix || defaultKeywordMatrix;
  const roadmap = marketingStrategy?.roadmap || defaultRoadmap;

  const getPillarIcon = (id: string) => {
    if (id.includes('japan') || id.includes('viral') || id.includes('sns') || id.includes('share')) return Share2;
    if (id.includes('global') || id.includes('seo') || id.includes('community')) return Compass;
    if (id.includes('korea') || id.includes('local') || id.includes('map')) return MapPin;
    if (id.includes('ai') || id.includes('aeo') || id.includes('tech')) return Sparkles;
    return Rocket;
  };

  const isKeywordGuideOpen = selectedKeywordGuideRank !== null || activeSubView === 'keyword-guide';

  if (isKeywordGuideOpen) {
    return (
      <KeywordConquestGuidePage
        serviceName={service.name}
        initialRank={selectedKeywordGuideRank ?? 1}
        onBack={() => {
          setSelectedKeywordGuideRank(null);
          onSubViewChange?.('main');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* 1. Header Banner - Clean & High Contrast */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <BrandLogo domain={service.domain} size="md" />
            <span>마케팅전략</span>
            <span className="text-sm font-normal text-slate-400 font-sans">| 오가닉 성장 실행 플랜</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1.5 max-w-3xl font-medium">
            {marketingStrategy?.summaryGoal || '글로벌 검색 최적화 기반 오가닉 설치 70% 달성'}
          </p>
        </div>

        <div className="flex items-center self-end md:self-center shrink-0">
          {/* PDF 다운로드 버튼 (박스 우측 상단 통일) */}
          <PdfReportButton data={data} tab="marketing-strategy" />
        </div>
      </div>

      {/* 3. Four Strategic Pillars Section */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-dark-700">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-brand-amber" />
            4대 핵심 집중 유입 채널
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            채널별 특성 기반 최소 리소스 투입 대비 최대 효과 실행 과제
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((pillar, idx) => {
            const pillarOrder = idx + 1;
            const Icon = getPillarIcon(pillar.id);
            const cleanTitle = (pillar.title.includes(':') ? pillar.title.split(':')[1] : pillar.title)
              .replace(/\s*\d+%/g, '')
              .trim();
            const cleanTargetPortal = pillar.targetPortal.replace(/\s*\([^)]*%\)/g, '').trim();
            return (
              <div 
                key={pillar.id}
                className={`p-6 rounded-2xl border transition-all duration-200 ${pillar.accentColor || 'border-dark-700 bg-dark-900'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl bg-dark-850 border border-brand-cyan/50 flex items-center justify-center text-brand-cyan text-lg font-black shrink-0 shadow-sm"
                      title={`실행 순위 ${pillarOrder}순위`}
                    >
                      {pillarOrder}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border inline-block ${pillar.badgeColor}`}>
                          {cleanTargetPortal}
                        </span>
                        <span className="inline-flex items-center text-xs font-bold text-slate-400">
                          <Icon className="w-3.5 h-3.5 mr-1 text-brand-purpleLight" />
                          {pillarOrder}순위 채널
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {cleanTitle}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-3.5 rounded-xl bg-dark-850/80 border border-dark-750">
                  <div className="text-xs text-brand-purpleLight font-bold mb-1">💡 핵심 전략 1줄</div>
                  <p className="text-sm font-semibold text-slate-100 leading-snug">
                    {pillar.keyPoint}
                  </p>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    즉시 실행 과제
                  </div>
                  {pillar.coreActions.map((action, aIdx) => (
                    <div key={aIdx} className="flex items-start space-x-2.5 text-sm text-slate-200">
                      <span className="w-5 h-5 rounded-md bg-dark-800 text-brand-emerald text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-dark-700">
                        {aIdx + 1}
                      </span>
                      <span className="leading-snug">{action}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3.5 border-t border-dark-700/60 flex items-center justify-between text-xs">
                  <div className="text-slate-400 font-medium">
                    소요 일정: <strong className="text-white font-bold ml-1">{pillar.timeline}</strong>
                  </div>
                  <div className="text-brand-emerald font-bold bg-brand-emerald/10 px-2.5 py-1 rounded-md">
                    목표: {pillar.goal}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Keyword Conquest Matrix */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-700 gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center tracking-normal">
              <Search className="w-5 h-5 mr-2 text-brand-cyan" />
              핵심 유입 키워드별 공략 매트릭스
            </h3>
            <p className="text-sm text-slate-400 mt-0.5 leading-relaxed tracking-normal">
              상위 5대 키워드 채널 매칭 및 단계별 실행 플랜
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-dark-800 text-slate-300 border border-dark-700">
              자체 채널 및 오가닉 검색 기준
            </span>
            <button
              onClick={() => setSelectedKeywordGuideRank(1)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-brand-cyan hover:bg-brand-cyan/90 text-dark-950 flex items-center gap-1.5 transition-colors shadow-lg shadow-brand-cyan/20 cursor-pointer"
            >
              <span>1번부터 공략집 상세 가이드 실행</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full text-left text-slate-200 ${dClasses.tableText}`}>
            <thead className="bg-dark-850">
              <tr>
                <th className={`${dClasses.th} rounded-l-lg`}>순위 / 타겟 키워드</th>
                <th className={dClasses.th}>목표 포털</th>
                <th className={dClasses.th}>공략 채널</th>
                <th className={dClasses.th}>핵심 실행 방안</th>
                <th className={`${dClasses.th} rounded-r-lg`}>기대 효과</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750">
              {keywordMatrix.map((item) => (
                <tr key={item.rank} className="hover:bg-dark-800/60 transition-colors">
                  <td className={`${dClasses.td} font-bold text-white`}>
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded bg-dark-750 text-center text-xs font-bold text-brand-purpleLight flex items-center justify-center shrink-0">
                        {item.rank}
                      </span>
                      <span className="font-black text-white tracking-normal break-keep">{item.keyword}</span>
                    </div>
                  </td>
                  <td className={`${dClasses.td} font-medium text-slate-300 align-middle`}>
                    <div className="flex flex-wrap gap-1 py-0.5 whitespace-nowrap">
                      {item.portal
                        .split('/')
                        .map(p => p.replace(/\s*\([^)]*%\)/g, '').trim())
                        .filter(Boolean)
                        .map((p, pIdx) => (
                          <div key={pIdx} className="inline-flex items-center px-2 py-0.5 rounded bg-dark-800 border border-dark-750 text-xs w-fit whitespace-nowrap">
                            <BrandBadgesFromText text={p} size="xs" />
                          </div>
                        ))}
                    </div>
                  </td>
                  <td className={`${dClasses.td} font-bold text-brand-cyan tracking-normal break-keep`}>
                    <BrandBadgesFromText text={item.channel} size="xs" />
                  </td>
                  <td className={`${dClasses.td} text-slate-200 font-medium max-w-sm leading-relaxed tracking-normal break-keep`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span>{item.action}</span>
                      <button
                        onClick={() => setSelectedKeywordGuideRank(item.rank)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                          item.rank === 1
                            ? 'bg-brand-cyan text-dark-950 hover:bg-brand-cyan/90 font-black'
                            : 'bg-dark-800 text-brand-cyan hover:bg-dark-750 border border-brand-cyan/40'
                        }`}
                      >
                        <span>{item.rank === 1 ? '1번 공략집 실행' : `${item.rank}번 공략집 보기`}</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </td>
                  <td className={`${dClasses.td} font-black text-brand-emerald whitespace-nowrap tracking-normal`}>
                    {item.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. 30-Day Timeline Roadmap */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-dark-700 gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-brand-purpleLight" />
              30일 완성 주차별 실행 로드맵
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              1주차~4주차 B2B 검색 색인 및 기술 백서·솔루션 리드 전환 실행 일정
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmap.map((phase, idx) => {
            const isWeek1 = idx === 0;
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isWeek1
                    ? 'bg-dark-850 border-brand-purple/60 shadow-md'
                    : 'bg-dark-950/60 border-dark-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        isWeek1
                          ? 'bg-brand-purple/20 text-brand-purpleLight border-brand-purple/40'
                          : 'bg-dark-800 text-slate-300 border-dark-700'
                      }`}
                    >
                      {phase.week}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-emerald/20 text-brand-emerald">
                      운영: {phase.budget}
                    </span>
                  </div>
                  <h4 className="text-base font-bold mb-3 text-white">
                    {phase.title}
                  </h4>
                  <div className="space-y-2">
                    {phase.actions.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-start space-x-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                        <span className="leading-snug">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-dark-700/50 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">
                    상태: {isWeek1 ? '즉시 실행' : '순차 진행'}
                  </span>
                  <span className={`text-xs font-bold ${isWeek1 ? 'text-brand-emerald' : 'text-slate-400'}`}>
                    {isWeek1 ? '1순위 착수' : `${idx + 1}주차 예정`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default MarketingStrategySubpage;
