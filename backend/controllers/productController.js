import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     register product associated with ahente
//@ROUTE    POST /api/agentify/product/register/:ahenteId
//@ACCESS   private
const registerProduct = asyncHandler(async (req, res, next) => {
  const { ahenteId } = req.params;
  const {
    productName,
    productCategory,
    productUnitMeasurement,
    productUnit,
    productPricePerUnit,
    productDescription,
  } = req.body;

  if (
    !productName ||
    !productCategory ||
    !productUnit ||
    !productUnitMeasurement ||
    !productPricePerUnit ||
    !productDescription
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const products = await prisma.product.findMany({
    where: {
      ahenteId: parseInt(ahenteId),
    },
  });

  const ahentes = await prisma.ahente.findMany({});
  const ahente = await prisma.ahente.findUnique({
    where: { id: parseInt(ahenteId) },
  });

  const listOfAhentes = ahentes.map((distributor) => {
    return distributor.id;
  });

  if (listOfAhentes.includes(parseInt(ahenteId))) {
    for (const product of products) {
      if (product.productName === productName) {
        return res.status(400).json({
          message: `${product.productName} is already exist within the ahente: ${ahente.name}`,
        });
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        productName: productName,
        productCategory: productCategory,
        productUnit: parseInt(productUnit),
        productUnitMeasurement: productUnitMeasurement,
        productPricePerUnit: parseInt(productPricePerUnit),
        productDescription: productDescription,
        productDesignatedBy: {
          connect: {
            id: parseInt(ahenteId),
          },
        },
      },
    });

    return res.status(200).json({
      message: `Product ${newProduct.productName} has been added to the list of products of distributor: ${ahente.name}`,
    });
  }

  return res.status(400).json({ message: `${ahenteId} does not exist` });
});

//@DESC     remove product associated with ahente
//@ROUTE    POST /api/agentify/product/remove/:productId
//@ACCESS   private
const removeProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: "Id is required" });
  }

  const findProduct = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!findProduct) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  try {
    const removeProduct = await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });

    const ahente = await prisma.ahente.findUnique({
      where: {
        id: parseInt(removeProduct.ahenteId),
      },
    });

    return res.status(200).json({
      message: `You remove the product ${removeProduct.productName} associated with ahente ${ahente.name}`,
    });
  } catch (error) {
    console.log(`An error occured: ${error}`);
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     edit product associated with ahente
//@ROUTE    POST /api/agentify/product/edit/:productId
//@ACCESS   private
const editProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const {
    productName,
    productCategory,
    productUnitMeasurement,
    productUnit,
    productPricePerUnit,
    productDescription,
  } = req.body;
  if (!productId) {
    return res.status(400).json({ message: "Id is required" });
  }

  const findProduct = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!findProduct) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  try {
    const editProduct = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        productName: req.body.productName || productName,
        productCategory: req.body.productCategory || productCategory,
        productUnit: parseInt(req.body.productUnit) || parseInt(productUnit),
        productUnitMeasurement:
          req.body.productUnitMeasurement || productUnitMeasurement,
        productPricePerUnit:
          parseInt(req.body.productPricePerUnit) || productPricePerUnit,
        productDescription: req.body.productDescription || productDescription,
      },
    });

    const ahente = await prisma.ahente.findUnique({
      where: {
        id: parseInt(editProduct.ahenteId),
      },
    });

    return res.status(200).json({
      message: `You edited the product ${editProduct.productName} associated with ahente ${ahente.name}`,
    });
  } catch (error) {
    console.log(`An error occured: ${error}`);
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     view list of products associated with ahente
//@ROUTE    GET /api/agentify/product/list/:ahenteId
//@ACCESS   private
const viewProducts = asyncHandler(
  asyncHandler(async (req, res, next) => {
    const { ahenteId } = req.params;

    if (!ahenteId) {
      return res.status(400).json({ message: `Id's are required` });
    }

    const ahente = await prisma.ahente.findUnique({
      where: {
        id: parseInt(ahenteId),
      },
    });

    if (!ahente) {
      return res.status(200).json({ message: "Id does not exist" });
    }

    try {
      const product = await prisma.product.findMany({
        where: {
          ahenteId: parseInt(ahenteId),
        },
      });

      res
        .status(200)
        .send(product > 0 ? "No products listed for this ahente" : product);
    } catch (error) {}
  })
);

//@DESC     view one product associated with ahente
//@ROUTE    GET /api/agentify/product/view/:productId
//@ACCESS   private
const viewProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: "Id are required" });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  return res.status(200).send(product);
});
export default {
  registerProduct,
  removeProduct,
  editProduct,
  viewProducts,
  viewProduct,
};
