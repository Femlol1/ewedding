/** @type {import('next').NextConfig} */
const nextConfig = {
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
