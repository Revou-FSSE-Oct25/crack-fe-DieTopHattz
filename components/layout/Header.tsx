"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_LINKS } from "@/lib/constants";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur supports-backdrop-filter:bg-white/60"
          : "bg-white"
      }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 py-2 px-1 -ml-1"
          onClick={handleLinkClick}
        >
          <Ship className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">FerryGo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {NAVIGATION_LINKS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-gray-700 transition-all duration-300 hover:text-blue-600 group"
            >
              {item.name}
              <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button size="sm" className="relative bg-blue-600 border-none text-white py-3 px-6 rounded-md cursor-pointer text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-[0_0_15px_rgba(37,99,235,0.2),0_0_5px_rgba(37,99,235,0.4)]">
            Sign In
          </Button>
          <Button size="sm" className="relative bg-blue-600 border-none text-white py-3 px-6 rounded-md cursor-pointer text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-[0_0_15px_rgba(37,99,235,0.2),0_0_5px_rgba(37,99,235,0.4)]">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-40 md:hidden overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-6">
              {NAVIGATION_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-lg font-medium text-gray-700 transition-colors hover:text-blue-600 border-b border-gray-100"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              <div className="space-y-3 pt-4">
                <Button variant="outline" size="lg" className="w-full text-base">
                  Sign In
                </Button>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-base">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}