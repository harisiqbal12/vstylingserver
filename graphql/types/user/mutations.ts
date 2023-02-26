import { extendType, nonNull, stringArg } from 'nexus';

export const userMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('createUser', {
			type: 'User',
			args: {
				name: nonNull(stringArg()),
				email: nonNull(stringArg()),
				imageURI: stringArg(),
				number: nonNull(stringArg()),
			},

			resolve: (_, args, ctx) => {
				return ctx.prisma.user.create({
					data: {
						...args,
					},
				});
			},
		});
	},
});
