"use client";

import React from "react";
import { Dock, DockIcon } from "./ui/dock";
import { navLinks } from "../constant";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const MobileDock = () => {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto lg:hidden">
            <Dock className="items-center pb-2 bg-white/80 dark:bg-black/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-md shadow-xl gap-3 rounded-full">
                {navLinks.map((item, idx) => (
                    <DockIcon key={idx} className="h-10 w-10 bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800">
                        <a href={item.link} className="flex items-center justify-center w-full h-full text-neutral-600 dark:text-neutral-300">
                            <item.icon className="h-5 w-5" />
                        </a>
                    </DockIcon>
                ))}
                {/* Separator */}
                <div className="h-8 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Theme Switcher in Dock */}
                <DockIcon className="h-10 w-10 bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800">
                    <div className="flex items-center justify-center w-full h-full">
                        <ThemeSwitcher />
                    </div>
                </DockIcon>
            </Dock>
        </div>
    );
};
