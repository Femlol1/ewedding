function DressCodeModal({ onClose }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white p-6 rounded shadow-lg max-w-sm w-full max-h-full overflow-y-auto">
				<h3 className="text-lg font-bold mb-4 text-center">Dress Code</h3>
				<p className="mb-2">
					<strong className="text-lg">Wedding colours:</strong>
					<br />
					<span className="flex items-center">
						<span
							className="inline-block w-4 h-4 mr-2 rounded-full"
							style={{ backgroundColor: "#411900" }} // Chocolate Brown color code
						></span>
						<p>CHOCOLATE BROWN </p> + Gold (Bride)
					</span>
					<span className="flex items-center">
						<span
							className="inline-block w-4 h-4 mr-2 rounded-full"
							style={{ backgroundColor: "#00674f" }} // Emerald Green color code
						></span>
						<p> EMERALD GREEN</p> + Gold (Groom)
					</span>
				</p>
				<p className="mb-2">
					Please kindly let us know if you are interested in participating in
					ASO EBI (TRADITIONAL ATTIRE).
				</p>

				<h4 className="text-lg font-bold mt-4 mb-2">What is available:</h4>
				<p className="mb-2">
					<strong>Women:</strong> Complete set including Lace, Aso Oke, Gele &
					Ipele
				</p>
				<p className="mb-2">
					<strong>Men:</strong> Complete set Atiku & Cap
				</p>
				<p className="mb-2">
					<strong>Women:</strong> Gele & Ipele
				</p>
				<p className="mb-2">
					<strong>Men:</strong> Cap
				</p>
				<h4 className="text-lg font-bold mt-4 mb-2">Who to contact:</h4>
				<p className="mb-2">
					<strong>For Brides Family Asoebi contact:</strong> Mrs Pelumi
					Osibemekun
				</p>
				<p className="mb-2">
					<strong>For Grooms family Asoebi contact:</strong> Mrs Funke Oyediran
				</p>
				<p className="mb-2">
					<strong>Groom:</strong> Mr Tobilobawanimi Oyediran
				</p>
				<p className="mb-2">
					<strong>Bride:</strong> Miss Temitopeoluwa Osibemekun
				</p>

				<button
					className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-full"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default DressCodeModal;
