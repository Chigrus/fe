export const addPost = async (data, params) => {
    const response = await fetch('/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data, params
        }),
    });
    const result = await response.json();
    return result.id;
};

export const savePost = async (data) => {
    await fetch('/saveposts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data,
        }),
    });
};

export const uploadImage = async (contentType, blob) => {
    const response = await fetch('/uploadimage', {
        method: 'PUT',
        headers: {
            'Content-Type': contentType
        },
        body: blob,
    });
    const result = await response.json();
    return result.url;
}

export const savePostJson = async (post, params) => {
    await fetch('/savepostjson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post, params,
        }),
    });
};