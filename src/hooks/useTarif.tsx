import { useState } from 'react';
import {
  addTarifApi,
  deleteTarifApi,
  getTarifByIdApi,
  getTarifsApi,
  searchTarifsApi,
  updateTarifApi,
} from '../api/tarifs.api';
import { isUndefined } from 'lodash';

export function useTarif() {
  const [loadingTarif, setLoadingTarif] = useState(false);
  const [loadingSearchTarif, setLoadingSearchTarif] = useState(false);
  const [tarifs, setTarifs] = useState([]);
  const [contribution, setTarif] = useState(undefined);
  //   const auth = useAuth()
  const getTarifs = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingTarif(true);
      const response = await getTarifsApi();
      if (isUndefined(changeActive)) setLoadingTarif(false);
      setTarifs(response);
    } catch (err) {
      setLoadingTarif(false);
      throw err;
    }
  };

  const getTarifsByFilters = async (filters: any) => {
    try {
      setLoadingTarif(true);
      const response = await getTarifsApi(filters);
      setLoadingTarif(false);
      setTarifs(response);
    } catch (err) {
      setLoadingTarif(false);
      throw err;
    }
  };

  const searchTarifs = async (search: any, active: any) => {
    try {
      setLoadingSearchTarif(true);
      const response = await searchTarifsApi(search, active);
      setLoadingSearchTarif(false);
      setTarifs(response);
    } catch (err) {
      setLoadingSearchTarif(false);
      throw err;
    }
  };

  const getTarifById = async (id: string) => {
    try {
      setLoadingTarif(true);
      const response = await getTarifByIdApi(id);
      setLoadingTarif(false);
      setTarif(response);
    } catch (err) {
      setLoadingTarif(false);
      throw err;
    }
  };

  const addTarif = async (data: any) => {
    try {
      setLoadingTarif(true);
      const response = await addTarifApi(data); //auth.token
      setLoadingTarif(false);
      setTarif(response);
    } catch (err) {
      setLoadingTarif(false);
      throw err;
    }
  };

  const updateTarif = async (
    id: string,
    data: any,
    changeActive = undefined,
  ) => {
    try {
      if (isUndefined(changeActive)) setLoadingTarif(true);
      const response = await updateTarifApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingTarif(false);
      if (isUndefined(changeActive)) setTarif(response);
    } catch (err) {
      setLoadingTarif(false);
      throw err;
    }
  };

  const deleteTarif = async (id: string) => {
    try {
      setLoadingTarif(true);
      const response = await deleteTarifApi(id); //auth.token
      setLoadingTarif(false);
      setTarif(response);
    } catch (err) {
      setLoadingTarif(false);
      throw err;
    }
  };

  return {
    getTarifs,
    getTarifById,
    getTarifsByFilters,
    searchTarifs,
    addTarif,
    updateTarif,
    deleteTarif,
    loadingTarif,
    loadingSearchTarif,
    tarifs,
    contribution,
  };
}
