import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // O placeholder de foto em /public/images é um SVG próprio e confiável.
    // Assim que a fotografia real (JPG/PNG) for adicionada, esta opção pode
    // ser removida com segurança.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
};

export default nextConfig;
