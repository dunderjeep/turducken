// site/js/app.js

var app = app || {};

$(function() {
	Backbone.pubSub = _.extend({}, Backbone.Events);
//	new app.LocationsView( pois );	
	new app.PoisView( pois );
			
//	var markers = new app.Markers();
//	new app.MapView( pois );
//	new app.SitesView( pois );
});
