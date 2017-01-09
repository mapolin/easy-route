(function(window, document) {

    var _guid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    var _merge = function(obj1, obj2) {
        obj1 = obj1 || {};
        obj2 = obj2 || {};

        for(var p in obj2) !obj1[p] && (obj1[p] = obj2[p]);

        return obj1;
    }

    var history = history || window.history;

    function EasyManager() {
        this.routes = [];

        this.add = function(route) {
            this.routes.push({
                url: route.url,
                route: route
            });
        };

        this.remove = function(route) {
            for(var i = 0; i < this.routes.length; i++) {
                if(this.routes[i]._id == route._id)
                    return this.routes.slice(i, 1);
            }

            return false
        };

        this.findByUrl = function(url) {
            for(var i = 0; i < this.routes.length; i++) {
                if(this.routes[i].url == url)
                    return this.routes[i].route;
            }

            return false;
        };

        this.find = function(route) {
            for(var i = 0; i < this.routes.length; i++) {
                if(this.routes[i]._id == route._id)
                    return this.routes[i].route;
            }

            return false;
        };
    }

    function EasyRouter(url, callback, data) {
        this._id = _guid();
        this.url = url;
        this.callback = callback;
        this.data = data;

        this.bindPush = function() {
            var _self = this, data = this.data, url = this.url, pushData, links, i;
            
            links = document.querySelectorAll('a[href="' + url + '"]');
            for(i = 0; i < links.length; i++) {
                links[i].addEventListener('click', function(e) {
                    e.preventDefault();

                    pushData = _merge(data, {
                        url: url
                    });

                    history.pushState(pushData, url, url);

                    _self.callback.run( pushData );
                }, false);
            }
        };

        this.bindPop = function() {
            var _self = this;

            window.addEventListener('popstate', function(e) {
                if(e.state && e.state.url == _self.url) {
                    _self.callback.run( e.state );
                }
            });
        };

        this.bindPop();
        this.bindPush();
    }

    function EasyCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;

        this.run = function() {
            this.callback.apply(this.scope, arguments);
        };
    }

    window.EasyManager = EasyManager;
    window.EasyRouter = EasyRouter;
    window.EasyCallback = EasyCallback;

})(window, document);