import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PostService } from '../../../core/serivces/post.service';
import { checkUserId } from '../../../shared/common/checkUserId';
import { useDialog } from '../../../shared/contexts/dialog.contexts';
import { useToast } from '../../../shared/contexts/toast.contexts';
import ButtonBookmark from '../../../shared/components/partials/ButtonBookmark';
import { Button } from '../../../shared/components/partials';

interface IPostAction {
  post: any;
  setPost?: any;
}

const postService = new PostService();
const PostAction = ({ post, setPost }: IPostAction) => {
  const ref = useRef<any>();
  const navigate = useNavigate();
  const toast = useToast();
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [showAction, setShowAction] = useState<boolean>(false);
  const dialog = useDialog();
  const location = useLocation();
  const getPath = location.pathname;
  const { t } = useTranslation();

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

  const handleDelete = (id: string) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .deletePostService(id)
        .then((res: any) => {
          if (setPost) {
            setPost((pre) => {
              return pre.filter((item) => {
                return item.id !== +id;
              });
            });
          } else {
            navigate('/posts');
          }
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'success',
            title: t('message.delete_post_success'),
          });
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
    setShowAction(false);
  };

  const handleRestore = (id: string | number) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .restorePost(id)
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'success',
            title: t('message.restore_post_success'),
          });
          navigate(`/posts/${id}`);
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'error',
            title: t('message.error'),
          });
        });
    }
  };

  const doActionPost = (action: string) => {
    dialog?.addDialog({
      title: `${action} Post`,
      content: `Are you sure you want to ${action} this post?`,
      button: {
        confirm: {
          text: action,
          customClass: action === 'delete' ? 'btn-danger' : 'btn-primary',
          confirmCallback: () =>
            action === 'delete'
              ? handleDelete(post.id)
              : handleRestore(post.id),
        },
        cancel: {
          text: 'Cancel',
          cancelCallback: () => dialog.closeDialog(),
        },
      },
    });
  };

  return (
    <>
      {checkUserId(post.userId) ? (
        getPath === '/posts/recycle-bin' ? (
          <Button
            classBtn="btn-restore"
            text={<i className="fa-solid fa-arrow-rotate-left"></i>}
            onClick={() => doActionPost('restore')}
          />
        ) : (
          <div
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
              <li className="dropdown-item">
                <Link to={`/posts/${post.id}/edit`}>
                  <i className="fa-solid fa-pen"></i>
                  {t('blog.edit')}
                </Link>
              </li>
              <li
                className="dropdown-item dropdown-item-trash"
                onClick={() => doActionPost('delete')}
              >
                <i className="fa-solid fa-trash-can"></i>
                {t('blog.delete')}
              </li>
            </ul>
          </div>
        )
      ) : (
        <ButtonBookmark post={post} />
      )}
    </>
  );
};

export default PostAction;
