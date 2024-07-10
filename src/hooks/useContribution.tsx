import { useState } from 'react';
import {
  addContributionApi,
  deleteContributionApi,
  getContributionByIdApi,
  getContributionsApi,
  searchContributionsApi,
  updateContributionApi,
} from '../api/contribution.api';
import { isUndefined } from 'lodash';

export function useContribution() {
  const [loadingContribution, setLoadingContribution] = useState(false);
  const [loadingSearchContribution, setLoadingSearchContribution] =
    useState(false);
  const [contributions, setContributions] = useState([]);
  const [contribution, setContribution] = useState(undefined);
  //   const auth = useAuth()
  const getContributions = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingContribution(true);
      const response = await getContributionsApi();
      if (isUndefined(changeActive)) setLoadingContribution(false);
      setContributions(response);
    } catch (err) {
      setLoadingContribution(false);
      throw err;
    }
  };

  const getContributionsByFilters = async (filters: any) => {
    try {
      setLoadingContribution(true);
      const response = await getContributionsApi(filters);
      setLoadingContribution(false);
      setContributions(response);
    } catch (err) {
      setLoadingContribution(false);
      throw err;
    }
  };

  const searchContributions = async (search: any, active: any) => {
    try {
      setLoadingSearchContribution(true);
      const response = await searchContributionsApi(search, active);
      setLoadingSearchContribution(false);
      setContributions(response);
    } catch (err) {
      setLoadingSearchContribution(false);
      throw err;
    }
  };

  const getContributionById = async (id: string) => {
    try {
      setLoadingContribution(true);
      const response = await getContributionByIdApi(id);
      setLoadingContribution(false);
      setContribution(response);
    } catch (err) {
      setLoadingContribution(false);
      throw err;
    }
  };

  const addContribution = async (data: any) => {
    try {
      setLoadingContribution(true);
      const response = await addContributionApi(data); //auth.token
      setLoadingContribution(false);
      setContribution(response);
    } catch (err) {
      setLoadingContribution(false);
      throw err;
    }
  };

  const updateContribution = async (
    id: string,
    data: any,
    changeActive = undefined,
  ) => {
    try {
      if (isUndefined(changeActive)) setLoadingContribution(true);
      const response = await updateContributionApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingContribution(false);
      if (isUndefined(changeActive)) setContribution(response);
    } catch (err) {
      setLoadingContribution(false);
      throw err;
    }
  };

  const deleteContribution = async (id: string) => {
    try {
      setLoadingContribution(true);
      const response = await deleteContributionApi(id); //auth.token
      setLoadingContribution(false);
      setContribution(response);
    } catch (err) {
      setLoadingContribution(false);
      throw err;
    }
  };

  return {
    getContributions,
    getContributionById,
    getContributionsByFilters,
    searchContributions,
    addContribution,
    updateContribution,
    deleteContribution,
    loadingContribution,
    loadingSearchContribution,
    contributions,
    contribution,
  };
}
