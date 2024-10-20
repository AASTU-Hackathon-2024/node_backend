const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchUsers = async function () {
  try {
    const res = await prisma.users.findMany();
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
};
const createUser = async function (user) {
  try {
    const res = await prisma.users.create({
      data: user,
    });
  } catch (err) {
    console.error(err.message);
  }
};
// model Users {
//   id        Int      @id @default(autoincrement())
//   userId    String    @unique @map("user_id")
//   name      String   @db.VarChar(40)
//   email     String   @unique @db.VarChar(255)
//   password  String 
// }
const user = {
    userId:'12@198hk',
    name:"Yonas Workneh",
    email:"yonasdegefu158@gmail.com",
    password:"Inc@rrect_1995"
}

createUser(user);
fetchUsers();
