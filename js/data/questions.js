// ========================================
// 코딩 MBTI - Questions Data
// 16가지 질문 데이터
// ========================================

const questions = [
    // 축 1: T(생각형) vs P(실행형) - Q1~Q4
    {
        id: 1,
        category: "문제 풀이 방법",
        question: "레고나 퍼즐을 할 때 나는?",
        options: [
            { label: "A", text: "설명서를 처음부터 끝까지 완벽히 읽고 이해한 뒤 시작해요", type: "T", score: 2 },
            { label: "B", text: "설명서를 먼저 훑어보고 큰 그림을 파악한 뒤 시작해요", type: "T", score: 1 },
            { label: "C", text: "설명서는 막힐 때만 보고 일단 만들어봐요", type: "P", score: 1 },
            { label: "D", text: "설명서 없이 내 방식대로 조립하는 게 더 재밌어요", type: "P", score: 2 }
        ]
    },
    {
        id: 2,
        category: "문제 풀이 방법",
        question: "수학 문제나 퀴즈를 풀 때 나는?",
        options: [
            { label: "A", text: "공식과 원리를 완전히 이해한 후에 문제를 풀어요", type: "T", score: 2 },
            { label: "B", text: "예제 풀이를 분석하고 방법을 익힌 뒤 풀어요", type: "T", score: 1 },
            { label: "C", text: "일단 풀어보고 틀리면 다른 방법을 시도해요", type: "P", score: 1 },
            { label: "D", text: "감으로 먼저 답을 예측하고 여러 방법을 실험해요", type: "P", score: 2 }
        ]
    },
    {
        id: 3,
        category: "문제 풀이 방법",
        question: "게임에서 새로운 스테이지를 만나면?",
        options: [
            { label: "A", text: "공략을 찾아보고 완벽한 전략을 세운 뒤 도전해요", type: "T", score: 2 },
            { label: "B", text: "먼저 패턴을 관찰하고 나만의 전략을 세워요", type: "T", score: 1 },
            { label: "C", text: "몇 번 해보면서 감을 잡고 방법을 찾아가요", type: "P", score: 1 },
            { label: "D", text: "일단 뛰어들어서 부딪히며 배우는 게 재밌어요", type: "P", score: 2 }
        ]
    },
    {
        id: 4,
        category: "문제 풀이 방법",
        question: "뭔가 잘 안 될 때 나는?",
        options: [
            { label: "A", text: "처음부터 차근차근 되짚으며 원인을 분석해요", type: "T", score: 2 },
            { label: "B", text: "어디서 잘못됐는지 논리적으로 추론해봐요", type: "T", score: 1 },
            { label: "C", text: "여기저기 바꿔보면서 해결책을 찾아요", type: "P", score: 1 },
            { label: "D", text: "아예 다른 방법으로 새롭게 시도해봐요", type: "P", score: 2 }
        ]
    },
    // 축 2: S(계획형) vs F(자유형) - Q5~Q8
    {
        id: 5,
        category: "정리 방법",
        question: "새로운 숙제나 프로젝트를 시작할 때?",
        options: [
            { label: "A", text: "상세한 계획표를 만들고 체크리스트로 관리해요", type: "S", score: 2 },
            { label: "B", text: "할 일 목록을 정리하고 순서를 정해요", type: "S", score: 1 },
            { label: "C", text: "대략적인 방향만 잡고 하면서 조정해요", type: "F", score: 1 },
            { label: "D", text: "계획 없이 바로 시작하고 흐름대로 진행해요", type: "F", score: 2 }
        ]
    },
    {
        id: 6,
        category: "정리 방법",
        question: "파일이나 공부 자료를 정리할 때?",
        options: [
            { label: "A", text: "폴더 구조와 이름 규칙을 정해서 체계적으로 관리해요", type: "S", score: 2 },
            { label: "B", text: "주제나 날짜별로 분류해서 나름 정리해요", type: "S", score: 1 },
            { label: "C", text: "크게 분류만 하고 세부 정리는 나중에 해요", type: "F", score: 1 },
            { label: "D", text: "검색하면 되니까 정리에 시간 쓰지 않아요", type: "F", score: 2 }
        ]
    },
    {
        id: 7,
        category: "정리 방법",
        question: "여행을 준비할 때 나는?",
        options: [
            { label: "A", text: "시간대별 일정과 예약을 완벽하게 계획해요", type: "S", score: 2 },
            { label: "B", text: "가볼 곳 리스트와 대략적인 동선을 준비해요", type: "S", score: 1 },
            { label: "C", text: "숙소만 정하고 나머지는 현지에서 정해요", type: "F", score: 1 },
            { label: "D", text: "무계획이 계획! 발길 닿는 대로 다녀요", type: "F", score: 2 }
        ]
    },
    {
        id: 8,
        category: "정리 방법",
        question: "내 방이나 책상 상태는?",
        options: [
            { label: "A", text: "모든 물건에 자리가 있고 항상 정돈되어 있어요", type: "S", score: 2 },
            { label: "B", text: "가끔 어지럽지만 주기적으로 깔끔하게 정리해요", type: "S", score: 1 },
            { label: "C", text: "좀 어지럽지만 내가 찾기엔 편한 상태예요", type: "F", score: 1 },
            { label: "D", text: "창의적인 혼돈! 어지러워도 상관없어요", type: "F", score: 2 }
        ]
    },
    // 축 3: I(혼자형) vs C(함께형) - Q9~Q12
    {
        id: 9,
        category: "공부 방법",
        question: "새로운 걸 배울 때 나는?",
        options: [
            { label: "A", text: "혼자 책이나 영상으로 깊이 파고드는 게 좋아요", type: "I", score: 2 },
            { label: "B", text: "혼자 먼저 공부하고 필요하면 질문해요", type: "I", score: 1 },
            { label: "C", text: "선생님이나 전문가에게 직접 배우는 게 좋아요", type: "C", score: 1 },
            { label: "D", text: "친구들과 함께 토론하며 배우는 게 제일 재밌어요", type: "C", score: 2 }
        ]
    },
    {
        id: 10,
        category: "공부 방법",
        question: "모르는 문제가 생기면?",
        options: [
            { label: "A", text: "끝까지 혼자 고민하고 검색해서 해결해요", type: "I", score: 2 },
            { label: "B", text: "한참 고민해보고 안 되면 찾아보거나 물어봐요", type: "I", score: 1 },
            { label: "C", text: "좀 고민하다가 아는 사람에게 물어봐요", type: "C", score: 1 },
            { label: "D", text: "바로 친구나 선생님과 같이 해결해요", type: "C", score: 2 }
        ]
    },
    {
        id: 11,
        category: "공부 방법",
        question: "공부할 때 가장 집중이 잘 되는 환경은?",
        options: [
            { label: "A", text: "아무도 없는 조용한 내 방이 최고예요", type: "I", score: 2 },
            { label: "B", text: "도서관처럼 조용하고 각자 집중하는 곳이 좋아요", type: "I", score: 1 },
            { label: "C", text: "카페처럼 적당한 소음과 사람이 있으면 좋아요", type: "C", score: 1 },
            { label: "D", text: "친구들과 함께 있으면 더 의욕이 생겨요", type: "C", score: 2 }
        ]
    },
    {
        id: 12,
        category: "공부 방법",
        question: "팀 프로젝트를 할 때 나는?",
        options: [
            { label: "A", text: "역할 분담 후 각자 완성해서 합치는 게 효율적이에요", type: "I", score: 2 },
            { label: "B", text: "내 파트는 혼자 집중해서 하고 가끔 공유해요", type: "I", score: 1 },
            { label: "C", text: "정기적으로 만나서 진행 상황을 나누며 해요", type: "C", score: 1 },
            { label: "D", text: "처음부터 끝까지 다 같이 모여서 하는 게 좋아요", type: "C", score: 2 }
        ]
    },
    // 축 4: E(안정형) vs N(신기술형) - Q13~Q16
    {
        id: 13,
        category: "도구 선택",
        question: "새로운 앱이나 프로그램을 고를 때?",
        options: [
            { label: "A", text: "오래되고 많은 사람이 쓰는 검증된 걸 선택해요", type: "E", score: 2 },
            { label: "B", text: "평점과 리뷰를 확인하고 안정적인 걸 골라요", type: "E", score: 1 },
            { label: "C", text: "새로 나온 거라도 기능이 좋으면 써봐요", type: "N", score: 1 },
            { label: "D", text: "새로운 앱을 제일 먼저 써보는 게 즐거워요", type: "N", score: 2 }
        ]
    },
    {
        id: 14,
        category: "도구 선택",
        question: "발표 자료를 만들 때 사용하는 도구는?",
        options: [
            { label: "A", text: "파워포인트처럼 모두가 쓰는 표준 도구가 편해요", type: "E", score: 2 },
            { label: "B", text: "익숙한 도구를 쓰되 가끔 새 기능을 써봐요", type: "E", score: 1 },
            { label: "C", text: "Canva 같은 새로운 도구를 적극적으로 활용해요", type: "N", score: 1 },
            { label: "D", text: "AI 도구 등 최신 기술을 먼저 시도해봐요", type: "N", score: 2 }
        ]
    },
    {
        id: 15,
        category: "도구 선택",
        question: "휴대폰 앱 업데이트 알림이 오면?",
        options: [
            { label: "A", text: "후기를 충분히 확인하고 안정화되면 업데이트해요", type: "E", score: 2 },
            { label: "B", text: "며칠 기다렸다가 문제없으면 업데이트해요", type: "E", score: 1 },
            { label: "C", text: "새 기능이 궁금해서 곧바로 업데이트해요", type: "N", score: 1 },
            { label: "D", text: "베타 버전도 신청해서 먼저 써보는 편이에요", type: "N", score: 2 }
        ]
    },
    {
        id: 16,
        category: "도구 선택",
        question: "유튜브나 SNS에서 주로 보는 콘텐츠는?",
        options: [
            { label: "A", text: "오랫동안 검증된 유명하고 유용한 콘텐츠", type: "E", score: 2 },
            { label: "B", text: "많은 사람들이 추천하는 인기 콘텐츠", type: "E", score: 1 },
            { label: "C", text: "요즘 뜨는 새로운 트렌드나 최신 정보", type: "N", score: 1 },
            { label: "D", text: "아직 유명하지 않은 새로운 분야 탐색", type: "N", score: 2 }
        ]
    }
];

export default questions;
