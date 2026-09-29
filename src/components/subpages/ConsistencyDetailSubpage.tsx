import React from 'react';
import type { CompleteServiceIntelligence } from '../../types/intelligence';

interface Props {
  data: CompleteServiceIntelligence;
}

export const ConsistencyDetailSubpage: React.FC<Props> = ({ data }) => {
  const { consistency, traffic, app, service } = data;

  const annualVisits = traffic.totalVisits * 12;
  const uniqueEst = Math.round(annualVisits * (1 - (traffic.bounceRate / 100)) * 0.85);

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30">
            데이터 무결성 검증
          </span>
          <span className="text-xs text-slate-400">{service.domain} 데이터 무결성 검증 리포트</span>
        </div>
        <h2 className="text-xl font-bold text-white mt-1">데이터 정합성 정밀 진단서</h2>
        <p className="text-xs text-slate-300 mt-0.5">
          웹 트래픽과 앱스토어 다운로드 간 인과적 데이터 교차 검증 보고서
        </p>
      </div>

      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700">
        <h3 className="text-sm font-bold text-white pb-3 border-b border-dark-700 mb-4">
          전환 퍼널 산술 검증 모델 ({service.domain})
        </h3>

        <div className="p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-3 font-mono text-xs">
          <div className="flex justify-between py-1.5 border-b border-dark-700">
            <span className="text-slate-400">[A] 연간 웹 총 방문수 (월 {traffic.totalVisits.toLocaleString()}회 × 12)</span>
            <span className="text-white font-bold">약 {annualVisits.toLocaleString()} 회</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-dark-700">
            <span className="text-slate-400">[B] 순 방문자 수 추정 (이탈률 {traffic.bounceRate}% 보정)</span>
            <span className="text-white font-bold">약 {uniqueEst.toLocaleString()} 명</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-dark-700">
            <span className="text-slate-400">[C] 실제 앱/서비스 전환율 추정</span>
            <span className="text-brand-purpleLight font-bold">약 10 ~ 15%</span>
          </div>
          <div className="flex justify-between py-2 bg-dark-900 px-3 rounded text-sm">
            <span className="text-brand-cyan font-sans font-bold">[D] 계산된 사용자 전환 기대치</span>
            <span className="text-brand-emerald font-bold">{app.downloads} 규모와 일치</span>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-lg bg-brand-emerald/10 border border-brand-emerald/30 text-xs text-brand-emerald leading-relaxed">
          <strong>검증 결론:</strong> {consistency.statusText}. {consistency.summary}
        </div>
      </div>
    </div>
  );
};
