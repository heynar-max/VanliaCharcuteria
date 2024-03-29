import { ThemeProvider, CssBaseline } from '@mui/material'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '@/context'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
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
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
