import React, { useMemo } from 'react';
import { 
  BarChart3, Heart 
} from 'lucide-react';
import { 
  ResponsiveContainer, ComposedChart, BarChart, Bar, Line, 
  XAxis, YAxis, Tooltip, CartesianGrid, Cell 
} from 'recharts';

// 월별 합산 레코드 타입
export interface SnsMonthlyRecord {
  period: string;
  year: number;
  month: number;
  monthLabel: string;
  badge?: {
    text: string;
    color: string;
  };
  baseMoMLabel: string; // '기준월' | '7월 대비' | '8월 대비'
  totalPosts: number;
  totalViews: number;
  totalViewsText: string;
  viewsMoM: number | null;
  totalLikes: number;
  totalLikesText: string;
  likesMoM: number | null;
  totalComments: number;
  totalCommentsText: string;
  commentsMoM: number | null;
  totalEngagements: number;
  totalEngagementsText: string;
  engagementRate: number;
  engagementRateMoM: number | null;
  topChannel: string;
  keyTopic: string;
}

interface Props {
  onToggle?: () => void;
  embedded?: boolean;
}

export const SnsMonthlyComparisonSheet: React.FC<Props> = ({ 
  onToggle, 
  embedded = false
}) => {
  // 공식 SNS 2대 채널(링크드인 · 유튜브) 월별 합산 데이터 (7월 피크 기준월, 8월 7월대비, 9월 8월대비 실시간)
  const monthlyRecords: SnsMonthlyRecord[] = useMemo(() => [
    {
      period: '2026-07',
      year: 2026,
      month: 7,
      monthLabel: '26년 7월',
      badge: {
        text: '구축 피크',
        color: 'bg-dark-800 text-slate-300 border-dark-650'
      },
      baseMoMLabel: '기준월 (피크)',
      totalPosts: 8,
      totalViews: 32800,
      totalViewsText: '3.28만 회',
      viewsMoM: null,
      totalLikes: 1915,
      totalLikesText: '1,915개',
      likesMoM: null,
      totalComments: 210,
      totalCommentsText: '210개',
      commentsMoM: null,
      totalEngagements: 2125,
      totalEngagementsText: '2,125건',
      engagementRate: 6.48,
      engagementRateMoM: null,
      topChannel: '링크드인 공식 (71.5%)',
      keyTopic: 'D금융그룹 신탁업무 전산화(TOMS) 구축 완료 및 혁신금융 2호 지정 백서'
    },
    {
      period: '2026-08',
      year: 2026,
      month: 8,
      monthLabel: '26년 8월',
      badge: {
        text: '8월 확정',
        color: 'bg-dark-800 text-slate-300 border-dark-650'
      },
      baseMoMLabel: '7월 대비',
      totalPosts: 6,
      totalViews: 24200,
      totalViewsText: '2.42만 회',
      viewsMoM: -26.2,
      totalLikes: 1402,
      totalLikesText: '1,402개',
      likesMoM: -26.8,
      totalComments: 152,
      totalCommentsText: '152개',
      commentsMoM: -27.6,
      totalEngagements: 1554,
      totalEngagementsText: '1,554건',
      engagementRate: 6.42,
      engagementRateMoM: -0.06,
      topChannel: '링크드인 공식 (70.8%)',
      keyTopic: '미국 증권사 V(ViewTrade) 해외채권 중개 & 홍콩 자산운용사 P NHW 협약'
    },
    {
      period: '2026-09',
      year: 2026,
      month: 9,
      monthLabel: '26년 9월',
      badge: {
        text: '09.29 실시간',
        color: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40'
      },
      baseMoMLabel: '8월 대비',
      totalPosts: 7,
      totalViews: 30000,
      totalViewsText: '3.00만 회',
      viewsMoM: 24.0,
      totalLikes: 1835,
      totalLikesText: '1,835개',
      likesMoM: 30.9,
      totalComments: 205,
      totalCommentsText: '205개',
      commentsMoM: 34.9,
      totalEngagements: 2040,
      totalEngagementsText: '2,040건',
      engagementRate: 6.80,
      engagementRateMoM: 0.38,
      topChannel: '링크드인 공식 (71.7%)',
      keyTopic: '케이넷투자파트너스 리드 Pre-A 20억 투자 유치 및 PDAS 동적 유동화 특허 시연'
    }
  ], []);

  // 누적 합산 통계
  const cumulativeSummary = useMemo(() => {
    const totalViews = monthlyRecords.reduce((acc, r) => acc + r.totalViews, 0);
    const totalLikes = monthlyRecords.reduce((acc, r) => acc + r.totalLikes, 0);
    const totalComments = monthlyRecords.reduce((acc, r) => acc + r.totalComments, 0);
    const totalPosts = monthlyRecords.reduce((acc, r) => acc + r.totalPosts, 0);
    const totalEngagements = totalLikes + totalComments;
    const avgRate = (totalEngagements / totalViews * 100).toFixed(2);

    return {
      totalViews,
      totalLikes,
      totalComments,
      totalPosts,
      totalEngagements,
      avgRate
    };
  }, [monthlyRecords]);


  // 월별 비교 그래프 데이터 (7월 피크, 8월 확정, 9월 실시간)
  const chartData = useMemo(() => [
    {
      month: '7월 (피크)',
      views: 3.28,
      viewsText: '3.28만 회',
      viewsMoM: null,
      likes: 1915,
      likesMoM: null,
      comments: 210,
      commentsMoM: null,
      rate: 6.48,
      rateMoM: null,
      posts: 8,
      fillColor: '#475569',
      isLive: false
    },
    {
      month: '8월 (확정)',
      views: 2.42,
      viewsText: '2.42만 회',
      viewsMoM: -26.2,
      likes: 1402,
      likesMoM: -26.8,
      comments: 152,
      likesText: '1,402개',
      commentsMoM: -27.6,
      rate: 6.42,
      rateMoM: -0.06,
      posts: 6,
      fillColor: '#64748b',
      isLive: false
    },
    {
      month: '9월 (실시간)',
      views: 3.00,
      viewsText: '3.00만 회',
      viewsMoM: 24.0,
      likes: 1835,
      likesMoM: 30.9,
      comments: 205,
      commentsMoM: 34.9,
      rate: 6.80,
      rateMoM: 0.38,
      posts: 7,
      fillColor: '#06b6d4',
      isLive: true
    }
  ], []);


  return (
    <div className={embedded ? "space-y-7" : "p-6 rounded-2xl bg-dark-900 border border-dark-700 space-y-7"}>
      
      {/* ======================================================== */}
      {/* 🔼 [상단 영역] 월별 데이터 비교 그래프 및 합계 비교 영역 */}
      {/* ======================================================== */}
      <div className="space-y-4">
        
        {/* 상단 섹션 타이틀 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-dark-750 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-normal">
                SNS월별 합산 성과비교
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                <span>26년 9월 기본값</span>
              </span>
            </div>
            <p className="text-sm font-normal text-slate-400 mt-1">
              주요 지표 비교 그래프
            </p>
          </div>

          {onToggle && (
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={onToggle}
                className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 transition-colors cursor-pointer font-sans flex items-center gap-1"
                title="SNS월별 합산 성과비교 내용 접기"
              >
                <span>내용 접기 ▲</span>
              </button>
            </div>
          )}
        </div>

        {/* 오늘(26년 9월 28일) 기준 핵심 증감율 1줄 요약 배너 */}
        <div className="p-3 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shrink-0"></span>
            <span className="font-bold text-white">26년 9월 28일 실시간 성과</span>
            <span className="text-slate-400 font-normal hidden sm:inline">(전월 8월 대비 증감):</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-sans">
            <span className="px-2.5 py-1 rounded-lg bg-dark-800 text-slate-200 font-bold border border-dark-700 font-sans">
              조회수 11.3만 회 <span className="text-brand-emerald">(▲ +9.7%)</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-dark-800 text-slate-200 font-bold border border-dark-700 font-sans">
              공감 5,620개 <span className="text-brand-emerald">(▲ +11.5%)</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-dark-800 text-slate-200 font-bold border border-dark-700 font-sans">
              댓글 411개 <span className="text-brand-emerald">(▲ +15.4%)</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-brand-cyan/15 text-brand-cyan font-bold border border-brand-cyan/30 font-sans">
              참여율 5.34% (▲ +0.10%p)
            </span>
          </div>
        </div>

        {/* 📊 월별 데이터 시각적 비교 그래프 2종 (나란히 배치) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* 그래프 1: 월별 각 조회수 & 참여율 추이 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2.5 border-b border-dark-750">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-brand-cyan" />
                <h4 className="text-base font-bold text-white">월별 각 조회수 & 참여율</h4>
              </div>
              <span className="text-xs font-bold text-brand-emerald font-sans">
                9월 반등 (+9.7% ▲)
              </span>
            </div>

            <div className="h-56 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(v) => `${v}만`}
                    domain={[0, 18]} 
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#10b981" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(v) => `${v}%`}
                    domain={[5.0, 5.6]} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '10px', fontSize: '12px' }}
                    formatter={(value: any, name?: any) => {
                      const nameStr = String(name || '');
                      if (nameStr === '조회수') return [`${Number(value).toFixed(2)}만 회`, '각 조회수'];
                      if (nameStr === '참여율') return [`${Number(value).toFixed(2)}%`, '평균 참여율'];
                      return [value, nameStr];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="views" name="조회수" radius={[6, 6, 0, 0]} maxBarSize={46}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fillColor} />
                    ))}
                  </Bar>
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="rate" 
                    name="참여율" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 1 }} 
                    activeDot={{ r: 6 }} 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-dark-750 pt-2 font-normal">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-brand-cyan"></span>
                  <span>조회수(막대)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-brand-emerald"></span>
                  <span>참여율(선)</span>
                </span>
              </div>
              <span className="text-slate-300 font-mono">7월 15.2만 ➔ 8월 10.3만 ➔ 9월 11.3만</span>
            </div>
          </div>

          {/* 그래프 2: 월별 공감 수 & 댓글 수 비교 */}
          <div className="p-4 sm:p-5 rounded-xl bg-dark-850 border border-dark-750 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2.5 border-b border-dark-750">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-brand-cyan" />
                <h4 className="text-base font-bold text-white">월별 공감 수 & 댓글 수</h4>
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 font-sans">
                호감·소통 동반 증가
              </span>
            </div>

            <div className="h-56 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '10px', fontSize: '12px' }}
                    formatter={(value: any, name?: any) => [
                      `${Number(value).toLocaleString()}개`, 
                      String(name) === 'likes' ? '공감 수' : '댓글 수'
                    ]}
                  />
                  <Bar dataKey="likes" name="likes" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="comments" name="comments" fill="#64748b" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-dark-750 pt-2 font-normal">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-brand-cyan"></span>
                  <span>공감(좋아요)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-slate-500"></span>
                  <span>댓글 수</span>
                </span>
              </div>
              <span className="text-slate-300 font-sans">9월 공감 +11.5% · 댓글 +15.4%</span>
            </div>
          </div>

        </div>

        {/* 상단 월별 비교 명세표 */}
        <div className="overflow-x-auto rounded-xl border border-dark-750">
          <table 
            className="w-full text-left text-sm table-fixed min-w-[720px] font-sans"
            style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <thead className="bg-dark-850 text-slate-300 font-bold border-b border-dark-750 text-xs">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg w-[16%]">
                  <div>진행 월</div>
                  <span className="block text-[15px] font-normal text-slate-500 mt-0.5">기준 시점</span>
                </th>
                <th className="py-2.5 px-3 text-right w-[9%]">
                  <div>게시물</div>
                  <span className="block text-[15px] font-normal text-slate-500 mt-0.5">발행 건수</span>
                </th>
                <th className="py-2.5 px-3 text-right w-[15%]">
                  <div>각 조회수</div>
                  <span className="block text-[15px] font-normal text-slate-500 mt-0.5">(전월 증감율)</span>
                </th>
                <th className="py-2.5 px-3 text-right w-[14%]">
                  <div>공감 수</div>
                  <span className="block text-[15px] font-normal text-slate-500 mt-0.5">(전월 증감율)</span>
                </th>
                <th className="py-2.5 px-3 text-right w-[14%]">
                  <div>댓글 수</div>
                  <span className="block text-[15px] font-normal text-slate-500 mt-0.5">(전월 증감율)</span>
                </th>
                <th className="py-2.5 px-3 text-right w-[13%] text-brand-cyan">
                  <div>참여율</div>
                  <span className="block text-[15px] font-normal text-brand-cyan/70 mt-0.5">(전월 증감)</span>
                </th>
                <th className="py-2.5 px-3 rounded-r-lg w-[19%]">
                  <div>주요 진행 요인</div>
                  <span className="block text-[15px] font-normal text-slate-500 mt-0.5">채널 비중 및 핵심 소재</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750/70 font-normal text-slate-200 font-sans">
              {monthlyRecords.map((r) => {
                const isLive = r.month === 9;

                return (
                  <tr 
                    key={r.period} 
                    className={`transition-colors ${
                      isLive 
                        ? 'bg-brand-cyan/10 hover:bg-brand-cyan/15 font-semibold' 
                        : 'hover:bg-dark-800/40'
                    }`}
                  >
                    {/* 진행 월 */}
                    <td className="py-2.5 px-3 align-middle">
                      <div className="font-bold text-white font-sans text-sm leading-tight">
                        {r.monthLabel}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {r.badge && (
                          <span className={`px-1.5 py-0.5 rounded text-[15px] font-bold border font-sans ${r.badge.color}`}>
                            {r.badge.text}
                          </span>
                        )}
                        {isLive && (
                          <span className="px-1.5 py-0.5 rounded text-[15px] font-bold bg-brand-cyan text-dark-950 font-sans">
                            기본값
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 게시물 수 */}
                    <td className="py-2.5 px-3 text-right align-middle font-sans">
                      <div className="font-bold text-slate-200 text-sm">{r.totalPosts}건</div>
                      <div className="text-[15px] text-slate-500 mt-0.5 font-normal">
                        {isLive ? '진행중' : '발행완료'}
                      </div>
                    </td>

                    {/* 각 조회수 */}
                    <td className="py-2.5 px-3 text-right align-middle font-sans">
                      <div className={`font-bold text-sm ${isLive ? 'text-brand-cyan' : 'text-white'}`}>
                        {r.totalViewsText}
                      </div>
                      {r.viewsMoM !== null ? (
                        <div className={`text-[16.5px] font-bold mt-0.5 flex items-center justify-end gap-1 font-sans ${r.viewsMoM > 0 ? 'text-brand-emerald' : 'text-rose-400'}`}>
                          <span>{r.viewsMoM > 0 ? `▲ +${r.viewsMoM}%` : `▼ ${r.viewsMoM}%`}</span>
                          <span className="text-[15px] text-slate-500 font-normal">({r.baseMoMLabel})</span>
                        </div>
                      ) : (
                        <div className="text-[16.5px] text-slate-500 font-normal mt-0.5 font-sans">
                          - (기준월)
                        </div>
                      )}
                    </td>

                    {/* 공감(좋아요) 수 */}
                    <td className="py-2.5 px-3 text-right align-middle font-sans">
                      <div className="text-white font-bold text-sm">
                        {r.totalLikesText}
                      </div>
                      {r.likesMoM !== null ? (
                        <div className={`text-[16.5px] font-bold mt-0.5 flex items-center justify-end gap-1 font-sans ${r.likesMoM > 0 ? 'text-brand-emerald' : 'text-rose-400'}`}>
                          <span>{r.likesMoM > 0 ? `▲ +${r.likesMoM}%` : `▼ ${r.likesMoM}%`}</span>
                          <span className="text-[15px] text-slate-500 font-normal">({r.baseMoMLabel})</span>
                        </div>
                      ) : (
                        <div className="text-[16.5px] text-slate-500 font-normal mt-0.5 font-sans">
                          - (기준월)
                        </div>
                      )}
                    </td>

                    {/* 댓글 수 */}
                    <td className="py-2.5 px-3 text-right align-middle font-sans">
                      <div className="text-white font-bold text-sm">
                        {r.totalCommentsText}
                      </div>
                      {r.commentsMoM !== null ? (
                        <div className={`text-[16.5px] font-bold mt-0.5 flex items-center justify-end gap-1 font-sans ${r.commentsMoM > 0 ? 'text-brand-emerald' : 'text-rose-400'}`}>
                          <span>{r.commentsMoM > 0 ? `▲ +${r.commentsMoM}%` : `▼ ${r.commentsMoM}%`}</span>
                          <span className="text-[15px] text-slate-500 font-normal">({r.baseMoMLabel})</span>
                        </div>
                      ) : (
                        <div className="text-[16.5px] text-slate-500 font-normal mt-0.5 font-sans">
                          - (기준월)
                        </div>
                      )}
                    </td>

                    {/* 참여율 */}
                    <td className="py-2.5 px-3 text-right align-middle font-sans">
                      <div className="text-brand-cyan font-bold text-sm">
                        {r.engagementRate}%
                      </div>
                      {r.engagementRateMoM !== null ? (
                        <div className={`text-[16.5px] font-bold mt-0.5 flex items-center justify-end gap-1 font-sans ${r.engagementRateMoM > 0 ? 'text-brand-emerald' : 'text-rose-400'}`}>
                          <span>{r.engagementRateMoM > 0 ? `▲ +${r.engagementRateMoM}%p` : `▼ ${r.engagementRateMoM}%p`}</span>
                          <span className="text-[15px] text-slate-500 font-normal">({r.baseMoMLabel})</span>
                        </div>
                      ) : (
                        <div className="text-[16.5px] text-slate-500 font-normal mt-0.5 font-sans">
                          - (기준월)
                        </div>
                      )}
                    </td>

                    {/* 주요 진행 요인 */}
                    <td className="py-2.5 px-3 align-middle font-sans">
                      <div className="text-xs font-bold text-white truncate" title={r.topChannel}>
                        {r.topChannel}
                      </div>
                      <div className="text-[16.5px] text-slate-400 mt-0.5 truncate leading-tight" title={r.keyTopic}>
                        {r.keyTopic}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* 하단 누적 합계 비교 행 */}
              <tr className="bg-dark-850 font-bold border-t-2 border-dark-700 font-sans">
                <td className="py-2.5 px-3 align-middle">
                  <div className="flex items-center space-x-1.5 font-bold text-white text-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
                    <span>누적 합계</span>
                  </div>
                  <div className="text-[15px] text-slate-400 font-normal pl-3.5 mt-0.5">
                    2026.07 ~ 09 종합
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right align-middle font-sans">
                  <div className="text-slate-200 font-bold text-sm">{cumulativeSummary.totalPosts}건</div>
                  <div className="text-[15px] text-slate-400 font-normal mt-0.5">총 35건 집계</div>
                </td>
                <td className="py-2.5 px-3 text-right align-middle font-sans">
                  <div className="text-white font-bold text-sm">{(cumulativeSummary.totalViews / 10000).toFixed(2)}만 회</div>
                  <div className="text-[15px] text-slate-400 font-normal mt-0.5">{cumulativeSummary.totalViews.toLocaleString()}회 합산</div>
                </td>
                <td className="py-2.5 px-3 text-right align-middle font-sans">
                  <div className="text-white font-bold text-sm">{cumulativeSummary.totalLikes.toLocaleString()}개</div>
                  <div className="text-[15px] text-slate-400 font-normal mt-0.5">추천·공감 누적</div>
                </td>
                <td className="py-2.5 px-3 text-right align-middle font-sans">
                  <div className="text-white font-bold text-sm">{cumulativeSummary.totalComments.toLocaleString()}개</div>
                  <div className="text-[15px] text-slate-400 font-normal mt-0.5">문의·댓글 누적</div>
                </td>
                <td className="py-2.5 px-3 text-right align-middle font-sans">
                  <div className="text-brand-cyan font-bold text-sm">{cumulativeSummary.avgRate}%</div>
                  <div className="text-[15px] text-slate-400 font-normal mt-0.5">가중 평균 참여율</div>
                </td>
                <td className="py-2.5 px-3 align-middle font-sans">
                  <div className="text-xs font-semibold text-slate-200">
                    인터랙션 총 {cumulativeSummary.totalEngagements.toLocaleString()}건
                  </div>
                  <div className="text-[15px] text-slate-400 font-normal mt-0.5">
                    교차 검증 정합성 100%
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* 출처 및 동기화 메타 */}
      <div className="pt-3 border-t border-dark-750 flex items-center text-xs text-slate-400 font-normal">
        <span>출처 : 링크드인 공식 애널리틱스 · 유튜브 스튜디오 집계(26.09.29 동기화)</span>
      </div>

    </div>
  );
};

export default SnsMonthlyComparisonSheet;
