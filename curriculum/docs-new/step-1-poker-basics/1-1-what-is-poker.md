# 1.1 포커란 무엇인가

**학습 목표**: 포커의 기본 개념과 GGPoker의 위치를 이해한다
**소요 시간**: 15분

---

## 🎰 포커의 역사

<div class="timeline-container">
  <div class="timeline-item" data-year="1970">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>🏛️ WSOP 설립</h3>
      <p><strong>라스베이가스</strong>에서 첫 World Series of Poker 개최</p>
      <ul>
        <li>참가자: 7명</li>
        <li>우승자: Johnny Moss</li>
        <li>포커의 올림픽 시작</li>
      </ul>
    </div>
  </div>

  <div class="timeline-item" data-year="2014">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>🚀 GGPoker 설립</h3>
      <p>온라인 포커 플랫폼의 새로운 강자 등장</p>
      <ul>
        <li>혁신적인 UI/UX</li>
        <li>글로벌 확장 시작</li>
        <li>모바일 최적화</li>
      </ul>
    </div>
  </div>

  <div class="timeline-item" data-year="2020">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>🤝 WSOP 파트너십</h3>
      <p>GGPoker가 <strong>WSOP 온라인 독점 파트너</strong>로 선정</p>
      <ul>
        <li>온라인 WSOP 브레이슬릿 이벤트</li>
        <li>전 세계 접근성 확대</li>
        <li>포커 역사의 새 장</li>
      </ul>
    </div>
  </div>

  <div class="timeline-item" data-year="2021" data-highlight="true">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>🏆 세계 1위 달성</h3>
      <p>온라인 포커 플랫폼 <strong>글로벌 1위</strong> 등극</p>
      <ul>
        <li>연간 사용자 수백만 명</li>
        <li>50+ 국가 서비스</li>
        <li>매일 수천 개의 토너먼트</li>
      </ul>
    </div>
  </div>

  <div class="timeline-item" data-year="2024">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>📡 GG Production</h3>
      <p><strong>세계 최고 수준의 포커 방송 제작</strong></p>
      <ul>
        <li>연간 300+ 이벤트</li>
        <li>4K 멀티캠 시스템</li>
        <li>전 세계 라이브 스트리밍</li>
      </ul>
    </div>
  </div>
</div>

---

## 🃏 텍사스 홀덤 - 게임 진행

<div class="game-simulator">
  <div class="game-stage" data-stage="preflop">
    <div class="stage-header">
      <span class="stage-number">1</span>
      <h3>Pre-flop</h3>
      <p>홀 카드 2장 배분</p>
    </div>
    <div class="cards-area">
      <div class="hole-cards">
        <div class="card card-back">🂠</div>
        <div class="card card-back">🂠</div>
      </div>
      <div class="community-cards">
        <div class="card card-placeholder">?</div>
        <div class="card card-placeholder">?</div>
        <div class="card card-placeholder">?</div>
        <div class="card card-placeholder">?</div>
        <div class="card card-placeholder">?</div>
      </div>
    </div>
    <button class="next-stage-btn">다음 단계 →</button>
  </div>

  <div class="game-stage" data-stage="flop" style="display: none;">
    <div class="stage-header">
      <span class="stage-number">2</span>
      <h3>Flop</h3>
      <p>커뮤니티 카드 3장 공개</p>
    </div>
    <div class="cards-area">
      <div class="hole-cards">
        <div class="card">🂡</div>
        <div class="card">🂱</div>
      </div>
      <div class="community-cards">
        <div class="card card-reveal">🃁</div>
        <div class="card card-reveal">🃋</div>
        <div class="card card-reveal">🂮</div>
        <div class="card card-placeholder">?</div>
        <div class="card card-placeholder">?</div>
      </div>
    </div>
    <button class="next-stage-btn">다음 단계 →</button>
  </div>

  <div class="game-stage" data-stage="turn" style="display: none;">
    <div class="stage-header">
      <span class="stage-number">3</span>
      <h3>Turn</h3>
      <p>커뮤니티 카드 4번째 공개</p>
    </div>
    <div class="cards-area">
      <div class="hole-cards">
        <div class="card">🂡</div>
        <div class="card">🂱</div>
      </div>
      <div class="community-cards">
        <div class="card">🃁</div>
        <div class="card">🃋</div>
        <div class="card">🂮</div>
        <div class="card card-reveal">🃑</div>
        <div class="card card-placeholder">?</div>
      </div>
    </div>
    <button class="next-stage-btn">다음 단계 →</button>
  </div>

  <div class="game-stage" data-stage="river" style="display: none;">
    <div class="stage-header">
      <span class="stage-number">4</span>
      <h3>River</h3>
      <p>마지막 커뮤니티 카드 공개</p>
    </div>
    <div class="cards-area">
      <div class="hole-cards">
        <div class="card">🂡</div>
        <div class="card">🂱</div>
      </div>
      <div class="community-cards">
        <div class="card">🃁</div>
        <div class="card">🃋</div>
        <div class="card">🂮</div>
        <div class="card">🃑</div>
        <div class="card card-reveal">🂡</div>
      </div>
    </div>
    <div class="result-display">
      <h4>🏆 최종 패: One Pair (Aces)</h4>
    </div>
    <button class="reset-game-btn">처음부터 다시 보기</button>
  </div>
