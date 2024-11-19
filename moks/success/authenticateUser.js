import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', 
  username: 'exampleUser',
  message: 'Login successful',
  date: '2024-11-18T00:00:00Z'
};

const userAuthenticateMock = RequestMock()
  .onRequestTo(`${API_HOST}user/authenticate`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default userAuthenticateMock;
