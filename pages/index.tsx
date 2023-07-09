import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Head from 'next/head'
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

  return (
    <>
      <div className={styles.container}>
        <button onClick={handleClick}>
          Det
        </button>
      </div>
    </>
  )
}

export default Home
