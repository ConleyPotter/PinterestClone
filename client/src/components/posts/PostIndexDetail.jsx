import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './post_index_detail.scss';

class PostIndexDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoButton: undefined,
    };

    this.updateHoverState = this.updateHoverState.bind(this);
  }

  updateHoverState(hover) {
    const { propPost } = this.props;
    const { date, author } = propPost;
    // const { username } = author;
    this.setState({
      infoButton: (hover
        ? (
          <div className="info">
            <div>{date}</div>
            {/* <div>{username}</div> */}
          </div>
        ) : null),
    });
  }

  render() {
    const { propPost } = this.props;
    const {
      id, imageUrl, title,
    } = propPost;

    const { infoButton } = this.state;

    const image = imageUrl ? (
      <img
        className="post-image"
        src={imageUrl}
        alt={`${title}`}
        onMouseOver={() => this.updateHoverState(true)}
        onFocus={() => this.updateHoverState(true)}
        onMouseOut={() => this.updateHoverState(false)}
        onBlur={() => this.updateHoverState(false)}
      />
    ) : null;

    return (
      <Link to={`/posts/${id}`} className="post-index-detail-container grid-item">
        {image}
        {infoButton}
      </Link>
    );
  }
}

PostIndexDetail.propTypes = {
  propPost: PropTypes.object.isRequired,
};

export default PostIndexDetail;
