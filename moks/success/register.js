import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  date: '2024-11-18T00:00:00Z'
};

const userRegisterMock = RequestMock()
  .onRequestTo(`${API_HOST}user/register`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default userRegisterMock;
