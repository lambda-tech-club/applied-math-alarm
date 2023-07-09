import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({chime, start}) => {
  const router = useRouter();

  const snooze = async () => {
    const pressButton = await fetch(`/api/send?command=2`)
    console.log(await pressButton.json())
    const releaseButton = await fetch(`/api/send?command=off`)
    console.log(await releaseButton.json())
  }

  const handleClick = () => {
    snooze()
    chime.current.loop = true
    chime.current.play()
    start.current.play()
    router.push('/det')
  }

  const [isFlash, setflash] = useState(false);
  const time = new Date()
  useEffect(() => {
    setInterval(() => {
      setflash(true)
      setTimeout(() => {
        setflash(false)
      }, 100)
    }, 1000)
  }, [])

  return (
    <>
      <div className={styles.home} style={isFlash ? {
        background: 'rgba(255, 255, 255, 0.7)'
      } : {}}>
        <p className={styles.text}>
          {`${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}`}
        </p>
        <button className={styles.button} onClick={handleClick}>
          停止
        </button>
      </div>
    </>
  )
}

export default Home
