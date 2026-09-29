import { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import { Header } from './components/Header';
import type { SubpageTab, SubViewId } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { TrafficCharts } from './components/TrafficCharts';
import { TopPagesList } from './components/TopPagesList';
import { TopKeywordsCard } from './components/TopKeywordsCard';
import { TrafficDetailSubpage } from './components/subpages/TrafficDetailSubpage';
import { AppDetailSubpage } from './components/subpages/AppDetailSubpage';
import { ServerCostSubpage } from './components/subpages/ServerCostSubpage';
import { MarketingStrategySubpage } from './components/subpages/MarketingStrategySubpage';
import { MarketingStatusSubpage } from './components/subpages/MarketingStatusSubpage';
import { IrDetailSubpage } from './components/subpages/IrDetailSubpage';
import { GmvDetailSubpage } from './components/subpages/GmvDetailSubpage';
import { 
  namaneIntelligence,
  wowpassIntelligence, 
  travelwalletIntelligence, 
  generateDynamicIntelligence 
} from './data/multiDomainData';
import type { CompleteServiceIntelligence } from './types/intelligence';
import { exportVerificationReportPdf } from './utils/exportPdfReport';

const PRESET_MAP: Record<string, CompleteServiceIntelligence> = {
  'credospartners.com': namaneIntelligence,
  'namanecard.com': namaneIntelligence,
  'wowpass.io': wowpassIntelligence,
  'travelwallet.co.kr': travelwalletIntelligence
};

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<SubpageTab>('overview');
  const [activeSubView, setActiveSubView] = useState<SubViewId>('main');
  const [showTrafficDetail, setShowTrafficDetail] = useState<boolean>(false);

  const handleTabChange = (tab: SubpageTab, subView: SubViewId = 'main') => {
    setActiveTab(tab);
    setActiveSubView(subView);
    if (tab === 'overview') {
      setShowTrafficDetail(subView === 'traffic-detail');
    }
  };

  const handleToggleTrafficDetail = (nextValue?: boolean) => {
    const next = typeof nextValue === 'boolean' ? nextValue : !showTrafficDetail;
    setShowTrafficDetail(next);
    setActiveSubView(next ? 'traffic-detail' : 'main');
  };
  
  // History with Credos Partners (Main)
  const [historyDomains, setHistoryDomains] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('credos_benchmark_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return ['credospartners.com', 'wowpass.io', 'travelwallet.co.kr'];
  });

  const [currentDomain, setCurrentDomain] = useState<string>('credospartners.com');
  const [cacheMap, setCacheMap] = useState<Record<string, CompleteServiceIntelligence>>(() => {
    try {
      const saved = localStorage.getItem('credos_benchmark_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { 
          ...PRESET_MAP, 
          ...parsed, 
          'credospartners.com': namaneIntelligence
        };
      }
    } catch {
      // fallback
    }
    return PRESET_MAP;
  });

  // Current active dataset (defaults to credospartners.com)
  const currentData: CompleteServiceIntelligence = cacheMap[currentDomain] || PRESET_MAP['credospartners.com'];

  // Save history and cache to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('credos_benchmark_history', JSON.stringify(historyDomains));
      localStorage.setItem('credos_benchmark_cache', JSON.stringify(cacheMap));
    } catch {
      // ignore
    }
  }, [historyDomains, cacheMap]);

  const handleSearch = (rawUrl: string) => {
    setIsLoading(true);
    
    // Normalize domain
    let clean = rawUrl.toLowerCase().trim()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0];
      
    if (!clean) clean = 'credospartners.com';

    setTimeout(() => {
      let resultData: CompleteServiceIntelligence;

      if (clean.includes('credos')) {
        resultData = namaneIntelligence;
        clean = 'credospartners.com';
      } else if (cacheMap[clean] && cacheMap[clean].serverCost && cacheMap[clean].marketingStrategy) {
        resultData = cacheMap[clean];
      } else if (clean.includes('wowpass')) {
        resultData = wowpassIntelligence;
      } else if (clean.includes('travelwallet') || clean.includes('travel')) {
        resultData = travelwalletIntelligence;
      } else {
        resultData = generateDynamicIntelligence(clean);
      }

      setCacheMap((prev) => ({ ...prev, [clean]: resultData }));
      setCurrentDomain(clean);

      setHistoryDomains((prev) => {
        const filtered = prev.filter((d) => d.toLowerCase() !== clean.toLowerCase());
        return [clean, ...filtered].slice(0, 8);
      });

      setIsLoading(false);
    }, 600);
  };

  const handleExportReport = () => {
    exportVerificationReportPdf(currentData);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-brand-purple selection:text-white">
      
      {/* Top Navigation with Tabs */}
      <Header 
        onSearch={handleSearch} 
        isLoading={isLoading} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        activeSubView={activeSubView}
        currentData={currentData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Dynamic Data-Bound View per Subpage Tab */}
        {activeTab === 'overview' && activeSubView === 'traffic-detail' && (
          <TrafficDetailSubpage data={currentData} />
        )}

        {activeTab === 'overview' && activeSubView !== 'traffic-detail' && (
          <div className="space-y-6">
            <MetricsOverview 
              data={currentData} 
              onExportReport={handleExportReport}
            />

            {/* 트래픽 세부데이터 보기/접기 컨트롤 바 (월별 트래픽 추이 박스 바로 상단 위치, Default: 접힌 상태) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 sm:p-4 rounded-xl bg-dark-900 border border-dark-700 hover:border-sky-500/40 transition-all shadow-sm gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">포털별 검색 유입 키워드 및 트래픽</span>
                    <span className="text-xs text-slate-400 font-medium">
                      · Similarweb 실측 연동
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    월별 트래픽 상세 분석
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleTrafficDetail()}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all shadow-md cursor-pointer self-start sm:self-auto shrink-0 ${
                  showTrafficDetail
                    ? 'bg-dark-800 hover:bg-dark-750 text-sky-400 border border-sky-500/60 shadow-inner'
                    : 'bg-sky-500 hover:bg-sky-400 text-dark-950 font-extrabold shadow-sky-500/20 border border-sky-300/80'
                }`}
              >
                <BarChart2 className={`w-4 h-4 shrink-0 ${showTrafficDetail ? 'text-sky-400' : 'text-dark-950'}`} />
                <span>{showTrafficDetail ? '상세 분석 접기 ▲' : '상세 분석 보기 ▼'}</span>
              </button>
            </div>

            {/* 펼쳤을 때 인라인 노출되는 트래픽 세부데이터 컨테이너 */}
            {showTrafficDetail && (
              <div id="traffic-detail-section" className="p-5 rounded-2xl bg-dark-900 border border-sky-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-dark-750">
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="w-5 h-5 text-sky-400" />
                    <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                      트래픽 세부데이터 분석
                    </h3>
                    <span className="text-xs text-slate-400 font-medium font-sans">
                      · 종합 관제허브 인라인 상세
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleTrafficDetail(false)}
                    className="text-xs text-slate-300 hover:text-white px-3 py-1 rounded-lg bg-dark-800 border border-dark-700 hover:bg-dark-750 transition-colors cursor-pointer font-sans"
                  >
                    세부데이터 접기 ▲
                  </button>
                </div>
                <TrafficDetailSubpage data={currentData} isEmbedded={true} />
              </div>
            )}

            <TrafficCharts data={currentData} />
            <TopKeywordsCard data={currentData} />
            <TopPagesList data={currentData} />
          </div>
        )}

        {activeTab === 'traffic' && <TrafficDetailSubpage data={currentData} />}
        {activeTab === 'marketing-status' && (
          <MarketingStatusSubpage
            data={currentData}
            activeSubView={activeSubView}
            onSubViewChange={setActiveSubView}
          />
        )}
        {activeTab === 'marketing' && (
          <MarketingStrategySubpage
            data={currentData}
            activeSubView={activeSubView}
            onSubViewChange={setActiveSubView}
          />
        )}
        {activeTab === 'app' && <AppDetailSubpage data={currentData} />}
        {activeTab === 'server' && <ServerCostSubpage data={currentData} />}
        {activeTab === 'ir' && (
          <IrDetailSubpage
            data={currentData}
            activeSubView={activeSubView}
            onSubViewChange={setActiveSubView}
          />
        )}
        {activeTab === 'gmv' && <GmvDetailSubpage data={currentData} />}

      </main>

      {/* Footer */}
      <footer className="border-t border-dark-700 bg-dark-900/50 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>2026. Powered by Antigravity & JIMIN KIM</span>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>분석 엔진</span>
            <span>•</span>
            <span>로컬 스토리지 캐싱</span>
            <span>•</span>
            <span>Similarweb 연동</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
