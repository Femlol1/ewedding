import React from "react";

interface ModalProps {
	show: boolean;
	title?: string;
	message?: string | React.ReactNode; // Allow message to accept React components for custom styles
	onClose: () => void;
	isLoading?: boolean;
	variant?: "default" | "destructive";
	messageColor?: string; // Added messageColor prop
}

const Modal: React.FC<ModalProps> = ({
	show,
	title,
	message,
	onClose,
	isLoading,
	variant = "default",
	messageColor = "text-gray-700", // Default message color
}) => {
	if (!show) return null;

	const titleClass = variant === "destructive" ? "text-red-600" : "text-black";
	const buttonClass =
		variant === "destructive"
			? "bg-red-500 hover:bg-red-600 text-white"
			: "bg-primary-500 hover:bg-primary-600 text-white";

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white text-black p-6 rounded-md text-center max-w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
				{isLoading ? (
					<div className="flex items-center justify-center">
						<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
					</div>
				) : (
					<>
						{title && (
							<h2
								className={`text-xl sm:text-2xl font-bold mb-4 ${titleClass}`}
							>
								{title}
							</h2>
						)}
						{message && (
							<p className={`text-sm sm:text-base mt-2 ${messageColor}`}>
								{message}
							</p>
						)}
						<button
							onClick={onClose}
							className={`mt-4 px-4 py-2 rounded ${buttonClass}`}
						>
							Close
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Modal;
