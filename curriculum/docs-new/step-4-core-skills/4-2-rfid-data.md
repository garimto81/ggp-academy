# 4.2 RFID 데이터 관리

**학습 목표**: 실시간 RFID 데이터 수집과 정합성 검증 방법을 익힌다
**소요 시간**: 25분

---

## 📡 RFID 시스템 개요

### RFID란?
**RFID (Radio-Frequency Identification)**는 무선 주파수를 이용하여 칩에 내장된 태그 정보를 읽는 기술입니다.

**포커 토너먼트에서의 활용**:
- 각 플레이어의 카드 자동 인식
- 실시간 팟(Pot) 사이즈 계산
- 방송 그래픽 자동 업데이트

### 시스템 구성
```
포커 테이블 RFID 시스템:
├─ RFID 리더: 테이블 하단 설치 (카드 인식)
├─ RFID 칩: 각 카드에 내장 (52장 + 조커)
├─ 안테나: 테이블 각 플레이어 위치 (8-9개)
└─ 데이터 서버: 수집 데이터 처리 및 전송
```

---

## 🔍 데이터 수집 프로세스

### 1단계: 카드 배분 감지
플레이어에게 카드가 배분되는 순간 RFID 리더가 감지합니다.

**데이터 형식**:
```json
{
  "timestamp": "2025-01-15T14:23:45Z",
  "hand_id": "H-2025-0115-001",
  "seat_1": {
    "card_1": "As",  // Ace of Spades
    "card_2": "Kh"   // King of Hearts
  },
  "seat_2": {
    "card_1": "Qd",
    "card_2": "Qc"
  },
  // ... seat_3 ~ seat_8
}
```

### 2단계: 커뮤니티 카드 인식
Flop, Turn, River 단계에서 오픈되는 카드를 실시간으로 인식합니다.

**데이터 형식**:
```json
{
  "hand_id": "H-2025-0115-001",
  "flop": ["Jh", "9s", "4c"],
  "turn": "2d",
  "river": "Ah"
}
```

### 3단계: 액션 데이터 연동
RFID 데이터는 TD(Tournament Director) 시스템과 연동됩니다.

**통합 데이터**:
```json
{
  "hand_id": "H-2025-0115-001",
  "pot_size": 12500,
  "players_in_hand": 3,
  "actions": [
    {"seat": 1, "action": "raise", "amount": 2000},
    {"seat": 2, "action": "call", "amount": 2000},
    {"seat": 5, "action": "fold"}
  ]
}
```

---

## ✅ 데이터 정합성 검증

### 필수 검증 항목 5가지

#### 1. 카드 중복 검증 (Duplicate Card Check)
**목적**: 동일한 카드가 2번 이상 인식되었는지 확인

**검증 방법**:
```python
def check_duplicate_cards(hand_data):
    """카드 중복 검증"""
    all_cards = []

    # 플레이어 홀 카드 수집
    for seat in hand_data['seats']:
        all_cards.extend([seat['card_1'], seat['card_2']])

    # 커뮤니티 카드 수집
    all_cards.extend(hand_data['flop'])
    all_cards.append(hand_data['turn'])
    all_cards.append(hand_data['river'])

    # 중복 검사
    if len(all_cards) != len(set(all_cards)):
        return "❌ ERROR: 중복 카드 발견!"

    return "✅ OK"
```

**실전 대응**:
```
중복 발견 시:
1. TD에게 즉시 알림
2. 해당 핸드 데이터 방송 사용 중지
3. 수동 입력으로 전환
4. RFID 리더 재부팅
```

#### 2. 카드 누락 검증 (Missing Card Check)
**목적**: 모든 카드가 제대로 인식되었는지 확인

**검증 방법**:
```python
def check_missing_cards(hand_data):
    """카드 누락 검증"""
    expected_cards = 0

    # 플레이어 수 * 2 (홀 카드)
    expected_cards += len(hand_data['seats']) * 2

    # 커뮤니티 카드 5장
    expected_cards += 5

    actual_cards = count_detected_cards(hand_data)

    if actual_cards < expected_cards:
        return f"❌ ERROR: {expected_cards - actual_cards}장 누락"

    return "✅ OK"
```

**실전 대응**:
```
누락 발견 시:
1. 해당 플레이어 카드 수동 입력
2. 그래픽에 "?" 표시 대신 수동 데이터 사용
3. 인식률 저하 원인 파악 (안테나 위치, 카드 각도)
```

#### 3. 팟 사이즈 정합성 (Pot Size Validation)
**목적**: RFID 데이터 팟 사이즈 vs TD 시스템 팟 사이즈 일치 여부

**검증 방법**:
```python
def validate_pot_size(rfid_pot, td_pot, tolerance=100):
    """팟 사이즈 정합성 검증 (오차 범위 ±100 칩)"""
    diff = abs(rfid_pot - td_pot)

    if diff > tolerance:
        return f"❌ ERROR: 차이 {diff} 칩 (RFID: {rfid_pot}, TD: {td_pot})"

    return "✅ OK"
```