</div>

**게임 목표**: 7장의 카드(홀 카드 2장 + 커뮤니티 카드 5장) 중 **가장 강한 5장 조합**을 만들어 팟(Pot)을 획득

---

## 🏆 패 랭킹 - 강한 순서

<div class="hand-ranking-grid">
  <div class="hand-card" data-rank="1">
    <div class="card-front">
      <div class="rank-number">1</div>
      <h3>Royal Flush</h3>
      <div class="cards-display">🂮🂭🂫🂪🂩</div>
      <p class="hand-description">A-K-Q-J-10 같은 무늬</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">0.000154%</p>
      <p class="odds">649,739 : 1</p>
      <p class="tip">💎 포커의 궁극적인 손패</p>
    </div>
  </div>

  <div class="hand-card" data-rank="2">
    <div class="card-front">
      <div class="rank-number">2</div>
      <h3>Straight Flush</h3>
      <div class="cards-display">🃉🃈🃇🃆🃅</div>
      <p class="hand-description">5장 연속, 같은 무늬</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">0.00139%</p>
      <p class="odds">72,192 : 1</p>
      <p class="tip">⚡ 로얄 플러시 다음 최강</p>
    </div>
  </div>

  <div class="hand-card" data-rank="3">
    <div class="card-front">
      <div class="rank-number">3</div>
      <h3>Four of a Kind</h3>
      <div class="cards-display">🂡🃁🃑🂱🃋</div>
      <p class="hand-description">같은 숫자 4장</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">0.0240%</p>
      <p class="odds">4,164 : 1</p>
      <p class="tip">🔥 "쿼드" 또는 "포카드"</p>
    </div>
  </div>

  <div class="hand-card" data-rank="4">
    <div class="card-front">
      <div class="rank-number">4</div>
      <h3>Full House</h3>
      <div class="cards-display">🂮🃎🂾🂫🃛</div>
      <p class="hand-description">트리플 + 페어</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">0.1441%</p>
      <p class="odds">693 : 1</p>
      <p class="tip">🏠 "풀보트" 또는 "보트"</p>
    </div>
  </div>

  <div class="hand-card" data-rank="5">
    <div class="card-front">
      <div class="rank-number">5</div>
      <h3>Flush</h3>
      <div class="cards-display">🂲🂸🂥🂢🂩</div>
      <p class="hand-description">같은 무늬 5장</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">0.1965%</p>
      <p class="odds">508 : 1</p>
      <p class="tip">💧 무늬만 같으면 OK</p>
    </div>
  </div>

  <div class="hand-card" data-rank="6">
    <div class="card-front">
      <div class="rank-number">6</div>
      <h3>Straight</h3>
      <div class="cards-display">🃙🂸🃗🂶🂥</div>
      <p class="hand-description">연속 숫자 5장</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">0.3925%</p>
      <p class="odds">254 : 1</p>
      <p class="tip">📊 무늬 상관없음</p>
    </div>
  </div>

  <div class="hand-card" data-rank="7">
    <div class="card-front">
      <div class="rank-number">7</div>
      <h3>Three of a Kind</h3>
      <div class="cards-display">🂮🃎🂾🂢🃇</div>
      <p class="hand-description">같은 숫자 3장</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">2.1128%</p>
      <p class="odds">46 : 1</p>
      <p class="tip">🎯 "트립스" 또는 "셋"</p>
    </div>
  </div>

  <div class="hand-card" data-rank="8">
    <div class="card-front">
      <div class="rank-number">8</div>
      <h3>Two Pair</h3>
      <div class="cards-display">🂮🃎🂫🃛🂢</div>
      <p class="hand-description">페어 2개</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">4.7539%</p>
      <p class="odds">20 : 1</p>
      <p class="tip">✌️ 자주 나오는 패</p>
    </div>
  </div>

  <div class="hand-card" data-rank="9">
    <div class="card-front">
      <div class="rank-number">9</div>
      <h3>One Pair</h3>
      <div class="cards-display">🂮🃎🂢🃇🃙</div>
      <p class="hand-description">같은 숫자 2장</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">42.2569%</p>
      <p class="odds">1.36 : 1</p>
      <p class="tip">👫 가장 흔한 패</p>
    </div>
  </div>

  <div class="hand-card" data-rank="10">
    <div class="card-front">
      <div class="rank-number">10</div>
      <h3>High Card</h3>
      <div class="cards-display">🂮🂫🂩🃇🃅</div>
      <p class="hand-description">아무 조합도 없음</p>
    </div>
    <div class="card-back">
      <h4>확률</h4>
      <p class="probability">50.1177%</p>
      <p class="odds">0.99 : 1</p>
      <p class="tip">🎴 가장 높은 카드로 승부</p>
    </div>
  </div>
