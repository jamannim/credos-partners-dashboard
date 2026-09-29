export interface TargetService {
  domain: string;
  appPackage: string;
  name: string;
  category: string;
  url: string;
  appStoreUrl: string;
  iosAppStoreUrl?: string;
  verifiedAt: string;
}

export interface TrafficMetrics {
  totalVisits: number;
  globalRank: number;
  categoryRank: number;
  categoryName: string;
  bounceRate: number;
  pagesPerVisit: number;
  avgDuration: string;
  searchShare: number;
  directShare: number;
  referralShare: number;
  asOfDate?: string;
  mtdDays?: number;
  mtdCumulativeVisits?: number;
  dailyAvgVisits?: number;
}

export interface ReviewItem {
  id: string;
  rating: number;
  sentiment: 'positive' | 'negative';
  author: string;
  category: string;
  date: string;
  content: string;
  summaryPoint: string;
}

export interface AppMetrics {
  downloads: string;
  rating: number;
  reviewCount: string;
  category: string;
  positiveShare?: number;
  negativeShare?: number;
  ratingDistribution?: {
    star5: number;
    star4: number;
    star3: number;
    star2: number;
    star1: number;
  };
  representativeReviews?: {
    positive: ReviewItem[];
    negative: ReviewItem[];
  };
}

export interface CountryShare {
  code: string;
  name: string;
  share: number;
  flag: string;
}

export interface TopPage {
  path: string;
  name: string;
  share: number;
  role: string;
}

export interface ConsistencyAudit {
  score: number;
  grade: 'High' | 'Medium' | 'Low';
  statusText: string;
  summary: string;
  evidenceItems: string[];
}

export interface CompetitorComparison {
  name: string;
  scale: string;
  positioning: string;
  keyStrength: string;
  weakness: string;
  cardBase: string;
}

