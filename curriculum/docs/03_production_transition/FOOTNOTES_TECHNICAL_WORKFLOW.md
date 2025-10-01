# 📚 기술 워크플로우 상세 각주 문서
## Chapter 3: Production Transition 완벽 해설서

---

## 📖 목차

1. [방송 워크플로우 용어](#방송-워크플로우-용어)
2. [편집 및 후반작업](#편집-및-후반작업)
3. [스트리밍 기술](#스트리밍-기술)
4. [데이터 관리](#데이터-관리)

---

## 방송 워크플로우 용어

### [1] Rundown (런다운)

**정의**
방송 전체 흐름을 시간 순서대로 정리한 프로그램 구성표. 큐시트보다 상위 레벨의 전체 구조 문서.

**런다운 vs 큐시트**
```yaml
Rundown (런다운):
  레벨: 매크로
  범위: 전체 방송 (12시간)
  단위: 세그먼트 (10-60분)
  목적: 전체 구조 파악
  사용자: 프로듀서, EP, 클라이언트

Cue Sheet (큐시트):
  레벨: 마이크로
  범위: 세그먼트별 (5-10분)
  단위: 샷 (5-30초)
  목적: 실시간 방송 실행
  사용자: 디렉터, TD, 크루
```

**런다운 구조**
```python
class BroadcastRundown:
    def __init__(self, event_name, date):
        self.event = event_name
        self.date = date
        self.segments = []

    def create_tournament_rundown(self):
        """
        포커 토너먼트 표준 런다운
        """
        rundown = {
            "SEGMENT_A": {
                "name": "Opening & Introduction",
                "time_start": "14:00:00",
                "duration": "00:05:00",
                "elements": [
                    {
                        "item": "Cold Open",
                        "duration": "0:30",
                        "camera": "Drone shot",
                        "audio": "Theme music",
                        "notes": "Venue establishing shot"
                    },
                    {
                        "item": "Title Sequence",
                        "duration": "0:45",
                        "camera": "Graphics",
                        "audio": "Music + VO",
                        "notes": "Event branding"
                    },
                    {
                        "item": "Host Welcome",
                        "duration": "2:00",
                        "camera": "Cam 1 (Host)",
                        "audio": "Host mic",
                        "notes": "Today's overview"
                    },
                    {
                        "item": "Player Intros",
                        "duration": "1:45",
                        "camera": "Multi-cam",
                        "audio": "VO + Music",
                        "notes": "Top 10 players"
                    }
                ]
            },

            "SEGMENT_B": {
                "name": "Early Tournament Action",
                "time_start": "14:05:00",
                "duration": "01:55:00",
                "elements": [
                    {
                        "item": "Live Table Coverage",
                        "duration": "110:00",
                        "camera": "FR7 system",
                        "audio": "Commentary team",
                        "notes": "Feature table focus"
                    },
                    {
                        "item": "First Break Bumper",
                        "duration": "0:30",
                        "camera": "Graphics",
                        "audio": "Music",
                        "notes": "Sponsor message"
                    }
                ]
            },

            "SEGMENT_C": {
                "name": "Dinner Break Programming",
                "time_start": "18:00:00",
                "duration": "01:00:00",
                "elements": [
                    {
                        "item": "Day Highlights",
                        "duration": "15:00",
                        "camera": "Edited package",
                        "audio": "Commentary VO",
                        "notes": "Pre-produced"
                    },
                    {
                        "item": "Player Interviews",
                        "duration": "20:00",
                        "camera": "Interview set",
                        "audio": "Interview mics",
                        "notes": "Live or taped"
                    },
                    {
                        "item": "Chip Count Analysis",
                        "duration": "10:00",
                        "camera": "Graphics + Host",
                        "audio": "Host + Analyst",
                        "notes": "Interactive graphics"
                    }
                ]
            }
        }

        return rundown

    def calculate_timing(self):
        """
        전체 타이밍 계산
        """
        total_planned = sum([s['duration'] for s in self.segments])
        buffer_time = total_planned * 0.15  # 15% 버퍼
        expected_end = self.start_time + total_planned + buffer_time

        return {
            "planned_duration": total_planned,
            "buffer": buffer_time,
            "expected_end": expected_end,
            "flexibility": "±30 minutes"
        }
```

**실시간 런다운 관리**
```yaml
타이밍 조정:
  상황: 토너먼트 진행이 예상보다 빠름
  문제: 예정된 끝 시간보다 2시간 일찍 종료 예상

  해결책:
    Option 1: 콘텐츠 확장
      - 인터뷰 시간 늘리기 (5분 → 15분)
      - 플레이어 백스토리 추가 (10분 x 3)
      - 심층 분석 세그먼트 (20분)
      - Q&A with pros (30분)

    Option 2: 하이라이트 재방송
      - 전날 하이라이트 (20분)
      - 명장면 모음 (15분)
      - 선수 프로필 (10분 x 2)

    Option 3: 라이브 콘텐츠 추가
      - 관객 인터뷰
      - 소셜 미디어 상호작용
      - 프로 플레이어 게스트

  상황: 예상보다 느림 (버블 3시간 지속)
  문제: 방송 시간 3시간 초과 예상

  해결책:
    - 하이라이트 패키지 축소/삭제
    - 브레이크 시간 최소화
    - 멀티 테이블 동시 화면으로 진행 가속
```

**런다운 소프트웨어**
```yaml
전문 도구:
  - Avid iNews
  - Ross OverDrive
  - Dalet
  - Imagine Communications Nexio

간단한 도구:
  - Excel / Google Sheets
  - Notion
  - Airtable
  - Custom scripts

필수 기능:
  ✓ 실시간 타이밍 계산
  ✓ 자동 색상 코드 (진행/대기/완료)
  ✓ 멀티 유저 동시 편집
  ✓ 버전 관리
  ✓ 모바일 접근
  ✓ 알림 시스템
```

---

### [2] Shot List (샷 리스트)

**정의**
촬영이 필요한 모든 샷을 목록화한 문서. 포커 방송에서는 주로 인서트 샷, B-roll, 인터뷰용으로 사용.

**포커 토너먼트 샷 리스트**
```
PRE-EVENT SHOTS (T-24h):
┌─────┬────────────────────┬──────┬─────────┬────────┐
│ No. │ Description        │ Cam  │ Duration│ Priority│
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 001 │ Venue Exterior     │ Drone│  2 min  │  P1    │
│     │ - Wide establishing│      │         │        │
│     │ - Signage closeup  │      │         │        │
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 002 │ Tournament Floor   │ Cam1 │  5 min  │  P1    │
│     │ - Empty tables     │      │         │        │
│     │ - Poker chips      │      │         │        │
│     │ - Dealer training  │      │         │        │
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 003 │ Production Setup   │ Cam2 │  3 min  │  P2    │
│     │ - Crew at work     │      │         │        │
│     │ - Equipment rig    │      │         │        │
│     │ - Control room     │      │         │        │
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 004 │ Player Arrivals    │ Cam3 │ 10 min  │  P1    │
│     │ - Red carpet style │      │         │        │
│     │ - Registration desk│      │         │        │
└─────┴────────────────────┴──────┴─────────┴────────┘

EVENT DAY B-ROLL:
┌─────┬────────────────────┬──────┬─────────┬────────┐
│ No. │ Description        │ Cam  │ Duration│ Priority│
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 101 │ Audience Reactions │ Cam4 │ Rolling │  P1    │
│     │ - Gasps, cheers    │      │         │        │
│     │ - Celebration shots│      │         │        │
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 102 │ Dealer Actions     │ Macro│ Rolling │  P2    │
│     │ - Shuffling closeup│      │         │        │
│     │ - Card dealing     │      │         │        │
│     │ - Chip stacking    │      │         │        │
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 103 │ Player Details     │ Cam5 │ Rolling │  P1    │
│     │ - Hands on cards   │      │         │        │
│     │ - Chip riffle      │      │         │        │
│     │ - Thinking faces   │      │         │        │
├─────┼────────────────────┼──────┼─────────┼────────┤
│ 104 │ Environmental      │ All  │ Rolling │  P3    │
│     │ - Venue atmosphere │      │         │        │
│     │ - Food & beverage  │      │         │        │
│     │ - Sponsor branding │      │         │        │
└─────┴────────────────────┴──────┴─────────┴────────┘
```

**인터뷰 샷 구성**
```yaml
표준 인터뷰 셋업:
  Camera A (메인):
    앵글: 3/4 (약간 측면)
    샷: Medium Close-Up
    높이: 눈높이
    조명: Key light + Fill
    초점: 눈
    배경: 토너먼트 플로어 (보케)

  Camera B (와이드):
    앵글: 정면
    샷: Medium Shot
    높이: 약간 위
    조명: Same as A
    초점: 전체
    배경: Same

  Camera C (리버스):
    앵글: 인터뷰어 어깨 너머
    샷: Over-the-shoulder
    높이: 눈높이
    용도: 편집용 컷어웨이

오디오:
  - 라발리에 마이크 (무선)
  - 붐 마이크 (백업)
  - 방향성 마이크 (환경음 제거)
```

---

## 편집 및 후반작업

### [3] Color Grading (컬러 그레이딩)

**정의**
영상의 색상, 명암, 채도를 조정하여 일관된 룩을 만들고 시각적 품질을 향상시키는 후반작업 프로세스.

**포커 방송 컬러 프로파일**
```yaml
GG Production 표준 LUT (Look-Up Table):
  이름: "GGP Poker Cinematic v2.1"

  특징:
    - Warm tone (따뜻한 느낌)
    - 약간 높은 대비
    - 풍부한 그린 펠트
    - 골드 칩 강조
    - 피부톤 자연스럽게

  기술 사양:
    Gamma: Rec.709
    Color Space: sRGB
    Black Level: 10 IRE
    White Point: 6500K
    Saturation: +10%
    Contrast: +15%

  스킨톤 보호:
    Range: 0° - 45° (hue wheel)
    Protection: High
    Detail: Maximum
```

**컬러 워크플로우**
```python
class ColorGradingWorkflow:
    def __init__(self):
        self.software = "DaVinci Resolve Studio"
        self.hardware = "Blackmagic UltraStudio 4K"

    def primary_correction(self, footage):
        """
        1차 컬러 보정 (기술적 보정)
        """
        steps = {
            "Step_1_Exposure": {
                "tool": "Lift-Gamma-Gain",
                "target": "중간 회색 18%",
                "method": "Waveform monitor",
                "goal": "올바른 노출"
            },

            "Step_2_White_Balance": {
                "tool": "Temperature/Tint",
                "target": "Neutral gray",
                "method": "Vectorscope",
                "goal": "정확한 색온도"
            },

            "Step_3_Contrast": {
                "tool": "Curves",
                "target": "0-100 IRE",
                "method": "Histogram",
                "goal": "다이나믹 레인지 최적화"
            },

            "Step_4_Saturation": {
                "tool": "Hue vs Sat",
                "target": "Natural but vivid",
                "method": "Vectorscope",
                "goal": "칩과 펠트 색상 강조"
            }
        }

        return steps

    def secondary_correction(self, footage):
        """
        2차 컬러 보정 (크리에이티브)
        """
        steps = {
            "Green_Felt_Enhancement": {
                "method": "HSL Qualifier",
                "hue_range": "80-140°",
                "adjustment": "Saturation +20%, Luminance +5%",
                "softness": "High (50)"
            },

            "Poker_Chips_Pop": {
                "method": "Luma Key",
                "range": "Highlights (70-100 IRE)",
                "adjustment": "Saturation +15%, Sharpness +10",
                "mask": "Chip area only"
            },

            "Player_Skin_Protection": {
                "method": "Skin Tone Qualifier",
                "range": "Orange-Red (0-45°)",
                "adjustment": "Saturation -5%, Smoothing +10",
                "preservation": "Natural look"
            },

            "Background_Dimming": {
                "method": "Power Window (Vignette)",
                "shape": "Soft circular",
                "adjustment": "Luminance -15%",
                "purpose": "Direct attention to table"
            }
        }

        return steps

    def apply_creative_grade(self):
        """
        크리에이티브 그레이딩
        """
        looks = {
            "Early_Day": {
                "mood": "Fresh, energetic",
                "temperature": "Neutral to cool",
                "contrast": "Medium",
                "saturation": "Normal"
            },

            "Late_Night": {
                "mood": "Intense, dramatic",
                "temperature": "Warm",
                "contrast": "High",
                "saturation": "Slightly elevated"
            },

            "Final_Table": {
                "mood": "Epic, cinematic",
                "temperature": "Warm gold",
                "contrast": "Very high",
                "saturation": "Rich",
                "special": "Light bloom on chips"
            }
        }

        return looks
```

**실시간 컬러 관리**
```yaml
라이브 방송 중:
  카메라 매칭:
    - 모든 FR7 카메라 동일 설정
    - Reference chart 사용 (X-Rite ColorChecker)
    - 정기 체크 (2시간마다)

  조명 일관성:
    - 색온도 5600K 고정
    - CRI 95+ LED 조명
    - 플리커 없음 확인

  모니터 캘리브레이션:
    - 모든 모니터 D65, Rec.709
    - 월 1회 캘리브레이션
    - Datacolor SpyderX 사용

후반작업:
  하이라이트 편집:
    - 컬러 그레이딩 30분
    - LUT 적용 + 미세 조정
    - 일관성 유지

  VOD 패키징:
    - HDR 버전 (선택)
    - SDR 버전 (필수)
    - 모바일 최적화
```

---

## 스트리밍 기술

### [4] CDN (Content Delivery Network)

**정의**
전 세계에 분산된 서버 네트워크를 통해 콘텐츠를 빠르고 안정적으로 전송하는 시스템.

**CDN 작동 원리**
```
┌──────────────┐
│ Origin Server│ (GG Production)
│ (Seoul)      │
└──────┬───────┘
       │
       ├─────────────────────────────────┐
       ↓                                 ↓
┌──────────────┐                 ┌──────────────┐
│ CDN Edge     │                 │ CDN Edge     │
│ (Tokyo)      │                 │ (Los Angeles)│
└──────┬───────┘                 └──────┬───────┘
       ↓                                 ↓
  [JP Viewers]                      [US Viewers]

장점:
  ✓ 지연시간 감소 (50-200ms → 10-50ms)
  ✓ 대역폭 비용 절감
  ✓ 원본 서버 부하 분산
  ✓ DDoS 공격 완화
  ✓ 99.99% 가용성
```

**멀티 CDN 전략**
```python
class MultiCDNStrategy:
    def __init__(self):
        self.providers = [
            "Cloudflare Stream",
            "AWS CloudFront",
            "Akamai",
            "Fastly"
        ]

    def cdn_selection_logic(self, viewer_location, time, load):
        """
        시청자별 최적 CDN 선택
        """
        rules = {
            "Primary": {
                "provider": "Cloudflare",
                "regions": ["APAC", "EU"],
                "load_threshold": "< 70%",
                "latency": "< 50ms"
            },

            "Secondary": {
                "provider": "AWS CloudFront",
                "regions": ["Americas"],
                "load_threshold": "< 80%",
                "latency": "< 100ms"
            },

            "Failover": {
                "trigger": [
                    "Primary latency > 200ms",
                    "Primary load > 85%",
                    "Primary uptime < 99%"
                ],
                "action": "Automatic switch to Secondary",
                "notification": "Alert ops team"
            }
        }

        # 실시간 선택 알고리즘
        if load > 0.85 or latency > 200:
            return "Switch to Secondary CDN"
        else:
            return "Continue Primary CDN"

    def cost_optimization(self):
        """
        CDN 비용 최적화
        """
        strategies = {
            "Traffic_Shaping": {
                "method": "Peak traffic to cheaper CDN",
                "saving": "20-30%"
            },

            "Regional_Routing": {
                "method": "Local CDN for local traffic",
                "saving": "15-25%"
            },

            "Compression": {
                "method": "Brotli compression",
                "saving": "30-40% bandwidth"
            },

            "Caching": {
                "method": "Aggressive caching (VOD)",
                "saving": "50-70% origin load"
            }
        }

        return strategies
```

**스트림 배포 아키텍처**
```yaml
인코더 → Origin → CDN → 시청자

┌─────────────────────────────────────────┐
│ ENCODING STAGE                          │
├─────────────────────────────────────────┤
│ OBS Studio / vMix                       │
│   ↓                                     │
│ Multi-bitrate encode:                   │
│   - 1080p60 @ 8Mbps                     │
│   - 720p30 @ 4Mbps                      │
│   - 480p @ 1.5Mbps                      │
│   - 360p @ 800Kbps                      │
└─────────────────────────────────────────┘
                ↓ RTMP/SRT
┌─────────────────────────────────────────┐
│ ORIGIN STAGE                            │
├─────────────────────────────────────────┤
│ Media Server (Wowza / Nimble)           │
│   ↓                                     │
│ Transcoding (if needed)                 │
│ ABR Packaging (HLS/DASH)                │
│   ↓                                     │
│ DRM (if premium content)                │
└─────────────────────────────────────────┘
                ↓ HTTP/HTTPS
┌─────────────────────────────────────────┐
│ CDN STAGE                               │
├─────────────────────────────────────────┤
│ Edge Servers (Global)                   │
│   ↓                                     │
│ Caching + Delivery                      │
│ Geo-routing                             │
│ Load balancing                          │
└─────────────────────────────────────────┘
                ↓ HTTP/HTTPS
┌─────────────────────────────────────────┐
│ PLAYER STAGE                            │
├─────────────────────────────────────────┤
│ Video Player (Video.js / JW Player)     │
│   ↓                                     │
│ ABR Logic (bandwidth detection)         │
│ Quality selection                       │
│ Buffer management                       │
└─────────────────────────────────────────┘
```

---

### [5] ABR (Adaptive Bitrate Streaming)

**정의**
시청자의 네트워크 상태에 따라 자동으로 비디오 품질을 조정하는 스트리밍 기술.

**ABR 작동 방식**
```python
class AdaptiveBitrateStreaming:
    def __init__(self):
        self.renditions = [
            {"resolution": "1080p60", "bitrate": 8000},
            {"resolution": "1080p30", "bitrate": 5000},
            {"resolution": "720p30", "bitrate": 3000},
            {"resolution": "480p", "bitrate": 1500},
            {"resolution": "360p", "bitrate": 800},
            {"resolution": "240p", "bitrate": 400}
        ]

    def bandwidth_detection(self):
        """
        대역폭 측정
        """
        method = {
            "Initial_Detection": {
                "method": "Download small chunks",
                "duration": "First 5 seconds",
                "samples": "3-5 chunks",
                "calculation": "Average throughput"
            },

            "Continuous_Monitoring": {
                "method": "Monitor download speed",
                "frequency": "Every 2-5 seconds",
                "metric": "Segment download time",
                "adjustment": "Increase/decrease quality"
            },

            "Buffer_Analysis": {
                "target_buffer": "10-30 seconds",
                "low_buffer": "< 5 seconds → reduce quality",
                "high_buffer": "> 20 seconds → increase quality",
                "panic_mode": "< 2 seconds → lowest quality"
            }
        }

        return method

    def quality_selection_algorithm(self, bandwidth, buffer, cpu):
        """
        품질 선택 알고리즘
        """
        # 1. 안전 마진 (20%)
        available_bandwidth = bandwidth * 0.8

        # 2. 렌디션 선택
        selected = None
        for rendition in sorted(self.renditions,
                              key=lambda x: x['bitrate'],
                              reverse=True):
            if rendition['bitrate'] < available_bandwidth:
                selected = rendition
                break

        # 3. 버퍼 상태 고려
        if buffer < 5:  # Low buffer
            # 더 낮은 품질로
            selected = self.renditions[-2]  # 360p

        elif buffer > 20:  # High buffer
            # 한 단계 높은 품질 시도 가능
            pass

        # 4. CPU 사용률 고려 (모바일)
        if cpu > 80:  # High CPU
            # 낮은 프레임레이트로
            selected = {"resolution": "720p30", "bitrate": 3000}

        return selected

    def switch_strategy(self):
        """
        품질 전환 전략
        """
        strategies = {
            "Conservative": {
                "up_switch": "Buffer > 15s AND 3 consecutive good segments",
                "down_switch": "Buffer < 8s OR 1 bad segment",
                "benefit": "안정적, 버퍼링 적음",
                "drawback": "품질 향상 느림"
            },

            "Aggressive": {
                "up_switch": "Buffer > 10s AND 1 good segment",
                "down_switch": "Buffer < 5s OR 2 consecutive bad",
                "benefit": "빠른 품질 향상",
                "drawback": "버퍼링 위험"
            },

            "Balanced": {
                "up_switch": "Buffer > 12s AND 2 good segments",
                "down_switch": "Buffer < 6s OR 1 bad segment",
                "benefit": "균형잡힌 경험",
                "drawback": "중간"
            }
        }

        # GG Production uses Balanced strategy
        return strategies["Balanced"]
```

**HLS vs DASH**
```yaml
HLS (HTTP Live Streaming):
  개발: Apple
  지원: iOS, macOS, Safari (네이티브)
  포맷: .m3u8 playlist + .ts segments
  지연: 6-30초 (설정에 따라)

  장점:
    ✓ 애플 기기 완벽 지원
    ✓ 간단한 구현
    ✓ 광범위한 CDN 지원

  단점:
    ✗ 안드로이드는 플레이어 필요
    ✗ 표준화 미흡

DASH (Dynamic Adaptive Streaming over HTTP):
  개발: MPEG 표준
  지원: Android, Chrome (네이티브)
  포맷: .mpd manifest + .m4s segments
  지연: 2-10초 (Low Latency DASH)

  장점:
    ✓ 국제 표준
    ✓ 더 낮은 지연 가능
    ✓ DRM 지원 우수

  단점:
    ✗ iOS는 플레이어 필요
    ✗ 약간 복잡한 구현

GG Production 전략:
  - Primary: HLS (더 넓은 호환성)
  - Secondary: DASH (안드로이드 최적화)
  - 둘 다 생성 (약간의 추가 비용)
```

---

## 데이터 관리

### [6] ETL (Extract, Transform, Load)

**정의**
데이터를 소스 시스템에서 추출(Extract)하고, 필요한 형식으로 변환(Transform)하며, 대상 시스템에 적재(Load)하는 데이터 처리 프로세스.

**포커 토너먼트 ETL**
```python
class PokerTournamentETL:
    def __init__(self):
        self.sources = ["RFID", "Tournament Software", "Manual Input"]
        self.target = "PostgreSQL Database"

    def extract_phase(self):
        """
        데이터 추출
        """
        extraction = {
            "RFID_System": {
                "source": "RFID Server API",
                "format": "JSON",
                "frequency": "Real-time (< 1s)",
                "data": [
                    "player_id",
                    "hole_cards",
                    "timestamp",
                    "table_id",
                    "hand_number"
                ],
                "volume": "~1000 records/hour"
            },

            "Tournament_Software": {
                "source": "Tournament Director DB",
                "format": "SQL Export",
                "frequency": "Every 5 minutes",
                "data": [
                    "player_standings",
                    "chip_counts",
                    "blinds_level",
                    "tables_remaining",
                    "players_remaining"
                ],
                "volume": "~200 records/interval"
            },

            "Manual_Input": {
                "source": "Production Team Interface",
                "format": "Web Form → JSON",
                "frequency": "Ad-hoc",
                "data": [
                    "player_interviews",
                    "notable_hands",
                    "production_notes",
                    "highlights_markers"
                ],
                "volume": "~50 records/day"
            }
        }

        return extraction

    def transform_phase(self):
        """
        데이터 변환
        """
        transformations = {
            "Data_Cleaning": {
                "null_handling": "Replace with defaults or skip",
                "duplicate_removal": "Based on composite key",
                "outlier_detection": "Statistical methods",
                "example": """
                    # 잘못된 칩 카운트 (음수) 제거
                    df = df[df['chip_count'] >= 0]

                    # 중복 핸드 제거
                    df = df.drop_duplicates(
                        subset=['hand_id', 'player_id']
                    )
                """
            },

            "Data_Enrichment": {
                "player_lookup": "Join with player master data",
                "historical_stats": "Calculate running statistics",
                "derived_fields": "M-ratio, chip%",
                "example": """
                    # M-ratio 계산
                    df['m_ratio'] = df['chip_count'] / (
                        df['sb'] + df['bb'] + df['ante'] * 9
                    )

                    # 칩 리더 대비 %
                    df['chip_pct'] = df['chip_count'] / \
                                     df['chip_count'].max() * 100
                """
            },

            "Data_Formatting": {
                "timestamp_conversion": "UTC → Local time",
                "currency_formatting": "Integer → $X,XXX",
                "enum_mapping": "Codes → Human-readable",
                "example": """
                    # 핸드 랭킹 코드 변환
                    hand_names = {
                        9: "Royal Flush",
                        8: "Straight Flush",
                        7: "Four of a Kind",
                        # ...
                    }
                    df['hand_name'] = df['hand_rank'].map(hand_names)
                """
            },

            "Aggregation": {
                "player_level": "Total hands, VPIP%, PFR%",
                "table_level": "Average pot, hands/hour",
                "tournament_level": "Chip distribution, pace",
                "example": """
                    # 플레이어별 통계
                    player_stats = df.groupby('player_id').agg({
                        'hand_id': 'count',  # 총 핸드
                        'vpip': 'mean',      # 평균 VPIP
                        'win': 'sum'         # 총 승수
                    })
                """
            }
        }

        return transformations

    def load_phase(self):
        """
        데이터 적재
        """
        loading = {
            "Target_Schema": {
                "database": "PostgreSQL 14",
                "schema": "poker_production",
                "tables": [
                    "tournaments",
                    "players",
                    "hands",
                    "actions",
                    "results",
                    "statistics"
                ]
            },

            "Loading_Strategy": {
                "real_time_data": {
                    "method": "Streaming insert",
                    "tool": "Kafka → PostgreSQL",
                    "latency": "< 2 seconds"
                },

                "batch_data": {
                    "method": "Bulk insert",
                    "frequency": "Every 5 minutes",
                    "size": "~1000 rows/batch"
                },

                "historical_data": {
                    "method": "COPY command",
                    "frequency": "Daily",
                    "size": "Millions of rows"
                }
            },

            "Error_Handling": {
                "validation": "Schema validation before insert",
                "retry": "3 attempts with exponential backoff",
                "dead_letter": "Failed records → error table",
                "alerting": "Slack notification on failure"
            },

            "Performance": {
                "indexing": "player_id, hand_id, timestamp",
                "partitioning": "By tournament_id",
                "compression": "TOAST for large text fields",
                "vacuuming": "Auto-vacuum enabled"
            }
        }

        return loading
```

**실시간 ETL 파이프라인**
```yaml
Architecture:

[RFID Server] ────┐
                   ├──> [Apache Kafka] ───> [Stream Processor]
[Tournament SW] ──┤                              │
                   │                              ↓
[Manual Input] ────┘                    [PostgreSQL]
                                                  │
                                                  ↓
                                         [Analytics Dashboard]
                                         [Broadcast Graphics]
                                         [VOD Metadata]

Components:

1. Kafka (Message Queue):
   - Topic: poker_events
   - Partitions: 10
   - Retention: 7 days
   - Throughput: 10k msgs/sec

2. Stream Processor (Apache Flink):
   - Real-time transformation
   - Stateful processing
   - Windowing (5 min tumbling)
   - Exactly-once semantics

3. PostgreSQL:
   - Tables partitioned by tournament
   - Read replicas for analytics
   - WAL streaming for backup

4. Redis Cache:
   - Current chip counts
   - Live leaderboard
   - TTL: 30 seconds
```

---

*최종 업데이트: 2024-10-15*
*작성자: GG Production Training Team*
*버전: 1.0*