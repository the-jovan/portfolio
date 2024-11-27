"use client";
import { FC, useState, useRef } from "react";
import { IoIosMenu } from "react-icons/io";
import { TbArrowBigUpLines } from "react-icons/tb";
import Image from "next/image";
import "./header.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { classNames } from "@/app/shared/utils";

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

  const openTl = gsap.timeline({ paused: true });
  const closeTl = gsap.timeline({ paused: true });

  useGSAP(() => {
    setBlockLogo(true);

    openTl.to(navRef.current, {
      duration: 0.4,
      height: menuOpen ? "100vh" : "0",
      padding: menuOpen ? "120px" : "0",
      ease: "power4.out",
    });
    openTl.to(
      ".header-nav__link",
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
        ease: "power4.out",
        onComplete: () => {
          setBlockLogo(false);
        },
      },
      "+=.2"
    );

    closeTl.to(".header-nav__link", {
      duration: 0.4,
      opacity: 0,
      y: 8,
      ease: "power4.out",
    });
    closeTl.to(navRef.current, {
      duration: 0.4,
      height: "0",
      padding: "0",
      ease: "power4.out",
      onComplete: () => {
        setBlockLogo(false);
      },
    });

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
          scale: 0.6,
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
          scale: 0.6,
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
  }, [menuOpen]);

  const { contextSafe } = useGSAP({ scope: navRef });
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
    <header>
      <nav ref={navRef} className="header-nav">
        <div className="header-nav__global">
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
              <TbArrowBigUpLines
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
