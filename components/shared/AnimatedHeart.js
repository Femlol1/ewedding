// AnimatedHeart.js
"use client";
import { motion } from "framer-motion";

const AnimatedHeart = () => {
	return (
		<motion.div
			className="heart"
			initial={{ scale: 1 }}
			animate={{ scale: 1.2 }}
			transition={{ duration: 1, repeat: Infinity, repeatType: "alternate" }}
		></motion.div>
	);
};

export default AnimatedHeart;
