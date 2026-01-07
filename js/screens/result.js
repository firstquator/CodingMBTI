// ========================================
// 코딩 MBTI - Result Screen
// 결과 화면 로직
// ========================================

import questions from '../data/questions.js';
import { mbtiTypes, typeDescriptions, fieldDescriptions } from '../data/types.js';
import { saveTestResult } from '../utils/api.js';

/**
 * 결과 화면 초기화
 * @param {Function} onRestart - 다시 시작 콜백 함수
 */
export function initResultScreen(onRestart) {
    // 다시 테스트 버튼
    document.getElementById('btn-restart').addEventListener('click', function() {
        onRestart();
    });

    // 결과 공유 버튼
    document.getElementById('btn-share').addEventListener('click', handleShare);
}

/**
 * 결과 계산
 * @param {Array} answers - 답변 배열
 * @returns {Object} - { mbtiCode, scores }
 */
export function calculateResult(answers) {
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

    return { mbtiCode, scores };
}

/**
 * 결과 화면 표시
 * @param {string} mbtiCode - MBTI 유형 코드
 * @param {Object} scores - 점수 객체
 * @param {Object} userData - 사용자 데이터
 * @param {Array} answers - 답변 배열
 */
export function showResult(mbtiCode, scores, userData, answers) {
    const typeData = mbtiTypes[mbtiCode];

    // 기본 정보
    document.getElementById('result-type').textContent = mbtiCode;
    document.getElementById('result-nickname').textContent = typeData.nickname;
    document.getElementById('result-description').innerHTML = typeData.description;

    // 점수 바 렌더링
    renderScoreBars(scores);

    // 유형 설명 렌더링
    renderTypeExplanation(typeData);

    // 추천 분야 렌더링
    renderRecommendations(typeData);

    // Google Sheet에 결과 저장
    saveResultToSheet(userData, answers, mbtiCode, typeData.nickname);
}

/**
 * 점수 바 렌더링
 * @param {Object} scores - 점수 객체
 */
function renderScoreBars(scores) {
    const scoreBarsContainer = document.getElementById('score-bars');
    scoreBarsContainer.innerHTML = '';

    const scorePairs = [
        { left: 'T', right: 'P', leftLabel: '생각형', rightLabel: '실행형', axis: 'tp' },
        { left: 'S', right: 'F', leftLabel: '계획형', rightLabel: '자유형', axis: 'sf' },
        { left: 'I', right: 'C', leftLabel: '혼자형', rightLabel: '함께형', axis: 'ic' },
        { left: 'E', right: 'N', leftLabel: '안정형', rightLabel: '신기술형', axis: 'en' }
    ];

    scorePairs.forEach(pair => {
        const total = scores[pair.left] + scores[pair.right];
        const leftPercent = total > 0 ? Math.round((scores[pair.left] / total) * 100) : 50;

        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.setAttribute('data-axis', pair.axis);
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
}

/**
 * 유형 설명 렌더링
 * @param {Object} typeData - 유형 데이터
 */
function renderTypeExplanation(typeData) {
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
}

/**
 * 추천 분야 렌더링 (툴팁 포함)
 * @param {Object} typeData - 유형 데이터
 */
function renderRecommendations(typeData) {
    const recommendationContainer = document.getElementById('recommendation-tags');
    recommendationContainer.innerHTML = '';

    typeData.fields.forEach(field => {
        const tagWrapper = document.createElement('div');
        tagWrapper.className = 'tag-wrapper';

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = field;

        const tooltip = document.createElement('div');
        tooltip.className = 'tag-tooltip';
        tooltip.textContent = fieldDescriptions[field] || field;

        tagWrapper.appendChild(tag);
        tagWrapper.appendChild(tooltip);

        // 클릭/터치로 툴팁 토글
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            // 다른 모든 툴팁 닫기
            document.querySelectorAll('.tag-wrapper.active').forEach(wrapper => {
                if (wrapper !== tagWrapper) {
                    wrapper.classList.remove('active');
                }
            });
            tagWrapper.classList.toggle('active');
        });

        recommendationContainer.appendChild(tagWrapper);
    });

    // 바깥 클릭시 툴팁 닫기
    document.addEventListener('click', () => {
        document.querySelectorAll('.tag-wrapper.active').forEach(wrapper => {
            wrapper.classList.remove('active');
        });
    });
}

/**
 * Google Sheet에 결과 저장
 * @param {Object} userData - 사용자 데이터
 * @param {Array} answers - 답변 배열
 * @param {string} mbtiCode - MBTI 유형 코드
 * @param {string} nickname - 유형 별명
 */
function saveResultToSheet(userData, answers, mbtiCode, nickname) {
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
        nickname: nickname
    };
    saveTestResult(testData);
}

/**
 * 결과 공유 처리
 */
function handleShare() {
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
}

export default { initResultScreen, calculateResult, showResult };
