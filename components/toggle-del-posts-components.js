import {
  getPosts,
  getUserPosts,
  toggleLike,
  deletePost,
} from "../api.js";
import { AUTH_PAGE, POSTS_PAGE } from "../routes.js";
import { getToken, goToPage, posts, renderApp } from "../index.js";

export const likePost = (likeId, doLike, page) => {
  const appEl = document.getElementById("app");
  console.log(likeId, doLike);
  toggleLike({ token: getToken() }, likeId, doLike)
    .then(() => {
      getPage(page)
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    })
    .catch((error) => {
      alert(error.message);
      goToPage(AUTH_PAGE);
    });
};

const getPage = (page) => {
  if (page === POSTS_PAGE) {
    return getPosts({ token: getToken() });
  } else {
    return getUserPosts(id, { token: getToken() });
  }
};

export const delPost = (delId, page) => {
  const appEl = document.getElementById("app");
  console.log(delId);
  deletePost({ token: getToken() }, delId).then(() => {
    getPage(page)
      .then((newPosts) => {
        page = POSTS_PAGE;
        posts = newPosts;
        renderApp();
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Сервер недоступен") {
          alert("Сервер недоступен, попробуйте позже");
        }
        goToPage(POSTS_PAGE);
      });
  });
};
