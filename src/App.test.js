import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

// Define the mock server
const server = setupServer(
  rest.get('/test-endpoint', (req, res, ctx) => {
    return res(ctx.json({ data: 'Hello world' }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
  test('SUCCEEDED to fetches and displays data', async () => {

    render(<App />);

    const textBox = await screen.findByTestId('urlTextBox');
    const button = await screen.findByTestId('submitButton');

    fireEvent.change(textBox, { target: { value: '/test-endpoint' } });
    fireEvent.click(button);

    const appDivUrl = await screen.findByTestId('app-div-url');
    const results = await screen.findByTestId('results-pre');

    expect(appDivUrl).toHaveTextContent('/test-endpoint');
    console.log('applesauce',results);
    expect(results).toHaveTextContent('Hello world');
  });

  test('FAILED to fetches and displays data', async () => {

    render(<App />);

    const textBox = await screen.findByTestId('urlTextBox');
    const button = await screen.findByTestId('submitButton');

    fireEvent.change(textBox, { target: { value: '/test-INCORRECT-endpoint' } });
    fireEvent.click(button);

    const appDivUrl = await screen.findByTestId('app-div-url');
    const results = await screen.findByTestId('results-pre');

    expect(appDivUrl).toHaveTextContent('/test-INCORRECT-endpoint');
    expect(results).toHaveTextContent('{19 items"0":string"N""1":string"o""2":string" ""3":string"d""4":string"a""5":string"t""6":string"a""7":string" ""8":string"t""9":string"o""10":string" ""11":string"d""12":string"i""13":string"s""14":string"p""15":string"l""16":string"a""17":string"y""18":string"."}');
  });
});