</div>

<p class="ranking-tip">💡 <strong>팁</strong>: 각 카드를 클릭하면 상세 정보와 확률을 볼 수 있습니다</p>

---

## 🎬 왜 포커는 방송 콘텐츠인가?

<div class="broadcast-reasons">
  <div class="reason-card">
    <div class="icon">🧠</div>
    <h3>심리전</h3>
    <p>상대의 블러프를 읽고, 텔(Tell)을 파악하는 치열한 두뇌 싸움</p>
    <div class="example">
      <strong>예시:</strong> Phil Ivey의 전설적인 포커페이스
    </div>
  </div>

  <div class="reason-card">
    <div class="icon">🎲</div>
    <h3>운과 실력의 조화</h3>
    <p>확률 계산(수학) + 의사결정(경험) + 운(카드)</p>
    <div class="example">
      <strong>예시:</strong> 2% 확률로 역전하는 "Bad Beat"
    </div>
  </div>

  <div class="reason-card">
    <div class="icon">⚡</div>
    <h3>극적인 역전</h3>
    <p>리버 한 장으로 수억 원의 팟이 주인을 바꾸는 순간</p>
    <div class="example">
      <strong>예시:</strong> WSOP 2003 Chris Moneymaker의 블러프
    </div>
  </div>

  <div class="reason-card">
    <div class="icon">💰</div>
    <h3>고액 베팅</h3>
    <p>수십억 원이 오가는 긴장감 넘치는 올인 순간</p>
    <div class="example">
      <strong>예시:</strong> $1,000,000 Buy-in 토너먼트
    </div>
  </div>
</div>

---

## 🌟 스타 플레이어

<div class="player-profiles">
  <div class="player-card" data-player="phil-ivey">
    <div class="player-image">
      <div class="avatar">PI</div>
      <div class="achievement-badge">🏆 10x WSOP</div>
    </div>
    <div class="player-info">
      <h3>Phil Ivey</h3>
      <p class="nickname">"The Tiger Woods of Poker"</p>
      <div class="stats">
        <div class="stat">
          <span class="label">WSOP 브레이슬릿</span>
          <span class="value">10개</span>
        </div>
        <div class="stat">
          <span class="label">토너먼트 상금</span>
          <span class="value">$30M+</span>
        </div>
        <div class="stat">
          <span class="label">특징</span>
          <span class="value">완벽한 포커페이스</span>
        </div>
      </div>
    </div>
  </div>

  <div class="player-card" data-player="daniel-negreanu">
    <div class="player-image">
      <div class="avatar">DN</div>
      <div class="achievement-badge">🎯 GGPoker</div>
    </div>
    <div class="player-info">
      <h3>Daniel Negreanu</h3>
      <p class="nickname">"Kid Poker"</p>
      <div class="stats">
        <div class="stat">
          <span class="label">WSOP 브레이슬릿</span>
          <span class="value">6개</span>
        </div>
        <div class="stat">
          <span class="label">토너먼트 상금</span>
          <span class="value">$42M+</span>
        </div>
        <div class="stat">
          <span class="label">특징</span>
          <span class="value">GGPoker 앰버서더</span>
        </div>
      </div>
    </div>
  </div>

  <div class="player-card" data-player="bryn-kenney">
    <div class="player-image">
      <div class="avatar">BK</div>
      <div class="achievement-badge">💎 #1 Money</div>
    </div>
    <div class="player-info">
      <h3>Bryn Kenney</h3>
      <p class="nickname">"The All-Time Money Leader"</p>
      <div class="stats">
        <div class="stat">
          <span class="label">토너먼트 상금</span>
          <span class="value">$65M+</span>
        </div>
        <div class="stat">
          <span class="label">순위</span>
          <span class="value">역대 1위</span>
        </div>
        <div class="stat">
          <span class="label">최고 상금</span>
          <span class="value">$20.5M (단일)</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

