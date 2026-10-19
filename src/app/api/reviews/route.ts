import { NextResponse } from "next/server";
import { reviewStore, notifyReview } from "@/lib/review-server";
import { validateReview } from "@/lib/reviews";

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "JSON required." }, { status: 415 });
  const body = await request.text();
  if (body.length > 12000) return NextResponse.json({ error: "Review is too long." }, { status: 413 });
  let raw: Record<string, unknown>;
  let input;
  try {
    raw = JSON.parse(body);
    if (!raw || typeof raw !== "object" || raw.website) throw new Error("Invalid submission.");
    if (typeof raw.request_key !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw.request_key)) throw new Error("Please reload the form and try again.");
    input = validateReview(raw);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Please check the form." }, { status: 400 });
  }
  try {
    const store = reviewStore();
    const { data: id, error } = await store.rpc("submit_student_review", { payload: input, request_key: raw.request_key });
    if (error?.code === "P0001") return NextResponse.json({ error: "Please wait 24 hours before submitting another review." }, { status: 429 });
    if (error || !id) throw new Error("Storage unavailable");
    try { await notifyReview(id); } catch { console.error("Review saved; admin notification requires retry."); }
    return NextResponse.json({ success: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Reviews cannot be submitted right now. Your form has been kept; please try again later." }, { status: 503 });
  }
}
