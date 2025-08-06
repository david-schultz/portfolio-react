import type { AppProps } from 'next/app'

import { PageProps } from '../src/lib/articles'

export default function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  return <Component {...pageProps}/>
}

