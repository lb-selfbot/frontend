/** @type {import('next').NextConfig} */

const COMING_SOON_DATE = new Date(Date.UTC(2023, 0, 24, 15, 0, 0));

const COMING_SOON = new Date() < COMING_SOON_DATE;

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
