'use client'

import { NextUIProvider } from '@nextui-org/system'

import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { ApolloProvider } from './apollo'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const router = useRouter()

  return (
    <ApolloProvider>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextUIProvider>
    </ApolloProvider>
  )
}
