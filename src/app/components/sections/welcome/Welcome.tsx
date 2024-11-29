"use client";
import { FC, useRef } from "react";
import "./welcome.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Welcome: FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const lines = headingRef.current?.querySelectorAll(".welcome-title__line");

    lines?.forEach((line) => {
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          markers: true,
          toggleActions: "restart none none reverse",
        },
        y: 0,
        duration: 0.4,
      });
    });
  });

  return (
    <section className="welcome">
      <div className="welcome-content hideable">
        <h1 ref={headingRef} className="welcome-title">
          <div className="welcome-title__line">
            <span>I welcome you</span>
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
      </div>
    </section>
  );
};

export default Welcome;
