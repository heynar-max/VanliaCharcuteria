import { ThemeProvider, CssBaseline } from '@mui/material'
import { SessionProvider } from "next-auth/react"

import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '@/context'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
          <UiProvider>
            <ThemeProvider theme={ lightTheme }>
              <CssBaseline/>
              <Component {...pageProps}/>
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
