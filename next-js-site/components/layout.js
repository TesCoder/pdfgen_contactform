import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./navbar";
import MarqueeDisplay from "./marqueeDisplay";

const noNavPages = ["/contact"];

export default function Layout({ children }) {
  const { pathname } = useRouter();

  // hides navigation bar and footer when page is used in iFrame in /contact
  // an iFrame of ContactForm is implemented in SQS site temporarily
  const hide = noNavPages.includes(pathname);

  return (
    <>
    <div className="mt-20"></div>
      {!hide && <Navbar/>}
      <MarqueeDisplay/>
      <main className="min-h-screen font-raleway">{children}</main>
      {!hide && <Footer />}
    </>
  );
}
