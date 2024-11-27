import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: follow up - css imports WILL break eventually
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import"],
    prependData: `
      @use "./src/app/styles/variables.scss" as *;
      @use "./src/app/styles/mixins.scss" as *;
    `,
  },
};

export default nextConfig;
