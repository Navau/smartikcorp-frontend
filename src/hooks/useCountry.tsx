import { useState } from 'react';
import {
  addCountryApi,
  deleteCountryApi,
  getCountryByIdApi,
  getCountriesApi,
  searchCountriesApi,
  updateCountryApi,
} from '../api/countries.api';
import { isUndefined } from 'lodash';

export function useCountry() {
  const [loadingCountry, setLoadingCountry] = useState(false);
  const [loadingSearchCountry, setLoadingSearchCountry] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(undefined);
  //   const auth = useAuth()
  const getCountries = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingCountry(true);
      const response = await getCountriesApi();
      if (isUndefined(changeActive)) setLoadingCountry(false);
      setCountries(response);
    } catch (err) {
      setLoadingCountry(false);
      throw err;
    }
  };

  const getCountriesByFilters = async (filters: any) => {
    try {
      setLoadingCountry(true);
      const response = await getCountriesApi(filters);
      setLoadingCountry(false);
      setCountries(response);
    } catch (err) {
      setLoadingCountry(false);
      throw err;
    }
  };

  const searchCountries = async (search: any, active: any) => {
    try {
      setLoadingSearchCountry(true);
      const response = await searchCountriesApi(search, active);
      setLoadingSearchCountry(false);
      setCountries(response);
    } catch (err) {
      setLoadingSearchCountry(false);
      throw err;
    }
  };

  const getCountryById = async (id: string) => {
    try {
      setLoadingCountry(true);
      const response = await getCountryByIdApi(id);
      setLoadingCountry(false);
      setCountry(response);
    } catch (err) {
      setLoadingCountry(false);
      throw err;
    }
  };

  const addCountry = async (data: any) => {
    try {
      setLoadingCountry(true);
      const response = await addCountryApi(data); //auth.token
      setLoadingCountry(false);
      setCountry(response);
    } catch (err) {
      setLoadingCountry(false);
      throw err;
    }
  };

  const updateCountry = async (
    id: string,
    data: any,
    changeActive = undefined,
  ) => {
    try {
      if (isUndefined(changeActive)) setLoadingCountry(true);
      const response = await updateCountryApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingCountry(false);
      if (isUndefined(changeActive)) setCountry(response);
    } catch (err) {
      setLoadingCountry(false);
      throw err;
    }
  };

  const deleteCountry = async (id: string) => {
    try {
      setLoadingCountry(true);
      const response = await deleteCountryApi(id); //auth.token
      setLoadingCountry(false);
      setCountry(response);
    } catch (err) {
      setLoadingCountry(false);
      throw err;
    }
  };

  return {
    getCountries,
    getCountryById,
    getCountriesByFilters,
    searchCountries,
    addCountry,
    updateCountry,
    deleteCountry,
    loadingCountry,
    loadingSearchCountry,
    countries,
    country,
  };
}
