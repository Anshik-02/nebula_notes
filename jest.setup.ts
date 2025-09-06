import '@testing-library/jest-dom';
import 'whatwg-fetch'; 
import { server } from '@/app/mocks/server';
import { TextEncoder, TextDecoder } from 'util';
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
Object.assign(global, { TextDecoder, TextEncoder });

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

