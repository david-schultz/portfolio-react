import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { PageProps } from '../src/lib/articles'

config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  return <Component {...pageProps}/>
}

