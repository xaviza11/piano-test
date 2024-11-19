import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  statusCode: 400,
  detail: 'User already exists'
};

const userRegisterMock = RequestMock()
  .onRequestTo(`${API_HOST}user/register`)
  .respond(mockData, 400, { 'access-control-allow-origin': '*' });

export default userRegisterMock;
