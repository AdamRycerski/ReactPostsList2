import { postsApi } from '../PostsAPI';
import { displayError } from './displayedError';

export const FETCH_POSTS = 'FETCH_POST';
export function fetchPosts(dispatch) {
  postsApi.fetchPosts().then(
    posts => dispatch(receivePosts(posts)),
    status => {
      dispatch(invalidatePosts(status));
      dispatch(displayError({ message: 'Encountered error fetching post' }));
    },
  );

  return {
    type: FETCH_POSTS,
    payload: {},
  };
}

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export function invalidatePosts() {
  return {
    type: INVALIDATE_POSTS,
    payload: {},
  };
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      posts
    },
  };
}

export const ADD_POST = "ADD_POST";
export function addPost(post, dispatch) {
  postsApi.addPost(post).then(
    res => dispatch(receivePost({ ...post, ...res })),
    status => {
      dispatch(invalidatePost(status));
      dispatch(displayError({ message: 'Encountered error adding post.' }));
    },
  );

  return {
    type: ADD_POST,
    payload: {},
  };
}

export const UPDATE_POST = "UPDATE_POST";
export function updatePost(post, dispatch) {
  postsApi.updatePost(post.id, post).then(
    res => dispatch(receivePost({ ...post, ...res })),
    status => {
      dispatch(invalidatePost(status));
      dispatch(displayError({ message: 'Encountered error updating post.' }));
    },
  );

  return {
    type: UPDATE_POST,
    payload: {},
  };
}

export const RECEIVE_POST = 'RECEIVE_POST';
export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    payload: {
      post: post,
    },
  };
}

export const INVALIDATE_POST = 'INVALIDATE_POST';
export function invalidatePost() {
  return {
    type: INVALIDATE_POST,
    payload: {},
  };
}

export const REQUEST_POST_DELETE = "REQUEST_POST_DELETE";
export function requestPostDelete(id, dispatch) {
  postsApi.deletePost(id).then(
    () => dispatch(deletePost(id)),
    () => {
      dispatch(invalidatePostDelete());
      dispatch(displayError({ message: 'Encountered error deleting post.' }));
    },
  );

  return {
    type: REQUEST_POST_DELETE,
    payload: {},
  }
}

export const DELETE_POST = 'DELETE_POST';
export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: {
      id
    },
  };
}

export const INVALIDATE_POST_DELETE = 'INVALIDATE_POST_DELETE';
export function invalidatePostDelete() {
  return {
    type: INVALIDATE_POST_DELETE,
    payload: {},
  };
}
