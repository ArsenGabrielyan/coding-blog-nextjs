/** @type {import('next').NextConfig} */

const nextConfig = {
     transpilePackages: ['react-markdown','react-syntax-highlighter','react-toastify'],
     webpack: (config, {isServer})=>{
          if (!isServer) {
               config.resolve.fallback = {
                   fs: false,
                   net:false,
                   dns:false,
                   child_process:false,
                   tls:false
               }
          };
          return config;
     },
     images: {
          remotePatterns: [
               {
                    protocol: 'https',
                    hostname: 'lh3.googleusercontent.com',
                    port: '',
                    pathname: '/a/**'
               },
               {
                    protocol: "https",
                    hostname: 'platform-lookaside.fbsbx.com',
                    port: '',
                    pathname: '/platform/**'
               },
               {
                    protocol: 'https',
                    hostname: 'avatars.githubusercontent.com',
                    port: '',
                    pathname: '/u/**'
               },
               {
                    protocol: 'https',
                    hostname: 'firebasestorage.googleapis.com',
                    port: '',
                    pathname: '/v0/b/**'
               }
          ]
     },
     async redirects() {
          return [{
              source: '/auth',
              destination: '/auth/signin',
              permanent: true,
          }]
     },
}

module.exports = nextConfig