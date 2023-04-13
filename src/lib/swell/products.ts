import swell from './client'
import { PRODUCTS_PER_PAGE } from '../constants'
import type { Product, ResultsResponse } from 'swell-js'

export const getProducts = async ({
  page = 1,
  filters = {},
  limit = PRODUCTS_PER_PAGE
}) => {
  return (await swell.products.list({
    page,
    limit,
    $filters: filters,
    expand: ['variants', 'categories']
  })) as ResultsResponse<Product>
}

export const getProductBySlugOrId = async (slugOrId: string) => {
  return (await swell.products.get(slugOrId)) as Product
}

