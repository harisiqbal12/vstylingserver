import { objectType, enumType } from 'nexus';

export const Category = objectType({
	name: 'Category',
	definition(t) {
		t.string('id');
		t.string('name');
		t.string('slug');

		t.string('parentId');
		t.field('type', {
			type: CategoryTypesEnums,
		});

		t.list.field('main', {
			type: 'Items',
			resolve: (parent, _, ctx) => {
				return ctx.prisma.categories
					.findUnique({
						where: {
							id: parent.id,
						},
					})
					.main({
						take: 20,
						orderBy: {
							short_description: 'desc',
						},
					});
			},
		});

		t.list.field('sub', {
			type: 'Items',
			resolve: (parent, _, ctx) => {
				return ctx.prisma.categories
					.findUnique({
						where: {
							id: parent.id,
						},
					})
					.sub({
						take: 20,
					});
			},
		});

		t.field('createdAt', {
			type: 'String',
			resolve: parent => {
				//@ts-ignore
				return new Date(parent.createdAt)?.toDateString();
			},
		});
	},
});

export const CategoryTypesEnums = enumType({
	name: 'CategoryTypesEnums',
	members: {
		MAIN: 'MAIN',
		SUB: 'SUB',
	},
});
