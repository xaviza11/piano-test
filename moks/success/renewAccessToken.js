import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Token renewed successfully',
  token: 'gAAAAABfLkh1aYME',
  date: '2024-11-18T00:00:00Z'
};

const accessTokenMock = RequestMock()
  .onRequestTo(`${API_HOST}accessToken/renew`) 
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default accessTokenMock;
