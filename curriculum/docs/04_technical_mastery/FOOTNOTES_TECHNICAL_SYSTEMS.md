# 프로덕션 기술 시스템 각주 문서
**FOOTNOTES_TECHNICAL_SYSTEMS.md**

> **문서 목적**: MASTER_PLAN Chapter 2 "프로덕션 기술 시스템"에 등장하는 핵심 기술 용어 및 개념에 대한 상세한 각주 문서
>
> **대상 독자**: GG Production 포커 프로덕션 전문가 양성 과정 참여자
>
> **작성 원칙**:
> - 각 용어에 대해 정의, 기술 사양, 실무 적용, 예시 코드, 트러블슈팅 제공
> - 방송 프로덕션 관점에서의 실용적 접근
> - 초보자도 이해 가능한 단계적 설명
> - 실제 포커 토너먼트 방송 사례 중심

---

## 📑 목차

### Section 1: 카메라 시스템
1. [FR7 로봇 카메라](#1-fr7-robot-camera)
2. [Exposure Triangle (노출 삼각형)](#2-exposure-triangle)
3. [White Balance (화이트 밸런스)](#3-white-balance)
4. [Focus Pulling (포커스 풀링)](#4-focus-pulling)
5. [PTZ (Pan-Tilt-Zoom)](#5-ptz-camera)

### Section 2: 영상 신호 및 표준
6. [SDI (Serial Digital Interface)](#6-sdi-signal)
7. [HDMI vs SDI](#7-hdmi-vs-sdi)
8. [4K/UHD Resolution](#8-4k-uhd-resolution)
9. [Frame Rate (프레임 레이트)](#9-frame-rate)
10. [SMPTE Timecode](#10-smpte-timecode)

### Section 3: 오디오 엔지니어링
11. [Gain Staging (게인 스테이징)](#11-gain-staging)
12. [Compression (오디오 압축)](#12-audio-compression)
13. [EQ (Equalization)](#13-equalization)
14. [Mixing Console (믹싱 콘솔)](#14-mixing-console)
15. [Phantom Power (팬텀 파워)](#15-phantom-power)

### Section 4: 네트워크 인프라
16. [VLAN (Virtual LAN)](#16-vlan)
17. [QoS (Quality of Service)](#17-qos)
18. [Bandwidth Calculation](#18-bandwidth-calculation)
19. [Latency vs Jitter](#19-latency-vs-jitter)
20. [IP Video (SMPTE ST 2110)](#20-ip-video)

### Section 5: 스위칭 및 제어
21. [Vision Mixer (비디오 스위처)](#21-vision-mixer)
22. [Program vs Preview](#22-program-vs-preview)
23. [DSK (Downstream Keyer)](#23-dsk)
24. [Tally System](#24-tally-system)
25. [Macro Programming](#25-macro-programming)

### Section 6: 컬러 관리
26. [LUT (Look-Up Table)](#26-lut)
27. [Color Space (Rec.709 vs Rec.2020)](#27-color-space)
28. [Log Gamma Curves](#28-log-gamma)
29. [Vectorscope & Waveform](#29-vectorscope-waveform)
30. [Color Calibration](#30-color-calibration)

---

## Section 1: 카메라 시스템

<a name="1-fr7-robot-camera"></a>
## 1️⃣ FR7 로봇 카메라 (FR7 Robot Camera)

### 📘 정의
**FR7 로봇 카메라**는 Sony가 개발한 리모트 제어 로봇 카메라 시스템으로, 360도 무한 회전(Pan), ±210도 틸트(Tilt), 광학 줌 기능을 원격으로 제어할 수 있는 프로페셔널 방송용 카메라입니다.

### 🔧 기술 사양

#### 하드웨어 구성
```yaml
카메라 헤드:
  모델: Sony α7R IV / α7S III
  센서: 35mm 풀프레임 CMOS
  해상도: 4K 60fps / FHD 120fps
  마운트: E-mount (교체 가능)
  무게: 약 2.5kg

로봇 암:
  회전(Pan): 360도 무한 회전
  틸트(Tilt): ±210도
  속도: 0.01°/s ~ 300°/s (가변)
  위치 정확도: ±0.02도
  프리셋: 최대 99개 저장

제어 유닛:
  모델: RM-IP500 / RM-IP10
  연결: IP (PoE 지원) / RS-422
  동시 제어: 최대 100대
  응답 시간: <50ms
```

#### 네트워크 구성
```python
# FR7 카메라 네트워크 설정 예시
class FR7NetworkConfig:
    def __init__(self):
        self.camera_configs = {
            "camera_1": {
                "ip": "192.168.10.101",
                "subnet": "255.255.255.0",
                "gateway": "192.168.10.1",
                "port": 52381,
                "vlan": 10,  # Camera VLAN
                "qos": "EF",  # Expedited Forwarding
                "latency_target": "30ms"
            },
            "camera_2": {
                "ip": "192.168.10.102",
                "subnet": "255.255.255.0",
                "gateway": "192.168.10.1",
                "port": 52381,
                "vlan": 10,
                "qos": "EF",
                "latency_target": "30ms"
            }
        }

    def generate_preset_file(self, camera_id, preset_data):
        """프리셋 설정 파일 생성"""
        preset = {
            "preset_id": preset_data["id"],
            "name": preset_data["name"],
            "pan": preset_data["pan"],  # -180.0 ~ +180.0
            "tilt": preset_data["tilt"],  # -105.0 ~ +105.0
            "zoom": preset_data["zoom"],  # 0.0 ~ 1.0 (normalized)
            "focus": preset_data["focus"],  # Auto / Manual
            "iris": preset_data["iris"],  # f/1.4 ~ f/22
            "transition_time": preset_data["speed"]  # seconds
        }
        return preset
```

### 🎯 포커 테이블 배치 전략

#### 5대 카메라 구성 (Feature Table)
```
                    [Camera 1]
                   (오버헤드)
                        ↓

[Camera 4]  ←  🃏 테이블 🃏  →  [Camera 5]
(플레이어 좌)                    (플레이어 우)

         [Camera 2]      [Camera 3]
        (딜러 정면)      (칩/카드 클로즈업)
```

#### 카메라별 프리셋 설정
```yaml
Camera 1 (오버헤드):
  Preset 1 - 전체 테이블:
    pan: 0.0
    tilt: -90.0
    zoom: 0.3
    용도: 게임 시작, 전체 현황

  Preset 2 - 커뮤니티 카드 포커스:
    pan: 0.0
    tilt: -80.0
    zoom: 0.7
    용도: 플랍/턴/리버 공개

Camera 2 (딜러 정면):
  Preset 1 - 딜러 미디엄 샷:
    pan: 0.0
    tilt: 0.0
    zoom: 0.4
    용도: 카드 배분 장면

  Preset 2 - 핸드 액션:
    pan: 0.0
    tilt: -10.0
    zoom: 0.8
    용도: 베팅 액션 클로즈업

Camera 3 (클로즈업):
  Preset 1 - 칩 스택:
    pan: +15.0
    tilt: -30.0
    zoom: 0.9
    용도: 올인 장면

  Preset 2 - 커뮤니티 카드 디테일:
    pan: 0.0
    tilt: -45.0
    zoom: 1.0
    용도: 카드 공개 순간

Camera 4/5 (플레이어):
  Preset 1~8 - 각 플레이어 포지션:
    pan: -120.0 ~ +120.0 (8명 기준)
    tilt: +5.0
    zoom: 0.6
    용도: 플레이어 리액션
```

### 💡 프리셋 자동화 시퀀스

#### 올인 상황 자동 시퀀스
```python
class AllInSequence:
    def __init__(self, cameras):
        self.cameras = cameras
        self.duration = 0

    def execute(self, player_position, pot_size):
        """올인 상황 자동 카메라 시퀀스"""
        sequence = [
            # Phase 1: 올인 선언 (3초)
            {
                "camera": self.cameras[4],  # 플레이어 카메라
                "preset": f"player_{player_position}",
                "duration": 3.0,
                "transition": "cut"
            },
            # Phase 2: 칩 스택 클로즈업 (2초)
            {
                "camera": self.cameras[3],
                "preset": "chip_detail",
                "duration": 2.0,
                "transition": "dissolve"
            },
            # Phase 3: 상대 플레이어 리액션 (3초)
            {
                "camera": self.cameras[5],
                "preset": f"player_{self._get_opponent(player_position)}",
                "duration": 3.0,
                "transition": "cut"
            },
            # Phase 4: 전체 테이블 (2초)
            {
                "camera": self.cameras[1],
                "preset": "table_wide",
                "duration": 2.0,
                "transition": "dissolve"
            }
        ]

        return sequence

    def _get_opponent(self, position):
        """올인 대결 상대 찾기"""
        # 실제로는 게임 상태에서 가져옴
        return (position + 4) % 8
```

#### 자동 시퀀스 실행 코드
```python
import asyncio
from typing import List, Dict

class FR7Automation:
    def __init__(self, controller_ip: str):
        self.controller_ip = controller_ip
        self.active_sequence = None

    async def run_sequence(self, sequence: List[Dict]):
        """비동기 시퀀스 실행"""
        for step in sequence:
            camera = step["camera"]
            preset = step["preset"]
            duration = step["duration"]
            transition = step["transition"]

            # 카메라 프리셋 호출
            await self.recall_preset(camera, preset, transition)

            # 지정된 시간만큼 유지
            await asyncio.sleep(duration)

    async def recall_preset(self, camera_id: str, preset_name: str, transition: str):
        """프리셋 호출 명령 전송"""
        command = {
            "camera": camera_id,
            "command": "RecallPreset",
            "preset": preset_name,
            "transition": transition,
            "speed": self._get_transition_speed(transition)
        }

        # TCP/IP 또는 REST API로 명령 전송
        await self._send_command(command)

    def _get_transition_speed(self, transition_type: str) -> float:
        """전환 타입별 속도 설정"""
        speeds = {
            "cut": 0.0,  # 즉시 전환
            "dissolve": 1.5,  # 1.5초 디졸브
            "slow_pan": 3.0  # 3초 느린 팬
        }
        return speeds.get(transition_type, 1.0)

    async def _send_command(self, command: Dict):
        """실제 네트워크 명령 전송"""
        # REST API 예시
        import aiohttp

        url = f"http://{self.controller_ip}/api/v1/camera/control"

        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=command) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    raise Exception(f"Camera command failed: {response.status}")
```

### 🎬 실전 운영 워크플로우

#### 토너먼트 시작 전 체크리스트
```markdown
# FR7 카메라 세팅 체크리스트

## 1시간 전 (T-60)
- [ ] 모든 FR7 카메라 전원 ON
- [ ] 네트워크 연결 확인 (ping 테스트)
- [ ] RM-IP500 컨트롤러 연결 확인
- [ ] 카메라 헤드 렌즈 청소
- [ ] 초점 캘리브레이션 (테스트 차트)

## 30분 전 (T-30)
- [ ] 프리셋 1~99 동작 테스트
- [ ] 자동 시퀀스 테스트 실행
- [ ] 조명 변화에 따른 노출 조정
- [ ] 백업 카메라 (PTZ) 준비
- [ ] Tally 시스템 연동 확인

## 10분 전 (T-10)
- [ ] 최종 프리셋 위치 확인
- [ ] 전환 속도 최적화
- [ ] 수동 제어 백업 준비
- [ ] 커뮤니케이션 체크 (토키)
```

#### 라이브 중 트러블슈팅
```python
class FR7Troubleshooting:
    """FR7 실시간 트러블슈팅 시스템"""

    def __init__(self):
        self.error_log = []
        self.backup_cameras = []

    def check_camera_status(self, camera_id: str) -> Dict:
        """카메라 상태 체크"""
        status = {
            "network": self._check_network(camera_id),
            "power": self._check_power(camera_id),
            "position": self._check_position_accuracy(camera_id),
            "video_output": self._check_video_signal(camera_id)
        }

        if not all(status.values()):
            self._trigger_failover(camera_id, status)

        return status

    def _trigger_failover(self, camera_id: str, error_status: Dict):
        """장애 발생 시 백업 카메라로 전환"""
        error_type = self._identify_error(error_status)

        if error_type == "network_timeout":
            # 네트워크 복구 시도 (3초 타임아웃)
            self._attempt_reconnect(camera_id, timeout=3.0)

        elif error_type == "position_drift":
            # 위치 재캘리브레이션
            self._recalibrate_position(camera_id)

        elif error_type == "critical_failure":
            # 백업 카메라로 즉시 전환
            backup = self._get_backup_camera(camera_id)
            self._switch_to_backup(camera_id, backup)

            # 알림 전송
            self._notify_td(f"Camera {camera_id} failed, switched to {backup}")

    def _identify_error(self, status: Dict) -> str:
        """에러 타입 분류"""
        if not status["network"]:
            return "network_timeout"
        elif not status["position"]:
            return "position_drift"
        elif not status["video_output"]:
            return "critical_failure"
        return "unknown"
```

### 📊 성능 모니터링

#### 실시간 모니터링 대시보드
```python
import time
from dataclasses import dataclass

@dataclass
class CameraMetrics:
    """카메라 성능 지표"""
    camera_id: str
    response_time_ms: float
    position_accuracy: float  # degrees
    preset_recalls: int
    errors: int
    uptime_seconds: float

class FR7Monitor:
    def __init__(self):
        self.metrics = {}
        self.alert_thresholds = {
            "response_time": 100,  # ms
            "position_accuracy": 0.05,  # degrees
            "error_rate": 0.01  # 1%
        }

    def collect_metrics(self, camera_id: str):
        """성능 지표 수집"""
        start = time.time()

        # 응답 시간 측정
        response = self._send_test_command(camera_id)
        response_time = (time.time() - start) * 1000  # ms

        # 위치 정확도 측정
        accuracy = self._measure_position_accuracy(camera_id)

        # 메트릭 저장
        if camera_id not in self.metrics:
            self.metrics[camera_id] = CameraMetrics(
                camera_id=camera_id,
                response_time_ms=response_time,
                position_accuracy=accuracy,
                preset_recalls=0,
                errors=0,
                uptime_seconds=0.0
            )
        else:
            self.metrics[camera_id].response_time_ms = response_time
            self.metrics[camera_id].position_accuracy = accuracy

        # 임계값 체크
        self._check_alerts(camera_id)

    def _check_alerts(self, camera_id: str):
        """알림 조건 체크"""
        metrics = self.metrics[camera_id]

        if metrics.response_time_ms > self.alert_thresholds["response_time"]:
            self._send_alert(f"Camera {camera_id}: High latency ({metrics.response_time_ms}ms)")

        if metrics.position_accuracy > self.alert_thresholds["position_accuracy"]:
            self._send_alert(f"Camera {camera_id}: Position drift ({metrics.position_accuracy}°)")

    def generate_report(self) -> str:
        """성능 리포트 생성"""
        report = "=== FR7 Camera Performance Report ===\n\n"

        for camera_id, metrics in self.metrics.items():
            report += f"Camera: {camera_id}\n"
            report += f"  Response Time: {metrics.response_time_ms:.2f}ms\n"
            report += f"  Position Accuracy: {metrics.position_accuracy:.3f}°\n"
            report += f"  Preset Recalls: {metrics.preset_recalls}\n"
            report += f"  Errors: {metrics.errors}\n"
            report += f"  Uptime: {metrics.uptime_seconds/3600:.2f}h\n"
            report += f"  Error Rate: {(metrics.errors/max(metrics.preset_recalls,1))*100:.2f}%\n\n"

        return report
```

### 🔍 트러블슈팅 가이드

#### 문제 1: 카메라 응답 없음
```markdown
증상: 프리셋 호출 시 카메라가 움직이지 않음

진단 단계:
1. 네트워크 연결 확인
   ```bash
   ping 192.168.10.101
   ```

2. 카메라 전원 확인
   - Power LED 상태
   - PoE 공급 전압 (48V)

3. 컨트롤러 로그 확인
   ```bash
   tail -f /var/log/rm-ip500/camera_control.log
   ```

해결 방법:
- 네트워크 타임아웃: 스위치 포트 리셋
- 전원 문제: PoE 인젝터 교체
- 펌웨어 오류: 카메라 재부팅 (30초 대기)
```

#### 문제 2: 위치 드리프트 (Position Drift)
```markdown
증상: 프리셋 위치가 점차 틀어짐

원인:
- 기계적 백래시 (Backlash)
- 인코더 오차 누적
- 진동 영향

해결 방법:
1. 홈 포지션 재설정
   - Menu → Maintenance → Initialize Home Position

2. 전체 프리셋 재캘리브레이션
   ```python
   def recalibrate_all_presets(camera_id):
       for preset_id in range(1, 100):
           # 프리셋 호출
           recall_preset(camera_id, preset_id)
           time.sleep(2)

           # 현재 위치 저장 (덮어쓰기)
           save_current_position(camera_id, preset_id)
   ```

3. 정기 점검 (매월)
   - 로봇 암 기계적 점검
   - 인코더 청소
   - 펌웨어 업데이트
```

---

<a name="2-exposure-triangle"></a>
## 2️⃣ Exposure Triangle (노출 삼각형)

### 📘 정의
**노출 삼각형**은 사진 및 영상 촬영에서 적정 노출을 결정하는 세 가지 핵심 요소인 **ISO (감도)**, **Shutter Speed (셔터 속도)**, **Aperture (조리개)**의 상호 관계를 나타내는 개념입니다.

### 🔧 세 가지 요소

#### 1. ISO (감도)
```yaml
정의: 이미지 센서의 빛에 대한 민감도

범위:
  Native ISO: 100 ~ 6400 (최적 화질)
  Extended ISO: 50 / 12800 / 25600 (화질 저하)

특성:
  낮은 ISO (100-400):
    - 깨끗한 이미지
    - 노이즈 최소화
    - 밝은 조명 필요

  중간 ISO (800-3200):
    - 약간의 노이즈
    - 일반적인 실내 촬영
    - 균형있는 선택

  높은 ISO (6400+):
    - 심한 노이즈/그레인
    - 어두운 환경
    - 비상 상황만 사용
```

#### 2. Shutter Speed (셔터 속도)
```yaml
정의: 센서가 빛에 노출되는 시간

포커 방송 권장값:
  일반 샷: 1/50s (PAL), 1/60s (NTSC)
  180도 셔터 룰 적용

범위와 용도:
  Fast (1/500s ~ 1/2000s):
    - 빠른 동작 (카드 배분)
    - 모션 블러 최소화
    - 많은 빛 필요

  Standard (1/50s ~ 1/100s):
    - 자연스러운 모션
    - 방송 표준
    - 24fps, 25fps, 30fps 매칭

  Slow (1/25s ~ 1/4s):
    - 모션 블러 증가
    - 저조도 환경
    - 카메라 고정 필수
```

#### 3. Aperture (조리개 / F-stop)
```yaml
정의: 렌즈를 통과하는 빛의 양 조절

표기법: f/1.4, f/2.8, f/5.6, f/11, f/22
  (숫자가 작을수록 조리개가 넓게 열림)

특성:
  Wide Open (f/1.4 ~ f/2.8):
    - 많은 빛 통과
    - 얕은 피사계 심도 (배경 흐림)
    - 플레이어 클로즈업에 적합

  Mid Range (f/4 ~ f/5.6):
    - 균형있는 노출
    - 적절한 심도
    - 일반적인 방송 설정

  Stopped Down (f/8 ~ f/16):
    - 적은 빛
    - 깊은 피사계 심도 (전체 초점)
    - 테이블 전체 샷에 적합
```

### 💡 포커 방송 실전 설정

#### 상황별 노출 설정
```python
class ExposureSettings:
    """포커 방송 상황별 노출 설정"""

    def __init__(self):
        self.scenarios = {}

    def get_settings(self, scenario: str) -> dict:
        """시나리오별 최적 설정 반환"""

        # 1. 일반적인 테이블 샷
        if scenario == "table_wide":
            return {
                "iso": 800,
                "shutter": "1/50",  # 25fps * 2
                "aperture": "f/5.6",
                "rationale": "전체 테이블에 고른 초점, 적절한 노이즈"
            }

        # 2. 플레이어 클로즈업
        elif scenario == "player_closeup":
            return {
                "iso": 400,
                "shutter": "1/50",
                "aperture": "f/2.8",
                "rationale": "얕은 심도로 플레이어 강조, 배경 블러"
            }

        # 3. 카드 클로즈업 (RFID 카메라)
        elif scenario == "card_detail":
            return {
                "iso": 200,
                "shutter": "1/100",  # 빠른 카드 움직임
                "aperture": "f/4",
                "rationale": "카드 디테일 선명, 모션 블러 최소화"
            }

        # 4. 칩 스택 (저조도)
        elif scenario == "chip_stack_lowlight":
            return {
                "iso": 1600,
                "shutter": "1/50",
                "aperture": "f/2.0",
                "rationale": "테이블 조명 약한 구역, ISO 상승"
            }

        # 5. 슬로모션 리플레이
        elif scenario == "slow_motion":
            return {
                "iso": 3200,
                "shutter": "1/200",  # 120fps * 1.6
                "aperture": "f/2.8",
                "rationale": "고프레임 촬영, 빠른 셔터 보상"
            }

        return self._get_default_settings()

    def _get_default_settings(self) -> dict:
        """기본 설정"""
        return {
            "iso": 800,
            "shutter": "1/50",
            "aperture": "f/4",
            "rationale": "표준 방송 설정"
        }

    def calculate_exposure_compensation(self, current, target) -> dict:
        """노출 보정 계산"""

        # ISO 변경 시 stops 계산
        iso_stops = math.log2(target["iso"] / current["iso"])

        # Shutter 변경 시 stops 계산
        current_shutter_val = self._parse_shutter(current["shutter"])
        target_shutter_val = self._parse_shutter(target["shutter"])
        shutter_stops = math.log2(target_shutter_val / current_shutter_val)

        # Aperture 변경 시 stops 계산
        current_f = self._parse_fstop(current["aperture"])
        target_f = self._parse_fstop(target["aperture"])
        aperture_stops = 2 * math.log2(target_f / current_f)

        total_stops = iso_stops + shutter_stops + aperture_stops

        return {
            "iso_stops": iso_stops,
            "shutter_stops": shutter_stops,
            "aperture_stops": aperture_stops,
            "total_stops": total_stops,
            "direction": "brighter" if total_stops > 0 else "darker"
        }
```

#### 노출 자동 조정 시스템
```python
import numpy as np
from PIL import Image

class AutoExposure:
    """자동 노출 조정 시스템"""

    def __init__(self):
        self.target_brightness = 0.45  # 0.0 ~ 1.0 (18% gray = 0.45)
        self.tolerance = 0.05

    def analyze_frame(self, frame: np.ndarray) -> dict:
        """프레임 분석하여 노출 상태 평가"""

        # 밝기 분석 (Luminance)
        if len(frame.shape) == 3:
            # RGB to Luminance (Rec.709)
            luminance = (0.2126 * frame[:,:,0] +
                        0.7152 * frame[:,:,1] +
                        0.0722 * frame[:,:,2])
        else:
            luminance = frame

        # 평균 밝기
        mean_brightness = np.mean(luminance) / 255.0

        # 히스토그램 분석
        histogram = np.histogram(luminance, bins=256, range=(0, 255))[0]

        # 과다/과소 노출 검사
        overexposed = np.sum(histogram[250:]) / luminance.size
        underexposed = np.sum(histogram[:5]) / luminance.size

        return {
            "mean_brightness": mean_brightness,
            "overexposed_ratio": overexposed,
            "underexposed_ratio": underexposed,
            "histogram": histogram,
            "status": self._evaluate_exposure(mean_brightness, overexposed, underexposed)
        }

    def _evaluate_exposure(self, brightness, over, under) -> str:
        """노출 상태 평가"""
        if over > 0.05:
            return "overexposed"
        elif under > 0.10:
            return "underexposed"
        elif abs(brightness - self.target_brightness) < self.tolerance:
            return "optimal"
        elif brightness > self.target_brightness:
            return "slightly_bright"
        else:
            return "slightly_dark"

    def recommend_adjustment(self, analysis: dict, current_settings: dict) -> dict:
        """노출 조정 권장사항"""

        status = analysis["status"]
        brightness = analysis["mean_brightness"]

        # 밝기 차이 계산
        delta = brightness - self.target_brightness
        stops_needed = -math.log2(1 + delta) if delta != 0 else 0

        # 우선순위: ISO > Aperture > Shutter (방송 표준 유지)
        adjustment = {"changes": [], "priority": []}

        if abs(stops_needed) < 0.3:
            # 작은 조정: ISO만 변경
            new_iso = int(current_settings["iso"] * (2 ** stops_needed))
            adjustment["changes"].append({
                "parameter": "iso",
                "current": current_settings["iso"],
                "recommended": new_iso,
                "reason": "Minor exposure adjustment"
            })

        elif abs(stops_needed) < 1.0:
            # 중간 조정: ISO + Aperture
            iso_stops = stops_needed * 0.7
            aperture_stops = stops_needed * 0.3

            new_iso = int(current_settings["iso"] * (2 ** iso_stops))
            current_f = self._parse_fstop(current_settings["aperture"])
            new_f = current_f * (2 ** (aperture_stops / 2))

            adjustment["changes"].extend([
                {"parameter": "iso", "current": current_settings["iso"],
                 "recommended": new_iso},
                {"parameter": "aperture", "current": current_settings["aperture"],
                 "recommended": f"f/{new_f:.1f}"}
            ])

        else:
            # 큰 조정: 모든 파라미터
            adjustment["changes"].append({
                "warning": "Large exposure correction needed. Check lighting setup."
            })

        return adjustment
```

### 📊 실시간 모니터링

#### Waveform & Histogram 분석
```python
import matplotlib.pyplot as plt

class ExposureMonitor:
    """실시간 노출 모니터링"""

    def __init__(self):
        self.history = []
        self.max_history = 300  # 10초 @ 30fps

    def add_frame_analysis(self, analysis: dict):
        """프레임 분석 결과 추가"""
        self.history.append(analysis)
        if len(self.history) > self.max_history:
            self.history.pop(0)

    def generate_waveform(self, frame: np.ndarray):
        """Waveform 모니터 생성"""
        height, width = frame.shape[:2]

        # 각 수평 라인의 밝기 프로파일
        waveform = np.zeros((256, width))

        for x in range(width):
            column = frame[:, x]
            if len(column.shape) == 2:
                # RGB -> Luminance
                column = (0.2126 * column[:,0] +
                         0.7152 * column[:,1] +
                         0.0722 * column[:,2])

            hist, _ = np.histogram(column, bins=256, range=(0, 255))
            waveform[:, x] = hist

        return waveform

    def plot_exposure_trend(self):
        """노출 트렌드 그래프"""
        if len(self.history) < 10:
            return

        brightnesses = [h["mean_brightness"] for h in self.history]
        times = range(len(brightnesses))

        plt.figure(figsize=(12, 4))
        plt.plot(times, brightnesses, label="Mean Brightness")
        plt.axhline(y=0.45, color='g', linestyle='--', label="Target (18% gray)")
        plt.axhline(y=0.40, color='y', linestyle=':', label="Lower tolerance")
        plt.axhline(y=0.50, color='y', linestyle=':', label="Upper tolerance")
        plt.xlabel("Frame")
        plt.ylabel("Brightness (0-1)")
        plt.title("Exposure Trend (Last 10 seconds)")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        return plt
```

### 🎯 방송 표준 가이드라인

#### GGPoker 방송 표준
```yaml
표준 노출 설정:
  메인 카메라 (테이블):
    ISO: 800
    Shutter: 1/50s (25fps)
    Aperture: f/5.6
    화이트밸런스: 3200K

  클로즈업 카메라:
    ISO: 400
    Shutter: 1/50s
    Aperture: f/2.8 ~ f/4
    화이트밸런스: 3200K

  슬로모션 카메라 (120fps):
    ISO: 3200
    Shutter: 1/240s
    Aperture: f/2.8
    화이트밸런스: 3200K

허용 범위:
  ISO 범위: 200 ~ 3200 (노이즈 허용 한계)
  Shutter: 1/50s 고정 (180도 셔터 룰)
  Aperture: f/2.0 ~ f/8.0

금지 사항:
  - ISO 6400 이상 (과도한 노이즈)
  - 1/25s 이하 셔터 (모션 블러)
  - f/16 이상 조리개 (회절 현상)
```

---

<a name="3-white-balance"></a>
## 3️⃣ White Balance (화이트 밸런스)

### 📘 정의
**화이트 밸런스**는 조명의 색온도를 보정하여 흰색이 실제로 흰색으로 보이도록 카메라의 색상을 조정하는 기술입니다. 켈빈(K) 단위로 측정되며, 포커 방송에서는 일관된 색감 유지를 위해 매우 중요합니다.

### 🔧 색온도 스케일

```yaml
색온도 차트:
  촛불: 1,800K (매우 따뜻한 오렌지)
  백열등: 2,700K ~ 3,000K (따뜻한 노란색)
  할로겐: 3,200K (표준 텅스텐)
  형광등: 4,000K ~ 5,000K (차가운 백색)
  자연광 (낮): 5,500K ~ 6,500K (중성 백색)
  흐린 날: 6,500K ~ 8,000K (차가운 블루)
  그늘: 9,000K ~ 10,000K (매우 차가운 블루)

포커 스튜디오 표준:
  LED 스튜디오 조명: 3,200K (텅스텐 매칭)
  권장 설정: 3,200K 프리셋
  허용 범위: ±200K (3,000K ~ 3,400K)
```

### 💡 포커 테이블 조명 설정

#### 3-Point Lighting Setup
```yaml
조명 구성:
  Key Light (주광):
    위치: 테이블 정면 45도, 높이 2.5m
    색온도: 3,200K
    출력: 800W LED
    소프트박스: 120cm x 80cm
    목적: 테이블 전체 기본 조명

  Fill Light (보조광):
    위치: Key Light 반대편, 낮은 강도
    색온도: 3,200K (Key와 동일!)
    출력: 400W LED
    디퓨저: 90cm 옥타곤
    목적: 그림자 부드럽게

  Back Light (역광):
    위치: 테이블 뒤쪽, 높이 3m
    색온도: 3,400K (약간 차갑게)
    출력: 300W LED
    목적: 플레이어 윤곽 강조

  Accent Light (포인트 조명):
    위치: 칩 스택, 커뮤니티 카드 위
    색온도: 3,200K
    출력: 150W LED 스팟
    목적: 디테일 강조
```

#### 화이트밸런스 워크플로우
```python
class WhiteBalanceManager:
    """화이트 밸런스 관리 시스템"""

    def __init__(self):
        self.preset_temps = {
            "tungsten": 3200,
            "fluorescent": 4000,
            "daylight": 5600,
            "cloudy": 6500,
            "shade": 7500,
            "custom": None
        }

        self.current_setting = "tungsten"
        self.custom_kelvin = 3200

    def set_white_balance(self, camera_id: str, method: str):
        """화이트 밸런스 설정"""

        if method == "auto":
            # 자동 화이트 밸런스 (AWB)
            return self._set_awb(camera_id)

        elif method == "preset":
            # 프리셋 사용 (3200K)
            return self._set_preset(camera_id, self.current_setting)

        elif method == "custom":
            # 커스텀 켈빈 값
            return self._set_custom_kelvin(camera_id, self.custom_kelvin)

        elif method == "grey_card":
            # 그레이 카드 기준
            return self._calibrate_grey_card(camera_id)

    def _calibrate_grey_card(self, camera_id: str) -> dict:
        """18% 그레이 카드를 이용한 정밀 캘리브레이션"""

        # 1단계: 그레이 카드 촬영
        print(f"[{camera_id}] Place 18% grey card in center of table")
        print("Ensure even lighting across the card")
        input("Press Enter when ready...")

        # 2단계: 프레임 캡처
        frame = self._capture_frame(camera_id)

        # 3단계: 그레이 카드 영역 추출 (중앙 10%)
        h, w = frame.shape[:2]
        center_region = frame[
            int(h*0.45):int(h*0.55),
            int(w*0.45):int(w*0.55)
        ]

        # 4단계: RGB 평균 계산
        r_avg = np.mean(center_region[:,:,0])
        g_avg = np.mean(center_region[:,:,1])
        b_avg = np.mean(center_region[:,:,2])

        # 5단계: 색온도 추정
        color_temp = self._estimate_color_temp(r_avg, g_avg, b_avg)

        # 6단계: 화이트 밸런스 게인 계산
        wb_gains = {
            "red_gain": g_avg / r_avg,
            "green_gain": 1.0,
            "blue_gain": g_avg / b_avg
        }

        # 7단계: 카메라에 적용
        self._apply_wb_gains(camera_id, wb_gains)

        return {
            "method": "grey_card_calibration",
            "estimated_color_temp": color_temp,
            "wb_gains": wb_gains,
            "rgb_averages": {"r": r_avg, "g": g_avg, "b": b_avg}
        }

    def _estimate_color_temp(self, r: float, g: float, b: float) -> int:
        """RGB 값으로 색온도 추정"""

        # McCamy's 공식 (근사치)
        n = (r - b) / (g - b) if (g - b) != 0 else 0
        CCT = 437 * (n**3) + 3601 * (n**2) + 6861 * n + 5517

        return int(CCT)

    def match_cameras(self, camera_ids: list) -> dict:
        """여러 카메라의 화이트 밸런스 일치시키기"""

        # 1단계: 마스터 카메라 선정 (보통 메인 카메라)
        master_camera = camera_ids[0]

        # 2단계: 마스터 카메라로 그레이 카드 캘리브레이션
        master_wb = self._calibrate_grey_card(master_camera)

        # 3단계: 다른 카메라들에 동일한 설정 적용
        results = {master_camera: master_wb}

        for camera_id in camera_ids[1:]:
            result = self._apply_wb_gains(
                camera_id,
                master_wb["wb_gains"]
            )
            results[camera_id] = result

        # 4단계: 검증
        verification = self._verify_wb_match(camera_ids)

        return {
            "master_camera": master_camera,
            "master_wb": master_wb,
            "slave_results": results,
            "verification": verification
        }

    def _verify_wb_match(self, camera_ids: list) -> dict:
        """카메라 간 화이트 밸런스 일치 검증"""

        # 각 카메라에서 동일한 그레이 카드 촬영
        frames = {cam: self._capture_frame(cam) for cam in camera_ids}

        # RGB 평균 계산
        rgb_values = {}
        for cam, frame in frames.items():
            h, w = frame.shape[:2]
            center = frame[int(h*0.45):int(h*0.55), int(w*0.45):int(w*0.55)]
            rgb_values[cam] = {
                "r": np.mean(center[:,:,0]),
                "g": np.mean(center[:,:,1]),
                "b": np.mean(center[:,:,2])
            }

        # 편차 계산
        master_rgb = rgb_values[camera_ids[0]]
        deviations = {}

        for cam in camera_ids[1:]:
            cam_rgb = rgb_values[cam]
            deviations[cam] = {
                "r_dev": abs(cam_rgb["r"] - master_rgb["r"]),
                "g_dev": abs(cam_rgb["g"] - master_rgb["g"]),
                "b_dev": abs(cam_rgb["b"] - master_rgb["b"]),
                "total_dev": np.sqrt(
                    (cam_rgb["r"] - master_rgb["r"])**2 +
                    (cam_rgb["g"] - master_rgb["g"])**2 +
                    (cam_rgb["b"] - master_rgb["b"])**2
                )
            }

        # 허용 범위: 총 편차 < 10 (8-bit 기준)
        all_matched = all(d["total_dev"] < 10 for d in deviations.values())

        return {
            "all_cameras_matched": all_matched,
            "rgb_values": rgb_values,
            "deviations": deviations
        }
```

### 📊 색온도 실시간 모니터링

```python
import cv2

class ColorTempMonitor:
    """실시간 색온도 모니터링"""

    def __init__(self):
        self.target_temp = 3200
        self.tolerance = 200  # ±200K
        self.history = []

    def analyze_frame_color(self, frame: np.ndarray) -> dict:
        """프레임의 색온도 분석"""

        # RGB 채널 평균
        r_mean = np.mean(frame[:,:,0])
        g_mean = np.mean(frame[:,:,1])
        b_mean = np.mean(frame[:,:,2])

        # 색온도 추정
        estimated_temp = self._rgb_to_color_temp(r_mean, g_mean, b_mean)

        # Color Cast 검사
        color_cast = self._detect_color_cast(r_mean, g_mean, b_mean)

        # 색온도 편차
        temp_deviation = estimated_temp - self.target_temp

        return {
            "estimated_temp": estimated_temp,
            "target_temp": self.target_temp,
            "deviation_kelvin": temp_deviation,
            "within_tolerance": abs(temp_deviation) < self.tolerance,
            "color_cast": color_cast,
            "rgb_means": {"r": r_mean, "g": g_mean, "b": b_mean}
        }

    def _detect_color_cast(self, r, g, b) -> str:
        """Color Cast (색편향) 검출"""

        # 정규화
        total = r + g + b
        r_norm = r / total
        g_norm = g / total
        b_norm = b / total

        # 기준값 (균형 잡힌 백색)
        neutral = 1/3
        threshold = 0.02

        if r_norm > neutral + threshold:
            return "warm_cast"  # 따뜻한 편향 (오렌지/레드)
        elif b_norm > neutral + threshold:
            return "cool_cast"  # 차가운 편향 (블루)
        elif g_norm > neutral + threshold:
            return "green_cast"  # 녹색 편향 (형광등)
        else:
            return "neutral"  # 중성

    def generate_color_chart(self, frame: np.ndarray):
        """컬러 체크 차트 생성"""

        # 9구역으로 분할하여 각 영역의 색온도 분석
        h, w = frame.shape[:2]
        grid_h, grid_w = h // 3, w // 3

        color_map = np.zeros((3, 3))

        for i in range(3):
            for j in range(3):
                region = frame[
                    i*grid_h:(i+1)*grid_h,
                    j*grid_w:(j+1)*grid_w
                ]

                r = np.mean(region[:,:,0])
                g = np.mean(region[:,:,1])
                b = np.mean(region[:,:,2])

                color_map[i, j] = self._rgb_to_color_temp(r, g, b)

        return color_map
```

### 🎯 실전 트러블슈팅

#### 문제 1: 카메라 간 색감 불일치
```markdown
증상: 같은 테이블을 촬영하는데 카메라마다 색감이 다름

원인:
- 카메라별로 Auto White Balance (AWB) 사용
- 각 카메라가 다른 영역을 기준으로 자동 보정
- 조명 변화에 따라 실시간으로 변동

해결:
1. 모든 카메라를 Manual White Balance로 변경
2. 그레이 카드를 이용해 마스터 카메라 캘리브레이션
3. 마스터 카메라의 Kelvin 값을 다른 카메라에 복사
4. 주기적으로 재검증 (2시간마다)

Python 자동화:
```python
# 모든 카메라를 3200K로 고정
for camera in all_cameras:
    camera.set_white_balance_mode("manual")
    camera.set_color_temp_kelvin(3200)
    camera.disable_auto_white_balance()
```
```

#### 문제 2: 시간에 따른 색온도 변화
```markdown
증상: 방송 초반과 후반의 색감이 다름

원인:
- LED 조명의 온도 상승에 따른 색온도 변화
- 형광등의 경년 변화
- 외부 자연광 유입 (창문)

해결:
1. 조명 Pre-heating (촬영 1시간 전 켜기)
2. 창문 완전 차단 (블랙아웃 커튼)
3. 조명 색온도 모니터링
4. 필요시 중간 재캘리브레이션

모니터링 스크립트:
```python
def continuous_wb_monitoring():
    """연속 화이트 밸런스 모니터링"""

    while True:
        for camera in all_cameras:
            analysis = analyze_frame_color(camera.get_frame())

            if not analysis["within_tolerance"]:
                alert = f"Camera {camera.id}: Color temp drift detected!"
                alert += f"\nTarget: {analysis['target_temp']}K"
                alert += f"\nCurrent: {analysis['estimated_temp']}K"
                alert += f"\nDeviation: {analysis['deviation_kelvin']}K"

                send_alert_to_td(alert)

                # 자동 재조정
                recalibrate_camera(camera.id)

        time.sleep(120)  # 2분마다 체크
```
```

---

<a name="4-focus-pulling"></a>
## 4️⃣ Focus Pulling (포커스 풀링)

### 📘 정의
**포커스 풀링**은 촬영 중 피사체의 움직임이나 구도 변경에 따라 초점을 실시간으로 조정하는 기술입니다. 영화 및 방송에서 피사계 심도(DOF)가 얕을 때 특히 중요하며, 포커 방송에서는 카드 공개나 플레이어 리액션 촬영 시 활용됩니다.

### 🔧 기술 원리

#### Depth of Field (피사계 심도)
```yaml
정의: 선명한 초점이 유지되는 피사체 앞뒤의 거리 범위

영향 요소:
  1. 조리개 (Aperture):
     Wide (f/1.4): 매우 얕은 DOF (배경 완전 블러)
     Narrow (f/16): 매우 깊은 DOF (전체 선명)

  2. 초점 거리 (Focal Length):
     Wide (24mm): 깊은 DOF
     Telephoto (200mm): 얕은 DOF

  3. 피사체 거리:
     Close (1m): 얕은 DOF
     Far (10m): 깊은 DOF

  4. 센서 크기:
     Full Frame (36x24mm): 얕은 DOF
     Micro 4/3 (17x13mm): 깊은 DOF

계산식:
  DOF = (2 * N * C * s²) / f²

  N = f-stop (조리개 값)
  C = Circle of Confusion (0.03mm for Full Frame)
  s = 피사체 거리
  f = 초점 거리
```

#### 포커 방송 DOF 전략
```python
class DepthOfFieldCalculator:
    """피사계 심도 계산기"""

    def __init__(self):
        # 센서 크기 (mm)
        self.sensor_sizes = {
            "full_frame": (36, 24),
            "aps_c": (23.6, 15.7),
            "micro_43": (17.3, 13.0)
        }

        # Circle of Confusion (mm)
        self.coc_values = {
            "full_frame": 0.030,
            "aps_c": 0.019,
            "micro_43": 0.015
        }

    def calculate_dof(self, focal_length_mm: float, f_stop: float,
                     subject_distance_m: float, sensor_type: str = "full_frame") -> dict:
        """피사계 심도 계산"""

        f = focal_length_mm
        N = f_stop
        s = subject_distance_m * 1000  # m to mm
        C = self.coc_values[sensor_type]

        # Hyperfocal Distance
        H = (f**2) / (N * C) + f

        # Near Focus Distance
        if s < H:
            D_n = (s * (H - f)) / (H + s - 2*f)
        else:
            D_n = s / 2

        # Far Focus Distance
        if s < H:
            D_f = (s * (H - f)) / (H - s)
        else:
            D_f = float('inf')

        # Total DOF
        DOF = D_f - D_n

        return {
            "focal_length_mm": f,
            "f_stop": N,
            "subject_distance_m": s / 1000,
            "sensor_type": sensor_type,
            "hyperfocal_distance_m": H / 1000,
            "near_focus_m": D_n / 1000,
            "far_focus_m": D_f / 1000 if D_f != float('inf') else "Infinity",
            "total_dof_m": DOF / 1000 if DOF != float('inf') else "Infinity",
            "dof_in_front_m": (s - D_n) / 1000,
            "dof_behind_m": (D_f - s) / 1000 if D_f != float('inf') else "Infinity"
        }

    def poker_preset_dof(self, shot_type: str) -> dict:
        """포커 방송 표준 샷별 DOF"""

        presets = {
            "table_wide": {
                "focal_length": 24,
                "f_stop": 5.6,
                "distance": 3.0,
                "description": "전체 테이블, 모든 플레이어 선명"
            },
            "player_medium": {
                "focal_length": 50,
                "f_stop": 4.0,
                "distance": 2.0,
                "description": "플레이어 클로즈업, 배경 약간 블러"
            },
            "player_tight": {
                "focal_length": 85,
                "f_stop": 2.8,
                "distance": 1.5,
                "description": "플레이어 얼굴, 배경 완전 블러"
            },
            "card_detail": {
                "focal_length": 100,
                "f_stop": 4.0,
                "distance": 0.5,
                "description": "카드 클로즈업, 텍스트 선명"
            },
            "chip_stack": {
                "focal_length": 85,
                "f_stop": 5.6,
                "distance": 1.0,
                "description": "칩 스택 전체 선명"
            }
        }

        if shot_type not in presets:
            return {"error": "Unknown shot type"}

        preset = presets[shot_type]
        dof = self.calculate_dof(
            preset["focal_length"],
            preset["f_stop"],
            preset["distance"]
        )

        dof["shot_type"] = shot_type
        dof["description"] = preset["description"]

        return dof
```

### 💡 자동 포커스 vs 수동 포커스

#### 자동 포커스 (AF) 시스템
```yaml
AF 모드:
  1. AF-S (Single AF):
     - 반셔터로 초점 고정
     - 정적 피사체
     - 포커 테이블 전체 샷

  2. AF-C (Continuous AF):
     - 피사체 추적
     - 움직이는 플레이어
     - 카드 배분 장면

  3. AF-A (Auto AF):
     - 상황 자동 판단
     - 비추천 (예측 불가)

AF 영역:
  - Wide Area: 전체 테이블
  - Zone Area: 특정 구역 (플레이어 Zone)
  - Center Point: 중앙 집중
  - Face Detection: 플레이어 얼굴
  - Eye AF: 플레이어 눈 (α7 series)

포커 방송 권장:
  일반 샷: AF-S + Face Detection
  액션 샷: AF-C + Zone Area
  클로즈업: Manual Focus (정밀 제어)
```

#### 수동 포커스 풀링 시스템
```python
import time
import math

class FocusPuller:
    """수동 포커스 풀링 시스템"""

    def __init__(self, camera_controller):
        self.camera = camera_controller
        self.focus_marks = {}  # 초점 마크 저장
        self.current_focus = 0.5  # 0.0 (near) ~ 1.0 (far)
        self.transition_speed = 0.05  # 전환 속도

    def set_focus_mark(self, mark_name: str, focus_value: float):
        """초점 마크 설정 (리허설 중)"""
        self.focus_marks[mark_name] = focus_value
        print(f"Focus mark '{mark_name}' set at {focus_value:.3f}")

    def pull_focus(self, from_mark: str, to_mark: str, duration_sec: float):
        """두 초점 마크 사이를 부드럽게 전환"""

        if from_mark not in self.focus_marks or to_mark not in self.focus_marks:
            raise ValueError("Focus marks not found")

        start_focus = self.focus_marks[from_mark]
        end_focus = self.focus_marks[to_mark]

        # 전환 곡선 (Ease In-Out)
        steps = int(duration_sec / 0.033)  # 30fps 기준

        for step in range(steps + 1):
            # Ease In-Out 곡선
            t = step / steps
            t_eased = self._ease_in_out(t)

            # 현재 초점 값
            current = start_focus + (end_focus - start_focus) * t_eased

            # 카메라에 적용
            self.camera.set_focus_position(current)
            self.current_focus = current

            time.sleep(0.033)

    def _ease_in_out(self, t: float) -> float:
        """Ease In-Out 곡선 (부드러운 가속/감속)"""
        if t < 0.5:
            return 2 * t * t
        else:
            return 1 - math.pow(-2 * t + 2, 2) / 2

    def setup_poker_focus_marks(self):
        """포커 테이블 표준 초점 마크 설정"""

        # 리허설: 각 위치에 초점 맞추고 저장
        marks = {
            "dealer": 0.45,       # 딜러 위치
            "player_1": 0.50,     # 플레이어 1번 (BTN)
            "player_2": 0.52,
            "player_3": 0.55,
            "player_4": 0.58,
            "player_5": 0.60,
            "player_6": 0.58,
            "player_7": 0.55,
            "player_8": 0.52,
            "community_cards": 0.47,  # 커뮤니티 카드
            "pot": 0.48              # 팟 (중앙)
        }

        for mark_name, focus_val in marks.items():
            self.set_focus_mark(mark_name, focus_val)

        print("Poker table focus marks configured")

    def execute_focus_sequence(self, sequence: list):
        """초점 시퀀스 실행"""

        for action in sequence:
            mark_from = action["from"]
            mark_to = action["to"]
            duration = action["duration"]
            pause = action.get("pause", 0)

            print(f"Focus pulling: {mark_from} → {mark_to} ({duration}s)")
            self.pull_focus(mark_from, mark_to, duration)

            if pause > 0:
                time.sleep(pause)
```

#### 포커 방송 포커스 시퀀스 예시
```python
# 올인 상황 포커스 시퀀스
all_in_focus_sequence = [
    {
        "from": "player_3",
        "to": "pot",
        "duration": 1.5,
        "pause": 2.0,
        "description": "올인 선언 → 팟으로 초점"
    },
    {
        "from": "pot",
        "to": "player_7",
        "duration": 1.0,
        "pause": 3.0,
        "description": "팟 → 상대 플레이어 리액션"
    },
    {
        "from": "player_7",
        "to": "community_cards",
        "duration": 1.2,
        "pause": 0,
        "description": "플레이어 → 커뮤니티 카드 (리버 대기)"
    }
]

# 실행
focus_puller = FocusPuller(camera_controller)
focus_puller.setup_poker_focus_marks()
focus_puller.execute_focus_sequence(all_in_focus_sequence)
```

### 🎯 실전 기법

#### Rack Focus (래크 포커스)
```markdown
정의: 한 피사체에서 다른 피사체로 초점을 빠르게 전환하여 시선을 유도하는 기법

포커 방송 활용:
1. 플레이어 → 상대 플레이어
   - 베팅 액션 후 상대 리액션
   - Duration: 0.8 ~ 1.2초

2. 플레이어 → 커뮤니티 카드
   - 플레이어 표정 → 카드 공개
   - Duration: 1.0 ~ 1.5초

3. 칩 스택 → 플레이어 얼굴
   - 올인 칩 → 플레이어 긴장감
   - Duration: 1.5 ~ 2.0초

주의사항:
- 너무 빠르면 시청자 혼란
- 너무 느리면 지루함
- 최적: 1.0 ~ 1.5초 (부드러운 전환)
```

#### Follow Focus (팔로우 포커스)
```markdown
정의: 움직이는 피사체를 따라가며 초점을 유지하는 기법

포커 방송 활용:
1. 카드 배분 장면
   - 딜러 손 → 플레이어 앞
   - 연속 초점 추적

2. 칩 푸시
   - 플레이어 칩 → 중앙 팟
   - 움직임에 맞춘 초점

3. 플레이어 이동
   - 자리 이동, 스트레칭
   - AF-C 모드 활용
```

### 📊 Focus Peaking 활용
```python
class FocusPeakingOverlay:
    """Focus Peaking 실시간 오버레이"""

    def __init__(self):
        self.peak_color = (0, 255, 0)  # 녹색
        self.threshold = 100

    def generate_overlay(self, frame: np.ndarray) -> np.ndarray:
        """초점 맞은 영역 하이라이트 생성"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, self.threshold, self.threshold * 2)

        overlay = frame.copy()
        overlay[edges > 0] = self.peak_color

        return cv2.addWeighted(frame, 0.7, overlay, 0.3, 0)
```

---

## Section 2: 영상 신호 및 표준

<a name="6-sdi-signal"></a>
## 6️⃣ SDI (Serial Digital Interface)

### 📘 정의
**SDI**는 방송용 비디오 및 오디오를 디지털 직렬 신호로 전송하는 표준 인터페이스입니다. SMPTE에 의해 정의되었으며, 프로페셔널 방송 환경에서 사실상의 표준으로 사용됩니다.

### 🔧 SDI 규격

#### SDI 세대별 규격
```yaml
SD-SDI (SMPTE 259M):
  해상도: 480i/576i
  비트레이트: 270 Mbps
  케이블: BNC, 75Ω
  최대 거리: 300m (Belden 1694A)
  상태: Legacy (레거시)

HD-SDI (SMPTE 292M):
  해상도: 1080i/1080p, 720p
  비트레이트: 1.485 Gbps, 1.485/1.001 Gbps
  케이블: BNC, 75Ω
  최대 거리: 100m (1080p60)
  사용: 현재 방송 표준

3G-SDI (SMPTE 424M):
  해상도: 1080p60, 2K
  비트레이트: 2.97 Gbps, 2.97/1.001 Gbps
  레벨:
    - Level A: 단일 링크 (1080p60)
    - Level B: 듀얼 링크 호환 (두 개의 1.5G)
  최대 거리: 100m
  사용: HD 고프레임, 2K

6G-SDI (SMPTE ST-2081):
  해상도: 1080p120, 4K30
  비트레이트: 6 Gbps
  최대 거리: 75m
  사용: 4K30, HFR HD

12G-SDI (SMPTE ST-2082):
  해상도: 4K60 (4096x2160)
  비트레이트: 12 Gbps
  최대 거리: 70m (단일 케이블)
  사용: 4K60 프로덕션 (현재 최고 규격)
```

#### 포커 방송 SDI 구성
```yaml
GGPoker 프로덕션 표준:
  카메라 출력: 3G-SDI (1080p50)
  스위처 입력: 3G-SDI
  스위처 출력 (PGM): 12G-SDI (4K50 업스케일)
  레코더 입력: 12G-SDI
  모니터 출력: 3G-SDI / HDMI

케이블 구성:
  카메라 → 스위처: Belden 1855A (3G/6G/12G 지원)
  길이: 평균 50m
  커넥터: Canare BCP-C77 (75Ω BNC)

리던던시:
  주 신호: SDI
  백업: NDI over IP (10GbE)
```

### 💡 SDI 신호 분석

#### SDI Eye Pattern 분석
```python
class SDIAnalyzer:
    """SDI 신호 품질 분석기"""

    def __init__(self, sdi_input_device):
        self.device = sdi_input_device
        self.jitter_threshold_ps = 740  # SMPTE 규격: < 0.2 UI (740ps @ 3G-SDI)
        self.amplitude_min = 800  # mV (±10%)
        self.amplitude_max = 880  # mV

    def analyze_eye_pattern(self) -> dict:
        """Eye Pattern 분석"""

        # 신호 샘플링
        samples = self.device.capture_samples(duration_ms=100)

        # Eye Opening 측정
        eye_height = self._measure_eye_height(samples)
        eye_width = self._measure_eye_width(samples)

        # Jitter 측정
        jitter_rms = self._measure_jitter_rms(samples)
        jitter_peak = self._measure_jitter_peak(samples)

        # Rise/Fall Time
        rise_time = self._measure_rise_time(samples)
        fall_time = self._measure_fall_time(samples)

        # 품질 평가
        quality = self._evaluate_quality(eye_height, eye_width, jitter_rms)

        return {
            "eye_height_mv": eye_height,
            "eye_width_ps": eye_width,
            "jitter_rms_ps": jitter_rms,
            "jitter_peak_ps": jitter_peak,
            "rise_time_ps": rise_time,
            "fall_time_ps": fall_time,
            "quality_score": quality,
            "pass_smpte": jitter_rms < self.jitter_threshold_ps
        }

    def _evaluate_quality(self, eye_height, eye_width, jitter) -> str:
        """신호 품질 평가"""

        if eye_height > 700 and eye_width > 500 and jitter < 500:
            return "Excellent"
        elif eye_height > 600 and eye_width > 400 and jitter < 700:
            return "Good"
        elif eye_height > 500 and eye_width > 300 and jitter < 740:
            return "Acceptable"
        else:
            return "Poor - Check cable/connections"

    def generate_report(self, analysis: dict) -> str:
        """분석 리포트 생성"""

        report = "=== SDI Signal Analysis Report ===\n\n"
        report += f"Eye Height: {analysis['eye_height_mv']:.1f} mV\n"
        report += f"Eye Width: {analysis['eye_width_ps']:.0f} ps\n"
        report += f"Jitter (RMS): {analysis['jitter_rms_ps']:.1f} ps\n"
        report += f"Jitter (Peak-Peak): {analysis['jitter_peak_ps']:.1f} ps\n"
        report += f"Rise Time: {analysis['rise_time_ps']:.0f} ps\n"
        report += f"Fall Time: {analysis['fall_time_ps']:.0f} ps\n\n"
        report += f"Quality: {analysis['quality_score']}\n"
        report += f"SMPTE Compliant: {'YES' if analysis['pass_smpte'] else 'NO'}\n"

        return report
```

#### SDI 클록 복원 (Clock Recovery)
```yaml
SDI 수신 프로세스:
  1. Cable Equalization:
     - 케이블 손실 보상
     - 고주파 성분 복원
     - Adaptive EQ 사용

  2. Clock Recovery:
     - PLL (Phase-Locked Loop)을 이용한 클록 추출
     - 임베디드 클록 신호 복원
     - Jitter 제거

  3. Data Deserializing:
     - 직렬 → 병렬 변환
     - 10-bit 워드 복원
     - Timing Reference Signals (TRS) 감지

  4. Error Detection:
     - CRC 체크섬 검증
     - Line Number/CRC (LN/CRC)
     - 에러 발생 시 알림
```

### 🎯 SDI 라우팅 매트릭스

```python
class SDIRouter:
    """SDI 라우팅 매트릭스 제어"""

    def __init__(self, router_ip: str):
        self.router_ip = router_ip
        self.input_count = 64
        self.output_count = 64
        self.routing_table = {}

    def route(self, input_num: int, output_num: int, level: str = "video+audio"):
        """입력을 출력으로 라우팅"""

        if not (1 <= input_num <= self.input_count):
            raise ValueError(f"Invalid input: {input_num}")

        if not (1 <= output_num <= self.output_count):
            raise ValueError(f"Invalid output: {output_num}")

        # Videohub 프로토콜 명령
        command = f"VIDEO OUTPUT ROUTING:\n{output_num-1} {input_num-1}\n\n"

        self._send_command(command)
        self.routing_table[output_num] = input_num

        print(f"Routed Input {input_num} → Output {output_num}")

    def get_routing_status(self) -> dict:
        """현재 라우팅 상태 조회"""

        status = {}
        for output, input_source in self.routing_table.items():
            status[f"Output_{output}"] = f"Input_{input_source}"

        return status

    def save_preset(self, preset_name: str):
        """현재 라우팅을 프리셋으로 저장"""

        preset = {
            "name": preset_name,
            "timestamp": time.time(),
            "routing": self.routing_table.copy()
        }

        # 프리셋 파일 저장
        with open(f"routing_presets/{preset_name}.json", "w") as f:
            json.dump(preset, f, indent=2)

        print(f"Routing preset '{preset_name}' saved")

    def recall_preset(self, preset_name: str):
        """프리셋 불러오기"""

        with open(f"routing_presets/{preset_name}.json", "r") as f:
            preset = json.load(f)

        # 모든 라우팅 적용
        for output, input_source in preset["routing"].items():
            self.route(input_source, output)

        print(f"Routing preset '{preset_name}' recalled")

# 포커 방송 라우팅 예시
router = SDIRouter("192.168.10.10")

# 메인 프로그램 라우팅
router.route(input_num=1, output_num=1)   # Camera 1 → Switcher Input 1
router.route(input_num=2, output_num=2)   # Camera 2 → Switcher Input 2
router.route(input_num=11, output_num=20) # Switcher PGM → Encoder
router.route(input_num=11, output_num=21) # Switcher PGM → Backup Recorder

# 프리셋 저장
router.save_preset("poker_tournament_main")
```

### 📊 SDI 모니터링

```python
import matplotlib.pyplot as plt
import numpy as np

class SDIMonitor:
    """SDI 신호 실시간 모니터링"""

    def __init__(self):
        self.history_length = 300  # 10초 @ 30fps
        self.signal_history = []

    def monitor_signal_quality(self, sdi_analyzer: SDIAnalyzer):
        """신호 품질 연속 모니터링"""

        while True:
            analysis = sdi_analyzer.analyze_eye_pattern()

            self.signal_history.append(analysis)
            if len(self.signal_history) > self.history_length:
                self.signal_history.pop(0)

            # 임계값 초과 시 경고
            if analysis["jitter_rms_ps"] > 700:
                self._send_alert(f"High jitter detected: {analysis['jitter_rms_ps']:.1f} ps")

            if analysis["eye_height_mv"] < 600:
                self._send_alert(f"Low signal amplitude: {analysis['eye_height_mv']:.1f} mV")

            time.sleep(0.1)  # 100ms

    def plot_jitter_trend(self):
        """Jitter 트렌드 그래프"""

        if len(self.signal_history) < 10:
            return

        times = range(len(self.signal_history))
        jitter_values = [h["jitter_rms_ps"] for h in self.signal_history]

        plt.figure(figsize=(12, 4))
        plt.plot(times, jitter_values, label="Jitter (RMS)")
        plt.axhline(y=740, color='r', linestyle='--', label="SMPTE Limit (740ps)")
        plt.xlabel("Sample")
        plt.ylabel("Jitter (ps)")
        plt.title("SDI Jitter Monitoring (Last 10 seconds)")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        return plt
```

---

<a name="7-hdmi-vs-sdi"></a>
## 7️⃣ HDMI vs SDI 비교

### 📘 정의
**HDMI**는 가전용 디지털 비디오/오디오 인터페이스이며, **SDI**는 방송용 프로페셔널 인터페이스입니다. 포커 프로덕션에서는 용도에 따라 구분하여 사용합니다.

### 🔧 상세 비교

#### 기술적 차이점
```yaml
HDMI (High-Definition Multimedia Interface):
  개발: Consumer Electronics 용
  신호: TMDS (Transition-Minimized Differential Signaling)
  커넥터: Type-A (표준), Type-C (미니), Type-D (마이크로)
  케이블: 4쌍 차동 신호선
  최대 거리:
    - HDMI 1.4: 15m (1080p)
    - HDMI 2.0: 10m (4K30)
    - HDMI 2.1: 5m (4K120, 8K60)
  확장: HDMI over Fiber (최대 100m+)

  장점:
    - 저렴한 가격
    - 널리 보급됨
    - HDCP 지원 (콘텐츠 보호)
    - CEC (기기 간 제어)
    - ARC/eARC (오디오 리턴)

  단점:
    - 짧은 케이블 길이
    - 핫플러그 시 신호 끊김
    - 레이턴시 (수십 ms)
    - 임베디드 타임코드 없음

SDI (Serial Digital Interface):
  개발: 방송 프로덕션 용
  신호: NRZ (Non-Return-to-Zero) 직렬
  커넥터: BNC (75Ω)
  케이블: RG-6 동축 케이블
  최대 거리:
    - HD-SDI: 100m
    - 3G-SDI: 100m
    - 12G-SDI: 70m
  확장: SDI over Fiber (최대 10km+)

  장점:
    - 긴 케이블 길이
    - 핫플러그 안전
    - 낮은 레이턴시 (<1ms)
    - 임베디드 오디오 (최대 16채널)
    - 타임코드 임베디드
    - 안정적인 클록 동기

  단점:
    - 비싼 가격
    - 전문 장비 필요
    - 소비자 기기 미지원
```

#### 포커 프로덕션 사용 가이드
```yaml
SDI 사용 권장:
  - 카메라 → 스위처
  - 스위처 → 레코더
  - 스위처 → 모니터 (TD, 감독)
  - 장거리 전송 (50m+)
  - 타임코드 동기 필수

HDMI 사용 가능:
  - 컴퓨터 그래픽 → 캡처 카드
  - 로컬 모니터 (프로듀서 데스크)
  - 프리뷰 모니터 (단거리)
  - 백업 레코더 (HDMI 입력만 있는 경우)

HDMI → SDI 변환:
  - Blackmagic Micro Converter
  - AJA Hi5-4K-Plus
  - Decimator MD-HX

2. 플레이어 → 커뮤니티 카드
   - 플레이어 표정 → 카드 공개
   - Duration: 1.0 ~ 1.5초

3. 칩 스택 → 플레이어 얼굴
   - 올인 칩 → 플레이어 긴장감
   - Duration: 1.5 ~ 2.0초

주의사항:
- 너무 빠르면 시청자 혼란
- 너무 느리면 지루함
- 최적: 1.0 ~ 1.5초 (부드러운 전환)
```

#### Follow Focus (팔로우 포커스)
```markdown
정의: 움직이는 피사체를 따라가며 초점을 유지하는 기법

포커 방송 활용:
1. 카드 배분 장면
   - 딜러 손 → 플레이어 앞
   - 연속 초점 추적

2. 칩 푸시
   - 플레이어 칩 → 중앙 팟
   - 움직임에 맞춘 초점

3. 플레이어 이동
   - 자리 이동, 스트레칭
   - AF-C 모드 활용

구현 (AF-C + 수동 보정):
```python
def follow_focus_with_assist(camera, af_mode="continuous"):
    """AF-C + 수동 보정 하이브리드"""

    # AF-C 활성화
    camera.set_af_mode("AF-C")
    camera.set_af_area("zone")  # 중앙 zone

    # 수동 보정 루프
    while True:
        # AF-C가 추적 중
        af_status = camera.get_af_status()

        if af_status["tracking_confidence"] < 0.7:
            # 추적 실패 시 수동 개입
            manual_adjust = calculate_manual_correction(
                af_status["current_focus"],
                af_status["subject_distance"]
            )
            camera.adjust_focus_offset(manual_adjust)

        time.sleep(0.033)  # 30fps
```
```

### 📊 초점 정확도 모니터링

```python
import cv2
import numpy as np

class FocusAccuracyMonitor:
    """초점 정확도 실시간 모니터링"""

    def __init__(self):
        self.focus_history = []
        self.sharpness_threshold = 0.6  # 0.0 ~ 1.0

    def measure_sharpness(self, frame: np.ndarray, roi=None) -> float:
        """프레임의 선명도 측정 (Laplacian 방법)"""

        # ROI 지정 (관심 영역만 측정)
        if roi:
            x, y, w, h = roi
            frame = frame[y:y+h, x:x+w]

        # Grayscale 변환
        if len(frame.shape) == 3:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        else:
            gray = frame

        # Laplacian edge detection
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        sharpness = laplacian.var()

        # 정규화 (0.0 ~ 1.0)
        sharpness_normalized = min(sharpness / 1000.0, 1.0)

        return sharpness_normalized

    def detect_focus_breathing(self, frames: list) -> dict:
        """포커스 브리딩 (초점 변화 시 화각 변화) 검출"""

        if len(frames) < 2:
            return {"breathing_detected": False}

        # 첫 프레임과 마지막 프레임 비교
        frame1 = frames[0]
        frame2 = frames[-1]

        # Feature 매칭으로 스케일 변화 측정
        orb = cv2.ORB_create()
        kp1, des1 = orb.detectAndCompute(frame1, None)
        kp2, des2 = orb.detectAndCompute(frame2, None)

        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matches = bf.match(des1, des2)

        # 매칭 거리 평균
        avg_distance = np.mean([m.distance for m in matches])

        breathing_detected = avg_distance > 50  # 임계값

        return {
            "breathing_detected": breathing_detected,
            "avg_match_distance": avg_distance,
            "recommendation": "Use lens with minimal focus breathing" if breathing_detected else "OK"
        }

    def generate_focus_peaking(self, frame: np.ndarray, color=(0, 255, 0)) -> np.ndarray:
        """Focus Peaking 오버레이 생성 (초점 맞은 영역 하이라이트)"""

        # Grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Edge detection
        edges = cv2.Canny(gray, 100, 200)

        # 결과 프레임에 색상 오버레이
        result = frame.copy()
        result[edges > 0] = color

        return result
```

---

<a name="5-ptz-camera"></a>
## 5️⃣ PTZ (Pan-Tilt-Zoom) 카메라

### 📘 정의
**PTZ 카메라**는 원격으로 Pan (좌우 회전), Tilt (상하 회전), Zoom (확대/축소)을 제어할 수 있는 카메라로, 포커 방송에서 FR7의 백업이나 보조 카메라로 활용됩니다.

### 🔧 기술 사양

#### PTZ vs FR7 비교
```yaml
PTZ 카메라 (예: Sony BRC-X1000):
  Pan: 360도 (속도: 0.3°/s ~ 300°/s)
  Tilt: ±30도 (속도: 0.25°/s ~ 300°/s)
  Zoom: 30x 광학 줌
  프리셋: 256개
  제어: VISCA over IP, RS-422
  가격: $5,000 ~ $8,000

  장점:
    - 저렴한 가격
    - 빠른 설치
    - 다양한 프리셋

  단점:
    - 화질 제한 (1080p)
    - 틸트 범위 좁음
    - 센서 크기 작음 (1/2.8")

FR7 로봇 카메라:
  Pan: 360도 무한 회전
  Tilt: ±210도
  Zoom: 렌즈 교체 가능
  프리셋: 99개
  제어: IP (REST API), RS-422
  가격: $25,000 ~ $35,000

  장점:
    - 고화질 (4K)
    - 넓은 틸트 범위
    - 풀프레임 센서
    - 렌즈 교환

  단점:
    - 높은 가격
    - 복잡한 설정
    - 유지보수 비용

포커 방송 권장 구성:
  메인 카메라: FR7 x 3대
  보조 카메라: PTZ x 2대
  백업 카메라: PTZ x 1대
```

#### PTZ 제어 프로토콜 (VISCA)
```python
import socket

class VISCAController:
    """VISCA over IP 프로토콜 PTZ 제어"""

    def __init__(self, camera_ip: str, port: int = 52381):
        self.camera_ip = camera_ip
        self.port = port
        self.socket = None
        self.camera_id = 1  # VISCA Address (1~7)

    def connect(self):
        """카메라 연결"""
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.camera_ip, self.port))
        print(f"Connected to PTZ camera at {self.camera_ip}:{self.port}")

    def disconnect(self):
        """연결 종료"""
        if self.socket:
            self.socket.close()

    def _send_command(self, command: bytes) -> bytes:
        """VISCA 명령 전송"""
        # VISCA 패킷 구조: Header + Command + Terminator
        packet = bytes([0x80 + self.camera_id]) + command + bytes([0xFF])

        self.socket.sendall(packet)
        response = self.socket.recv(1024)

        return response

    def pan_tilt(self, pan_speed: int, tilt_speed: int,
                 pan_pos: int, tilt_pos: int):
        """Pan/Tilt 절대 위치 이동"""

        # VISCA 명령: 8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF
        # VV: Pan speed (1~24)
        # WW: Tilt speed (1~20)
        # YYYY: Pan position (-1440 ~ +1440)
        # ZZZZ: Tilt position (-360 ~ +360)

        command = bytes([
            0x01, 0x06, 0x02,
            pan_speed & 0xFF,
            tilt_speed & 0xFF,
            (pan_pos >> 12) & 0x0F,
            (pan_pos >> 8) & 0x0F,
            (pan_pos >> 4) & 0x0F,
            pan_pos & 0x0F,
            (tilt_pos >> 12) & 0x0F,
            (tilt_pos >> 8) & 0x0F,
            (tilt_pos >> 4) & 0x0F,
            tilt_pos & 0x0F
        ])

        return self._send_command(command)

    def zoom(self, zoom_pos: int):
        """Zoom 절대 위치"""

        # VISCA 명령: 8x 01 04 47 0p 0p 0p 0p FF
        # pppp: Zoom position (0x0000 ~ 0x4000)

        command = bytes([
            0x01, 0x04, 0x47,
            (zoom_pos >> 12) & 0x0F,
            (zoom_pos >> 8) & 0x0F,
            (zoom_pos >> 4) & 0x0F,
            zoom_pos & 0x0F
        ])

        return self._send_command(command)

    def recall_preset(self, preset_number: int):
        """프리셋 호출"""

        # VISCA 명령: 8x 01 04 3F 02 pp FF
        # pp: Preset number (0~255)

        command = bytes([0x01, 0x04, 0x3F, 0x02, preset_number & 0xFF])

        return self._send_command(command)

    def save_preset(self, preset_number: int):
        """현재 위치를 프리셋으로 저장"""

        # VISCA 명령: 8x 01 04 3F 01 pp FF

        command = bytes([0x01, 0x04, 0x3F, 0x01, preset_number & 0xFF])

        return self._send_command(command)

    def get_position(self) -> dict:
        """현재 Pan/Tilt/Zoom 위치 조회"""

        # VISCA 명령: 8x 09 06 12 FF
        command = bytes([0x09, 0x06, 0x12])
        response = self._send_command(command)

        # 응답 파싱: y0 50 0p 0p 0p 0p 0t 0t 0t 0t 0z 0z 0z 0z FF
        if len(response) >= 15:
            pan = ((response[2] & 0x0F) << 12) | ((response[3] & 0x0F) << 8) | \
                  ((response[4] & 0x0F) << 4) | (response[5] & 0x0F)

            tilt = ((response[6] & 0x0F) << 12) | ((response[7] & 0x0F) << 8) | \
                   ((response[8] & 0x0F) << 4) | (response[9] & 0x0F)

            zoom = ((response[10] & 0x0F) << 12) | ((response[11] & 0x0F) << 8) | \
                   ((response[12] & 0x0F) << 4) | (response[13] & 0x0F)

            return {
                "pan": pan - 1440,  # 중앙 기준으로 변환
                "tilt": tilt - 360,
                "zoom": zoom
            }

        return {"error": "Invalid response"}

# 사용 예시
ptz = VISCAController("192.168.10.201")
ptz.connect()

# 테이블 전체 샷 (프리셋 1)
ptz.recall_preset(1)

# 플레이어 3번 클로즈업
ptz.pan_tilt(pan_speed=15, tilt_speed=15, pan_pos=450, tilt_pos=-50)
ptz.zoom(0x2000)  # 50% zoom

ptz.disconnect()
```

### 💡 PTZ 백업 시스템

```python
class PTZBackupSystem:
    """FR7 장애 시 PTZ 자동 전환"""

    def __init__(self):
        self.fr7_cameras = []
        self.ptz_cameras = []
        self.backup_mapping = {}

    def configure_backup(self, fr7_id: str, ptz_id: str):
        """FR7 - PTZ 백업 매핑"""
        self.backup_mapping[fr7_id] = ptz_id
        print(f"Backup configured: {fr7_id} → {ptz_id}")

    def monitor_fr7_health(self):
        """FR7 상태 모니터링"""

        while True:
            for fr7 in self.fr7_cameras:
                health = self._check_camera_health(fr7)

                if not health["online"]:
                    # FR7 장애 감지
                    print(f"FR7 {fr7.id} is offline! Activating backup...")
                    self._activate_ptz_backup(fr7.id)

            time.sleep(5)  # 5초마다 체크

    def _activate_ptz_backup(self, failed_fr7_id: str):
        """PTZ 백업 카메라 활성화"""

        ptz_id = self.backup_mapping.get(failed_fr7_id)
        if not ptz_id:
            print(f"No backup configured for {failed_fr7_id}")
            return

        # 1. PTZ 카메라 찾기
        ptz = self._get_ptz_camera(ptz_id)

        # 2. FR7의 마지막 프리셋 가져오기
        last_preset = self._get_last_fr7_preset(failed_fr7_id)

        # 3. PTZ를 유사한 위치로 이동
        ptz_preset = self._convert_fr7_to_ptz_preset(last_preset)
        ptz.recall_preset(ptz_preset)

        # 4. 비전 믹서에서 소스 전환
        self._switch_video_source(failed_fr7_id, ptz_id)

        # 5. 알림
        self._send_alert(f"Switched from FR7 {failed_fr7_id} to PTZ {ptz_id}")

    def _convert_fr7_to_ptz_preset(self, fr7_preset: dict) -> int:
        """FR7 프리셋을 PTZ 프리셋으로 변환"""

        # FR7 프리셋 매핑 테이블
        mapping = {
            "table_wide": 1,
            "player_1": 11,
            "player_2": 12,
            # ... 등등
            "community_cards": 20
        }

        return mapping.get(fr7_preset["name"], 1)  # 기본값 1
```

---

이제 나머지 섹션들을 이어서 작성하겠습니다. 문서가 매우 길어질 예정이므로, 계속 작성하겠습니다.
