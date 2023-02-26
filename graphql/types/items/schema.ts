import { objectType } from 'nexus';

export const Items = objectType({
	name: 'Items',
	definition(t) {
		t.string('id');
		t.string('name');
		t.string('slug');
		t.string('short_description');
		t.string('details');
		t.string('brand_id');
		t.string('maincategory_id');
		t.string('subCategory_id');
		t.string('imageURI');

		t.float('price');
		t.int('quantity');

		t.boolean('hot');
		t.boolean('featured');
		t.boolean('new_arrival');

		t.list.string('galleryImages');

		t.field('brand', {
			type: 'Brands',
			resolve: (parent, _, ctx) => {
				return ctx.prisma.brands.findUnique({
					where: {
						id: parent.brand_id,
					},
				});
			},
		});

		t.field('maincategory', {
			type: 'Category',
			resolve: (parent, _, ctx) => {
				return ctx.prisma.categories.findUnique({
					where: {
						id: parent.maincategory_id,
					},
				});
			},
		});

		t.field('subCategory', {
			type: 'Category',
			resolve: (parent, _, ctx) => {
				return ctx.prisma.categories.findUnique({
					where: {
						id: parent.subCategory_id,
					},
				});
			},
		});
	},
});
