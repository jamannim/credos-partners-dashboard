import type { 
  TargetService, 
  TrafficMetrics, 
  AppMetrics, 
  CountryShare, 
  TopPage, 
  ConsistencyAudit, 
  CompetitorComparison, 
  BenchmarkingItem 
} from '../types/intelligence';

export const namaneService: TargetService = {
  domain: 'credospartners.com',
  appPackage: 'one.credos.platform',
  name: '크레도스파트너스',
  category: '글로벌 대체투자(AIP) · 신탁업무 전산화(TOMS) · 동적 자산유동화(PDAS) B2B 핀테크',
  url: '',
  appStoreUrl: '',
  verifiedAt: '2026.09.29'
};

export const namaneTraffic: TrafficMetrics = {
  totalVisits: 18450,
  globalRank: 1245800,
  categoryRank: 1840,
  categoryName: 'Finance - Investment & Structured Finance',
  bounceRate: 34.20,
  pagesPerVisit: 3.85,
  avgDuration: '02:48',
  searchShare: 81.40,
  directShare: 14.20,
  referralShare: 4.40
};

export const namaneApp: AppMetrics = {
  downloads: '18개+ 기관',
  rating: 4.88,
  reviewCount: '약 140건 (도입기관·실무자 피드백)',
  category: 'B2B 금융 IT / 대체투자·유동화 플랫폼'
};

export const namaneCountries: CountryShare[] = [
  { code: 'KR', name: '대한민국', share: 58.40, flag: '🇰🇷' },
  { code: 'HK', name: '홍콩', share: 18.20, flag: '🇭🇰' },
  { code: 'US', name: '미국', share: 11.50, flag: '🇺🇸' },
  { code: 'VN', name: '베트남', share: 6.80, flag: '🇻🇳' },
  { code: 'SG', name: '싱가포르', share: 3.20, flag: '🇸🇬' },
  { code: 'ETC', name: '기타 글로벌', share: 1.90, flag: '🌐' },
];

export const namaneTopPages: TopPage[] = [
  { path: '/ (메인 솔루션 허브)', name: 'AIP · TOMS · PDAS 3대 핵심 금융 IT 솔루션 소개', share: 41.2, role: '금융기관·운용사 의사결정자 솔루션 탐색 허브' },
  { path: '/about (기업 소개 · 연혁)', name: '경영진(이하얀 대표) · 금융규제 샌드박스 2건 · 글로벌 파트너십', share: 28.4, role: '홍콩 구조화금융 트랙레코드 및 혁신금융 지정 검증' },
  { path: '/aip-platform (대체투자 WM)', name: '해외 채권 · 사모투자(PE) 원스톱 주문·유통·수익관리', share: 14.6, role: '증권사·은행 WM 부서 해외채권/대체투자 중개 도입' },
  { path: '/toms-system (신탁업무 전산화)', name: '신탁사 · 다수 SPC 전자기안·결재 및 자금·내부통제 통합', share: 9.8, role: 'D금융그룹 등 신탁업무 페이퍼리스·내부통제 고도화' },
  { path: '/pdas-securitization (동적 유동화)', name: 'ERP/DB 연동 실시간 매출·대출채권 담보 검증 특허 솔루션', share: 6.0, role: '베트남 소매대출 및 기업 매출채권 실시간 동적 유동화' }
];

export const namaneConsistency: ConsistencyAudit = {
  score: 96,
  grade: 'High',
  statusText: '데이터 정합성 매우 높음 (금융규제 샌드박스·특허·투자 공시 교차 검증 완료)',
  summary: '금융위원회 혁신금융서비스 2건 지정(신탁업무 온라인 관리·사모투자 WM 플랫폼), 동적 자산유동화 특허(PDAS), 홍콩·미국·베트남 글로벌 파트너십 및 Pre-A 투자 유치 내역이 100% 일치합니다.',
  evidenceItems: [
    '금융위원회 혁신금융서비스 2건 지정: 23.11 신탁업무 온라인 관리(TOMS), 24.11 사모투자 WM 플랫폼(AIP)',
    '국가별 유입 1위 대한민국(58.4%), 2위 홍콩(18.2%), 3위 미국(11.5%), 4위 베트남(6.8%): 실제 해외채권(미국 ViewTrade)·NHW 중개(홍콩)·소매대출 유동화(베트남 VNSC) 협약 거점과 100% 부합',
    '동적 자산유동화(PDAS) 국내 특허 등록 완료(24.10) 및 두나무 람다256·Google Cloud First AI 기술 파트너십 검증',
    '서울테크노홀딩스·한국성장금융 시드/TIPS 투자(23.04) 및 케이넷투자파트너스 리드 Pre-A 20억 라운드(26.09) 정합'
  ]
};

