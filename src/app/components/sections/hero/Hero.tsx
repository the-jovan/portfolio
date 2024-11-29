import React from "react";
import "./hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-rain" />
      <div className="hero__content hideable">
        <h1 className="hero__title">
          Live to <span>dye</span> another day
        </h1>

        <p className="hero__text">For what is life without its hues</p>
      </div>
    </section>
  );
};

export default Hero;
