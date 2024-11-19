import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  detail: "Invalid access token",
  status: 401
};

const accessTokenRenewMock = RequestMock()
  .onRequestTo(`${API_HOST}accessToken/renew`)
  .respond(mockData, 401, { 'access-control-allow-origin': '*' });

export default accessTokenRenewMock;
