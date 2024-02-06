export const renderImage = url => url ? URL.createObjectURL(url) : "";

export const handleFile = ({target: {files}}) => {
    if (files.length) {
        const allowed = ["png", "jpg", "jpeg", "webp"]

        if (!allowed.includes(files[0].type.split("/")[1])) {
            return false;
        }

        return files[0];
    }
}