  // js/collections/todos.js

var app = app || {};

var PoiList = BackBone.Collection.extend({
	
	model: app.Poi,

	localStorage: new Backbone.LocalStorage('pois-backbone'),
	
	completed: function() {
		return this.filter(function(poi) {
			return poi.get('completed');
		});		
	},

	remaining: function() {
		return this.without.apply( this, this.completed() );
	},

	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	comparator: function( poi ) {
		return poi.get('order');
	}
});

app.Pois = new PoiList();
