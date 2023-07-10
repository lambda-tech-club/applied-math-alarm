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

#### 微分方程式

```
http://localhost:3000/differential
```

#### 行列式

```
http://localhost:3000/determinant
```

### 起動方法

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.