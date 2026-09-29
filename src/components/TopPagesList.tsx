import React from 'react';
import type { CompleteServiceIntelligence } from '../types/intelligence';
import { BrandLogo } from './BrandLogo';
import { getTableDensityClasses, type TableDensity } from './TableDensityControl';

interface Props {
  data: CompleteServiceIntelligence;
}

export const TopPagesList: React.FC<Props> = ({ data }) => {
  const density: TableDensity = 'auto';
  const dClasses = getTableDensityClasses(density);

  return (
    <div className="p-5 rounded-xl bg-dark-900 border border-dark-700">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-dark-700 gap-2">
        <div className="flex items-center space-x-2.5">
          <BrandLogo domain={data.service.domain} size="md" />
          <div>
            <h3 className="text-base font-bold text-white tracking-normal flex items-center space-x-2">
              <span>인기 서브 페이지</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed tracking-normal">
              최다 유입 핵심 URL 경로 및 비즈니스 전환 기여도
            </p>
          </div>
        </div>

        
      </div>

      <div className="mt-4 overflow-x-auto">
        <table 
          className={`w-full text-left text-slate-300 font-sans ${dClasses.tableText}`}
          style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          <thead className="bg-dark-850 text-slate-400 uppercase font-semibold text-xs">
            <tr>
              <th className={`${dClasses.th} rounded-l-lg`}>순위 / 경로</th>
              <th className={dClasses.th}>페이지 목적 & 콘텐츠</th>
              <th className={dClasses.th}>추정 트래픽 점유</th>
              <th className={`${dClasses.th} rounded-r-lg`}>비즈니스 역할</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-750 text-xs sm:text-sm">
            {data.topPages.map((page, idx) => (
              <tr key={idx} className="hover:bg-dark-800/50 transition-colors">
                <td className={`${dClasses.td} font-sans text-slate-200`}>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded bg-dark-750 text-center font-bold text-xs text-sky-400 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <BrandLogo domain={data.service.domain} size="xs" />
                    <span className="font-semibold text-white tracking-normal">{page.path}</span>
                  </div>
                </td>
                <td className={`${dClasses.td} font-medium text-slate-200 tracking-normal break-keep`}>
                  {page.name}
                </td>
                <td className={dClasses.td}>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-dark-750 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-sky-400 h-full rounded-full" style={{ width: `${page.share}%` }}></div>
                    </div>
                    <span className="text-sky-400 font-bold font-sans text-xs">{page.share}%</span>
                  </div>
                </td>
                <td className={`${dClasses.td} text-slate-400 tracking-normal leading-relaxed break-keep`}>
                  {page.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
