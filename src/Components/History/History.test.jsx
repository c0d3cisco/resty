import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import History from '.';

describe('History component', () => {
  test('should render History component', () => {

    const historyList = [{method: 'GET', url: 'test1-test1'}, {method: 'POST', url: 'test2-test2'}];

    render(<History history={historyList}/>);
    const history = screen.getByTestId('history');
    expect(history).toBeInTheDocument();
  })
});
