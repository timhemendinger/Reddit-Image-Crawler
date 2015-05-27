
var sub_text = $('sub_text');
var search_btn = $('search_btn');

search_btn.addEventListener('click', function(e) {

	// Get selected sort radio box (hot/new/top)
	var sortOption = getRadioValue('form-search', 'sort');
	sortOption = (sortOption.slice(0,sortOption.indexOf('_rbox')));

	// Get result limit selected (25/50/100/250/500)
	var limit = document.getElementById('dropdown_limit');
	limit = limit.options[limit.selectedIndex].text;

	// Clear the images displayed (if there was a previous search)
	$('images').innerHTML = '';

	// Reddit JSON URL for Subreddit entered
	var subreddit = 'http://www.reddit.com/r/'
					+(sub_text.value)
					+'/'+sortOption
					+'/.json?'
					+'limit='+limit
					+'&t=all';

	console.log(subreddit);

	getJSON(subreddit, function(data){
		// testing
		console.log(data);

		// Iterate through the URLS
		for(var x=0; x<data.data.children.length; x++) {
			
			var thumb = data.data.children[x].data.thumbnail;
			var url = data.data.children[x].data.url;

			// Ensure that there is a proper thumbnail image URL, otherwise a broken image will be shown for stories with no picture
			if(thumb.indexOf('http') !== -1) { 
				addImage(thumb, url, 'images'); 
			}
		}

		// Add a class of 'crawledImage' to each link
		var crawledImages = document.getElementsByClassName('crawledImage');

		// Add click event listener for each image
		for(var x = 0; x<crawledImages.length; x++) {
			crawledImages[x].addEventListener('click', function(e){
				console.log(this.href);
				
			}, false);			
		}
	

	});

}, false);

// Clear search text box when clicked
sub_text.addEventListener('click', function(){
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
	var newLink = document.createElement('A');
	var newIMG = document.createElement('IMG');
	var newDiv = document.createElement('DIV');
	newLink.href = url;
	newLink.target = "_blank";
	newLink.classList.add('crawledImage');
	newDiv.classList.add('image');
	newIMG.src = thumbURL;
	newLink.appendChild(newIMG);
	newDiv.appendChild(newLink);
	$(location).appendChild(newDiv);
}

// Helper function, for brevity
function $(item) {
	return document.getElementById(item);
}

function getRadioValue(form, name) {
	var radios = document.getElementById(form).elements[name];

	for(var x=0; x<radios.length; x++) {
		if(radios[x].checked) { 
			return radios[x].id;
		}
	}
}

