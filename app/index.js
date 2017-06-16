
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
       if (xmlhttp.status == 200) {
           loadEvents(JSON.parse(xmlhttp.responseText));
       }
       else if (xmlhttp.status == 400) {
          alert('There was an error 400');
       }
       else {
           alert('Something else other than 200 was returned');
       }
    }
};

xmlhttp.open("GET", "http://localhost:8000/data/events.json", true);
xmlhttp.send();


function loadEvents(events) {
	var groupsSource = [{
		id: 1,
		content: 'political'
	}, {
		id: 2,
		content: 'economic'
	}, {
		id: 3,
		content: 'christian'
	}, {
		id: 4,
		content: 'anti_christian'
	}];
	var groups = new vis.DataSet();
	for (var g = 0, groupCount = groupsSource.length; g < groupCount; ++g) {
		groups.add(groupsSource[g]);
	}

	var items = new vis.DataSet();
	for (var i = 0, eventCount = events.length; i < eventCount; ++i) {
		items.add(events[i]);
	}

	var container = document.getElementById('visualization');
	var options = {
		groupOrder: 'content'  // groupOrder can be a property name or a sorting function
	};

	var timeline = new vis.Timeline(container);
	timeline.setOptions(options);
	timeline.setGroups(groups);
	timeline.setItems(items);
}
