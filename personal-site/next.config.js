
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Gera arquivos estáticos
  trailingSlash: true, // Adiciona barra no final das URLs
  images: {
    unoptimized: true // Necessário para export estático
  },
  // Remove isso em produção se não for usar API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  }
}
module.exports = nextConfig;