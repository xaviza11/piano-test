import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 401,
  detail: 'Wrong password'
};

const userAuthenticateMock = RequestMock()
  .onRequestTo(`${API_HOST}user/authenticate`)
  .respond(mockData, 401, { 'access-control-allow-origin': '*' });

export default userAuthenticateMock;
