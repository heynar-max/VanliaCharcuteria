import { ThemeProvider, CssBaseline } from '@mui/material'

import '@/styles/globals.css'
import { lightTheme } from '@/themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline/>
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}
