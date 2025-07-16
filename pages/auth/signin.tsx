
import { getProviders, signIn, getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../../styles/Auth.module.css'

export default function SignIn({ providers }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Đăng nhập - OutfitAI</title>
        <meta name="description" content="Đăng nhập vào OutfitAI" />
      </Head>

      <div className={styles.signInBox}>
        <h1 className={styles.title}>Đăng nhập vào OutfitAI</h1>
        <p className={styles.subtitle}>Trải nghiệm thời trang với AI</p>

        {Object.values(providers || {}).map((provider: any) => (
          <div key={provider.name} className={styles.provider}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className={styles.signInButton}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Đăng nhập với Google
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
