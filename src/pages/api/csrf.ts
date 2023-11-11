import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.update({
      where: { username },
      data: { password },
    });

    if (user) {
      res.status(200).json({ message: `Lozinka uspješno promjenjena! Nova lozinka je ${user.password}` });
    } else {
      res.status(404).json({ message: "Korisnik sa tim korisničkim imenom i lozinkom ne postoji!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Greška prilikom mjenjanja lozike",
        error: error,
      });
  }
}
