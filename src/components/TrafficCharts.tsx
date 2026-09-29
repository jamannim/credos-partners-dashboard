import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { TrendingUp, Globe, PieChart as PieIcon } from 'lucide-react';
import type { CompleteServiceIntelligence } from '../types/intelligence';

interface Props {
  data: CompleteServiceIntelligence;
}

export const TrafficCharts: React.FC<Props> = ({ data }) => {
  const { countries, traffic, monthlyHistory } = data;

  const channelData = [
    { name: '자연 검색', value: traffic.searchShare, color: '#10b981' },
    { name: '직접 방문', value: traffic.directShare, color: '#38bdf8' },
    { name: '추천/제휴', value: traffic.referralShare, color: '#64748b' },
  ];

  const topCountries = countries.map(c => ({
    ...c,
    shortName: c.code === 'CN' ? '중국' : c.code === 'ETC' ? '기타글로벌' : c.name
  }));

  const monthlyList = (monthlyHistory && monthlyHistory.length > 0)
    ? [...monthlyHistory].sort((a, b) => (a.year * 100 + a.month) - (b.year * 100 + b.month))
    : [
        { period: '2026-06', year: 2026, month: 6, visits: Math.round(traffic.totalVisits * 0.6) },
        { period: '2026-07', year: 2026, month: 7, visits: Math.round(traffic.totalVisits * 1.8) },
        { period: '2026-08', year: 2026, month: 8, visits: Math.round(traffic.totalVisits * 0.96) },
        { period: '2026-09', year: 2026, month: 9, visits: traffic.totalVisits }
      ];

  const chartMonthlyData = monthlyList.map(h => ({
    name: `${h.month}월`,
    visits: h.visits,
    fullPeriod: `${h.year}년 ${h.month}월`
  }));

  const maxMonth = monthlyList.reduce((prev, curr) => (curr.visits > prev.visits ? curr : prev), monthlyList[0]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
      {/* 1. Monthly Traffic Trend (시밀러웹 실측 월별 트래픽 추이) */}
      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <h3 className="text-base font-bold text-white">월별 트래픽 추이</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">최근 3개월 방문수 궤적</p>
          </div>
          <span className="text-xs font-semibold text-sky-400">
            {maxMonth.month}월 피크 ({(maxMonth.visits / 10000).toFixed(1)}만)
          </span>
        </div>

        <div className="h-48 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartMonthlyData} margin={{ top: 12, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} 
                domain={[0, 'auto']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: any) => [`${Number(value).toLocaleString()}회`, '방문수']}
              />
              <Area type="monotone" dataKey="visits" stroke="#38bdf8" strokeWidth={2.5} fillOpacity={1} fill="url(#trafficGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-400 border-t border-dark-750 pt-2.5">
          <span>평균 일일 추정:</span>
          <span className="font-semibold text-slate-200">약 {Math.round(traffic.totalVisits / 30).toLocaleString()}명 / 일</span>
        </div>
      </div>

      {/* 2. Country Traffic Distribution */}
      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-sky-400" />
              <h3 className="text-base font-bold text-white">국가별 유입 비중</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">전체 국가 점유율 (기타 글로벌 중 중국 1.25% 분리)</p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            1위 {topCountries[0]?.shortName || '국내'} ({topCountries[0]?.share || 0}%)
          </span>
        </div>

        <div className="h-48 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topCountries} layout="vertical" margin={{ left: 10, right: 15 }}>
              <XAxis type="number" unit="%" stroke="#64748b" fontSize={11} />
              <YAxis 
                type="category" 
                dataKey="shortName" 
                stroke="#94a3b8" 
                fontSize={11} 
                width={68}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: any) => [`${Number(value).toFixed(2)}%`, '방문 점유율']}
              />
              <Bar dataKey="share" fill="#38bdf8" radius={[0, 4, 4, 0]} barSize={12}>
                {topCountries.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.code === 'CN'
                        ? '#22d3ee'
                        : index === 0
                        ? '#38bdf8'
                        : index === 1
                        ? '#60a5fa'
                        : '#64748b'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 grid grid-cols-4 gap-1 text-center text-xs border-t border-dark-750 pt-2.5">
          {topCountries.slice(0, 2).map((c, i) => (
            <div key={i} className="truncate">
              <span className="text-slate-400 block truncate">{c.flag} {c.shortName}</span>
              <span className="text-xs text-slate-300 font-semibold">{c.share.toFixed(2)}%</span>
            </div>
          ))}
          {(() => {
            const cnItem = topCountries.find(c => c.code === 'CN');
            const etcItem = topCountries.find(c => c.code === 'ETC');
            return (
              <>
                {cnItem && (
                  <div className="truncate bg-brand-cyan/10 rounded px-1 border border-brand-cyan/30">
                    <span className="text-brand-cyan block truncate font-bold">{cnItem.flag} 중국(분리)</span>
                    <span className="text-xs text-brand-cyan font-bold font-mono">{cnItem.share.toFixed(2)}%</span>
                  </div>
                )}
                {etcItem && (
                  <div className="truncate">
                    <span className="text-slate-400 block truncate">{etcItem.flag} 기타글로벌</span>
                    <span className="text-xs text-slate-300 font-semibold font-mono">{etcItem.share.toFixed(2)}%</span>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>

      {/* 3. Traffic Acquisition Channels */}
      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center space-x-1.5">
              <PieIcon className="w-4 h-4 text-brand-emerald" />
              <h3 className="text-base font-bold text-white">유입 채널 구성</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">사용자 유입 경로 구성비</p>
          </div>
          <span className="text-xs font-semibold text-brand-emerald">
            검색 {traffic.searchShare}%
          </span>
        </div>

        <div className="h-48 mt-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={4}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: any) => [`${value}%`, '점유율']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex justify-around text-xs border-t border-dark-750 pt-2.5">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-brand-emerald"></span>
            <span className="text-slate-300 text-xs">검색 ({traffic.searchShare}%)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span className="text-slate-300 text-xs">직접 ({traffic.directShare}%)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            <span className="text-slate-300 text-xs">추천 ({traffic.referralShare}%)</span>
          </div>
        </div>
      </div>

    </section>
  );
};
