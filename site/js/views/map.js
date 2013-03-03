// site/js/views/map.js

var app = app || {};

app.MapView = Backbone.View.extend({
	
	el : ("#map_canvas2"),		
	
	initialize: function () {
		this.collection = new app.Pois();
		this.collection.fetch();
		this.map = this.drawMap();
		this.collection.bind('reset', this.populateMarkers, this);
		Backbone.pubSub.on('xxx', console.log("wat"));
	},
	populateMarkers: function(collection) {
       		_.each(collection.models, function(poi) {
            		var html = 'hello'
			console.log(poi);
            		this.map.addMarker({
                		lat: poi.attributes.latitude,
                		lng: poi.attributes.longitude,
                		infoWindow: {
                    			content: html,
                		}                
            		});
       		}, this);
   	},
	drawMap: function(){
		this.map = new GMaps({
           		div: this.el,
           		lat: 44.231172,
           		lng: -76.48595399999999,   
       		});
		return this.map;
	}

		

});


