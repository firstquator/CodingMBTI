# 코딩 MBTI 앱 배포 가이드 📦

## 🎯 배포 전략 개요

### 왜 이 방법을 선택했나요?

✅ **완전 무료!** - GitHub Pages와 Google Apps Script 모두 무료
✅ **서버 불필요** - 복잡한 서버 설정 필요 없음
✅ **자동 저장** - Google Sheet에 자동으로 데이터 저장
✅ **쉬운 관리** - 관리자는 Google Sheet로 데이터 확인
✅ **빠른 배포** - 10분 안에 인터넷에 올릴 수 있어요

### 시스템 구조

```
사용자 브라우저 (GitHub Pages)
    ↓ 이름, 나이 입력
    ↓ 테스트 진행
    ↓ 결과 도출
    ↓ 데이터 전송 (AJAX)
    ↓
Google Apps Script (API)
    ↓ 데이터 받기
    ↓ 처리
    ↓
Google Sheet (데이터 저장소)
    ↓
관리자가 확인!
```

---

## ✅ 기술 스택 검증

### GitHub Pages
- **용도**: 웹사이트 호스팅 (HTML, CSS, JavaScript)
- **장점**: 무료, 빠름, 쉬운 배포, HTTPS 자동 지원
- **제한**: 정적 파일만 가능 (서버 코드 불가)
- **결론**: ✅ 완벽하게 작동합니다!

### Google Apps Script (GAS)
- **용도**: 서버리스 백엔드 API
- **장점**: 무료, Google Sheet 직접 연동, 서버 관리 불필요
- **제한**: 하루 실행 제한 (개인: 6분/일 실행시간)
- **결론**: ✅ 테스트 앱에 충분합니다!

### Google Sheet
- **용도**: 데이터베이스 역할
- **장점**: 무료, 시각화, 쉬운 관리, 엑셀 내보내기
- **제한**: 최대 500만 셀
- **결론**: ✅ 수천 명 사용자도 문제없어요!

---

## 📋 필요한 준비물

