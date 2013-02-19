  // js/views/app.js

  var app = app || {};

app.AppView = Backbone.View.extend({
	
	el: '#turduckenapp',
	
	statsTemplate: _.template( $('#stats-template').html() ),

	events: {
		'keypress #new-poi': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// At initialization we bind to the relevant events on the Pois collection, when items are added or changed.	
	initialize: function() {
		this.allCheckbox = this.$('toggle-all')[0];
		this.$input = this.$('#new-poi');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Pois, 'add', this.AddOne);
		this.listenTo(app.Pois, 'reset', this.AddAll);
		this.listenTo(app.Pois, 'change:completed', this.filterOne);
		this.listenTo(app.Pois, 'filter', this.filterAll);
		this.listenTo(app.Pois, 'all', this.render);
		
		app.Pois.fetch();
	},

	render: function() {
		var completed = app.Pois.completed().length;
		var remaining = app.Pois.remaining().length;

		if ( app.Pois.length ) {
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
			.removeClass('selected')
			.filter()
			.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}
		
		this.allCheckbox.checked = !remaining;
		
	},

	addOne: function( poi ) {
		var view = new app.PoiView({ model: poi });
		$('#poi-list').append( view.render().el );
	},

	addAll: function() {
		this.$('#poi-list').html('');
		app.Pois.each(this.addOne, this);
	},

	filterOne : function (poi) {
		poi.trigger('visible');		
	},

	filterAll : function () {
		app.Pois.each(this.filterOne, this);
	},

	newAttributes: function() {
		return {
			title: this.$input.val().trim();
			order: app.Pois.nextOrder(),
			completed: false
		};
	},

	createOnEnter: function(event) {
		if ( event.whic !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}
	},

	clearCompleted: function() {
		_.invoke(app.Pois.completed(), 'destroy');
		return false;
	},

	toggleAllCompleted: function() {
		var completed = this.allCheckbox.checked;

		app.Pois.each(function(todo) {
			poi.save({
				'completed': completed
			});
		});
	}
	
});
