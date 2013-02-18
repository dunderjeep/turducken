  // js/views/app.js

  var app = app || {};

app.AppView = Backbone.View.extend({
	
	e1: '#turduckenapp',
	
	statsTemplate: _.template( $('#stats-template').html() ),

	// At initialization we bind to the relevant events on the Pois collection, when items are added or changed.	
	initialize: function() {
		this.allCheckbox = this.$('toggle-all')[0];
		this.$input = this.$('#new-poi');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Pois, 'add', this.AddOne);
		this.listenTo(app.Pois, 'reset', this.AddAll);
	},

	addOne: function( poi ) {
		var view = new app.PoiView({ model: poi });
		$('#poi-list').append( view.render().el );
	},

	addAll: function() {
		this.$('#poi-list').html('');
		app.Pois.each(this.addOne, this);
	}
	
});
