// site/js/models/marker.js

var app = app || {};

app.Marker = Backbone.Model.extend({
	defaults: {
		position: {},
		title: "title",
		animation: google.maps.Animation.DROP
	}
});

