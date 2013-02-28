// site/js/views/pois.js

var app = app || {};

app.PoisView = Backbone.View.extend({
	el: $( '#pois' ),

	initialize: function() {
		this.collection = new app.Pois();
		this.collection.fetch();
		this.render();	
		this.collection.on( 'add', this.renderPoi, this);
		this.collection.on( 'reset', this.render, this);

	},

		render: function() {
		_.each( this.collection.models, function(item) {
			this.renderPoi( item);
		}, this);
	},
	renderPoi: function(item) {
		var poiView = new app.PoiView({
			model: item
		});
		this.$el.append( poiView.render().el);
	},

	events: {
		'click #add': 'addPoi'
	},

	addPoi: function(e) {
		e.preventDefault();
		
		var formData = {};

		$('#addPoi div').children('input').each(function(i, el) {
			if($(el).val() != '') {
	      if( el.id === 'keywords' ) {
                formData[ el.id ] = [];
                _.each( $( el ).val().split( ' ' ), function( keyword ) {
                    formData[ el.id ].push({ 'keyword': keyword });
                });
            } else {
                formData[ el.id ] = $( el ).val();
            }
        }
		});

		this.collection.create(formData);	
	}
});
