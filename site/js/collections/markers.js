// site/js/collections/markers.js

var app = app || {}:

app.Markers = Backbone.Collection.extend({
	model: app.marker,
	url: 'api/pois',
});
