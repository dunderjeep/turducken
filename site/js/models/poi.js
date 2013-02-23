// site/js/models/poi.js

var app = app || {};

app.Poi = Backbone.Model.extend({
    defaults: {
	title: 'Sir John A MacDonald',
        img: 'http://i.imgur.com/QSFb4.png',        
        address: 'Unknown',
        latitude: '0',
	longitude: '0',
        keywords: 'None'
    },
	idAttribute: '_id'
});
