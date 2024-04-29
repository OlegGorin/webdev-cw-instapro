import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
  <div class="upload=image">
      ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
  </div>
`;

    const fileInputElement = element.querySelector(".file-upload-input");

    // const validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".tiff" ];
    const validFileExtensions = [".jpg", ".jpeg", ".gif" ];

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];

      if (file) {
        let sFileSize = file.size;
        let sFileName = file.name;

        if (sFileSize > 0) {
          if (sFileName.length > 0) {
            let extensionValid = false;
            for (let j = 0; j < validFileExtensions.length; j++) {
              let sCurExtension = validFileExtensions[j];
              if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length)
                 .toLowerCase() === sCurExtension.toLowerCase()) { 
                extensionValid = true;
                break;
              }
            }

            if (!extensionValid) {
              alert("Извините, файл " + "'" + sFileName + "'" + " имеет неправильный формат, допустимые расширения: " + validFileExtensions.join(", "));
              return;
            }
          }
        } else {
          alert("Извините, файл " + "'" + sFileName + "'" + " пустой, выберите, пожалуйста, другой файл");
          return;
        }

        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          onImageUrlChange(imageUrl);
          render();
        });
      }
    });

    element
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render();
      });
  };

  render();
}
