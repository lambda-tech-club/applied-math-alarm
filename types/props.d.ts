type AudioRefs = {
  chime: MutableRefObject<HTMLAudioElement | undefined>,
  correct: MutableRefObject<HTMLAudioElement | undefined>,
  incorrect: MutableRefObject<HTMLAudioElement | undefined> | MutableRefObject<HTMLAudioElement | undefined>,
  start: MutableRefObject<HTMLAudioElement | undefined> | MutableRefObject<HTMLAudioElement | undefined>,
};

declare module 'react-mathjax';
