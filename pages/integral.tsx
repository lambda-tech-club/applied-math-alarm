import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import MathJax from "react-mathjax"
import styles from '../styles/Home.module.css'

const Integral: NextPage = ({chime, correct, incorrect}) => {
  const integral = (r, s, c) => 
    c[0] / 3 * (Math.pow(r[1], 3) - Math.pow(r[0], 3)) * (Math.pow(s[1], 1) - Math.pow(s[0], 1))
    + c[1] / 4 * (Math.pow(r[1], 2) - Math.pow(r[0], 2)) * (Math.pow(s[1], 2) - Math.pow(s[0], 2))
    + c[2] / 3 * (Math.pow(r[1], 1) - Math.pow(r[0], 1)) * (Math.pow(s[1], 3) - Math.pow(s[0], 3))

  const generateRange = () => {
    const range = Array.from({ length: 2 }, () =>
      Math.floor(Math.random() * 10)
    )
    // 答えが正になるように調整する
    return range[0] === range[1] ? generateRange() : range.sort()
  }

  const generateCoefficients = (seeds) => {
    const coefficients = seeds.map(s => Math.floor(Math.random() * 5 + 1) * s)
    // 約分できるような係数を生成
    return coefficients
  }

  const verify = async () => {
    if (Number(ans) === integral(R, S, C)) {
      chime.current.pause()
      correct.current.play()
      const result = await fetch(`/api/send?command=1`)
      console.log(await result.json())
      router.push('/wakeup')
    } else {
      incorrect.current.play()
      setflash(true)
      setTimeout(() => {
        setflash(false)
        setAns('')
      }, 200)
    }
  }

  const router = useRouter()
  const [R, setR] = useState(generateRange())
  const [S, setS] = useState(generateRange())
  const [C, setC] = useState(generateCoefficients([3, 4, 3]))
  const [ans, setAns] = useState('')
  const [isFlash, setflash] = useState(false)
  console.log(integral(R, S, C))

  const formula = String.raw`
    \int_{${R[0]}}^{${R[1]}}\!\!\!\int_{${S[0]}}^{${S[1]}}
    \!\!(${C[0]}x^{2} + ${C[1]}xy + ${C[2]}y^{2})\mathrm{d}x\mathrm{d}y
  `
  
  return (
    <>
      <div className={styles.formula} style={isFlash ? {
        background: 'rgba(255, 0, 0, 0.7)'
      } : {}}>
        <MathJax.Provider>
          <MathJax.Node formula={formula} />
          定積分の値を求めよ
        </MathJax.Provider>
        <input className={styles.textbox} placeholder="回答を入力" type="text" value={ans} onChange={(e) => {setAns(e.target.value)}} inputMode="numeric" pattern="\d*" />
        <button className={styles.button} onClick={verify}>
          決定
        </button>
      </div>
    </>
  )
}

export default Integral
