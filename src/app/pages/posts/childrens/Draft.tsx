import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostService } from '../../../core/serivces/post.service';
import PostList from '../partials/PostList';
import SekeletonPost from '../../../shared/components/partials/SekeletonPost';

const postService = new PostService();
const Draft = () => {
  const { t } = useTranslation();
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const getPostsDraft = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .getPostsDraft(page, 5)
        .then((res: any) => {
          setIsRequestingAPI(false);
          setPosts([...posts, ...res]);
          setLoadMore(res.loadMore);
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
        });
    }
  };

  useEffect(() => {
    if (!isRequestingAPI && loadMore) {
      window.addEventListener('scroll', handleScroll);
    }
  }, [isRequestingAPI, loadMore]);

  const handleScroll = (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight
    ) {
      window.removeEventListener('scroll', handleScroll);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getPostsDraft();
  }, [page]);

  return (
    <main className="main-content">
      <h2 className="section-title txt-center">{ t('common.header.draft') }</h2>
      {isRequestingAPI ? <SekeletonPost /> : <PostList posts={posts} />}
    </main>
  );
};

export default Draft;
