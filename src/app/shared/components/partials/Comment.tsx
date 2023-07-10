import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { checkUserId } from '../../common/checkUserId';
import { formatDate } from '../../common/formatDate';
import { IComment } from '../../interfaces/comment';
import Image from '../../../../assets/images';
import { getData } from '../../../core/helpers/localstorage';
import { parseJwt } from '../../../core/helpers/parseJwt';
import { PostService } from '../../../core/serivces/post.service';
import { toast } from 'react-toastify';

interface ICommentProps {
  comment: IComment;
  setListComments: (value: any) => void;
}
const postService = new PostService();
const Comment = ({ comment, setListComments }: ICommentProps) => {
  const [showAction, setShowAction] = useState<boolean>(false);
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const ref = useRef<any>();
  const { t } = useTranslation();
  // get userId
  const token = getData('token', '');
  let userId: any;
  if (token) {
    userId = parseJwt(token).userId;
  }

  useEffect(() => {
  const checkIfClickedOutside = (e: any) => {
    if (showAction && ref.current && !ref.current.contains(e.target)) {
      setShowAction(false);
    }
  };

  document.addEventListener('mousedown', checkIfClickedOutside);
  return () => {
    document.removeEventListener('mousedown', checkIfClickedOutside);
  };
  }, [showAction]);

  const deleteComment = (id: number) => {
     if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .deleteComment(id)
        .then((res: any) => {
          if (res) {
            setListComments(prev => prev.filter(item => item.id !== id));
            toast.success(t('message.delete_comment_success'));
          }
          setIsRequestingAPI(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
    setShowAction(false);
  }
  
  return (
    <li key={comment.id} className="comment-item">
      <div className="comment-header">
        <Link
          to={
            checkUserId(comment.user?.id)
              ? `/profile/me`
              : `/profile/${comment.user?.id}`
          }
          className="comment-user"
        >
          <div className="user-avatar">
            <img
              src={comment.user?.picture || Image.Avatar}
              alt="avatar"
              onError={(e: any) => {
                e.target['onerror'] = null;
                e.target['src'] = Image.Avatar;
              }}
            />
            {comment.user?.isActive && <span className="user-active"></span>}
          </div>
          <h4 className="user-name">{comment.user?.displayName}</h4>
          <p className="user-created">· {formatDate(comment.createdAt)}</p>
        </Link>
        {comment.userId === userId && <div
          className="post-control"
          onClick={() => setShowAction(!showAction)}
        >
          <i className="fa-solid fa-ellipsis"></i>
          <ul
            className={`dropdown-menu dropdown-menu-action ${
              showAction ? '' : 'dropdown-menu-hide'
            }`}
            ref={ref}
          >
            <li
              className="dropdown-item dropdown-item-trash"
              onClick={() => deleteComment(comment.id)}
            >
              <i className="fa-solid fa-trash-can"></i>
              {t('blog.delete')}
            </li>
          </ul>
        </div>}
      </div>
      <div className="comment-content">
        <p className="comment-desc">{comment.comment}</p>
      </div>
    </li>
  );
};

export default Comment;
