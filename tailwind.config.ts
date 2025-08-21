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
					DEFAULT: "#FFD700", // Gold color
					"50": "#FFF8DC",
					"100": "#FFF1B8",
					"200": "#FFE38F",
					"300": "#FFD700",
					"400": "#E6C200",
					"500": "#CCAD00",
					"600": "#B39800",
					"700": "#998300",
					"800": "#806D00",
					"900": "#665800",
					foreground: "#FFFFFF", // White foreground color
				},
				secondary: {
					DEFAULT: "#FFFFFF", // White color
					foreground: "#FFD700", // Gold foreground color
				},
				accent: {
					DEFAULT: "#FFD700", // Gold accent color
					foreground: "#FFFFFF", // White foreground color
				},
				dark: {
					DEFAULT: "#1A1A1A",
					"50": "#333333",
					"100": "#4D4D4D",
					"200": "#666666",
					"300": "#808080",
					"400": "#999999",
					"500": "#B3B3B3",
					"600": "#CCCCCC",
					"700": "#E6E6E6",
					"800": "#F2F2F2",
					"900": "#FFFFFF",
				},
				coral: {
					500: "#15BF59",
				},
				grey: {
					600: "#545454",
					500: "#757575",
					400: "#AFAFAF",
					100: "#F2EFEF",
					50: "#F6F6F6",
				},
				black: "#000000",
				white: "#FFFFFF",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				foreground: "hsl(var(--foreground))",
				destructive: {
					DEFAULT: "#FF0000", // Red color for destructive actions
					foreground: "#FFFFFF", // White foreground color
				},
				muted: {
					DEFAULT: "#CCCCCC", // Muted grey color
					foreground: "#333333", // Dark grey foreground color
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
				"neon-gold":
					"0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px #FFD700",
				"neon-white":
					"0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 40px #FFFFFF",
			},
			textShadow: {
				"neon-gold":
					"0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px #FFD700",
				"neon-white":
					"0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 40px #FFFFFF",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }: PluginAPI) {
			const newUtilities = {
				".text-shadow-neon-gold": {
					textShadow:
						"0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px #FFD700",
				},
				".text-shadow-neon-white": {
					textShadow:
						"0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 40px #FFFFFF",
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
