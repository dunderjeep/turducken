// site/js/views/locations.js

var app = app || {};

app.LocationsView = Backbone.View.extend({
	
	el: $('#map_canvas'),

	initialize: function() {
		_.bindAll(this);
		this.collection = new app.Pois();
		this.collection.fetch();
		console.log("coll "+this.collection.models.length);
		this.collection.on('reset', this.foo, this);
		this.collection.on('change', function(poi){ console.log("location: " +poi)});
		this.collection.on('add', function(poi){ console.log(poi);});
		this.collection.on('remove', this.foo, this)
		this.markers = new Array();
		this.bar();
		console.log("inti: " +this.markers.length);

        // Create the Google Map
		var mapOptions = {
                	center: new google.maps.LatLng(44.231172, -76.48593999),
                	zoom: 14,
                	mapTypeId: google.maps.MapTypeId.ROADMAP
        	};
		this.googleMap = new google.maps.Map(this.el, mapOptions);
		
		
	},

	foo: function() {
		console.log("models length" + this.collection.models.length);	
	 	var icon = 'http://maps.google.com/mapfiles/marker.png';
		_.each( this.collection.models, function(model) {
			console.log(model.get('latitude'));
			var idAttribute = model.get('idAttribute');
    			var latitude = model.get('latitude');
    			var longitude = model.get('longitude');
    			var title = model.get('title');
			var latLng = new google.maps.LatLng(latitude, longitude);
			var marker = new google.maps.Marker({
        		position: latLng,
        		title: title,
        		map: this.googleMap,
			icon: icon,
			animation: google.maps.Animation.DROP,
    			});
			this.markers.push(marker);
			marker.setMap(this.googleMap);
			console.log("markers :" + this.markers.length);
		}, this);
		
		
	},
	bar: function(what) {
		console.log("bar");
		console.log("bar models length" + this.markers.length);
	}
});

