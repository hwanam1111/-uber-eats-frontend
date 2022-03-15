import { render } from '@testing-library/react';
import React from 'react';
import Button from '../button';

describe('<Button />', () => {
  it('should render Ok with props', () => {
    const { getByText } = render(
      <Button loading={false} canClick actionText="test" />,
    );
    getByText('test');
  });

  it('should display loading', () => {
    const { getByText, container } = render(
      <Button loading canClick={false} actionText="test" />,
    );
    getByText('Loading...');
    expect(container.firstChild).toHaveClass('bg-gray-300 pointer-events-none');
  });
});
