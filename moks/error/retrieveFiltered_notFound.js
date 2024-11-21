import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 404,
  detail: 'No songs found'
};

const songRetrieveSongsMock = RequestMock()
  .onRequestTo(`${API_HOST}song/retrieve_songs?author=as`)
  .respond(mockData, 404, { 'access-control-allow-origin': '*' });

export default songRetrieveSongsMock;
