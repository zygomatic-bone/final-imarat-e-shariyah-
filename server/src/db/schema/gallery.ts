import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const galleryImagesTable = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  caption: text("caption").notNull().default(""),
  category: text("category").notNull().default("general"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type GalleryImage = typeof galleryImagesTable.$inferSelect;
