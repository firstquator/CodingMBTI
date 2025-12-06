// ========================================
// 코딩 MBTI - Main Application
// ========================================

// Google Apps Script API URL
const API_URL = 'https://script.google.com/macros/s/AKfycbwqKTNRnrdZfneb8dmV3jzJrMAN89Pg9KvTi10CLKLLwSnNVCtmbR_WKnEqK9CRIg1R/exec';

// Google Sheet에 데이터 저장
async function saveTestResult(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', // CORS 우회
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log('데이터 저장 완료!');
        return true;
    } catch (error) {
        console.error('데이터 저장 실패:', error);
        return false;
    }
}

// 질문 데이터
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

// 16가지 유형 데이터
const mbtiTypes = {
    TSIE: {
        nickname: "튼튼한 설계자",
        description: "당신은 <strong>체계적이고 꼼꼼한 설계자</strong>예요! 문제를 만나면 먼저 충분히 생각하고, 계획을 세워서 차근차근 해결해 나가요. 혼자 집중해서 일하는 걸 좋아하고, 검증된 안정적인 도구를 선호해요. 큰 시스템을 설계하고 만드는 일에 딱 맞아요!",
        fields: ["서버 개발", "시스템 설계", "데이터베이스"],
        traits: {
            T: "생각형",
            S: "계획형",
            I: "혼자형",
            E: "안정형"
        }
    },
    TSIN: {
        nickname: "새로운 발견가",
        description: "당신은 <strong>호기심 넘치는 연구자</strong>예요! 논리적으로 생각하고 계획적으로 일하면서도, 새로운 기술과 방법을 탐구하는 걸 좋아해요. 혼자 깊이 파고드는 연구 스타일로, 인공지능이나 새로운 기술 분야에서 빛날 수 있어요!",
        fields: ["인공지능", "연구 개발", "데이터 과학"],
        traits: {
            T: "생각형",
            S: "계획형",
            I: "혼자형",
            N: "신기술형"
        }
    },
    TSCE: {
        nickname: "든든한 리더",
        description: "당신은 <strong>팀을 이끄는 든든한 리더</strong>예요! 체계적으로 계획을 세우고, 팀원들과 함께 협력하며 프로젝트를 완성해 나가요. 안정적인 방법을 선호하면서도 팀워크를 중요하게 생각해서, 대규모 프로젝트의 리더로 딱이에요!",
        fields: ["프로젝트 리더", "팀 개발", "대기업 개발팀"],
        traits: {
            T: "생각형",
            S: "계획형",
            C: "함께형",
            E: "안정형"
        }
    },
    TSCN: {
        nickname: "기술 선생님",
        description: "당신은 <strong>새로운 기술을 팀에 알려주는 멘토</strong>예요! 논리적으로 생각하고 체계적으로 계획하면서, 새로운 기술 트렌드도 놓치지 않아요. 팀원들과 지식을 나누는 걸 좋아해서, 기술 리더나 멘토 역할에 잘 어울려요!",
        fields: ["기술 리더", "테크 멘토", "교육 개발자"],
        traits: {
            T: "생각형",
            S: "계획형",
            C: "함께형",
            N: "신기술형"
        }
    },
    TFIE: {
        nickname: "만능 개발자",
        description: "당신은 <strong>뭐든 잘 해내는 만능 개발자</strong>예요! 논리적으로 생각하면서도 유연하게 적응할 수 있어요. 혼자서도 다양한 일을 척척 해내고, 안정적인 기술로 실용적인 결과물을 만들어내요. 풀스택 개발자로 딱이에요!",
        fields: ["풀스택 개발", "다양한 분야", "솔루션 개발"],
        traits: {
            T: "생각형",
            F: "자유형",
            I: "혼자형",
            E: "안정형"
        }
    },
    TFIN: {
        nickname: "스타트업 개척자",
        description: "당신은 <strong>혼자서도 뭐든 만들어내는 개척자</strong>예요! 논리적 사고와 유연한 실행력을 가지고 있고, 새로운 기술을 빠르게 배워서 적용해요. 1인 개발이나 스타트업 창업에 딱 맞는 스타일이에요!",
        fields: ["1인 개발", "스타트업 창업", "사이드 프로젝트"],
        traits: {
            T: "생각형",
            F: "자유형",
            I: "혼자형",
            N: "신기술형"
        }
    },
    TFCE: {
        nickname: "협력 전문가",
        description: "당신은 <strong>팀과 유연하게 협력하는 전문가</strong>예요! 논리적으로 생각하면서도 상황에 따라 유연하게 대응해요. 팀원들과 소통하며 일하는 걸 좋아하고, 검증된 방법으로 안정적인 결과를 만들어내요!",
        fields: ["팀 프로젝트", "애자일 개발", "협업 개발"],
        traits: {
            T: "생각형",
            F: "자유형",
            C: "함께형",
            E: "안정형"
        }
    },
    TFCN: {
        nickname: "혁신 주도자",
        description: "당신은 <strong>팀과 함께 새로운 것을 만드는 혁신가</strong>예요! 논리적 사고와 유연한 실행력으로 새로운 기술을 팀에 도입하고, 함께 혁신적인 프로젝트를 이끌어요. R&D나 혁신팀에서 빛날 수 있어요!",
        fields: ["혁신팀", "R&D", "신기술 개발"],
        traits: {
            T: "생각형",
            F: "자유형",
            C: "함께형",
            N: "신기술형"
        }
    },
    PSIE: {
        nickname: "실용적인 만들이",
        description: "당신은 <strong>실제로 쓸 수 있는 걸 만드는 실용주의자</strong>예요! 일단 해보면서 배우고, 체계적으로 정리하며 결과물을 완성해요. 혼자 집중해서 안정적인 앱이나 서비스를 만드는 데 딱 맞아요!",
        fields: ["앱 개발", "서비스 개발", "실용적인 도구 개발"],
        traits: {
            P: "실행형",
            S: "계획형",
            I: "혼자형",
            E: "안정형"
        }
    },
    PSIN: {
        nickname: "화면 디자이너",
        description: "당신은 <strong>예쁘고 편한 화면을 만드는 크리에이터</strong>예요! 실험적으로 도전하면서도 체계적으로 정리하고, 새로운 디자인 트렌드를 빠르게 적용해요. 프론트엔드나 UI/UX 분야에서 능력을 발휘할 수 있어요!",
        fields: ["프론트엔드", "UI/UX", "웹 디자인"],
        traits: {
            P: "실행형",
            S: "계획형",
            I: "혼자형",
            N: "신기술형"
        }
    },
    PSCE: {
        nickname: "협업 개발자",
        description: "당신은 <strong>팀과 함께 서버를 만드는 협업 전문가</strong>예요! 실행력 있게 일하면서도 계획적으로 정리하고, 팀원들과 소통하며 안정적인 시스템을 구축해요. 백엔드 팀 개발에 딱 맞는 스타일이에요!",
        fields: ["백엔드 팀 개발", "서버 개발", "API 개발"],
        traits: {
            P: "실행형",
            S: "계획형",
            C: "함께형",
            E: "안정형"
        }
    },
    PSCN: {
        nickname: "배포 전문가",
        description: "당신은 <strong>프로그램을 세상에 내보내는 배포 전문가</strong>예요! 실행력과 계획성을 갖추고, 팀과 협력하며 새로운 배포 도구와 기술을 적극 활용해요. DevOps나 인프라 분야에서 빛날 수 있어요!",
        fields: ["DevOps", "인프라", "클라우드"],
        traits: {
            P: "실행형",
            S: "계획형",
            C: "함께형",
            N: "신기술형"
        }
    },
    PFIE: {
        nickname: "자유 개발자",
        description: "당신은 <strong>혼자서 여러 프로젝트를 자유롭게 하는 개발자</strong>예요! 유연하게 실행하면서 다양한 일을 경험하고, 안정적인 기술로 결과물을 만들어내요. 프리랜서나 다양한 외주 프로젝트에 잘 어울려요!",
        fields: ["프리랜서", "다양한 외주", "멀티 프로젝트"],
        traits: {
            P: "실행형",
            F: "자유형",
            I: "혼자형",
            E: "안정형"
        }
    },
    PFIN: {
        nickname: "인디 크리에이터",
        description: "당신은 <strong>나만의 작품을 만드는 인디 크리에이터</strong>예요! 자유롭게 실험하고, 새로운 기술을 적극적으로 시도하며, 혼자만의 독특한 작품을 만들어내요. 인디 게임이나 개인 앱 개발에 딱 맞아요!",
        fields: ["인디 게임", "개인 앱", "크리에이티브 개발"],
        traits: {
            P: "실행형",
            F: "자유형",
            I: "혼자형",
            N: "신기술형"
        }
    },
    PFCE: {
        nickname: "팀 조율자",
        description: "당신은 <strong>팀이 잘 돌아가게 돕는 조율자</strong>예요! 유연하게 상황에 적응하면서 팀원들과 소통하고, 안정적인 방법으로 프로젝트를 이끌어요. 프로젝트 매니저나 스크럼마스터 역할에 딱 맞아요!",
        fields: ["프로젝트 매니저", "스크럼마스터", "팀 리드"],
        traits: {
            P: "실행형",
            F: "자유형",
            C: "함께형",
            E: "안정형"
        }
    },
    PFCN: {
        nickname: "스타트업 멤버",
        description: "당신은 <strong>빠르게 움직이는 팀에서 활약하는 멤버</strong>예요! 유연하고 빠른 실행력으로 새로운 기술을 적극 도입하고, 팀과 함께 빠르게 성장해요. 초기 스타트업 팀에서 최고의 능력을 발휘할 수 있어요!",
        fields: ["스타트업 팀원", "초기 멤버", "그로스 해커"],
        traits: {
            P: "실행형",
            F: "자유형",
            C: "함께형",
            N: "신기술형"
        }
    }
};

