import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '.';
import '@testing-library/jest-dom';


test('renders form and displays output after form submission', () => {
  // Mock the handleApiCall function
  const handleApiCall = jest.fn();
	const setRequestParams = jest.fn();

  // Render the Form component
  render(<Form
		handleApiCall={handleApiCall} 
		setRequestParams={setRequestParams}
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
  const submitButton = screen.getByRole('button', { name: 'GO!' });
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

  // Assert that the output area displays the expected result
  // expect(screen.getByText('Form submitted!')).toBeInTheDocument();
});