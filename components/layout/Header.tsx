"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Ship, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_LINKS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout, loading } = useAuth();
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

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Ship className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FerryGo</span>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/60"
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

        {/* Auth Section - Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:bg-gray-100 transition-colors pl-2 pr-3 py-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bookings" className="cursor-pointer">
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                
                {/* Show Admin Dashboard link only for admin users */}
                {user?.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="lg" className="w-full text-base" asChild>
                      <Link href="/bookings" onClick={handleLinkClick}>
                        My Bookings
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full text-base" asChild>
                      <Link href="/profile" onClick={handleLinkClick}>
                        Profile Settings
                      </Link>
                    </Button>
                    {user?.role === 'admin' && (
                      <Button variant="outline" size="lg" className="w-full text-base" asChild>
                        <Link href="/admin" onClick={handleLinkClick}>
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full text-base text-red-600 border-red-200 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="lg" className="w-full text-base" asChild>
                      <Link href="/login" onClick={handleLinkClick}>
                        Sign In
                      </Link>
                    </Button>
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base" asChild>
                      <Link href="/register" onClick={handleLinkClick}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}