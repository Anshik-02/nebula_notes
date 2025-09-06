// app/api/pages/__tests__/getAllNotes.test.ts
import { server } from '@/app/mocks/server';

// Start MSW server for this test suite
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('get all notes of a user', () => {
  it('should return all notes', async () => {
    const response = await fetch('/notes');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.length).toBe(3);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('createdAt');
    expect(data[0]).toHaveProperty('updatedAt');
    expect(data[0]).toHaveProperty('content');
    expect(data[0]).toHaveProperty('createdBy');
    expect(data[0]).toHaveProperty('tags');
  });
});
