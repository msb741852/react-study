# 03. State와 이벤트

## 배운 것

- 일반 변수로는 화면이 갱신되지 않는다
  - React는 변수가 바뀌어도 다시 그리지 않는다
  - 컴포넌트는 함수라서 다시 그릴 때마다 처음부터 실행되어 지역 변수가 초기화된다
- `useState`로 값을 유지하고, set 함수로 변경하면 컴포넌트가 리렌더링된다
  - `const [count, setCount] = useState(0);`
  - 실제 값은 React가 컴포넌트 바깥에 보관하고, `useState`는 렌더링 시점의 값을 꺼내준다
  - State는 직접 수정하지 않고 반드시 set 함수로만 변경한다
- 같은 컴포넌트를 여러 번 사용하면 State도 각자 독립적으로 관리된다
- 이벤트 핸들러에는 함수 자체를 넘겨야 한다
  - `onClick={handleClick}` ✅ / `onClick={handleClick()}` ❌ (렌더링 시점에 바로 실행됨)
  - 인자가 필요하면 화살표 함수로 감싼다: `onClick={() => setCount(0)}`
- `input`의 입력값은 `onChange` 이벤트의 `e.target.value`로 가져온다

### State vs Props

| | Props | State |
|---|---|---|
| 누가 정하나 | 부모가 넘겨줌 | 컴포넌트가 스스로 관리 |
| 변경 | 읽기 전용 | set 함수로 변경 |
| 바뀌면 | 부모가 다시 그려지며 새 값이 들어옴 | 해당 컴포넌트가 다시 그려짐 |

## 트러블슈팅

### setCount를 두 번 호출했는데 1만 증가함

**실험**

`+2` 버튼의 클릭 핸들러에서 `setCount(count + 1)`을 두 번 연속 호출했다.

```jsx
onClick={() => {
  setCount(count + 1);
  setCount(count + 1);
}}
```

**결과**

2가 아니라 1만 증가했다.

**처음 가설**

첫 번째 `setCount`가 실행되면 State가 업데이트되면서 컴포넌트가 바로 리렌더링되기 시작하고,
그래서 두 번째 `setCount`는 실행조차 되지 않는다고 생각했다.

**실제 원인**

`console.log`로 확인해보니 두 번째 `setCount`도 실행되었고, 두 시점 모두 `count`는 0이었다.

- `setCount`를 호출해도 `count` 변수는 즉시 바뀌지 않는다.
  `count`는 이번 렌더링 때 받은 값을 담은 `const`이기 때문이다.
- 따라서 실제로는 `setCount(0 + 1)`을 두 번 요청한 것과 같아 결과가 1이 된다.
- React는 이벤트 핸들러 안의 set 요청을 모아두었다가 핸들러가 끝난 뒤 한 번에 반영하고 리렌더링한다.
  이를 **배칭(batching)**이라고 한다. 트랜잭션 안에서 모았다가 마지막에 한 번 커밋하는 것과 비슷하다.

**해결**

값 대신 **업데이터 함수**를 넘긴다.

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

React가 대기열의 함수들을 순서대로 실행하며 직전 결과를 `prev`로 넣어주므로 0 → 1 → 2가 된다.
`prev`는 예약어가 아니라 파라미터 이름일 뿐이며, React가 보관 중인 최신 값을 넣어 호출해준다.
Java의 `Function<Integer, Integer>`를 넘기고 프레임워크가 `apply()`를 호출해주는 구조와 같다.

**배운 점**

새 값이 이전 값에 의존할 때(`+1`, `-1`, 토글 등)는 항상 업데이터 함수를 사용한다.
`setCount(0)`처럼 이전 값과 무관할 때는 값을 그대로 넘긴다.

## 코드 리뷰 반영

### 1. `==` 대신 `===` 사용

`==`는 비교 전에 타입을 자동 변환해서 `0 == ""`, `"1" == 1`이 모두 `true`가 된다.
`===`는 타입까지 같아야 `true`이므로, 예상치 못한 버그를 막기 위해 항상 `===`를 사용한다.

### 2. 삼항 연산자 대신 `disabled`로 0 미만 방지

Before

```jsx
<button onClick={() => count <= 0 ? "" : setCount(count - 1)}>-1</button>
```

After

```jsx
<button onClick={() => setCount(prev => prev - 1)} disabled={count === 0}>-1</button>
```

삼항 연산자는 값을 고르는 용도이지 실행 흐름을 분기하는 용도가 아니다.
또한 기존 방식은 눌러도 아무 반응이 없어 사용자 입장에서 고장 난 것처럼 보인다.
`disabled`를 사용하면 로직 방어와 함께 버튼이 비활성화된 상태를 사용자에게 보여줄 수 있다.

### 3. 제어 컴포넌트로 변경

Before

```jsx
<input type="text" onChange={(e) => setText(e.target.value)} />
```

After

```jsx
<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
```

`value`를 State와 연결하지 않으면 입력창의 값은 브라우저가 따로 관리한다.
`value={name}`을 연결하면 State가 유일한 데이터 원천이 되어, `setName("")`으로 입력창을 비우는 등 코드로 제어할 수 있다.

### 4. 문자열 조합에 템플릿 리터럴 사용

Before

```jsx
"안녕하세요, " + text + "님!"
```

After

```jsx
`안녕하세요, ${name}님!`
```

### 5. Counter를 props로 재사용 가능하게 변경

Before

```jsx
<h5>좋아요: {count}</h5>
```

After

```jsx
function Counter({ label }) {
  ...
  <h5>{label}: {count}</h5>
}

<Counter label="좋아요" />
```

텍스트가 고정되어 있으면 다른 곳에서 재사용할 수 없다.
State(카운트 값)와 Props(라벨)를 함께 사용해 범용 컴포넌트로 만들었다.

### 6. 입력 기능을 Greeting 컴포넌트로 분리

사이트 제목을 보여주는 `Header` 안에 이름 입력 기능까지 들어있었다.
각 컴포넌트가 하나의 역할만 하도록 `Greeting` 컴포넌트로 분리했다. (단일 책임 원칙)

### 7. 클래스명 단순화

Before

```css
.counter-section .button-section .btn-style { ... }
```

After

```css
.counter-btn-style { ... }
```

부모 클래스로 범위를 좁히는 방식은 체인이 길어질수록 명시도가 높아지고 읽기 어려워진다.
클래스 이름 자체에 컴포넌트 이름을 붙여 한 단계 선택자로 충돌을 방지했다.