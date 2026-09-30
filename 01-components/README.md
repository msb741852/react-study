# 01. 컴포넌트와 JSX

## 배운 것

- 컴포넌트는 JSX를 반환하는 함수이며, 태그처럼 조합해서 화면을 구성한다
- JSX 규칙
  - 반환값은 하나의 부모 태그로 감싼다 (`<div>` 또는 `<>...</>`)
  - HTML의 `class` 대신 `className`을 사용한다
  - 컴포넌트 이름은 대문자로 시작한다
- 같은 파일 안에서만 쓰는 컴포넌트는 `export` 없이도 사용할 수 있다

## 트러블슈팅

### 화면이 뜨지 않음

- 원인: `App.jsx`에서 `export default App`을 작성하지 않음
- 해결: 파일 하단에 `export default App` 추가
- 배운 점: `index.html` → `main.jsx` → `App.jsx` 순서로 불러오는 구조이며,
  `main.jsx`에서 App 컴포넌트를 사용하려면 `App.jsx`에서 `export`로 공개해줘야 한다.
  JavaScript는 파일 단위로 독립된 모듈이라, 기본적으로 파일 밖에서 접근할 수 없다.

## 코드 리뷰 반영

### 1. div 대신 시맨틱 태그 사용

Before

```jsx
function Header() {
  return <div>리액트 배우는중</div>
}
```

After

```jsx
function Header() {
  return (
    <header>
      <h1>React Study SPA</h1>
    </header>
  );
}
```

`header`, `main`, `footer`처럼 역할이 정해진 시맨틱 태그가 있을 때는 이를 사용하는 것이 웹 표준에 맞다.
태그만 보고도 구조를 파악할 수 있어 코드 가독성이 좋아지고, 검색엔진과 스크린리더도 페이지 구조를 이해할 수 있다.

### 2. 코드 스타일 통일

세미콜론 누락과 `return(` 띄어쓰기가 섞여 있던 부분을 통일했다.
JavaScript는 세미콜론이 필수는 아니지만, 한 프로젝트 안에서 스타일이 섞여 있으면 읽기 어렵다.
일관된 스타일은 협업할 때 특히 중요하며, Prettier 같은 포매터로 자동화할 수 있다.

### 3. body 기본 margin 제거

`body` 태그에는 브라우저 기본 `margin`이 있어서, `height: 100vh`와 합쳐지면 화면보다 커져 스크롤이 생긴다.
스타일링 전에 `body { margin: 0; }`으로 초기화하는 것이 좋다.
오랜만에 프론트 공부를 하며 잊고 있던 부분을 다시 알게 되었다.