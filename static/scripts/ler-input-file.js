function lerImagem(input, callback) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = callback;
        reader.readAsDataURL(input.files[0]);
    };
};