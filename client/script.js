function generateHome(search_term) {

    var url = 'http://127.0.0.1:5000/recipe';
    var obj = ""

    var request = new XMLHttpRequest();

    request.onload = dumpResponse;
    // Initialize a request
    request.open('get', url)
    // Send it
    request.send()

    function dumpResponse() {
        // `this` will refer to the `XMLHTTPRequest` object that executes this function
        obj = JSON.parse(this.responseText);
        console.log(obj);
    }

    //    $.getJSON(url, function (data) {
    //        console.log(data);
    //    });

    let featured_container = document.getElementById("featured_container");

    let count = 0;
    let previews = `<div class="row">`;

    for (i = 0; i < 6; i++) {


        if (count < 3) {
            previews = previews + `<div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap">
                            <title>Placeholder</title>
                            <rect fill="#868e96" width="100%" height="100%"></rect><text fill="#dee2e6" dy=".3em" x="50%" y="50%">Image cap</text>
                        </svg>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="search-results.html" class="btn btn-secondary">Go somewhere</a>
                        </div>
                    </div>
                </div>`;

        } else {
            previews = previews + `</div><div class="row"><div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap">
                            <title>Placeholder</title>
                            <rect fill="#868e96" width="100%" height="100%"></rect><text fill="#dee2e6" dy=".3em" x="50%" y="50%">Image cap</text>
                        </svg>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="search-results.html" class="btn btn-secondary">Go somewhere</a>
                        </div>
                    </div>
                </div>`;
        }

    }
    featured_container.insertAdjacentHTML('beforeend', previews);
    console.log(featured_container);
}

function getrecipie() {
    let search_term = document.getElementById("search_box").value;
    //document.getElementById("search_header").innerText = "Search Results For: " + search_term;
    console.log(search_term);
    document.location.href = "search-results.html";
    console.log(document.getElementById("search_header").innerText)
    generateRecipieResults(search_term);
}

function generateRecipieResults(search_term) {
    console.log("generating view");
}
