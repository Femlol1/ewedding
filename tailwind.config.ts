/** @type {import('tailwindcss').Config} */
import { PluginAPI } from "tailwindcss/types/config";

const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: "#D4B4A6", // Soft nude/beige
					"50": "#F8F4F2",
					"100": "#F1E8E2",
					"200": "#E8D6CB",
					"300": "#DFC4B4",
					"400": "#D4B4A6",
					"500": "#C8A092",
					"600": "#BC8C7E",
					"700": "#A97665",
					"800": "#8B5D4A",
					"900": "#6D4A39",
					foreground: "#FFFFFF", // White foreground color
				},
				secondary: {
					DEFAULT: "#F5F0EC", // Very light cream
					foreground: "#6D4A39", // Dark nude foreground color
				},
				accent: {
					DEFAULT: "#E8D6CB", // Light nude accent color
					foreground: "#6D4A39", // Dark nude foreground color
				},
				nude: {
					"50": "#FAF8F6",
					"100": "#F5F0EC",
					"200": "#EDE2D9",
					"300": "#E8D6CB",
					"400": "#D4B4A6",
					"500": "#C8A092",
					"600": "#BC8C7E",
					"700": "#A97665",
					"800": "#8B5D4A",
					"900": "#6D4A39",
				},
				blush: {
					"50": "#FDF8F7",
					"100": "#FBEEE9",
					"200": "#F7DDD3",
					"300": "#F3CCBD",
					"400": "#EFBBA7",
					"500": "#EBA991",
					"600": "#E7987B",
					"700": "#E38765",
					"800": "#DF764F",
					"900": "#DB6539",
				},
				cream: {
					"50": "#FEFCFA",
					"100": "#FDF9F5",
					"200": "#FBF3EB",
					"300": "#F9EDE1",
					"400": "#F7E7D7",
					"500": "#F5E1CD",
					"600": "#F3DBC3",
					"700": "#F1D5B9",
					"800": "#EFCFAF",
					"900": "#EDC9A5",
				},
				dark: {
					DEFAULT: "#6D4A39",
					"50": "#F5F0EC",
					"100": "#EDE2D9",
					"200": "#D4B4A6",
					"300": "#C8A092",
					"400": "#BC8C7E",
					"500": "#A97665",
					"600": "#8B5D4A",
					"700": "#6D4A39",
					"800": "#5A3B2A",
					"900": "#472C1B",
				},
				coral: {
					500: "#E8A07C", // Soft coral instead of bright green
				},
				grey: {
					600: "#8B7D76",
					500: "#A59B94",
					400: "#BFB5B0",
					100: "#F2EFEF",
					50: "#F8F6F5",
				},
				black: "#000000",
				white: "#FFFFFF",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				foreground: "hsl(var(--foreground))",
				destructive: {
					DEFAULT: "#D17A72", // Soft muted red for destructive actions
					foreground: "#FFFFFF", // White foreground color
				},
				muted: {
					DEFAULT: "#F5F0EC", // Soft nude muted color
					foreground: "#8B7D76", // Muted grey foreground color
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			fontFamily: {
				poppins: ["var(--font-poppins)"],
			},
			backgroundImage: {
				"dotted-pattern": "url('/assets/images/dotted-pattern.png')",
				"hero-img": "url('/assets/images/hero.png')",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				flip: {
					from: { transform: "rotateX(0deg)", transformOrigin: "50% bottom " },
					to: { transform: "rotateX(180deg)", transformOrigin: "50% bottom " },
				},
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				},
				"marquee-vertical": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-100% - var(--gap)))" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				flip: "flip 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
				marquee: "marquee var(--duration) linear infinite",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
			},
			boxShadow: {
				"neon-nude":
					"0 0 5px #D4B4A6, 0 0 10px #D4B4A6, 0 0 20px #D4B4A6, 0 0 40px #D4B4A6",
				"neon-cream":
					"0 0 5px #F5E1CD, 0 0 10px #F5E1CD, 0 0 20px #F5E1CD, 0 0 40px #F5E1CD",
				"soft-glow":
					"0 4px 20px rgba(212, 180, 166, 0.3), 0 2px 10px rgba(212, 180, 166, 0.2)",
			},
			textShadow: {
				"neon-nude":
					"0 0 5px #D4B4A6, 0 0 10px #D4B4A6, 0 0 20px #D4B4A6, 0 0 40px #D4B4A6",
				"neon-cream":
					"0 0 5px #F5E1CD, 0 0 10px #F5E1CD, 0 0 20px #F5E1CD, 0 0 40px #F5E1CD",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }: PluginAPI) {
			const newUtilities = {
				".text-shadow-neon-nude": {
					textShadow:
						"0 0 5px #D4B4A6, 0 0 10px #D4B4A6, 0 0 20px #D4B4A6, 0 0 40px #D4B4A6",
				},
				".text-shadow-neon-cream": {
					textShadow:
						"0 0 5px #F5E1CD, 0 0 10px #F5E1CD, 0 0 20px #F5E1CD, 0 0 40px #F5E1CD",
				},
				".text-shadow-soft": {
					textShadow: "0 2px 4px rgba(212, 180, 166, 0.3)",
				},
			};

			addUtilities(newUtilities, {
				respectPrefix: false,
				respectImportant: false,
			});
		},
		addVariablesForColors,
	],
};
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
