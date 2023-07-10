## 絶対に起きられる目覚まし時計

### YouTube動画

WIP

### 問題パターン

`pages/index.tsx`内17行目にある、`handleClick`中の`router.push()`の値を変更することで問題形式を切り替えられます。

```js
const handleClick = () => {
	...
	router.push('/integral')
}
```

#### 定積分

```
http://localhost:3000/integral
```

<img width="1002" alt="int" src="https://github.com/yoidea/applied-math-alerm/assets/26201815/1c369855-96ff-44ef-839b-39842a175dc8">

#### 微分方程式

```
http://localhost:3000/differential
```

<img width="876" alt="diff" src="https://github.com/yoidea/applied-math-alerm/assets/26201815/c5413257-8074-431f-8afa-dd7245dace04">

#### 行列式

```
http://localhost:3000/determinant
```

<img width="974" alt="det" src="https://github.com/yoidea/applied-math-alerm/assets/26201815/f6fb3aca-d9e2-4973-888c-2131546f1ba8">

### 起動方法

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
