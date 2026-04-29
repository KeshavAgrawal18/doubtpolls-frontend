import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileLinkClass =
    "block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 sm:text-lg"
        >
          DecisionFlow
        </Link>

        {!isAuthenticated && (
          <nav className="hidden items-center gap-5 sm:flex">
            <NavLink to="/product" className={linkClass}>
              Product
            </NavLink>

            <NavLink to="/use-cases" className={linkClass}>
              Use Cases
            </NavLink>

            <NavLink to="/pricing" className={linkClass}>
              Pricing
            </NavLink>
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/decisions"
                className={`${linkClass} hidden sm:block`}
              >
                All Decisions
              </NavLink>

              <Button size="sm" asChild>
                <Link to="/decisions/create">New Decision</Link>
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={logout}
                className="hidden sm:inline-flex"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                asChild
                className="hidden sm:inline-flex"
              >
                <Link to="/login">Login</Link>
              </Button>

              <Button size="sm" asChild>
                <Link to="/register">Start Free</Link>
              </Button>
            </>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="sm:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t bg-background px-4 py-4 sm:hidden">
          <nav className="space-y-1">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/product"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  Product
                </Link>

                <Link
                  to="/use-cases"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  Use Cases
                </Link>

                <Link
                  to="/pricing"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  Pricing
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/decisions"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  All Decisions
                </Link>

                <Link
                  to="/decisions/create"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  New Decision
                </Link>

                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
