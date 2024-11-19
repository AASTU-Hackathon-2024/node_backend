import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const uploadKyc = async (req, res) => {
  console.log(req.nody);
};

const getBnpl = async (req, res) => {
  console.log(req.body);
  try {
    const bnpls = await prisma.bnpl.findMany();
    res.status(200).json(bnpls);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Bnpl could not be fetched.", error: err.message });
  }
};

const updateKyc = async (req, res) => {
  const { status, userId } = req.body;
  try {
    await prisma.kyc.update({
      where: { userId },
      data: {
        status,
      },
    });
    res.status(200).json({ message: "bnpl succesfully created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating kyc", error: err });
  }
};

export { uploadKyc, updateKyc, getBnpl };
