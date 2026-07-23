"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getHeaderNavItems, isNavItemActive } from "./nav-items";
import { BookOpen, Heart, Users, MessageCircle, AlertCircle, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import facebookIcon from "@/assets/facebook.png";
import instagramIcon from "@/assets/instagram.png";
import whatsappIcon from "@/assets/whatsapp.png";
import "./style.css";

const submenuIcons: Record<string, React.ReactNode> = {
  "/activities/education": <BookOpen size={20} />,
  "/activities/health": <Heart size={20} />,
  "/activities/social": <Users size={20} />,
  "/activities/dawah": <MessageCircle size={20} />,
  "/activities/emergency": <AlertCircle size={20} />,
};

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  const headerNavItems = getHeaderNavItems((key: string) => t(key));

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setActiveSubmenu(null);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [open]);

  const handleClose = () => {
    setActiveSubmenu(null);
    onClose();
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

  const getCurrentSubmenuItems = () => {
    const activeItem = headerNavItems.find((item) => item.label === activeSubmenu);
    return (
      activeItem?.submenu?.map((item) => ({
        ...item,
        icon: submenuIcons[item.href],
      })) || []
    );
  };

  return (
    <div role="presentation" className={`css-1wrk9ak ${open ? "open" : ""}`}>
      <div
        aria-hidden="true"
        className={`css-18273jk ${open ? "backdrop-visible" : ""}`}
        style={
          {
            opacity: open ? 1 : 0,
            transition: "opacity 300ms ease-out",
          } as React.CSSProperties
        }
        onClick={handleClose}
      ></div>
      <div tabIndex={0} data-testid="sentinelStart"></div>
      <div
        id="mobile-navigation-drawer"
        className={`css-9evxgf ${open ? "open" : ""}`}
        tabIndex={-1}
        style={
          {
            "--Paper-shadow": "var(--shadows-16)",
            "--Paper-overlay": "var(--overlays-16)",
            transform: "none",
            transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1)",
          } as React.CSSProperties
        }
      >
        <div
          className="css-1g4yje1"
          onClick={(event) => {
            const target = event.target as HTMLElement;

            if (target.closest("a")) {
              handleClose();
            }
          }}
        >
          <div className="sidebar-nav-wrapper">
            {activeSubmenu === null ? (
              <>
                <div className="css-mh8o4h sidebar-top-row">
                  <Link className="css-0 sidebar-top-brand" href="/" data-discover="true">
                    <div className="css-17hxn37">
                      <Image
                        src={logo}
                        alt="Logo"
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </Link>
                  <button
                    className="css-1wejr83"
                    tabIndex={0}
                    type="button"
                    id=":r30:"
                    aria-label="close-sidebar"
                    onClick={(e) => {
                      createRipple(e);
                      handleClose();
                    }}
                  >
                    <span className="css-4y65cq"></span>
                    <svg
                      className="css-mz9m0q"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="CloseIcon"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  </button>
                </div>
                <div
                  data-simplebar="init"
                  className="minimal__scrollbar__root css-liw4bx simplebar-scrollable-y"
                >
                  <div className="simplebar-wrapper">
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer"></div>
                    </div>
                    <div className="simplebar-mask">
                      <div
                        className="simplebar-offset"
                        style={{ right: "0px", bottom: "0px" } as React.CSSProperties}
                      >
                        <div
                          className="simplebar-content-wrapper"
                          tabIndex={0}
                          role="region"
                          aria-label="scrollable content"
                          style={
                            {
                              height: "100%",
                              overflow: "hidden scroll",
                            } as React.CSSProperties
                          }
                        >
                          <div className="simplebar-content">
                            <nav className="css-i43yf">
                              <ul className="minimal__nav__ul css-1c50pvy">
                                {headerNavItems.map(({ href, label, submenu }) => {
                                  const isActive = isNavItemActive(pathname, href);

                                  return (
                                    <li key={label} className="minimal__nav__li css-233int">
                                      {submenu ? (
                                        <button
                                          className={`minimal__nav__item__root submenu-button ${
                                            isActive ? "--active css-1v3w3ca" : "css-tcwo7c"
                                          }`}
                                          tabIndex={0}
                                          aria-label={label}
                                          onClick={(e) => {
                                            createRipple(e);
                                            setActiveSubmenu(label);
                                          }}
                                        >
                                          <span className="css-v8g0vn">
                                            <span
                                              className={`nav-item-text-content ${isActive ? "css-1b7pja7" : "css-1cshvym"}`}
                                            >
                                              {" "}
                                              {label}
                                            </span>
                                          </span>
                                          <ChevronRight
                                            size={20}
                                            className="sidebar-chevron-icon"
                                          />
                                        </button>
                                      ) : (
                                        <Link
                                          className={`minimal__nav__item__root ${
                                            isActive ? "--active css-1v3w3ca" : "css-tcwo7c"
                                          }`}
                                          tabIndex={0}
                                          aria-label={label}
                                          href={href || "/"}
                                          data-discover="true"
                                        >
                                          <span className="css-v8g0vn">
                                            <span
                                              className={`nav-item-text-content ${
                                                isActive ? "css-1b7pja7" : "css-1cshvym"
                                              }`}
                                            >
                                              {" "}
                                              {label}
                                            </span>
                                          </span>
                                        </Link>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="simplebar-placeholder"
                      style={{ width: "330px", height: "406px" } as React.CSSProperties}
                    ></div>
                  </div>
                  <div className="simplebar-track simplebar-horizontal">
                    <div
                      className="simplebar-scrollbar"
                      style={{ width: "0px", display: "none" } as React.CSSProperties}
                    ></div>
                  </div>
                  <div className="simplebar-track simplebar-vertical">
                    <div
                      className="simplebar-scrollbar"
                      style={
                        {
                          height: "239px",
                          transform: "translate3d(0px, 0px, 0px)",
                          display: "block",
                        } as React.CSSProperties
                      }
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <div
                data-simplebar="init"
                className="minimal__scrollbar__root css-liw4bx simplebar-scrollable-y sidebar-content-fade"
              >
                <div className="simplebar-wrapper">
                  <div className="simplebar-height-auto-observer-wrapper">
                    <div className="simplebar-height-auto-observer"></div>
                  </div>
                  <div className="simplebar-mask">
                    <div
                      className="simplebar-offset"
                      style={{ right: "0px", bottom: "0px" } as React.CSSProperties}
                    >
                      <div
                        className="simplebar-content-wrapper"
                        tabIndex={0}
                        role="region"
                        aria-label="scrollable content"
                        style={
                          {
                            height: "100%",
                            overflow: "hidden scroll",
                          } as React.CSSProperties
                        }
                      >
                        <div className="simplebar-content">
                          <div className="css-mh8o4h sidebar-top-row submenu-top-row">
                            <button
                              className="css-1wejr83"
                              tabIndex={0}
                              type="button"
                              id=":r30:"
                              aria-label="close-sidebar"
                              onClick={(e) => {
                                createRipple(e);
                                handleClose();
                              }}
                            >
                              <span className="css-4y65cq"></span>
                              <svg
                                className="css-mz9m0q"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CloseIcon"
                              >
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                              </svg>
                            </button>
                            <button
                              className="back-button"
                              tabIndex={0}
                              aria-label={t("sidebar.goBack")}
                              onClick={() => setActiveSubmenu(null)}
                            >
                              {t("sidebar.goBack")}
                              <ChevronRight size={24} />
                            </button>
                          </div>
                          <nav className="css-i43yf">
                            <ul className="minimal__nav__ul css-1c50pvy">
                              {getCurrentSubmenuItems().map(({ href, label, icon }) => {
                                const isActive = isNavItemActive(pathname, href);

                                return (
                                  <li key={href} className="minimal__nav__li css-233int">
                                    <Link
                                      className={`minimal__nav__item__root ${
                                        isActive ? "--active css-1v3w3ca" : "css-tcwo7c"
                                      }`}
                                      tabIndex={0}
                                      aria-label={label}
                                      href={href}
                                      data-discover="true"
                                    >
                                      <span className="css-v8g0vn submenu-item-content">
                                        {icon && <span className="submenu-item-icon">{icon}</span>}
                                        <span
                                          className={`nav-item-text-content ${
                                            isActive ? "css-1b7pja7" : "css-1cshvym"
                                          }`}
                                        >
                                          {" "}
                                          {label}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="simplebar-placeholder"
                    style={{ width: "330px", height: "406px" } as React.CSSProperties}
                  ></div>
                </div>
                <div className="simplebar-track simplebar-horizontal">
                  <div
                    className="simplebar-scrollbar"
                    style={{ width: "0px", display: "none" } as React.CSSProperties}
                  ></div>
                </div>
                <div className="simplebar-track simplebar-vertical">
                  <div
                    className="simplebar-scrollbar"
                    style={
                      {
                        height: "239px",
                        transform: "translate3d(0px, 0px, 0px)",
                        display: "block",
                      } as React.CSSProperties
                    }
                  ></div>
                </div>
              </div>
            )}
          </div>
          {activeSubmenu === null && (
            <div className="css-xewxu1">
              <div className="css-1uy8sf7">
                <div role="group" className="sidebar-lang-toggle" aria-label="language selection">
                  <button
                    className={`${locale === "bn" ? "lang-active" : ""} css-mylgi6`}
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
                    className={`${locale === "en" ? "lang-active" : ""} css-mylgi6`}
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
              <div className="sidebar-social-section">
                <p className="sidebar-follow-label">{t("sidebar.followUs")}</p>
                <div className="sidebar-social-icons">
                  <a
                    href="https://www.facebook.com/mazlumummah"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Image src={facebookIcon} alt="Facebook" width={32} height={32} />
                  </a>
                  <a
                    href="https://www.instagram.com/mazlumummah"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Image src={instagramIcon} alt="Instagram" width={32} height={32} />
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <Image src={whatsappIcon} alt="WhatsApp" width={32} height={32} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div tabIndex={0} data-testid="sentinelEnd"></div>
    </div>
  );
};

export default Sidebar;