export interface BenchmarkingItem {
  id: number;
  title: string;
  category: string;
  impact: 'Critical' | 'High' | 'Medium';
  effort: 'Low' | 'Medium' | 'High';
  description: string;
  actionPlan: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface MonthlyTrafficRecord {
  period: string; // e.g. "2026-08"
  year: number;
  month: number;
  visits: number;
  bounceRate: number;
  pagesPerVisit: number;
  searchShare: number;
  topCountry: string;
  topCountryShare: number;
  note?: string;
  mtdDays?: number;
  mtdCumulativeVisits?: number;
}

export interface SearchKeywordItem {
  rank: number;
  keyword: string;
  portal: string;
  share: number;
  estimatedVisits: number;
  intent: string;
  country?: string;
}

export interface SearchPortalShare {
  name: string;
  share: number;
  icon?: string;
}

export interface CountrySearchIntelligence {
  countryCode: string;
  countryName: string;
  flag: string;
  shareOfSearch: number;
  mainPortals: SearchPortalShare[];
  keywords: SearchKeywordItem[];
}

export interface ServerCostItem {
  category: string;
  provider: string;
  spec: string;
  monthlyCostWon: number;
  share: number;
}

export interface CostSavingRecommendation {
  id: number;
  title: string;
  targetArea: string;
  currentCostWon: number;
  expectedCostWon: number;
  monthlySavingsWon: number;
  savingsRate: number;
  difficulty: 'Low' | 'Medium' | 'High';
  effortDays: string;
  description: string;
  actionSteps: string[];
  tradeoffs: string;
}

export interface ServerCostIntelligence {
  inferredProvider: string;
  ipAddress: string;
  cdnProvider: string;
  webServer: string;
  currentMonthlyTotalWon: number;
  annualTotalWon: number;
  potentialMonthlySavingsWon: number;
  potentialAnnualSavingsWon: number;
  costBreakdown: ServerCostItem[];
  recommendations: CostSavingRecommendation[];
}

export interface MarketingPillar {
  id: string;
  title: string;
  targetPortal: string;
  budget: string;
  timeline: string;
  goal: string;
  iconName?: string;
  accentColor: string;
  badgeColor: string;
  keyPoint: string;
  coreActions: string[];
}

export interface MarketingKeywordStrategy {
  rank: number;
  keyword: string;
  portal: string;
  country: string;
  channel: string;
  action: string;
  impact: string;
}

export interface MarketingRoadmapWeek {
  week: string;
  title: string;
  budget: string;
  actions: string[];
}

export interface MarketingStrategyIntelligence {
  summaryGoal?: string;
  pillars: MarketingPillar[];
  keywordMatrix: MarketingKeywordStrategy[];
  roadmap: MarketingRoadmapWeek[];
}

export interface ChannelMetricItem {
  id: 'web' | 'android' | 'ios';
  name: string;
  type: 'Web' | 'Google Play' | 'App Store';
  url: string;
  primaryMetric: string;
  primaryValue: string;
  subMetric: string;
  subValue: string;
  rating?: number;
  reviews?: string;
  badge: string;
}

export interface OmnichannelAggregate {
  webUrl: string;
  googlePlayUrl: string;
  appStoreUrl: string;
  monthlyWebVisits?: string;
  totalInstalls: string;
  totalMonthlyReach?: string;
  blendedRating: number;
  totalReviews: string;
  channels: ChannelMetricItem[];
}

export interface FinancialYearRecord {
  year: number;
  periodLabel?: string;
  revenueWon: number;
  revenueText: string;
  operatingProfitWon: number;
  operatingProfitText: string;
  netProfitWon: number;
  netProfitText: string;
  // 버닝레이트 & 재무현황 런웨이 공식 필드
  employeeCount?: number;
  avgSalaryManwon?: number;
  avgSalaryText?: string;
  overheadMultiplier?: number;
  burnRateWon?: number;
  burnRateText?: string;
  investmentWon?: number;
  investmentText?: string;
  remainingBalanceWon?: number;
  remainingBalanceText?: string;
  cumulativeCashWon?: number;
  cumulativeCashText?: string;
  statusNote?: string;
}

export interface InvestmentRoundItem {
  id: number;
  period: string;
  round: string;
  confirmedAmount: string;
  partnerName: string;
  partnerDomain?: string;
  partnerKey?: string;
  status: 'confirmed' | 'undisclosed' | 'target';
  description?: string;
  employeeCountAtTime?: number;
  burnRateAtTime?: string;
  sourceUrl?: string;
  sourceName?: string;
}

export interface ShareholderItem {
  id: number;
  name: string;
  role: string;
  shareRatio: number;
  shareText: string;
  companyName: string;
  companyDomain?: string;
  companyKey?: string;
  secondaryKey?: string;
  secondaryDomain?: string;
  partnerLogos?: string[];
  note?: string;
}

export interface CorporateIrIntelligence {
  companyName: string;
  businessNumber?: string;
  companyAddress?: string;
  representative?: string;
  sourceName: string;
  sourceUrl: string;
  financialHistory: FinancialYearRecord[];
  investments: InvestmentRoundItem[];
  shareholders?: ShareholderItem[];
  valuationGoal?: string;
  highlightNote?: string;
  burnRateFormulaNote?: string;
}

export interface CompleteServiceIntelligence {
  service: TargetService;
  traffic: TrafficMetrics;
  app: AppMetrics;
  countries: CountryShare[];
  topPages: TopPage[];
  consistency: ConsistencyAudit;
  competitors: CompetitorComparison[];
  benchmarking: BenchmarkingItem[];
  monthlyHistory?: MonthlyTrafficRecord[];
  serverCost?: ServerCostIntelligence;
  topSearchKeywords?: SearchKeywordItem[];
  countrySearchAnalysis?: CountrySearchIntelligence[];
  marketingStrategy?: MarketingStrategyIntelligence;
  omnichannel?: OmnichannelAggregate;
  irData?: CorporateIrIntelligence;
}

