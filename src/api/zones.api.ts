import axios from 'axios';
import { BASE_API } from '@/constants/api.constant';

import { isEmpty, isUndefined, map } from 'lodash';

export async function getZonesApi(filters = {}) {
  try {
    const stringFilters = map(filters, (value, index) => {
      return `${index}=${value}`;
    }).join('&');
    const url = `${BASE_API}/api/zones/${
      !isEmpty(stringFilters) ? `?${stringFilters}` : ''
    }`;
    return await axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function searchZonesApi(search: any, active: any) {
  try {
    let url = '';
    url += `${BASE_API}/api/zones/`;
    url += !isEmpty(search) ? `?search=${encodeURIComponent(search)}` : '';
    url += !isUndefined(active)
      ? isEmpty(search)
        ? `?active=${active}`
        : `&active=${active}`
      : '';
    return await axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function getZoneByIdApi(id: string) {
  try {
    const url = `${BASE_API}/api/zones/${id}/`;
    return await axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function addZoneApi(data: any, token?: string) {
  try {
    const url = `${BASE_API}/api/zones/`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(data);
    return await axios
      .post(url, body, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;

        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function updateZoneApi(id: string, data: any, token?: string) {
  try {
    const url = `${BASE_API}/api/zones/${id}/`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(data);
    return await axios
      .patch(url, body, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;

        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function deleteZoneApi(id: string, token?: string) {
  try {
    const url = `${BASE_API}/api/zones/${id}/`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await axios
      .delete(url, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}
