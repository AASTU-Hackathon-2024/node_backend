const { PrismaClient } = require("@prisma/client");
const ShortUniqueId = require("short-unique-id");
const fetch = require("node-fetch");
const env = require("dotenv");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkh2qfffj",
  api_key: "169594764447942",
  api_secret: "D4C874dZqPSPaAurvNE_YCAPtwM",
});

const prisma = new PrismaClient();
const uid = new ShortUniqueId();

env.config();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

const postProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error uploading to Cloudinary", error });
        }
        res.json({
          message: "Image uploaded successfully!",
          url: result.secure_url,
        });
      }
    );

    // Create a stream to upload the file
    const stream = cloudinary.uploader.upload_stream(result);
    stream.end(req.file.buffer); // End the stream with the file buffer
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ message: "failed to upload product", error });
  }
};

module.exports = { getProducts, postProduct };
