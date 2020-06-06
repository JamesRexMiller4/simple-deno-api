import { Product } from '../types.ts'

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

const getProduct = ({ response, id }: { response: any, id: String }) => {
  const product = products.find(product => product.id === id)
  response.body = {
    "success": true,
    "data": product
  }
}



export { getProducts }