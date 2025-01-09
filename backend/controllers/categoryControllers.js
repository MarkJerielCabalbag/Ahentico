import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     Register category associated with a user
//@ROUTE    POST /api/agentify/category/register/:id
//@ACCESS   private
const registerCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!category || category.trim() === "") {
    return res.status(400).json({ message: "Category name is required" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const newCategory = await prisma.productCategory.create({
      data: {
        category: category,
        addedBy: {
          connect: {
            id: parseInt(id),
          },
        },
      },
    });

    return res.status(201).json({
      message: `Category ${newCategory.category} has been added successfully.`,
    });
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the category." });
  }
});

//@DESC     view category associated with a user
//@ROUTE    POST /api/agentify/category/view/:id
//@ACCESS   private
const viewCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  const productCategory = await prisma.productCategory.findMany({
    where: {
      userId: parseInt(id),
    },
  });

  if (!productCategory) {
    return res.status(400).json({ message: "User does not exist" });
  }

  return res.status(200).send(productCategory);
});

export default { registerCategory, viewCategory };
