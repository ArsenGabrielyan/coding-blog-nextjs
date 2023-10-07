/** @type {import('next').NextConfig} */

const nextConfig = {
     transpilePackages: ['react-markdown','react-syntax-highlighter'],
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
               }
          ]
     }
}
module.exports = nextConfig