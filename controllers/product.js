import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";
import path from "path";
import multer from "multer";
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
    // const { product, variation } = req.body;
    // const { title, price, description, category } = product;
    // variation.map(variant=>)
    const productId = uid.rnd(10);
    res.status(200).json({ message: "succesful" });

    // Create the uploads directory if it doesn't exist
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ message: "failed to upload product", error });
  }
};

export { getProducts, postProduct };
