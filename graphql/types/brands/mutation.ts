import { extendType, stringArg, nonNull } from 'nexus';

export const BrandsMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('createBrands', {
			type: 'Brands',
			args: {
				name: nonNull(stringArg()),
				slug: nonNull(stringArg()),
				imageURI: stringArg(),
			},

			resolve: (_, args, ctx) => {
				return ctx.prisma.brands.create({
					data: {
						...args,
					},
				});
			},
		});
	},
});
