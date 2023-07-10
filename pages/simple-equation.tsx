import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import MathJax from "react-mathjax"
import styles from '../styles/Home.module.css'

interface Question {
  x: number
  weight: number
  bias: number
  right: number
}

/**
 * ランダムな整数を出力
 * @param min 最小値
 * @param max 最大値
 */
const randint = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min

const Integral: NextPage = ({chime, correct, incorrect}) => {
  const createQuestion = (): Question => {
    const x = randint(-10, 10)

    const weight = randint(1, 10) // Xの係数

    const bias = randint(1, 10) // nXに足す

    const right = weight * x + bias
    
    return {
      x,
      weight,
      bias,
      right,
    }
  }
  const [questionText, setQuestionText] = useState("")
  const [answer, setAnswer] = useState(0)
  useEffect(()=>{
    const questionData = createQuestion()
    const mathJax = String.raw`${questionData.weight}x + ${questionData.bias} = ${questionData.right}`
    setQuestionText(mathJax)
    setAnswer(questionData.x)
  }, [])

  const verify = async () => {
    if (answer=== parseInt(ans)) {
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
  const [ans, setAns] = useState('')
  const [isFlash, setflash] = useState(false)
  return (
    <>
      <div className={styles.formula} style={isFlash ? {
        background: 'rgba(255, 0, 0, 0.7)'
      } : {}}>
        <MathJax.Provider>
          <MathJax.Node formula={questionText} />
          <MathJax.Node formula="x" inline /> の値を求めよ
        </MathJax.Provider>
        <div>
          <input className={styles.textbox} placeholder="x" type="text" value={ans} onChange={(e) => {setAns(e.target.value)}} inputMode="numeric" pattern="\d*" />
        </div>
        <button className={styles.button} onClick={verify}>
          決定
        </button>
      </div>
    </>
  )
}

export default Integral
