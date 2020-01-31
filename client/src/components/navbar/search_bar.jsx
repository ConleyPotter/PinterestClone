import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { FETCH_POSTS } from '../../graphql/queries';
import './search_bar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.update = this.update.bind(this);
  }

  update(refetch) {
    return (e) => {
      this.setState({ title: e.target.value });
      refetch();
    };
  }

  render() {
    const { title } = this.state;
    return (
      <Query query={FETCH_POSTS} variables={{ title, limit: 8 }}>
        {({
          // TODO: Error and loading handling
          // eslint-disable-next-line no-unused-vars
          loading, error, data, refetch,
        }) => (
          <div className="search-container">
            <input value={title} placeholder="Search" onChange={this.update(refetch)} />
            <div className="search-results-container">
              {title && (
                <div className="search-results">
                  {data.posts.map((post) => (
                    <Link
                      to={`/posts/${post.id}`}
                      onClick={() => this.setState({ title: '' })}
                    >
                      <div className="search-result-item">
                        <div className="search-result-item-image">
                          <img src={post.imageUrl} alt={`${post.title}`} />
                        </div>
                        <div className="search-result-game-info">
                          {post.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Query>
    );
  }
}

export default SearchBar;
