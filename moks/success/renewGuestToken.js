import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  guest_token: '1233421asdf',
  date: new Date().toISOString(),
  message: 'Token renewed successfully'
};

const tokenMock = RequestMock()
  .onRequestTo(`${API_HOST}guestToken/renew_token/`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default tokenMock;
