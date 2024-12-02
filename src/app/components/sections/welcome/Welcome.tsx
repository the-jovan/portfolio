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
          start: "top 98%",
          toggleActions: "restart none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
      });
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
        <p style={{ color: "white" }}>
          it ain't much but you might find what you're searching for
        </p>
      </div>
    </section>
  );
};

export default Welcome;
