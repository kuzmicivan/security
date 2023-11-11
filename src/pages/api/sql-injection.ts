import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, isVulnerable } = req.body;

  try {
    let result;
    if (isVulnerable) {
      const rawQuery = `SELECT * FROM "User" WHERE username = '${username}' AND password = '${password}'`;
      result = await prisma.$queryRawUnsafe(rawQuery);
    } else {
      result = await prisma.user.findMany({
        where: {
          username: username,
          password: password
        }
      });
    }

    if (result.length && result.length > 0) {
      res.status(200).json({ message: 'Uspješna prijava'});
    } else {
      res.status(200).json({ message: 'Neuspješna prijava'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Došlo je do greške', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
