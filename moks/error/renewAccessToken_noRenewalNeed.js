import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Token does not need renewal yet',
  token: 'gAAAAABfLkh1aYME...', 
  date: '2024-11-18T00:00:00Z'
};

const accessTokenRenewMock = RequestMock()
  .onRequestTo(`${API_HOST}accessToken/renew`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default accessTokenRenewMock;
