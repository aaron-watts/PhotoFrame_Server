document.addEventListener('DOMContentLoaded', () => {
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

    fileInput.addEventListener('change', 
        function() {
            imagesPreview(this, document.querySelector('div.preview-images'));
        }
    );


    let imageList = document.querySelector('#image-list');

    fetch('/images')
        .then(res => res.json())
        .then(json => {
            for (let image of json) {
                const baseURL = '/assets/uploads/';

                const newLi = document.createElement('li');
                const img = document.createElement('img');
                img.src = `${baseURL}${image.name}`;
                img.classList.add('thumbnail');

                newLi.appendChild(img);
                imageList.appendChild(newLi);
            }
        });
});