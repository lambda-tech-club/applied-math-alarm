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
  x2: number | null
  a: number
  b: number
  c: number
}

const randint = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min

const QEquation: NextPage = ({ chime, correct, incorrect }: any) => {
  const createQuestion = (): Question => {
    let x: number | null = null
    let x2: number | null = null
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
    } while (dis < 0 || Math.sqrt(dis) % 1 !== 0 || (x == 0 && Math.random() > 0.3)) // √b^2 - 4acが整数でない場合や、判別式が負の場合に再抽選&調整

    // x2を計算 (二つ目の解)
    x2 = (-b - Math.sqrt(dis)) / (2 * a)

    return {
      x,
      x2,
      a,
      b,
      c,
    }
}


  const [questionText, setQuestionText] = useState("")
  const [answers, setAnswers] = useState<(number | null)[]>([])
  useEffect((): any => {
    const questionData = createQuestion()
    const mathJax = String.raw`${questionData.a}x^2 + ${questionData.b}x = ${questionData.c}` // 問題文生成
    setQuestionText(mathJax)
    let answerBox = [questionData.x, questionData.x2]
    if (questionData.x == null || questionData.x2 == null) return [0,0];
    if (questionData.x2 > questionData.x) {
      answerBox = [questionData.x2 , questionData.x]
    }
    setAnswers(answerBox)
  }, [])

  const verify = async () => {
    let myAnswerBox = [ans, ans2]
    if (ans2 > ans) {
      myAnswerBox = [ans2, ans]
    }
    const ansBox = `${myAnswerBox[0]},${myAnswerBox[1]}`;
    const parsedAnswers = ansBox.split(",").map(answer => answer.trim())

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

    console.log(filteredAnswers, answers)
    if (Math.floor(answers[0]!) == Math.floor(filteredAnswers[0]) && Math.floor(answers[1]!) == Math.floor(filteredAnswers[1])) {
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
        setAns2('')
      }, 200)
    }
  }

  const router = useRouter()
  const [ans, setAns] = useState("")
  const [ans2, setAns2] = useState("")
  const [isFlash, setflash] = useState(false)

  function addMinus(target: number) {
    if (target == 1) {
      setAns(ans + "-")
    }else {
      setAns2(ans2 + "-")
    }
  }

  function addWeri(target: number) {
    if (target == 1) {
      setAns(ans + "/")
    }else {
      setAns2(ans2 + "/")
    }
  }


  return (
    <>
      <div className={styles.formula} style={isFlash ? {
        background: 'rgba(255, 0, 0, 0.7)'
      } : {}}>
        <MathJax.Provider>
          <MathJax.Node formula={questionText} />
          解を求めよ 
        </MathJax.Provider>
        <div className={styles.textbox_box}>
          <MathJax.Provider>
            <MathJax.Node formula="x =" />
            <div className={styles.textbox_method}>
              <button onClick={() => {addMinus(1)}}>ー</button>
              <button onClick={() => {addWeri(1)}}>/</button>
            </div>
            <input className={styles.textbox_child} placeholder="x1" type="text" value={ans} onChange={(e) => { setAns(e.target.value) }} inputMode="numeric"/>
            <span className={styles.textbox_comma}>,</span>
            <div className={styles.textbox_method}>
              <button onClick={() => {addMinus(2)}}>ー</button>
              <button onClick={() => {addWeri(2)}}>/</button>
            </div>
            <input className={styles.textbox_child} placeholder="x2" type="text" value={ans2} onChange={(e) => { setAns2(e.target.value) }} inputMode="numeric"/>
          </MathJax.Provider>
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