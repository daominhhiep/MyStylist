import type { AppProps } from 'next/app'
import AuthProvider from '../components/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp