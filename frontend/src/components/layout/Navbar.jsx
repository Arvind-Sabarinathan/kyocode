import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import clsx from "clsx";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for shrink effect and sticky background
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Problems", href: "#problems" },
    { name: "FAQ", href: "#faq" },
  ];

  const { user } = useUser();

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex w-full justify-center">
      <motion.nav
        layout
        className={clsx(
          "ease-spring pointer-events-auto transition-all duration-500",
          scrolled
            ? "bg-base-100/80 border-base-content/5 mt-4 w-[90%] max-w-4xl rounded-full border px-6 py-3 shadow-lg backdrop-blur-xl"
            : "w-full max-w-7xl border-transparent bg-transparent px-6 py-6 lg:px-8",
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-base-content flex items-center gap-2 text-xl font-bold tracking-tight">
            <div
              className={clsx(
                "bg-primary/10 text-primary flex items-center justify-center rounded-xl transition-all duration-300",
                scrolled ? "h-8 w-8" : "h-10 w-10",
              )}
            >
              <Code2 size={scrolled ? 18 : 24} strokeWidth={2} />
            </div>
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text tracking-wide text-transparent">
              KyoCode
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-16 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base-content/80 hover:text-primary text-sm font-medium tracking-widest uppercase transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden items-center gap-4 md:flex">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className={clsx(
                    "btn btn-primary rounded-full font-semibold uppercase transition-all duration-300",
                    scrolled
                      ? "btn-sm h-9 min-h-0 px-5"
                      : "btn-sm h-10 min-h-0 px-6",
                  )}
                >
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <span className="text-base-content/80 font-bold">
                  {user?.firstName + " " + user?.lastName || user?.username}
                </span>
                <UserButton />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Toggle */}
          <button
            className="text-base-content/80 p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Content */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-base-100 border-base-content/10 absolute top-full right-0 left-0 mx-4 mt-4 flex flex-col gap-6 rounded-2xl border p-6 shadow-2xl md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base-content/90 text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="bg-base-content/10 h-px w-full"></div>
              <div className="flex flex-col gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="btn btn-primary w-full rounded-full">
                      Log in
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <span className="text-base-content/80 font-bold">
                      {user?.firstName + " " + user?.lastName || user?.username}
                    </span>
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
