# OZ Externship Frontend Template
<img width="1820" height="989" alt="FE_skill_stack" src="https://github.com/user-attachments/assets/1f41396b-7b04-4797-a760-ad96b8fe9c97" />

React + TypeScript + Vite 기반의 프론트엔드 프로젝트

## 목차

- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [스크립트](#스크립트)
- [커밋 컨벤션](#커밋-컨벤션)
- [코드 스타일](#코드-스타일)
- [컴포넌트 가이드](#컴포넌트-가이드)
- [디자인 토큰](#디자인-토큰)
- [협업 규칙](#협업-규칙)
- [API 연동](#api-연동)

---

## 기술 스택

| 분류             | 기술                                            |
| ---------------- | ----------------------------------------------- |
| Framework        | React 19, TypeScript                            |
| Build Tool       | Vite                                            |
| Styling          | Tailwind CSS v4, CVA (class-variance-authority) |
| State Management | Zustand (클라이언트), React Query (서버)        |
| Routing          | React Router v7                                 |
| UI Components    | Radix UI, Lucide Icons                          |
| HTTP Client      | Axios                                           |
| Mocking          | MSW (Mock Service Worker)                       |
| Code Quality     | ESLint, Prettier, Husky, lint-staged            |
| Commit           | Commitlint (Conventional Commits)               |

---

## 시작하기

### 요구사항

- Node.js 18+
- pnpm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

---

## 프로젝트 구조

```
src/
├── api/                  # API 관련 코드
│   └── api.ts
├── assets/               # 정적 자원
│   └── icons/            # SVG 아이콘
├── components/
│   ├── common/           # 공통 컴포넌트 (비즈니스 로직 포함)
│   │   ├── Dropdown.tsx
│   │   └── Toast.tsx
│   ├── layout/           # 레이아웃 컴포넌트
│   │   └── RootLayout.tsx
│   └── ui/               # 기본 UI 컴포넌트 (Headless)
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       └── dropdown-menu.tsx
├── hooks/                # 커스텀 훅
├── lib/                  # 유틸리티 라이브러리
│   └── utils.ts          # cn() 등 헬퍼 함수
├── mocks/                # MSW 모킹 설정
│   ├── browser.ts
│   └── handlers.ts
├── pages/                # 페이지 컴포넌트
│   ├── HomePage.tsx
│   ├── TestPage.tsx
│   └── NotFoundPage.tsx
├── store/                # Zustand 스토어
├── test/                 # UI 테스트용 컴포넌트
├── types/                # TypeScript 타입 정의
├── utils/                # 유틸리티 함수
├── App.tsx               # 라우팅 설정
├── main.tsx              # 앱 진입점
└── index.css             # 글로벌 스타일 & 디자인 토큰
```

---

## 스크립트

| 명령어          | 설명                          |
| --------------- | ----------------------------- |
| `pnpm dev`      | 개발 서버 실행                |
| `pnpm build`    | TypeScript 컴파일 + Vite 빌드 |
| `pnpm preview`  | 빌드 결과물 미리보기          |
| `pnpm lint`     | ESLint 검사                   |
| `pnpm lint:fix` | ESLint 자동 수정              |

---

## 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

### 커밋 메시지 형식

```
<type>: <subject> (#<issue-number>)

[optional body]
```

### 커밋 타입

| 타입         | 설명                            |
| ------------ | ------------------------------- |
| `feat`       | 새로운 기능 추가                |
| `fix`        | 버그 수정                       |
| `docs`       | 문서 수정                       |
| `style`      | 코드 포맷팅 (기능 변경 없음)    |
| `refactor`   | 코드 리팩토링                   |
| `test`       | 테스트 코드 추가/수정           |
| `chore`      | 빌드, 설정 파일 수정            |
| `remove`     | 파일/코드 삭제                  |
| `hotfix`     | 긴급 버그 수정                  |
| `deprecated` | 더 이상 사용하지 않는 기능 표시 |
| `design`     | UI/UX 디자인 변경               |

### 예시

```bash
feat: 로그인 폼 유효성 검사 추가 (#12)
fix: 드롭다운 닫힘 버그 수정 (#15)
docs: README 커밋 컨벤션 추가 (#20)
```

### Git Hooks (Husky)

| Hook         | 동작                                 |
| ------------ | ------------------------------------ |
| `pre-commit` | lint-staged 실행 (ESLint + Prettier) |
| `commit-msg` | 커밋 메시지 규칙 검사                |
| `pre-push`   | 빌드 검증                            |

---

## 코드 스타일

### ESLint 주요 규칙

- `prefer-const`: 재할당 없는 변수는 const 사용
- `no-var`: var 사용 금지
- `@typescript-eslint/no-explicit-any`: any 타입 경고
- `no-console`: console.log 경고
- `react/jsx-boolean-value`: boolean prop 축약 권장
- `react/jsx-no-useless-fragment`: 불필요한 Fragment 경고

### Prettier 설정

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "endOfLine": "lf"
}
```

---

## 컴포넌트 가이드

### UI 컴포넌트 (`components/ui/`)

CVA(class-variance-authority)를 사용한 variant 기반 컴포넌트입니다.

#### Button

```tsx
import Button from '@/components/ui/button'

// Variants: fill, ghost, outline, sidebarTab
// Sizes: sm, md, full, sidebarTab
<Button variant="fill" size="md">버튼</Button>
<Button variant="outline" size="sm" disabled>비활성</Button>
<Button variant="sidebarTab" active>활성 탭</Button>
```

#### Input

```tsx
import Input from '@/components/ui/input'

// Status: default, danger, success, disabled
<Input status="default" placeholder="입력하세요" />
<Input status="danger" helperText="필수 입력입니다" />
<Input type="password" />  // 비밀번호 토글 자동 지원
```

#### Textarea

```tsx
import Textarea from '@/components/ui/textarea'

// Variants: default, feedback, answer
// Sizes: sm, md
;<Textarea variant="feedback" size="md" placeholder="내용을 입력하세요" />
```

### 공통 컴포넌트 (`components/common/`)

비즈니스 로직이 포함된 재사용 컴포넌트입니다.

---

## 디자인 토큰

`src/index.css`에 정의된 CSS 변수를 Tailwind에서 사용합니다.

### 컬러 팔레트

#### Primary

- `primary-default`: #6201E0 (메인 컬러)
- `primary-100` ~ `primary-700`: 밝기 변형

#### Grey

- `grey-1`: #FFFFFF (배경)
- `grey-6`: #222222 (텍스트)
- `grey-9`: #BDBDBD (placeholder)

#### 버튼 상태

- `btn-fill-default`: #6201E0
- `btn-fill-hover`: #4E01B3
- `btn-fill-active`: #3B0186

#### 시맨틱 컬러

- `other-red`: #EC0037 (에러)
- `other-green`: #5EB669 (성공)
- `other-yellow`: #F6A818 (경고)

### 사용 예시

```tsx
<div className="bg-grey-1 text-grey-6">
  <button className="bg-btn-fill-default hover:bg-btn-fill-hover">버튼</button>
</div>
```

---

## 협업 규칙

### 브랜치 전략

<!-- TODO: 팀 브랜치 전략 정의 필요 -->

### PR 규칙

<!-- TODO: PR 템플릿 및 리뷰 규칙 정의 필요 -->

### 코드 리뷰

<!-- TODO: 코드 리뷰 가이드라인 정의 필요 -->

---

## API 연동

### Axios 설정

<!-- TODO: API 클라이언트 설정 문서화 필요 -->

### React Query 사용

<!-- TODO: React Query 패턴 문서화 필요 -->

### MSW (개발 환경 모킹)

개발 환경에서 자동으로 MSW가 활성화됩니다.

```typescript
// src/mocks/handlers.ts에 핸들러 추가
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([{ id: 1, name: 'User' }])
  }),
]
```

---

## Path Alias

`@/`를 사용하여 `src/` 디렉토리를 참조할 수 있습니다.

```tsx
// ✅ 권장
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ❌ 비권장
import Button from '../../../components/ui/button'
```

---
