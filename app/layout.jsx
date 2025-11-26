import "@/app/assets/styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import  AuthProvider  from "../app/components/AuthProvider";

export const metadata = {
  title: "Property Pulse | Find the perfect place",
  description:
    "Discover Your Dream Home with Property Pulse - Your Ultimate Real Estate Companion",
  keyword:
    "real estate, property listings, homes for sale, apartments for rent, real estate agent, property search, housing market, realty, home buying, home selling",
};

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
