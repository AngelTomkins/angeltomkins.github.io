window.onload = function() {
    const postContainer = document.querySelector(".post-container");
    const loadArticleButton = document.querySelector(".load-article-btn");

    // Current article
    let index = 1;
    // Number of articles
    var ArticlesLength = -1;
    numArticles().then(length => { ArticlesLength = length; });

    loadArticleButton.onclick = function () {
        if (index < ArticlesLength-1) {
            loadArticle(index, postContainer);
            index += 1;
        } else {
            loadArticle(index, postContainer);
            loadArticleButton.style.display = 'none';
        }
    }

    const articleTitle = window.location.hash.slice(1);
    searchArticleByTitle(articleTitle).then(_id => {
        if (_id == -1) {
            _id = 0;
        } else {
            loadArticleButton.style.display = 'none';
        }
        loadArticle(_id, postContainer);
    });

}


// id index starts at zero
function loadArticle(id, postContainer) {

    fetch("blogs.json")
    .then(response => response.json())
    .then(posts => {
        const post = posts[id];
        const postElement = document.createElement("article");
        postElement.classList.add("post");

        const hgroupElement = document.createElement("hgroup");
        postElement.appendChild(hgroupElement);

        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title;
        hgroupElement.appendChild(titleElement);

        const dateElement = document.createElement("h3");
        dateElement.textContent = formatUnixTimestamp(post.date);
        hgroupElement.appendChild(dateElement);

        const paragraphs = post.content.split("\n\n");
        for (let j = 0; j < paragraphs.length; j++) {
            const paragraphElement = document.createElement("p");
            paragraphElement.textContent = paragraphs[j];
            postElement.appendChild(paragraphElement)

        }

        postContainer.appendChild(postElement);
    })
    .catch(error => {
        console.error("Error loading blog posts:", error);
    });
}


/*
    fetch("blogs.json")
    .then(response => response.json())
    .then(posts => {
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const postElement = document.createElement("article");
            postElement.classList.add("post");

            const hgroupElement = document.createElement("hgroup");
            postElement.appendChild(hgroupElement);

            const titleElement = document.createElement("h2");
            titleElement.textContent = post.title;
            hgroupElement.appendChild(titleElement);

            const dateElement = document.createElement("h3");
            dateElement.textContent = formatUnixTimestamp(post.date);
            hgroupElement.appendChild(dateElement);

            const paragraphs = post.content.split("\n\n");
            for (let j = 0; j < paragraphs.length; j++) {
                const paragraphElement = document.createElement("p");
                paragraphElement.textContent = paragraphs[j];
                postElement.appendChild(paragraphElement)

            }

            postContainer.appendChild(postElement);
        }
    })
    .catch(error => {
        console.error("Error loading blog posts:", error);
    });

    */
