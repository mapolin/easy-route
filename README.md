# Easy Router

Usage
--------------
##### For sample usage see index.html

EasyManager Class
--------------
### Used to store Routes; add/remove/find

    Public::Constructor()
        @return new EasyManager
        // Create a new instance of the EasyManager class.

    Public::add(ROUTE)
        @param ROUTE [RouteInstance]
        @return VOID
        // Adds a new RouteInstance to the EasyManager.

    Public::remove(ROUTE)
        @param ROUTE [RouteInstance]
        @return removed ROUTE || false
        // Remove request RouteInstance from the EasyManager. Return false if RouteInstance was not found.

    Public::findByUrl(URL)
        @param URL [String]
        @return ROUTE || false
        // Find request RouteInstance from the EasyManager. Return false if RouteInstance was not found.

    Public::find(ROUTE)
        @param ROUTE [RouteInstance]
        @return ROUTE || false
        // Find request RouteInstance from the EasyManager. Return false if RouteInstance was not found.


EasyRouter Class
--------------
### Used to define a new Route instance

    Public::Constructor(url, callback, data)
        @param url [String] // url for the given route
        @param callback [EasyCallback] // callback to execute when the route was hit
        @param data [Object] // optional data to push when the route was hit
        @return new EasyRouter
        // Create a new instance of the EasyRouter class.

    Public::_id -> Unique auto-generated indentifier for the route instance
    Public::url -> url given to Constructor
    Public::callback -> [EasyCallback] given to Constructor
    Public::data -> data given to Constructor

    Public::bindPush()
        @return VOID
        // Find all a[href] that link to this route and bind pushState.
        // invoked on initialization.

    Public::bindPop()
        @return VOID
        // Add a handler for this route to popstate event.
        // invoked on initialization.


EasyCallback Class
--------------
### Used to define a new Callback instance

    Public::Constructor(callback, scope)
        @param callback [Function] // callback function to execute
        @param scope [Any bind-able object] // scope to bind the callback execution to
        @return new EasyCallback
        // Create a new instance of the EasyCallback class.

    Public::callback -> [Function] given to Constructor
    Public::scope -> data given to Constructor

    Public::run([arguments])
        @param [arguments] // optional arguments that will be passed to the callback
        @return VOID
        // Execute the callback [Function] with given scope and optional parameters.