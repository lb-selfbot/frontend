/** @type {import('next').NextConfig} */
const COMING_SOON = true;
const MAINTENANCE = false;

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@mui/material", "@mui/system", "@mui/icons-material"],
  async redirects() {
    if (COMING_SOON) {
      return [
        {
          source: "/((?!coming-soon).*)",
          destination: "/coming-soon",
          permanent: false,
        },
      ];
    }

    if (MAINTENANCE) {
      return [
        {
          source: "/((?!maintenance).*)",
          destination: "/maintenance",
          permanent: false,
        },
      ];
    }

    return [
      {
        source: "/discord",
        destination: "https://discord.gg/khVeaCsKCU",
        permanent: false,
      },
      {
        source: "/dashboard/selfbot",
        destination: "/dashboard/selfbot/console",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
