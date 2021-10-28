import { APIUrls } from '../helpers/urls';
import { UPDATE_POSTS } from './actionType';

export function fetechPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts(); //this urls coming from helper urls
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
