import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Restaurant from '../restaurant';

describe('<Restaurant />', () => {
  it('renders Ok with props', () => {
    const { getByText, container } = render(
      <Router>
        <Restaurant
          restaurantId={1}
          coverImage="imgSrc"
          restaurantName="테스트레스토랑"
          categoryName="테스트카테고리"
        />
        ,
      </Router>,
    );
    getByText('테스트레스토랑');
    getByText('테스트카테고리');
    expect(container.firstChild).toHaveAttribute('href', '/restaurants/1');
  });
});
