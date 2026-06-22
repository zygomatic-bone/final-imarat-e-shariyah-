import { Router, type IRouter, type Request, type Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

/* ── Configure Cloudinary ── */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  api_key: process.env.CLOUDINARY_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

/* ── ADMIN: Generate upload signature ── */
router.post("/admin/upload/sign", requireAdmin, (req: Request, res: Response) => {
  const folder = (req.body.folder as string) ?? "imarat-e-shariah";
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET ?? "",
  );

  res.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  });
});

/* ── ADMIN: Confirm upload (optional server-side validation) ── */
router.post("/admin/upload/confirm", requireAdmin, (req: Request, res: Response) => {
  const { publicId, version, signature } = req.body;
  if (!publicId || !signature) {
    return res.status(400).json({ error: "publicId and signature required" });
  }
  res.json({ ok: true, url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${publicId}` });
});

export default router;
