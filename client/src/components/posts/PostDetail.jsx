import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Query } from 'react-apollo';
import { FETCH_POST } from '../../graphql/queries';

const PostDetail = (props) => {
  const { propPost } = props;
  const { id, imageUrl, title } = propPost;
  const image = imageUrl ? (
    <img className="post-image" src={imageUrl} alt={`${title}`} />
  ) : null;
  return (
    <Query query={FETCH_POST} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return error.message;
        const {
          author, body, date,
        } = data.post;
        const { authorUsername } = author.username;
        return (
          <Link to={`/posts/${id}`}>
            <div className="post-detail-container">
              <div className="post-detail-header">
                {title}
                {authorUsername}
                {date}
              </div>
              <div className="post-detail-body">
                {body}
                {image}
              </div>
            </div>
          </Link>
        );
      }}
    </Query>

  );
};

PostDetail.propTypes = {
  propPost: PropTypes.object.isRequired,
};

export default PostDetail;
