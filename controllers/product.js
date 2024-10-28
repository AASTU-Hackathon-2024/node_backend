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
    const stock = variations.reduce((acc, v) => v.stock + acc, 0);

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        category,
        price,
        productId,
        stock,
      },
    });
    if (!newProduct) throw new Error("Failed to upload product");
    const variationPromises = variations.map(async (variation) => {
      const variationId = uid.rnd(6);
      const { color, sizes, stock, imgUrls } = variation;

      try {
        // Create variation
        const newVariation = await prisma.variation.create({
          data: {
            variationId,
            color,
            size: JSON.stringify(sizes),
            imgUrl: JSON.stringify(imgUrls),
            stock,
            product: {
              connect: { productId },
            },
          },
        });
        // Create stock entry
        await prisma.stock.create({
          data: {
            quantity: stock,
            product: {
              connect: { productId },
            },
            variation: {
              connect: { variationId },
            },
          },
        });

        return newVariation; // Return the created variation
      } catch (variationError) {
        // Log error for the specific variation
        console.error("Error adding variation:", variationError);
        throw new Error("Variation or stock failed to be added");
      }
    });
    await Promise.all(variationPromises);
    res.status(200).json({ message: "succesful", newProduct });
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ message: "failed to upload product", error });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { productId: id } });
    res.status(200).json({ message: "Product deleted succesfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "failed to delete proudct", error: err.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { productId: id },
      include: { variations: true },
    });
    if (!product) throw new Error("There is no proudct by this id");
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: `failed to fetch proudct-${id}`, error: err.message });
  }
};

const isAvailable = async (req, res) => {
  const { productId, variationId } = req.body;
  console.log(productId);
  try {
    const product = await prisma.stock.findUnique({
      where: {
        productId,
        variationId,
      },
    });

    if (!product.quantity) {
      res.status(200).json({
        message: "Product is out of stock. Please try another.",
        isAvailable: false,
      });
    }
    res
      .status(200)
      .json({ message: "Product is available", isAvailable: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to confirm product availablity. Try again.",
      error: err.message,
    });
  }
};

export { getProduct, getProducts, postProduct, removeProduct, isAvailable };
