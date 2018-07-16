'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

const apiUrl = 'http://localhost:5000/api';

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID REQUESET TO THE API', () => {
  describe('GET api/time', () => {
    test('Should respond with a 200 status', (done) => {
      superagent.get(`${apiUrl}/time`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('date');
          done();
        });
    });
  });

  describe('GET /cowsayPage', () => {
    const mockCow = cowsay.say({ text: 'Hello World' });
    const mockHtml = `<section><h3><a href="api/time">Click here for current time</a></h3><pre>${mockCow}</pre></section>`;
    test('Should respond with a 200 status and return cow HTML', () => {
      return superagent.get(`${apiUrl}/cowsayPage`)
        .query({ text: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockHtml);
        });
    });
  });

  describe('POST /echo', () => {
    test('Should respond with a 200 status for successful post ', () => {
      return superagent.post(`${apiUrl}/echo`)
        .send({ name: 'Liz' })
        .then((res) => {
          expect(res.name).toEqual('Liz');
          expect(res.status).toEqual(200);
        })
        .catch((err) => {
          console.log(err); /* eslint-disable-line */
        });
    });
  });
});

describe('INVALID REQUEST TO THE API', () => {
  describe('GET /cowsayPage', () => {
    test('Should error out with a 400 status code for not sending text in query', () => {
      return superagent.get(`${apiUrl}/cowsayPage`)
        .query({})
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});
