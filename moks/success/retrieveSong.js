import { API_HOST } from '../../environment'; 
const { RequestMock } = require('testcafe');

const mockData = {
  message: 'Song retrieved successfully',
  song_data: {
    id: '60d21b4667d0d8992e610c85',
    name: 'Example Song',
    tone: 'C Major',
    author: 'John Doe',
    notes: [
      { pitch: 'C4', duration: 1.0 },
      { pitch: 'D4', duration: 0.5 }
    ],
    createdAt: '2024-11-18T00:00:00Z',
    updatedAt: '2024-11-18T00:00:00Z'
  }
};

const songMock = RequestMock()
  .onRequestTo(`${API_HOST}songs/retrieve/`)
  .respond(mockData, 200, { 'access-control-allow-origin': '*' });

export default songMock;
