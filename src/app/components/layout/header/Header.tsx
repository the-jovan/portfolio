"use client";
import { FC, useState, useRef } from "react";
import { IoIosMenu } from "react-icons/io";
import Image from "next/image";
import "./header.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockLogo, setBlockLogo] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const link1Ref = useRef(null);

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
      link1Ref.current,
      {
        duration: 0.4,
        opacity: 1,
        onComplete: () => {
          setBlockLogo(false);
        },
      },
      "+=.2"
    );

    closeTl.to(link1Ref.current, {
      duration: 0.4,
      opacity: 0,
    });
    closeTl.to(
      navRef.current,
      {
        duration: 0.4,
        height: "0",
        padding: "0",
        ease: "power4.out",
        onComplete: () => {
          setBlockLogo(false);
        },
      },
      "+=.2"
    );

    if (menuOpen) {
      openTl.play();
      closeTl.pause();
    } else {
      openTl.pause();
      closeTl.play();
    }
  }, [menuOpen]);

  const { contextSafe } = useGSAP({ scope: logoRef });
  const onHoverLogo = contextSafe(() => {
    gsap.to(logoRef.current, {
      duration: 0.3,
      width: "118px",
      ease: "power4.out",
    });
  });
  const onUnhoverLogo = contextSafe(() => {
    gsap.to(logoRef.current, {
      duration: 0.3,
      width: "8px",
      ease: "power4.out",
    });
  });

  return (
    <header>
      <nav ref={navRef} className="header-nav">
        <Link ref={link1Ref} className="header-nav__link" href="/about">
          About
        </Link>
      </nav>
      <aside className="header-aside">
        <div
          className="header-aside__logo"
          onClick={() => !blockLogo && setMenuOpen(!menuOpen)}
          onMouseEnter={onHoverLogo}
          onMouseLeave={onUnhoverLogo}
        >
          <Image
            src="/assets/images/logo.webp"
            alt="Jovan Jocic"
            width={80}
            height={80}
          />
          <div className="header-aside__toggle" ref={logoRef}>
            <IoIosMenu className="header-aside__toggle__hamburger" />
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
