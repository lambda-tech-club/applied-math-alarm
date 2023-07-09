import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRef, useEffect } from 'react'

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
  return <Component {...{...pageProps, chime, start, correct, incorrect}} />
}

export default MyApp
