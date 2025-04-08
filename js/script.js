console.log("komal");
const apikey = "85d706a9414f431c9f19c67fcaf02b7c";

let blogContainer = document.getElementById("blog-container");

// Helper function to limit the number of words in a text
function limitWords(text, wordLimit) {
    const words = text.split(" ");  // Split the text by spaces into an array of words
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";  // Limit the words and add "..."
    }
    return text;  // Return the original text if it's within the word limit
}

// Fetch news articles from the API
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

// Display the articles on the page
function displayBlock(articles) {
    blogContainer.innerHTML = "";  // Clear previous content
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = limitWords(article.title, 5);  // Limit title to 10 words

        const description = document.createElement("p");
        description.textContent = limitWords(article.description, 10);  // Limit description to 30 words

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

// IIFE to fetch and display the articles
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
