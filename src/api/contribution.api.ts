import axios from 'axios';
import { BASE_API } from '@/constants/api.constant';

import { isEmpty, isUndefined, map } from 'lodash';

export async function getContributionsApi(filters = {}) {
  try {
    const stringFilters = map(filters, (value, index) => {
      return `${index}=${value}`;
    }).join('&');
    const url = `${BASE_API}/api/contributions/${
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

export async function searchContributionsApi(search: any, active: any) {
  try {
    let url = '';
    url += `${BASE_API}/api/contributions/`;
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

export async function getContributionByIdApi(id: string) {
  try {
    const url = `${BASE_API}/api/contributions/${id}/`;
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

export async function addContributionApi(data: any, token?: string) {
  try {
    const url = `${BASE_API}/api/contributions/`;
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

export async function updateContributionApi(
  id: string,
  data: any,
  token?: string,
) {
  try {
    const url = `${BASE_API}/api/contributions/${id}/`;
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

export async function deleteContributionApi(id: string, token?: string) {
  try {
    const url = `${BASE_API}/api/contributions/${id}/`;
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
