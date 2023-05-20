import '@/styles/globals.scss'
import { Header } from '@/components'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
    </>
  )
}
