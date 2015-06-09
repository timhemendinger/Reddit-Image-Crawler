
var sub_text = $('sub_text');
var search_btn = $('search_btn');
var dropdown_limit = $('dropdown_limit');
var sort_boxes = document.getElementsByClassName('sort_rbox');
var loading_image = $('loading-image');

for (var x=0; x<sort_boxes.length; x++) {
	sort_boxes[x].addEventListener('click', refreshSearch, false);
}

dropdown_limit.addEventListener('change', refreshSearch, false);

search_btn.addEventListener('click', function(e) {
	// Get selected sort radio box (hot/new/top)
	var sortOption = getRadioValue('form-search', 'sort');
	sortOption = (sortOption.slice(0,sortOption.indexOf('_rbox')));

	// Get result limit selected (25/50/100/250/500)
	var limit = document.getElementById('dropdown_limit');
	limit = limit.options[limit.selectedIndex].text;

	// Clear the images displayed (if there was a previous search)
	var imageDivs = document.getElementsByClassName('image');

	// Remove each image div one by one until there are no more
	while(imageDivs[0]) {
		imageDivs[0].parentNode.removeChild(imageDivs[0]);
	}

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
		// some kind of slider will go here
		for(var x = 0; x<crawledImages.length; x++) {
			crawledImages[x].addEventListener('click', function(e){
				console.log(this.href);
				
			}, false);			
		}
	

	});

}, false);

function getJSON(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {

        	loading_image.style.visibility = "hidden";

            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        } else {
			loading_image.style.visibility = "visible";
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(null); 
};

// Repopulate results unless search box is blank
function refreshSearch() {
	if(sub_text.value.trim()) {
		search_btn.click();
	}
}

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

