document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('#loader');

    let imagesPreview = function (input, placeToInsertImagePreview) {
        let filesAmount = input.files.length;
        for (i = 0; i < filesAmount; i++) {
                placeToInsertImagePreview.innerHTML = '';

                let reader = new FileReader();

                reader.addEventListener('load', function(evt) {
                    const preview = document.createElement('img');
                    preview.src = this.result;
                    placeToInsertImagePreview.appendChild(preview)
                })

                reader.readAsDataURL(input.files[i]);
        }
    }

    const fileInput = document.querySelector('#input-files');
    const imgPreview = document.querySelector('div.preview-images');

    fileInput.addEventListener('change', 
        function() {
            imagesPreview(this, imgPreview);
        }
    );
    imagesPreview(fileInput, imgPreview);

    loader.classList.remove('loader-hide');
    let imageList = document.querySelector('#image-list');

    fetch('/images')
        .then(res => res.json())
        .then(json => {
            loader.classList.add('loader-hide');

            for (let image of json) 
            imageList.appendChild(buildImageThumbnail(image));
        });
});

const buildImageThumbnail = image => {
    const baseURL = '/assets/uploads/';
    const svgHTML = `
        <svg viewBox="0 -960 960 960" width="68%">
            <path
                fill="rgb(200, 0, 0)"
                d="M280-120q-33 
                0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 
                33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 
                0h80v-360h-80v360ZM280-720v520-520Z" 
            />
        </svg>`;

    const newDiv = document.createElement('div');
    newDiv.classList.add('thumbnail-container');

    const img = document.createElement('img');
    img.src = `${baseURL}${image.name}`;
    img.classList.add('thumbnail');

    newDiv.appendChild(img);

    const newForm = document.createElement('form');
    newForm.classList.add('form-delete');
    newForm.action = '';

    const newBtn = document.createElement('button');
    newBtn.classList.add('btn-delete');
    newBtn.type = 'submit';
    newBtn.innerHTML = svgHTML;

    newForm.appendChild(newBtn);
    newDiv.appendChild(newForm);

    return newDiv;
};