import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 400,
  detail: 'Guest token does not contain expiration time'
};

const guestTokenRenewMock = RequestMock()
  .onRequestTo(`${API_HOST}guestToken/renew`)
  .respond(mockData, 400, { 'access-control-allow-origin': '*' });

export default guestTokenRenewMock;
