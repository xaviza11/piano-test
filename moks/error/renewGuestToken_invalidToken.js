import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 401,
  detail: 'Invalid guest token'
};

const guestTokenRenewMock = RequestMock()
  .onRequestTo(`${API_HOST}guestToken/renew`)
  .respond(mockData, 401, { 'access-control-allow-origin': '*' });

export default guestTokenRenewMock;
