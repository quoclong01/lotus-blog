import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '../../contexts/toast.contexts';
import { BookmarkService } from '../../../core/serivces/bookmark.service';
import { Button } from './Button';
import withAuthChecking from '../hoc/withAuthChecking';

const bookmarkService = new BookmarkService();
const ButtonBookmark = ({ post, checkAuthBeforeAction }: any) => {
  const location = useLocation();
  const toast = useToast();
  const [isInBookmark, setIsInBookmark] = useState<boolean>(post.isInBookmark);
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);

  useEffect(() => {
    if(location.pathname.includes('/bookmarks')) {
      setIsInBookmark(true);
    }
  }, [location]);

  const addBookmark = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      bookmarkService
        .addBookmark(post.id)
        .then((res: any) => {
          setIsInBookmark(res.isInBookmark);
          if(res.isInBookmark) {
            toast?.addToast({
              type: 'success',
              title: 'Add bookmark successfully.',
            });
          } else {
            toast?.addToast({
              type: 'success',
              title: 'Remove bookmark successfully.',
            });
          }
          setIsRequestingAPI(false);
        })
        .catch((err: any) => {
          setIsRequestingAPI(false);
        });
    }
  };

  const handleBookmark = () => {
    checkAuthBeforeAction(() => addBookmark());
  };

  return (
    <Button
      classBtn="btn-bookmark"
      onClick={handleBookmark}
      text={
        <i
          className={
            isInBookmark
              ? 'fa-solid fa-bookmark btn-bookmark-active'
              : 'fa-regular fa-bookmark'
          }
        ></i>
      }
    />
  );
};

export default withAuthChecking(ButtonBookmark);