// 유형 설명 데이터
const typeDescriptions = {
    T: { name: "생각형", desc: "문제를 만나면 먼저 분석하고 계획을 세워요" },
    P: { name: "실행형", desc: "일단 해보면서 배우고 방법을 찾아요" },
    S: { name: "계획형", desc: "체계적으로 정리하고 순서대로 진행해요" },
    F: { name: "자유형", desc: "상황에 따라 유연하게 적응하며 진행해요" },
    I: { name: "혼자형", desc: "혼자 집중해서 깊이 파고드는 걸 좋아해요" },
    C: { name: "함께형", desc: "함께 배우고 소통하는 걸 좋아해요" },
    E: { name: "안정형", desc: "검증된 안정적인 도구와 방법을 선호해요" },
    N: { name: "신기술형", desc: "새로운 기술과 트렌드를 먼저 시도해요" }
};

// 앱 상태
let currentQuestion = 0;
let answers = [];
let userData = { name: '', age: '' };

// DOM 요소
const screens = {
    intro: document.getElementById('intro-screen'),
    question: document.getElementById('question-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen')
};

// 화면 전환
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// 인트로 화면 - 폼 제출
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('user-name');
    const ageInput = document.getElementById('user-age');
    let isValid = true;

    // 이름 검증
    if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
    } else {
        nameInput.classList.remove('error');
    }

    // 나이 검증
    if (!ageInput.value || ageInput.value < 1 || ageInput.value > 100) {
        ageInput.classList.add('error');
        isValid = false;
    } else {
        ageInput.classList.remove('error');
    }

    if (isValid) {
        userData.name = nameInput.value.trim();
        userData.age = parseInt(ageInput.value);
        startTest();
    }
});

