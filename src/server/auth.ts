import { db } from '@/server/db';
import { pgTable } from '@/server/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { AuthOptions, DefaultSession } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}

export const authOptions = {
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
	adapter: DrizzleAdapter(db, pgTable),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
	],
	pages: {
		"signIn": "/signin",
	}
} satisfies AuthOptions;

export const getServerAuthSession = () => getServerSession(authOptions);
