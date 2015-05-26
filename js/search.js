
$('search_btn').addEventListener('click', function() {
	var subreddit = 'http://www.reddit.com/r/'+($('sub_text').value)+'/.json?';

	var images = [];

	getJSON(subreddit, function(data){

		for(var x=0; x<data.data.children.length; x++) {
	 		addImage(data.data.children[x].data.url, 'images')
		}

	});

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

function addImage(url, location) {
	var newIMG = document.createElement('IMG');
	newIMG.src = url;
	$(location).appendChild(newIMG);
}

function $(item) {
	return document.getElementById(item);
}