import React, { useState, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, Copy, Check, ExternalLink,
  CheckCircle2, Sparkles, Code2, MessageSquare,
  Upload, Trash2, FileText
} from 'lucide-react';

interface UploadedSampleFile {
  name: string;
  sizeBytes: number;
  previewUrl?: string;
  uploadedAt: string;
}

interface KeywordPlaybook {
  rank: number;
  keyword: string;
  portal: string;
  channel: string;
  action: string;
  impact: string;
  oneLineWhy: string;
  part1Title: string;
  part1Badge: string;
  part1TargetUrl: string;
  part1TargetLabel: string;
  part1Steps: string[];
  templateTitleLabel: string;
  templateTitleValue: string;
  templateBodyLabel: string;
  templateBodyValue: string;
  part2Title: string;
  part2Badge: string;
  part2Desc: string;
  codeBlockLabel: string;
  codeBlockValue: string;
  checklist: string[];
}

const KEYWORD_PLAYBOOKS: KeywordPlaybook[] = [
  {
    rank: 1,
    keyword: '크레도스파트너스 / Credos Partners',
    portal: '네이버 · 구글',
    channel: '기업 공식 검색 & 뉴스룸',
    action: '금융기관 실사(DD)용 기업 프로파일 및 혁신금융 2건 스키마 등록',
    impact: '+45% 유입 증대',
    oneLineWhy: '은행·증권사 신탁부 및 IB 담당자가 기업명을 검색할 때 혁신금융 지정 2건과 케이넷 Pre-A 20억 실적이 최상단에 노출되어야 합니다.',
    part1Title: 'STEP 1. 네이버·구글 기업 공식 스니펫 및 뉴스룸 인덱싱',
    part1Badge: '상단 노출 1순위',
    part1TargetUrl: 'https://searchadvisor.naver.com/',
    part1TargetLabel: '네이버 서치어드바이저',
    part1Steps: [
      '네이버 서치어드바이저 및 구글 서치콘솔에 credospartners.com 소유권 확인',
      'AIP·TOMS·PDAS 3대 핵심 솔루션 사이트링크(Sitelinks) 구조화 데이터 등록',
      '금융위 혁신금융 지정 2건 및 케이넷투자파트너스 20억 투자유치 공식 보도자료 고정'
    ],
    templateTitleLabel: '기업 공식 메타 타이틀',
    templateTitleValue: '크레도스파트너스 (Credos Partners) | 대체투자(AIP) · 신탁전산화(TOMS) · 동적유동화(PDAS)',
    templateBodyLabel: '기업 공식 소개 요약 템플릿',
    templateBodyValue: `크레도스파트너스(Credos Partners)는 금융기관의 대체투자와 자산유동화를 혁신하는 B2B 핀테크 기술 기업입니다.

1. **AIP (대체투자·해외채권 중개 플랫폼)**
- 미즈호증권(Mizuho), 중국공상은행(ICBC), 산탄데르(Santander) 등 글로벌 IB 네트워크 연동.

2. **TOMS (신탁계약 전산화 SaaS)**
- 금융위원회 혁신금융서비스(규제 샌드박스) 2건 지정. 신탁 계약·운용·수익자 원장 관리 공수 70% 절감.

3. **PDAS (동적 자산유동화·담보검증 엔진)**
- 실시간 매출채권 상태 추적 및 동적 담보검증 특허 보유.`,
    part2Title: 'STEP 2. 공식 웹페이지 Organization & FinancialService 스키마',
    part2Badge: 'B2B SEO 코드',
    part2Desc: '검색엔진이 크레도스파트너스의 3대 금융 솔루션을 정확히 색인하도록 JSON-LD 스키마를 적용합니다.',
    codeBlockLabel: '<head> 메타태그 & JSON-LD 코드',
    codeBlockValue: `<title>크레도스파트너스 (Credos Partners) | AIP · TOMS · PDAS 금융 솔루션</title>
<meta name="description" content="금융위원회 혁신금융서비스 2건 지정 크레도스파트너스. 대체투자(AIP), 신탁전산화(TOMS), 동적 자산유동화(PDAS) B2B 핀테크 플랫폼." />
<link rel="canonical" href="https://credospartners.com/" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Credos Partners (크레도스파트너스)",
  "url": "https://credospartners.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "서울특별시 강남구 학동로19길 2 (논현동, 세일빌딩)",
    "addressLocality": "Seoul"
  }
}
</script>`,
    checklist: [
      '네이버·구글 서치콘솔 사이트맵 제출',
      'AIP · TOMS · PDAS 솔루션별 독립 메타태그 적용',
      '금융위 혁신금융 지정 공고 원문 링크 연동',
      '링크드인 공식 기업 페이지 도메인 검증'
    ]
  },
  {
    rank: 2,
    keyword: '신탁전산화 솔루션 TOMS',
    portal: '네이버 · 구글',
    channel: 'B2B 백서 & 기술블로그',
    action: 'TOMS 신탁전산화 도입 효과(심사 70% 단축) 기술 백서 배포',
    impact: '+120% 리드 전환',
    oneLineWhy: '은행·증권사 신탁부서의 전산화 도입 검토 시 TOMS 아키텍처 백서가 검색 1위를 차지해야 PoC 문의로 직결됩니다.',
    part1Title: 'STEP 1. 신탁전산화 SaaS 도입 백서 랜딩페이지 오픈',
    part1Badge: 'PoC 리드 1순위',
    part1TargetUrl: 'https://credospartners.com/',
    part1TargetLabel: 'TOMS 솔루션 페이지',
    part1Steps: [
      'TOMS 전용 상세 URL(/solutions/toms) 생성 및 아키텍처 다이어그램 게시',
      '수작업 엑셀·서면 계약 대비 심사 기간 70% 단축 정량 데이터 제시',
      '금융위 혁신금융서비스 지정 번호 및 제1금융권 도입 레퍼런스 명시'
    ],
    templateTitleLabel: 'TOMS 솔루션 표준 타이틀',
    templateTitleValue: 'TOMS 신탁업무 전산화 SaaS | 금융위원회 혁신금융서비스 지정 솔루션',
    templateBodyLabel: 'TOMS 솔루션 핵심 설명 텍스트',
    templateBodyValue: `은행·증권사 신탁부서를 위한 클라우드·온프레미스 하이브리드 신탁전산화 솔루션(TOMS)입니다.
- 주요 기능: 신탁 계약 자동 생성 / 수익자 명부 실시간 동기화 / 기초자산 현금흐름 정산 자동화
- 도입 효과: 신탁 계약 체결 및 사후관리 공수 70% 이상 절감, 휴먼 에러 원천 차단`,
    part2Title: 'STEP 2. SoftwareApplication 구조화 데이터 적용',
    part2Badge: '솔루션 태그',
    part2Desc: '검색 결과에 B2B 금융 소프트웨어 사양이 즉시 노출되도록 설정합니다.',
    codeBlockLabel: 'TOMS 안내 페이지 메타태그',
    codeBlockValue: `<title>TOMS 신탁전산화 솔루션 | 크레도스파트너스</title>
<meta property="og:title" content="TOMS 신탁업무 전산화 SaaS - 금융위 혁신금융 지정" />
<meta property="og:description" content="제1금융권 및 주요 증권사가 선택한 차세대 신탁전산화 플랫폼 TOMS 아키텍처를 확인하세요." />`,
    checklist: [
      '/solutions/toms 전용 랜딩페이지 오픈',
      'PoC 데모 신청 폼(Work Email 필수) 연동',
      '네이버 서치어드바이저 웹페이지 수집 요청'
    ]
  },
  {
    rank: 3,
    keyword: '매출채권 유동화 플랫폼 PDAS',
    portal: '구글 · 네이버',
    channel: '특허 기술 & 구조화금융',
    action: 'PDAS 동적 담보검증 특허 아키텍처 및 유동화 사례집 공개',
    impact: '+85% 기관 유입',
    oneLineWhy: '기업금융(IB) 및 자산유동화 실무자가 매출채권 팩토링·유동화 시스템을 검색할 때 특허 검증 기술이 핵심 차별점이 됩니다.',
    part1Title: 'STEP 1. PDAS 동적 담보검증 특허 기반 유동화 가이드 배포',
    part1Badge: 'IB 실무자 타겟',
    part1TargetUrl: 'https://credospartners.com/',
    part1TargetLabel: 'PDAS 솔루션 바로가기',
    part1Steps: [
      '실시간 ERP/세금계산서 연동 동적 담보검증(Dynamic Collateral Verification) 원리 설명',
      '중소·중견기업 매출채권 조기 현금화 및 중복 양도 방지 프로세스 시각화',
      '우리금융 디노랩·서울핀테크랩 실증 레퍼런스 첨부'
    ],
    templateTitleLabel: 'PDAS 기술 백서 제목',
    templateTitleValue: '[구조화금융 백서] PDAS 동적 담보검증 엔진을 활용한 매출채권 실시간 유동화 모델',
    templateBodyLabel: '링크드인 & 기술블로그 배포용 본문',
    templateBodyValue: `기존 정적(Static) 자산유동화의 한계를 넘어서는 크레도스파트너스 PDAS 동적 유동화 엔진을 소개합니다.

✅ 실시간 세금계산서·물류 데이터 연동으로 진성 매출채권 100% 자동 검증
✅ 일별 현금흐름 리스크 스코어링 및 선순위/후순위 트랜치 자동 정산
✅ 유동화 증권 발행 리드타임 60% 단축 및 담보 부실률 최소화`,
    part2Title: 'STEP 2. PDAS 전용 검색 태그 최적화',
    part2Badge: '기술 SEO 코드',
    part2Desc: '구글 및 네이버 전문 기술 검색 시 상단에 노출되는 메타태그입니다.',
    codeBlockLabel: 'PDAS 웹페이지(/solutions/pdas) <head> 메타태그',
    codeBlockValue: `<title>PDAS 동적 자산유동화·담보검증 플랫폼 | 크레도스파트너스</title>
<meta name="description" content="특허 기반 실시간 담보 가치 산정 및 매출채권 동적 유동화(PDAS) 엔진 공식 기술 가이드." />
<link rel="canonical" href="https://credospartners.com/solutions/pdas" />`,
    checklist: [
      'PDAS 특허 등록번호 및 아키텍처 도식 게시',
      '구조화금융 실무자 대상 백서 PDF 다운로드 제공',
      '구글 서치콘솔 색인 등록'
    ]
  },
  {
    rank: 4,
    keyword: '해외채권 대체투자 중개 AIP',
    portal: '구글 · 링크드인',
    channel: '글로벌 IB 네트워크',
    action: '영문(/en) AIP 글로벌 픽스드인컴 파이프라인 페이지 인덱싱',
    impact: '+90% 해외 유입',
    oneLineWhy: '홍콩·싱가포르·일본 소재 글로벌 IB(Mizuho, ICBC 등) 파트너가 영문으로 검색할 때 즉시 확인 가능한 영문 IR·솔루션 페이지가 필수입니다.',
    part1Title: 'STEP 1. 글로벌 IB 대상 AIP 영문 기술 명세서 배포',
    part1Badge: '해외 기관 유입',
    part1TargetUrl: 'https://www.linkedin.com/company/credos-partners',
    part1TargetLabel: '링크드인 공식 채널',
    part1Steps: [
      '영문 전용 엔드포인트(/en/solutions/aip) 구축 및 글로벌 국채·회사채 중개 구조 명시',
      'Mizuho Securities, ICBC, Santander, ViewTrade 등 글로벌 파트너십 네트워크 소개',
      '크로스보더 채권 중개 및 환헤지·결제 자동화 API 명세서 제공'
    ],
    templateTitleLabel: '영문 랜딩페이지 URL 표준안',
    templateTitleValue: 'https://credospartners.com/en/solutions/aip',
    templateBodyLabel: '영문 AIP 페이지 핵심 본문 템플릿',
    templateBodyValue: `# AIP (Alternative Investment & Global Fixed-Income Platform)
- **Global IB Network**: Integrated with Mizuho Securities, ICBC, Santander, and ViewTrade.
- **Cross-Border Automation**: Real-time bond pricing, FX settlement, and institutional order routing.
- **Regulatory Compliance**: Fully compliant with FSC Korea financial sandbox standards.`,
    part2Title: 'STEP 2. 다국어 hreflang 및 영문 스키마 삽입',
    part2Badge: '글로벌 SEO 스키마',
    part2Desc: '홍콩·미국·영국에서 구글 검색 시 영문 페이지가 우선 노출되도록 hreflang을 설정합니다.',
    codeBlockLabel: '영문 페이지 hreflang & JSON-LD 스키마',
    codeBlockValue: `<link rel="alternate" hreflang="ko" href="https://credospartners.com/solutions/aip" />
<link rel="alternate" hreflang="en" href="https://credospartners.com/en/solutions/aip" />`,
    checklist: [
      '영문 AIP 솔루션 페이지(/en/solutions/aip) 오픈',
      '링크드인 글로벌 금융 파트너 태그 캠페인 집행',
      '구글 영문 검색어 "Credos Partners AIP" 1위 확인'
    ]
  },
  {
    rank: 5,
    keyword: '혁신금융서비스 토큰증권 STO',
    portal: '구글 · AI 검색',
    channel: 'AI 챗봇 & 금융규제 특례',
    action: 'RWA·토큰증권(STO) 신탁수익증권 발행 인프라 llms.txt 배포',
    impact: '+75% AI 인용 노출',
    oneLineWhy: '증권사·은행 STO 담당자가 ChatGPT·Perplexity에 "국내 신탁수익증권 전산화 및 STO 인프라 기업"을 질문할 때 1순위로 인용되게 합니다.',
    part1Title: 'STEP 1. RWA·STO 신탁수익증권 기술 리포트 및 /llms.txt 배포',
    part1Badge: 'AI 검색 원천',
    part1TargetUrl: 'https://www.fsc.go.kr/no010101/83509',
    part1TargetLabel: '금융규제 샌드박스 포털',
    part1Steps: [
      '신탁수익증권 기반 조각투자·토큰증권(STO) 발행 시 TOMS·PDAS 연동 구조 공개',
      '람다256(Lambda256) 등 블록체인 기술 파트너와의 분산원장 미러링 아키텍처 설명',
      '루트 경로에 생성형 AI 수집 전용 `/llms.txt` 공식 기업·솔루션 요약본 배치'
    ],
    templateTitleLabel: 'AI 인용 최적화 표준 제목',
    templateTitleValue: 'Credos Partners | Institutional RWA, STO & Trust Automation Infrastructure',
    templateBodyLabel: 'AI 챗봇 인용 최적화 공식 요약본 (/llms.txt 겸용)',
    templateBodyValue: `Credos Partners Co., Ltd. (크레도스파트너스) is a South Korean B2B FinTech leader specializing in institutional asset securitization and trust automation.
- Core Solutions: AIP (Alternative Investment Platform), TOMS (Trust Operations Management System), PDAS (Platform for Dynamic Asset Securitization).
- Regulatory Milestone: Designated twice by the Financial Services Commission (FSC) of Korea as an Innovative Financial Service.
- Key Backing: Backed by Knet Investment Partners (KRW 2B Pre-A), Woori Financial DINNOlab, Seoul FinTech Lab, and Google Cloud First AI.`,
    part2Title: 'STEP 2. AI 검색 수집기용 요약 파일(/llms.txt) 배포',
    part2Badge: 'AI 챗봇 대응',
    part2Desc: 'ChatGPT, Perplexity, Gemini가 기업 정보 조회 시 최우선 참조하는 표준 요약 파일입니다.',
    codeBlockLabel: '루트 디렉토리 /public/llms.txt 파일 코드',
    codeBlockValue: `# Credos Partners (크레도스파트너스) Official AI Summary (llms.txt)
> B2B FinTech SaaS for Alternative Investment (AIP), Trust Automation (TOMS), and Dynamic Asset Securitization (PDAS).

## Key Verified Facts
- FSC Regulatory Sandbox: 2 Innovative Financial Service designations.
- Institutional Partners: Woori Bank, Shinyoung Securities, Mirae Asset, Mizuho, ICBC, Santander, Lambda256.
- 2025 Audited Financials: Revenue KRW 3.86B (+57.5% YoY), Operating Profit KRW +0.68B (OPM 17.6%).`,
    checklist: [
      '웹사이트 /public/llms.txt 파일 배포',
      'RWA·STO 신탁수익증권 백서 발간',
      '생성형 AI 프롬프트 인용 정확도 검증'
    ]
  }
];