## 📡 GG Production의 역할

<div class="ggp-role-section">
  <div class="role-header">
    <h3>🎬 세계 최고 수준의 포커 방송을 제작하여 전 세계에 전달</h3>
  </div>

  <div class="role-highlights">
    <div class="highlight-item">
      <div class="number">300+</div>
      <p>연간 이벤트</p>
    </div>
    <div class="highlight-item">
      <div class="number">50+</div>
      <p>서비스 국가</p>
    </div>
    <div class="highlight-item">
      <div class="number">24/7</div>
      <p>라이브 스트리밍</p>
    </div>
    <div class="highlight-item">
      <div class="number">4K</div>
      <p>멀티캠 시스템</p>
    </div>
  </div>

  <div class="tech-stack">
    <h4>우리가 사용하는 기술</h4>
    <div class="tech-badges">
      <span class="badge">Sony FR7 PTZ 카메라</span>
      <span class="badge">RFID 실시간 데이터</span>
      <span class="badge">POKER GFX 그래픽</span>
      <span class="badge">멀티캠 스위칭</span>
      <span class="badge">라이브 스트리밍</span>
    </div>
  </div>
</div>

---

## ✅ 학습 점검 퀴즈

<div class="quiz-container">
  <div class="quiz-question" data-question="1">
    <h4>Q1. WSOP는 언제 설립되었나요?</h4>
    <div class="quiz-options">
      <button class="quiz-option" data-correct="false">1965년</button>
      <button class="quiz-option" data-correct="true">1970년</button>
      <button class="quiz-option" data-correct="false">1980년</button>
      <button class="quiz-option" data-correct="false">1990년</button>
    </div>
    <div class="quiz-feedback" style="display: none;"></div>
  </div>

  <div class="quiz-question" data-question="2">
    <h4>Q2. 텍사스 홀덤에서 각 플레이어에게 몇 장의 홀 카드가 배분되나요?</h4>
    <div class="quiz-options">
      <button class="quiz-option" data-correct="false">1장</button>
      <button class="quiz-option" data-correct="true">2장</button>
      <button class="quiz-option" data-correct="false">3장</button>
      <button class="quiz-option" data-correct="false">5장</button>
    </div>
    <div class="quiz-feedback" style="display: none;"></div>
  </div>

  <div class="quiz-question" data-question="3">
    <h4>Q3. 가장 강한 패는 무엇인가요?</h4>
    <div class="quiz-options">
      <button class="quiz-option" data-correct="false">Straight Flush</button>
      <button class="quiz-option" data-correct="true">Royal Flush</button>
      <button class="quiz-option" data-correct="false">Four of a Kind</button>
      <button class="quiz-option" data-correct="false">Full House</button>
    </div>
    <div class="quiz-feedback" style="display: none;"></div>
  </div>

  <div class="quiz-question" data-question="4">
    <h4>Q4. GGPoker는 몇 년에 온라인 포커 플랫폼 세계 1위가 되었나요?</h4>
    <div class="quiz-options">
      <button class="quiz-option" data-correct="false">2014년</button>
      <button class="quiz-option" data-correct="false">2020년</button>
      <button class="quiz-option" data-correct="true">2021년</button>
      <button class="quiz-option" data-correct="false">2024년</button>
    </div>
    <div class="quiz-feedback" style="display: none;"></div>
  </div>

  <div class="quiz-result" style="display: none;">
    <h3>🎉 퀴즈 완료!</h3>
    <p class="score">정답: <span id="correct-count">0</span> / 4</p>
    <button class="retry-btn">다시 풀기</button>
  </div>
</div>

---

<div class="next-module-cta">
  <p>다음 모듈에서는 포커 현장에서 반드시 알아야 할 <strong>필수 용어 30개</strong>를 배웁니다</p>
  <button class="cta-button">다음: 1.2 포커 용어 사전 →</button>
</div>
