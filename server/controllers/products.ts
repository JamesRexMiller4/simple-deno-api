import { Product } from '../types.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

let products: Product[] = [
  {
    "id": "1",
    "name": "Product One",
    "description": "This is product one",
    "price": 29.99
  },
  {
    "id": "2",
    "name": "Product Two",
    "description": "This is product two",
    "price": 42.99
  },
  {
    "id": "3",
    "name": "Product Three",
    "description": "This is product three",
    "price": 49.99
  }
]


// @desc  Get all products
// @route GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
    response.body = {
      "success": true,
      "data": products
    }
}

// @desc  Get a product
// @route GET /api/v1/products/{id}

const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
  const product: Product | undefined = products.find(product => product.id === params.id)

  if (product) {
    response.status = 200
    response.body = {
      "success": true,
      "data": product
    }
  } else {
    response.status = 404
    response.body = {
      "success": false,
      "msg": "No product found"
    }
  }

}

// @desc  Add a product
// @route POST /api/v1/products

const addProduct = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body()

  if (!request.hasBody) {
    response.status = 400
    response.body = {
      success: false,
      message: 'No data in request body'
    }
  }

  const newProduct: Product = { id: v4.generate(), ...body.value }
  products.push(newProduct)
  response.status = 201
  response.body = {
    "success": true,
    "data": newProduct
  }
}

// @desc  Update a product
// @route PUT /api/v1/products/:id

const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
  const product: Product | undefined = products.find(product => product.id === params.id)

  if (product) {
    const body = await request.body()
    const updateData: { name?: string; description?: string; price?: number } = body.value

    products = products.map(product => product.id === params.id ? { ...product, ...updateData } : product)

    response.status = 200
    response.body = {
      "success": true,
      "data": products
    }
  } else {
    response.status = 404
    response.body = {
      "success": false,
      "msg": "No product found"
    }
  }
}

// @desc  delete a product
// @route DELETE /api/v1/products/:id

const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
  const product: Product | undefined = products.find(product => product.id === params.id)

  if (product) {
    products = products.filter(product => product.id !== params.id)

    response.status = 200
    response.body = {
      "success": true,
      "data": products
    }
  } else {
    response.status = 404
    response.body = {
      "success": false,
      "msg": "No product found"
    }
  }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }