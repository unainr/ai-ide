import { json, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const siteTable = pgTable("project", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: varchar("user_id").notNull(),
	name: text("prompt").notNull(),
	code: json("code"),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});
