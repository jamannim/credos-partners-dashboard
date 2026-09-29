import type { CompleteServiceIntelligence } from '../types/intelligence';

export type PdfReportTabType =
  | 'overview'
  | 'traffic'
  | 'benchmark'
  | 'ir'
  | 'gmv'
  | 'marketing-status'
  | 'app'
  | 'server-cost'
  | 'marketing-strategy';

const TAB_TITLES: Record<PdfReportTabType, { badge: string; title: string; subtitle: string }> = {
  overview: {
    badge: 'EXECUTIVE OVERVIEW • A4 1-PAGE REPORT',
    title: '통합 관제 허브 핵심 지표 검증 리포트',
    subtitle: '웹 트래픽 · 양대 앱 마켓 · 3채널 데이터 정합성 통합 요약 (A4 1매)'
  },
  traffic: {
    badge: 'WEB TRAFFIC INTELLIGENCE • A4 1-PAGE REPORT',
    title: '웹사이트 트래픽 세부 분석 검증 리포트',
    subtitle: '2026.09.28 기준 방문수 · 채널별 유입 비중 · 상위 페이지 · 검색 키워드 (A4 1매)'
  },
  benchmark: {
    badge: 'COMPETITOR BENCHMARK • A4 1-PAGE REPORT',
    title: '경쟁사 벤치마킹 비교 분석 검증 리포트',
    subtitle: '주요 경쟁 서비스 규모 · 핵심 포지셔닝 · 강점 및 취약점 비교 (A4 1매)'
  },
  ir: {
    badge: 'CORPORATE IR & FINANCIALS • A4 1-PAGE REPORT',
    title: '기업 IR 및 재무·기업가치 추정 리포트',
    subtitle: '연간 매출 추정 · 수익원 구조 · 영업이익률 · 기업가치 밸류에이션 (A4 1매)'
  },
  gmv: {
    badge: 'GMV VOLUME ESTIMATION • A4 1-PAGE REPORT',
    title: '연간 거래액(GMV) 및 충전·결제 추산 리포트',
    subtitle: '인앱 해외카드 충전 · 오프라인 키오스크 충전 · 1인당 평균 충전액 분석 (A4 1매)'
  },
  'marketing-status': {
    badge: 'MARKETING STATUS (AS-IS) • A4 1-PAGE REPORT',
    title: '마케팅 채널 운영 현황(As-Is) 진단 리포트',
    subtitle: '검색 포털 의존도 · 공식 SNS 도달 지표 · 유입 전환 병목 진단 (A4 1매)'
  },
  app: {
    badge: 'APP STORE & VOC ANALYSIS • A4 1-PAGE REPORT',
    title: '앱 마켓 성과 및 리뷰 VOC 핵심 시사점 리포트',
    subtitle: '구글 플레이 · 애플 앱스토어 평점 및 실사용자 리뷰 핵심 시사점 (A4 1매)'
  },
  'server-cost': {
    badge: 'CLOUD INFRASTRUCTURE COST • A4 1-PAGE REPORT',
    title: '클라우드 서버 및 인프라 원가 추정 리포트',
    subtitle: '월간 트래픽·MAU 기반 API 서버 · 결제 DB · CDN 스토리지 비용 명세 (A4 1매)'
  },
  'marketing-strategy': {
    badge: 'MARKETING STRATEGY (TO-BE) • A4 1-PAGE REPORT',
    title: '마케팅 전략(To be) 및 키워드 공략 실행 리포트',
    subtitle: '4대 핵심 집중 채널 · 5대 키워드 공략 매트릭스 · 30일 실행 로드맵 (A4 1매)'
  }
};

