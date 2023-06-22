import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '.';

describe('Results Component', () => {
  test('renders the data when data prop is provided', () => {
    const data = { key: 'value'};

    render(<Results data={data} />);
    const preElement = screen.getByTestId('preEl');

    expect(preElement).toBeInTheDocument();
    expect(preElement).toHaveTextContent('{ "key": "value" }');
  });

  test('renders nothing when data prop is null', () => {
    render(<Results data={null} />);
    const preElement = screen.queryByTestId('preEl');

    expect(preElement).toBeNull();
  });
});
