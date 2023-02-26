import { extendType } from 'nexus';

export const BrandsQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('brands', {
			type: 'Brands',
			resolve: (_, args, ctx) => {
				return ctx.prisma.brands.findMany();
			},
		});
	},
});
