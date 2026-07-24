"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import SiteLogo from "@/components/site-logo";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { fetchMenuItems } from "@/lib/cms";
import { ensureSocialPostsNavItem, getHeaderNavItems, hasNavHref, isNavItemActive, menuToHeaderNavItems } from "./nav-items";
import type { HeaderNavItem } from "./nav-items";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import facebookIcon from "@/assets/facebook.png";
import instagramIcon from "@/assets/instagram.png";
import whatsappIcon from "@/assets/whatsapp.png";
import "./style.css";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [cmsNavItems, setCmsNavItems] = useState<HeaderNavItem[]>([]);
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const [isDesktop, setIsDesktop] = useState(false);
  const t = useTranslations();
  const settings = useSiteSettings();

  const headerNavItems = ensureSocialPostsNavItem(cmsNavItems.length ? cmsNavItems : getHeaderNavItems((key: string) => t(key)), (key: string) => t(key));

  useEffect(() => {
    let mounted = true;

    fetchMenuItems().then((items) => {
      if (mounted) {
        setCmsNavItems(menuToHeaderNavItems(items, locale));
      }
    });

    return () => {
      mounted = false;
    };
  }, [locale]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1390px)");

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isHeaderHidden) {
      document.body.classList.add("header-hidden");
    } else {
      document.body.classList.remove("header-hidden");
    }

    return () => {
      document.body.classList.remove("header-hidden");
    };
  }, [isHeaderHidden]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 8) {
        setIsHeaderHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen((currentState) => !currentState);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  };

  return (
    <>
      <header
        className={`minimal__layout__header css-1s2jhtx ${isHeaderHidden ? "is-hidden" : ""}`}
        style={
          {
            "--Paper-shadow": "var(--shadows-4)",
            "--Paper-overlay": "var(--overlays-4)",
          } as React.CSSProperties
        }
      >
        <div className={`css-1fmauag ${!isDesktop && pathname !== "/" ? "has-back-button" : ""}`}>
          {!isDesktop && pathname !== "/" && (
            <button
              className="header-back-btn"
              tabIndex={0}
              type="button"
              aria-label="go-back"
              onClick={(e) => {
                createRipple(e);
                window.history.back();
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="MuiBox-root css-0">
            <Link className="minimal__logo__root css-15br4hf" aria-label="Logo" href="/">
              <SiteLogo />
            </Link>
          </div>
          <div className="css-mxmcl7"></div>
          <nav className="css-pd4t8d">
            <ul className="minimal__nav__ul css-11tjr9x">
              {headerNavItems.map(({ href, label, submenu, target }) => {
                const isActive = isNavItemActive(pathname, href);
                const canNavigate = hasNavHref(href);
                const linkTarget = target === "blank" ? "_blank" : undefined;
                const linkRel = target === "blank" ? "noopener noreferrer" : undefined;
                const itemClassName = `minimal__nav__item__root ${
                  isActive ? "--active css-1owf844" : "css-hsftll"
                }`;
                const itemContent = (
                  <span className="css-kck6wf">
                    {label}
                    {submenu && (
                      <ChevronDown
                        size={14}
                        className={`chevron-icon ${openDropdown === label ? "open" : ""}`}
                      />
                    )}
                  </span>
                );

                return (
                  <li
                    key={label}
                    className={`minimal__nav__li css-233int ${submenu ? "nav-item-with-dropdown" : ""} nav-item-wrapper`}
                    onMouseEnter={() => submenu && setOpenDropdown(label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {canNavigate ? (
                      <Link
                        className={itemClassName}
                        tabIndex={0}
                        aria-label={label}
                        href={href as string}
                        target={linkTarget}
                        rel={linkRel}
                        data-discover="true"
                      >
                        {itemContent}
                      </Link>
                    ) : (
                      <button
                        className={itemClassName}
                        tabIndex={0}
                        type="button"
                        aria-label={label}
                        aria-haspopup={submenu ? "menu" : undefined}
                        aria-expanded={submenu ? openDropdown === label : undefined}
                        onClick={() => submenu && setOpenDropdown((current) => (current === label ? null : label))}
                      >
                        {itemContent}
                      </button>
                    )}

                    {openDropdown === label && submenu && (
                      <div className="nav-dropdown">
                        {submenu.map((item) => {
                          const isItemActive = isNavItemActive(pathname, item.href);
                          const canNavigateSubmenu = hasNavHref(item.href);
                          const submenuTarget = item.target === "blank" ? "_blank" : undefined;
                          const submenuRel = item.target === "blank" ? "noopener noreferrer" : undefined;
                          return canNavigateSubmenu ? (
                            <Link
                              key={item.href}
                              href={item.href as string}
                              className={`nav-dropdown-item ${isItemActive ? "active" : ""}`}
                              target={submenuTarget}
                              rel={submenuRel}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <button
                              key={item.label}
                              type="button"
                              className="nav-dropdown-item"
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="css-gsxq48">
            <div className="css-1uxnsuq">
              <div className="css-0">
                <div className="lang-toggle-wrapper" role="group" aria-label="language selection">
                  <button
                    className={`lang-toggle-btn ${locale === "bn" ? "active" : ""}`}
                    tabIndex={0}
                    type="button"
                    value="bn"
                    aria-pressed={locale === "bn"}
                    aria-label="বাংলা"
                    onClick={() => setLocale("bn")}
                  >
                    বাং
                  </button>
                  <button
                    className={`lang-toggle-btn ${locale === "en" ? "active" : ""}`}
                    tabIndex={0}
                    type="button"
                    value="en"
                    aria-pressed={locale === "en"}
                    aria-label="English"
                    onClick={() => setLocale("en")}
                  >
                    En
                  </button>
                </div>
              </div>
            </div>
            <div className="social-icons-wrapper">
              {settings["site.facebookUrl"] && (
                <a
                  href={settings["site.facebookUrl"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Image
                    src={facebookIcon}
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="social-icon-png"
                  />
                  <svg
                    className="social-icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={20}
                    height={20}
                  >
                    <path
                      d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              )}
              {settings["site.instagramUrl"] && (
                <a
                  href={settings["site.instagramUrl"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Image
                    src={instagramIcon}
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="social-icon-png"
                  />
                  <svg
                    className="social-icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={20}
                    height={20}
                  >
                    <path
                      d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              )}
              {settings["site.whatsappUrl"] && (
                <a
                  href={settings["site.whatsappUrl"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <Image
                    src={whatsappIcon}
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="social-icon-png"
                  />
                  <svg
                    className="social-icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={20}
                    height={20}
                  >
                    <path
                      d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              )}
              {settings["site.youtubeUrl"] && (
                <a
                  href={settings["site.youtubeUrl"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <svg
                    className="social-icon-png"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="#FF0000"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <svg
                    className="social-icon-svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="currentColor"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              )}
              {settings["site.linkedinUrl"] && (
                <a
                  href={settings["site.linkedinUrl"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="social-icon-png"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="#0A66C2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <svg
                    className="social-icon-svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="currentColor"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
            </div>
            <button
              className="css-e5b6qv"
              tabIndex={0}
              type="button"
              id=":r1m:"
              name="menu-button"
              aria-label="menu-button"
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={(e) => {
                createRipple(e);
                handleMenuToggle();
              }}
            >
              <span className="css-4y65cq"></span>
              <svg
                className="css-9u7c9c"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="menu-button"
                width="24"
                height="24"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="var(--palette-text-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="css-4mb1j7"></span>
            </button>
          </div>
        </div>
      </header>
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default Header;
