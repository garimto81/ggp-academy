/**
 * GGP Academy - 퀴즈 데이터
 * 각 모듈별 Instant Check 퀴즈 데이터
 */

const QUIZ_DATABASE = {
  // ========================================
  // STEP 1: 포커 기초 이해
  // ========================================

  '1-1': {
    moduleId: '1-1',
    questions: [
      {
        type: 'multiple-choice',
        question: 'GGPoker가 WSOP와 독점 파트너십을 체결한 해는?',
        options: [
          '2014년',
          '2018년',
          '2020년',
          '2024년'
        ],
        correctAnswer: 2,
        explanation: '2020년 GGPoker는 WSOP 온라인 독점 파트너십을 체결하며 글로벌 1위 플랫폼으로 도약했습니다.',
        tip: '2020년은 COVID-19로 인해 온라인 포커가 급성장한 해이기도 합니다.'
      },
      {
        type: 'multiple-choice',
        question: '텍사스 홀덤에서 가장 강한 핸드는?',
        options: [
          'Straight Flush',
          'Royal Flush',
          'Four of a Kind',
          'Full House'
        ],
        correctAnswer: 1,
        explanation: 'Royal Flush (A-K-Q-J-10 같은 무늬)는 포커에서 가장 강력한 핸드입니다.',
        tip: 'Royal Flush 확률은 약 0.000154% (649,739:1) - 평생 한 번 보기도 어렵습니다!'
      },
      {
        type: 'scenario',
        question: '현장에서 다음 상황이 발생했습니다. 올바른 대응은?',
        context: '🎬 현장 상황',
        scenario: `
          <div class="space-y-2">
            <p><strong>플레이어 A:</strong> "All-in!" (큰 소리로 외침)</p>
            <p><strong>플레이어 B:</strong> (긴 고민 시작)</p>
            <p><strong>TD:</strong> (토키로) "카메라 준비"</p>
          </div>
        `,
        options: [
          '그냥 평소처럼 촬영한다',
          'TD 지시를 기다린다',
          '즉시 All-in 플레이어를 클로즈업하고 PM에게 알린다',
          'Final Table만 촬영하면 된다'
        ],
        correctAnswer: 2,
        explanation: 'All-in은 드라마틱한 순간입니다. 즉시 클로즈업으로 플레이어의 표정을 잡고, PM에게 상황을 알려 방송에 반영되도록 해야 합니다.',
        tip: 'All-in 순간은 3가지를 동시에: ① 클로즈업 ② PM 알림 ③ 상대 플레이어 반응 대기'
      }
    ]
  },

  '1-2': {
    moduleId: '1-2',
    questions: [
      {
        type: 'multiple-choice',
        question: '"UTG"는 어떤 포지션인가요?',
        options: [
          'Under The Gun - 딜러 버튼 다음 자리',
          'Under The Gun - 빅 블라인드 다음 자리 (첫 번째 액션)',
          'Upper Table Game - 메인 테이블',
          'Ultimate Texas Game - 특수 규칙'
        ],
        correctAnswer: 1,
        explanation: 'UTG (Under The Gun)는 Big Blind 다음 자리로, Pre-flop에서 가장 먼저 액션해야 하는 불리한 포지션입니다.',
        tip: 'UTG는 "총구 아래"라는 뜻으로, 가장 압박받는 자리라는 의미입니다.'
      },
      {
        type: 'multiple-choice',
        question: '다음 중 "3-bet"의 정확한 의미는?',
        options: [
          '세 번째 베팅',
          '리레이즈 (Re-raise)',
          '3배 베팅',
          '세 명이 베팅'
        ],
        correctAnswer: 1,
        explanation: '3-bet은 리레이즈를 의미합니다. Blind(1st bet) → Raise(2nd bet) → Re-raise(3rd bet = 3-bet)',
        tip: '4-bet, 5-bet도 같은 논리로 이어집니다. 현장에서 자주 듣게 될 용어입니다!'
      },
      {
        type: 'priority',
        question: 'PM이 토키로 "Table 3, UTG raise, BB 3-bet, original raiser 4-bet"이라고 말했습니다. 액션 순서를 올바르게 배열하세요.',
        options: [
          'UTG가 레이즈',
          'BB가 리레이즈 (3-bet)',
          'UTG가 다시 리레이즈 (4-bet)',
          'Blind 포스트'
        ],
        correctAnswer: [3, 0, 1, 2], // 순서: Blind → UTG raise → BB 3-bet → UTG 4-bet
        explanation: '포커는 Blind 포스트 → UTG 레이즈 → BB 리레이즈(3-bet) → UTG 리리레이즈(4-bet) 순서로 진행됩니다.',
        tip: '현장에서는 이런 복잡한 베팅 시퀀스를 실시간으로 이해하고 촬영해야 합니다!'
      }
    ]
  },

  '1-3': {
    moduleId: '1-3',
    questions: [
      {
        type: 'multiple-choice',
        question: '토너먼트에서 "Bubble"이란?',
        options: [
          '상금권 진입 직전 상황',
          '토너먼트 시작 전 대기 시간',
          '블라인드가 2배로 오르는 시점',
          'Final Table 진입 순간'
        ],
        correctAnswer: 0,
        explanation: 'Bubble은 상금권 진입 직전을 의미합니다. 예: 100명 중 10명에게 상금 → 11등이 Bubble',
        tip: 'Bubble 순간은 극도로 긴장된 분위기! 촬영 시 모든 테이블을 주시해야 합니다.'
      },
      {
        type: 'multiple-choice',
        question: '"Day 1A", "Day 1B"의 의미는?',
        options: [
          '토너먼트 첫날 A조, B조',
          '동일한 Day 1을 여러 번 진행 (플라이트)',
          '서로 다른 토너먼트',
          'A는 온라인, B는 오프라인'
        ],
        correctAnswer: 1,
        explanation: 'Day 1A, 1B는 동일한 토너먼트를 여러 번(플라이트)으로 나눠 진행하는 것입니다. 참가자는 원하는 플라이트를 선택할 수 있습니다.',
        tip: 'WSOP 같은 대형 토너먼트는 Day 1을 여러 플라이트로 나눠 수천 명을 소화합니다.'
      },
      {
        type: 'scenario',
        question: 'TD가 "5분 후 블라인드 레벨 올라갑니다"라고 공지했습니다. 카메라맨의 대응은?',
        scenario: `
          <div class="space-y-2">
            <p><strong>현재:</strong> Blinds 1,000/2,000</p>
            <p><strong>다음:</strong> Blinds 1,500/3,000</p>
            <p><strong>상황:</strong> 여러 테이블에서 동시에 올인 발생 가능</p>
          </div>
        `,
        options: [
          '그냥 현재 테이블만 계속 촬영',
          'PM에게 블라인드 변경 알림 + 주요 테이블 (쇼트스택) 주시',
          '블라인드 변경은 TD 업무라 신경 안 씀',
          'Final Table만 블라인드 변경 중요함'
        ],
        correctAnswer: 1,
        explanation: '블라인드 상승 직전은 쇼트스택 플레이어들이 올인하는 타이밍입니다. PM에게 알리고, 칩이 적은 테이블을 주시해야 합니다.',
        tip: '블라인드 상승 = 액션 폭발 타이밍! 특히 Bubble 직전이면 더욱 중요합니다.'
      }
    ]
  },

  '1-4': {
    moduleId: '1-4',
    questions: [
      {
        type: 'multiple-choice',
        question: '"Bad Beat"의 의미는?',
        options: [
          '매우 강한 패가 더 강한 패에게 진 상황',
          '플레이를 잘못한 경우',
          '블러핑에 걸린 경우',
          '시간 내에 액션하지 못한 경우'
        ],
        correctAnswer: 0,
        explanation: 'Bad Beat은 통계적으로 이길 확률이 높았던 강한 패가 역전당한 상황입니다. (예: Full House가 Four of a Kind에게 패배)',
        tip: 'Bad Beat은 방송 골드 콘텐츠! 플레이어의 감정 폭발을 놓치지 마세요.'
      },
      {
        type: 'scenario',
        question: '다음 상황에서 카메라가 우선적으로 잡아야 할 것은?',
        scenario: `
          <div class="space-y-2">
            <p><strong>상황:</strong> River 카드 오픈</p>
            <p><strong>플레이어 A:</strong> All-in (표정 굳음)</p>
            <p><strong>플레이어 B:</strong> 긴 고민 중</p>
            <p><strong>팟:</strong> $500,000 (역대급)</p>
          </div>
        `,
        options: [
          'River 카드 클로즈업',
          '플레이어 B의 고민하는 표정',
          '팟의 칩 더미',
          '플레이어 A의 긴장된 표정'
        ],
        correctAnswer: 1,
        explanation: '고민하는 순간의 표정과 제스처가 가장 드라마틱한 콘텐츠입니다. River 카드는 이미 오픈되었고, 이제 결정의 순간입니다.',
        tip: '고민의 순간 = 스토리텔링의 정점! 시청자도 함께 고민하게 만드는 장면입니다.'
      },
      {
        type: 'priority',
        question: 'Final Table 우승 결정 순간, 촬영 우선순위를 올바르게 배열하세요.',
        options: [
          '우승자의 환호 표정',
          '핸드 공개 (쇼다운)',
          '상대방의 패배 순간 표정',
          '우승 트로피 전달'
        ],
        correctAnswer: [1, 0, 2, 3], // 핸드 공개 → 우승자 환호 → 패배자 표정 → 트로피
        explanation: '① 핸드 공개(승부 결정) → ② 우승자 환호 → ③ 패배자 아쉬움 → ④ 트로피 전달 순서로 스토리를 완성합니다.',
        tip: '우승 순간은 리허설이 없습니다! 놓치면 다시 찍을 수 없으니 시퀀스를 미리 숙지하세요.'
      }
    ]
  },

  // ========================================
  // STEP 2: GGP 팀 이해
  // ========================================

  '2-1': {
    moduleId: '2-1',
    questions: [
      {
        type: 'multiple-choice',
        question: 'GGPoker가 설립된 해는?',
        options: ['2010년', '2014년', '2018년', '2020년'],
        correctAnswer: 1,
        explanation: 'GGPoker는 2014년에 설립되어 혁신적인 기술로 빠르게 성장했습니다.',
        tip: '설립 10년 만에 세계 1위 온라인 포커 플랫폼이 되었습니다!'
      },
      {
        type: 'multiple-choice',
        question: 'GG Production이 연간 제작하는 이벤트 수는?',
        options: ['50+ 이벤트', '100+ 이벤트', '300+ 이벤트', '500+ 이벤트'],
        correctAnswer: 2,
        explanation: 'GG Production은 연간 300개 이상의 글로벌 포커 이벤트를 제작합니다.',
        tip: '거의 매일 어딘가에서 GGP의 이벤트가 진행되고 있습니다!'
      },
      {
        type: 'scenario',
        question: '신규 입사자로서 첫 미팅에서 할 질문으로 가장 적절한 것은?',
        scenario: `
          <div class="space-y-2">
            <p><strong>상황:</strong> 팀 소개 미팅</p>
            <p><strong>참석자:</strong> PM, 카메라 팀장, 기술 팀장</p>
          </div>
        `,
        options: [
          '연봉 협상은 언제 하나요?',
          '다음 촬영 일정과 제가 준비해야 할 것은 무엇인가요?',
          '야근은 얼마나 자주 하나요?',
          '포커를 배워야 하나요?'
        ],
        correctAnswer: 1,
        explanation: '적극적이고 프로페셔널한 질문이 좋은 인상을 줍니다. 다음 일정과 준비사항을 묻는 것이 가장 적절합니다.',
        tip: '첫인상이 중요합니다! 열정과 준비성을 보여주세요.'
      }
    ]
  },

  '2-2': {
    moduleId: '2-2',
    questions: [
      {
        type: 'multiple-choice',
        question: 'GGP 프로덕션팀에서 카메라 파트의 주요 역할은?',
        options: [
          '편집만 담당',
          '현장 촬영 및 실시간 송출',
          '토너먼트 운영',
          '해설 진행'
        ],
        correctAnswer: 1,
        explanation: '카메라 파트는 현장 촬영과 실시간 송출을 담당합니다.',
        tip: '카메라맨은 감독의 눈! 놓치면 안 되는 순간을 포착하는 역할입니다.'
      },
      {
        type: 'priority',
        question: '현장에서 문제 발생 시 보고 순서를 올바르게 배열하세요.',
        options: [
          '현장 팀장에게 보고',
          'PM에게 보고',
          '문제 파악 및 즉시 대응',
          '사후 보고서 작성'
        ],
        correctAnswer: [2, 0, 1, 3], // 문제 파악 → 팀장 → PM → 보고서
        explanation: '① 문제 파악/즉시 대응 → ② 현장 팀장 보고 → ③ PM 보고 → ④ 사후 보고서 작성',
        tip: '긴급 상황에서는 보고보다 대응이 우선! 단, 즉시 팀장에게도 알려야 합니다.'
      },
      {
        type: 'scenario',
        question: '카메라 장비 고장 발생! 올바른 대응은?',
        scenario: `
          <div class="space-y-2">
            <p><strong>상황:</strong> Final Table 진행 중</p>
            <p><strong>문제:</strong> 메인 카메라 배터리 방전 (백업 없음)</p>
            <p><strong>시간:</strong> 우승 결정까지 10분 예상</p>
          </div>
        `,
        options: [
          '포기하고 다른 카메라만 사용',
          '즉시 팀장에게 보고하고, 서브 카메라를 메인으로 전환, 백업 배터리 요청',
          'TD에게 게임 중단 요청',
          '관객에게 배터리 빌리기'
        ],
        correctAnswer: 1,
        explanation: '즉시 보고 + 대안 실행(서브를 메인으로) + 백업 요청이 정답입니다. 게임 중단은 최후의 수단입니다.',
        tip: '현장에서는 Plan B, C까지 항상 준비되어 있어야 합니다!'
      }
    ]
  },

  // 더 많은 모듈 퀴즈는 필요시 추가...
  // 현재는 1-1 ~ 2-2까지 샘플로 구현
};

/**
 * 퀴즈 데이터 가져오기
 */
function getQuizData(moduleId) {
  return QUIZ_DATABASE[moduleId] || null;
}

/**
 * Export
 */
window.QUIZ_DATABASE = QUIZ_DATABASE;
window.getQuizData = getQuizData;
