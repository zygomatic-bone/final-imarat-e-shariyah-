import { useQuery } from "@tanstack/react-query";

/* ── Types ── */
export interface NewsArticle {
  id: number;
  title: string;
  titleUrdu: string | null;
  titleKn: string | null;
  excerpt: string;
  excerptUrdu: string | null;
  content: string;
  tag: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: number;
  title: string;
  titleUrdu: string | null;
  content: string;
  tag: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface LeadershipMember {
  id: number;
  name: string;
  nameUrdu: string;
  role: string;
  roleUrdu: string;
  section: "majlis" | "sabiq" | "arkan" | "umumi";
  photoUrl: string;
  bio: string;
  bioUrdu: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Branch {
  id: number;
  city: string;
  cityUrdu: string;
  cityKn: string;
  address: string;
  phone: string;
  photoUrl: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Judge {
  id: number;
  name: string;
  nameUrdu: string;
  role: string;
  roleUrdu: string;
  photoUrl: string;
  since: string;
  sortOrder: number;
  isActive: boolean;
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  category: string;
  sortOrder: number;
  createdAt: string;
}

export interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_banner_image: string;
  org_description: string;
  org_description_urdu: string;
  footer_address: string;
  footer_phone: string;
  footer_email: string;
  footer_hours: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_1_label_urdu: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_2_label_urdu: string;
  stat_3_value: string;
  stat_3_label: string;
  stat_3_label_urdu: string;
  stat_4_value: string;
  stat_4_label: string;
  stat_4_label_urdu: string;
  ticker_items: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_youtube: string;
  social_whatsapp: string;
  org_logo: string;
  [key: string]: string;
}

interface ListResponse<T> {
  items: T[];
  total?: number;
}

interface ListParams {
  limit?: number;
  offset?: number;
  tag?: string;
  section?: string;
  category?: string;
}

function buildQuery(params: ListParams): string {
  const search = new URLSearchParams();
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  if (params.tag) search.set("tag", params.tag);
  if (params.section) search.set("section", params.section);
  if (params.category) search.set("category", params.category);
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request to ${url} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/* ── News ── */
export function useListNewsArticles(params: ListParams = {}) {
  return useQuery({
    queryKey: ["news-articles", params],
    queryFn: () => fetchJson<ListResponse<NewsArticle>>(`/api/news${buildQuery(params)}`),
    staleTime: 30_000,
  });
}

/* ── Notices ── */
export function useListNotices(params: ListParams = {}) {
  return useQuery({
    queryKey: ["notices", params],
    queryFn: () => fetchJson<ListResponse<Notice>>(`/api/notices${buildQuery(params)}`),
    staleTime: 30_000,
  });
}

/* ── Leadership ── */
export function useLeadership(section?: string) {
  return useQuery({
    queryKey: ["leadership", section],
    queryFn: () =>
      fetchJson<ListResponse<LeadershipMember>>(
        `/api/leadership${section ? `?section=${section}` : ""}`,
      ),
    staleTime: 60_000,
  });
}

/* ── Branches ── */
export function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: () => fetchJson<ListResponse<Branch>>(`/api/branches`),
    staleTime: 60_000,
  });
}

/* ── Judges ── */
export function useJudges() {
  return useQuery({
    queryKey: ["judges"],
    queryFn: () => fetchJson<ListResponse<Judge>>(`/api/judges`),
    staleTime: 60_000,
  });
}

/* ── Gallery ── */
export function useGallery(category?: string) {
  return useQuery({
    queryKey: ["gallery", category],
    queryFn: () =>
      fetchJson<ListResponse<GalleryImage>>(
        `/api/gallery${category ? `?category=${category}` : ""}`,
      ),
    staleTime: 60_000,
  });
}

/* ── Site Settings ── */
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: () => fetchJson<SiteSettings>(`/api/settings`),
    staleTime: 60_000,
    retry: 2,
  });
}
