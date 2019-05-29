// 检测是否支持 webp
// 参考 https://davidwalsh.name/detect-webp
const supportsWebp = ({ createImageBitmap, Image }) => {
    if (!createImageBitmap || !Image) return Promise.resolve(false);

    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            createImageBitmap(image)
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        };
        image.onerror = () => {
            resolve(false);
        };
        image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    });
};

export const webpIsSupported = () => {
    let memo = null;
    return () => {
        if (!memo) {
            memo = supportsWebp(window);
        }
        return memo;
    };
};
