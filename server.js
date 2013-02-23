// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Turducken API is running' );
});

//Connect to database
mongoose.connect( 'mongodb://localhost/turducken_database' );

var Keywords = new mongoose.Schema({
    keyword: String
});

//Schemas
var Poi = new mongoose.Schema({
    title: String,
    address: String,
    latitude: Number,
    longitude: Number,    
    img:String,
    keywords: [ Keywords ]
});

//Models
var PoiModel = mongoose.model( 'Poi', Poi );

//Get a list of all pois
app.get( '/api/pois', function( request, response ) {
    return PoiModel.find( function( err, pois ) {
        if( !err ) {
            return response.send( pois );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new poi
app.post( '/api/pois', function( request, response ) {
    var poi = new PoiModel({
        title: request.body.title,
        address: request.body.address,
        latitude: request.body.latitude,
	longitude: request.body.longitude,
	img: request.body.img,
	keywords: request.body.keywords
    });
    poi.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( poi );
});

//Get a single poi by id
app.get( '/api/pois/:id', function( request, response ) {
    return PoiModel.findById( request.params.id, function( err, poi ) {
        if( !err ) {
            return response.send( poi );
        } else {
            return console.log( err );
        }
    });
});

//Update a poi
app.put( '/api/pois/:id', function( request, response ) {
    console.log( 'Updating poi ' + request.body.title );
    return PoiModel.findById( request.params.id, function( err, poi ) {
        poi.title = request.body.title;
        poi.address = request.body.address;
        poi.latitude = request.body.latitude;
	poi.longitude = request.body.latitude;
	img: request.body.img;
	keywords: request.body.keywords;

        return poi.save( function( err ) {
            if( !err ) {
                console.log( 'poi updated' );
            } else {
                console.log( err );
            }
            return response.send( poi );
        });
    });
});

//Delete a poi
app.delete( '/api/pois/:id', function( request, response ) {
    console.log( 'Deleting poi with id: ' + request.params.id );
    return PoiModel.findById( request.params.id, function( err, poi ) {
        return poi.remove( function( err ) {
            if( !err ) {
                console.log( 'Poi removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});



//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
