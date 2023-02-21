import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 500,
      timeUnit: '1s',
      stages: [
        { duration: '20s', target: 10 }, // below normal load
        { duration: '50s', target: 10 },
        { duration: '1m', target: 20 }, // normal load
        { duration: '1m20s', target: 20 },
        { duration: '30s', target: 30 }, // around the breaking point
        { duration: '1m', target: 30 },
        { duration: '20s', target: 40 }, // beyond the breaking point
        { duration: '1m', target: 40 },
        { duration: '2m', target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
};

export default function () {
  const randomProductId = Math.floor(Math.random() * 100000);
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production
  const responses = http.batch([
    ['GET', `${BASE_URL}/api/products`],
    ['GET', `${BASE_URL}/api/products/${randomProductId}`],
    ['GET', `${BASE_URL}/api/products/${randomProductId}/related`],
    ['GET', `${BASE_URL}/api/products/${randomProductId}/styles`],
  ]);
}
