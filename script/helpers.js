export const createListener = (tagId, event, callBack) => {
    const tag = document.getElementById(tagId);
    tag.addEventListener(event, callBack);
}
