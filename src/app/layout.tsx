import { ClerkProvider } from '@clerk/nextjs/app-beta'

import Footer from './components/layout/footer'
import Header from './components/layout/header'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: 'Hiryuen',
  description: "Europe's leading bonsai store."
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang='en'
      className={`${inter.className} h-min-full scroll-smooth antialiased`}
    >
      <body className='flex h-min-full flex-col text-stone-700 mx-auto'>
        <ClerkProvider>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout
