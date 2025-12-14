"use client";
import React, { useState } from "react";
import { navLinks } from "../constant";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { IconX } from "@tabler/icons-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MobileDock } from "./MobileDock";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = navLinks.map((link) => ({
    name: link.label,
    link: link.link,
  }));

  return (
    <>
      <Navbar className="top-2">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="hidden lg:flex" />
          <div className="hidden lg:flex">
            <ThemeSwitcher />
          </div>
        </NavBody>


      </Navbar>
      <MobileDock />
    </>
  );
};

export default FloatingMenu;