// 입력 필드 에러 클래스 제거
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// 테스트 시작
function startTest() {
    currentQuestion = 0;
    answers = [];
    showScreen('question');
    renderQuestion();
}

// 질문 렌더링
function renderQuestion() {
    const question = questions[currentQuestion];
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const categoryEl = document.getElementById('question-category');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('btn-prev');

    // 진행률 업데이트
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;

    // 카테고리 & 질문 업데이트
    categoryEl.textContent = question.category;
    questionText.textContent = question.question;

    // 옵션 버튼 생성
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `
            <span class="option-label">${option.label}</span>
            <span class="option-text">${option.text}</span>
        `;

        // 이미 선택한 답변이 있으면 표시
        if (answers[currentQuestion] === index) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    // 이전 버튼 상태
    prevBtn.disabled = currentQuestion === 0;
}

// 옵션 선택
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;

    // 선택 표시
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === optionIndex);
    });

    // 다음 질문으로 (0.3초 딜레이)
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            showLoading();
        }
    }, 300);
}

// 이전 버튼
document.getElementById('btn-prev').addEventListener('click', function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

// 로딩 화면
function showLoading() {
    showScreen('loading');

    const loadingTexts = [
        "당신의 코딩 성향을 분석하고 있어요",
        "16가지 유형 중 당신과 맞는 유형을 찾고 있어요",
        "거의 다 됐어요!"
    ];

    let textIndex = 0;
    const loadingTextEl = document.getElementById('loading-text');

    const textInterval = setInterval(() => {
        textIndex++;
        if (textIndex < loadingTexts.length) {
            loadingTextEl.textContent = loadingTexts[textIndex];
        }
    }, 800);

    // 2.5초 후 결과 표시
    setTimeout(() => {
        clearInterval(textInterval);
        calculateResult();
    }, 2500);
}

// 결과 계산
function calculateResult() {
    const scores = {
        T: 0, P: 0,
        S: 0, F: 0,
        I: 0, C: 0,
        E: 0, N: 0
    };

    // 점수 계산
    answers.forEach((answerIndex, questionIndex) => {
        const option = questions[questionIndex].options[answerIndex];
        scores[option.type] += option.score;
    });

    // MBTI 유형 결정
    const type1 = scores.T >= scores.P ? 'T' : 'P';
    const type2 = scores.S >= scores.F ? 'S' : 'F';
    const type3 = scores.I >= scores.C ? 'I' : 'C';
    const type4 = scores.E >= scores.N ? 'E' : 'N';

    const mbtiCode = type1 + type2 + type3 + type4;

    // 결과 표시
    showResult(mbtiCode, scores);
}

// 결과 표시
function showResult(mbtiCode, scores) {
    const typeData = mbtiTypes[mbtiCode];

    // 기본 정보
    document.getElementById('result-type').textContent = mbtiCode;
    document.getElementById('result-nickname').textContent = typeData.nickname;
    document.getElementById('result-description').innerHTML = typeData.description;

    // 점수 바 렌더링
    const scoreBarsContainer = document.getElementById('score-bars');
    scoreBarsContainer.innerHTML = '';

    const scorePairs = [
        { left: 'T', right: 'P', leftLabel: '생각형', rightLabel: '실행형' },
        { left: 'S', right: 'F', leftLabel: '계획형', rightLabel: '자유형' },
        { left: 'I', right: 'C', leftLabel: '혼자형', rightLabel: '함께형' },
        { left: 'E', right: 'N', leftLabel: '안정형', rightLabel: '신기술형' }
    ];

    scorePairs.forEach(pair => {
        const total = scores[pair.left] + scores[pair.right];
        const leftPercent = total > 0 ? Math.round((scores[pair.left] / total) * 100) : 50;

        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <div class="score-labels">
                <span class="score-label-left">${pair.leftLabel} (${pair.left})</span>
                <span class="score-label-right">${pair.rightLabel} (${pair.right})</span>
            </div>
            <div class="score-bar-container">
                <div class="score-bar-fill" style="width: ${leftPercent}%"></div>
            </div>
            <div class="score-percentage">${leftPercent}% : ${100 - leftPercent}%</div>
        `;
        scoreBarsContainer.appendChild(scoreItem);
    });

    // 유형 설명 렌더링
    const typeExplanationContainer = document.getElementById('type-explanation');
    typeExplanationContainer.innerHTML = '';

    Object.entries(typeData.traits).forEach(([letter, name]) => {
        const typeItem = document.createElement('div');
        typeItem.className = 'type-item';
        typeItem.innerHTML = `
            <span class="type-letter">${letter}</span>
            <div class="type-info">
                <h4>${name}</h4>
                <p>${typeDescriptions[letter].desc}</p>
            </div>
        `;
        typeExplanationContainer.appendChild(typeItem);
    });

    // 추천 분야 렌더링
    const recommendationContainer = document.getElementById('recommendation-tags');
    recommendationContainer.innerHTML = '';

    typeData.fields.forEach(field => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = field;
        recommendationContainer.appendChild(tag);
    });

    // Google Sheet에 결과 저장
    const testData = {
        name: userData.name,
        age: userData.age,
        q1: questions[0].options[answers[0]]?.label || '',
        q2: questions[1].options[answers[1]]?.label || '',
        q3: questions[2].options[answers[2]]?.label || '',
        q4: questions[3].options[answers[3]]?.label || '',
        q5: questions[4].options[answers[4]]?.label || '',
        q6: questions[5].options[answers[5]]?.label || '',
        q7: questions[6].options[answers[6]]?.label || '',
        q8: questions[7].options[answers[7]]?.label || '',
        q9: questions[8].options[answers[8]]?.label || '',
        q10: questions[9].options[answers[9]]?.label || '',
        q11: questions[10].options[answers[10]]?.label || '',
        q12: questions[11].options[answers[11]]?.label || '',
        q13: questions[12].options[answers[12]]?.label || '',
        q14: questions[13].options[answers[13]]?.label || '',
        q15: questions[14].options[answers[14]]?.label || '',
        q16: questions[15].options[answers[15]]?.label || '',
        resultType: mbtiCode,
        nickname: typeData.nickname
    };
    saveTestResult(testData);

    showScreen('result');
}

// 다시 테스트
document.getElementById('btn-restart').addEventListener('click', function() {
    document.getElementById('user-name').value = '';
    document.getElementById('user-age').value = '';
    showScreen('intro');
});

// 결과 공유
document.getElementById('btn-share').addEventListener('click', function() {
    const resultType = document.getElementById('result-type').textContent;
    const nickname = document.getElementById('result-nickname').textContent;

    const shareText = `나의 코딩 MBTI는 ${resultType} - "${nickname}"! 🎯\n나는 어떤 스타일로 코딩할까? 코딩 MBTI 테스트로 알아보세요!`;

    if (navigator.share) {
        navigator.share({
            title: '코딩 MBTI 결과',
            text: shareText,
            url: window.location.href
        }).catch(console.log);
    } else {
        // 클립보드 복사
        navigator.clipboard.writeText(shareText + '\n' + window.location.href)
            .then(() => {
                alert('결과가 클립보드에 복사되었어요! 친구들에게 공유해보세요 🎉');
            })
            .catch(() => {
                alert('공유하기를 지원하지 않는 브라우저예요.');
            });
    }
});

// 테마 전환
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    if (newTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', newTheme);
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    showScreen('intro');
});