**실전 대응**:
```
불일치 발견 시:
1. TD 시스템 데이터 우선 사용 (더 정확함)
2. RFID 데이터는 참고용으로만 활용
3. 그래픽에 TD 시스템 기반 팟 사이즈 표시
```

#### 4. 타임스탬프 동기화 (Timestamp Sync)
**목적**: RFID 데이터 수집 시간과 실제 게임 진행 시간 일치 확인

**검증 방법**:
```python
def check_timestamp_sync(rfid_time, actual_time, max_delay=2.0):
    """타임스탬프 동기화 검증 (최대 지연 2초)"""
    delay = abs(rfid_time - actual_time)

    if delay > max_delay:
        return f"❌ ERROR: {delay}초 지연"

    return "✅ OK"
```

**실전 대응**:
```
지연 발생 시:
1. 네트워크 상태 점검
2. RFID 리더 응답 속도 확인
3. 심각한 경우 RFID 시스템 재부팅
```

#### 5. 플레이어 수 검증 (Player Count Check)
**목적**: 핸드 참여 플레이어 수가 맞는지 확인

**검증 방법**:
```python
def check_player_count(hand_data, expected_count):
    """플레이어 수 검증"""
    actual_count = len([s for s in hand_data['seats'] if s['in_hand']])

    if actual_count != expected_count:
        return f"❌ ERROR: 예상 {expected_count}명, 실제 {actual_count}명"

    return "✅ OK"
```

---

## 🛠️ 실시간 모니터링

### 대시보드 화면 구성
```
+-----------------------------------+
| RFID 데이터 모니터링 대시보드     |
+-----------------------------------+
| Hand ID: H-2025-0115-042          |
| Status: ✅ 정상                   |
| Players: 7 / 8                    |
| Pot Size: $12,500 ✅ (TD 일치)   |
| Last Update: 2초 전               |
+-----------------------------------+
| 경고 알림:                         |
| ⚠️ Seat 3 카드 1장 누락           |
| → 수동 입력 완료                   |
+-----------------------------------+
```

### 실시간 체크 항목
```
매 핸드마다:
├─ 카드 중복 체크 (자동)
├─ 카드 누락 체크 (자동)
├─ 팟 사이즈 정합성 (자동)
└─ 타임스탬프 지연 (자동)

매 레벨마다:
├─ RFID 리더 응답 속도
├─ 안테나 인식률 통계
└─ 에러 발생 빈도
```

---

## 🚨 트러블슈팅

### 문제 1: 카드 인식 안됨
**증상**: 특정 플레이어 카드가 계속 "???"로 표시

**원인**:
- RFID 칩 불량
- 안테나 위치 불량
- 플레이어가 카드를 테이블 밖으로 들어올림

**해결**:
```
1단계: 해당 플레이어에게 카드를 테이블 위에 평평하게 놓도록 요청
2단계: 여전히 안되면 카드 교체 (딜러에게 요청)
3단계: 수동 입력으로 전환 (그래픽 팀에 알림)
```

### 문제 2: 팟 사이즈 불일치
**증상**: RFID 팟 사이즈 vs TD 시스템 팟 사이즈 차이 발생

**원인**:
- RFID 시스템이 Side Pot을 잘못 계산
- TD가 수동으로 조정했으나 RFID는 모름

**해결**:
```
항상 TD 시스템 데이터 우선 사용
방송 그래픽에 TD 기반 팟 사이즈 표시
```

### 문제 3: 시스템 전체 다운
**증상**: RFID 데이터가 아예 수신 안됨

**원인**:
- 네트워크 문제
- RFID 리더 전원 문제
- 서버 다운

**해결**:
```
긴급 프로토콜:
1. TD 시스템 기반 수동 입력 모드 전환
2. 기술팀에 긴급 알림
3. 백업 RFID 시스템 가동 (있는 경우)
4. 없으면 TD 데이터로만 방송 진행
```

---

## 📊 체크리스트

### 촬영 전 점검
- [ ] RFID 리더 전원 ON, 네트워크 연결 확인
- [ ] 모든 안테나(8-9개) 정상 작동 확인
- [ ] 테스트 핸드 실행하여 데이터 수신 확인
- [ ] TD 시스템과 연동 상태 확인

### 촬영 중 점검
- [ ] 매 핸드 카드 인식률 모니터링
- [ ] 팟 사이즈 정합성 실시간 검증
- [ ] 에러 발생 시 즉시 대응

### 촬영 후 점검
- [ ] 에러 로그 분석 및 보고서 작성
- [ ] RFID 시스템 종료 및 전원 OFF
- [ ] 다음 촬영을 위한 개선사항 기록

---

## 🎓 핵심 요약

1. **RFID 시스템**은 카드를 자동으로 인식하여 방송 그래픽에 실시간 표시
2. **5가지 필수 검증**: 카드 중복, 누락, 팟 사이즈, 타임스탬프, 플레이어 수
3. **정합성 검증**은 매 핸드마다 자동으로 실행
4. **TD 시스템 데이터가 항상 우선** (RFID는 보조 수단)
5. **트러블슈팅**: 문제 발생 시 수동 입력 모드로 즉시 전환

---

**다음 학습**: [4.3 그래픽 시스템](./4-3-graphics-system.md)
