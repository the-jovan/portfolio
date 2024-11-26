import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: follow up - css imports WILL break eventually
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import"],
    prependData: `@import "./src/app/styles/variables.scss";`,
  },
};

export default nextConfig;
