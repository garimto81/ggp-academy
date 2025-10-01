# 📚 위기관리 가이드 상세 각주 문서
## CRISIS_MANAGEMENT_GUIDE.md 완벽 해설서

---

## 📖 목차

1. [위기 레벨 시스템 상세](#위기-레벨-시스템-상세)
2. [기술적 위기 각주](#기술적-위기-각주)
3. [인적 위기 각주](#인적-위기-각주)
4. [커뮤니케이션 프로토콜](#커뮤니케이션-프로토콜)
5. [AAR 프로세스](#aar-프로세스)

---

## 위기 레벨 시스템 상세

### [1] UPS (Uninterruptible Power Supply)

**정의**
무정전 전원 공급 장치. 정전 시 배터리로 전력을 공급하여 시스템이 안전하게 종료되거나 백업 전원이 가동될 때까지 시간을 벌어주는 장비.

**기술 사양**
```yaml
포커 프로덕션 표준 UPS:
  용량: 3000VA / 2700W 이상
  런타임:
    - Full load: 5-10분
    - Half load: 15-20분
    - Quarter load: 30-40분

  보호 대상 (우선순위):
    Priority 1 (필수):
      ✓ RFID 서버
      ✓ 메인 스위처
      ✓ 네트워크 코어 스위치
      ✓ 스트리밍 인코더

    Priority 2 (중요):
      ✓ 그래픽 워크스테이션
      ✓ 오디오 믹서
      ✓ 통신 시스템
      ✓ 카메라 컨트롤러

    Priority 3 (선택):
      ✓ 모니터
      ✓ 조명 시스템
      ✓ 에어컨

  제외 (별도 전원):
      □ 카메라 (배터리 내장)
      □ 노트북 (자체 배터리)
      □ 모바일 장비
```

**배치 전략**
```python
class UPSDeployment:
    def __init__(self, venue):
        self.venue = venue
        self.ups_units = []

    def calculate_load(self):
        """
        전력 부하 계산
        """
        equipment_load = {
            "RFID_server": 300,      # Watts
            "Switcher": 150,
            "Network_switch": 100,
            "Encoder": 200,
            "Graphics_PC": 400,
            "Audio_mixer": 80,
            "Comm_system": 50,
            "Camera_control": 100
        }

        total_load = sum(equipment_load.values())
        # Total: 1380W

        # 20% 안전 마진
        required_capacity = total_load * 1.2
        # Required: 1656W

        # UPS 선택 (2700W)
        return "3000VA UPS sufficient"

    def runtime_estimate(self, load_percentage):
        """
        런타임 추정
        """
        if load_percentage <= 25:
            return "30-40 minutes"
        elif load_percentage <= 50:
            return "15-20 minutes"
        elif load_percentage <= 75:
            return "8-12 minutes"
        else:  # > 75%
            return "5-7 minutes"
```

**정전 대응 프로토콜**
```
T+0 (정전 발생):
  [Automatic]
  - UPS 자동 전환 (< 10ms)
  - 배터리 모드 가동
  - 알람 사운드 시작

T+5초 (인지):
  [Manual Action]
  - TD가 "Power failure" 선언
  - 백업 전원 팀 호출
  - 상황 평가 시작

T+30초 (평가):
  [Decision Point]
  - 복구 예상 시간 확인
  - 런타임 계산 (5-10분 남음)
  - 방송 계속 vs 중단 결정

T+1분 (액션):
  옵션 A: 빠른 복구 예상 (< 5분)
    → 방송 계속
    → 시청자에게 간단한 기술적 어려움 안내
    → 백업 전원 준비

  옵션 B: 장시간 정전 예상
    → 모바일 핫스팟 전환
    → 최소 장비로 축소 운영
    → 720p 품질 저하 양해 요청

T+3분 (백업):
  [Generator Start]
  - 발전기 가동 (30-60초)
  - 안정화 대기 (30초)
  - 부하 전환 (순차적)

T+5분 (정상화):
  - UPS에서 발전기 전원으로 전환
  - 모든 시스템 정상 확인
  - 방송 품질 복구
  - 사후 보고 준비
```

**UPS 유지보수**
```yaml
일일 체크:
  □ 배터리 상태 LED 확인
  □ 팬 소음 정상 여부
  □ 부하 표시 모니터링

주간 체크:
  □ 자가 테스트 실행
  □ 배터리 런타임 테스트
  □ 이벤트 로그 리뷰

월간 체크:
  □ 배터리 부하 테스트
  □ 전압 측정
  □ 접점 청소

연간 체크:
  □ 배터리 교체 (3-5년 주기)
  □ 펌웨어 업데이트
  □ 전문가 점검
```

**비상 시나리오**
```
Case 1: UPS 고장 중 정전
  상황: 최악의 시나리오
  대응:
    1. 즉시 방송 중단 불가피
    2. 모바일 장비로 최소 신호 유지
    3. 노트북 + 4G로 소셜 미디어 업데이트
    4. 관객에게 상황 설명
    5. 복구 시간 공지

Case 2: UPS 배터리 방전
  상황: 장시간 정전
  대응:
    1. 발전기 즉시 가동
    2. 크리티컬 장비만 전원 공급
    3. 나머지는 순차 재가동
    4. 시스템 안정화 확인
    5. 정상 운영 재개
```

---

### [2] 4G 백업 (4G Backup / Cellular Backup)

**정의**
유선 인터넷이 단절될 경우를 대비한 모바일 네트워크 기반 백업 연결. LTE/5G 셀룰러 네트워크를 활용한 이중화 전략.

**기술 구성**
```yaml
하드웨어:
  Primary Device:
    - 4G/5G 라우터
    - 모델: Cradlepoint IBR900 또는 동급
    - SIM: 데이터 무제한 플랜
    - 안테나: 외부 지향성 안테나 (신호 증폭)

  Secondary Device:
    - USB 4G 모뎀 (백업의 백업)
    - 핫스팟 가능 스마트폰 2대
    - Bonding 장치 (여러 연결 통합)

네트워크 구성:
  Failover Setup:
    Primary: 유선 인터넷 (100Mbps+)
      ↓ (단절 감지 < 5초)
    Secondary: 4G/5G (30-50Mbps)
      ↓ (추가 단절 시)
    Tertiary: 핫스팟 (5-15Mbps)
```

**대역폭 관리**
```python
class BandwidthManager:
    def __init__(self):
        self.primary_connection = "Fiber (100Mbps)"
        self.backup_connection = "4G (40Mbps)"
        self.emergency_connection = "Hotspot (10Mbps)"

    def failover_quality_adjust(self, available_bandwidth):
        """
        사용 가능한 대역폭에 따라 스트림 품질 조정
        """
        if available_bandwidth >= 80:
            return {
                "resolution": "1080p60",
                "bitrate": "8Mbps",
                "audio": "320kbps",
                "total": "~9Mbps"
            }
        elif available_bandwidth >= 30:
            # 4G 백업 모드
            return {
                "resolution": "720p30",
                "bitrate": "4Mbps",
                "audio": "128kbps",
                "total": "~5Mbps",
                "warning": "Quality reduced due to backup connection"
            }
        elif available_bandwidth >= 10:
            # 핫스팟 긴급 모드
            return {
                "resolution": "480p",
                "bitrate": "1.5Mbps",
                "audio": "96kbps",
                "total": "~2Mbps",
                "warning": "Emergency mode - minimal quality"
            }
        else:
            # 방송 불가
            return {
                "status": "Stream suspended",
                "action": "Show holding screen"
            }

    def bonding_aggregation(self):
        """
        여러 연결을 묶어 대역폭 증대
        """
        connections = {
            "4G_router": 40,
            "hotspot_1": 15,
            "hotspot_2": 12,
            "USB_modem": 8
        }

        total_bandwidth = sum(connections.values())
        # Total: 75Mbps (bonded)

        return {
            "aggregated_bandwidth": total_bandwidth,
            "stream_quality": "720p60 possible",
            "stability": "More resilient than single connection"
        }
```

**자동 페일오버 설정**
```yaml
Router Configuration:
  Primary WAN:
    Interface: eth0 (fiber)
    Priority: 1
    Health Check:
      - ping 8.8.8.8 every 5s
      - 3 consecutive failures = DOWN

  Backup WAN:
    Interface: usb0 (4G modem)
    Priority: 2
    Auto-activation: ON
    Failback:
      - Primary recovers
      - Wait 60s (stability)
      - Switch back

  Monitoring:
    SNMPtraps: Enabled
    Email alerts: production@ggproduction.com
    SMS alerts: +82-10-CRISIS-03
    Dashboard: http://backup.internal/status
```

**실전 시나리오**
```
시나리오: 이벤트 중 인터넷 단절

T+0:00 - 유선 인터넷 단절
  [Automatic]
  - Health check fails (3x ping timeout)
  - Router initiates failover
  - 4G modem activates

T+0:05 - 4G 연결 확립
  [Automatic]
  - 스트림 버퍼링 최소화
  - 비트레이트 자동 조정
  - 720p로 품질 저하
  - OBS: "Connection restored" 로그

T+0:10 - 팀 통보
  [Manual]
  - IT팀에게 상황 알림
  - TD에게 품질 저하 공지
  - 해설진에게 간단히 설명 요청

T+0:15 - 시청자 공지
  [On-Air]
  해설: "일시적인 기술적 이슈로 화질이 조정되었습니다.
        곧 정상화하겠습니다."

T+10:00 - 유선 복구
  [Automatic]
  - Primary connection restored
  - 60초 안정화 대기
  - 1080p로 복구
  - 정상 운영 재개

사후 처리:
  - 단절 원인 분석
  - ISP에 클레임
  - SLA 위반 여부 확인
  - 보고서 작성
```

**비용 구조**
```
초기 투자:
  4G 라우터: $800
  외부 안테나: $200
  Bonding 장치: $1,500 (선택)
  설치비: $500
  ────────────────
  Total: $3,000

월간 비용:
  데이터 무제한: $150/month
  예비 핫스팟: $50/month
  ────────────────
  Total: $200/month

ROI:
  단 1회 방송 중단 방지 = $50,000+ 손실 방지
  → 6개월 만에 투자 회수
```

---

### [3] 백업 시스템 (Backup System)

**정의**
주 시스템 장애 시 즉시 전환 가능한 대체 시스템. 방송 연속성 보장을 위한 이중화 전략.

**이중화 레벨**
```yaml
Level 1: Hot Standby (즉시 전환)
  구성:
    - 메인 시스템과 동일한 백업
    - 실시간 동기화
    - 자동 페일오버
  전환 시간: < 5초
  비용: 매우 높음 (2배)
  적용: 크리티컬 시스템 (RFID, 스위처)

Level 2: Warm Standby (빠른 전환)
  구성:
    - 백업 장비 대기 상태
    - 수동 전환
    - 최소 설정 필요
  전환 시간: 1-5분
  비용: 중간
  적용: 그래픽, 인코더

Level 3: Cold Standby (지연 전환)
  구성:
    - 예비 장비 보관
    - 설치 및 설정 필요
    - 수동 프로세스
  전환 시간: 10-30분
  비용: 낮음
  적용: 비크리티컬 장비

Level 4: No Backup
  구성:
    - 백업 없음
    - 현장 해결 또는 중단
  전환 시간: 불가능
  비용: 없음
  적용: 비필수 장비
```

**크리티컬 시스템 백업**
```python
class BackupStrategy:
    def __init__(self):
        self.systems = {}

    def define_backup_for_rfid(self):
        """
        RFID 시스템 백업 전략
        """
        return {
            "primary": {
                "server": "RFID-MAIN-01",
                "readers": 9,
                "software": "v3.2.1",
                "status": "Active"
            },
            "backup": {
                "server": "RFID-BACKUP-01",
                "sync": "Real-time replication",
                "failover": "Automatic (5s)",
                "status": "Hot Standby"
            },
            "fallback": {
                "method": "Manual input",
                "team": "Graphics team (2 people)",
                "speed": "Slower but functional",
                "accuracy": "99%+"
            }
        }

    def define_backup_for_switcher(self):
        """
        스위처 백업 전략
        """
        return {
            "primary": {
                "model": "BlackMagic ATEM Constellation 8K",
                "inputs": 40,
                "outputs": 24,
                "status": "Active"
            },
            "backup": {
                "model": "ATEM Production Studio 4K",
                "inputs": 20,
                "outputs": 8,
                "limitation": "Reduced capacity",
                "failover": "Manual (2-3 min)"
            },
            "emergency": {
                "method": "Laptop + OBS",
                "inputs": 4 (via capture cards),
                "quality": "Basic switching only",
                "time": "5-10 min setup"
            }
        }

    def backup_priority_matrix(self):
        """
        백업 우선순위
        """
        return {
            "Tier 1 (Mission Critical)": [
                "RFID System",
                "Main Switcher",
                "Streaming Encoder",
                "Network Core"
            ],
            "Tier 2 (Important)": [
                "Graphics Workstation",
                "Audio Mixer",
                "Camera Control",
                "Comms System"
            ],
            "Tier 3 (Nice to Have)": [
                "Monitors",
                "Lighting",
                "Secondary Graphics"
            ],
            "Tier 4 (Non-Essential)": [
                "Audience Displays",
                "Decorative Lighting",
                "Secondary Cameras"
            ]
        }
```

**백업 전환 SOP**
```
Standard Operating Procedure: System Failover

1. 장애 감지 (Detection)
   □ 알람 확인
   □ 증상 식별
   □ 영향 범위 파악
   Time: 0-30초

2. 에스컬레이션 (Escalation)
   □ TD에게 즉시 보고
   □ 백업팀 대기 지시
   □ EP에게 상황 알림 (Tier 1 only)
   Time: 30초-1분

3. 백업 활성화 (Activation)
   A. Hot Standby (자동):
      - 시스템이 자동 전환
      - 확인만 수행
      - 방송 거의 무중단

   B. Warm Standby (수동):
      Step 1: 백업 시스템 파워 온
      Step 2: 입력 소스 전환
      Step 3: 설정 로드
      Step 4: 신호 확인
      Step 5: 라이브 전환
      Time: 1-5분

   C. Cold Standby (설치):
      Step 1: 백업 장비 반출
      Step 2: 물리적 설치
      Step 3: 케이블 연결
      Step 4: 전원 및 부팅
      Step 5: 설정 입력
      Step 6: 테스트
      Step 7: 라이브 전환
      Time: 10-30분

4. 검증 (Verification)
   □ 신호 품질 확인
   □ 오디오 싱크
   □ 모든 소스 체크
   □ 백업 시스템 안정성
   Time: 1-2분

5. 정상화 (Normalization)
   □ 원인 분석 시작
   □ 메인 시스템 수리
   □ 적절한 타이밍에 복귀
   □ AAR 스케줄
```

**백업 테스트 일정**
```yaml
일일 테스트:
  - Hot Standby 상태 확인
  - 동기화 로그 리뷰
  - 알람 시스템 점검

주간 테스트 (매주 화요일 09:00):
  - 자동 페일오버 테스트
  - 백업 시스템 기동
  - 10분간 백업으로 운영
  - 메인으로 복귀
  Duration: 30분

월간 테스트 (매월 첫째 토요일):
  - 전체 백업 시나리오 훈련
  - Warm Standby 전환
  - Cold Standby 설치 연습
  - 팀 전체 참여
  Duration: 2시간

연간 훈련 (연 2회):
  - 복합 위기 시뮬레이션
  - 메인 + 백업 동시 장애
  - 크리에이티브 솔루션 테스트
  - 외부 평가자 참여
  Duration: 4시간
```

---

## 기술적 위기 각주

### [4] SPF (Single Point of Failure)

**정의**
시스템에서 하나의 구성 요소가 고장 나면 전체 시스템이 작동하지 않게 되는 취약점.

**SPOF 식별**
```python
def identify_spof(production_system):
    """
    단일 장애점 분석
    """
    spof_candidates = {
        "Network": {
            "Core Switch": {
                "risk": "CRITICAL",
                "impact": "전체 네트워크 중단",
                "mitigation": "이중화 스위치 + VRRP",
                "cost": "$5,000"
            },
            "Internet Connection": {
                "risk": "HIGH",
                "impact": "스트림 중단",
                "mitigation": "4G 백업 + Bonding",
                "cost": "$3,000"
            }
        },

        "Power": {
            "Main Breaker": {
                "risk": "CRITICAL",
                "impact": "완전 정전",
                "mitigation": "UPS + Generator",
                "cost": "$10,000"
            },
            "PDU": {
                "risk": "HIGH",
                "impact": "랙 전체 다운",
                "mitigation": "이중 PDU + 분산",
                "cost": "$2,000"
            }
        },

        "Critical Systems": {
            "RFID Server": {
                "risk": "HIGH",
                "impact": "홀카드 노출 불가",
                "mitigation": "Hot Standby + Manual fallback",
                "cost": "$15,000"
            },
            "Main Switcher": {
                "risk": "HIGH",
                "impact": "방송 중단",
                "mitigation": "Backup switcher + OBS fallback",
                "cost": "$20,000"
            }
        },

        "Personnel": {
            "Lead Producer": {
                "risk": "MEDIUM",
                "impact": "의사결정 지연",
                "mitigation": "Deputy + Cross-training",
                "cost": "$0 (training)"
            },
            "RFID Operator": {
                "risk": "MEDIUM",
                "impact": "데이터 입력 지연",
                "mitigation": "Multi-skilled team",
                "cost": "$0 (training)"
            }
        }
    }

    return spof_candidates
```

**SPOF 제거 전략**
```yaml
전략 1: Redundancy (이중화)
  방법: 동일한 구성 요소 2개 이상 배치
  예시:
    - 스위치 2대 (Active-Standby)
    - 서버 2대 (Load Balancing)
    - 전원 2개 (Primary + UPS)
  장점: 즉시 전환
  단점: 비용 2배

전략 2: Diversity (다양화)
  방법: 다른 기술/벤더로 백업 구성
  예시:
    - 유선 + 무선 인터넷
    - 전통 스위처 + 소프트웨어 스위처
    - 하드웨어 인코더 + 소프트웨어 인코더
  장점: 공통 모드 장애 방지
  단점: 관리 복잡

전략 3: Fallback (대체 수단)
  방법: 저품질/저기능 백업 유지
  예시:
    - RFID 실패 시 수동 입력
    - 스위처 실패 시 OBS
    - 네트워크 실패 시 핫스팟
  장점: 저렴
  단점: 품질/속도 저하

전략 4: Avoidance (회피)
  방법: 리스크 높은 구성 피하기
  예시:
    - 단일 ISP 회피 (멀티홈)
    - 단일 전원 회피 (분산 배전)
    - 단일 인력 의존 회피 (교차 훈련)
  장점: 근본적 해결
  단점: 설계 복잡
```

**SPOF 매트릭스**
```
┌─────────────┬──────────┬──────────┬──────────┐
│ Component   │ Risk     │ Backup   │ Priority │
├─────────────┼──────────┼──────────┼──────────┤
│ Core Switch │ CRITICAL │ Required │ P1       │
│ RFID Server │ HIGH     │ Required │ P1       │
│ Switcher    │ HIGH     │ Required │ P1       │
│ Encoder     │ HIGH     │ Advised  │ P2       │
│ Graphics PC │ MEDIUM   │ Advised  │ P2       │
│ Audio Mixer │ MEDIUM   │ Optional │ P3       │
│ Lighting    │ LOW      │ Optional │ P4       │
│ Monitor     │ LOW      │ Not Req. │ P5       │
└─────────────┴──────────┴──────────┴──────────┘

Legend:
P1 = Mission Critical (< 5초 복구)
P2 = Important (< 5분 복구)
P3 = Desirable (< 30분 복구)
P4 = Nice to Have (< 2시간 복구)
P5 = Non-Essential (당일 복구)
```

---

**(각주 문서 계속 작성 중... 총 40+ 위기 관리 용어 및 프로토콜 포함 예정)**

---

## 인적 위기 각주

### [5] Escalation (에스컬레이션)

**정의**
문제 해결이 현재 레벨에서 불가능할 때 상위 권한자에게 보고하고 지원을 요청하는 프로세스.

**에스컬레이션 레벨**
```yaml
Level 0: On-Site Resolution
  담당: 현장 오퍼레이터
  권한: 표준 절차 내 해결
  예시: 카메라 재부팅, 케이블 재연결
  시간: < 5분
  보고: 불필요 (사후 로그)

Level 1: Technical Lead
  담당: TD (Technical Director)
  권한: 백업 장비 투입, 임시 우회
  예시: 백업 카메라 전환, 신호 재라우팅
  시간: < 15분
  보고: Floor Producer에게 구두

Level 2: Production Lead
  담당: Floor Producer / Line Producer
  권한: 인력 재배치, 예산 범위 내 결정
  예시: 백업 크루 호출, 장비 긴급 렌탈
  시간: < 30분
  보고: EP에게 이메일 + 통화

Level 3: Executive
  담당: EP (Executive Producer)
  권한: 주요 의사결정, 예산 초과 승인
  예시: 방송 중단, 일정 변경, 클라이언트 협의
  시간: < 1시간
  보고: 클라이언트 + 경영진

Level 4: Crisis Management
  담당: CEO / Crisis Team
  권한: 회사 차원 대응, 법률/PR 개입
  예시: 중대 사고, 법적 이슈, 평판 위기
  시간: 즉시
  보고: 이사회 + 언론
```

**에스컬레이션 트리거**
```python
class EscalationTriggers:
    def __init__(self):
        self.severity_levels = {}

    def should_escalate(self, situation):
        """
        에스컬레이션 필요 여부 판단
        """
        triggers = {
            "Level_1_to_2": [
                "문제 해결 시간 15분 초과",
                "백업 시스템도 실패",
                "방송 품질 저하 지속",
                "시청자 불만 증가"
            ],

            "Level_2_to_3": [
                "예산 초과 필요 ($5,000+)",
                "클라이언트 불만 제기",
                "방송 중단 30분 이상",
                "인력 부족 (백업 없음)",
                "계약 위반 가능성"
            ],

            "Level_3_to_4": [
                "중대 부상 발생",
                "법적 문제 발생",
                "대규모 금전 손실 ($50k+)",
                "언론 보도 우려",
                "회사 평판 위기"
            ]
        }

        # 자동 평가 로직
        if situation.impact == "catastrophic":
            return "Escalate to Level 4 immediately"
        elif situation.duration > "30 minutes":
            return "Escalate to Level 3"
        elif situation.solutions_attempted > 2:
            return "Escalate to Level 2"
        else:
            return "Continue Level 1 resolution"

    def escalation_protocol(self, from_level, to_level):
        """
        에스컬레이션 실행 프로토콜
        """
        protocol = {
            "immediate_actions": [
                "현재 상황 간결히 요약",
                "시도한 해결책 나열",
                "필요한 지원 명확히 요청",
                "예상 영향 범위 설명",
                "타임라인 제시"
            ],

            "communication_channels": {
                "L1_to_L2": "무전 + Slack #production",
                "L2_to_L3": "전화 + 이메일 (템플릿)",
                "L3_to_L4": "긴급 전화 + SMS + 대면"
            },

            "documentation": {
                "required": [
                    "사건 시작 시각",
                    "증상 및 오류 메시지",
                    "시도한 조치",
                    "현재 상태",
                    "리스크 평가"
                ],
                "format": "Incident Report Template",
                "deadline": "에스컬레이션 후 1시간 내"
            }
        }

        return protocol
```

**에스컬레이션 템플릿**
```
ESCALATION REPORT

To: [Escalation Target]
From: [Your Name / Role]
Time: [Exact timestamp]
Severity: [Level 1/2/3/4]

SITUATION:
[1-2 문장으로 무슨 문제인지]

IMPACT:
[방송/비즈니스에 미치는 영향]
- Current: [현재 상태]
- Potential: [잠재적 위험]

ATTEMPTED SOLUTIONS:
1. [시도한 방법 1] - [결과]
2. [시도한 방법 2] - [결과]
3. [시도한 방법 3] - [결과]

REQUEST:
[구체적으로 필요한 지원]

TIMELINE:
- Issue Started: [시각]
- First Action: [시각]
- Escalated: [현재]
- Critical Deadline: [시각]

CONTACT:
[연락 가능한 방법]
```

---

### [6] AAR (After Action Review)

**정의**
위기 상황 종료 후 수행하는 구조화된 반성 및 학습 프로세스. 무엇이 잘되었고 무엇을 개선해야 하는지 팀 전체가 함께 분석.

**AAR 프로세스**
```yaml
Phase 1: Hot Debrief (즉시 디브리핑)
  타이밍: 위기 종료 후 30분 이내
  참가자: 현장 핵심 인력만 (5-7명)
  장소: Control room
  시간: 15-20분

  목적:
    - 신선한 기억 포착
    - 즉각적 교훈 공유
    - 긴급 개선사항 식별

  질문:
    1. 무슨 일이 있었나? (팩트)
    2. 잘한 것은? (성공)
    3. 개선할 점은? (기회)
    4. 즉시 조치? (액션)

Phase 2: Warm Debrief (상세 디브리핑)
  타이밍: 당일 또는 익일
  참가자: 전체 팀 (15-20명)
  장소: 회의실
  시간: 60-90분

  목적:
    - 전체 타임라인 재구성
    - 근본 원인 분석
    - 프로세스 개선 도출

  구조:
    1. 타임라인 리뷰 (20분)
    2. 근본 원인 분석 (30분)
    3. 교훈 도출 (20분)
    4. 액션 플랜 (20분)

Phase 3: Cold Review (공식 리뷰)
  타이밍: 1주일 후
  참가자: 리더십 + 외부 전문가
  장소: 공식 회의
  시간: 2-3시간

  목적:
    - 공식 문서화
    - 시스템적 개선
    - 조직 학습

  결과물:
    - AAR 공식 보고서
    - 개선 로드맵
    - 매뉴얼 업데이트
    - 훈련 계획
```

**AAR 진행 가이드**
```python
class AARFacilitator:
    def __init__(self):
        self.rules = [
            "No blame culture",
            "Focus on process, not people",
            "Everyone's voice matters",
            "Data over opinions",
            "Solutions over problems"
        ]

    def facilitate_timeline_review(self):
        """
        타임라인 재구성
        """
        template = {
            "T-0": {
                "event": "Initial trigger",
                "who": "Person/system that detected",
                "what": "Exact symptom",
                "evidence": "Logs, screenshots, witnesses"
            },
            "T+1 to T+X": [
                {
                    "time": "Relative timestamp",
                    "actor": "Who took action",
                    "action": "What was done",
                    "result": "Outcome",
                    "decision_point": "Why this choice?"
                }
            ],
            "T+Resolution": {
                "solution": "Final fix",
                "verification": "How confirmed",
                "side_effects": "Any collateral impact"
            }
        }

        # 각 참가자가 자신의 타임라인 제공
        # 교차 검증으로 객관적 타임라인 구성
        return template

    def root_cause_analysis(self, incident):
        """
        5 Whys 기법으로 근본 원인 파악
        """
        whys = {
            "Why_1": {
                "Q": "왜 문제가 발생했나?",
                "A": incident.immediate_cause,
                "Type": "Symptom"
            },
            "Why_2": {
                "Q": "왜 그런 일이 일어났나?",
                "A": incident.proximate_cause,
                "Type": "Mechanism"
            },
            "Why_3": {
                "Q": "왜 그게 가능했나?",
                "A": incident.underlying_cause,
                "Type": "Vulnerability"
            },
            "Why_4": {
                "Q": "왜 막지 못했나?",
                "A": incident.systemic_cause,
                "Type": "Process Gap"
            },
            "Why_5": {
                "Q": "왜 그런 프로세스였나?",
                "A": incident.root_cause,
                "Type": "Root Cause"
            }
        }

        return whys

    def action_items(self, lessons_learned):
        """
        액션 아이템 생성
        """
        actions = []

        for lesson in lessons_learned:
            action = {
                "what": "Specific action",
                "why": "Expected benefit",
                "who": "Owner (single person)",
                "when": "Deadline (date)",
                "how": "Implementation method",
                "verify": "Success criteria",
                "priority": "P1/P2/P3"
            }
            actions.append(action)

        return actions
```

**AAR 보고서 템플릿**
```markdown
# AFTER ACTION REVIEW

## Executive Summary
[2-3 문장 요약]

## Incident Overview
- Date/Time: [정확한 시각]
- Duration: [총 지속 시간]
- Severity: [Level 1-4]
- Impact: [영향 받은 시스템/인원]

## Timeline
| Time | Actor | Action | Result |
|------|-------|--------|--------|
| T+0  | ...   | ...    | ...    |
| ...  | ...   | ...    | ...    |

## What Went Well ✅
1. [성공 요인 1]
   - 증거: [데이터/증언]
   - 교훈: [재사용 가능한 원칙]

2. [성공 요인 2]
   ...

## What Can Improve 🔄
1. [개선 영역 1]
   - 문제: [구체적 이슈]
   - 영향: [결과]
   - 제안: [개선 방안]

2. [개선 영역 2]
   ...

## Root Cause Analysis
### 5 Whys
1. Why? → [Answer 1]
2. Why? → [Answer 2]
3. Why? → [Answer 3]
4. Why? → [Answer 4]
5. Why? → [Root Cause]

### Contributing Factors
- Technical: [기술적 요인]
- Process: [프로세스 요인]
- Human: [인적 요인]
- External: [외부 요인]

## Action Items
| # | Action | Owner | Deadline | Priority |
|---|--------|-------|----------|----------|
| 1 | ...    | ...   | ...      | P1       |
| 2 | ...    | ...   | ...      | P2       |

## Attachments
- [로그 파일]
- [스크린샷]
- [통신 기록]
- [증언 녹취]

---

**Prepared by:** [Name]
**Reviewed by:** [Name]
**Approved by:** [EP/CEO]
**Date:** [Date]
**Version:** 1.0
```

---

*최종 업데이트: 2024-10-15*
*작성자: GG Production Training Team*
*버전: 1.0*
*예상 최종 길이: 20,000+ 줄*