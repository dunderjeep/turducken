// site/js/views/poi.js
 
var app = app || {};

app.PoiView = Backbone.View.extend({
	tagName: 'div',
	className: 'poiContainer',
	template: $('#poiTemplate').html(),

	events: {
		'click .delete': 'deletePoi'
	},

	deletePoi: function() {
		this.model.destroy();
		this.remove();
	},

	render: function() {
		var tmpl = _.template( this.template );
		this.$el.html( tmpl( this.model.toJSON() ) );
		return this;		
	},

});
