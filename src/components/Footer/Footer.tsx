import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        {/* Left */}
        <div className="text-center md:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">DecisionFlow</span>
          </p>
          <p className="mt-1 text-xs">
            Built for teams that want clarity, not more discussion.
          </p>
        </div>

        {/* Middle Links */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/product"
            className="hover:text-foreground transition-colors"
          >
            Product
          </Link>

          <Link
            to="/use-cases"
            className="hover:text-foreground transition-colors"
          >
            Use Cases
          </Link>

          <Link
            to="/pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:your@email.com"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>

          <a
            href="https://github.com/keshavagrawal18"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
