import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import MathJax from "react-mathjax"
import styles from '../styles/Home.module.css'

const Determinant: NextPage<AudioRefs> = ({chime, correct, incorrect}) => {
  const det = (e: number[][]) => 
    e[0][0] * e[1][1] * e[2][2] - e[0][0] * e[1][2] * e[2][1]
    + e[0][1] * e[1][2] * e[2][0] - e[0][1] * e[1][0] * e[2][2]
    + e[0][2] * e[1][0] * e[2][1] - e[0][2] * e[1][1] * e[2][0]

  const generateElements = (): number[][]=> {
    const elements = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 10))
    )
    // 解答欄の都合上答えが正になるまで生成を繰り返す
    return det(elements) < 0 ? generateElements() : elements
  }

  const verify = async () => {
    if (Number(ans) === det(A)) {
      chime.current.pause()
      correct.current.play()
      const result = await fetch(`/api/send?command=1`)
      console.log(await result.json())
      router.push('/wakeup')
    } else {
      incorrect.current.play()
      setFlash(true)
      setTimeout(() => {
        setFlash(false)
        setAns('')
      }, 200)
    }
  }

  const router = useRouter()
  const [A, setA] = useState(generateElements())
  const [ans, setAns] = useState('')
  const [isFlash, setFlash] = useState(false)
  console.log(det(A))

  const formula = String.raw`
    A = \begin{pmatrix}
      ${A[0][0]} & ${A[0][1]} & ${A[0][2]} \\
      ${A[1][0]} & ${A[1][1]} & ${A[1][2]} \\
      ${A[2][0]} & ${A[2][1]} & ${A[2][2]} \\
    \end{pmatrix}
  `
  
  return (
    <>
      <div className={styles.formula} style={isFlash ? {
        background: 'rgba(255, 0, 0, 0.7)'
      } : {}}>
        <MathJax.Provider>
          <MathJax.Node formula={formula} />
          <MathJax.Node inline formula="\det A" />
          を求めよ
        </MathJax.Provider>
        <input className={styles.textbox} placeholder="回答を入力" type="text" value={ans} onChange={(e) => {setAns(e.target.value)}} inputMode="numeric" pattern="\d*" />
        <button className={styles.button} onClick={verify}>
          決定
        </button>
      </div>
    </>
  )
}

export default Determinant
