import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 500,
  detail: 'Song creation failed'
};

const songCreateMock = RequestMock()
  .onRequestTo(`${API_HOST}song/create`)
  .respond(mockData, 500, { 'access-control-allow-origin': '*' });

export default songCreateMock;
