// Scraping App front-end JS

$.getJSON("/articles", function (packageData) {
    packageData.forEach( (articleData) => {
        let myHTML = `
            <div>
                <p>${articleData.title}</p>
                <button onclick="app_article_save('${articleData._id}')">Save</button>
                <button>Comment</button>
            </div>`;
        $('#article-list').append(myHTML);
    });
});


$.getJSON("/saved", function (packageData) {
    packageData.forEach( (articleData) => {
        let myHTML = `
            <div>
                <p>${articleData.title}</p>
                <button onclick="app_article_save('${articleData._id}')">Delete</button>
                <button>Comment</button> 
            </div>`;
        $('#saved-list').append(myHTML);
    });
});

$(document).ready(function() {
    $('#toggle-saved').click(function() {
        $("#saved-list").slideToggle(300);
        $(this).text(function(i, text) {
            return text === "Hide Saved" ? "Show Saved" : "Hide Saved";
        });
    });
})

function app_article_save(id) {
    $.ajax({
        method: "POST",
        url: `/save/${id}`
    })
    .then(function (data) {
        console.log(data);
    });
}