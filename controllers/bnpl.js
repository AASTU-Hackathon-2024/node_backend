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
console.log(req.nody)
};

const checkLegiblity = async (req, res) => {
  const { id } = req.params;

  console.log(id);
};

const updateKyc = async (req,res)=>{
    console.log(req.body);
}

export { uploadKyc, checkLegiblity,updateKyc };
