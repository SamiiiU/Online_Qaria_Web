"use client";

export const OPEN_BOOKING_EVENT = "open-booking";

export default function BookButton({
  className = "",
  children = "Free Demo Book Karein",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_BOOKING_EVENT))}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
