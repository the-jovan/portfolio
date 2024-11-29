"use client";
import { FC, useState, useRef } from "react";
import "./header.scss";
import { classNames } from "@/app/shared/utils";

import Image from "next/image";
import Link from "next/link";

import { IoIosMenu, IoIosClose } from "react-icons/io";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockLogo, setBlockLogo] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Something", href: "/something" },
  ];

  const navRef = useRef(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP({ scope: navRef });

  const openTl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.4,
      ease: "power3.out",
    },
    onStart: () => {
      setBlockLogo(true);
      document
        .querySelectorAll(".hideable")
        .forEach((i) => i.classList.add("hide"));
    },
    onComplete: () => {
      setBlockLogo(false);
    },
  });
  const closeTl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.4,
      ease: "power3.out",
    },
    onStart: () => {
      setBlockLogo(true);
    },
    onComplete: () => {
      setBlockLogo(false);
      document
        .querySelectorAll(".hideable")
        .forEach((i) => i.classList.remove("hide"));
    },
  });

  useGSAP(
    () => {
      openTl
        .to(navRef.current, {
          height: "100vh",
          padding: "120px",
        })
        .to(".header-nav__global__heading", {
          opacity: 1,
          y: 0,
        })
        .to(
          ".header-nav__link",
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
          },
          "-=.4"
        );

      closeTl
        .to(".header-nav__link", {
          opacity: 0,
          y: 8,
        })
        .to(
          ".header-nav__global__heading",
          {
            opacity: 0,
            y: -8,
          },
          "-=.4"
        )
        .to(
          navRef.current,
          {
            height: "0",
            padding: "0",
          },
          "-=.2"
        );

      if (menuOpen) {
        openTl.play();
        closeTl.pause();
        gsap.fromTo(
          logoRef.current!.querySelector("#menu-close"),
          {
            scale: 1,
            opacity: 0,
          },
          {
            duration: 0.6,
            scale: 0.8,
            opacity: 1,
            ease: "power4.out",
          }
        );
      } else {
        openTl.pause();
        closeTl.play();
        gsap.fromTo(
          logoRef.current!.querySelector("#menu-open"),
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            duration: 0.6,
            scale: 1,
            opacity: 1,
            ease: "power4.out",
          }
        );
      }
    },
    { dependencies: [menuOpen], scope: navRef }
  );

  const onHoverLogo = contextSafe(() => {
    if (menuOpen) return;
    gsap.to(logoRef.current, {
      duration: 0.2,
      width: "118px",
      ease: "power4.out",
    });
  });
  const onUnhoverLogo = contextSafe(() => {
    if (menuOpen) return;
    gsap.to(logoRef.current, {
      duration: 0.2,
      width: "6px",
      ease: "power4.out",
    });
  });

  const onHoverLink = contextSafe((e: any) => {
    gsap.to(e.currentTarget, {
      duration: 0.1,
      x: 8,
    });
  });
  const onUnhoverLink = contextSafe((e: any) => {
    gsap.to(e.currentTarget, {
      duration: 0.1,
      x: 0,
    });
  });

  return (
    <header className="header">
      <nav ref={navRef} className="header-nav">
        <div className="header-nav__global">
          <div>
            <h3 className="header-nav__global__heading">General</h3>
            <ul className="header-nav__global__list">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="header-nav__link"
                  onMouseOver={(e) => onHoverLink(e)}
                  onMouseOut={(e) => onUnhoverLink(e)}
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="header-nav__global__heading">Something else</h3>
            <ul className="header-nav__global__list">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="header-nav__link"
                  onMouseOver={(e) => onHoverLink(e)}
                  onMouseOut={(e) => onUnhoverLink(e)}
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <aside className="header-aside">
        <div
          className="header-aside__logo"
          onClick={() => !blockLogo && setMenuOpen(!menuOpen)}
          onMouseEnter={onHoverLogo}
          onMouseLeave={onUnhoverLogo}
        >
          <Image
            className="header-aside__logo__image"
            src="/assets/images/logo.webp"
            alt="Jovan Jocic"
            width={80}
            height={80}
          />
          <div
            className={classNames(
              "header-aside__toggle",
              menuOpen && "header-aside__toggle--active"
            )}
            ref={logoRef}
          >
            {menuOpen ? (
              <IoIosClose
                id="menu-close"
                className="header-aside__toggle__icon"
              />
            ) : (
              <IoIosMenu
                id="menu-open"
                className="header-aside__toggle__icon"
              />
            )}
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
