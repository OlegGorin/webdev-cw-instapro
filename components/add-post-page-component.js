import { POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
// import { posts, goToPage } from "../index.js";
import { goToPage } from "../index.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { sanitize } from "../helpers.js";

// export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
export function renderAddPostPageComponent({ appEl, posts, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>

        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container">
              <div class="upload=image">
                <label class="file-upload-label secondary-button">
                  <input type="file" class="file-upload-input" style="display:none">
                  " Выберите фото "
                </label>
              </div>
            </div>
            <label>
              " Опишите фотографию: "
              <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
          </div>
        </div>
    </div>
  `;
    // Cтраница добавления поста

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        if (!newImageUrl.trim()) {
          alert("Загрузите фото");
          return;
        } else {
          imageUrl = newImageUrl.trim();
        }
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      if (!document.querySelector(".input").value.trim()) {
        alert("Заполните описание фото");
        return;
      }

      onAddPostClick({
        description: sanitize(document.querySelector(".input").value.trim()),
        imageUrl: imageUrl,
      });
    });
  };

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  render();
}
