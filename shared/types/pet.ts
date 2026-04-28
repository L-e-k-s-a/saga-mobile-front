export type PetInfo = {
	nameField: string;
	description: string;
};

export type Pet = {
	petId: string;
	familyId: string;
	namePet: string;
    petInfo: PetInfo[]
};
