# 📚 전환 가이드 상세 각주 문서
## TRANSITION_GUIDE.md 용어 및 개념 완벽 해설

---

## 📖 목차

1. [기술 용어 각주](#기술-용어-각주)
2. [포커 용어 각주](#포커-용어-각주)
3. [방송 기술 용어 각주](#방송-기술-용어-각주)
4. [조직 및 역할 용어 각주](#조직-및-역할-용어-각주)
5. [실무 프로세스 각주](#실무-프로세스-각주)

---

## 기술 용어 각주

### [1] FR7 시스템 (FR7 System)

**정의**
Sony의 FR7 로봇 카메라 시스템. 원격 제어가 가능한 PTZ(Pan-Tilt-Zoom) 카메라로, 포커 토너먼트 중계에 최적화된 장비.

**상세 설명**
```yaml
하드웨어 구성:
  카메라 헤드: Sony α7R IV (61MP 풀프레임)
  로봇 암: 360도 무한 회전, ±210도 틸트
  제어 유닛: RM-IP500 리모트 컨트롤러
  네트워크: IP 기반 제어 (RCP-3500 패널)

주요 특징:
  - 무소음 작동 (라이브 환경 최적)
  - 프리셋 저장 (최대 99개)
  - 자동 초점 및 노출
  - 4K 60fps 지원
  - 실시간 원격 제어

포커 활용:
  - 테이블당 5대 배치 권장
  - 오버헤드, 플레이어 클로즈업, 칩 디테일, 딜러뷰, 보드 샷
  - 1명의 오퍼레이터가 전체 제어 가능
```

**실무 팁**
- **캘리브레이션**: 매 이벤트 시작 전 반드시 수행 (15분 소요)
- **프리셋 명명 규칙**: `[테이블번호]-[포지션]-[샷타입]` 예: `T1-BTN-CU` (테이블1-버튼-클로즈업)
- **백업 계획**: 수동 DSLR 카메라 1대 항상 대기
- **네트워크 주의**: 최소 100Mbps 유선 연결, Wi-Fi 사용 금지

**주의사항**
⚠️ 초기 설정 시간 2시간 필요
⚠️ 전원 차단 시 프리셋 초기화 위험 (UPS 필수)
⚠️ 직사광선 노출 금지 (센서 손상)

**관련 링크**
- [Sony FR7 공식 매뉴얼](https://pro.sony/en_GB/products/remote-cameras/ilme-fr7)
- [포커 프로덕션 세팅 가이드 영상](internal-link)

---

### [2] RFID 시스템 (Radio-Frequency Identification)

**정의**
전파 인식 기술을 활용하여 포커 카드와 칩을 자동으로 읽어 실시간으로 홀카드와 팟 사이즈를 파악하는 시스템.

**기술 상세**
```python
# RFID 구성 요소
rfid_system = {
    "frequency": "13.56 MHz (HF band)",
    "range": "10cm (Near-field)",
    "read_speed": "< 100ms per card",
    "accuracy": "99.9%+",

    "components": {
        "cards": {
            "type": "Passive RFID tags",
            "location": "카드 내부 칩",
            "battery": "불필요 (전파 수신)",
            "lifespan": "~10,000 shuffles"
        },

        "readers": {
            "count": "9개 per table",
            "placement": "각 플레이어 위치 + 보드",
            "power": "PoE (Power over Ethernet)",
            "redundancy": "이중화 시스템"
        },

        "antenna": {
            "type": "Embedded in table",
            "size": "30cm x 20cm",
            "sensitivity": "±2cm tolerance"
        }
    }
}
```

**작동 원리**
1. **카드 배분**: 딜러가 카드 분배 → 리더가 자동 인식
2. **데이터 전송**: RFID 리더 → 중앙 서버 (< 50ms)
3. **검증**: 중복 확인, 에러 체크
4. **딜레이 버퍼**: 30초 지연 처리 (부정행위 방지)
5. **그래픽 송출**: 방송 화면에 홀카드 표시

**30초 딜레이의 중요성**
```
실시간 읽기 → 부정행위 가능성
     ↓
[30초 딜레이 버퍼]
     ↓
방송 송출 → 플레이어는 볼 수 없음
```

**트러블슈팅**
| 문제 | 원인 | 해결 |
|---|---|---|
| **카드 미인식** | 태그 손상, 거리 문제 | 딜러 재배분, 수동 입력 |
| **중복 읽기** | 인접 리더 간섭 | 주파수 조정, 안테나 재배치 |
| **지연 증가** | 네트워크 혼잡 | 전용 VLAN 사용, QoS 설정 |
| **전원 장애** | PoE 스위치 과부하 | UPS 전원, 리더 분산 |

**실무 체크리스트**
- [ ] 이벤트 48시간 전: 카드 태그 테스트 (전체 52장)
- [ ] 24시간 전: 리더 캘리브레이션 (각 9개)
- [ ] 6시간 전: 풀 시스템 테스트 (100핸드 시뮬레이션)
- [ ] 2시간 전: 백업 시스템 가동 확인
- [ ] 30분 전: 최종 동기화 체크

**비용 정보**
- **초기 투자**: 테이블당 $30,000 ~ $50,000
- **카드 세트**: $500 per deck (교체 주기: 3개월)
- **유지보수**: 연간 $10,000 per table

---

### [3] 30초 딜레이 시스템 (30-Second Delay System)

**정의**
홀카드가 방송에 노출되기까지 의도적으로 30초의 시간 지연을 두는 시스템. 게임 무결성 보호가 목적.

**기술 구현**
```javascript
// 딜레이 버퍼 시스템 구조
const delaySystem = {
  input: {
    source: "RFID Raw Data",
    timestamp: "T0",
    buffer: "RAM-based circular buffer"
  },

  processing: {
    duration: "30 seconds",
    queue: "FIFO (First In First Out)",
    capacity: "~60 hands",
    redundancy: "Dual buffer (primary + backup)"
  },

  output: {
    broadcast: "Graphics overlay",
    sync: "Frame-accurate",
    fallback: "Manual input mode"
  },

  // 동기화 포인트
  syncPoints: [
    "핸드 시작",
    "플랍 공개",
    "턴 공개",
    "리버 공개",
    "쇼다운"
  ]
};
```

**실시간 활용법**

**상황 1: 프로듀서 입장**
```
현재 시각: 14:30:00
방송 화면: 14:29:30 핸드 진행
실제 테이블: 14:30:00 핸드 진행

→ 30초 앞을 미리 본다 = 스토리 준비 시간
```

**활용 예시**:
- 🔍 **분석 시간**: "오, 다음 핸드에 AA vs KK 대결이 나온다!"
- 📝 **스크립트 준비**: 내레이션 포인트 메모
- 🎬 **카메라 워크**: 해당 플레이어 클로즈업 준비
- 📊 **그래픽 준비**: 승률 계산, 통계 자료 표시

**상황 2: 비상 상황**
```
T+0:00 RFID 시스템 오류 발생
T+0:15 백업 시스템 전환 시도
T+0:25 수동 입력 모드 준비
T+0:30 방송 계속 (끊김 없음)
```

**동기화 이슈 해결**
```yaml
문제: "딜레이 시간이 28초 또는 32초로 변동"

원인:
  - 네트워크 지연 (Jitter)
  - 서버 처리 부하
  - 버퍼 오버플로우

해결:
  1. NTP 시간 동기화 (±1ms)
  2. 전용 네트워크 세그먼트
  3. 서버 CPU 코어 전용 할당
  4. 버퍼 크기 동적 조정
```

**보안 프로토콜**
- 🔐 **접근 제어**: 딜레이 서버는 격리된 VLAN
- 🔐 **암호화**: AES-256 데이터 암호화
- 🔐 **감사 로그**: 모든 접근 기록 저장
- 🔐 **이중 인증**: 관리자 접근 시 2FA 필수

**규정 준수**
- Gaming Commission 승인 필수
- 연 2회 제3자 감사
- 부정 방지 시스템 인증 (ISO 27001)

---

### [4] PTZ 카메라 (Pan-Tilt-Zoom Camera)

**정의**
좌우 회전(Pan), 상하 회전(Tilt), 줌 인/아웃(Zoom)이 가능한 원격 제어 카메라.

**기술 사양**
```
Pan (좌우):
  - 범위: 360도 연속 회전
  - 속도: 0.1° ~ 300°/sec
  - 정밀도: ±0.05°

Tilt (상하):
  - 범위: -30° ~ +210°
  - 속도: 0.1° ~ 200°/sec
  - 정밀도: ±0.05°

Zoom:
  - 광학: 12x optical zoom
  - 디지털: 2x (4K 다운스케일)
  - 초점: Auto / Manual
  - 최소 거리: 10cm (Macro mode)
```

**포커 프로덕션 활용**

**프리셋 구성 예시**:
```yaml
테이블 1 (메인 테이블):
  Preset 1: Wide Shot
    - Pan: 0°
    - Tilt: 45°
    - Zoom: 1x
    - 용도: 테이블 전체 뷰

  Preset 2-10: Player Close-ups
    - 각 플레이어별 클로즈업
    - Pan: 플레이어 위치 (40° 간격)
    - Tilt: 30° (눈높이)
    - Zoom: 8x

  Preset 11: Board Shot
    - Pan: 0°
    - Tilt: 60° (탑 다운)
    - Zoom: 12x
    - 용도: 커뮤니티 카드 디테일

  Preset 12-20: Chip Stacks
    - 각 플레이어 칩 디테일
    - Zoom: 10x
```

**자동 시퀀스 프로그래밍**:
```python
# 올인 시퀀스 예시
all_in_sequence = [
    {"preset": 2, "duration": 2.0, "desc": "Player A close-up"},
    {"preset": 5, "duration": 2.0, "desc": "Player B close-up"},
    {"preset": 1, "duration": 1.5, "desc": "Wide shot"},
    {"preset": 11, "duration": 3.0, "desc": "Board cards"},
    {"preset": 12, "duration": 1.0, "desc": "Pot chips"},
    {"preset": 2, "duration": 2.0, "desc": "Back to Player A"},
]

# 자동 실행: 13.5초 시퀀스
```

**일반 카메라맨 vs PTZ**
| 항목 | 카메라맨 | PTZ |
|---|---|---|
| **인력** | 1명/대 | 1명/5대 |
| **정확도** | 숙련도 의존 | 프리셋 일관성 |
| **소음** | 움직임 소음 | 무소음 |
| **피로도** | 8시간 한계 | 24시간 가능 |
| **비용** | $300/day/명 | $30k 초기 투자 |

---

## 포커 용어 각주

### [5] 포지션 (Position)

**정의**
딜러 버튼을 기준으로 한 플레이어의 상대적 위치. 포커에서 가장 중요한 전략적 요소 중 하나.

**9-Handed 테이블 포지션**:
```
        [DEALER BUTTON]
              ↓
     1. SB (Small Blind)
     2. BB (Big Blind)
     3. UTG (Under The Gun)
     4. UTG+1
     5. UTG+2 / MP1 (Middle Position 1)
     6. MP2 (Middle Position 2)
     7. LJ (Lojack)
     8. HJ (Hijack)
     9. CO (Cutoff)
    10. BTN (Button) ← 최강 포지션
```

**포지션별 특징**:

**1. BTN (Button) - 딜러 버튼**
```yaml
강점:
  - 항상 마지막 액션
  - 모든 정보 확인 후 결정
  - 블라인드 스틸 기회 최대

전략:
  - 가장 넓은 핸드 레인지 (50%+)
  - 공격적 플레이 권장
  - 포지션 어드밴티지 최대 활용

방송 포인트:
  "버튼 포지션! 가장 유리한 자리입니다!"
```

**2. SB/BB (Small Blind / Big Blind)**
```yaml
약점:
  - 의무 베팅 (Forced bet)
  - 불리한 포지션
  - 첫 액션 (SB next hand)

전략:
  - 방어적 플레이
  - 블라인드 방어 전략
  - 타이트한 레인지

방송 포인트:
  "블라인드 자리, 가장 불리한 포지션이죠"
```

**3. UTG (Under The Gun)**
```yaml
특징:
  - 첫 번째 액션
  - 9명의 정보 없음
  - 압박 최대

전략:
  - 극도로 타이트 (상위 10%)
  - 프리미엄 핸드만 플레이
  - 레이즈 or 폴드

방송 포인트:
  "UTG! 첫 액션의 부담!"
```

**포지션별 승률 통계**:
```
BTN:  +2.5 BB/100 hands
CO:   +1.8 BB/100
HJ:   +0.5 BB/100
MP:   -0.2 BB/100
EP:   -1.0 BB/100
SB:   -0.5 BB/100 (이미 베팅)
BB:   -0.7 BB/100 (이미 베팅)

BB = Big Blind (블라인드 크기)
/100 hands = 100핸드당 평균 수익
```

**실전 적용**:
```
시나리오: BTN의 포지션 스틸 시도

프리플랍:
- Folds to BTN
- BTN raises 2.5BB with Q♠J♦
- SB folds
- BB calls

플랍: K♠9♠3♥
- BB checks
- BTN bets (c-bet) → 포지션 활용
- BB folds

결과: BTN wins without showdown
이유: 포지션 + 이니셔티브
```

---

### [6] 핸드 랭킹 (Hand Rankings)

**완전한 순위 (강함 → 약함)**:

**1. Royal Flush (로열 플러시)** 🏆
```
정의: 같은 무늬 A-K-Q-J-10
예시: A♠ K♠ Q♠ J♠ 10♠

확률: 0.000154% (1 in 649,740 hands)
평균 빈도: 평생 1-2번 볼까 말까

방송 멘트:
"로열 플러시! 포커의 가장 강한 핸드!
 평생에 한 번 볼까 말까 한 핸드입니다!"
```

**2. Straight Flush (스트레이트 플러시)** 🥇
```
정의: 같은 무늬 연속 5장
예시: 9♦ 8♦ 7♦ 6♦ 5♦

확률: 0.00139% (1 in 72,193)
높은 카드가 이김: 9-high > 8-high

특수: Steel Wheel (A♠ 2♠ 3♠ 4♠ 5♠)
      - 최약 스트레이트 플러시
```

**3. Four of a Kind (포카드)** 🥈
```
정의: 같은 숫자 4장
예시: 8♠ 8♥ 8♦ 8♣ K♠

확률: 0.024% (1 in 4,165)
키커: 동률 시 5번째 카드로 판정
      A♠ A♥ A♦ A♣ K♠ > A♠ A♥ A♦ A♣ Q♠

속칭: "Quads" (쿼즈)
```

**4. Full House (풀하우스)** 🥉
```
정의: 트리플 + 원페어
예시: K♠ K♥ K♦ 5♣ 5♠

확률: 0.144% (1 in 694)
판정: 트리플 우선, 페어 차순
      K-K-K-5-5 > Q-Q-Q-A-A

속칭: "Boat" (보트), "Full Boat"
읽는 법: "Kings full of Fives"
```

**5. Flush (플러시)**
```
정의: 같은 무늬 5장 (연속 불필요)
예시: A♥ J♥ 9♥ 6♥ 2♥

확률: 0.197% (1 in 508)
판정: 높은 카드부터 비교
      A-high flush > K-high flush

주의: Ace-high = "Nut Flush" (최강)
```

**6. Straight (스트레이트)**
```
정의: 연속 숫자 5장 (무늬 무관)
예시: 9♠ 8♦ 7♣ 6♥ 5♠

확률: 0.392% (1 in 255)
특수: A는 high 또는 low
      A-K-Q-J-10 (Broadway - 최강)
      A-2-3-4-5 (Wheel - 최약)

주의: K-A-2-3-4는 스트레이트 아님
```

**7. Three of a Kind (트리플/셋)**
```
정의: 같은 숫자 3장
예시: 7♠ 7♥ 7♦ A♣ K♠

확률: 2.11% (1 in 47)
키커: 나머지 2장으로 판정

속칭:
- "Set" = 포켓페어 + 보드 1장
  (예: 들고 있는 7-7, 보드에 7)
- "Trips" = 보드 페어 + 들고 있는 1장
  (예: 들고 있는 7, 보드에 7-7)

Set이 Trips보다 강하게 플레이됨 (히든)
```

**8. Two Pair (투페어)**
```
정의: 페어 2개
예시: J♠ J♦ 8♣ 8♥ A♠

확률: 4.75% (1 in 21)
판정:
  1. 높은 페어 비교
  2. 낮은 페어 비교
  3. 키커 비교

읽는 법: "Jacks and Eights"
속칭: "Two Pair"
```

**9. One Pair (원페어)**
```
정의: 같은 숫자 2장
예시: 10♠ 10♥ A♦ 7♣ 4♠

확률: 42.26% (1 in 2.4)
판정: 페어 → 키커 순서대로

주의: "Top Pair" vs "Underpair"
- Top Pair = 보드 최고 카드 페어
- Underpair = 보드보다 낮은 페어
```

**10. High Card (하이 카드)**
```
정의: 아무 조합도 없음
예시: A♠ K♦ Q♣ 8♥ 5♠

확률: 50.12% (1 in 2)
판정: 높은 카드부터 5장 모두 비교

속칭: "Nothing", "Air", "Busted"
방송: "아무것도 없습니다!"
```

**암기 팁**:
```
기억법: "로스풀플스트투원하"
로 - 로열 플러시
스 - 스트레이트 플러시
풀 - 포카드
플 - 풀하우스
플 - 플러시
스 - 스트레이트
트 - 트리플
투 - 투페어
원 - 원페어
하 - 하이카드
```

---

### [7] 블라인드 (Blinds)

**정의**
토너먼트 또는 캐시게임에서 카드를 받기 전에 강제로 베팅해야 하는 금액. 게임에 액션을 강제하는 역할.

**구조**:
```yaml
Small Blind (SB):
  - 위치: 딜러 버튼 왼쪽 첫 번째
  - 금액: 일반적으로 BB의 50%
  - 예시: BB가 $100이면 SB는 $50

Big Blind (BB):
  - 위치: 딜러 버튼 왼쪽 두 번째
  - 금액: 기준 베팅 금액
  - 예시: $100 (레벨에 따라 증가)

Ante (안테) - 토너먼트 중후반:
  - 전원 의무 베팅
  - 금액: 일반적으로 BB의 10-15%
  - 예시: BB $1,000 → Ante $125
```

**블라인드 레벨 구조** (WSOP 기준):
```
Level  Duration  SB    BB    Ante   Avg Stack
─────────────────────────────────────────────
  1     60분     25    50      -     50,000
  2     60분     50   100      -     50,000
  3     60분     75   150      -     50,000
  4     60분    100   200     25     50,000
  5     60분    150   300     30     48,000
  6     60min   200   400     50     45,000
 ...
 15     60min   5k    10k    1.5k    30,000
 ...
 30     60min   200k  400k   60k     500,000
```

**M-Ratio (유효 스택)**:
```python
def calculate_m_ratio(stack, sb, bb, ante):
    """
    M-Ratio: 몇 번의 라운드를 버틸 수 있는지
    """
    cost_per_round = sb + bb + (ante * 9)  # 9-handed
    m_ratio = stack / cost_per_round
    return m_ratio

# 예시
stack = 30,000
sb = 500
bb = 1,000
ante = 125  # 125 * 9 = 1,125

cost_per_round = 500 + 1,000 + 1,125 = 2,625
M = 30,000 / 2,625 = 11.43

# M-Ratio 해석:
# M > 20: Green Zone (여유)
# M 10-20: Yellow Zone (주의)
# M 6-10: Orange Zone (위험)
# M 1-6: Red Zone (생존 모드)
# M < 1: Dead Zone (올인만)
```

**블라인드 압박 (Blind Pressure)**:
```
토너먼트 초반:
Stack: 50,000
Blinds: 100/200
M-Ratio: 166 (매우 여유)
전략: 타이트하게, 프리미엄 핸드 기다리기

토너먼트 중반:
Stack: 30,000
Blinds: 1,000/2,000 (ante 250)
M-Ratio: 10 (주의 구간)
전략: 공격적으로, 스틸 시도 증가

토너먼트 후반 (버블):
Stack: 20,000
Blinds: 3,000/6,000 (ante 1,000)
M-Ratio: 2 (레드 존)
전략: 푸시/폴드, 올인 빈도 증가
```

**방송 멘트 예시**:
```
"블라인드가 1,000/2,000으로 올랐습니다!
 John의 스택은 15,000칩.
 M-Ratio가 5로 레드 존에 진입했네요.
 이제 공격적인 플레이가 필요합니다!"

"안테가 추가되면서 팟이 더 커지고 있습니다.
 이전에는 1,500칩이었던 초기 팟이
 이제 2,800칩으로 증가했네요!"
```

---

## 방송 기술 용어 각주

### [8] 큐시트 (Cue Sheet)

**정의**
방송 진행 순서와 각 씬의 세부 사항을 타임라인 형태로 정리한 제작 문서. 전체 팀이 공유하는 방송 설계도.

**표준 큐시트 포맷**:
```
┌──────────────────────────────────────────────────────┐
│ GG PRODUCTION CUE SHEET                              │
│ Event: WSOP Main Event Day 3                         │
│ Date: 2024-07-15  Start: 14:00  End: 02:00 (est.)    │
│ Director: Leo Shin  Producer: David Kim              │
├──────────────────────────────────────────────────────┤
│ SEG │ TIME  │ DUR │ CAM │ AUDIO │ GFX │ NOTES       │
├──────────────────────────────────────────────────────┤
│ 001 │ 14:00 │ 0:30│ 1   │ THEME │ OPN │ Opening     │
│ 002 │ 14:00.│ 2:00│ 1-9 │ VO    │ L3  │ Player intro│
│ 003 │ 14:02.│ 0:15│ 1   │ HOST  │ -   │ Welcome     │
│ 004 │ 14:02.│ LIVE│ 2-5 │ TABLE │ SC  │ Live play   │
│ ... │ ...   │ ... │ ... │ ...   │ ... │ ...         │
│ 120 │ 18:00 │ 1:00│ ALL │ -     │ -   │ DINNER BRK  │
│ ... │ ...   │ ... │ ... │ ...   │ ... │ ...         │
│ 245 │ 01:45 │ 5:00│ 1-9 │ HOST  │ WIN │ Winner      │
│ 246 │ 01:50 │ 10:0│ 2,3 │ INT   │ L3  │ Interview   │
└──────────────────────────────────────────────────────┘

Legend:
  CAM: 1-9 (Camera numbers)
  AUDIO: THEME(Music) / VO(Voice Over) / HOST(Host Mic)
         TABLE(Table Mics) / INT(Interview) / SFX(Effects)
  GFX: OPN(Opening) / L3(Lower Third) / SC(Score)
       WIN(Winner Graphics) / STAT(Statistics)
  DUR: Duration or LIVE
```

**포커 토너먼트 특화 큐시트**:
```yaml
Pre-Production (T-2h):
  □ T-120: Crew call
  □ T-105: Equipment setup
  □ T-90: Camera positions
  □ T-75: RFID system test
  □ T-60: Lighting setup
  □ T-45: Graphics test
  □ T-30: Audio check
  □ T-15: Full rehearsal
  □ T-5: Final checks
  □ T-0: LIVE

Live Production Segments:
  Segment A: Tournament Start (14:00-16:00)
    - Opening sequence (0:30)
    - Player introductions (2:00)
    - Live play coverage (1:27:30)
    - First break bumper (0:30)

  Segment B: Mid Tournament (16:15-18:00)
    - Recap highlights (1:00)
    - Chip leader update (0:30)
    - Live play coverage (1:42:30)
    - Dinner break bumper (1:00)

  Segment C: Bubble Time (20:00-22:30)
    - Bubble situation setup (2:00)
    - Hand-for-hand coverage (30:00+)
    - ITM celebration (5:00)
    - Late-night play (2:03:00)

  Segment D: Final Table (00:00-02:00)
    - Final table intro (5:00)
    - Heads-up setup (10:00)
    - Winner celebration (15:00)
    - Closing (5:00)
```

**리얼타임 업데이트**:
```python
class CueSheet:
    def __init__(self):
        self.segments = []
        self.current_segment = None
        self.estimated_end = None

    def update_timing(self, actual_time):
        """
        실제 시간과 예상 시간 차이 계산
        """
        delay = actual_time - self.estimated_time

        if delay > 30:  # 30분 이상 지연
            self.adjust_all_subsequent_segments(delay)
            self.notify_team(f"Running {delay} min behind")
            self.activate_contingency_plan()

    def handle_bubble(self):
        """
        버블 타임은 예측 불가 - 유연한 대응
        """
        self.pause_scheduled_segments()
        self.activate_bubble_coverage()
        self.prepare_highlight_packages()  # 시간 조정용
```

**비상 시나리오**:
```
시나리오 1: 토너먼트가 예상보다 2시간 빨리 종료
→ 하이라이트 패키지 2개 추가 (각 30분)
→ 심층 인터뷰 세그먼트 확장 (15분 → 45분)
→ 다음 이벤트 프리뷰 (30분)

시나리오 2: 버블이 3시간 지속
→ 하이라이트 루프 방송
→ 플레이어 백스토리 패키지
→ 해설진 분석 시간 증가

시나리오 3: 기술적 이슈로 15분 공백
→ 사전 제작 콘텐츠 방송
→ 소셜 미디어 상호작용
→ 이전 이벤트 하이라이트
```

---

### [9] 스위칭 (Switching)

**정의**
여러 카메라 소스 중 방송에 내보낼 화면을 실시간으로 선택하고 전환하는 작업.

**스위칭 기법**:

**1. Cut (컷)**
```yaml
정의: 즉시 화면 전환
속도: 1 frame (1/60초)
용도:
  - 빠른 액션
  - 긴장감 조성
  - 리액션 포착

포커 적용:
  카메라1 (Wide) → [CUT] → 카메라2 (Player CU)
  "올인 선언!" → 즉시 컷 → 상대 반응
```

**2. Dissolve (디졸브)**
```yaml
정의: 점진적 화면 전환 (크로스 페이드)
속도: 15-30 frames (0.5-1초)
용도:
  - 부드러운 전환
  - 시간 경과 표현
  - 무드 전환

포커 적용:
  핸드 종료 → [DISSOLVE] → 다음 핸드
  세그먼트 전환
  하이라이트 패키지
```

**3. Wipe (와이프)**
```yaml
정의: 기하학적 패턴으로 화면 전환
속도: 30-60 frames (1-2초)
용도:
  - 스포티한 느낌
  - 세그먼트 구분
  - 시간/장소 변경

포커 적용:
  테이블1 → [WIPE] → 테이블2
  라이브 → [WIPE] → 하이라이트
```

**포커 특화 스위칭 패턴**:

**프리플랍 스위칭**:
```
1. Wide Shot (전체 테이블) - 2초
2. UTG Player (첫 액션) - 1초
3. Action follows clockwise
4. Raiser Close-up - 2초
5. Callers reaction - 1초 each
6. Back to Wide - 1초
```

**플랍 스위칭**:
```
1. Dealer dealing flop - 2초 (슬로우 모션 옵션)
2. Board Close-up - 3초
3. First to act - 1초
4. Around the table - 0.5초 each
5. Bettor Close-up - 2초
6. Caller/Folder reaction - 1초
```

**올인 스위칭 시퀀스**:
```
T+0:00 - Player A declares all-in
       → CUT to Player A (2 sec)
T+0:02 - Show stack going in
       → CUT to chip stack (1 sec)
T+0:03 - Opponent thinking
       → CUT to Player B (3-10 sec)
T+0:13 - Decision made
       → CUT to action (1 sec)
T+0:14 - Showdown
       → CUT to both hole cards (2 sec)
T+0:16 - Board run-out
       → CUT to board (2 sec per card)
T+0:22 - Winner celebration
       → CUT to winner (3 sec)
T+0:25 - Pot to winner
       → CUT to chips (2 sec)
```

**스위처 콜 스크립트**:
```
Director: "Ready 2 (Player A)"
Switcher: "2 ready"
Director: "Take 2"
Switcher: [Executes] "On 2"

Director: "Dissolve to 5 (Board)"
Switcher: "Dissolving to 5" [1 second]

Director: "Ready highlight package"
Switcher: "Highlight ready on playback A"
Director: "Roll highlight"
Switcher: "Rolling" [자동 재생]
```

**멀티스크린 (Split Screen)**:
```
버블 상황 4분할:
┌─────────┬─────────┐
│ Table 1 │ Table 2 │
│ 152명   │ 151명   │
├─────────┼─────────┤
│ Table 3 │ Leaderbd│
│ 150명   │ Chip cnt│
└─────────┴─────────┘

헤즈업 2분할:
┌──────────┬──────────┐
│          │          │
│ Player A │ Player B │
│          │          │
└──────────┴──────────┘
```

---

## 조직 및 역할 용어 각주

### [10] Executive Producer (EP)

**정의**
프로덕션 프로젝트의 최종 책임자. 예산, 인력, 클라이언트 관계, 최종 크리에이티브 결정권을 가진 리더십 역할.

**책임 범위**:
```yaml
Pre-Production (기획):
  ✓ 클라이언트 미팅 및 계약 협상
  ✓ 전체 예산 편성 및 승인
  ✓ 핵심 인력 섭외 (감독, PD, TD)
  ✓ 크리에이티브 방향 설정
  ✓ 위험 관리 계획

Production (실행):
  ✓ 주요 의사결정 (방송 중단, 일정 변경)
  ✓ 클라이언트 현장 응대
  ✓ 위기 상황 최종 판단
  ✓ 예산 초과 승인
  ✓ 품질 관리 (QC)

Post-Production (마무리):
  ✓ 최종 컷 승인
  ✓ 클라이언트 납품
  ✓ AAR (After Action Review) 주재
  ✓ 팀 성과 평가
  ✓ 다음 프로젝트 기획
```

**일반적인 하루 (WSOP 파이널 테이블)**:
```
08:00 - 도착, 전날 리뷰
08:30 - 클라이언트 모닝 콜
09:00 - 프로덕션 팀 브리핑
10:00 - 현장 최종 점검
11:00 - 스폰서 미팅
12:00 - 런치 (관계자 식사)
13:00 - 라이브 준비 감독
14:00 - 방송 시작 (Control room)
  ↓   - 주요 결정만 개입
  ↓   - 클라이언트 커뮤니케이션
  ↓   - 위기 상황 모니터링
02:00 - 방송 종료
02:30 - 핫 디브리핑
03:00 - 내일 준비사항 확인
03:30 - 퇴근

Phone calls: 20-30 throughout the day
```

**의사결정 예시**:

**상황 1: 예산 초과**
```
문제: "오디오 장비 고장, 교체 비용 $5,000 추가"
EP 판단:
  1. 필수 장비인가? → Yes
  2. 예산 여유는? → 10% 버퍼 내
  3. 결정: "승인, 즉시 주문"
  4. 액션: 클라이언트에게 투명하게 보고
```

**상황 2: 일정 변경**
```
문제: "토너먼트 5시간 지연, 크루 피로도 한계"
EP 판단:
  1. 계약 조건 확인 → 16시간 한계
  2. 크루 상태 점검 → 50% 교체 가능
  3. 클라이언트 협의 → 추가 비용 청구
  4. 결정: "백업 크루 투입, 방송 계속"
```

**상황 3: 품질 이슈**
```
문제: "RFID 시스템 불안정, 정확도 95%"
EP 판단:
  1. 방송 품질 기준: 99%+ 필요
  2. 옵션 검토:
     A. 백업 시스템 (30분 지연)
     B. 수동 입력 (인력 2명 추가)
     C. 홀카드 없이 방송 (품질 저하)
  3. 결정: "옵션 B, 수동 입력 모드"
  4. 클라이언트: "기술적 이슈 해결 중" 공지
```

**EP vs Line Producer 차이**:
```
Executive Producer (EP):
- 최종 결정권자
- 비즈니스 포커스
- 클라이언트 대면
- 전략적 사고
- 여러 프로젝트 동시 관리

Line Producer:
- 일상 운영 관리
- 실행 포커스
- 팀 관리
- 전술적 사고
- 단일 프로젝트 집중
```

**필요 역량**:
```
Technical Skills (30%):
- 방송 기술 전반 이해
- 포커 게임 규칙 숙지
- 프로덕션 워크플로우

Business Skills (40%):
- 예산 관리
- 계약 협상
- 위험 관리
- P&L (손익) 이해

Leadership Skills (30%):
- 팀 빌딩
- 위기 관리
- 의사소통
- 비전 제시
```

---

### [11] Floor Producer

**정의**
현장(Venue)에서 프로덕션의 모든 실무를 총괄하는 역할. EP의 전략을 실행하고, 실시간 운영을 책임지는 핵심 인력.

**상세 역할**:
```yaml
Pre-Show (T-6h ~ T-0):
  Setup Supervision:
    ✓ 장비 반입 감독
    ✓ 카메라 포지셔닝 확정
    ✓ 케이블 라우팅 검토
    ✓ 안전 규정 준수 확인

  Coordination:
    ✓ 베뉴 스탭과 커뮤니케이션
    ✓ Tournament Director와 일정 조율
    ✓ 크루 스케줄 관리
    ✓ 리허설 진행

  Problem Solving:
    ✓ 현장 이슈 즉시 해결
    ✓ 백업 플랜 준비
    ✓ 최종 체크리스트 확인

During Show (T-0 ~ End):
  Live Operations:
    ✓ 타임라인 관리
    ✓ 테이블 브레이크 조율
    ✓ 플레이어 인터뷰 조정
    ✓ 크루 로테이션 관리

  Communication Hub:
    ✓ Control Room ↔ Venue Floor
    ✓ TD와 실시간 협업
    ✓ 긴급 상황 보고
    ✓ 딜러/플로어맨과 조율

  Contingency:
    ✓ 위기 상황 1차 대응
    ✓ 백업 리소스 투입
    ✓ EP에게 에스컬레이션

Post-Show (End ~ +2h):
  Wrap-up:
    ✓ 장비 회수 감독
    ✓ 베뉴 복구 확인
    ✓ 데이터 백업 확인
    ✓ 다음 날 준비사항 체크
```

**전형적인 12시간 라이브 일정**:
```
08:00 - 현장 도착
        □ 베뉴 오픈 확인
        □ 크루 출석 체크
        □ 아침 브리핑

09:00 - 세팅 감독
        □ 테이블 배치
        □ 카메라 위치
        □ 조명 확인

11:00 - 리허설
        □ 카메라 워크 체크
        □ 오디오 레벨
        □ RFID 테스트

12:00 - 런치 브레이크
        □ 크루 식사
        □ 최종 조정

13:00 - 파이널 체크
        □ 모든 시스템 그린
        □ TD와 최종 확인
        □ EP 보고

14:00 - 라이브 시작
        [Monitoring Mode]
        ↓
        - 테이블 2 카메라 이슈 (14:35)
          → 백업 카메라 투입 (3분)
        - 플레이어 인터뷰 요청 (15:20)
          → 브레이크 타임에 조정
        - 의료 상황 발생 (17:05)
          → 의료팀 호출, 상황 정리
        - 테이블 브레이크 x3 (16:00, 18:30, 21:00)
          → TD와 플레이어 이동 조율
        ↓
02:00 - 라이브 종료

02:15 - 즉시 디브리핑
        □ 이슈 리뷰
        □ 개선점 노트

03:00 - 정리 감독
        □ 장비 회수
        □ 베뉴 클린

04:00 - 퇴근
```

**커뮤니케이션 허브 역할**:
```
[Control Room] ←→ [Floor Producer] ←→ [Venue Floor]
       ↑                  ↓                    ↓
   Director TD        EP/Client      Tournament Staff
       ↑                  ↓                    ↓
    Switcher          Security            Dealers
       ↑                  ↓                    ↓
    Graphics          Medical          Floor Managers
```

**무전 채널 관리**:
```yaml
Channel 1 (Hot Com):
  - Control Room 전체
  - Floor Producer
  - Camera Operators
  용도: 즉각적인 방송 지시

Channel 2 (Production):
  - Floor Producer
  - Stage Managers
  - Runner Team
  용도: 현장 조율

Channel 3 (Technical):
  - TD
  - Audio Engineer
  - IT Support
  용도: 기술 이슈 해결

Channel 4 (Venue):
  - Tournament Director
  - Security
  - Venue Manager
  용도: 시설 관련
```

**문제 해결 예시**:

**케이스 1: 테이블 브레이크 지연**
```
상황: 9-handed → 8-handed 전환
예상: 5분
실제: 12분 (딜러 대기, 칩 카운트 지연)

Floor Producer 액션:
1. Tournament Director에게 상황 파악 (1분)
2. Control Room에 지연 통보 (즉시)
3. 필러 콘텐츠 요청 (하이라이트 3분)
4. 플레이어 이동 가속화 (직접 독려)
5. 재개 시점 Control Room에 알림

결과: 방송 끊김 없이 전환 완료
```

**케이스 2: 크루 교체**
```
상황: 카메라맨 급작스런 체력 저하 (6시간차)
예상: 12시간 근무 가능
실제: 피로, 집중력 저하

Floor Producer 액션:
1. 백업 크루 호출 (대기조)
2. 15분 브레이크 타임에 교체 조율
3. 브리핑 (이전 크루가 백업 크루에게)
4. 원활한 인수인계 확인
5. 피로 크루원은 휴식 공간으로

결과: 방송 품질 유지
```

---

## 실무 프로세스 각주

### [12] 핸드 포 핸드 (Hand-for-Hand)

**정의**
버블 상황(ITM 직전)에서 모든 테이블이 동시에 한 핸드씩 진행하는 특별 프로토콜. 공정성 확보와 스톨링(Stalling) 방지가 목적.

**프로토콜 상세**:
```yaml
준비 단계 (Bubble -2명):
  □ Tournament Director 공지
  □ 모든 테이블에 알림
  □ 방송팀 준비 완료
  □ 카메라 모든 테이블 커버

핸드 포 핸드 시작 (Bubble -1명):
  1. TD가 "Hand-for-hand play begins" 선언
  2. 모든 딜러 대기 상태
  3. 첫 테이블 핸드 완료까지 다른 테이블 홀드
  4. 마지막 테이블 완료 확인
  5. TD가 "Deal next hand" 신호
  6. 모든 테이블 동시에 다음 핸드 시작

반복:
  → 누군가 탈락할 때까지 계속
  → 평균 5-15핸드 지속

종료:
  - 버블 보이 결정
  - Hand-for-hand 종료 선언
  - 일반 플레이 재개
```

**실제 타임라인 예시** (2023 WSOP Main Event):
```
20:47 - 151명 생존 (150명 ITM)
20:50 - Hand-for-hand 공지
20:52 - 첫 핸드 시작

핸드별 진행:
Hand 1: 20:52-20:54 (2분)
  - Table 1: Fold
  - Table 2: Fold
  - Table 3: Small pot, no elimination

Hand 2: 20:55-20:58 (3분)
  - Table 1: All-in situation! (Player A survives)
  - Table 2: Fold
  - Table 3: Fold

Hand 3: 20:59-21:01 (2분)
  - All tables: Fold

Hand 4: 21:02-21:08 (6분)
  - Table 2: ELIMINATION!
  - Player B eliminated in 151st place
  - Bubble burst!

21:08 - Hand-for-hand 종료
21:09 - ITM 확정, 일반 플레이 재개
21:10 - 축하 세레모니 (1분)
```

**방송 프로덕션 전략**:

**카메라 배치**:
```
상황: 3개 테이블 남음 (A, B, C)
플레이어 수: Table A (10명), Table B (11명), Table C (10명)

Camera Allocation:
Table A:
  - Cam 1-2: Wide + Action
  - Cam 3: Short stack focus (Player #7, 8BB)

Table B:
  - Cam 4-5: Wide + Action
  - Cam 6: Short stack focus (Player #3, 5BB)

Table C:
  - Cam 7-8: Wide + Action
  - Cam 9: Short stack focus (Player #9, 12BB)

Control Room:
  - 9-way split screen ready
  - Focus on shortest stack table
  - Quick switch on all-in
```

**화면 구성 (9분할)**:
```
┌──────┬──────┬──────┐
│ T-A  │ T-B  │ T-C  │
│ Wide │ Wide │ Wide │
├──────┼──────┼──────┤
│ T-A  │ T-B  │ T-C  │
│Short │Short │Short │
├──────┼──────┼──────┤
│Chip  │Timer │Leade │
│Count │      │Board │
└──────┴──────┴──────┘
```

**해설 스크립트 가이드**:
```javascript
const handForHandCommentary = {

  setup: `
    "버블 타임입니다! 단 한 명만 더 탈락하면
     나머지 150명 모두 최소 $15,000를 보장받습니다.
     이제부터 Hand-for-hand 플레이가 시작됩니다."
  `,

  eachHand: (handNumber) => `
    "핸드 ${handNumber}, 모든 테이블 동시에 시작합니다.
     긴장감이 최고조에 달했네요!
     숏스택들의 생존 게임입니다!"
  `,

  allIn: (table, player, stack) => `
    "테이블 ${table}에서 올인!
     ${player}가 남은 ${stack}칩을 모두 겁니다!
     이게 버블이 터지는 순간일까요?"
  `,

  survival: (player) => `
    "${player} 생존! 아직 버블은 계속됩니다."
  `,

  elimination: (player, prize) => `
    "버블 터졌습니다! ${player}가 151위로 탈락!
     안타깝게도 $${prize}를 놓쳤습니다.
     하지만 나머지 150명은 모두 축하합니다!"
  `,

  celebration: `
    "In The Money! 전원 상금 확정!
     이제 우승을 향한 진짜 싸움이 시작됩니다!"
  `
};
```

**딜러 지시 사항**:
```
딜러 프로토콜:
1. TD의 "Deal" 신호까지 대기
2. 신호 받으면 정상 진행
3. 핸드 종료 후 즉시 손들어 신호
4. 다음 신호까지 대기 (딜 금지)
5. 반복

주의사항:
- 서두르지 말 것
- 일관된 속도 유지
- TD 시그널 항상 주시
```

**스톨링 대응**:
```yaml
Stalling (시간 끌기):
정의: 의도적으로 시간을 끌어 다른 테이블에서
     누군가 탈락하기를 바라는 행위

감지:
  - 정상: 30-60초 사고
  - 의심: 90초+ 지속적 지연
  - 확실: 2분+ 또는 패턴화

대응:
  1. 딜러가 30초 카운트 시작
  2. Floor Manager 호출
  3. 경고 1회
  4. 반복 시 클락 콜
  5. 10초 카운트다운
  6. 타임 아웃 시 핸드 데드
  7. 패널티 (1 round sit-out)
```

**통계**:
```python
# 역대 WSOP Hand-for-Hand 데이터
bubble_stats = {
    "average_duration": "28 minutes",
    "shortest": "3 minutes (1 hand)",
    "longest": "2 hours 17 minutes (87 hands)",
    "average_hands": 12,

    "elimination_by_position": {
        "UTG": "18%",
        "MP": "22%",
        "CO": "15%",
        "BTN": "8%",
        "SB": "21%",
        "BB": "16%"
    },

    "elimination_hand": {
        "all_in_preflop": "45%",
        "all_in_flop": "32%",
        "all_in_turn": "15%",
        "all_in_river": "8%"
    }
}
```

---

이 각주 문서는 TRANSITION_GUIDE.md를 읽는 모든 신입 프로듀서가 전문 용어를 완벽히 이해하고, 실무에 바로 적용할 수 있도록 설계되었습니다.

**각주 활용 팁**:
1. 처음 읽을 때: 순서대로 전체 읽기
2. 실무 중: 필요한 용어만 빠르게 검색
3. 복습 시: 각주만 모아서 플래시카드로 활용

**다음 문서**: `FOOTNOTES_POKER_FUNDAMENTALS.md`로 계속됩니다.

---

*최종 업데이트: 2024-10-15*
*작성자: GG Production Training Team*
*버전: 1.0*