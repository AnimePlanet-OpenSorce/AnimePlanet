import { episode, user } from './index';
import { relations, sql } from 'drizzle-orm';
import { pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const comment = pgTable(
	'comment',
	{
		userId: text()
			.references(() => user.id, { onUpdate: 'cascade' })
			.notNull(),
		episodeId: uuid()
			.references(() => episode.id, { onUpdate: 'cascade' })
			.notNull(),
		body: text().notNull(),
		createAt: timestamp().defaultNow().notNull(),
		updateAt: timestamp()
			.$onUpdate(() => sql`now()`)
			.notNull()
	},
	(t) => [primaryKey({ columns: [t.userId, t.episodeId] })]
);
export const comment_Relations = relations(comment, ({ one }) => ({
	user: one(user, {
		fields: [comment.userId],
		references: [user.id]
	}),
	episode: one(episode, {
		fields: [comment.episodeId],
		references: [episode.id]
	})
}));
