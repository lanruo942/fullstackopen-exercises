/*
 * @Author: Summer Lee
 * @Date: 2022-07-15 16:54:01
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 01:29:04
 */
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const express = require('express')
const http = require('http')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	})

	const schema = makeExecutableSchema({ typeDefs, resolvers })

	const serverCleanup = useServer({ schema }, wsServer)

	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: 'bounded',
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith('bearer ')) {
				const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
				const currentUser = await User.findById(decodedToken.id)
				return { currentUser }
			}
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})

	await server.start()

	server.applyMiddleware({
		app,
		path: '/',
	})

	const PORT = 4000

	httpServer.listen(PORT, () =>
		console.log(`🚀 Server ready at http://localhost:${PORT}$`)
	)
}

start()
