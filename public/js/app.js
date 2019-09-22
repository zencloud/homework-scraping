// Scraping App front-end JS

// App Start
// Load Articles and Load Saved Articles
app_load_articles();
app_load_saved_articles();

function app_load_articles() {
    $.getJSON("/articles", function (packageData) {
        packageData.forEach((articleData) => {
            let myHTML = `
            <div class="article-container">
                <div>
                    <p>${articleData.title}</p>
                </div>
                <div>
                    <button onclick="app_article_save('${articleData._id}')">Save</button>
                </div>
            </div>
            <hr>`;
            $('#article-list').append(myHTML);
        });
    });
}

function app_load_saved_articles() {

    $.getJSON("/saved", function (packageData) {
        packageData.forEach((articleData) => {
        
            let commentText = "";

            if (typeof articleData.comment === "undefined") {
                commentText = "Add your own comment";
            } else {
                commentText = articleData.comment.commentBody
            }

            let myHTML = `
            <div class="article-container">
                <div>
                    <p>${articleData.title}</p>
                    <div class="saved-cell">
                        <textarea id="data-comment-${articleData._id}">${commentText}</textarea>
                        <button onclick="app_comment_save('${articleData._id}')">Comment</button>
                    </div>
                </div>
                <div>
                    <button onclick="app_article_unsave('${articleData._id}')">Delete</button>
                </div>
            </div>
            <hr>`;
            $('#saved-list').append(myHTML);
        });
    });
}

$(document).ready(function () {
    $('#toggle-saved').click(function () {
        $("#saved-list").slideToggle(300);
        $(this).text(function (i, text) {
            return text === "Hide Saved" ? "Show Saved" : "Hide Saved";
        });
    });
});

function app_comment_save(id) {

    console.log(id);
    let commentText = $('#data-comment-' + id).val();
    let postPackage = {
        commentBody: commentText
    }

    $.ajax({    
        method: "POST",
        url: `/comment/save/${id}`,
        data: postPackage
    })
    .then((data) => {
        console.log(data);
    });
}

function app_article_save(id) {

    $.ajax({
        method: "POST",
        url: `/save/${id}`
    })
    .then(function (data) {
        console.log(data);
    });
}

function app_article_unsave(id) {
    console.log('started...');
    $.ajax({
        method: "POST",
        url: `/unsave/${id}`
    })
        .done(function (data) {
            console.log('finished');
            $('#saved-list').empty();
            app_load_saved_articles();
        });
}