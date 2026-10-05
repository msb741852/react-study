# 02. JSX 표현식과 Props

## 배운 것

- JSX 안에서 `{}`를 열면 JavaScript 표현식을 사용할 수 있다
  - 변수, 계산식, 함수 호출 등 값을 만들어내는 **식(expression)**만 가능하다
  - `if`, `for` 같은 **문(statement)**은 사용할 수 없다
- Props는 부모 컴포넌트가 자식 컴포넌트에 값을 넘겨주는 방법이다
  - 메서드에 파라미터를 넘기는 것과 같은 개념이다
  - 받는 쪽에서는 구조 분해 문법으로 받는다: `function Profile({ name, age })`
- Props는 읽기 전용이다
  - 데이터는 부모 → 자식 한 방향으로만 흐른다
  - 값이 바뀌어야 하는 경우는 State를 사용한다
- 조건에 따라 다른 값을 보여줄 때는 삼항 연산자를 사용한다: `{isAdmin ? "(관리자)" : ""}`

## 트러블슈팅

### PowerShell에서 `rm -rf` 명령어 오류

- 원인: VS Code 기본 터미널이 PowerShell이라 리눅스 명령어 옵션 문법이 다름
- 해결: `Remove-Item -Recurse -Force node_modules`로 실행
- 배운 점: `rm`은 PowerShell에서 `Remove-Item`의 별칭일 뿐이라 옵션은 PowerShell 방식을 따른다.
  리눅스 문법을 그대로 쓰려면 터미널을 Git Bash로 바꿔 사용할 수 있다.

## 코드 리뷰 반영

### 1. 재사용되는 컴포넌트에 `<main>` 대신 `<section>` 사용

Before

```jsx
function Profile({ name, age, job, isAdmin }) {
  return (
    <main>
      ...
    </main>
  );
}
```

After

```jsx
function Profile({ name, age, job, isAdmin }) {
  return (
    <section>
      ...
    </section>
  );
}
```

`<main>`은 페이지의 주요 콘텐츠를 나타내는 태그라 한 페이지에 하나만 있어야 한다.
Profile을 재사용하면서 `<main>`이 두 개가 되었기 때문에, 반복되는 독립적인 영역에 어울리는 `<section>`으로 변경했다.
컴포넌트를 만들 때는 여러 번 사용될 수 있는지를 고려해서 태그를 골라야 한다.

### 2. 숫자 props는 `{}`로 전달

Before

```jsx
<Profile name="Moon SooBin" age="30" job="Developer" />
```

After

```jsx
<Profile name="Moon SooBin" age={30} job="Developer" />
```

따옴표로 넘기면 문자열 `"30"`이 전달되어, `age + 1` 같은 계산을 하면 `"301"`이 된다.
Java처럼 컴파일 단계에서 타입 오류를 잡아주지 않으므로 숫자는 `{}`로 넘겨야 한다.

### 3. boolean props 축약

Before

```jsx
<Profile ... isAdmin={true} />
```

After

```jsx
<Profile ... isAdmin />
```

props에 값 없이 이름만 쓰면 `true`가 전달된다. HTML의 `disabled`, `checked` 속성과 같은 방식이다.

### 4. 태그 선택자 대신 className으로 스타일링 (1강 리뷰)

Before

```css
ul {
  list-style: none;
  padding: 0;
}
```

After

```css
.list {
  list-style: none;
  padding: 0;
}
```

React에서 import한 CSS 파일은 어느 컴포넌트에서 불러오든 앱 전체에 전역으로 적용된다.
태그 선택자로 스타일링하면 다른 컴포넌트의 같은 태그에도 의도치 않게 적용되므로,
className으로 적용 범위를 명확히 하는 것이 좋다.

### 5. 스타일링에는 id 대신 className 사용 (1강 리뷰)

Before

```css
#wrapper { ... }
```

After

```css
.wrapper { ... }
```

id는 페이지에서 한 번만 사용해야 해서 여러 요소에 같은 스타일을 재사용할 수 없다.
또한 명시도(specificity)가 높아 나중에 스타일을 덮어쓰려면 더 강한 선택자가 필요하다.

### 6. 중괄호 공백 통일

`{ name }`과 `{isAdmin ? ...}`처럼 섞여 있던 공백을 `{name}` 형태로 통일했다.