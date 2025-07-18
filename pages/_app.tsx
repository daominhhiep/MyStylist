import type { AppProps } from 'next/app'
import AuthProvider from '../components/AuthProvider'
import Navbar from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp