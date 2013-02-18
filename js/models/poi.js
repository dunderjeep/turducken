 // js/models/todo.js

var app = app || {};

app.Poi = Backbone.Model.extend({
	defaults: {
		title: '',
		coords: {
			latitude: 0;
			longitude: 0;
		}		
		description: '',
		completed: false
	},

	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}
});
