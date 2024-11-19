import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 400,
  detail: 'Token does not contain expiration time'
};

const accessTokenRenewMock = RequestMock()
  .onRequestTo(`${API_HOST}accessToken/renew`)
  .respond(mockData, 400, { 'access-control-allow-origin': '*' });

export default accessTokenRenewMock;
