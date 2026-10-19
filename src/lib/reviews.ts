export const ratingLabels = {
  punctuality: "Punctuality",
  clarity: "Clarity of explanation",
  patience: "Patience and encouragement",
  communication: "Communication with parents",
} as const;

export type RatingKey = keyof typeof ratingLabels;
export type ReviewInput = {
  display_name: string; role: string; city: string; country: string;
  phone: string; course: string; duration: string; learned: string;
  experience: string; improvements: string;
  punctuality: number; clarity: number; patience: number; communication: number;
};
export type PublicReview = Omit<ReviewInput, "phone"> & { id: string; created_at: string };
export const publicReviewColumns = "id,display_name,role,city,country,course,duration,learned,experience,improvements,punctuality,clarity,patience,communication,created_at";
export const courses = ["Noorani Qaida", "Nazra Quran", "Tajweed", "Duas and Islamic manners", "Other"];
export const durations = ["Trial lesson", "Less than a month", "1-3 months", "3-6 months", "More than 6 months"];
export const reviewCountries = [
  ["Pakistan", "+92"], ["United Kingdom", "+44"], ["United Arab Emirates", "+971"],
  ["Saudi Arabia", "+966"], ["United States", "+1"], ["Canada", "+1"],
  ["Qatar", "+974"], ["Oman", "+968"], ["Kuwait", "+965"], ["Bahrain", "+973"],
  ["Australia", "+61"], ["Germany", "+49"], ["Italy", "+39"], ["France", "+33"],
  ["Spain", "+34"], ["Norway", "+47"], ["Denmark", "+45"], ["Netherlands", "+31"],
  ["Ireland", "+353"], ["South Africa", "+27"],
] as const;

export function validateReview(raw: Record<string, unknown>): ReviewInput {
  if (raw.consent !== true || raw.adult !== true) throw new Error("Please confirm your age and permission to publish.");
  const text = (key: string, min: number, max: number) => {
    const value = typeof raw[key] === "string" ? raw[key].trim() : "";
    if (value.length < min || value.length > max) throw new Error(`Please check ${key.replaceAll("_", " ")} (${min}-${max} characters).`);
    return value;
  };
  const data = {
    display_name: text("display_name", 2, 60), role: text("role", 1, 30),
    city: text("city", 2, 80), country: text("country", 2, 80), phone: text("phone", 8, 16),
    course: text("course", 1, 60), duration: text("duration", 1, 40),
    learned: text("learned", 20, 1200), experience: text("experience", 30, 2000),
    improvements: text("improvements", 0, 1000),
  };
  if (!/^\+[1-9]\d{7,14}$/.test(data.phone)) throw new Error("Enter a valid phone number with country code.");
  if (!["Parent / guardian", "Adult student"].includes(data.role) || !courses.includes(data.course) || !durations.includes(data.duration) || !reviewCountries.some(([name]) => name === data.country)) throw new Error("Please choose valid options.");
  const ratings = {} as Record<RatingKey, number>;
  for (const key of Object.keys(ratingLabels) as RatingKey[]) {
    const rating = raw[key];
    if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error(`Please rate ${ratingLabels[key].toLowerCase()}.`);
    ratings[key] = rating;
  }
  return { ...data, ...ratings };
}
