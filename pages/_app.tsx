import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRef, useEffect } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const chime = useRef()
  const start = useRef()
  const correct = useRef()
  const incorrect = useRef()
  useEffect(() => {
    chime.current = new Audio("/se/chime.mp3")
    start.current = new Audio("/se/start.mp3")
    correct.current = new Audio("/se/correct.mp3")
    incorrect.current = new Audio("/se/incorrect.mp3")
  }, [])
  return <>
    <Head>
      <title>絶対に起きられる目覚まし時計</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...{...pageProps, chime, start, correct, incorrect}} />
  </>
}

export default MyApp
