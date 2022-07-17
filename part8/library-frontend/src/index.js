/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-18 03:01:35
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:4000',
	}),
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)
