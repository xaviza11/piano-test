import {API_HOST} from '../../environment'
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Songs retrieved successfully',
  songs: [
    {
      id: '60d21b4667d0d8992e610c85',
      name: 'First Example Song',
      tone: 'G Major',
      author: 'John Doe'
    },
    {
      id: '60d21b4667d0d8992e610c86',
      name: 'Second Example Song',
      tone: 'A Minor',
      author: 'Jane Doe'
    }
  ]
};

const songsMock = RequestMock()
  .onRequestTo(API_HOST + 'songs/retrieve_songs/')
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

module.exports = songsMock;
