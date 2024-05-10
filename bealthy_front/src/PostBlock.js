// PostBlock.js
import React from 'react';

const PostBlock = ({ post }) => {
  return (
    <div className="post-block">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
}

export default PostBlock;