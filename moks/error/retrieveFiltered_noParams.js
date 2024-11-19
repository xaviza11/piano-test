import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 400,
  detail: 'At least one search parameter is required'
};

const songRetrieveSongsMock = RequestMock()
  .onRequestTo(`${API_HOST}songs/retrieve_songs`)
  .respond(mockData, 400, { 'access-control-allow-origin': '*' });

export default songRetrieveSongsMock;
