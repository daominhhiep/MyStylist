
import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
  },
};

module.exports = nextConfig;
