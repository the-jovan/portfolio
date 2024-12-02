"use client";
import { FC, useRef } from "react";
import "./welcome.scss";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

import { HiMiniArrowSmallRight } from "react-icons/hi2";

const Welcome: FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: introRef });

  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  useGSAP(() => {
    const lines = headingRef.current?.querySelectorAll(".welcome-title__line");
    const introLines = introRef.current?.querySelectorAll(".welcome-row");

    lines?.forEach((line) => {
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: "top bottom",
          toggleActions: "restart none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.3,
      });
    });

    introLines?.forEach((row) => {
      gsap.to(row, {
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
          toggleActions: "restart none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.3,
      });
    });
  });

  const onHoverLink = contextSafe((e: any) => {
    const text = e.currentTarget.querySelector(".welcome-row__text");
    const link = e.currentTarget.querySelector(".welcome-row__link");
    const add = e.currentTarget.querySelector(".welcome-row__add");

    gsap.to(text, {
      y: "-100%",
      duration: 0.1,
    });
    gsap.to(link, {
      y: 0,
      duration: 0.1,
    });
    gsap.to(add, {
      duration: 1,
      ease: "power3.out",
      text: add.dataset.text,
      onComplete: () => {
        add.nextElementSibling.classList.remove(
          "welcome-row__add-icon--hidden"
        );
      },
    });
  });

  const onUnhoverLink = contextSafe((e: any) => {
    const text = e.currentTarget.querySelector(".welcome-row__text");
    const link = e.currentTarget.querySelector(".welcome-row__link");
    const add = e.currentTarget.querySelector(".welcome-row__add");

    gsap.to(text, {
      y: 0,
      duration: 0.1,
    });
    gsap.to(link, {
      y: "100%",
      duration: 0.1,
    });
    gsap.to(add, {
      text: "",
      onComplete: () => {
        add.nextElementSibling.classList.add("welcome-row__add-icon--hidden");
      },
    });
  });

  return (
    <section className="welcome">
      <div className="welcome-content">
        <h1 ref={headingRef} className="welcome-title">
          <div className="welcome-title__line">
            <span>I welcome thee</span>
          </div>
          <div className="welcome-title__line">
            <span>
              fellow <span className="welcome-title--red">wanderer</span>
            </span>
          </div>
          <div className="welcome-title__line welcome-title__epilogue">
            <span>to my humble home</span>
          </div>
        </h1>

        <div ref={introRef} className="welcome-intro">
          <p className="welcome-row__text welcome-row__text--first">
            It ain&apos;t much but you might find what you&apos;re searching
            for.
          </p>
          <div
            className="welcome-row"
            onMouseEnter={onHoverLink}
            onMouseLeave={onUnhoverLink}
          >
            <p className="welcome-row__text">
              I could tell you <span className="welcome-row__red">about</span>
              myself, if you have time for a story.
            </p>
            <Link href="/about" className="welcome-row__link">
              I could tell you <span className="welcome-row__red">about</span>
              myself, if you have time for a story.
              <span className="welcome-row__add" data-text="The road so far" />
              <HiMiniArrowSmallRight className="welcome-row__add-icon welcome-row__add-icon--hidden" />
            </Link>
          </div>
          <div
            className="welcome-row"
            onMouseEnter={onHoverLink}
            onMouseLeave={onUnhoverLink}
          >
            <p className="welcome-row__text">
              You could be searching for something specific?
              <span className="welcome-row__red">Projects</span> perhaps?
            </p>
            <Link href="#" className="welcome-row__link">
              You could be searching for something specific?
              <span className="welcome-row__red">Projects</span> perhaps?
              <span
                className="welcome-row__add"
                data-text="Feel free to look around."
              />
              <HiMiniArrowSmallRight className="welcome-row__add-icon welcome-row__add-icon--hidden" />
            </Link>
          </div>
          <div
            className="welcome-row"
            onMouseEnter={onHoverLink}
            onMouseLeave={onUnhoverLink}
          >
            <p className="welcome-row__text">
              Of course, I wouldn't want to delay your quest.
              <br />
              If you are in a rush, you are welcome to
              <span className="welcome-row__red">contact</span> me. I'll be
              here.
            </p>
            <Link href="/contact" className="welcome-row__link">
              <p className="welcome-row__text">
                Of course, I wouldn’t want to hinder your quest.
                <br />
                If you are in a rush, you are welcome to
                <span className="welcome-row__red">contact</span> me. I'll be
                here.
                <span className="welcome-row__add" data-text="Don't be shy" />
                <HiMiniArrowSmallRight className="welcome-row__add-icon welcome-row__add-icon--hidden" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
