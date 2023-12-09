import type { AdapterAccount } from '@auth/core/adapters';
import {
	index,
	integer,
	pgTableCreator,
	primaryKey,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const pgTable = pgTableCreator(name => `prod_app_${name}`);

export const posts = pgTable(
	'posts',
	{
		id: serial('id').primaryKey(),
		content: text('content'),
		createdById: text('created_by_id').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	post => ({
		createdByIdIdx: index('createdById_idx').on(post.createdById),
		contentIndex: index('content_idx').on(post.content),
	})
);

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
		refresh_token_expires_in: integer('refresh_token_expires_in'),
	},
	account => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	vt => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
);
