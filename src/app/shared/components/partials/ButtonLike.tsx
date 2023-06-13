import React, { useState } from 'react';
import withAuthChecking from '../hoc/withAuthChecking';
import { PostService } from '../../../core/serivces/post.service';

const postService = new PostService();
const ButtonLike = ({ post, checkAuthBeforeAction }: any) => {
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [like, setLike] = useState(+post.likes || 0);

  const putLikePostDetail = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .likePostsDetail(post.id)
        .then((res: any) => {
          setIsRequestingAPI(false);
          setIsLiked(res.liked);
          res.liked ? setLike(like + 1) : setLike(like - 1);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
  };

  const handleLike = () => {
    checkAuthBeforeAction(() => putLikePostDetail());
  };

  return (
    <div className="interact-like">
      <i
        className={
          isLiked ? 'fa-solid fa-thumbs-up fa-liked' : 'fa-regular fa-thumbs-up'
        }
        onClick={handleLike}
      ></i>
      {like}
    </div>
  );
};

export default withAuthChecking(ButtonLike);
