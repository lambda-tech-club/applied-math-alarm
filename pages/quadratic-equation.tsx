import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import MathJax from "react-mathjax"
import styles from '../styles/Home.module.css'

/**
 * @param x 解(暫定)
 * @param a 次数 // -8 ~ 8
 * @param b 係数 // 2 ~ 12
 * @param c 定数 // a,b,xから算出
 */

interface Question {
  x: number | null
  a: number
  b: number
  c: number
}

const randint = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min

const QEquation: NextPage = ({ chime, correct, incorrect }: any) => {
  const createQuestion = (): Question => {
    let x: number | null = null
    let a: number
    let b: number
    let c: number
    let dis: number

    do {
      x = randint(-8, 8)
      a = randint(2, 8) // coefficient of x^2
      b = randint(2, 12) // coefficient of x
      c = a * x * x + b * x
      dis = b * b - 4 * a * c
    } while (dis < 0 || Math.sqrt(dis) % 1 !== 0) // √b^2 - 4acが整数でない場合や、判別式が負の場合に再抽選

    return {
      x,
      a,
      b,
      c,
    }
  }

  const [questionText, setQuestionText] = useState("")
  const [answers, setAnswers] = useState<(number | null)[]>([])
  useEffect(() => {
    const questionData = createQuestion()
    const mathJax = String.raw`${questionData.a}x^2 + ${questionData.b}x = ${questionData.c}` // 問題文生成
    setQuestionText(mathJax)
    setAnswers([questionData.x])
  }, [])

  const verify = async () => {
    const parsedAnswers = ans.split(",").map(answer => answer.trim())

    const parsedIntAnswers = parsedAnswers.map(answer => {
      const parsedFraction = answer.split("/") // 分数処理
      if (parsedFraction.length === 2) {
        const numerator = parseInt(parsedFraction[0].trim())
        const denominator = parseInt(parsedFraction[1].trim())
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          return numerator / denominator
        }
      } else {
        const parsedInt = parseInt(answer)
        if (!isNaN(parsedInt)) {
          return parsedInt
        }
      }
      return null
    })

    const filteredAnswers = parsedIntAnswers.filter(answer => answer !== null) as number[]

    if (answers.some(answer => filteredAnswers.includes(answer))) {
      chime.current.pause()
      correct.current.play()
      const result = await fetch(`/api/send?command=1`) // Faild to Fetch ..?
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
          解を求めよ 
        </MathJax.Provider>
        <div>
          <input className={styles.textbox} placeholder="x1 , x2" type="text" value={ans} onChange={(e) => { setAns(e.target.value) }} inputMode="numeric"/>
        </div>
        <button className={styles.button} onClick={verify}>
          決定
        </button>
      </div>
    </>
  )
}

/*
回答形式
x1 , x2
解が存在しない場合はnull
*/

export default QEquation