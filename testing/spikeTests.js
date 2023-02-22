import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '20s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1000 }, // spike to 1000 users
    { duration: '1m30s', target: 1000 }, // stay at 1000 for 1.5 min
    { duration: '10s', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default () => {
  const randomProductId = Math.floor(Math.random() * 1000000);
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production
  const responses = http.batch([
    ['GET', `${BASE_URL}/api/products`],
    ['GET', `${BASE_URL}/api/products/${randomProductId}`],
    ['GET', `${BASE_URL}/api/products/${randomProductId}/related`],
    ['GET', `${BASE_URL}/api/products/${randomProductId}/styles`],
  ]);
  sleep(1);
};
