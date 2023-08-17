import { ThemeProvider, CssBaseline } from '@mui/material'

import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr'
import { CartProvider, UiProvider } from '@/context'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <CartProvider>
      <UiProvider>
        <ThemeProvider theme={ lightTheme }>
          <CssBaseline/>
          <Component {...pageProps}/>
        </ThemeProvider>
      </UiProvider>
    </CartProvider>
    </SWRConfig>
  )
}
