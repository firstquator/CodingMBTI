// ========================================
// 코딩 MBTI - Loading Screen
// 로딩 화면 로직
// ========================================

/**
 * 로딩 화면 표시 및 결과 계산 후 콜백 호출
 * @param {Function} onComplete - 로딩 완료 시 콜백 함수
 */
export function showLoading(onComplete) {
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
        onComplete();
    }, 2500);
}

/**
 * 로딩 텍스트 초기화
 */
export function resetLoadingText() {
    const loadingTextEl = document.getElementById('loading-text');
    loadingTextEl.textContent = "당신의 코딩 성향을 분석하고 있어요";
}

export default { showLoading, resetLoadingText };
