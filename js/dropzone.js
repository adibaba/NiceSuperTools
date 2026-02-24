function createDropzone(dropzoneElement, outputElement) {

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    function handleFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;

            if (
                outputElement instanceof HTMLTextAreaElement ||
                outputElement instanceof HTMLInputElement
            ) {
                outputElement.value = content;
            } else {
                outputElement.textContent = content;
            }
        };

        reader.readAsText(file);
    }

    dropzoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneElement.classList.add('dragover');
    });

    dropzoneElement.addEventListener('dragleave', () => {
        dropzoneElement.classList.remove('dragover');
    });

    dropzoneElement.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneElement.classList.remove('dragover');

        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    dropzoneElement.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        handleFile(file);
        fileInput.value = '';
    });
}