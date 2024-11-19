import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  guest_token: 'gAAAAABfKsd9z3Ly',
  date: new Date().toISOString(),
  message: 'Token Created'
};

const guestTokenMock = RequestMock()
  .onRequestTo(`${API_HOST}guestToken/generate`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default guestTokenMock;
