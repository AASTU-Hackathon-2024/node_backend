import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";
import { config } from "dotenv";

config();
const prisma = new PrismaClient();
const uid = new ShortUniqueId();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { variations: true },
    });
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

const postProduct = async (req, res) => {
  try {
    const { title, description, category, price, variations } = req.body;
    const productId = uid.rnd(10);
    res.status(200).json({ message: "succesful" });

    // Create the uploads directory if it doesn't exist
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ message: "failed to upload product", error });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = prisma.product.delete({ where: { productId: id } });
    console.log(deleted);
    res.status(200).json({ message: "Product deleted succesfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "failed to delete proudct", error: err.message });
  }
};

const addToCart = async (req, res) => {
  const { userId, productId, variationId, quantity } = req.body;
  if (!userId || !productId)
    res.status(400).json({ message: "User id and product id is required" });

  try {
    const item = prisma.cart.create({
      data: {
        userId,
        productId,
        variationId,
        quantity,
      },
    });
    res.status(200).json({ message: "item added to cart succesfully", item });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const addToWishlist = async (req, res) => {
  const { userId, productId, variationId, quantity } = req.body;
  if (!userId || !productId)
    res.status(400).json({ message: "User id and product id is required" });

  try {
    const item = prisma.wishList.create({
      data: {
        userId,
        productId,
        variationId,
        quantity,
      },
    });
    res.status(200).json({ message: "item added to cart succesfully", item });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export { getProducts, postProduct, addToCart, removeProduct, addToWishlist };
