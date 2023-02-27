import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data'

const mhs = new SharedArray('mhs', function () {
  return open('mhs.txt').split(/\r?\n/).filter(Boolean)
})

export const options = {
  stages: [
    { target: 200, duration: '30s' },
    { target: 0, duration: '30s' },
  ],
};

export default function () {
  const mh = mhs[Math.floor(Math.random() * mhs.length)]
  const result = http.get(`https://indexstar.dev.cid.contact/multihash/${mh}`);
  check(result, {
    'http response status code is 200': result.status === 200,
  });
}