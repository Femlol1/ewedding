/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "3ddco28mb0.ufs.sh",
				port: "",
				pathname: "/f/**",
			},
		],
	},
	webpack: (config, { isServer }) => {
		if (isServer) {
			// Mark phantomjs-prebuilt as external so it isn't bundled.
			config.externals = config.externals || [];
			config.externals.push("phantomjs-prebuilt");
		}
		return config;
	},
};

export default nextConfig;
