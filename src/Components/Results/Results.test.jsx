import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '.';

describe('Results Component', () => {
  test('renders the data when data prop is provided', () => {
    const data = { key: 'value'};
    const loading = false;

    render(<Results data={data} loading={loading} />);
    const preElement = screen.getByTestId('preEl');

    expect(preElement).toBeInTheDocument();
    expect(preElement).toHaveTextContent('{1 items"key":string"value"}');
  });

  test('renders "loading"', () => {
    const loading = true;

    render(<Results loading={loading} />);
    const preElement = screen.getByTestId('preEl');

    expect(preElement).toBeInTheDocument();
    expect(preElement).toHaveTextContent('Loading');
  });

  test('renders nothing when data prop is null', () => {
    render(<Results data={null} />);
    const preElement = screen.queryByTestId('preEl');

    expect(preElement).toBeNull();
  });
});
