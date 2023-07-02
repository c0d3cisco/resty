import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '.';
import '@testing-library/jest-dom';


describe('Form component', () => {
  test('renders form and displays output after form submission', () => {

    const handleApiCall = jest.fn();
    const setDivRequestParams = jest.fn();
    const dispatch = jest.fn();

    render(<Form
      handleApiCall={handleApiCall}
      dispatch={dispatch}
      setDivRequestParams={setDivRequestParams}
    />);

    // Fill in form inputs
    const urlInput = screen.getByLabelText('URL:');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });

    const tokenInput = screen.getByLabelText('Bearer:');
    fireEvent.change(tokenInput, { target: { value: 'my-token' } });

    const jsonInput = screen.getByLabelText('JSON Body:');
    fireEvent.change(jsonInput, { target: { value: '{ "name": "John" }' } });

    let methodButton = screen.getByTestId('postTest');
    fireEvent.click(methodButton);

    methodButton = screen.getByTestId('putTest');
    fireEvent.click(methodButton);

    methodButton = screen.getByTestId('getTest');
    fireEvent.click(methodButton);

    // last one to be pressed
    methodButton = screen.getByTestId('deleteTest');
    fireEvent.click(methodButton);


    // Submit the form
    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    // Assert that the handleApiCall function is called with the correct request params
    expect(handleApiCall).toHaveBeenCalledWith({
      method: 'DELETE',
      url: 'https://example.com',
      data: '{ "name": "John" }',
      headers: {
        Authorization: 'Bearer my-token',
      },
    });
  });
  test("triggers an alert on some action", () => {
    // mock window.alert

    const handleApiCall = jest.fn();
    const setDivRequestParams = jest.fn();
    const dispatch = jest.fn();

    render(<Form
      handleApiCall={handleApiCall}
      dispatch={dispatch}
      setDivRequestParams={setDivRequestParams}
    />);

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    // verify alert was called
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

});
