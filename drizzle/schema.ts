import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const siteTable = pgTable("project", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("prompt").notNull(),
    code:json("code"),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
})