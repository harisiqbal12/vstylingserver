import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	uri:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000/api/graphql'
			: 'https://xplorecreations.vercel.app/api/graphql',
	cache: new InMemoryCache(),
	ssrMode: true,
});

export default apolloClient;