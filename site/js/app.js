// site/js/app.js

var app = app || {};

$(function() {
	new app.LocationsView( pois );	
	new app.PoisView( pois );
	var markers = new app.MarkerCollection();
	new app.MapView( {markers: markers} );	
//	new app.SitesView( pois );
});
