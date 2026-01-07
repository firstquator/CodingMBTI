// ========================================
// 코딩 MBTI - Theme Utilities
// 테마(다크/라이트 모드) 관리 함수
// ========================================

/**
 * 테마 초기화 - 저장된 테마 또는 시스템 설정 적용
 */
export function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

/**
 * 테마 전환 - 다크/라이트 모드 토글
 */
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    if (newTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', newTheme);
}

/**
 * 현재 테마 반환
 * @returns {string} - 'light' 또는 'dark'
 */
export function getCurrentTheme() {
    const dataTheme = document.documentElement.getAttribute('data-theme');
    return dataTheme === 'light' ? 'light' : 'dark';
}

export default { initTheme, toggleTheme, getCurrentTheme };
