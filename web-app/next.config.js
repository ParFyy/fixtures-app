/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export'
}

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disableDevLogs: true
})

module.exports = withPWA(nextConfig)