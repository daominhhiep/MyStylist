import type { AppProps } from 'next/app'
import AuthProvider from '../components/AuthProvider'
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import styles from "../styles/Home.module.css";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>MyStylist - Phong Cách Thời Trang</title>
        <meta name="description" content="Khám phá phong cách thời trang với AI"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className={styles.container}>
        <AuthProvider>
          <Navbar/>

          <Component {...pageProps} />
          <Footer/>
        </AuthProvider>
      </div>
    </>
  )
}

export default MyApp