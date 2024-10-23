import bcrypt from "bcrypt";

const hashPassword = async (pass) => {
  const round = 10;
  const hashedPassword = await bcrypt.hash(pass, round);
  return hashedPassword;
};

const verifyPassword = async (pass, hashedPass) => {
  const isMatch = await bcrypt.compare(pass, hashedPass);
  return isMatch;
};

export { hashPassword, verifyPassword };
