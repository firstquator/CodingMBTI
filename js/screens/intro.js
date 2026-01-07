// ========================================
// 코딩 MBTI - Intro Screen
// 인트로 화면 로직
// ========================================

/**
 * 인트로 화면 초기화
 * @param {Function} onStartTest - 테스트 시작 콜백 함수
 * @param {Object} userData - 사용자 데이터 객체 참조
 */
export function initIntroScreen(onStartTest, userData) {
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('user-name');
    const ageInput = document.getElementById('user-age');

    // 폼 제출 이벤트
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();

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
            onStartTest();
        }
    });

    // 입력 필드 에러 클래스 제거
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

/**
 * 인트로 화면 폼 초기화
 */
export function resetIntroForm() {
    document.getElementById('user-name').value = '';
    document.getElementById('user-age').value = '';
}

export default { initIntroScreen, resetIntroForm };
