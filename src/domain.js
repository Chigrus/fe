export const cropImage = async (src, cropData, sizeImage, contentType, quality) => {
    const {x, y, width, height} = cropData;
    const img = new Image();
    img.src = src;
    await new Promise(resolve => {
        img.addEventListener('load', resolve, {once: true});
    });
    const canvas = document.createElement('canvas');
    canvas.width = sizeImage.width;
    canvas.height = sizeImage.height;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.drawImage(img, x, y, width, height, 0, 0, sizeImage.width, sizeImage.height);
    //document.body.appendChild(canvas);
    return new Promise(resolve => {
        canvas.toBlob(resolve, contentType, quality);
    });
};
