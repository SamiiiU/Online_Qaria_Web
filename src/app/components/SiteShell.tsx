import BookingModal from "./BookingModal";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import StickyCta from "./StickyCta";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <StickyCta />
      <BookingModal />
    </>
  );
}
