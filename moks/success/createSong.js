import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Song created successfully',
  id: '60d21b4667d0d8992e610c85'
};

const songCreateMock = RequestMock()
  .onRequestTo(`${API_HOST}song/create`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default songCreateMock;
