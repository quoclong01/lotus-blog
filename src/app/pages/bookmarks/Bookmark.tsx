import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookmarkService } from '../../core/serivces/bookmark.service';
import SekeletonPost from '../../shared/components/partials/SekeletonPost';
import PostList from '../posts/partials/PostList';

const bookmarkService = new BookmarkService();
const Bookmark = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<any>([]);
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);

  const getBookmark = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      bookmarkService
        .getBookmark()
        .then((res: any) => {
          setIsRequestingAPI(false);
          res.forEach((item: any) => {
            if (item.post) {
              setPosts((prev: any) => [...prev, item.post]);
            }
          });
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <main className="main-content">
      <h2 className="section-title txt-center">{ t('common.header.my_bookmarks') }</h2>
      {isRequestingAPI ? <SekeletonPost /> : <PostList posts={posts} />}
    </main>
  );
};

export default Bookmark;
