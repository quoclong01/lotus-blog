import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app.reducers';
import { Button } from '../../../shared/components/partials';
import withAuthChecking from './../../../shared/components/hoc/withAuthChecking';
import { PostService } from '../../../core/serivces/post.service';

const postService = new PostService();
const FormComment = ({
  postId,
  setListComments,
  checkAuthBeforeAction,
}: any) => {
  const userInfo = useSelector((state: RootState) => state.users);
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    if (data.content.trim()) {
      checkAuthBeforeAction(() => postCommentPost(data));
    } else {
      setError('content', { message: 'Please type comment' });
    }
  };

  const postCommentPost = (data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .postCommentPostsDetail(postId, data)
        .then((res: any) => {
          const newComment = {
            ...res,
            user: { ...userInfo.data, ...{ isActive: true, isAdmin: true } },
          };
          setListComments((pre) => [newComment, ...pre]);
          setValue('content', '');
          setIsRequestingAPI(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
  };

  return (
    <form className="form-comment" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="comment-input form-control"
        placeholder="Write a comment"
        {...register('content', {
          required: true,
          maxLength: 800,
        })}
      />
      {errors.content && (
        <div className="error-box error-comment">
          <span className="txt-center txt-error">Please type comment</span>
        </div>
      )}
      <Button
        classBtn="btn btn-primary btn-comment"
        text="Comment"
        isLoading={isRequestingAPI}
      />
    </form>
  );
};

export default withAuthChecking(FormComment);
