import { API_HOST } from '../../environment';
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Melody generated successfully',
  notes: [
    { note: 'C4', time: 0.0, velocity: 0.7, duration: 1.0 },
    { note: 'D4', time: 1.0, velocity: 0.5, duration: 0.5 },
    { note: 'E4', time: 1.5, velocity: 0.8, duration: 0.25 }
  ]
};

const songGenerateMock = RequestMock()
  .onRequestTo(`${API_HOST}songGenerate`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default songGenerateMock;
