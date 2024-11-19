import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 404,
  detail: 'User not found'
};

const userAuthenticateMock = RequestMock()
  .onRequestTo(`${API_HOST}user/authenticate`)
  .respond(mockData, 404, { 'access-control-allow-origin': '*' });

export default userAuthenticateMock;
