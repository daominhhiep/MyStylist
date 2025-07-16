
import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  allowedDevOrigins: [env.REPLIT_DOMAINS.split(",")[0]],
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localeDetection: true,
  },
};

module.exports = nextConfig;
