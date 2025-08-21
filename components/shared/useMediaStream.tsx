import { useEffect, useState } from "react";

export const useMediaStream = (constraints: MediaStreamConstraints) => {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getStream = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia(
					constraints
				);
				setStream(mediaStream);
			} catch (err) {
				setError(err as Error);
			}
		};

		getStream();

		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, [constraints, stream]);

	return { stream, error };
};
