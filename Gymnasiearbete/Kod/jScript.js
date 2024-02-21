var menuAppear = 0;
let jsonData;
let searchList = document.getElementById("searchResult");
let id;


function sideMenu(){
    menuAppear ++;
    if(menuAppear === 1){
        document.getElementById("sideMenu").style.width = "300px";
    } else if(menuAppear === 2){
        document.getElementById("sideMenu").style.width = "0";
        menuAppear = 0;
    }
}

function getInfo(){
    return fetch('articles.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem fetching or parsing the data:', error);
    });
}



function getArticleIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

 function searchFunction(){
    getInfo().then(jsonData => {
    console.log(jsonData);
    for (let i = 0; i < jsonData.length; i++) {
        const article = jsonData[i];
        for (let j = 0; j < article.keyWords.length; j++) {
            const keyword = article.keyWords[j].toLowerCase();
            if (keyword === document.getElementById("barSearch").value) {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.textContent = article.title;
                link.href = `./article.html?id=${article.id}`;
                listItem.appendChild(link);
                document.getElementById("searchResult").appendChild(listItem);
            }
        }
    }
 });
} 
 
 window.onload = function() {
    displayArticle();
};

function displayArticle(){
    const articleId = getArticleIdFromURL();
    if (!articleId) {
        console.error('Article ID not found in URL');
        return;
    }

    getInfo().then(jsonData => {
        const article = jsonData.find(article => article.id === parseInt(articleId));
        if (!article) {
            console.error('Article not found');
            return;
        }

        console.log(article);

        document.getElementById("articleTitle").textContent = article.title;
        document.getElementById("articleText").innerHTML = article.text.join("<br><br>");
    }).catch(error => {
        console.error('Error fetching article data:', error);
    });
}

    