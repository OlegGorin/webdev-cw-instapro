import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, page, likePost, id, delPost } from "../index.js";
import { user } from "../index.js";
import { formatDistance } from "date-fns";
// // Require Russian locale
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);
  if (user) {
    console.log(user, user._id);
  }

  let postsHTML = posts
    .map((post) => {
      return `
        <li class="post">
        ${
          page != USER_POSTS_PAGE
            ? `<div class="post-header" data-user-id=${post.user.id}>
            <img src=${post.user.imageUrl} class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
          </div>`
            : ""
        }
          <div class="post-image-container">
            <img class="post-image" src=${post.imageUrl}>
          </div>
          <div class="post-likes">
            <button data-post-id=${post.id} data-post-liked="${
        post.isLiked
      }" class="like-button">

            ${
              post.isLiked
                ? `<img src="./assets/images/like-active.svg"></img>`
                : `<img src="./assets/images/like-not-active.svg"></img>`
            }

            </button>
            <p class="post-likes-text">
              Нравится: <strong>

              ${
                post.likes.length === 0
                  ? 0
                  : post.likes.length === 1
                  ? post.likes[0].name
                  : post.likes[post.likes.length - 1].name +
                    " и ещё " +
                    (post.likes.length - 1)
              }

              </strong>
            </p>
           </div>
           <div class="footer">
            <div>
              <p class="post-text">
                <span class="user-name">            
                ${post.user.name}
                </span>
                ${post.description}
              </p>
              <p class="post-date">
                ${formatDistance(new Date(), new Date(post.createdAt), {
                  locale: ru,
                })} назад
              </p>
            </div>  
            <div>
            ${
              user
                ? user._id === post.user.id
                  ? `<button data-id=${post.id} class="button">
                <div title="Удалить пост"></div>
                Удалить</button>`
                  : `<button data-id=${post.id} class="button-nonactive">
                <div title="Вы можете удалить пост, созданный Вами"</div>
                Удалить</button>`
                : ""
            }
            </div>
          </div>
        </li>`;
    })
    .join("");

  console.log(posts);

  // ${formatDistance(new Date(), new Date(post.createdAt), {
  //           locale: ru,
  //         })} назад

  let userPosts = posts.map((post) => post);

  let idUser = userPosts[0].user.id;
  let nameUser = userPosts[0].user.name;
  let imageUser = userPosts[0].user.imageUrl;

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
      <li class="post">
      ${
        page === USER_POSTS_PAGE
          ? `<div class="posts-user-header" data-user-id=${idUser}>
          <img src=${imageUser} class="posts-user-header__user-image">
          <p class="posts-user-header__user-name">${nameUser}</p>
        </div>`
          : ""
      }

        ${postsHTML}
        </li>
      </ul>
    </div>`;

  appEl.innerHTML = appHtml;

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let like of document.querySelectorAll(".like-button")) {
    like.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(like.dataset);
      let likeId = like.dataset.postId;
      let likeIsLiked = like.dataset.postLiked;
      let doLike = "";
      if (likeIsLiked === "false") {
        doLike = "like";
      } else {
        doLike = "dislike";
      }
      console.log(likeId, doLike);
      likePost(likeId, doLike, page);
    });
  }

  for (let del of document.querySelectorAll(".button")) {
    del.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(del.dataset);
      let delId = del.dataset.id;
      delPost(delId, page);
    });
  }
}
