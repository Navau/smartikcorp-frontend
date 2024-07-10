import { useState } from 'react';
import {
  addZoneApi,
  deleteZoneApi,
  getZoneByIdApi,
  getZonesApi,
  searchZonesApi,
  updateZoneApi,
} from '../api/zones.api';
import { isUndefined } from 'lodash';

export function useZone() {
  const [loadingZone, setLoadingZone] = useState(false);
  const [loadingSearchZone, setLoadingSearchZone] = useState(false);
  const [zones, setZones] = useState([]);
  const [contribution, setZone] = useState(undefined);
  //   const auth = useAuth()
  const getZones = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingZone(true);
      const response = await getZonesApi();
      if (isUndefined(changeActive)) setLoadingZone(false);
      setZones(response);
    } catch (err) {
      setLoadingZone(false);
      throw err;
    }
  };

  const getZonesByFilters = async (filters: any) => {
    try {
      setLoadingZone(true);
      const response = await getZonesApi(filters);
      setLoadingZone(false);
      setZones(response);
    } catch (err) {
      setLoadingZone(false);
      throw err;
    }
  };

  const searchZones = async (search: any, active: any) => {
    try {
      setLoadingSearchZone(true);
      const response = await searchZonesApi(search, active);
      setLoadingSearchZone(false);
      setZones(response);
    } catch (err) {
      setLoadingSearchZone(false);
      throw err;
    }
  };

  const getZoneById = async (id: string) => {
    try {
      setLoadingZone(true);
      const response = await getZoneByIdApi(id);
      setLoadingZone(false);
      setZone(response);
    } catch (err) {
      setLoadingZone(false);
      throw err;
    }
  };

  const addZone = async (data: any) => {
    try {
      setLoadingZone(true);
      const response = await addZoneApi(data); //auth.token
      setLoadingZone(false);
      setZone(response);
    } catch (err) {
      setLoadingZone(false);
      throw err;
    }
  };

  const updateZone = async (
    id: string,
    data: any,
    changeActive = undefined,
  ) => {
    try {
      if (isUndefined(changeActive)) setLoadingZone(true);
      const response = await updateZoneApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingZone(false);
      if (isUndefined(changeActive)) setZone(response);
    } catch (err) {
      setLoadingZone(false);
      throw err;
    }
  };

  const deleteZone = async (id: string) => {
    try {
      setLoadingZone(true);
      const response = await deleteZoneApi(id); //auth.token
      setLoadingZone(false);
      setZone(response);
    } catch (err) {
      setLoadingZone(false);
      throw err;
    }
  };

  return {
    getZones,
    getZoneById,
    getZonesByFilters,
    searchZones,
    addZone,
    updateZone,
    deleteZone,
    loadingZone,
    loadingSearchZone,
    zones,
    contribution,
  };
}
