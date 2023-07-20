import { ThemeProvider, CssBaseline } from '@mui/material'


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline/>
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}
