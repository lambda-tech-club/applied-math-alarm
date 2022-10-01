import type { NextPage } from 'next'
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const announce = useRef()
  const notice = useRef()
  const chime = useRef()
  const warn = useRef()

  const [feedback, setFeedback] = useState()
  const [feedbackStyle, setFeedbackStyle] = useState(styles.feedback)

  useEffect(() => {
    announce.current = new Audio("/se/announce.wav")
    notice.current = new Audio("/se/notice.wav")
    chime.current = new Audio("/se/chime.wav")
    warn.current = new Audio("/se/warn.wav")
  }, [])

  const handleClickCloseButton = async (): void => {
    const status = await fetch('/api/status')
    const { moveDetected } = await status.json()
    if (moveDetected) {
      setFeedback("手を離してください")
      setFeedbackStyle(styles.feedbackwarn)
      notice.current.play()
      warn.current.play()
      return
    }
    setFeedbackStyle(styles.feedbackinfo)
    setFeedback("口を閉じます")
    announce.current.play()
    chime.current.play()
    const bot = await fetch('/api/close')
    console.log(await bot.json())
  }

  return (
    <>
      <div className={feedbackStyle}>
        <h1 className={styles.title}>{feedback}</h1>
      </div>
      <div className={styles.container}>
        <Image
          src="/img/open.png"
          width={250}
          height={250}
        />
        <Image
          onClick={handleClickCloseButton}
          src="/img/close.png"
          width={250}
          height={250}
        />
      </div>
    </>
  )
}

export default Home
