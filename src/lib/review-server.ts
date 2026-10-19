import "server-only";
import { createClient as supabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { EMAILJS } from "@/app/emailjs";

export function reviewStore() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Review storage is not configured.");
  return supabaseClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function isReviewAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return false;
  const client = await createClient();
  const { data: { user }, error } = await client.auth.getUser();
  return !error && !!user?.email_confirmed_at && user.email?.toLowerCase() === (process.env.ADMIN_EMAIL || "onlineqaaria@gmail.com").toLowerCase();
}

export async function notifyReview(id: string) {
  const store = reviewStore();
  const { data, error } = await store.from("student_reviews").select("notification_sent_at").eq("id", id).single();
  if (error) throw new Error("Review notification could not be loaded.");
  if (data.notification_sent_at) return;
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST", signal: AbortSignal.timeout(10000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: process.env.EMAILJS_REVIEW_TEMPLATE_ID || EMAILJS.reviewTemplateId,
      user_id: EMAILJS.publicKey,
      ...(process.env.EMAILJS_PRIVATE_KEY ? { accessToken: process.env.EMAILJS_PRIVATE_KEY } : {}),
      template_params: {
        review_id: id,
        admin_url: "https://onlineqaria.com/admin/reviews",
      },
    }),
  });
  if (!response.ok) throw new Error("Email delivery failed.");
  const { error: updateError } = await store.from("student_reviews").update({ notification_sent_at: new Date().toISOString() }).eq("id", id);
  if (updateError) throw new Error("Email delivery status could not be saved.");
}
