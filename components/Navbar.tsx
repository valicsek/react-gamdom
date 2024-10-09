"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

const Navbar: React.FC = () => {
  return (
    <header className="bg-[var(--bg-navbar)] text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Image src="/images/gamdom-icon.jpg" priority alt="Logo" width={125} height={125} />
        {/* Navigation Links */}
        <nav className="flex flex-row gap-4">
          <Button variant="secondary" onClick={() => {}}>
            Sign In
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Create Account
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
