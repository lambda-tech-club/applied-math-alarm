import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import MathJax from "react-mathjax"
import styles from '../styles/Home.module.css'

const Differential: NextPage = ({chime, correct, incorrect}) => {

  const generateSolution = () => {
    const solution = Array.from({ length: 2 }, () =>
      Math.floor(Math.random() * 9 + 1)
    )
    // 重解にならないように調整する
    return solution[0] === solution[1] ? generateSolution() : solution
  }

  const verify = async () => {
    const regular = Number(C1) === S[0] && Number(C2) === S[1]
    const reverse = Number(C2) === S[0] && Number(C1) === S[1]
    if (regular || reverse) {
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
        setC1('')
        setC2('')
      }, 200)
    }
  }

  const router = useRouter()
  const [K, setK] = useState(Math.floor(Math.random() * 4 + 2))
  const [S, setS] = useState(generateSolution())
  const [C1, setC1] = useState('')
  const [C2, setC2] = useState('')
  const [isFlash, setflash] = useState(false)
  console.log(S)

  const equation = String.raw`
    ${K} \frac{\mathrm{d}^{2}x}{\mathrm{d}t^{2}}
    - ${K * (S[0] + S[1])} \frac{\mathrm{d}x}{\mathrm{d}t}
    + ${K * S[0] * S[1]} x = 0
  `
  
  return (
    <>
      <div className={styles.formula} style={isFlash ? {
        background: 'rgba(255, 0, 0, 0.7)'
      } : {}}>
        <MathJax.Provider>
          <MathJax.Node formula={equation} />
          <MathJax.Node inline formula="x = C_{1}e^{\alpha t} + C_{2}e^{\beta t}" />
          とすると
        </MathJax.Provider>
        <p>
          α=
          <input className={styles.diffans} placeholder="解1" type="text" value={C1} onChange={(e) => {setC1(e.target.value)}} inputMode="numeric" pattern="\d*" />
          ,β=
          <input className={styles.diffans} placeholder="解2" type="text" value={C2} onChange={(e) => {setC2(e.target.value)}} inputMode="numeric" pattern="\d*" />
          <button className={styles.button} onClick={verify}>
            決定
          </button>
        </p>
      </div>
    </>
  )
}

export default Differential
