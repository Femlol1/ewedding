import React, { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "../ui/label";

interface RSVP {
	id: string;
	userType: string;
	firstName: string;
	lastName: string;
	email: string;
	mobile: string;
	relations: string;
	stayingPlace: string;
	otherStaying?: string;
	allergies?: string;
	asoEbi?: string;
	asoebiType?: string;
	church?: string;
	reception?: string;
	afterParty?: string;
	checkedIn?: boolean;
	timestamp: {
		months: number;
		seconds: number;
		nanoseconds: number;
	};
}

interface UpdateRsvpModalProps {
	show: boolean;
	onClose: () => void;
	onUpdate: (updatedRsvp: Partial<RSVP>) => void;
	rsvp: RSVP | null;
}

const UpdateRsvpModal: React.FC<UpdateRsvpModalProps> = ({
	show,
	onClose,
	onUpdate,
	rsvp,
}) => {
	const [updatedRsvp, setUpdatedRsvp] = useState<Partial<RSVP>>({});

	// Update the form state when inputs change
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const parsedValue =
			value === "true" ? true : value === "false" ? false : value;
		setUpdatedRsvp((prev) => ({ ...prev, [name]: parsedValue }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (rsvp) {
			onUpdate({ ...rsvp, ...updatedRsvp });
			onClose();
		}
	};

	if (!show || !rsvp) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
			<div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
				<h2 className="text-xl font-semibold mb-4">Update RSVP</h2>
				<form onSubmit={handleSubmit}>
					<Label>First name</Label>
					<input
						type="text"
						name="firstName"
						value={updatedRsvp.firstName || rsvp.firstName}
						onChange={handleChange}
						placeholder="First Name"
						className="w-full p-2 border rounded mb-2"
					/>
					<Label>Last Name</Label>
					<input
						type="text"
						name="lastName"
						value={updatedRsvp.lastName || rsvp.lastName}
						onChange={handleChange}
						placeholder="Last Name"
						className="w-full p-2 border rounded mb-2"
					/>
					<Label>Email</Label>
					<input
						type="email"
						name="email"
						value={updatedRsvp.email || rsvp.email}
						onChange={handleChange}
						placeholder="Email"
						className="w-full p-2 border rounded mb-2"
					/>
					<Label>Number</Label>
					<input
						type="text"
						name="mobile"
						value={updatedRsvp.mobile || rsvp.mobile}
						onChange={handleChange}
						placeholder="Mobile"
						className="w-full p-2 border rounded mb-2"
					/>
					<Label>User Type</Label>
					<select
						name="userType"
						value={updatedRsvp.userType || rsvp.userType}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="">Select User Type</option>
						<option value="vip">VIP</option>
						<option value="temitopesGuest">Temitope Guest</option>
						<option value="TobilobasGuest">Tobilobas Guest</option>
						<option value="temitopesFamilyGuest">Temitope Family Guest</option>
						<option value="TobilobasFamilyGuest">Tobilobas Family Guest</option>
						<option value="bridalParty">Bridal Party</option>
					</select>
					<Label>Staying Place</Label>
					<select
						name="stayingPlace"
						value={updatedRsvp.stayingPlace || rsvp.stayingPlace}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="">Select Staying Place</option>
						<option value="Hotel">Recommended Hotel</option>
						<option value="At home with family">Home</option>
						<option value="Other">Other</option>
					</select>
					<Label>Other Staying</Label>
					<input
						type="text"
						name="otherStaying"
						value={updatedRsvp.otherStaying || rsvp.otherStaying}
						onChange={handleChange}
						placeholder="Other Staying Place"
						className="w-full p-2 border rounded mb-2"
					/>
					<Label>Allergies</Label>
					<input
						type="text"
						name="allergies"
						value={updatedRsvp.allergies || rsvp.allergies}
						onChange={handleChange}
						placeholder="Allergies"
						className="w-full p-2 border rounded mb-2"
					/>
					<Label>Asoebi</Label>
					<select
						name="asoEbi"
						value={updatedRsvp.asoEbi || rsvp.asoEbi}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="">Select AsoEbi</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
					<Label>Asoebi Type</Label>
					<select
						name="asoebiType"
						value={updatedRsvp.asoebiType || rsvp.asoebiType}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="">Select Asoebi Type</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<Label>Church</Label>
					<select
						name="church"
						value={updatedRsvp.church || rsvp.church}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
					<Label>Reception</Label>
					<select
						name="reception"
						value={updatedRsvp.reception || rsvp.reception}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
					<Label>After Party</Label>
					<select
						name="afterParty"
						value={updatedRsvp.afterParty || rsvp.afterParty}
						onChange={handleChange}
						className="w-full p-2 border rounded mb-2"
					>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>

					<div className="flex justify-end mt-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateRsvpModal;