### 1. GitHub 계정
- [github.com](https://github.com) 에서 무료 가입
- 저장소(Repository) 만들 권한

### 2. Google 계정
- Gmail 계정
- Google Drive 접근 권한

### 3. 코드 에디터 (선택사항)
- VS Code (추천) 또는 메모장
- GitHub 웹에서도 편집 가능!

---

## 🚀 1단계: Google Sheet 데이터베이스 만들기

### 1-1. Google Sheet 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. **새 스프레드시트** 클릭
3. 이름 변경: "코딩MBTI_데이터"

### 1-2. 시트 구조 설정

**Sheet1 (테스트 결과)** 에 아래 열 이름 입력:

| A열 | B열 | C열 | D열 | E열 | F열 | G열 |
|-----|-----|-----|-----|-----|-----|-----|
| 타임스탬프 | 이름 | 나이 | Q1 | Q2 | ... | 결과유형 |

**예시 첫 줄 (헤더)**:
```
타임스탬프 | 이름 | 나이 | Q1 | Q2 | Q3 | Q4 | ... | 결과유형 | MBTI코드
```

### 1-3. Sheet URL 복사

- 브라우저 주소창에서 URL 복사
- 나중에 사용할 거예요!

---

## 🔧 2단계: Google Apps Script API 만들기

### 2-1. Apps Script 프로젝트 생성

1. Google Sheet에서 **확장 프로그램 → Apps Script** 클릭
2. 새 프로젝트 이름: "코딩MBTI API"

### 2-2. 코드 작성

**Code.gs** 파일에 아래 코드 붙여넣기:

```javascript
// 코딩 MBTI 데이터 저장 API
function doPost(e) {
  try {
    // 스프레드시트 연결
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

    // 전송된 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 타임스탬프 추가
    const timestamp = new Date();

    // 데이터 행 구성
    const row = [
      timestamp,
      data.name,        // 이름
      data.age,         // 나이
      data.q1,          // 질문 1 답변
      data.q2,          // 질문 2 답변
      data.q3,          // 질문 3 답변
      data.q4,          // 질문 4 답변
      data.q5,          // 질문 5 답변
      data.q6,          // 질문 6 답변
      data.q7,          // 질문 7 답변
      data.q8,          // 질문 8 답변
      data.q9,          // 질문 9 답변
      data.q10,         // 질문 10 답변
      data.q11,         // 질문 11 답변
      data.q12,         // 질문 12 답변
      data.resultType,  // 결과 유형 (예: TSIE)
      data.mbtiCode     // MBTI 코드
    ];

    // Sheet에 데이터 추가
    sheet.appendRow(row);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '데이터가 저장되었습니다!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 테스트용
function doGet(e) {
  return ContentService
    .createTextOutput("코딩 MBTI API가 작동 중입니다!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 2-3. 배포하기

1. **배포 → 새 배포** 클릭
2. **유형 선택 → 웹 앱** 선택
3. 설정:
   - **실행 권한**: 나
   - **액세스 권한**: **"모든 사용자"** (중요!)
4. **배포** 클릭
5. **웹 앱 URL 복사** 📋 (나중에 사용!)

**예시 URL**:
```
https://script.google.com/macros/s/ABC123.../exec
```

### 2-4. 권한 승인

- 처음 배포 시 권한 요청
- **고급 → (안전하지 않음) 이동** 클릭
- **허용** 클릭

---

## 💻 3단계: 프론트엔드 코드 준비

### 3-1. 프로젝트 폴더 구조

```
coding-mbti/
├── index.html          # 메인 페이지
├── test.html          # 테스트 페이지
├── result.html        # 결과 페이지
├── css/
│   └── style.css      # 스타일
├── js/
│   ├── app.js         # 메인 로직
│   ├── questions.js   # 질문 데이터
│   └── api.js         # Google API 연동
└── images/
    └── logo.png       # 로고 이미지
```

### 3-2. API 연동 코드 (js/api.js)

```javascript
// Google Apps Script API URL (여기에 복사한 URL 넣기!)
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// 데이터 전송 함수
async function saveTestResult(data) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors', // 중요! CORS 우회
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

// 사용 예시
function submitTestResult(name, age, answers, result) {
  const data = {
    name: name,
    age: age,
    q1: answers[0],
    q2: answers[1],
    q3: answers[2],
    q4: answers[3],
    q5: answers[4],
    q6: answers[5],
    q7: answers[6],
    q8: answers[7],
    q9: answers[8],
    q10: answers[9],
    q11: answers[10],
    q12: answers[11],
    resultType: result.type,
    mbtiCode: result.code
  };

  saveTestResult(data);
}
```

---

## 🌐 4단계: GitHub Pages 배포하기

### 방법 1: GitHub 웹에서 배포 (초보자 추천)

#### Step 1: 저장소 만들기

1. [GitHub](https://github.com) 로그인
2. 오른쪽 위 **+** → **New repository** 클릭
3. 설정:
   - **Repository name**: `coding-mbti` (원하는 이름)
   - **Public** 선택 (무료 GitHub Pages는 Public만 가능)
   - **Add a README file** 체크
4. **Create repository** 클릭

#### Step 2: 파일 업로드

1. **Add file → Upload files** 클릭
2. 모든 HTML, CSS, JS 파일 드래그 앤 드롭
3. **Commit changes** 클릭

#### Step 3: GitHub Pages 활성화

1. 저장소 메뉴에서 **Settings** 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**: **Deploy from a branch** 선택
4. **Branch**: **main** 선택, **/ (root)** 선택
5. **Save** 클릭

#### Step 4: 배포 확인

- 5분 정도 기다리기
- 상단에 배포 URL 표시됨:
  ```
  https://your-username.github.io/coding-mbti/
  ```
- 링크 클릭해서 확인!

### 방법 2: Git 명령어로 배포 (개발자용)

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/coding-mbti.git
cd coding-mbti

# 2. 파일 추가
# (모든 HTML, CSS, JS 파일을 폴더에 복사)

# 3. Git에 추가 및 커밋
git add .
git commit -m "첫 배포: 코딩 MBTI 앱"

# 4. GitHub에 푸시
git push origin main

# 5. GitHub Pages 활성화는 웹에서 (위 Step 3 참고)
```

---

## 🔗 5단계: API URL 연결하기

### 5-1. API URL 업데이트

1. `js/api.js` 파일 열기
2. `API_URL` 변수에 Google Apps Script URL 붙여넣기:

```javascript
const API_URL = 'https://script.google.com/macros/s/ABC123DEF456.../exec';
```

### 5-2. 변경사항 배포

**GitHub 웹에서**:
1. `js/api.js` 파일 클릭
2. 연필 아이콘 (Edit) 클릭
3. URL 수정
4. **Commit changes** 클릭

**Git 명령어로**:
```bash
git add js/api.js
git commit -m "API URL 연결"
git push origin main
```

### 5-3. 배포 완료 확인

- 2-3분 후 사이트 새로고침
- 테스트 진행해보기
- Google Sheet에 데이터 들어오는지 확인!

---

## 📊 6단계: 관리자 데이터 확인하기

### Google Sheet로 데이터 확인

1. [Google Sheets](https://sheets.google.com) 접속
2. "코딩MBTI_데이터" 스프레드시트 열기
3. 실시간으로 데이터 확인 가능!

### 유용한 Sheet 기능

#### 1. 데이터 필터링
- 헤더 행 선택 → **데이터 → 필터 만들기**
- 나이별, 결과별 필터 가능

#### 2. 차트 만들기
- **삽입 → 차트**
- 결과 유형 분포 파이 차트
- 나이대별 그래프

#### 3. 데이터 다운로드
- **파일 → 다운로드 → CSV** 또는 **Excel**

#### 4. 통계 보기

**Sheet에 추가 탭 만들기**: "통계"

```
=COUNTIF(Sheet1!P:P, "TSIE")  // TSIE 유형 수
=AVERAGE(Sheet1!C:C)           // 평균 나이
=COUNTA(Sheet1!A:A)-1          // 총 참여자 수
```

---

## 🛠️ 7단계: 커스텀 도메인 연결 (선택사항)

### 무료 도메인 옵션

1. **GitHub 기본 도메인**
   - `https://username.github.io/coding-mbti/`
   - 무료, 자동 HTTPS

2. **커스텀 도메인 (유료)**
   - 도메인 구매 (연간 1-2만원)
   - GitHub Pages에 연결 가능

### 커스텀 도메인 연결 방법

1. 도메인 구매 (예: `codingmbti.com`)
2. DNS 설정:
   ```
   A 레코드: 185.199.108.153
   A 레코드: 185.199.109.153
   A 레코드: 185.199.110.153
   A 레코드: 185.199.111.153
   ```
3. GitHub Settings → Pages → Custom domain에 입력

---

## ✅ 최종 체크리스트

### 배포 전 확인사항

- [ ] Google Sheet 생성 완료
- [ ] Google Apps Script 배포 완료
- [ ] API URL 복사 완료
- [ ] GitHub 저장소 생성
- [ ] 모든 파일 업로드 완료
- [ ] GitHub Pages 활성화
- [ ] API URL 코드에 삽입
- [ ] 테스트 실행해보기
- [ ] Google Sheet 데이터 확인

### 테스트 항목

- [ ] 이름, 나이 입력 작동
- [ ] 질문 페이지 이동
- [ ] 답변 선택 가능
- [ ] 결과 페이지 표시
- [ ] Google Sheet에 데이터 저장
- [ ] 모바일에서 작동 확인
- [ ] 다양한 브라우저 테스트

---

## 🐛 문제 해결 (Troubleshooting)

### 문제 1: API에 데이터가 안 들어가요

**원인**: CORS 에러 또는 Apps Script 권한 문제

**해결**:
1. Apps Script 배포 설정 확인
   - **액세스 권한: "모든 사용자"** 로 설정했는지 확인
2. `mode: 'no-cors'` 확인
3. 브라우저 콘솔(F12) 에러 메시지 확인

### 문제 2: GitHub Pages 사이트가 안 떠요

**원인**: 배포 설정 또는 파일 경로 문제

**해결**:
1. Settings → Pages에서 상태 확인
2. **main** 브랜치, **/ (root)** 선택 확인
3. `index.html` 파일이 루트에 있는지 확인
4. 5-10분 기다린 후 다시 확인

### 문제 3: 파일 경로가 안 맞아요

**원인**: 상대 경로 오류

**해결**:
```html
<!-- 절대 경로 사용 -->
<link rel="stylesheet" href="/coding-mbti/css/style.css">
<script src="/coding-mbti/js/app.js"></script>

<!-- 또는 상대 경로 -->
<link rel="stylesheet" href="./css/style.css">
<script src="./js/app.js"></script>
```

### 문제 4: Google Sheet가 느려요

**원인**: 데이터가 너무 많거나 복잡한 수식

**해결**:
1. 오래된 데이터 아카이브
2. 수식 대신 값으로 변환
3. 다른 Sheet로 통계 이동

---

## 📈 성능 최적화 팁

### 1. 이미지 최적화
- PNG/JPG 압축 (TinyPNG 사용)
- 적절한 크기로 리사이즈
- WebP 포맷 사용 (최신 브라우저)

### 2. JavaScript 최적화
- 코드 압축 (Minify)
- 불필요한 라이브러리 제거
- 지연 로딩 (Lazy Loading)

### 3. 캐싱 활용
```html
<!-- 버전 번호 추가 -->
<link rel="stylesheet" href="css/style.css?v=1.0">
<script src="js/app.js?v=1.0"></script>
```

---

## 🔒 보안 고려사항

### 1. 개인정보 보호
- 이름만 받기 (이메일, 전화번호 X)
- Google Sheet 공유 설정: **비공개**
- 민감한 정보 수집 금지

### 2. API 보호
- Apps Script URL 노출 주의
- Rate Limiting (시간당 요청 제한)
- 입력 값 검증

### 3. HTTPS 사용
- GitHub Pages 자동 HTTPS
- 안전한 데이터 전송

---

## 📚 추가 자료

### 공식 문서
- [GitHub Pages 공식 문서](https://docs.github.com/pages)
- [Google Apps Script 가이드](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)

### 유용한 도구
- [GitHub Desktop](https://desktop.github.com/) - Git GUI 프로그램
- [VS Code](https://code.visualstudio.com/) - 코드 에디터
- [TinyPNG](https://tinypng.com/) - 이미지 압축
- [Can I Use](https://caniuse.com/) - 브라우저 호환성 확인

---

## 🎉 배포 성공!

축하합니다! 이제 코딩 MBTI 앱이 인터넷에 올라갔어요!

### 다음 단계

1. **친구들에게 공유**하기
2. **피드백** 받고 개선하기
3. **통계 데이터** 분석하기
4. **새로운 기능** 추가하기

### 홍보 방법

- 학교 커뮤니티에 공유
- SNS (인스타그램, 트위터) 포스팅
- 개발자 커뮤니티에 소개
- QR 코드 만들어서 배포

---

**문서 버전**: v1.0
**최종 수정일**: 2025-12-05
**작성자**: SuperClaude Workflow System

**도움이 필요하면 언제든 물어보세요!** 🚀
