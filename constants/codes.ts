export const validCodes = {
	vip: ["VIP789"],
	opesGuest: ["TOforeverOG25"],
	TobilobasGuest: ["TOforeverTG25"],
	osibemekunFamilyGuest: ["TOforeverOsi25"],
	oyediranFamilyGuest: ["TOforeverOyed25"],
	bridalParty: ["TOforeverBP25"],
};

export type UserType = keyof typeof validCodes;
