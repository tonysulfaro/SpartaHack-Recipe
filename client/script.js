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

        for (i = 0; i < 3; i++) {
            //console.log(obj[i].url);
        }

        let featured_container = document.getElementById("featured_container");

        let count = 0;
        let previews = `<div class="row">`;

        for (var i = 0; i < 3; i++) {
            console.log(JSON.stringify(obj[i].url))
            console.log(JSON.stringify(obj[i].image));

            let recipe_url = JSON.stringify(obj[i].url);
            let recipe_label = JSON.stringify(obj[i].label);
            let recipe_pic = obj[i].image;

            if (count < 3) {
                previews = previews + `<div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="` + recipe_pic + `" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">` + recipe_label + `</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="` + recipe_url + `" class="btn btn-secondary">Start</a>
                        </div>
                    </div>
                </div>`;

            } else {
                previews = previews + `</div><div class="row"><div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="https://img.huffingtonpost.com/asset/5c4344752400003801486921.jpeg" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="` + recipe_url + `" class="btn btn-secondary">Start</a>
                        </div>
                    </div>
                </div>`;
            }

        }
        featured_container.insertAdjacentHTML('beforeend', previews);
        console.log(featured_container);
    }

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

    let search_thing = document.getElementById("search_box").value;
    localStorage.setItem("search_query", search_thing);
    console.log(search_thing)

    // remove all stuff
    var myNode = document.getElementById("main_container");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    let featured_container = document.getElementById("main_container");
    let parts = `<br>
        <br>
        <br>
        <br>

        <div id="search_results" class="container">
            <h1 id="search_header">Search Results For: ` + search_thing + `</h1>
            <br>
        </div>`;
    featured_container.insertAdjacentHTML('beforeend', parts);

    var url = 'http://127.0.0.1:5000/recipe?query=' + search_thing;
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

        for (i = 0; i < 3; i++) {
            //console.log(obj[i].url);
        }

        featured_container = document.getElementById("search_results");

        let count = 0;
        let previews = `<div class="row">`;

        for (var i = 0; i < 3; i++) {
            console.log(JSON.stringify(obj[i].url))
            console.log(JSON.stringify(obj[i].image));

            let recipe_url = JSON.stringify(obj[i].url);
            let recipe_label = JSON.stringify(obj[i].label);
            let recipe_pic = obj[i].image;

            if (count < 3) {
                previews = previews + `<div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="` + recipe_pic + `" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">` + recipe_label + `</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="` + recipe_url + `" class="btn btn-secondary">Start</a>
                        </div>
                    </div>
                </div>`;

            } else {
                previews = previews + `</div><div class="row"><div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="https://img.huffingtonpost.com/asset/5c4344752400003801486921.jpeg" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="` + recipe_url + `" class="btn btn-secondary">Start</a>
                        </div>
                    </div>
                </div>`;
            }

        }
        featured_container.insertAdjacentHTML('beforeend', previews);
        console.log(featured_container);
    }
}
