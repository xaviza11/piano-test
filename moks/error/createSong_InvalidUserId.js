import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 400,
  detail: 'Invalid user ObjectId'
};

const songCreateMock = RequestMock()
  .onRequestTo(`${API_HOST}song/create`)
  .respond(mockData, 400, { 'access-control-allow-origin': '*' });

export default songCreateMock;
