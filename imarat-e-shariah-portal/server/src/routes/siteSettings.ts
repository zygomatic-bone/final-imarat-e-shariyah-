import { Router, type IRouter, type Request, type Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db, siteSettingsTable } from "../db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

/* ── Default settings keys ── */
const DEFAULT_SETTINGS: Record<string, string> = {
  hero_title: "Imarat-e-Shariah",
  hero_subtitle: "A Supreme Islamic Judicial Authority",
  hero_description: "اعلیٰ دینی عدالتی ادارہ — بنگلور، کرناٹک",
  hero_banner_image: "",
  org_description: "Karnataka's supreme Islamic judicial authority — delivering Sharia-based justice and community guidance since its founding.",
  org_description_urdu: "اعلیٰ دینی عدالتی ادارہ — بنگلور، کرناٹک",
  footer_address: "Markazi Darul Qaza, Shivajinagar, Bengaluru, Karnataka 560001, India",
  footer_phone: "+91 80 2559 0000",
  footer_email: "info@imarateshariah.in",
  footer_hours: "Sat–Thu, 9 AM – 5 PM IST",
  stat_1_value: "1971",
  stat_1_label: "Founded",
  stat_1_label_urdu: "قیام",
  stat_2_value: "20+",
  stat_2_label: "Branches",
  stat_2_label_urdu: "شاخیں",
  stat_3_value: "6",
  stat_3_label: "Departments",
  stat_3_label_urdu: "شعبے",
  stat_4_value: "50+",
  stat_4_label: "Years Serving",
  stat_4_label_urdu: "سال خدمت",
  ticker_items: JSON.stringify([
    "Annual Shura Conference 2025 — Registration Now Open",
    "New Fatwa Guidelines on Digital Finance Published",
    "Darul Qaza: Hearing Schedule for Q4 2025 Released",
    "سالانہ اجلاس شوریٰ ۲۰۲۵ — رجسٹریشن جاری ہے",
    "New Mangaluru Branch Inauguration — October 2025",
  ]),
  social_facebook: "",
  social_twitter: "",
  social_instagram: "",
  social_youtube: "",
  social_whatsapp: "",
  org_logo: "",
};

/* ── Helper: get all settings as key-value map ── */
async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettingsTable);
  const map: Record<string, string> = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

/* ── PUBLIC: Get all site settings ── */
router.get("/settings", async (_req: Request, res: Response) => {
  const settings = await getAllSettings();
  res.json(settings);
});

/* ── ADMIN: Get all site settings ── */
router.get("/admin/settings", requireAdmin, async (_req: Request, res: Response) => {
  const settings = await getAllSettings();
  res.json(settings);
});

/* ── ADMIN: Update a single setting ── */
router.put("/admin/settings/:key", requireAdmin, async (req: Request, res: Response) => {
  const key = req.params.key;
  const value = req.body.value ?? "";

  const [existing] = await db
    .select()
    .from(siteSettingsTable)
    .where(eq(siteSettingsTable.key, key));

  if (existing) {
    const [updated] = await db
      .update(siteSettingsTable)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettingsTable.key, key))
      .returning();
    res.json(updated);
  } else {
    const [inserted] = await db
      .insert(siteSettingsTable)
      .values({ key, value })
      .returning();
    res.json(inserted);
  }
});

/* ── ADMIN: Bulk update settings ── */
router.put("/admin/settings", requireAdmin, async (req: Request, res: Response) => {
  const updates = req.body as Record<string, string>;
  if (!updates || typeof updates !== "object") {
    return res.status(400).json({ error: "Invalid settings object" });
  }

  for (const [key, value] of Object.entries(updates)) {
    const [existing] = await db
      .select()
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.key, key));

    if (existing) {
      await db
        .update(siteSettingsTable)
        .set({ value: String(value), updatedAt: new Date() })
        .where(eq(siteSettingsTable.key, key));
    } else {
      await db
        .insert(siteSettingsTable)
        .values({ key, value: String(value) });
    }
  }

  const settings = await getAllSettings();
  res.json(settings);
});

export { getAllSettings, DEFAULT_SETTINGS };
export default router;
