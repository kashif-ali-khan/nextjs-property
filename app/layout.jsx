import "@/assets/styles/global.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "kashif next js",
  keywords: "Next js, First learning",
  description: "This is sample app for learning Next JS",
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>          
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
