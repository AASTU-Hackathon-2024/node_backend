const uploadKyc = async (req, res) => {
  console.log(req.body);
};

const checkLegiblity = async (req, res) => {
  const { id } = req.params;

  console.log(id);
};

export { uploadKyc, checkLegiblity };
