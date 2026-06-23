import { Router, type IRouter, type Request, type Response } from "express";
import { eq, desc, asc } from "drizzle-orm";
import { db, galleryImagesTable } from "../db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

/* ── PUBLIC: Get gallery images ── */
router.get("/gallery", async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const offset = Number(req.query.offset) || 0;

    const where = category
      ? eq(galleryImagesTable.category, category)
      : undefined;

    const items = await db
      .select()
      .from(galleryImagesTable)
      .where(where)
      .orderBy(asc(galleryImagesTable.sortOrder), desc(galleryImagesTable.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({ items });
  } catch (err: any) {
    console.error("GET /gallery error:", err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/* ── ADMIN: List all gallery images ── */
router.get("/admin/gallery", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const items = await db
      .select()
      .from(galleryImagesTable)
      .orderBy(asc(galleryImagesTable.sortOrder), desc(galleryImagesTable.createdAt));
    res.json({ items });
  } catch (err: any) {
    console.error("GET /admin/gallery error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── ADMIN: Add gallery image ── */
router.post("/admin/gallery", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { url, caption, category, sortOrder } = req.body;
    if (!url) return res.status(400).json({ error: "Image URL is required" });

    const [item] = await db
      .insert(galleryImagesTable)
      .values({
        url,
        caption: caption ?? "",
        category: category ?? "general",
        sortOrder: sortOrder ?? 0,
      })
      .returning();
    res.status(201).json(item);
  } catch (err: any) {
    console.error("POST /admin/gallery error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── ADMIN: Update gallery image ── */
router.put("/admin/gallery/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { url, caption, category, sortOrder } = req.body;

    const [item] = await db
      .update(galleryImagesTable)
      .set({
        url: url ?? undefined,
        caption: caption ?? undefined,
        category: category ?? undefined,
        sortOrder: sortOrder ?? undefined,
      })
      .where(eq(galleryImagesTable.id, id))
      .returning();

    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err: any) {
    console.error("PUT /admin/gallery error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── ADMIN: Delete gallery image ── */
router.delete("/admin/gallery/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    await db.delete(galleryImagesTable).where(eq(galleryImagesTable.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /admin/gallery error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
