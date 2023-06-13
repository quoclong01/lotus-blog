import React, { useEffect, useState } from 'react';
import { IPost } from './../../../shared/interfaces/post';
import { Post } from './../../../shared/components/partials/Post';

const PostList = (props: any) => {
  const { posts } = props;
  const [postList, setPost] = useState<any>(props.posts);

  useEffect(() => {
    setPost(posts);
  }, [posts]);

  return posts.length ? (
    <ul className="post-list">
      {postList?.map((post: IPost, index: number) => {
        return <Post key={index} post={post} setPost={setPost} />;
      })}
    </ul>
  ) : (
    <p className="comment-empty">There are no more posts to show right now</p>
  );
};

export default PostList;
