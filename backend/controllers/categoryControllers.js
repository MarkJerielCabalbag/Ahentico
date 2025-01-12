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

//@DESC     Remove category associated with a user
//@ROUTE    POST /api/agentify/category/remove/cetgoryId
//@ACCESS   private
const removeCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ message: "ID does not exist" });
  }

  try {
    const productCategory = await prisma.productCategory.delete({
      where: {
        id: parseInt(categoryId),
      },
    });
    return res.status(200).json({
      message: `${productCategory.category} is already remove as a product category`,
    });
  } catch (error) {
    console.log(error);
  }
});

export default { registerCategory, viewCategory, removeCategory };