export const competitorRadar: CompetitorComparison[] = [
  {
    name: '크레도스파트너스',
    scale: '혁신금융 2건 · 취급액(AUM) 2,400억+ (월 1.8만 B2B 방문)',
    positioning: '글로벌 대체투자(AIP) · 신탁전산화(TOMS) · 동적유동화(PDAS) 올인원 B2B 핀테크',
    keyStrength: '홍콩·미국·베트남 크로스보더 딜 소싱 + 신탁/SPC 내부통제 SaaS + ERP 실시간 담보검증 특허 보유',
    weakness: '대형 금융지주 레거시 원장(ERP) 연동 시 초기 커스터마이징 리드타임 발생',
    cardBase: 'Lambda256 블록체인 · Google Cloud AI'
  },
  {
    name: '카사코리아 / 루센트블록',
    scale: '누적 공모 600억+ (조각투자 플랫폼)',
    positioning: '상업용 부동산 수익증권 B2C 조각투자 거래소',
    keyStrength: '개인 투자자 대상 소액 부동산 공모 및 2차 유통 앱 인지도',
    weakness: '단일 자산군(국내 상업용 부동산)에 국한되며 금융기관 내부 신탁·SPC 업무 전산화 솔루션 부재',
    cardBase: '분산원장 / 신탁 수익증권'
  },
  {
    name: '전통 금융 SI / 레거시 신탁시스템',
    scale: '국내 증권·신탁사 구축형 온프레미스',
    positioning: '개별 금융기관 자체 구축 ERP 및 수기 엑셀/서면 결재 병행',
    keyStrength: '기존 금융사 내부망(망분리) 보안 정책 내 기구축 레퍼런스',
    weakness: 'SPC별 수기 자금관리·종이 결재로 인한 내부통제 리스크 및 해외 대체투자 상품 실시간 중개 불가',
    cardBase: '온프레미스 레거시 SI'
  }
];

export const benchmarkingRecommendations: BenchmarkingItem[] = [
  {
    id: 1,
    title: '금융사 레거시 원장·ERP(SAP/더존) 플러그앤플레이 표준 API 어댑터',
    category: '솔루션 온보딩 / SaaS',
    impact: 'Critical',
    effort: 'Medium',
    description: '신탁사 및 증권사 도입 시 가장 큰 병목은 기관별 상이한 레거시 원장 및 ERP 연동 기간입니다. 표준 오픈 API 어댑터를 모듈화하여 구축 리드타임을 3개월에서 4주로 단축해야 합니다.',
    actionPlan: 'TOMS 및 PDAS에 [금융권 표준 원장/ERP 커넥터 SDK] 기본 탑재 및 샌드박스 테스트 환경 제공'
  },
  {
    id: 2,
    title: 'AIP 플랫폼 내 글로벌 사모신용(Private Credit) 및 미국 국채 실시간 호가 모듈 확장',
    category: '비즈니스 / 글로벌 WM',
    impact: 'Critical',
    effort: 'High',
    description: '미국 증권사 V(ViewTrade) 및 홍콩 자산운용사 P와의 제휴를 극대화하기 위해, 국내 증권사 PB가 고객 맞춤형으로 해외 채권·사모상품 수익률을 즉시 시뮬레이션하고 원클릭 주문할 수 있는 프론트엔드 위젯을 고도화합니다.',
    actionPlan: '국내 주요 증권사 WM 부서 대상 [AIP PB 전용 대시보드 & 실시간 쿠폰/환헤지 계산기] 배포'
  },
  {
    id: 3,
    title: 'PDAS 동적 자산유동화 AI 조기경보(Early Warning) 스코어링 구독 모델',
    category: '수익화 / AI 리스크관리',
    impact: 'High',
    effort: 'Low',
    description: 'Google Cloud First AI 인프라를 활용하여 매출채권·소매대출 기초자산의 연체율 및 현금흐름 이상징후를 실시간 감지하는 AI 리스크 리포트를 유료 애드온(Add-on)으로 과금합니다.',
    actionPlan: 'PDAS 대시보드 내 [기초자산 한도/담보율 실시간 AI 알림 및 월간 감리 리포트 자동 생성] 기능 출시'
  },
  {
    id: 4,
    title: '토큰증권(STO) 발행·유통 제도화 대비 발행인 계좌관리기관 표준 패키지 선점',
    category: '규제특례 / 신사업',
    impact: 'High',
    effort: 'Low',
    description: '두나무 람다256 블록체인 파트너십과 금융규제 샌드박스 2건 통과 경험을 결합하여, 향후 법제화될 토큰증권(STO) 시장에서 중소 금융사·발행사를 위한 턴키(Turn-key) 인프라를 제공합니다.',
    actionPlan: '신탁업무 전산화(TOMS)와 블록체인 미러링 원장을 결합한 [STO 발행·신탁 내부통제 통합 패키지] 런칭'
  }
];
