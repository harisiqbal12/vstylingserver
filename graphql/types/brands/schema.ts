import { objectType } from 'nexus';

export const Brands = objectType({
	name: 'Brands',
	definition(t) {
		t.string('id');
		t.string('name');
		t.string('slug');

		t.string('imageURI');
	},
});
