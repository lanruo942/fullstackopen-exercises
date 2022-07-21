/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 01:58:03
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
	ApolloClient,
	ApolloProvider,
	split,
	HttpLink,
	InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('library-user-token')
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null,
		},
	}
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new GraphQLWsLink(
	createClient({
		url: 'ws://localhost:4000',
	})
)

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)
