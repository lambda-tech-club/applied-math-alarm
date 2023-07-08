import type { NextPage } from 'next'
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const RemoteButton = ({ command, children }) => {
  const chime = useRef()

  useEffect(() => {
    chime.current = new Audio("/se/chime.wav")
  }, [])

  const handleClickButton = async (): void => {
    chime.current.play()
    const bot = await fetch(`/api/send?command=${command}`)
    console.log(await bot.json())
  }

  return (
    <>
      <Image
        onClick={handleClickButton}
        src="/img/close.png"
        width={250}
        height={250}
      />
    </>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <RemoteButton command="1"></RemoteButton>
        <RemoteButton command="2"></RemoteButton>
        <RemoteButton command="off"></RemoteButton>
      </div>
    </>
  )
}

export default Home
