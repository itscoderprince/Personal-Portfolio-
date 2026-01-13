"use client";

import React, { useState, useEffect } from "react";
import { navLinks } from "../constant";
import {
  Navbar,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MobileDock } from "./MobileDock";

const FloatingMenu = () => {
  const [activeLink, setActiveLink] = useState("#");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.link.replace('#', ''));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveLink(`#${section}`);
          break;
        }
      }
      if (window.scrollY < 50) setActiveLink('/');
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = navLinks.map((link) => ({
    name: link.label,
    link: link.link,
    icon: link.icon,
  }));

  return (
    <>
      <Navbar className="top-2 text-black dark:text-white">
        <NavBody>
          <div className="flex items-center gap-4">
            <a href="/" className="font-bold text-lg tracking-tighter">PRINCE</a>
          </div>
          <NavItems
            items={navItems}
            className="hidden lg:flex"
            activeLink={activeLink}
            onItemClick={(link) => setActiveLink(link)}
          />
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
