console.log("komal");
const apikey = "85d706a9414f431c9f19c67fcaf02b7c";

let blogContainer = document.getElementById("blog-container");

async function fetchRandomApi() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

function displayBlock(articles) {
    blogContainer.innerHTML = "";  // Clear previous content
    articles.forEach(article => {  // Corrected: use articles.forEach
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomApi();
        if (articles.length > 0) {
            displayBlock(articles);
        } else {
            console.log("No articles found.");
        }
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
})();
