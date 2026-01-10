import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-base-content/10 bg-base-200/30 border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row lg:px-8">
        <div className="flex items-center gap-2 text-lg font-bold tracking-tight opacity-80">
          <Code2 size={20} className="text-primary" />
          <span>KyoCode</span>
        </div>

        <p className="text-base-content/50 text-sm leading-5">
          &copy; {new Date().getFullYear()} KyoCode. Built for collaborative
          coding.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
