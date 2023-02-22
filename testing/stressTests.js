import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 500,
      timeUnit: '1s',
      stages: [
        { duration: '20s', target: 100 }, // below normal load
        { duration: '50s', target: 100 },
        { duration: '1m', target: 200 }, // normal load
        { duration: '1m20s', target: 200 },
        { duration: '30s', target: 300 }, // around the breaking point
        { duration: '1m', target: 300 },
        { duration: '20s', target: 400 }, // beyond the breaking point
        { duration: '1m', target: 400 },
        { duration: '2m', target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
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
