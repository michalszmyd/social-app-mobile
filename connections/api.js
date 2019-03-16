const API = 'http://localhost:3000/api/v1';

export const makeGetRequest = (data) => {
  return fetch(`${API}${data.url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => ({ status: response.status, data: response.json() }))
};

export const makeGetTokenRequest = (data) => {
  return fetch(`${API}${data.url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: data.token
    }
  }).then((response) => {
    if (response.status === 401 || response.status === 403) {
      throw Unauthorized;
    } else {
      return { status: response.status, data: response.json() }
    }
  })
};

export const makePostRequest = (data) => {
  return fetch(`${API}${data.url}`, {
    method: 'POST',
    body: JSON.stringify(data.body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => ({ status: response.status, data: response.json() }))
};

export const makePostTokenRequest = (data) => {
  const stringify = data.stringify === undefined ? true : data.stringify;
  const preparedBody = stringify ? JSON.stringify(data.body) : data.body;

  return fetch(`${API}${data.url}`, {
    method: 'POST',
    body: preparedBody,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: data.token
    }
  }).then((response) => ({ status: response.status, data: response.json() }))
};
