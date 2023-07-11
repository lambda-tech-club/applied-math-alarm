declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv { 
        TOKEN: string, 
        SECRET: string, 
        DEVICE_ID: string,
        ALARM_ENV: 'production' | 'development'
      }
    }
  }
}