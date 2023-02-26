import { extendType, nonNull, stringArg } from 'nexus';

export const CategoryQuereis = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('mainCategories', {
			type: 'Category',
			resolve: (_, __, ctx) => {
				return ctx.prisma.categories.findMany({
					where: {
						type: 'MAIN',
					},

					select: {
						name: true,
						slug: true,
						id: true,
					},
				});
			},
		});

		t.field('categoryProduct', {
			type: 'Category',
			args: {
				slug: nonNull(stringArg()),
			},

			resolve: (_, args, ctx) => {
				return ctx.prisma.categories.findUnique({
					where: {
						slug: args.slug,
					},
				});
			},
		});
	},
});
