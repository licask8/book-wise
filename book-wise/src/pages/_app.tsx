import type { AppProps } from 'next/app'
import { Nunito } from 'next/font/google'
import { globalStyles } from '@/styles/globals'
import { SessionProvider } from 'next-auth/react'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const nunito = Nunito({ subsets: ['latin']})

globalStyles()

export default function App({ Component, pageProps: { session, ...pageProps} }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <SessionProvider session={session}>
      <div className={nunito.className}>
       { getLayout(<Component {...pageProps} />)}
      </div>
    </SessionProvider>
  )
}
