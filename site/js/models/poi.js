// site/js/models/poi.js

var app = app || {};

app.Poi = Backbone.Model.extend({
    defaults: {
	title: 'Sir John A MacDonald',
        img: 'http://i.imgur.com/QSFb4.png',        
        address: 'Unknown',
        latitude: '44.231172',
	longitude: '-76.48595399999999',
        keywords: []
    },
	idAttribute: '_id'
});
