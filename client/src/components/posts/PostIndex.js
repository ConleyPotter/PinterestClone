/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react';
import { Query } from 'react-apollo';
import * as Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import PostDetail from './PostDetail';

import { FETCH_POSTS } from '../../graphql/queries';

import './post_index.scss';

const PostIndex = () => (
  <Query query={FETCH_POSTS}>
    {({ loading, data, error }) => {
      if (loading) return <h1>Loading...</h1>;
      if (error) return <h1>{error}</h1>;
      console.log(data);
      return (
        <ul className="post-index-container grid" id="grid">
          <div className="grid-sizer" />
          {data.posts.map((post, i) => (
            <PostDetail propPost={post} key={i} />
          ))}
        </ul>
      );
    }}
  </Query>
);

const grid = document.querySelector('.grid');

const msnry = new Masonry(grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
});

imagesLoaded(grid).on('progress', () => {
  msnry.layout();
});

export default PostIndex;
