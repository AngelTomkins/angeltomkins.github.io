function formatUnixTimestamp(unixTimeStamp) {
    const date = new Date(unixTimeStamp * 1000); // Convert seconds to milliseconds
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
}

function numArticles() {
    return new Promise((resolve, reject) => {
        fetch("blogs.json")
        .then(response => response.json())
        .then(posts => {
            resolve(posts.length);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function searchArticleByTitle(title) {

    return new Promise((resolve, reject) => {
        if (title == "") { resolve(-1); }

        fetch("blogs.json")
        .then(response => response.json())
        .then(posts => {
            title = title.replaceAll("-", " ").toLowerCase();
            console.log(title);
            for (let i = 0; i < posts.length; i++) {
                let post = posts[i];
                if (post.title.toLowerCase() == title) {
                    resolve(i);
                }
            }
            resolve(-1);
        })
        .catch(error => {
            reject(error);
        });
    });

}
