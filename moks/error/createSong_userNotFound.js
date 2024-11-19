import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  detail: "Invalid access token",
  status: 401
};

const songCreateMock = RequestMock()
  .onRequestTo(`${API_HOST}song/create`)
  .respond(mockData, 401, { 'access-control-allow-origin': '*' });

export default songCreateMock;
