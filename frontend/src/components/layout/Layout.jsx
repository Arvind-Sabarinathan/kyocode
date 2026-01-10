import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-base-100 text-base-content selection:bg-primary/20 selection:text-primary min-h-screen font-sans antialiased">
      <Navbar />
      <main className="relative flex w-full flex-col overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
