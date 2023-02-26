import { extendType, nonNull, stringArg } from 'nexus';

export const CategoryMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('createCategory', {
			type: 'Category',
			args: {
				name: nonNull(stringArg()),
				slug: nonNull(stringArg()),
				type: nonNull('CategoryTypesEnums'),
				parentSlug: stringArg(),
				imageURI: stringArg(),
			},
			resolve: async (_, args, ctx) => {
				const res = await ctx.prisma.categories.create({
					data: {
						name: args.name,
						slug: args.slug,
						type: args.type,
						imageURI: args.imageURI,
					},
				});

				if (args?.parentSlug) {
					await ctx.prisma.categories.update({
						where: {
							id: res.id,
						},

						data: {
							parent: {
								connect: {
									slug: args.parentSlug,
								},
							},
						},
					});
				}

				return res;
			},
		});
	},
});
