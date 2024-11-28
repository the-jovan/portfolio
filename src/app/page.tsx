import { Hero } from "./components";

export default function Home() {
  return (
    <>
      <Hero />
      <div
        style={{
          height: "60vh",
          background: "#000",
          boxShadow: "0 -10vh 50px #000",
        }}
      >
        One
      </div>
    </>
  );
}
