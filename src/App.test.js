import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App  from './App.jsx';
import { initialState , dataReducer} from './App.jsx';

// Define the mock server
const server = setupServer(
  rest.get('/test-endpoint', (req, res, ctx) => {
    return res(ctx.json({ data: 'Hello world' }));
  }),
  rest.get('/test-INCORRECT-endpoint', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
  test('SUCCEEDED to fetches and displays data', async () => {

    render(<App />);

    const textBox = await screen.findByTestId('urlTextBox');
    const submitButton = await screen.findByTestId('submitButton');
    const getButton = await screen.findByTestId('getTest');

    fireEvent.click(getButton);
    fireEvent.change(textBox, { target: { value: '/test-endpoint' } });
    fireEvent.click(submitButton);

    const appDivUrl = await screen.findByTestId('app-div-url');
    const results = await screen.findByTestId('results-pre');

    expect(appDivUrl).toHaveTextContent('/test-endpoint');
    expect(results).toHaveTextContent('Hello world');
  });

  test('FAILED to fetches and displays data', async () => {

    render(<App />);

    const textBox = await screen.findByTestId('urlTextBox');
    const button = await screen.findByTestId('submitButton');
    const getButton = await screen.findByTestId('getTest');

    fireEvent.click(getButton);
    fireEvent.change(textBox, { target: { value: '/test-INCORRECT-endpoint' } });
    fireEvent.click(button);

    const appDivUrl = await screen.findByTestId('app-div-url');
    const results = await screen.findByTestId('results-pre');

    expect(appDivUrl).toHaveTextContent('/test-INCORRECT-endpoint');
    expect(results).toHaveTextContent('{19 items"0":string"N""1":string"o""2":string" ""3":string"d""4":string"a""5":string"t""6":string"a""7":string" ""8":string"t""9":string"o""10":string" ""11":string"d""12":string"i""13":string"s""14":string"p""15":string"l""16":string"a""17":string"y""18":string"."}');
  });
});

describe('dataReducer', () => {
  test('handles ADD DATA action', () => {
    const action = { type: 'ADD DATA', payload: 'Test data' };
    const newState = dataReducer(initialState, action);

    expect(newState.data).toEqual('Test data');
    expect(newState.loading).toEqual(false); // Shouldn't change
    expect(newState.i).toEqual(0); // Shouldn't change
  });

  test('handles LOADING action', () => {
    const action = { type: 'LOADING', payload: true };
    const newState = dataReducer(initialState, action);

    expect(newState.loading).toEqual(true);
    expect(newState.data).toBeNull(); // Shouldn't change
    expect(newState.i).toEqual(0); // Shouldn't change
  });

  test('handles ITERATE action', () => {
    const action = { type: 'ITERATE' };
    const newState = dataReducer(initialState, action);

    expect(newState.i).toEqual(1);
    expect(newState.data).toBeNull(); // Shouldn't change
    expect(newState.loading).toEqual(false); // Shouldn't change
  });

  test('handles HISTORY action', () => {
    const historyItem = { method: 'GET', url: '/test-endpoint' };
    const action = { type: 'HISTORY', payload: historyItem };
    const newState = dataReducer(initialState, action);

    expect(newState.history.length).toEqual(1);
    expect(newState.history[0]).toEqual(historyItem);
    expect(newState.data).toBeNull(); // Shouldn't change
    expect(newState.loading).toEqual(false); // Shouldn't change
    expect(newState.i).toEqual(0); // Shouldn't change
  });

  test('handles unknown action', () => {
    const action = { type: 'UNKNOWN ACTION', payload: 'Test' };
    const newState = dataReducer(initialState, action);

    // State should not change
    expect(newState).toEqual(initialState);
  });
});

// Your existing tests go here...
