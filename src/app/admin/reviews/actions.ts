"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isReviewAdmin, reviewStore, notifyReview } from "@/lib/review-server";

export async function moderateReview(form: FormData) {
  if (!await isReviewAdmin()) redirect("/admin");
  const id = String(form.get("id") || "");
  const decision = String(form.get("decision") || "");
  if (!/^[0-9a-f-]{36}$/i.test(id) || !["approved", "rejected", "pending", "retry"].includes(decision)) redirect("/admin/reviews?error=invalid");
  if (decision === "approved" && form.get("verified") !== "on") redirect("/admin/reviews?error=verify");
  try {
    if (decision === "retry") await notifyReview(id);
    else {
      const { data, error } = await reviewStore().from("student_reviews").update({ status: decision, moderated_at: new Date().toISOString() }).eq("id", id).select("id").single();
      if (error || !data) throw new Error("Update failed");
    }
  } catch { redirect("/admin/reviews?error=save"); }
  revalidatePath("/reviews"); revalidatePath("/admin/reviews");
  redirect("/admin/reviews?updated=1");
}
