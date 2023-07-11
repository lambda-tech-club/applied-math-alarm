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

0. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. 環境変数を設定

| 変数名 | 説明 |
| ------------- | ------------- |
| TOKEN | https://github.com/OpenWonderLabs/SwitchBotAPI#getting-started |
| SECRET | https://github.com/OpenWonderLabs/SwitchBotAPI#getting-started |
| DEVICE_ID | SwitchBot Hub 経由の仮想デバイスID |
| ALARM_ENV | `development`, `production` |

下記コマンドを実行するととりあえず動きます

```bash
touch .env.local && echo "TOKEN=tokentokentoken" > .env.local && echo "SECRET=secretsecret" >> .env.local && echo "DEVICE_ID=02-00000000" >> .env.local && echo "ALARM_ENV=development" >> .env.local
```

2. 開発サーバーを起動

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
