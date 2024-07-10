import { useState } from 'react';
import {
  addProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsApi,
  searchProductsApi,
  updateProductApi,
} from '../api/products.api';
import { isUndefined } from 'lodash';

export function useProduct() {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingSearchProduct, setLoadingSearchProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [contribution, setProduct] = useState(undefined);
  //   const auth = useAuth()
  const getProducts = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingProduct(true);
      const response = await getProductsApi();
      if (isUndefined(changeActive)) setLoadingProduct(false);
      setProducts(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const getProductsByFilters = async (filters: any) => {
    try {
      setLoadingProduct(true);
      const response = await getProductsApi(filters);
      setLoadingProduct(false);
      setProducts(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const searchProducts = async (search: any, active: any) => {
    try {
      setLoadingSearchProduct(true);
      const response = await searchProductsApi(search, active);
      setLoadingSearchProduct(false);
      setProducts(response);
    } catch (err) {
      setLoadingSearchProduct(false);
      throw err;
    }
  };

  const getProductById = async (id: string) => {
    try {
      setLoadingProduct(true);
      const response = await getProductByIdApi(id);
      setLoadingProduct(false);
      setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const addProduct = async (data: any) => {
    try {
      setLoadingProduct(true);
      const response = await addProductApi(data); //auth.token
      setLoadingProduct(false);
      setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const updateProduct = async (
    id: string,
    data: any,
    changeActive = undefined,
  ) => {
    try {
      if (isUndefined(changeActive)) setLoadingProduct(true);
      const response = await updateProductApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingProduct(false);
      if (isUndefined(changeActive)) setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoadingProduct(true);
      const response = await deleteProductApi(id); //auth.token
      setLoadingProduct(false);
      setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  return {
    getProducts,
    getProductById,
    getProductsByFilters,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loadingProduct,
    loadingSearchProduct,
    products,
    contribution,
  };
}
