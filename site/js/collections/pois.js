// site/js/collections/pois.js

var app = app || {};

app.Pois = Backbone.Collection.extend({
    model: app.Poi,
    url: '/api/pois'
});
