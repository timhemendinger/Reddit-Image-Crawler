
$('search_btn').addEventListener('click', function() {

	var sub_text = $('sub_text');

	// Clear the images displayed (if there was a previous search)
	$('images').innerHTML = '';

	// Reddit JSON URL for Subreddit entered
	var subreddit = 'http://www.reddit.com/r/'+(sub_text.value)+'/.json?';

	var images = [];

	getJSON(subreddit, function(data){
		console.log(data);
		// Iterate through the URLS
		for(var x=0; x<data.data.children.length; x++) {
	 		addImage(data.data.children[x].data.thumbnail,
	 		data.data.children[x].data.url, 'images')
		}

	});

}, false);

// Clear search text box when clicked
$('sub_text').addEventListener('click', function(){
	this.value = '';
}, false);

function getJSON(path, callback) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
};

// Add image to location in DOM
function addImage(thumbURL, url, location) {
	var newIMG = document.createElement('IMG');
	var newLink = document.createElement('A');
	newLink.href = url;
	newIMG.src = thumbURL;

	newLink.appendChild(newIMG);

	$(location).appendChild(newLink);
}

// Helper function, for brevity
function $(item) {
	return document.getElementById(item);
}