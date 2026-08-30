/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // One URL shape. `mahavi.tech/services` and `mahavi.tech/services/` must not
  // both be reachable — duplicate URLs split ranking signals between them.
  trailingSlash: false,

  images: {
    // Every portfolio image is a local static import, so no remotePatterns are
    // needed. AVIF first, WebP second, original last.
    formats: ["image/avif", "image/webp"],
  },

  // Lint runs as its own script (`npm run lint`) against the flat config; the
  // build does not need to re-run it.
  eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Hashed build output never changes under the same name.
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    return [
      // The old single-page anchors, kept alive as real URLs so any existing
      // backlink lands on the page that now owns that content.
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/work/nikunja-seva", destination: "/work/nikunja", permanent: true },
    ];
  },
};

export default nextConfig;
