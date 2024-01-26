import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Codonvert | mRNA to Amino Acid Converter',
  description: 'Convert any mRNA sequence to Amino Acids',
}

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--display-font",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
