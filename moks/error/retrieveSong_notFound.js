import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 404,
  detail: 'Song not found'
};

const songRetrieveMock = RequestMock()
  .onRequestTo(`${API_HOST}songs/retrieve`)
  .respond(mockData, 404, { 'access-control-allow-origin': '*' });

export default songRetrieveMock;
