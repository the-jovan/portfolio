import React from "react";
import Image from "next/image";
import "./hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          Live to <span>dye</span> another day.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
