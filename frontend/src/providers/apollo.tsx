import { ApolloProvider as ApolloProviderBase } from '@apollo/client'

import { ReactNode } from 'react'

import client from '@/lib/apollo-client'

type Props = {
  children: ReactNode
}

export const ApolloProvider = ({ children }: Props) => {
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>
}
