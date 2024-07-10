import axios from 'axios';
import { BASE_API } from '@/constants/api.constant';

import { isEmpty, isUndefined, map } from 'lodash';

export async function getCountriesApi(filters = {}) {
  try {
    const stringFilters = map(filters, (value, index) => {
      return `${index}=${value}`;
    }).join('&');
    const url = `${BASE_API}/api/countries/${
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

export async function searchCountriesApi(search: any, active: any) {
  try {
    let url = '';
    url += `${BASE_API}/api/countries/`;
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

export async function getCountryByIdApi(id: string) {
  try {
    const url = `${BASE_API}/api/countries/${id}/`;
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

export async function addCountryApi(data: any, token?: string) {
  try {
    const url = `${BASE_API}/api/countries/`;
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

export async function updateCountryApi(id: string, data: any, token?: string) {
  try {
    const url = `${BASE_API}/api/countries/${id}/`;
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

export async function deleteCountryApi(id: string, token?: string) {
  try {
    const url = `${BASE_API}/api/countries/${id}/`;
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
