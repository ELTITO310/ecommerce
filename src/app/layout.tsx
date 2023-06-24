import './globals.css'
import { Inter } from 'next/font/google'

import Header from './components/Layouts/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce',
  description: 'There are the ecommerce proyect',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        </body>
    </html>
  )
}
