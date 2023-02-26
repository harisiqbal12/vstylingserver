import { extendType, nonNull, stringArg } from 'nexus';

export const UserQueries = extendType({
	type: 'Query',
	definition(t) {
		t.field('user', {
			type: 'User',
			args: {
				email: nonNull(stringArg()),
			},
			resolve: (_, args, ctx) => {
				return ctx.prisma.user.findUnique({
					where: {
						email: args.email,
					},
				});
			},
		});

		t.list.field('allUsers', {
			type: 'User',
			resolve: (_, _args, ctx) => {
				return ctx.prisma.user.findMany();
			},
		});
	},
});
