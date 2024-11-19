import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Guest token does not need renewal yet',
  token: 'gAAAAABfKsd9z3Ly',
  date: '2024-11-18T00:00:00Z'
};

const guestTokenRenewMock = RequestMock()
  .onRequestTo(`${API_HOST}guestToken/renew`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default guestTokenRenewMock;
