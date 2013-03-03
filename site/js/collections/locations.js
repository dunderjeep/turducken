// site/js/collections/locations.js

var app = app || {};

app.Locations = Backbone.Collection.extend({
	model: app.Poi,
	url: '/api/pois'
});
