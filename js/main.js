// ========================================
// 코딩 MBTI - Main Application
// 앱 초기화 및 화면 전환 관리
// ========================================

import { initTheme, toggleTheme } from './utils/theme.js';
import { initIntroScreen, resetIntroForm } from './screens/intro.js';
import { initQuestionScreen, startTest, resetQuestionScreen, getAnswers } from './screens/question.js';
import { showLoading, resetLoadingText } from './screens/loading.js';
import { initResultScreen, calculateResult, showResult } from './screens/result.js';

// ========================================
// 앱 상태
// ========================================
const userData = { name: '', age: '' };

// ========================================
// DOM 요소 - 화면
// ========================================
const screens = {
    intro: document.getElementById('intro-screen'),
    question: document.getElementById('question-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen')
};

// ========================================
// 화면 전환 함수
// ========================================
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// ========================================
// 화면 전환 콜백 함수들
// ========================================

/**
 * 테스트 시작 콜백
 */
function handleStartTest() {
    showScreen('question');
    startTest();
}

/**
 * 홈으로 돌아가기 콜백
 */
function handleGoHome() {
    resetIntroForm();
    showScreen('intro');
}

/**
 * 질문 완료 콜백
 * @param {Array} answers - 답변 배열
 */
function handleQuestionsComplete(answers) {
    showScreen('loading');
    resetLoadingText();

    showLoading(() => {
        const { mbtiCode, scores } = calculateResult(answers);
        showResult(mbtiCode, scores, userData, answers);
        showScreen('result');
    });
}

/**
 * 다시 시작 콜백
 */
function handleRestart() {
    resetIntroForm();
    resetQuestionScreen();
    showScreen('intro');
}

// ========================================
// 앱 초기화
// ========================================
function initApp() {
    // 테마 초기화
    initTheme();

    // 테마 전환 버튼 이벤트
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // 각 화면 초기화
    initIntroScreen(handleStartTest, userData);
    initQuestionScreen(handleQuestionsComplete, handleGoHome);
    initResultScreen(handleRestart);

    // 시작 화면 표시
    showScreen('intro');
}

// ========================================
// DOMContentLoaded 이벤트
// ========================================
document.addEventListener('DOMContentLoaded', initApp);
