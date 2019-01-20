function generateHome(search_term) {

    var url = 'http://127.0.0.1:5000/recipe?query=chicken';
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
                            <button onclick=start_recipe() class="btn btn-secondary">Start</a>
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
                            <button class="btn btn-secondary">Start</button>
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

        for (var i = 0; i < 6; i++) {
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
                            <button onclick=start_recipe() class="btn btn-secondary">Start</button>
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
                            <button class="btn btn-secondary">Start</button>
                        </div>
                    </div>
                </div>`;
            }

        }
        featured_container.insertAdjacentHTML('beforeend', previews);
        console.log(featured_container);
    }
}

function start_recipe() {

    let search_thing = "Chicken Vesuvio"

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
            <h1 id="search_header">` + search_thing + `</h1>
            <br>
<h3>Steps</h3>
<div class="row">



<div class="col-md-4">
<p>* 1/2 cup olive oil</p>
<p>* 5 cloves garlic, peeled</p>
<p>* 2 large russet potatoes, peeled and cut into chunks</p>
<p>* 1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)</p>
<p>* 3/4 cup white wine</p>
<p>* 3/4 cup chicken stock</p>
<p>* 3 tablespoons chopped parsley</p>
<p>* 1 tablespoon dried oregano</p>
<p>* Salt and pepper</p>
<p>* 1 cup frozen peas, thawed</p>
</div>

<div class="col-md-4">
<img src="https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg">
</div>



</div>
<br>

<p>1: Heat an oven to 325 degrees.  In a roasting pan (or a large (14-inch) oven-proof skillet), heat the olive oil over medium until shimmering.  Add the potatoes and garlic and cook until golden brown, about 12 minutes.  Remove to a plate, leaving behind as much oil as possible.</p>
<p>2: Add the chicken to the skillet, skin-side down. Cook until golden and crisp, then turn and cook the other side until golden as well. Add the wine and cook until it reduces by half.</p>
<p>3: Return the garlic and potatoes to the pan, along with the chicken stock, parsley, oregano, and a pinch of salt and pepper. Transfer to the oven and cook, uncovered, until the chicken is cooked through, about 45 minutes. Add the peas to the pan with 5 minutes left in the cooking time. Serve with the roasting juices in the pan.</p>
        </div>`;
    featured_container.insertAdjacentHTML('beforeend', parts);

}
