import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '3m', target: 100 }, // simulate ramp-up of traffic from 1-100 users over 4 min
    { duration: '7m', target: 100 }, // stay at 100 users for 8 min
    { duration: '3m', target: 0 }, // ramp down to zero over 4 min
  ],
  thresholds: {
    http_req_duration: ['p(99) < 150'], // 99% of requests must complete below 150ms
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
