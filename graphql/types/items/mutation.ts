import {
	booleanArg,
	extendType,
	floatArg,
	intArg,
	nonNull,
	stringArg,
} from 'nexus';

export const ItemsMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('createItems', {
			type: 'Items',
			args: {
				name: nonNull(stringArg()),
				slug: nonNull(stringArg()),
				short_description: stringArg(),
				details: stringArg(),
				price: nonNull(floatArg()),
				quntity: nonNull(intArg()),
				hot: booleanArg(),
				featured: booleanArg(),
				new_arrival: booleanArg(),
				brand_id: nonNull(stringArg()),
				maincategory_id: nonNull(stringArg()),
				subCategory_id: nonNull(stringArg()),
			},
			resolve: (_, args, ctx) => {
				return ctx.prisma.item.create({
					data: {
						...args,
					},
				});
			},
		});
	},
});
