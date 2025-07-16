
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'

type AppPropsWithAuth = AppProps & {
  pageProps: {
    session?: Session
  }
}

export default function AuthProvider({ 
  children, 
  pageProps: { session, ...pageProps } 
}: { children: React.ReactNode; pageProps: AppPropsWithAuth['pageProps'] }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
