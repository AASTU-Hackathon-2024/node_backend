import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const uploadKyc = async (req, res) => {
  //   model Kyc {
  //   id      Int     @id @default(autoincrement())
  //   userId  String  @unique @map("user_id")
  //   idNo    String  @map("id_no")
  //   idUrl   String  @map("id_url")
  //   address String
  //   zipcode String?
  //   phone   String
  //   email   String
  //   status  KycStatus  @default(PENDING)

  //   user User @relation(fields: [userId], references: [userId])
  // }
  // const {}
  console.log(req.nody);
};

const checkLegiblity = async (req, res) => {
  const { id } = req.params;
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
    res.status(200).json({})
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating kyc", error: err });
  }
};

export { uploadKyc, checkLegiblity, updateKyc };
