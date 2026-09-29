import React, { useState } from 'react';
import { 
  Server, 
  LayoutDashboard, 
  Rocket,
  Building2,
  Share2,
  CreditCard,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import type { CompleteServiceIntelligence } from '../types/intelligence';
import { BrandLogo } from './BrandLogo';

export type SubpageTab = 'overview' | 'traffic' | 'marketing-status' | 'marketing' | 'app' | 'server' | 'ir' | 'gmv';

export type SubViewId =
  | 'main'
  | 'traffic-detail'
  | 'sns-sheet'
  | 'ir-trend'
  | 'keyword-guide';

export interface SubMenuItem {
  id: SubViewId;
  label: string;
}

export interface GnbTabItem {
  id: SubpageTab;
  group: 'status' | 'task';
  groupLabel: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubMenuItem[];
}

const GNB_MENU_TREE: GnbTabItem[] = [
  // [현 상황] 1단계 메뉴 및 하위 2단계 서브페이지
  {
    id: 'overview',
    group: 'status',
    groupLabel: '현 상황',
    label: '관제허브',
    icon: LayoutDashboard,
    subItems: [
      { id: 'main', label: '종합 관제 대시보드' },
      { id: 'traffic-detail', label: '트래픽 세부데이터' },
    ],
  },
  {
    id: 'marketing-status',
    group: 'status',
    groupLabel: '현 상황',
    label: '마케팅',
    icon: Share2,
    subItems: [
      { id: 'main', label: '마케팅 현황' },
      { id: 'sns-sheet', label: '월별 SNS 성과비교' },
    ],
  },
  {
    id: 'ir',
    group: 'status',
    groupLabel: '현 상황',
    label: 'IR',
    icon: Building2,
    subItems: [
      { id: 'main', label: '기업정보 · 재무 · 투자' },
      { id: 'ir-trend', label: '연도별 실적추이' },
    ],
  },
  {
    id: 'gmv',
    group: 'status',
    groupLabel: '현 상황',
    label: 'GMV',
    icon: CreditCard,
    subItems: [
      { id: 'main', label: 'GMV · 거래액 지표' },
    ],
  },
  // [과제] 1단계 메뉴 및 하위 2단계 서브페이지
  {
    id: 'marketing',
    group: 'task',
    groupLabel: '과제',
    label: '마케팅전략',
    icon: Rocket,
    subItems: [
      { id: 'main', label: '마케팅 전략' },
      { id: 'keyword-guide', label: '키워드 공략집 가이드' },
    ],
  },
  {
    id: 'server',
    group: 'task',
    groupLabel: '과제',
    label: '서버비용',
    icon: Server,
    subItems: [
      { id: 'main', label: '인프라 · 서버비용' },
    ],
  },
];

interface HeaderProps {
  onSearch?: (url: string) => void;
  isLoading?: boolean;
  activeTab: SubpageTab;
  onTabChange: (tab: SubpageTab, subView?: SubViewId) => void;
  activeSubView?: SubViewId;
  currentData: CompleteServiceIntelligence;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  activeSubView = 'main',
  currentData
}) => {
  const { service } = currentData;

  // 데스크탑 통합 GNB 서브메뉴 오버레이 상태 (평소에는 닫혀 있어 메인 GNB 밑에 따로 노출되지 않으며, 열리면 메뉴 선택 전까지 열린 상태 유지)
  const [gnbSubmenuOpen, setGnbSubmenuOpen] = useState<boolean>(false);
  // 모바일 삼단바(햄버거) 메뉴 오픈 상태
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  // 모바일 아코디언 펼침 상태 (전체 서브메뉴 기본 노출)
  const [expandedMobileTabs, setExpandedMobileTabs] = useState<Record<string, boolean>>({
    overview: true,
    'marketing-status': true,
    ir: true,
    gmv: true,
    marketing: true,
    app: true,
    server: true,
  });

  const normalizedActiveTab: SubpageTab = activeTab === 'traffic' ? 'overview' : activeTab;

  const statusTabs = GNB_MENU_TREE.filter(t => t.group === 'status');
  const taskTabs = GNB_MENU_TREE.filter(t => t.group === 'task');

  // 메뉴 선택 시에만 GNB 서브메뉴 닫힘 (선택 전에는 열린 상태 유지)
  const handleSelectMenu = (tabId: SubpageTab, subId: SubViewId = 'main') => {
    onTabChange(tabId, subId);
    setGnbSubmenuOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileExpand = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMobileTabs(prev => ({ ...prev, [tabId]: !prev[tabId] }));
  };

  return (
    <header className="border-b border-dark-700 bg-dark-900/95 backdrop-blur-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
        
        {/* 모바일 상단 슬림 GNB 바 (로고 + 현재 페이지명 + 삼단바 버튼만 깔끔하게 노출) */}
        <div className="flex lg:hidden items-center justify-between gap-2 py-1">
          <div className="flex items-center gap-2 min-w-0">
            <BrandLogo domain={service.domain} size="sm" className="shrink-0 rounded-lg shadow-sm" />
            <span className="text-sm font-bold text-white truncate">
              {service.name.split(' (')[0]}
            </span>
            <span className="text-slate-600">·</span>
            <span className="px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-xs font-bold text-sky-400 truncate">
              {(() => {
                const tabObj = GNB_MENU_TREE.find(t => t.id === normalizedActiveTab);
                if (!tabObj) return '관제허브';
                if (activeSubView && activeSubView !== 'main') {
                  const subObj = tabObj.subItems?.find(s => s.id === activeSubView);
                  if (subObj) return subObj.label;
                }
                return tabObj.label;
              })()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-white border border-dark-700 transition-colors cursor-pointer shrink-0"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-cyan" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* 모바일 삼단바(햄버거) 메뉴 드로어 (1단계: 탭 / 2단계: 서브페이지) */}
        {mobileMenuOpen && (
          <nav className="lg:hidden p-3.5 rounded-2xl bg-dark-900 border border-dark-700 shadow-2xl space-y-4">
            {/* 현 상황 */}
            <div className="space-y-1.5">
              <div className="px-2.5 py-1 text-xs font-bold text-sky-400">
                현 상황
              </div>
              {statusTabs.map((tab) => {
                const Icon = tab.icon;
                const isTabActive = normalizedActiveTab === tab.id;
                const hasSub = Boolean(tab.subItems && tab.subItems.length > 0);
                const isExpanded = expandedMobileTabs[tab.id] ?? false;

                return (
                  <div key={tab.id} className="rounded-xl bg-dark-850/80 border border-dark-750 overflow-hidden">
                    {/* 1단계 메뉴 */}
                    <div
                      onClick={() => handleSelectMenu(tab.id, 'main')}
                      className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors ${
                        isTabActive
                          ? 'bg-sky-500/15 text-white font-bold'
                          : 'text-slate-200 hover:bg-dark-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isTabActive ? 'text-sky-400' : 'text-slate-400'}`} />
                        <span className="text-sm">{tab.label}</span>
                      </div>
                      {hasSub && (
                        <button
                          type="button"
                          onClick={(e) => toggleMobileExpand(tab.id, e)}
                          className="p-1 rounded-md text-slate-400 hover:text-white"
                          aria-label="하위 메뉴 펼치기"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-sky-400' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* 2단계 서브페이지 */}
                    {hasSub && isExpanded && (
                      <div className="bg-dark-950/60 pl-9 pr-3 py-1.5 border-t border-dark-800 space-y-1">
                        {tab.subItems!.map((sub) => {
                          const isSubActive = isTabActive && activeSubView === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelectMenu(tab.id, sub.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer block ${
                                isSubActive
                                  ? 'bg-sky-500/20 text-sky-300 font-bold'
                                  : 'text-slate-300 hover:bg-dark-850 hover:text-white'
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 과제 */}
            <div className="space-y-1.5 pt-2 border-t border-dark-800">
              <div className="px-2.5 py-1 text-xs font-bold text-purple-300">
                과제
              </div>
              {taskTabs.map((tab) => {
                const Icon = tab.icon;
                const isTabActive = normalizedActiveTab === tab.id;
                const hasSub = Boolean(tab.subItems && tab.subItems.length > 0);
                const isExpanded = expandedMobileTabs[tab.id] ?? false;

                return (
                  <div key={tab.id} className="rounded-xl bg-dark-850/80 border border-dark-750 overflow-hidden">
                    {/* 1단계 메뉴 */}
                    <div
                      onClick={() => handleSelectMenu(tab.id, 'main')}
                      className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors ${
                        isTabActive
                          ? 'bg-purple-500/15 text-white font-bold'
                          : 'text-slate-200 hover:bg-dark-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isTabActive ? 'text-purple-400' : 'text-slate-400'}`} />
                        <span className="text-sm">{tab.label}</span>
                      </div>
                      {hasSub && (
                        <button
                          type="button"
                          onClick={(e) => toggleMobileExpand(tab.id, e)}
                          className="p-1 rounded-md text-slate-400 hover:text-white"
                          aria-label="하위 메뉴 펼치기"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-purple-400' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* 2단계 서브페이지 */}
                    {hasSub && isExpanded && (
                      <div className="bg-dark-950/60 pl-9 pr-3 py-1.5 border-t border-dark-800 space-y-1">
                        {tab.subItems!.map((sub) => {
                          const isSubActive = isTabActive && activeSubView === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelectMenu(tab.id, sub.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer block ${
                                isSubActive
                                  ? 'bg-purple-500/20 text-purple-300 font-bold'
                                  : 'text-slate-300 hover:bg-dark-850 hover:text-white'
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}

        {/* 데스크탑 통합 GNB (메인 GNB 밑에 별도 세부메뉴 줄 없음 · 열릴 때만 통합 오버레이로 전체 서브메뉴 노출 및 메뉴 선택 전까지 유지) */}
        <nav
          className="hidden lg:block pt-1 relative"
          onMouseEnter={() => setGnbSubmenuOpen(true)}
        >
          {/* 1줄 메인 GNB 메뉴바 */}
          <div className="grid grid-cols-12 gap-3 w-full items-center">
            
            {/* 현 상황 그룹 (1단계 메인 탭 바) */}
            <div className="col-span-7 p-1.5 bg-dark-900 rounded-2xl border border-sky-500/40 shadow-md shadow-sky-950/20 flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => setGnbSubmenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-dark-950 bg-sky-400 hover:bg-sky-300 rounded-xl shrink-0 cursor-pointer transition-colors"
                title="전체 서브메뉴 열기/접기"
              >
                <span className="w-2 h-2 rounded-full bg-dark-950"></span>
                <span>현 상황</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${gnbSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {statusTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = normalizedActiveTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectMenu(tab.id, 'main')}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-150 cursor-pointer w-full ${
                        isActive
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold border border-sky-300/80 shadow-md shadow-sky-500/25'
                          : 'bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-dark-700/90 hover:border-sky-400/50 font-semibold'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 과제 그룹 (1단계 메인 탭 바) */}
            <div className="col-span-5 p-1.5 bg-dark-900 rounded-2xl border border-purple-500/40 shadow-md shadow-purple-950/20 flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => setGnbSubmenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 rounded-xl shrink-0 cursor-pointer transition-colors"
                title="전체 서브메뉴 열기/접기"
              >
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>과제</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${gnbSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="grid grid-cols-3 gap-1.5 flex-1">
                {taskTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = normalizedActiveTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectMenu(tab.id, 'main')}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-150 cursor-pointer w-full ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold border border-purple-300/80 shadow-md shadow-purple-500/30'
                          : 'bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-dark-700/90 hover:border-purple-400/50 font-semibold'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-purple-300'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* 통합 GNB 서브메뉴 플로팅 패널 (열렸을 때 전체 서브메뉴 동시 노출 · 메뉴 선택 전까지 열린 상태 유지) */}
          {gnbSubmenuOpen && (
            <div className="absolute left-0 right-0 top-full pt-1.5 z-50">
              <div className="grid grid-cols-12 gap-3 w-full">
                {/* 현 상황 하위 전체 서브메뉴 */}
                <div className="col-span-7 p-2 bg-dark-900/98 backdrop-blur-xl rounded-2xl border border-sky-500/40 shadow-2xl flex items-start gap-2">
                  <div className="w-[74px] shrink-0" />
                  <div className="grid grid-cols-4 gap-1.5 flex-1">
                    {statusTabs.map((tab) => {
                      const isActive = normalizedActiveTab === tab.id;
                      return (
                        <div key={tab.id} className="p-1.5 rounded-xl bg-dark-950/90 border border-dark-750/90 space-y-1">
                          {tab.subItems?.map((sub) => {
                            const isSubActive = isActive && activeSubView === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => handleSelectMenu(tab.id, sub.id)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer block truncate ${
                                  isSubActive
                                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                                    : 'text-slate-300 hover:bg-dark-800 hover:text-white'
                                }`}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 과제 하위 전체 서브메뉴 */}
                <div className="col-span-5 p-2 bg-dark-900/98 backdrop-blur-xl rounded-2xl border border-purple-500/40 shadow-2xl flex items-start gap-2">
                  <div className="w-[62px] shrink-0" />
                  <div className="grid grid-cols-3 gap-1.5 flex-1">
                    {taskTabs.map((tab) => {
                      const isActive = normalizedActiveTab === tab.id;
                      return (
                        <div key={tab.id} className="p-1.5 rounded-xl bg-dark-950/90 border border-dark-750/90 space-y-1">
                          {tab.subItems?.map((sub) => {
                            const isSubActive = isActive && activeSubView === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => handleSelectMenu(tab.id, sub.id)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer block truncate ${
                                  isSubActive
                                    ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                                    : 'text-slate-300 hover:bg-dark-800 hover:text-white'
                                }`}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
