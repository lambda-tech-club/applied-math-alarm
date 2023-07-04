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
    chime.current.play()
    const bot = await fetch('/api/send?command=on')
    console.log(await bot.json())
  }

  return (
    <>
      <div className={feedbackStyle}>
        <h1 className={styles.title}>{feedback}</h1>
      </div>
      <div className={styles.container}>
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
