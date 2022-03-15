import { render } from '@testing-library/react';
import React from 'react';
import FormError from '../form-error';

describe('<FormError />', () => {
  it('renders Ok with props', () => {
    const { getByText } = render(<FormError message="test" />);
    getByText('test');
  });
});
