import { booleanArg, extendType, nonNull, stringArg } from 'nexus';

export const ItemsQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('items', {
			type: 'Items',
			args: {
				new_arrival: booleanArg(),
			},
			resolve: (_, args, ctx) => {
				if (args.new_arrival) {
					return ctx.prisma.item.findMany({
						where: {
							new_arrival: args.new_arrival,
							maincategory: {
								slug: "eyewears"
							}
						},

						take: 20,
					});
				}

				return ctx.prisma.item.findMany({
					take: 20,
				});
			},
		});

		t.field('item', {
			type: 'Items',
			args: {
				id: nonNull(stringArg()),
			},

			resolve: (_, args, ctx) => {
				return ctx.prisma.item.findUnique({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});
