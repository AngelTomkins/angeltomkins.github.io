window.onload = function() {

    fetch("blog/blogs.json")
    .then(response => response.json())
    .then(posts => {
        document.getElementById("card-title-1").textContent = posts[0].title;
        document.getElementById("card-details-1").textContent = formatUnixTimestamp(posts[0].date);
        document.getElementById("card-body-1").textContent = posts[0].content.substring(0, 128) + " ...";


        document.getElementById("card-title-2").textContent = posts[1].title;
        document.getElementById("card-details-2").textContent = formatUnixTimestamp(posts[1].date);
        document.getElementById("card-body-2").textContent = posts[1].content.substring(0, 128) + " ...";

    })
    .catch(error => {
        console.error("Error loading blog posts:", error);
    });

}
