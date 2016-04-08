/********
    This file bootstraps the javascript components for any modules
    that have been built within the app. To bootstrap any logic that
    should be on all pages, define the selector as 'body'.
********/

"use-strict";

// Handle console being undefined in IE when dev tools aren't open
if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}
// Global app object
window.APP = typeof(window.APP) == 'undefined' ? {} : window.APP;

(function($){

    // Document ready
    $( () => {
        
        // Bootstrapping
        // Add any app components to this array that you want to be initialised after page load
        var components = [
            {
                selector: '.globalHeader',
                moduleName: 'Navigation',
                module: Navigation
            }
        ]

        function init(components){
            // Run any modules for components that are present on the page
            for(let component of components){
                
                // Skip over if component is not on this page
                if( $(component.selector).length <= 0) continue;        
                
                let module = component.module,
                    $el = $(component.selector);
                
                console.log(`[APP] Initialising module: ${component.moduleName}`);

                // If there are multiple instances of an object, loop over them and initilise each one
                if( $el.length > 1 ){
                    APP[component.moduleName] = [];
                    for(let x=0; x<$el.length; x++){
                        APP[component.moduleName][x] = new module( $el.eq(x), component.options );
                        APP[component.moduleName].init();
                    }
                }else{
                    APP[component.moduleName] = new module( $el, component.options );
                    APP[component.moduleName].init();
                }
            }
        }

        init(components);
        
    });

})(jQuery)