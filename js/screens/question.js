// ========================================
// 코딩 MBTI - Question Screen
// 질문 화면 로직
// ========================================

import questions from '../data/questions.js';

let currentQuestion = 0;
let answers = [];
let onCompleteCallback = null;

/**
 * 질문 화면 초기화
 * @param {Function} onComplete - 질문 완료 시 콜백 함수
 * @param {Function} onGoHome - 홈으로 돌아가기 콜백 함수
 */
export function initQuestionScreen(onComplete, onGoHome) {
    onCompleteCallback = onComplete;

    // 이전 버튼
    document.getElementById('btn-prev').addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    });

    // 다음 버튼
    document.getElementById('btn-next').addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            onCompleteCallback(answers);
        }
    });

    // 처음으로 버튼
    document.getElementById('btn-home').addEventListener('click', function() {
        if (confirm('처음으로 돌아가시겠어요?\n진행 중인 테스트가 초기화됩니다.')) {
            resetQuestionScreen();
            onGoHome();
        }
    });
}

/**
 * 테스트 시작 - 질문 화면 리셋 및 첫 질문 렌더링
 */
export function startTest() {
    currentQuestion = 0;
    answers = [];
    renderQuestion();
}

/**
 * 질문 화면 리셋
 */
export function resetQuestionScreen() {
    currentQuestion = 0;
    answers = [];
}

/**
 * 질문 렌더링
 */
export function renderQuestion() {
    const question = questions[currentQuestion];
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const categoryEl = document.getElementById('question-category');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

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

    // 다음 버튼 상태 - 이미 답변한 질문이면 표시
    if (answers[currentQuestion] !== undefined) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = currentQuestion < questions.length - 1 ? '다음 →' : '결과 보기 →';
    } else {
        nextBtn.style.display = 'none';
    }
}

/**
 * 옵션 선택 처리
 * @param {number} optionIndex - 선택한 옵션 인덱스
 */
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;

    // 선택 표시
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === optionIndex);
    });

    // 다음 버튼 표시
    const nextBtn = document.getElementById('btn-next');
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = currentQuestion < questions.length - 1 ? '다음 →' : '결과 보기 →';

    // 다음 질문으로 (0.4초 딜레이)
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            onCompleteCallback(answers);
        }
    }, 400);
}

/**
 * 현재 답변 목록 반환
 * @returns {Array} - 답변 배열
 */
export function getAnswers() {
    return answers;
}

export default { initQuestionScreen, startTest, resetQuestionScreen, renderQuestion, getAnswers };
