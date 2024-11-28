import React from "react";
import "./hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__content hideable">
        <h1 className="hero__title">
          Live to <span>dye</span> another day.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