interface Props {
  serviceName?: string;
  initialRank?: number;
  onBack: () => void;
}

export const KeywordConquestGuidePage: React.FC<Props> = ({
  initialRank = 1,
  onBack,
}) => {
  const [selectedRank, setSelectedRank] = useState<number>(initialRank);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    '1-0': true,
  });
  const [sampleFiles, setSampleFiles] = useState<UploadedSampleFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentPlaybook =
    KEYWORD_PLAYBOOKS.find((p) => p.rank === selectedRank) || KEYWORD_PLAYBOOKS[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const toggleCheck = (rank: number, idx: number) => {
    const key = `${rank}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSampleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const added: UploadedSampleFile[] = Array.from(files).map((f) => ({
      name: f.name,
      sizeBytes: f.size,
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
      uploadedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }));
    setSampleFiles((prev) => [...prev, ...added]);
    e.target.value = '';
  };

  const completedCount = currentPlaybook.checklist.filter(
    (_, idx) => checkedItems[`${currentPlaybook.rank}-${idx}`]
  ).length;

  const nextPlaybook = KEYWORD_PLAYBOOKS.find((p) => p.rank === currentPlaybook.rank + 1);
  const prevPlaybook = KEYWORD_PLAYBOOKS.find((p) => p.rank === currentPlaybook.rank - 1);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Top Header & Back Navigation (브랜드 중복 문구 및 점유율/국가명 제거) */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-brand-cyan/40 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-800 text-slate-200 hover:bg-dark-750 hover:text-white border border-dark-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5 text-brand-cyan" />
              마케팅 전략(To be) 돌아가기
            </button>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40">
              {currentPlaybook.portal} • {currentPlaybook.channel}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/40">
              {currentPlaybook.impact}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            #{currentPlaybook.rank} [{currentPlaybook.keyword}] 핵심 실행 공략집
          </h2>
          <p className="text-xs text-slate-300">
            {currentPlaybook.oneLineWhy}
          </p>
        </div>

        {/* Progress & Next Step Box */}
        <div className="bg-dark-850 px-4 py-3 rounded-xl border border-dark-700 shrink-0 flex items-center gap-4">
          <div>
            <div className="text-xs text-slate-400">실행 진척도</div>
            <div className="text-lg font-black text-brand-emerald mt-0.5">
              {completedCount} / {currentPlaybook.checklist.length} 완료
            </div>
          </div>
          {nextPlaybook && (
            <button
              onClick={() => setSelectedRank(nextPlaybook.rank)}
              className="px-3.5 py-2 rounded-lg text-xs font-black bg-brand-purple hover:bg-brand-purple/90 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>다음: #{nextPlaybook.rank} {nextPlaybook.keyword}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. 1번~5번 키워드 탭 네비게이션 (점유율 % 및 국가명 삭제, 핵심만 표시) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {KEYWORD_PLAYBOOKS.map((item) => {
          const isSelected = item.rank === selectedRank;
          return (
            <button
              key={item.rank}
              onClick={() => setSelectedRank(item.rank)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-cyan/15 border-brand-cyan text-white shadow-md'
                  : 'bg-dark-900 border-dark-750 text-slate-300 hover:bg-dark-850 hover:border-dark-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-brand-cyan text-dark-950'
                      : 'bg-dark-800 text-brand-purpleLight'
                  }`}
                >
                  {item.rank}번
                </span>
                <span className="text-[11px] font-bold text-brand-emerald">{item.impact}</span>
              </div>
              <div className="text-xs font-black text-white truncate">{item.keyword}</div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.portal}</div>
            </button>
          );
        })}
      </div>

      {/* 3. 메인 2단 실행 가이드 (STEP 1 콘텐츠 기고 + STEP 2 검색 태그 적용) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 좌측 7컬럼: STEP 1 실행 순서 & 복사용 템플릿 */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-dark-900 border border-dark-700 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-dark-750">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-base font-black text-white">{currentPlaybook.part1Title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                {currentPlaybook.part1Badge}
              </span>
              <a
                href={currentPlaybook.part1TargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-brand-cyan text-dark-950 hover:bg-brand-cyan/90 transition-colors"
              >
                <span>{currentPlaybook.part1TargetLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* 3단계 핵심 실행 순서 */}
          <div className="space-y-2">
            {currentPlaybook.part1Steps.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-dark-850 border border-dark-750 flex items-center gap-2.5 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-brand-cyan/20 text-brand-cyan font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>

          {/* 원클릭 복사 템플릿: 제목 */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">{currentPlaybook.templateTitleLabel}</span>
              <button
                onClick={() => handleCopy('title', currentPlaybook.templateTitleValue)}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-dark-800 hover:bg-dark-750 text-brand-cyan border border-dark-700 cursor-pointer"
              >
                {copiedId === 'title' ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-brand-emerald" />
                    복사 완료
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    제목 복사
                  </>
                )}
              </button>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-750 text-xs font-bold text-white select-all">
              {currentPlaybook.templateTitleValue}
            </div>
          </div>

          {/* 원클릭 복사 템플릿: 본문 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">{currentPlaybook.templateBodyLabel}</span>
              <button
                onClick={() => handleCopy('body', currentPlaybook.templateBodyValue)}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-dark-800 hover:bg-dark-750 text-brand-cyan border border-dark-700 cursor-pointer"
              >
                {copiedId === 'body' ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-brand-emerald" />
                    본문 복사 완료
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    본문 복사
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-dark-950 border border-dark-750 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed max-h-56 overflow-y-auto select-all">
              {currentPlaybook.templateBodyValue}
            </pre>
          </div>

          {/* 첨부용 이미지 파일 등록 (내 PC 파일) */}
          <div className="p-3.5 rounded-xl bg-dark-850 border border-dark-750 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-brand-purpleLight" />
                첨부용 비교표 · 실물 카드 사진 등록 (내 PC 파일)
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  multiple
                  className="hidden"
                  onChange={handleSampleUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-purple/20 hover:bg-brand-purple/30 text-brand-purpleLight border border-brand-purple/40 cursor-pointer"
                >
                  + 파일 선택
                </button>
              </div>
            </div>

            {sampleFiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {sampleFiles.map((f, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-dark-900 border border-dark-700 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {f.previewUrl ? (
                        <img
                          src={f.previewUrl}
                          alt={f.name}
                          className="w-8 h-8 rounded object-cover border border-dark-600 shrink-0"
                        />
                      ) : (
                        <FileText className="w-4 h-4 text-brand-cyan shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{f.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {(f.sizeBytes / 1024).toFixed(1)} KB • {f.uploadedAt}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSampleFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 우측 5컬럼: STEP 2 검색 태그/코드 최적화 + 실행 완료 체크리스트 */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700 space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-dark-750">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-brand-emerald" />
                <h3 className="text-base font-black text-white">{currentPlaybook.part2Title}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30">
                {currentPlaybook.part2Badge}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPlaybook.part2Desc}
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">{currentPlaybook.codeBlockLabel}</span>
                <button
                  onClick={() => handleCopy('code', currentPlaybook.codeBlockValue)}
                  className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-dark-800 hover:bg-dark-750 text-brand-emerald border border-dark-700 cursor-pointer"
                >
                  {copiedId === 'code' ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-brand-emerald" />
                      복사 완료
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      코드 복사
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-dark-950 border border-dark-750 text-[11px] text-emerald-300 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto select-all">
                {currentPlaybook.codeBlockValue}
              </pre>
            </div>
          </div>

          {/* 실행 완료 체크리스트 */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-dark-750">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                실행 완료 체크리스트
              </h4>
              <span className="text-xs font-bold text-brand-emerald">
                {Math.round((completedCount / currentPlaybook.checklist.length) * 100)}%
              </span>
            </div>

            <div className="space-y-2">
              {currentPlaybook.checklist.map((item, idx) => {
                const isChecked = !!checkedItems[`${currentPlaybook.rank}-${idx}`];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(currentPlaybook.rank, idx)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-brand-emerald/10 border-brand-emerald/40 text-white font-bold'
                        : 'bg-dark-850 border-dark-750 text-slate-300 hover:bg-dark-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isChecked
                          ? 'bg-brand-emerald border-brand-emerald text-dark-950'
                          : 'border-slate-500 bg-dark-900'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={isChecked ? 'line-through text-slate-300' : ''}>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. 하단 이전/다음 키워드 공략집 이동 바 */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-brand-amber shrink-0" />
          <span>1번부터 5번까지 순서대로 템플릿을 복사해 즉시 실행할 수 있습니다.</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {prevPlaybook && (
            <button
              onClick={() => setSelectedRank(prevPlaybook.rank)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전: #{prevPlaybook.rank} {prevPlaybook.keyword}</span>
            </button>
          )}
          {nextPlaybook ? (
            <button
              onClick={() => setSelectedRank(nextPlaybook.rank)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-brand-cyan hover:bg-brand-cyan/90 text-dark-950 flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <span>다음 공략 실행 (#{nextPlaybook.rank} {nextPlaybook.keyword})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl text-xs font-black bg-brand-emerald hover:bg-brand-emerald/90 text-dark-950 flex items-center gap-1.5 cursor-pointer"
            >
              <span>전체 공략 확인 완료</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
