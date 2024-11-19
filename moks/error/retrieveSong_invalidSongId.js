import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 400,
  detail: 'Invalid song ObjectId'
};

const songRetrieveMock = RequestMock()
  .onRequestTo(`${API_HOST}song/retrieve`)
  .respond(mockData, 400, { 'access-control-allow-origin': '*' });

export default songRetrieveMock;
