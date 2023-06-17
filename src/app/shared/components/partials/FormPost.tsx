/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { TagsInput } from 'react-tag-input-component';
import { SignaturesService } from './../../../core/serivces/signatures.service';
import { PostService } from './../../../core/serivces/post.service';
import { COVER_POST_IMAGE } from '../../constants/constant';
import Loading from './Loading';
import { checkUserId } from './../../common/checkUserId';
import { Button } from './Button';
import { useToast } from '../../contexts/toast.contexts';

const signaturesService = new SignaturesService();
const postService = new PostService();
const FormPost = () => {
  const [selectedImage, setSelectedImage] = useState<string>(COVER_POST_IMAGE);
  const [tags, setTags] = useState<any>();
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cover: COVER_POST_IMAGE,
      status: false,
      title: '',
      description: '',
      content: '',
    },
  });

  useEffect(() => {
    if (id) {
      getPostById();
    }
  }, [id]);

  const getPostById = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      setLoading(true);
      postService
        .getPostsById({ id })
        .then((res: any) => {
          setIsRequestingAPI(false);
          if (checkUserId(res.user?.id)) {
            setValue('cover', res?.cover);
            setValue('title', res?.title);
            setValue('description', res?.description);
            setValue('content', res?.content);
            setValue('status', res?.status === 'public' ? false : true);
            setSelectedImage(res?.cover);
            setTags(res?.tags);
          } else {
            navigate('/');
          }
          setLoading(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          setLoading(false);
          navigate('/');
        });
    }
  };

  const onSubmitForm = (data: any) => {
    const dataPost = { ...data };
    dataPost.status = data.status ? 'private' : 'public';
    if (tags?.length) {
      dataPost.tags = tags;
    }
    if (id) {
      updatePost(id, dataPost);
    } else {
      createPost(dataPost);
    }
  };

  const updatePost = (id: string, data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .updateArticle(id, data)
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'success',
            title: 'Update post successfully.',
          });
          navigate(`/posts/${res.id}`);
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'error',
            title:
              'Error! A problem has been occurred while submitting your data.',
          });
        });
    }
  };

  const createPost = (data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .createArticle(data)
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'success',
            title: 'Create post successfully.',
          });
          navigate(`/posts/${res.id}`);
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast?.addToast({
            type: 'error',
            title:
              'Error! A problem has been occurred while submitting your data.',
          });
        });
    }
  };


  const handleChangeFile = async (e: any) => {
    const file = e.target.files[0];
    const payload = {
      type_upload: 'cover-post',
      file_name: file.name,
      file_type: file.type,
    };
    try {
      signaturesService.getSignatures(payload).then(async (data: any) => {
        setValue('cover', data.url);
        await signaturesService.uploadImage(data, file);
      });
    } catch (err) {
      toast?.addToast({
        type: 'error',
        title: 'Error! A problem has been occurred while submitting your data.',
      });
    }
    setSelectedImage(URL.createObjectURL(file));
  };

  if (loading) return <Loading />;
  return (
    <>
      <h2 className="section-title txt-center">
        {id ? 'Edit Blog' : 'Create New Blog'}
      </h2>
      <form className="form-post" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="form-post-group">
          <div className="form-post-image">
            <img src={selectedImage} alt="post cover" />
          </div>
          <div className="form-post-header">
            <div
              className={
                errors.cover
                  ? 'form-post-file form-post-error'
                  : 'form-post-file'
              }
            >
              <label htmlFor="cover">Upload file image</label>
              <input
                {...register('cover')}
                onChange={handleChangeFile}
                type="file"
                id="cover"
                className="form-post-input"
                accept="image/png, image/jpeg"
              />
            </div>
            <div className="form-post-status">
              <label htmlFor="status">
                Public
                <input
                  {...register('status')}
                  type="checkbox"
                  id="status"
                  className="form-post-checkbox"
                />
                <span className="check"></span>
              </label>
            </div>
          </div>
          <div
            className={
              errors.title ? 'form-post-item form-post-error' : 'form-post-item'
            }
          >
            <label htmlFor="title">Title</label>
            <input
              {...register('title', { required: true, minLength: 20 })}
              type="text"
              id="title"
              className="form-post-input"
            />
            {errors.title && (
              <span>Title should be at least 20 characters.</span>
            )}
          </div>
          <div
            className={
              errors.description
                ? 'form-post-item form-post-error'
                : 'form-post-item'
            }
          >
            <label htmlFor="description">Description</label>
            <textarea
              {...register('description', { required: true, minLength: 50 })}
              id="description"
              className="form-post-input"
              rows={3}
            />
            {errors.title && (
              <span>Description should be at least 50 characters.</span>
            )}
          </div>
          <div
            className={
              errors.content
                ? 'form-post-item form-post-error'
                : 'form-post-item'
            }
          >
            <label htmlFor="content">Content</label>
            <Controller
              control={control}
              name="content"
              rules={{ required: true, minLength: 100 }}
              render={({ field: { onChange, value } }) => (
                <Editor
                  value={value}
                  onEditorChange={(newText: string) => onChange(newText)}
                  init={{
                    height: 400,
                    menubar: false,
                    content_css: 'http://localhost:3000/css/tinymce.css',
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help | image code',
                  }}
                />
              )}
            />
            {errors.content && (
              <span>Content should be at least 100 characters.</span>
            )}
          </div>
          <div className="form-post-item">
            <label htmlFor="tags">Tags</label>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="Enter tags"
            />
          </div>
          <div className="form-post-footer">
            <Button
              type="submit"
              classBtn="btn btn-primary form-post-btn"
              text="Publish"
              isLoading={isRequestingAPI}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormPost;
