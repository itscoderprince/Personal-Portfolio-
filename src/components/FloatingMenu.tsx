import { useState } from 'react';
import { navLinks } from '../constant';
import { cn } from '../lib/utils';

const FloatingMenu = () => {
  const [active, setActive] = useState('#hero');

  return (
    <>
      {/* DESKTOP TOP MENU */}
      <div className="hidden lg:block fixed top-6 left-104 w-[70%] z-50 transition-all duration-300">
        <nav className="bg-white/10 backdrop-blur-sm border border-neutral-700 px-6 py-3 flex items-center justify-between shadow-sm rounded-full">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.link}
                onClick={() => setActive(link.link)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 text-sm transition-all rounded-md",
                  active === link.link
                    ? "text-primary"
                    : "text-neutral-300 hover:text-primary"
                )}
              >
                <Icon className="size-5" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* MOBILE BOTTOM MENU */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <nav className="bg-white/10 backdrop-blur-sm border border-neutral-700 px-4 py-2 rounded-full shadow-lg flex items-center gap-4">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.link}
                onClick={() => setActive(link.link)}
                className={cn(
                  "p-2 rounded-md transition-all",
                  active === link.link
                    ? "text-primary"
                    : "text-neutral-300 hover:text-primary"
                )}
              >
                <Icon className="size-6" />
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default FloatingMenu;
