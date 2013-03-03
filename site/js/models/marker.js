// site/js/models/marker.js

var app = app || {};

app.Marker = Backbone.Model.extend({
	defaults: {
		position: {},
		title: "title",
		animation: google.maps.Animation.DROP,
		latitude: '44.231172',
		longitude: '-76.48595',
		
	}
});

