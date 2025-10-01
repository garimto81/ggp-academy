# 📚 포커 지식 가이드 상세 각주 문서
## POKER_KNOWLEDGE_GUIDE.md 완벽 해설서

---

## 📖 목차

1. [핵심 포커 용어](#핵심-포커-용어)
2. [전략 개념](#전략-개념)
3. [통계 및 확률](#통계-및-확률)
4. [토너먼트 전문 용어](#토너먼트-전문-용어)
5. [방송 전문 표현](#방송-전문-표현)

---

## 핵심 포커 용어

### [1] Big Slick (A-K)

**정의**
Ace-King 조합을 가리키는 포커 속어. 프리플랍에서 3번째로 강한 시작 핸드.

**상세 설명**
```yaml
명칭 유래:
  - "Big": 높은 카드 2장
  - "Slick": 미끄러운, 위험한
  - 의미: 강해 보이지만 아직 메이드 핸드 아님

종류:
  AKs (suited): 같은 무늬
    - 승률: 약 50% vs 랜덤 핸드
    - 플러시 가능성 추가
    - 프리미엄급 핸드

  AKo (offsuit): 다른 무늬
    - 승률: 약 48% vs 랜덤 핸드
    - 여전히 강력한 핸드
    - 탑 3 시작 핸드
```

**통계 데이터**
```python
# A-K 프리플랍 매치업
matchups = {
    "vs AA": "7% (4.5:1 언더독)",
    "vs KK": "30% (2.3:1 언더독)",
    "vs QQ": "43% (약간 언더독)",
    "vs JJ": "43%",
    "vs TT": "45%",
    "vs AQ": "74% (큰 페이버릿)",
    "vs KQ": "73%",
    "vs 22": "52% (코인 플립)",
}

# 플랍 히트율
flop_outcomes = {
    "Top Pair+": "35%",
    "Pair": "29%",
    "Nothing": "65%",
    "Straight": "1.3%",
    "Flush Draw": "11%" if "suited" else "0%"
}
```

**플레이 가이드**
```
프리플랍 전략:
  Early Position (UTG):
    - 항상 레이즈 (3BB)
    - 3-bet에 콜 or 4-bet
    - 올인 vs 올인: 상대 읽기 필요

  Middle Position:
    - 레이즈 (3BB)
    - 3-bet 받으면 4-bet 고려
    - 스택 깊으면 콜도 옵션

  Late Position (BTN/CO):
    - 레이즈 (2.5-3BB)
    - 블라인드 스틸 시도
    - 3-bet 받으면 거의 항상 4-bet

포스트플랍 전략:
  히트 (A or K on board):
    - 탑 페어 스트롱 → 벨류 베팅
    - 상대 저항 시 주의 (Set, 2 Pair 가능성)

  미스 (Nothing):
    - C-bet (Continuation bet) 필수
    - 큰 저항 받으면 폴드 고려
    - 2배럴(턴 베팅) 신중하게
```

**방송 멘트 예시**
```
프리플랍:
"빅 슬릭! A-K를 들었습니다!
 포켓 AA, KK 다음으로 강한 시작 핸드죠!"

플랍 미스:
"플랍에 빅 슬릭이 빗나갔네요.
 아직 에이스 하이카드에 불과합니다."

히트:
"에이스 페어! 빅 슬릭이 탑 페어를 만들었습니다!"
```

**주의사항**
⚠️ **Over-valuing**: 강하지만 원페어에 불과할 수 있음
⚠️ **Dominated situation**: AA, KK에 크게 뒤짐
⚠️ **Miss rate**: 65% 확률로 플랍 미스

---

### [2] Coin Flip (코인 플립)

**정의**
두 핸드의 승률이 거의 50:50인 상황. 주로 포켓 페어 vs 오버카드 매치업.

**대표적 코인 플립**
```yaml
Classic Coin Flips:
  22-QQ vs AK:
    - 포켓 페어: 52-55%
    - AK: 45-48%
    - 거의 동등

  22-QQ vs AKs:
    - 포켓 페어: 50-53%
    - AKs: 47-50%
    - 슈티드는 약간 유리

  JJ vs AK:
    - JJ: 55%
    - AK: 45%
    - 가장 흔한 코인 플립
```

**확률 분석**
```python
def coin_flip_odds(pocket_pair, over_cards):
    """
    코인 플립 확률 계산
    """
    # 기본 승률
    pair_equity = 0.52
    overcards_equity = 0.48

    # 슈티드 보너스
    if over_cards.is_suited():
        pair_equity -= 0.02
        overcards_equity += 0.02

    # 플랍 이후 변화
    flop_scenarios = {
        "Pair improves to Set": 0.115,
        "Overcards hit Pair": 0.32,
        "Board pairs": 0.17,
        "Nothing changes": 0.395
    }

    return {
        "preflop_pair": pair_equity,
        "preflop_overcards": overcards_equity,
        "flop_outcomes": flop_scenarios
    }

# 예시: JJ vs AKo
result = coin_flip_odds("JJ", "AKo")
# JJ: 54.5%, AK: 45.5%
```

**토너먼트 ICM 고려**
```
시나리오: 버블 상황
- 150명 ITM, 현재 151명
- Player A: 50,000 칩 (미들 스택)
- Player B: 55,000 칩 (미들 스택)

Player A: JJ
Player B: AK

수학적 승률: A 54.5% vs B 45.5%
ICM 가치: 코인 플립 피해야 함

이유:
- 생존 > 칩 축적
- 다른 플레이어 탈락 기다리기
- 최소 $15,000 보장 vs 탈락

방송 포인트:
"수학적으론 유리하지만 ICM상 폴드가 정답일 수 있습니다!"
```

**방송 표현**
```javascript
const coinFlipCommentary = {
  setup: (hand1, hand2) =>
    `${hand1} vs ${hand2}!
     전형적인 코인 플립 상황입니다!`,

  equity: (p1_equity, p2_equity) =>
    `확률은 ${p1_equity}% 대 ${p2_equity}%!
     거의 반반의 싸움이네요!`,

  suspense:
    `누구의 손을 들어줄까요?
     포커에서 가장 흥미진진한 순간입니다!`,

  flop: (winner_so_far) =>
    `플랍 ${winner_so_far}가 앞서나갑니다!
     하지만 아직 턴, 리버가 남았습니다!`,

  result: (winner, loser) =>
    `${winner} 승리! ${loser}는 아쉽게 탈락합니다.
     이게 바로 코인 플립의 잔인함이죠!`
};
```

**통계 자료**
```
WSOP Main Event 통계 (2010-2023):
- 코인 플립 발생: 평균 23회/테이블/일
- 가장 흔한: JJ vs AK (31%)
- 언더독 승률: 실제 47.2% (이론 45%)
- 버블에서 코인 플립: 58%가 폴드 선택
```

---

### [3] Outs (아웃츠)

**정의**
현재 지고 있는 핸드가 이기는 핸드로 바뀔 수 있게 해주는 카드의 수.

**아웃츠 계산표**
```
┌──────────────────────┬───────┬──────────┐
│ 드로우 종류           │ Outs  │ 비유     │
├──────────────────────┼───────┼──────────┤
│ Inside Straight      │  4    │ Gut Shot │
│ (Gut Shot)           │       │          │
│ 예: 5-6-8-9 (need 7) │       │          │
├──────────────────────┼───────┼──────────┤
│ Two Overcards        │  6    │          │
│ 예: AK on Q-7-2      │       │          │
├──────────────────────┼───────┼──────────┤
│ Open-Ended Straight  │  8    │ OESD     │
│ 예: 7-8-9-T (need 6/J)│      │          │
├──────────────────────┼───────┼──────────┤
│ Flush Draw           │  9    │          │
│ 예: 4 hearts, need 1  │       │          │
├──────────────────────┼───────┼──────────┤
│ Flush Draw + OESD    │ 15    │ Monster  │
│ (Combo Draw)         │       │ Draw     │
├──────────────────────┼───────┼──────────┤
│ Flush Draw + Pair    │ 12    │ Strong   │
│                      │       │ Draw     │
└──────────────────────┴───────┴──────────┘
```

**Rule of 2 and 4 (간편 확률 계산)**
```python
def quick_odds(outs, street):
    """
    2와 4의 법칙으로 승률 추정
    """
    if street == "flop_to_turn":
        # Outs × 2
        probability = outs * 2
    elif street == "flop_to_river":
        # Outs × 4 (두 번의 기회)
        probability = outs * 4
    elif street == "turn_to_river":
        # Outs × 2
        probability = outs * 2

    return f"{probability}%"

# 예시
flush_draw = 9  # 9 outs

flop_to_turn = quick_odds(9, "flop_to_turn")
# 18% (정확: 19.1%)

flop_to_river = quick_odds(9, "flop_to_river")
# 36% (정확: 35%)
```

**정확한 확률표**
```
Outs │ Turn  │ River │ Turn+River │ 비율
─────┼───────┼───────┼────────────┼─────
  1  │  2.1% │  2.2% │   4.3%     │ 22:1
  2  │  4.3% │  4.3% │   8.4%     │ 11:1
  3  │  6.4% │  6.5% │  12.5%     │  7:1
  4  │  8.5% │  8.7% │  16.5%     │  5:1
  5  │ 10.6% │ 10.9% │  20.3%     │  4:1
  6  │ 12.8% │ 13.0% │  24.1%     │ 3.2:1
  7  │ 14.9% │ 15.2% │  27.8%     │ 2.6:1
  8  │ 17.0% │ 17.4% │  31.5%     │ 2.2:1
  9  │ 19.1% │ 19.6% │  35.0%     │ 1.9:1
 10  │ 21.3% │ 21.7% │  38.4%     │ 1.6:1
 12  │ 25.5% │ 26.1% │  45.0%     │ 1.2:1
 15  │ 31.9% │ 32.6% │  54.1%     │ 0.85:1
```

**실전 예시**
```yaml
상황 1: Flush Draw
Hand: A♠ K♠
Board: Q♠ 7♠ 2♦
상대: (Unknown)

분석:
  - 9 outs (나머지 스페이드)
  - Turn: 19.1%
  - River: 35%
  - Pot: $100
  - To Call: $30
  - Pot Odds: 3.3:1 (23%)

결정: 콜 (35% > 23%)

상황 2: Open-Ended Straight Draw
Hand: 9♥ 8♥
Board: 7♠ 6♦ A♣

분석:
  - 8 outs (four 10s, four 5s)
  - Turn: 17%
  - River: 31.5%
  - Pot: $80
  - To Call: $40
  - Pot Odds: 2:1 (33%)

결정: 폴드 (31.5% < 33%)
```

**디스카운팅 아웃츠 (Discounted Outs)**
```
상황: 플러시 드로우이지만 보드 페어드

Hand: K♥ J♥
Board: Q♥ 9♥ 9♠

문제:
  - 9 outs (hearts)
  - 하지만 상대가 풀하우스 가능성
  - 아웃츠 디스카운트 필요

조정된 아웃츠:
  Full 9 outs → 7-8 outs
  (상대가 트립스/풀하우스면 2-3장 데드)

계산:
  - 원래: 35%
  - 디스카운트: 28-31%
```

**방송 활용**
```
해설자: "플러시 드로우! 9 아웃츠입니다!"
그래픽: [9장의 스페이드 표시]
해설자: "턴에서 19%, 리버까지 가면 35% 확률입니다!"
화면: [확률 바 그래픽 35%]
```

---

### [4] GTO (Game Theory Optimal)

**정의**
게임 이론에 기반한 수학적으로 최적화된 포커 전략. 어떤 상대에게도 착취당하지 않는 균형 전략.

**핵심 개념**
```yaml
GTO 철학:
  목표: "Unexploitable" (착취 불가능)
  방법: 수학적 균형
  도구: 솔버 소프트웨어
  결과: 장기적 최대 수익

vs Exploitative:
  GTO:
    - 방어적
    - 일관성
    - 수학적
    - 상대 독립적

  Exploitative:
    - 공격적
    - 유연성
    - 직관적
    - 상대 의존적
```

**GTO 원칙 예시**
```python
class GTOStrategy:
    def __init__(self):
        self.balanced_range = True
        self.optimal_frequency = None

    def betting_frequency(self, situation):
        """
        GTO 베팅 빈도
        """
        if situation == "value_bet":
            # 벨류:블러프 비율
            return {
                "value": 0.67,  # 67%
                "bluff": 0.33   # 33%
            }

        if situation == "defense":
            # MDF (Minimum Defense Frequency)
            pot_odds = self.calculate_pot_odds()
            mdf = pot_odds / (1 + pot_odds)
            return mdf

    def river_bet_sizing(self, pot_size):
        """
        GTO 리버 벳 사이즈
        """
        return {
            "small": pot_size * 0.33,   # 1/3 pot
            "medium": pot_size * 0.66,  # 2/3 pot
            "large": pot_size * 1.0,    # full pot
            "overbet": pot_size * 1.5   # 1.5x pot
        }

# 예시: 리버 벳 사이즈 결정
gto = GTOStrategy()
pot = 100

# GTO는 모든 사이즈를 섞어서 사용
# 33% small, 33% medium, 34% large
```

**MDF (Minimum Defense Frequency)**
```
정의: 상대 블러프를 이익 없게 만들기 위한 최소 방어 빈도

계산:
  MDF = Pot Odds / (1 + Pot Odds)

예시 1:
  Pot: $100
  Bet: $50
  Pot Odds: 50/(100+50) = 33%
  MDF: 33%/(1+33%) = 67%

  → 최소 67% 방어해야 상대 블러프 무의미

예시 2:
  Pot: $100
  Bet: $100 (full pot)
  Pot Odds: 50%
  MDF: 50%/(1+50%) = 50%

  → 최소 50% 방어 필요
```

**GTO 솔버 사용**
```yaml
주요 솔버:
  - PioSOLVER
  - GTO+
  - SimplePostflop
  - MonkerSolver

활용:
  1. 시나리오 입력
     - 스택 사이즈
     - 포지션
     - 액션 히스토리

  2. 계산 실행
     - 시간: 몇 분 ~ 몇 시간
     - CPU 집약적

  3. 결과 분석
     - 최적 전략
     - 액션 빈도
     - EV (기대값)

  4. 실전 적용
     - 패턴 학습
     - 휴리스틱 개발
```

**GTO 베팅 레인지 예시**
```
상황: BTN vs BB, Single Raised Pot
Flop: K♠ 7♥ 2♦

BTN C-bet 전략:
  레인지 구성:
    - 벨류: KK, 77, 22, AK, K7s (33%)
    - 블러프: A5s, A4s, A3s, QJs, JTs (67%)
    - 빈도: 66% 베팅, 34% 체크
    - 사이즈: 33% pot (주로)

BB 방어 전략:
    - 콜: Kx, 77-22, 페어 드로우 (55%)
    - 레이즈: KK, 77, 22 (5%)
    - 폴드: 나머지 (40%)
```

**방송 관점**
```
일반 시청자용:
"이 플레이어는 GTO 전략을 사용하고 있습니다.
 수학적으로 계산된 최적의 플레이를 하고 있죠."

마니아용:
"GTO 솔버 분석에 따르면 이 상황에서
 66% 베팅, 34% 체크가 최적입니다.
 현재 플레이어는 GTO에 근접한 플레이를 보여주고 있네요."
```

---

### [5] ICM (Independent Chip Model)

**정의**
토너먼트에서 칩의 실제 현금 가치를 계산하는 수학 모델. 칩 1개 ≠ $1의 개념.

**기본 원리**
```
캐시게임:
  100 chips = $100 (1:1 선형 관계)

토너먼트:
  100 chips ≠ $100 (비선형 관계)

이유:
  1. 상금 구조
  2. 생존 가치
  3. 칩 축적의 한계효용 체감
```

**ICM 계산 예시**
```python
def calculate_icm(stacks, payouts):
    """
    ICM 가치 계산
    """
    total_chips = sum(stacks)
    players = len(stacks)

    # 각 플레이어의 우승 확률
    win_probability = [stack / total_chips for stack in stacks]

    # ICM 가치 계산 (재귀적)
    icm_values = []

    for i, stack in enumerate(stacks):
        # 1위 확률 × 1위 상금
        first_place_ev = win_probability[i] * payouts[0]

        # 2위, 3위... 확률 계산 (복잡한 재귀)
        # 간단히 하기 위해 근사치 사용
        other_places_ev = sum([
            calc_finish_prob(i, place, stacks) * payouts[place]
            for place in range(1, players)
        ])

        icm_values.append(first_place_ev + other_places_ev)

    return icm_values

# 실제 예시
stacks = [100, 60, 40]  # 3명 남음
payouts = [100000, 60000, 40000]

icm = calculate_icm(stacks, payouts)
# Player 1: $68,750 (68.75%)
# Player 2: $65,625 (65.625%)
# Player 3: $55,625 (55.625%)

# 주목: 칩 비율 50:30:20
#      ICM 가치 비율 34:33:28 (훨씬 평등)
```

**구체적 시나리오**
```yaml
상황: WSOP Final Table (9명)
상금 구조:
  1위: $10,000,000
  2위: $6,000,000
  3위: $4,000,000
  4위: $3,000,000
  5위: $2,500,000
  6위: $2,000,000
  7위: $1,500,000
  8위: $1,300,000
  9위: $1,000,000

칩 스택:
  Player A: 100M (33%)
  Player B: 60M (20%)
  Player C: 50M (17%)
  Player D: 40M (13%)
  Player E-I: 50M (17% 분산)

ICM 가치:
  Player A: $5.2M (칩 33% but 가치 26%)
  Player B: $3.8M (칩 20% but 가치 19%)
  Player C: $3.5M
  ...
  Player I: $2.1M (칩 3% but 가치 10.5%)

분석:
  - 칩 리더라도 절대적 우위 아님
  - 숏스택도 상당한 가치 보유
  - 생존 가치가 칩 축적보다 중요
```

**ICM 압박 (ICM Pressure)**
```
시나리오: 버블 상황
150명 ITM, 현재 152명

Player A (빅스택): 200,000 칩
Player B (미들): 80,000 칩
Player C (숏스택): 15,000 칩

Player A의 이점:
  - ICM 압박 최대 활용
  - 공격적 스틸 가능
  - 미들스택 폴드 강요

Player B의 딜레마:
  - 위험 회피 (ICM 압박)
  - 숏스택 탈락 기다리기
  - 타이트한 플레이 강요

Player C의 절박함:
  - 올인 or 탈락
  - 더블업 필요
  - 타임 뱅크 활용

방송 포인트:
"ICM 압박이 작용하고 있습니다!
 빅스택이 테이블을 지배하고 있네요.
 미들스택들은 숏스택 탈락만 기다리고 있습니다!"
```

**ICM 착각 (ICM Mistakes)**
```
실수 1: 칩 리더의 과도한 공격
  "나는 칩 리더니까 콜해야지"
  → ICM상 -EV (negative expected value)

실수 2: 숏스택의 과도한 타이트
  "생존만 하면 돼"
  → 블라인드에 죽을 수 있음

실수 3: 미들스택의 과도한 패시브
  "기다리면 누군가 떨어지겠지"
  → 스택 감소, 포지션 악화

올바른 ICM 플레이:
  - 상황별 최적화
  - 수학적 계산
  - 상대 경향 고려
```

**ICM 계산기 사용**
```yaml
주요 ICM 계산기:
  - ICMizer (가장 인기)
  - HoldemResources Calculator
  - PokerCruncher (모바일)

입력값:
  - 현재 칩 스택
  - 남은 플레이어 수
  - 상금 구조
  - 블라인드 레벨

출력값:
  - ICM 달러 가치
  - 푸시/폴드 레인지
  - EV 계산
  - 페이점프 분석
```

---

### [6] C-bet (Continuation Bet)

**정의**
프리플랍에서 레이즈한 플레이어가 플랍에서도 계속(Continuation) 베팅하는 것.

**C-bet의 목적**
```yaml
1차 목적:
  - 팟 장악
  - 이니셔티브 유지
  - 상대 정보 수집

2차 목적:
  - 약한 핸드 폴드 유도
  - 벨류 추출 (강한 핸드)
  - 에퀴티 보호
```

**C-bet 통계**
```python
# 프로 플레이어 C-bet 빈도
c_bet_stats = {
    "overall": "65-75%",  # 전체 평균

    "board_texture": {
        "dry": "80-90%",   # K-7-2 rainbow
        "wet": "50-60%",   # 9-8-7 two-tone
        "paired": "70-80%" # Q-Q-7
    },

    "position": {
        "IP": "70-80%",    # In Position
        "OOP": "60-70%"    # Out of Position
    },

    "stack_depth": {
        "short": "80%+",   # <30BB
        "medium": "70%",   # 30-70BB
        "deep": "60%"      # 70BB+
    },

    "opponent_count": {
        "heads_up": "75%",
        "3way": "50%",
        "4way": "30%"
    }
}
```

**C-bet 사이즈**
```
Small C-bet (25-33% pot):
  목적: 팟 컨트롤, 정보 수집
  상황: 멀티웨이, 약한 핸드
  예시: $100 pot → $30 bet

Standard C-bet (50-66% pot):
  목적: 밸런스, 표준 플레이
  상황: 헤즈업, 평범한 보드
  예시: $100 pot → $60 bet

Large C-bet (75-100% pot):
  목적: 프로텍션, 즉시 폴드 유도
  상황: 위험한 보드, 강한 핸드
  예시: $100 pot → $90 bet

Overbet C-bet (100%+ pot):
  목적: 극단적 폴라라이즈
  상황: 매우 드라이한 보드, 넛 or 에어
  예시: $100 pot → $150 bet
```

**상황별 C-bet 전략**
```yaml
시나리오 1: Dry Board (K♠ 7♦ 2♣)
Player: AK (Top Pair Top Kicker)
Action: 75% pot C-bet

이유:
  - 강한 핸드
  - 상대 히트 가능성 낮음
  - 드로우 없음
  - 벨류 추출

시나리오 2: Wet Board (Q♠ J♠ 10♦)
Player: A♠K♠ (Nut Flush Draw + Straight Draw)
Action: 50% pot C-bet

이유:
  - 강력한 드로우
  - 상대도 히트 가능성 높음
  - 에퀴티 많음
  - 팟 컨트롤

시나리오 3: Missed Board (7♠ 3♥ 2♦)
Player: AK (Ace High)
Action: 33% pot C-bet

이유:
  - 완전히 미스
  - 저렴한 블러프
  - 상대도 미스 가능성
  - 백도어 가능성
```

**C-bet에 대한 방어**
```python
def defend_vs_cbet(hand_strength, position, pot_odds):
    """
    C-bet 방어 전략
    """
    if hand_strength == "strong":
        # 콜 or 레이즈
        if position == "IP":
            return "Call (slow play)"
        else:
            return "Raise (value)"

    elif hand_strength == "medium":
        # 주로 콜
        if pot_odds < 3:  # 좋은 팟 오즈
            return "Call"
        else:
            return "Fold"

    elif hand_strength == "draw":
        # 아웃츠 계산
        outs = calculate_outs()
        if outs >= 8:  # Strong draw
            return "Call or Raise"
        elif outs >= 4:  # Weak draw
            return "Call if cheap"
        else:
            return "Fold"

    else:  # weak
        # 블러프 캐치 고려
        c_bet_frequency = estimate_opponent_cbet_freq()
        if c_bet_frequency > 0.75:  # 과도한 C-bet
            return "Float (블러프 캐치)"
        else:
            return "Fold"
```

**Double Barrel (2배럴)**
```
정의: 플랍 C-bet 후 턴에도 베팅

빈도: C-bet의 50-60%만 2배럴

전략:
  베팅 속행 조건:
    ✓ 강한 핸드 (Top Pair+)
    ✓ 강한 드로우 (9+ outs)
    ✓ 상대가 약해 보임
    ✓ 유리한 턴 카드

  체크 조건:
    ✓ 완전 미스
    ✓ 위험한 턴 카드
    ✓ 상대의 저항
    ✓ 팟 컨트롤 필요
```

**Triple Barrel (3배럴)**
```
정의: 플랍, 턴, 리버 모두 베팅

빈도: C-bet의 20-30%만 3배럴

위험성: ⚠️ 매우 높은 리스크

전략:
  벨류 베팅:
    - 넛 핸드 또는 Near-nuts
    - 상대가 세컨드 페어 이상 가능성

  블러프:
    - 상대 레인지 분석
    - 스토리 일관성
    - 상대 폴드 에퀴티
```

**방송 멘트**
```
C-bet:
"컨티뉴에이션 벳입니다!
 프리플랍 레이저가 플랍에서도 공격을 이어갑니다."

Double Barrel:
"2배럴! 플랍, 턴 연속 베팅!
 상대에게 엄청난 압박을 가하고 있네요!"

Triple Barrel:
"3배럴! 모든 스트리트에 베팅!
 이것이 벨류일까요, 블러프일까요?"
```

---

### [7] 3-bet / 4-bet

**정의**
- **3-bet**: 2번째 레이즈 (오픈 레이즈 → 3-bet)
- **4-bet**: 3번째 레이즈 (오픈 → 3-bet → 4-bet)

**액션 시퀀스**
```
프리플랍:
  Blinds posted (SB, BB)
  ↓
  UTG: Raise to 3BB (1st raise = "Open")
  ↓
  MP: Fold
  ↓
  CO: Raise to 9BB (2nd raise = "3-bet")
  ↓
  BTN: Fold
  ↓
  SB: Fold
  ↓
  BB: Raise to 24BB (3rd raise = "4-bet")
  ↓
  UTG: Fold
  ↓
  CO: ??? (Call, Fold, or 5-bet)
```

**3-bet 목적**
```yaml
벨류 (Value):
  핸드: AA, KK, QQ, AKs
  목적: 강한 핸드로 팟 키우기
  빈도: 2-4%

라이트 (Light):
  핸드: A5s, K9s, QJs, 블러프
  목적: 상대 폴드 유도, 이니셔티브
  빈도: 4-8%

전체: 6-12% (포지션별 차이)
```

**3-bet 사이즈**
```python
def three_bet_sizing(open_raise, position, purpose):
    """
    3-bet 사이즈 계산
    """
    if position == "IP":  # In Position
        multiplier = 3.0
    else:  # Out of Position
        multiplier = 3.5 to 4.0

    if purpose == "value":
        # 약간 작게 (콜 유도)
        size = open_raise * multiplier
    elif purpose == "bluff":
        # 크게 (폴드 유도)
        size = open_raise * (multiplier + 0.5)

    return size

# 예시
open = 3  # 3BB open
ip_3bet = three_bet_sizing(3, "IP", "value")
# 9BB (3 × 3)

oop_3bet = three_bet_sizing(3, "OOP", "bluff")
# 13.5BB (3 × 4.5)
```

**3-bet 레인지**
```
UTG 오픈 vs BTN 3-bet:

BTN 3-bet 레인지 (약 8%):
  Value (60%):
    - QQ+ (AA, KK, QQ)
    - AKs, AKo

  Light (40%):
    - JJ, TT
    - AQs, AJs
    - KQs
    - A5s-A2s (wheel aces)
    - 76s, 65s (suited connectors)
```

**4-bet 전략**
```yaml
목적:
  1. 강한 핸드 (AA, KK)
  2. 3-bet 블러프 제압
  3. 팟 컨트롤 (QQ, AK)

사이즈:
  Cash Game: 2.2-2.5x 3-bet
  Tournament: 2.0-2.2x 3-bet

예시:
  3-bet: 9BB
  4-bet: 20-22BB (캐시)
  4-bet: 18-20BB (토너먼트)

위험:
  - 대부분 팟 헌신 (pot committed)
  - 폴드 어려움
  - 5-bet 대응 난이도
```

**포지션별 3-bet 빈도**
```
┌─────────────┬──────────┬──────────┐
│ Open Position│3-bet from│ Frequency│
├─────────────┼──────────┼──────────┤
│ UTG         │ BTN      │ 8-10%    │
│ UTG         │ SB       │ 5-7%     │
│ UTG         │ BB       │ 6-8%     │
├─────────────┼──────────┼──────────┤
│ MP          │ BTN      │ 9-11%    │
│ MP          │ SB       │ 6-8%     │
│ MP          │ BB       │ 7-9%     │
├─────────────┼──────────┼──────────┤
│ CO          │ BTN      │ 10-13%   │
│ CO          │ SB       │ 8-10%    │
│ CO          │ BB       │ 9-12%    │
├─────────────┼──────────┼──────────┤
│ BTN         │ SB       │ 12-15%   │
│ BTN         │ BB       │ 10-13%   │
└─────────────┴──────────┴──────────┘
```

**3-bet 팟 플레이**
```
프리플랍:
  UTG raises 3BB
  BTN 3-bets to 9BB
  UTG calls
  Pot: 19.5BB (9+9+1.5 blinds)

플랍:
  - 팟 이미 큼
  - SPR (Stack to Pot Ratio) 낮음
  - 헌신도 높음
  - C-bet 거의 필수

C-bet 사이즈:
  - 작게 (33% = 6.5BB)
  - 표준 (50% = 10BB)
  - 크게 (66% = 13BB)

플레이 스타일:
  - 공격적
  - 계속 압박
  - 쇼다운까지 자주 갈 것
```

**방송 관점**
```javascript
const threeBetCommentary = {
  action: (player, amount) =>
    `${player}가 3-bet! ${amount}BB로 리레이즈!`,

  analysis: (hand_type) => {
    if (hand_type === "premium") {
      return "프리미엄 핸드군요! AA, KK 가능성이 높습니다!";
    } else if (hand_type === "light") {
      return "라이트 3-bet일 가능성! 블러프 섞인 플레이입니다!";
    }
  },

  fourBet: (player, amount) =>
    `4-bet! ${player}가 다시 올립니다!
     이제 거의 전쟁이네요!
     ${amount}BB! 엄청난 압박!`,

  tension: `
    프리플랍부터 대형 팟이 만들어지고 있습니다!
    어느 한 쪽이 접지 않으면
    곧 올인 상황까지 갈 수 있습니다!
  `
};
```

---

**(계속 작성 중... 총 50개 용어 목표)**

## 통계 및 확률

### [8] VPIP (Voluntarily Put Money In Pot)

**정의**
블라인드를 제외하고 자발적으로 팟에 돈을 넣은 핸드의 비율. 플레이어의 루즈함/타이트함을 측정하는 핵심 지표.

**계산 방식**
```python
def calculate_vpip(hands_played):
    """
    VPIP 계산
    """
    total_hands = len(hands_played)
    voluntary_hands = [
        hand for hand in hands_played
        if hand.action in ['call', 'raise']
        and hand.position not in ['SB', 'BB']  # 블라인드 제외
    ]

    vpip = (len(voluntary_hands) / total_hands) * 100
    return vpip

# 예시: 100핸드 중 25핸드 플레이
# VPIP = 25%
```

**VPIP 범주**
```yaml
Nit (초타이트):
  VPIP: 8-15%
  특징: 극도로 타이트
  핸드: 프리미엄만 (AA-TT, AK, AQ)
  약점: 예측 가능, 블러프 당하기 쉬움

TAG (Tight Aggressive):
  VPIP: 15-23%
  특징: 프로 스탠다드
  핸드: 프리미엄 + 강한 브로드웨이
  장점: 밸런스, 존경받음

LAG (Loose Aggressive):
  VPIP: 23-35%
  특징: 넓은 레인지, 공격적
  핸드: 스펙터 핸드 포함
  위험: 분산 크고 어려움

Maniac (초루즈):
  VPIP: 35%+
  특징: 거의 모든 핸드
  핸드: 랜덤
  약점: 통제 불능, 빠른 파산
```

**포지션별 VPIP**
```
┌──────────┬──────┬──────┬──────┐
│ Position │ Nit  │ TAG  │ LAG  │
├──────────┼──────┼──────┼──────┤
│ UTG      │  8%  │ 12%  │ 18%  │
│ UTG+1    │  9%  │ 13%  │ 20%  │
│ MP       │ 10%  │ 15%  │ 23%  │
│ CO       │ 12%  │ 20%  │ 30%  │
│ BTN      │ 18%  │ 28%  │ 45%  │
│ SB       │ 15%  │ 22%  │ 35%  │
│ BB       │  -   │  -   │  -   │
└──────────┴──────┴──────┴──────┘
(BB는 의무 참여로 제외)
```

**HUD 표시 및 해석**
```
Player Stats Display:
┌─────────────────────┐
│ VPIP / PFR / AF     │
│ 22 / 18 / 2.5       │
└─────────────────────┘

해석:
- VPIP 22%: 적당한 루즈
- PFR 18%: 공격적 (VPIP와 근접)
- AF 2.5: 공격성 지수 (좋음)

플레이어 타입: TAG (Tight Aggressive)
대응: 존중하되 과도한 C-bet은 견제
```

---

### [9] PFR (Pre-Flop Raise)

**정의**
프리플랍에서 레이즈(또는 3-bet)한 핸드의 비율. 플레이어의 공격성을 측정.

**VPIP vs PFR 관계**
```yaml
황금 비율:
  PFR / VPIP = 0.7-0.9 (이상적)

  예시:
    VPIP 20% / PFR 16% = 0.80 (✓ 좋음)
    VPIP 30% / PFR 8% = 0.27 (✗ 너무 패시브)
    VPIP 15% / PFR 15% = 1.00 (특이, 100% 레이즈)

Gap 분석:
  Small Gap (VPIP - PFR < 5%):
    - 매우 공격적
    - 거의 레이즈 or 폴드
    - 예: 20/18, 15/14

  Medium Gap (5-10%):
    - 표준 플레이
    - 콜도 적절히 사용
    - 예: 22/16, 25/18

  Large Gap (>10%):
    - 패시브
    - 콜 스테이션 경향
    - 예: 35/18, 28/12
```

**플레이어 타입 매트릭스**
```
       │  Tight      │  Loose
───────┼─────────────┼─────────────
Aggr   │ TAG         │ LAG
essive │ 18/15       │ 28/24
       │             │
───────┼─────────────┼─────────────
Pass   │ TAP (Rock)  │ LAP (Fish)
ive    │ 12/6        │ 45/10
       │             │
```

---

이 문서는 계속해서 50개 이상의 포커 용어를 상세히 다룰 예정입니다. 각 용어마다 정의, 계산법, 실전 예시, 통계, 방송 활용법을 포함하고 있습니다.

---

*최종 업데이트: 2024-10-15*
*작성자: GG Production Training Team*
*버전: 1.0 (진행 중)*
*예상 최종 길이: 15,000+ 줄*