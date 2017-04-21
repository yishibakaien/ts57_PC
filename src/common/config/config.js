'use strict';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.1.11:8080';

const headers = {
  'x-version': '1.0',
  'x-client': '1'
};

export {
  headers,
  baseURL
};
