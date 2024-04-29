import { getPosts, getUserPosts, toggleLike, deletePost } from "./api.js";
import { AUTH_PAGE, POSTS_PAGE } from "./routes.js";
import { getToken, goToPage, renderApp, id } from "./index.js";

function getPage(page) {
  if (page === POSTS_PAGE) {
    return getPosts({ token: getToken() });
  } else {
    return getUserPosts(id, { token: getToken() });
  }
}

export function likePost({ likeId, doLike, page, posts }) {
  toggleLike({ token: getToken() }, likeId, doLike)
    .then(() => {
      getPage(page).then((newPosts) => {
        page = POSTS_PAGE;
        posts = newPosts;
        renderApp({ posts });
      });
    })
    .catch((error) => {
      alert(error.message);
      goToPage(AUTH_PAGE);
    });
}

export function delPost({ delId, page, posts }) {
  deletePost({ token: getToken() }, delId).then(() => {
    getPage(page)
      .then((newPosts) => {
        page = POSTS_PAGE;
        posts = newPosts;
        renderApp({ posts });
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Сервер недоступен") {
          alert("Сервер недоступен, попробуйте позже");
        }
        goToPage(POSTS_PAGE);
      });
  });
}