export function exportVerificationReportPdf(
  data: CompleteServiceIntelligence,
  tab: PdfReportTabType = 'overview'
) {
  const { service, traffic, app, consistency, topPages, topSearchKeywords, competitors, marketingStrategy } = data;
  const meta = TAB_TITLES[tab] || TAB_TITLES.overview;

  const printWindow = window.open('', '_blank', 'width=920,height=1080');
  if (!printWindow) {
    alert('브라우저 팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.');
    return;
  }

  const dailyAvg = Math.round(traffic.totalVisits / 30);

  function buildTabBodyHtml(): string {
    switch (tab) {
      case 'traffic': {
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">9월 총 환산 방문수 (28일 누적)</div>
              <div class="kpi-val">${traffic.totalVisits.toLocaleString()}회</div>
              <div class="kpi-sub">28일 누적 ${Math.round(traffic.totalVisits * (28 / 30)).toLocaleString()}회 • 2026.09.28 기준</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">일평균 방문자 (DAU)</div>
              <div class="kpi-val">${dailyAvg.toLocaleString()}명/일</div>
              <div class="kpi-sub">글로벌 랭킹 #${traffic.globalRank.toLocaleString()}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">방문당 체류시간 / 페이지뷰</div>
              <div class="kpi-val">${traffic.avgDuration}</div>
              <div class="kpi-sub">평균 ${traffic.pagesPerVisit} 페이지 열람</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">검색 유입 비중 / 이탈률</div>
              <div class="kpi-val">${traffic.searchShare}%</div>
              <div class="kpi-sub">이탈률 ${traffic.bounceRate}% (우수)</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 트래픽 채널별 유입 구조 (2026.09.28 누적 기준)</div>
            <table>
              <thead>
                <tr>
                  <th>유입 채널</th>
                  <th>점유 비중</th>
                  <th>월간 추정 유입수</th>
                  <th>주요 특징 및 유입 경로</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>오가닉 검색 (Search)</strong></td>
                  <td><strong>${traffic.searchShare}%</strong></td>
                  <td>${Math.round((traffic.totalVisits * traffic.searchShare) / 100).toLocaleString()}회</td>
                  <td>구글 · 네이버 · 야후재팬 브랜드 및 키오스크 위치 검색 유입</td>
                </tr>
                <tr>
                  <td><strong>직접 유입 (Direct)</strong></td>
                  <td><strong>${traffic.directShare}%</strong></td>
                  <td>${Math.round((traffic.totalVisits * traffic.directShare) / 100).toLocaleString()}회</td>
                  <td>북마크, QR코드 스캔, 앱 내 웹뷰 직접 연결</td>
                </tr>
                <tr>
                  <td><strong>외부 추천/SNS (Referral)</strong></td>
                  <td><strong>${traffic.referralShare}%</strong></td>
                  <td>${Math.round((traffic.totalVisits * traffic.referralShare) / 100).toLocaleString()}회</td>
                  <td>레딧, 트위터 팬덤 인증글, 여행 블로그 링크 유입</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="two-col">
            <div class="section-box">
              <div class="section-title">2. 상위 유입 랜딩페이지 TOP 5</div>
              <table>
                <thead>
                  <tr>
                    <th>페이지 경로</th>
                    <th>비중</th>
                    <th>핵심 역할</th>
                  </tr>
                </thead>
                <tbody>
                  ${topPages.slice(0, 5).map(p => `
                    <tr>
                      <td><strong>${p.path}</strong></td>
                      <td><strong>${p.share}%</strong></td>
                      <td>${p.role}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section-box">
              <div class="section-title">3. 핵심 검색 유입 키워드 TOP 5</div>
              <table>
                <thead>
                  <tr>
                    <th>순위 / 키워드</th>
                    <th>포털</th>
                    <th>비중</th>
                  </tr>
                </thead>
                <tbody>
                  ${(topSearchKeywords || []).slice(0, 5).map(k => `
                    <tr>
                      <td><strong>#${k.rank} ${k.keyword}</strong></td>
                      <td>${k.portal}</td>
                      <td><strong>${k.share}%</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      case 'benchmark': {
        const compList = competitors || [];
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">기준 서비스 (${service.name})</div>
              <div class="kpi-val">월 ${traffic.totalVisits.toLocaleString()}회</div>
              <div class="kpi-sub">앱 누적 ${app.downloads} • 평점 ${app.rating}★</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">핵심 차별화 포지셔닝</div>
              <div class="kpi-val">포토 + 선불 + 교통</div>
              <div class="kpi-sub">1분 커스텀 카드 출력 & 앱 즉시 충전</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">비교 경쟁사 수</div>
              <div class="kpi-val">${compList.length}개 핵심 경쟁사</div>
              <div class="kpi-sub">${compList.map(c => c.name).join(' · ') || '와우패스 · 트래블월렛'}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">검색 유입 경쟁력</div>
              <div class="kpi-val">${traffic.searchShare}%</div>
              <div class="kpi-sub">오가닉 브랜드·키오스크 탐색 중심</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 주요 경쟁사 대비 핵심 역량 및 취약점 비교 매트릭스</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 14%;">서비스명</th>
                  <th style="width: 20%;">시장 규모 (트래픽/앱)</th>
                  <th style="width: 22%;">핵심 포지셔닝</th>
                  <th style="width: 24%;">주요 강점</th>
                  <th style="width: 20%;">한계점 (당사 공략 포인트)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>${service.name} (자사)</strong></td>
                  <td><strong>앱 ${app.downloads} / 월 ${(traffic.totalVisits / 10000).toFixed(1)}만</strong></td>
                  <td>방한 외국인·팬덤 커스텀 선불·교통 올인원 카드</td>
                  <td>내 사진 실물 카드 출력 + 해외카드 인앱 충전 + 잔액 이동</td>
                  <td>오프라인 키오스크 지도 노출 확대 필요</td>
                </tr>
                ${compList.map(c => `
                  <tr>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.scale}</td>
                    <td>${c.positioning}</td>
                    <td>${c.keyStrength}</td>
                    <td>${c.weakness}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-title">2. 벤치마킹 기반 3대 핵심 승부처 (Winning Points)</div>
            <ul class="bullet-list">
              <li><strong>독점적 K-POP·여행 굿즈 가치</strong>: 경쟁사 정형화 디자인과 달리 나만의 사진을 현장에서 1분 만에 인쇄해 소장 가치를 극대화합니다.</li>
              <li><strong>해외 신용카드 앱 즉시 충전 & 지갑 간 잔액 이동</strong>: 현금 충전만 가능한 일반 교통카드의 한계를 넘어 앱에서 페이↔교통 잔액을 1초 만에 전환합니다.</li>
              <li><strong>오가닉 검색·커뮤니티 선점 효과</strong>: 레딧 비교 가이드 및 스마트플레이스 거점 등록 시 고관여 외국인 여행객 유입을 즉각 흡수할 수 있습니다.</li>
            </ul>
          </div>
        `;
      }

      case 'ir': {
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">25년 총 매출액</div>
              <div class="kpi-val">70.7억 원</div>
              <div class="kpi-sub">전년(61.6억) 대비 +14.8% (+9.1억)</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">25년 영업이익</div>
              <div class="kpi-val">+3.1억 원</div>
              <div class="kpi-sub">영업이익률 4.4% • 당기순이익 +2.6억 원</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">회사 가용 현금 (유동성)</div>
              <div class="kpi-val">25.5억 원</div>
              <div class="kpi-sub">런웨이 2년+ 확보 (선불충전금 별도)</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">연간 총 취급액 (GMV)</div>
              <div class="kpi-val">약 800억 원+</div>
              <div class="kpi-sub">GMV Take Rate 8.8% (고마진 구조)</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. (주)아이오로라 재무 실적 및 수익성 지표 (23년 ~ 25년, NICE평가정보)</div>
            <table>
              <thead>
                <tr>
                  <th>재무 지표 구분</th>
                  <th>23년</th>
                  <th>24년</th>
                  <th>25년</th>
                  <th>전년 대비 (25년 YoY)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>연간 총 매출액</strong></td>
                  <td>33.3억 원</td>
                  <td>61.6억 원 (+85.0%)</td>
                  <td><strong>70.7억 원 (+14.8%)</strong></td>
                  <td><strong>+9.1억 원 (+14.8%)</strong></td>
                </tr>
                <tr>
                  <td><strong>영업이익 (OPM)</strong></td>
                  <td>-17.4억 원 (-52.3%)</td>
                  <td>+11.3억 원 (+18.3%)</td>
                  <td><strong>+3.1억 원 (+4.4%)</strong></td>
                  <td><strong>-8.2억 원 (-13.9%p)</strong></td>
                </tr>
                <tr>
                  <td><strong>당기순이익 (NPM)</strong></td>
                  <td>-18.6억 원 (-55.9%)</td>
                  <td>+10.2억 원 (+16.6%)</td>
                  <td><strong>+2.6억 원 (+3.7%)</strong></td>
                  <td><strong>-7.6억 원 (-12.9%p)</strong></td>
                </tr>
                <tr>
                  <td><strong>회사 가용 현금 / 선불충전금</strong></td>
                  <td>현금 29.7억 / 예치 3.8억</td>
                  <td>현금 28.4억 / 예치 4.9억</td>
                  <td><strong>현금 25.5억 / 예치 5.35억</strong></td>
                  <td><strong>금감원 신탁 분리 보관</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-title">2. IR 핵심 투자 및 재무 건전성 요약</div>
            <ul class="bullet-list">
              <li><strong>25년 매출 70.7억 원 및 영업이익 +3.1억 원 달성</strong>: 24년 턴어라운드(+11.3억) 이후 25년 매출 70.7억 원, 영업이익 +3.1억 원(OPM 4.4%), 당기순이익 +2.6억 원(NPM 3.7%)을 기록했습니다.</li>
              <li><strong>충분한 현금 런웨이(25.5억) 및 선불충전금 분리 신탁(5.35억)</strong>: 고객 충전금은 은행 신탁으로 100% 별도 보관되며, 자체 가용 현금 25.5억 원과 26년 반기 큐브엔터 30억 RCPS 유치로 안정적 유동성을 확보했습니다.</li>
            </ul>
          </div>
        `;
      }

      case 'gmv': {
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">2025 연간 총 취급액 (GMV)</div>
              <div class="kpi-val">약 800억 원+</div>
              <div class="kpi-sub">'23년 400억 ➔ '24년 675억 ➔ '25년 800억+</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">2025 총 매출액</div>
              <div class="kpi-val">70.7억 원</div>
              <div class="kpi-sub">GMV 대비 매출 전환율(Take Rate) 8.8%</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">연간 총 카드 발급량</div>
              <div class="kpi-val">약 72만 장</div>
              <div class="kpi-sub">일반 커스텀 50만 장 + IP 제휴 22만 장</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">전사 종합 공헌이익</div>
              <div class="kpi-val">약 29.9억 원</div>
              <div class="kpi-sub">공헌 마진율 42.3% (수수료 마진 71.9%)</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 취급액(GMV) 및 수익 분해 추이 (2023 ~ 2025)</div>
            <table>
              <thead>
                <tr>
                  <th>지표 구분</th>
                  <th>23년</th>
                  <th>24년</th>
                  <th>25년</th>
                  <th>비고 및 검증 기준</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>연간 총 취급액 (GMV)</strong></td>
                  <td>약 400억 원</td>
                  <td>약 675억 원</td>
                  <td><strong>약 800억 원+</strong></td>
                  <td>전년비 +18.5% 확대 (Take Rate 8.8%)</td>
                </tr>
                <tr>
                  <td><strong>① 실물 카드 판매 매출 (A)</strong></td>
                  <td>약 26.6억 원 (38만 장)</td>
                  <td>약 45.5억 원 (65만 장)</td>
                  <td><strong>약 50.4억 원 (72만 장)</strong></td>
                  <td>발급 단가 7,000원/장 • 마진율 30.4% (공헌이익 15.3억)</td>
                </tr>
                <tr>
                  <td><strong>② 결제·충전 가맹점 수수료 (B)</strong></td>
                  <td>약 6.7억 원</td>
                  <td>약 16.1억 원</td>
                  <td><strong>약 20.3억 원</strong></td>
                  <td>인앱 충전·결제 수수료 • 마진율 71.9% (공헌이익 14.6억)</td>
                </tr>
                <tr>
                  <td><strong>합계 총 매출액 (A + B)</strong></td>
                  <td><strong>33.3억 원</strong></td>
                  <td><strong>61.6억 원</strong></td>
                  <td><strong>70.7억 원</strong></td>
                  <td><strong>NICE평가정보 결산 총매출 100% 일치</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="two-col">
            <div class="section-box">
              <div class="section-title">2-1. 거래액(GMV 800억) 사용처별 구성 (합계 100%)</div>
              <table>
                <thead>
                  <tr>
                    <th>사용처 구분</th>
                    <th>거래 비중</th>
                    <th>연간 거래액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>페이 결제 (IC 가맹점 쇼핑·식음료)</strong></td>
                    <td><strong>54.0%</strong></td>
                    <td>약 432.0억 원</td>
                  </tr>
                  <tr>
                    <td><strong>대중교통 결제 (지하철·버스·택시)</strong></td>
                    <td><strong>26.0%</strong></td>
                    <td>약 208.0억 원</td>
                  </tr>
                  <tr>
                    <td><strong>무인 키오스크 현장 충전·정산</strong></td>
                    <td><strong>20.0%</strong></td>
                    <td>약 160.0억 원</td>
                  </tr>
                  <tr>
                    <td><strong>합계 (Total GMV)</strong></td>
                    <td><strong>100.0%</strong></td>
                    <td><strong>약 800.0억 원</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="section-box">
              <div class="section-title">2-2. 총매출(70.7억) 수익원별 구성 (합계 100%)</div>
              <table>
                <thead>
                  <tr>
                    <th>수익원 구분</th>
                    <th>매출 비중</th>
                    <th>연간 매출액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>일반 커스텀 카드 발급 (50만 장)</strong></td>
                    <td><strong>49.5%</strong></td>
                    <td>약 35.0억 원</td>
                  </tr>
                  <tr>
                    <td><strong>한정판 IP 제휴 카드 (22만 장)</strong></td>
                    <td><strong>21.8%</strong></td>
                    <td>약 15.4억 원</td>
                  </tr>
                  <tr>
                    <td><strong>결제·충전 가맹점 수수료 (B)</strong></td>
                    <td><strong>28.7%</strong></td>
                    <td>약 20.3억 원</td>
                  </tr>
                  <tr>
                    <td><strong>합계 (Total Revenue)</strong></td>
                    <td><strong>100.0%</strong></td>
                    <td><strong>70.7억 원</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      case 'marketing-status': {
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">3개월 누적 SNS 조회수</div>
              <div class="kpi-val">36.8만 회 (+9.7%)</div>
              <div class="kpi-sub">9월 11.3만 회 포함 • 4대 채널 합산</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">3개월 누적 공감 (좋아요)</div>
              <div class="kpi-val">17,330개 (+11.5%)</div>
              <div class="kpi-sub">실사용자 긍정 반응 누적</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">3개월 누적 댓글 피드백</div>
              <div class="kpi-val">1,235개 (+15.4%)</div>
              <div class="kpi-sub">발급·충전 문의 및 인증 댓글</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">가중 평균 참여율 (ER)</div>
              <div class="kpi-val">5.07% (+0.10%p)</div>
              <div class="kpi-sub">핀테크 업계 평균 대비 2.4배 우수</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 공식 SNS 채널별 월간 운영 성과 비교 (7월 ~ 9월 누적)</div>
            <table>
              <thead>
                <tr>
                  <th>SNS 채널</th>
                  <th>7월 조회수</th>
                  <th>8월 조회수</th>
                  <th>9월 조회수 (28일 기준)</th>
                  <th>평균 참여율(ER)</th>
                  <th>주력 콘텐츠 포맷</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Instagram (공식)</strong></td>
                  <td>52,400회</td>
                  <td>56,800회</td>
                  <td><strong>48,200회</strong></td>
                  <td>5.42%</td>
                  <td>K-POP 포토카드 실물 릴스 & 카드 디자인 가이드</td>
                </tr>
                <tr>
                  <td><strong>X / Twitter (글로벌·일문)</strong></td>
                  <td>38,900회</td>
                  <td>42,100회</td>
                  <td><strong>35,600회</strong></td>
                  <td>5.18%</td>
                  <td>아이돌 생일 프레임 배포 & 일본 팬덤 인증샷 RT</td>
                </tr>
                <tr>
                  <td><strong>TikTok / Shorts (숏폼)</strong></td>
                  <td>29,800회</td>
                  <td>34,500회</td>
                  <td><strong>29,200회</strong></td>
                  <td>4.65%</td>
                  <td>키오스크 1분 발급 튜토리얼 & 잔액 전환 꿀팁</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-title">2. 현재 검색 키워드 유입 현황 및 진단 (As-Is)</div>
            <table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>핵심 검색 키워드</th>
                  <th>주요 포털</th>
                  <th>검색 비중</th>
                  <th>월간 추정 유입</th>
                  <th>검색 의도</th>
                </tr>
              </thead>
              <tbody>
                ${(topSearchKeywords || []).slice(0, 5).map(k => `
                  <tr>
                    <td><strong>#${k.rank}</strong></td>
                    <td><strong>${k.keyword}</strong></td>
                    <td>${k.portal}</td>
                    <td><strong>${k.share}%</strong></td>
                    <td>${k.estimatedVisits.toLocaleString()}회</td>
                    <td>${k.intent}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      case 'app': {
        const storeItems = (data.omnichannel?.channels || []).filter(i => i.id !== 'web');
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">양대 마켓 누적 다운로드</div>
              <div class="kpi-val">${app.downloads}</div>
              <div class="kpi-sub">Google Play 10만+ / App Store 15만+</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">스토어 통합 평균 평점</div>
              <div class="kpi-val">${app.rating} ★</div>
              <div class="kpi-sub">실사용자 긍정 리뷰 압도적 우위</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Google Play 성과</div>
              <div class="kpi-val">4.7 ★ (1,300개)</div>
              <div class="kpi-sub">패키지: ${service.appPackage}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Apple App Store 성과</div>
              <div class="kpi-val">4.8 ★ (2,400개)</div>
              <div class="kpi-sub">iOS 글로벌 여행객 주력 사용</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 양대 앱 마켓 공식 스토어 검증 지표</div>
            <table>
              <thead>
                <tr>
                  <th>마켓 구분</th>
                  <th>누적 다운로드</th>
                  <th>공식 평점</th>
                  <th>누적 리뷰 수</th>
                  <th>핵심 이용층 및 특징</th>
                </tr>
              </thead>
              <tbody>
                ${storeItems.map(s => `
                  <tr>
                    <td><strong>${s.name} (${s.type})</strong></td>
                    <td><strong>${s.primaryValue}</strong></td>
                    <td><strong>${s.rating || app.rating} ★</strong></td>
                    <td>${s.reviews || app.reviewCount}</td>
                    <td>${s.badge} • 해외 신용카드 인앱 충전 및 잔액 전환</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-title">2. 리뷰 VOC 핵심 시사점 (긍정 요인 vs 개선 과제)</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 18%;">분류</th>
                  <th style="width: 28%;">핵심 VOC 키워드</th>
                  <th>세부 내용 및 서비스 개선 방향</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>긍정 VOC #1</strong></td>
                  <td><strong>커스텀 포토카드 만족도 최상</strong></td>
                  <td>최애 아이돌·여행 사진으로 1분 만에 실물 카드를 제작할 수 있어 여행 기념품 겸 결제수단으로 극찬</td>
                </tr>
                <tr>
                  <td><strong>긍정 VOC #2</strong></td>
                  <td><strong>페이↔교통 잔액 즉시 이동</strong></td>
                  <td>개찰구 앞 잔액 부족 시 앱에서 1초 만에 잔액을 옮길 수 있어 현금 충전 불편을 완벽히 해소</td>
                </tr>
                <tr>
                  <td><strong>개선 VOC #1</strong></td>
                  <td><strong>해외카드 3DS 인증 안내 강화</strong></td>
                  <td>일부 해외 체크카드 충전 시 본인인증(3DS) 팝업 대기 시간 안내 및 간편결제 수단 확대 필요</td>
                </tr>
                <tr>
                  <td><strong>개선 VOC #2</strong></td>
                  <td><strong>키오스크 상세 위치·재고 표시</strong></td>
                  <td>역사 내 출구 번호·층수 사진 안내 및 네이버 지도 연동을 통해 발급기 탐색 시간 단축 필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
      }

      case 'server-cost': {
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">월간 추정 클라우드 총비용</div>
              <div class="kpi-val">약 285만 원/월</div>
              <div class="kpi-sub">연간 약 3,420만 원 (AWS 서울 리전 기준)</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">일평균 활성 처리량 (DAU)</div>
              <div class="kpi-val">${dailyAvg.toLocaleString()}명/일</div>
              <div class="kpi-sub">월간 웹·앱 통합 트랜잭션 처리</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">포토카드 이미지 스토리지</div>
              <div class="kpi-val">S3 + CloudFront</div>
              <div class="kpi-sub">고해상도 카드 인쇄 원본 전송 최적화</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">매출 대비 인프라 원가율</div>
              <div class="kpi-val">1.2% 미만</div>
              <div class="kpi-sub">고효율 경량 아키텍처 유지</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 클라우드 인프라 항목별 월간 비용 추정 명세표</div>
            <table>
              <thead>
                <tr>
                  <th>인프라 계층</th>
                  <th>구성 스펙 (AWS 기준)</th>
                  <th>월간 추정 비용</th>
                  <th>비중</th>
                  <th>핵심 역할</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>① 애플리케이션 서버 (Compute)</strong></td>
                  <td>ECS Fargate / EC2 AutoScaling (Multi-AZ)</td>
                  <td><strong>95만 원</strong></td>
                  <td>33.3%</td>
                  <td>앱 API, 카드 충전·잔액 전환 요청 처리</td>
                </tr>
                <tr>
                  <td><strong>② 데이터베이스 (Database)</strong></td>
                  <td>RDS Aurora MySQL + ElastiCache Redis</td>
                  <td><strong>110만 원</strong></td>
                  <td>38.6%</td>
                  <td>선불·교통 잔액 원장 무결성 및 실시간 세션 관리</td>
                </tr>
                <tr>
                  <td><strong>③ 이미지 스토리지 & CDN</strong></td>
                  <td>Amazon S3 + CloudFront Global Edge</td>
                  <td><strong>45만 원</strong></td>
                  <td>15.8%</td>
                  <td>커스텀 포토카드 디자인 업로드 및 키오스크 인쇄 전송</td>
                </tr>
                <tr>
                  <td><strong>④ 보안 · WAF · 모니터링</strong></td>
                  <td>AWS WAF, KMS, CloudWatch, PG 전용선</td>
                  <td><strong>35만 원</strong></td>
                  <td>12.3%</td>
                  <td>해외 카드 결제 보안(PCI-DSS) 및 이상거래 탐지</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-title">2. 서버 비용 최적화 핵심 시사점</div>
            <ul class="bullet-list">
              <li><strong>키오스크 인쇄용 고해상도 이미지 수명주기(Lifecycle) 관리</strong>: 카드 출력 완료 후 30일이 경과한 원본 이미지는 Glacier 스토리지로 자동 이관해 S3 비용을 40% 절감합니다.</li>
              <li><strong>거점 안내 정적 페이지 CDN 캐싱</strong>: 공항·역사별 키오스크 안내 페이지를 정적 캐싱하여 트래픽이 60% 증가해도 추가 서버 증설 없이 대응 가능합니다.</li>
            </ul>
          </div>
        `;
      }

      case 'marketing-strategy': {
        const pillars = marketingStrategy?.pillars || [];
        const matrix = marketingStrategy?.keywordMatrix || [];
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">목표 오가닉 트래픽 (+60%)</div>
              <div class="kpi-val">월 ${Math.round(traffic.totalVisits * 1.6).toLocaleString()}회</div>
              <div class="kpi-sub">현재 ${traffic.totalVisits.toLocaleString()}회 ➔ +60% 성장</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">예산 운용 전략</div>
              <div class="kpi-val">자체 채널 중심</div>
              <div class="kpi-sub">검색 최적화 및 커뮤니티 바이럴</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">핵심 집중 채널</div>
              <div class="kpi-val">4대 채널</div>
              <div class="kpi-sub">구글 · 네이버 · 커뮤니티 · 인공지능</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">실행 완성 로드맵</div>
              <div class="kpi-val">30일 완성</div>
              <div class="kpi-sub">1주차 스마트플레이스 20곳 즉시 등록</div>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">1. 4대 핵심 집중 유입 채널 실행 전략</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 24%;">전략 채널</th>
                  <th style="width: 16%;">목표 포털</th>
                  <th style="width: 38%;">핵심 전략 1줄 요약</th>
                  <th style="width: 22%;">기대 목표</th>
                </tr>
              </thead>
              <tbody>
                ${pillars.map((p, idx) => `
                  <tr>
                    <td><strong>${idx + 1}. ${p.title}</strong></td>
                    <td>${p.targetPortal}</td>
                    <td>${p.keyPoint}</td>
                    <td><strong>${p.goal}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-title">2. 핵심 유입 키워드별 공략 매트릭스 (상위 5대 키워드 실행 플랜)</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 22%;">순위 / 타겟 키워드</th>
                  <th style="width: 15%;">목표 포털</th>
                  <th style="width: 22%;">공략 채널</th>
                  <th style="width: 27%;">핵심 실행 방안</th>
                  <th style="width: 14%;">기대 효과</th>
                </tr>
              </thead>
              <tbody>
                ${matrix.map(m => `
                  <tr>
                    <td><strong>#${m.rank} ${m.keyword}</strong></td>
                    <td>${m.portal}</td>
                    <td>${m.channel}</td>
                    <td>${m.action}</td>
                    <td><strong>${m.impact}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      case 'overview':
      default: {
        return `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">9월 총 환산 방문수 (MAU)</div>
              <div class="kpi-val">${traffic.totalVisits.toLocaleString()}회</div>
              <div class="kpi-sub">28일 누적 73,500회 (+7.0% ▲)</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">양대 앱 마켓 누적 설치</div>
              <div class="kpi-val">${app.downloads}</div>
              <div class="kpi-sub">Google Play 10만+ / iOS 15만+</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">스토어 통합 평점</div>
              <div class="kpi-val">${app.rating} ★</div>
              <div class="kpi-sub">iOS 4.8★ / Android 4.7★</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">3채널 데이터 정합성</div>
              <div class="kpi-val">${consistency.score}점 (${consistency.grade})</div>
              <div class="kpi-sub">${consistency.statusText}</div>
            </div>
          </div>

          <div class="two-col">
            <div class="section-box">
              <div class="section-title">1. 핵심 방문 페이지 TOP 5</div>
              <table>
                <thead>
                  <tr>
                    <th>페이지 경로</th>
                    <th>비중</th>
                    <th>역할</th>
                  </tr>
                </thead>
                <tbody>
                  ${topPages.slice(0, 5).map(p => `
                    <tr>
                      <td><strong>${p.path}</strong></td>
                      <td><strong>${p.share}%</strong></td>
                      <td>${p.role}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section-box">
              <div class="section-title">2. 핵심 검색 키워드 TOP 5</div>
              <table>
                <thead>
                  <tr>
                    <th>키워드</th>
                    <th>포털</th>
                    <th>비중</th>
                  </tr>
                </thead>
                <tbody>
                  ${(topSearchKeywords || []).slice(0, 5).map(k => `
                    <tr>
                      <td><strong>#${k.rank} ${k.keyword}</strong></td>
                      <td>${k.portal}</td>
                      <td><strong>${k.share}%</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="section-box">
            <div class="section-title">3. 3개 공식 채널 교차 검증 결론 (${consistency.summary})</div>
            <ul class="bullet-list">
              ${consistency.evidenceItems.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      }
    }
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>[${meta.title}] ${service.name} (${service.domain})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", "맑은 고딕", sans-serif;
      color: #0f172a;
      background: #f1f5f9;
      line-height: 1.4;
      font-size: 11px;
    }
    .screen-toolbar {
      max-width: 210mm;
      margin: 14px auto 10px auto;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    .screen-toolbar-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #38bdf8;
    }
    .screen-toolbar-sub {
      font-size: 11px;
      color: #cbd5e1;
      margin-top: 2px;
    }
    .btn-group {
      display: flex;
      gap: 8px;
    }
    .btn-print {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 7px 14px;
      border-radius: 7px;
      font-weight: 800;
      font-size: 11.5px;
      cursor: pointer;
    }
    .btn-print:hover {
      background: #0369a1;
    }
    .btn-close {
      background: #334155;
      color: #e2e8f0;
      border: none;
      padding: 7px 12px;
      border-radius: 7px;
      font-weight: 700;
      font-size: 11.5px;
      cursor: pointer;
    }
    .a4-page {
      width: 210mm;
      min-height: 274mm;
      max-height: 274mm;
      margin: 0 auto 20px auto;
      background: #ffffff;
      padding: 12mm 14mm;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-after: avoid;
      page-break-inside: avoid;
    }
    @media print {
      html, body {
        background: #ffffff !important;
        width: 210mm !important;
        height: 276mm !important;
        max-height: 276mm !important;
        overflow: hidden !important;
      }
      .screen-toolbar {
        display: none !important;
      }
      .a4-page {
        width: 100% !important;
        min-height: 274mm !important;
        max-height: 274mm !important;
        margin: 0 !important;
        padding: 2mm 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        overflow: hidden !important;
      }
    }
    .report-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 800;
      background: #e0f2fe;
      color: #0369a1;
      padding: 2px 7px;
      border-radius: 4px;
      margin-bottom: 4px;
      letter-spacing: 0.4px;
    }
    .report-title {
      font-size: 17px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.4px;
    }
    .report-subtitle {
      font-size: 11px;
      color: #475569;
      margin-top: 2px;
      font-weight: 600;
    }
    .header-meta {
      text-align: right;
      font-size: 10px;
      color: #475569;
      line-height: 1.45;
    }
    .header-meta strong {
      color: #0f172a;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #0284c7;
      border-radius: 6px;
      padding: 8px 10px;
    }
    .kpi-label {
      font-size: 9.5px;
      font-weight: 700;
      color: #475569;
    }
    .kpi-val {
      font-size: 15px;
      font-weight: 900;
      color: #0f172a;
      margin-top: 3px;
    }
    .kpi-sub {
      font-size: 9px;
      color: #0369a1;
      font-weight: 600;
      margin-top: 2px;
    }
    .section-box {
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      background: #f1f5f9;
      border-left: 3.5px solid #0284c7;
      padding: 4px 8px;
      margin-bottom: 6px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
    }
    th {
      background: #1e293b;
      color: #ffffff;
      text-align: left;
      padding: 5px 7px;
      font-weight: 700;
      font-size: 9.5px;
    }
    td {
      border-bottom: 1px solid #e2e8f0;
      padding: 5px 7px;
      color: #1e293b;
      vertical-align: middle;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .bullet-list {
      padding-left: 16px;
      font-size: 10.5px;
      color: #1e293b;
      line-height: 1.55;
    }
    .bullet-list li {
      margin-bottom: 4px;
    }
    .report-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="screen-toolbar">
    <div>
      <div class="screen-toolbar-title">📄 [${meta.title}] — A4 1장 맞춤 리포트</div>
      <div class="screen-toolbar-sub">인쇄 대화상자에서 [대상: PDF로 저장]을 선택하면 현재 탭 내용만 A4 1장으로 저장됩니다.</div>
    </div>
    <div class="btn-group">
      <button class="btn-print" onclick="window.print()">PDF 다운로드 / 인쇄 (A4 1장)</button>
      <button class="btn-close" onclick="window.close()">닫기</button>
    </div>
  </div>

  <div class="a4-page">
    <div>
      <div class="report-header">
        <div>
          <span class="badge">${meta.badge}</span>
          <div class="report-title">${service.name} — ${meta.title}</div>
          <div class="report-subtitle">${meta.subtitle}</div>
        </div>
        <div class="header-meta">
          <div>대상 도메인: <strong>${service.domain}</strong></div>
          <div>데이터 기준일: <strong>2026.09.28 (실시간 최신화)</strong></div>
          <div>문서 규격: <strong>A4 단일 페이지 (1 / 1 Page)</strong></div>
        </div>
      </div>

      ${buildTabBodyHtml()}
    </div>

    <div class="report-footer">
      <div>본 문서는 <strong>${service.name} (${service.domain})</strong>의 해당 탭 핵심 데이터만을 A4 1매로 요약한 공식 검증 리포트입니다.</div>
      <div><strong>Page 1 of 1</strong> • Verified at 2026.09.28</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
