import '@/styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
    }, // optional
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
    }, // optional
  }
})

export default function App({ Component, pageProps }) {
  return (
    <NextThemesProvider defaultTheme='system' attribute='class' value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  )
}
