import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPost } from './../../../shared/interfaces/post';
import { Post } from './../../../shared/components/partials/Post';

const PostList = (props: any) => {
  const { t } = useTranslation();
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
    <p className="comment-empty">{t('message.comment_empty')}</p>
  );
};

export default PostList;
