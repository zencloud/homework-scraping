// Scraping App front-end JS

$.getJSON("/articles", function (packageData) {
    packageData.forEach( (articleData) => {
        console.log(articleData);

        let myHTML = `
            <div>
                <p>${articleData.title}</p>
                <button onclick="app_article_save('${articleData._id}')">Save</button>
            </div>`;
        $('#article-list').append(myHTML);
    });
});



function app_article_save(id) {

    console.log(id);
    $.ajax({
        method: "POST",
        url: `/save/${id}`
    })
    .then(function (data) {
        console.log(data);
    });
}