import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_duration: [
      { threshold: 'max < 500', abortOnFail: false },
      { threshold: 'p(95) < 200', abortOnFail: false }, // 95% of requests must complete below 200ms
    ],
    http_req_failed: [{ threshold: 'rate < 0.01', abordtOnFail: true }],
  },
  stages: [
    { duration: '30s', target: 1000 }, // simulate ramp-up of traffic from 1-100 users over 4
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
