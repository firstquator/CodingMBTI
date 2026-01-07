// ========================================
// 코딩 MBTI - API Utilities
// Google Sheet API 통신 관련 함수
// ========================================

// Google Apps Script API URL
const API_URL = 'https://script.google.com/macros/s/AKfycbwqKTNRnrdZfneb8dmV3jzJrMAN89Pg9KvTi10CLKLLwSnNVCtmbR_WKnEqK9CRIg1R/exec';

/**
 * Google Sheet에 테스트 결과 저장
 * @param {Object} data - 저장할 테스트 결과 데이터
 * @returns {Promise<boolean>} - 저장 성공 여부
 */
export async function saveTestResult(data) {
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

export default { saveTestResult };
