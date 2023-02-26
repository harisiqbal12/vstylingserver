import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {

}

main()
	.then(res => {
		prisma.$disconnect();
		console.log('completed');
	})
	.catch(er => {
		console.log(er);
		prisma.$disconnect();
	});
