(function ( $ ) {
    $.fn.bigNav = function (options) {

        var settings = $.extend({
            'navButtonClass'    : 'bignav-trigger', // Class for Nav Button Trigger
            'navTextOpen'       : 'Open',           // Text inside Nav Button when nav closed
            'navTextClose'      : 'Close',          // Test inside Nav Button when nav open
            'subNavTextOpen'    : '+',              
            'subNavTextClose'   : '-',
            'subtractHeight'    : 0,                // Subtract height of nav in pixels 
                                                    // Useful when using fixed header/footer and have to offset nav
            'offsetTop'         : 0,                // Offset nav from top
            'onOpen'            : function(obj) {
                return false;                       // onOpen callback
            },                                      
            'beforeOnClose'     : function(obj) {
                return false;                       // beforeOnClose callback
            },
            'onClose'           : function(obj) {
                return false;                       // onClose callback
            }

        }, options);

        /**
         * Convert bignav to jQ element
         */
        var bignav_elem = $(this);
        bignav_elem.addClass('hidden');

        /**
         * Set trigger
         * @type {*|HTMLElement}
         */
        var trigger = $('.'+settings.navButtonClass);

        /**
         * Add bignav-trigger class on trigger if not exist
         */
        if(!trigger.hasClass('bignav-trigger')) {
            trigger.addClass('bignav-trigger');
        }

        /**
         * Add bignav class on bignav if not exist
         */
        if(!bignav_elem.hasClass('bignav')) {
            bignav_elem.addClass('bignav');
        }

        /**
         * Get default document overflow set
         * We can reset this once nav is closed afterwards
         */
        var default_doc_overflow = $('html').css('overflow');

        /**
         * Get default padding of <html> element
         * We can restore the padding when the nav is closed
         * Used primarily when right scrollbar removed
         */
        //var default_html_

        /**
         * Object with all our methods
         * @constructor
         */
        function BigNav () {

            /**
             * Global object variable
             */
            var $this = this;

            /**
             * Add all relevant stuff
             */
            this.init = function() {

                // Remove hidden class from trigger
                trigger
                    .removeClass('hidden');

                // Add default state trigger
                trigger
                    .html(settings.navTextOpen)
                    .addClass('bignav-closed');


                // Bind trigger events
                trigger.unbind().on('click', function(ev) {
                    ev.preventDefault();

                    if(trigger.hasClass('bignav-closed')) {

                        // trigger opens menu
                        trigger
                            .addClass   ('bignav-open')
                            .removeClass('bignav-closed')
                            .html       (settings.navTextClose);

                        $this.openClick();

                    } else {

                        // trigger closes menu
                        trigger
                            .removeClass('bignav-open')
                            .addClass   ('bignav-closed')
                            .html       (settings.navTextOpen);


                        $this.closeClick();
                    }
                });
                
                // Bind sub navs
                $this.subNavs();

                // Return the object to store in var
                return $this;
            };

            /**
             * On open click
             */
            this.openClick = function () {

                bignav_elem.removeClass('hidden');
                setTimeout(function() {
                    bignav_elem.addClass('bignav-open');
                },5);

                // Hide document scrollbar when nav open
                $('html').css({
                    'overflow'      : 'hidden',
                    'margin-right'  : $this.getScrollBarWidth() + 'px'
                });
                
                $('body').css({ // ADD THIS
                    'position': 'fixed',
                    'overflow-y': 'hidden',
                    'width':'100%',
                    'height':'100%',
                    '-webkit-overflow-scrolling': 'touch'    
                });

                // Set the height of bignav_elem
                $this.setHeight();

                // trigger onOpen callback
                settings.onOpen($this.getData());
                
                return false;
            };

            /**
             * On close click
             */
            this.closeClick = function () {
                bignav_elem.addClass('bignav-closing');

                // trigger beforeOnClose immediately
                settings.beforeOnClose($this.getData());
                
                //setTimeout(function() { // REMOVE TIMEOUT
                    bignav_elem.removeClass('bignav-open bignav-closing');

                    // Restore document scrollbar when nav closed
                    $('html').css({
                        'overflow'      : default_doc_overflow,
                        'margin-right'  : 0
                    });

                    $('body').css({
                        'position': 'static',
                        'overflow-y': 'auto',
                        'width':'auto',
                        'height':'auto',
                        '-webkit-overflow-scrolling': 'touch'
                    });
                
                setTimeout(function() {
                    bignav_elem.addClass('hidden');    
                },500);

                    // trigger onOpen callback
                    settings.onClose($this.getData());
                //}, 500);



                return false;
            };

            /**
             * Set height of nav (default 100% which is window.height)
             */
            this.setHeight = function() {

                var subtractHeight  =   settings.subtractHeight;

                // If offsetTop is set
                if(settings.offsetTop!==0) {
                    bignav_elem.css({
                        'top' : settings.offsetTop
                    });
                    
                    // offsetTop to be included in the height subtraction
                    subtractHeight = (settings.subtractHeight + settings.offsetTop);
                }
                
                // Check for subtractHeight setting
                if(subtractHeight!==0) {

                    // Reset height
                    bignav_elem.css({
                        'height' : '100%' // sets bignav_elem to window.height in pixels
                    });

                    // gets bignav_elem height in pixels
                    // which should be equal to window.height
                    var bignav_height = bignav_elem.height();

                    // set new height of bignav
                    bignav_elem.css({
                        'height' : (bignav_height - subtractHeight) + 'px'
                    })
                }

                return false;
            };

            /**
             * Sub navs
             */
            this.subNavs = function() {
                // Get all sub nav uls
                var sub_navs = bignav_elem.find('ul.sub-nav, ul.sub-menu');

                // Loop over each
                sub_navs.each(function() {

                    // Always make sure we can access this element inside any context
                    var that = $(this);

                    // Add default expand/retract button
                    that.after('<span class="bignav-sub-open">'+settings.subNavTextOpen+'</span>');

                    // Bind click events. Next element is button we just created
                    that.next().on('click', function() {
                        that.toggleClass('sub-open');

                        // If ul sub-nav is open
                        if(that.hasClass('sub-open')) {

                            // this is now the button in this context
                            $(this).html(settings.subNavTextClose);

                            // Open sub nav
                            $this.showSubNav(that, 1);
                        } else {
                            $(this).html(settings.subNavTextOpen);

                            // Close sub nav
                            $this.showSubNav(that, 0);
                        }
                    });
                });

                return false;
            };

            /**
             * Display sub nav when icon clicked
             *
             * @param subNavEl
             *      - The sub UL nav element
             * @param state
             *      - 0 = close 1 = open
             * @returns {boolean}
             */
            this.showSubNav = function(subNavEl, state) {

                // Get the element height
                var subNavHeight = subNavEl.height();

                // Trigger open state
                if(state==1) {

                    subNavEl.css({
                        'display'       : 'block',
                        'max-height'    : 0,
                        'transition'    : 'none'
                    });

                    // Immediately after new css block set run max-height animation
                    setTimeout(function() {
                        subNavEl.css({
                            'max-height'    : subNavHeight + 'px',
                            'transition'    : 'max-height 0.15s ease-out'
                        });
                    },1);

                }

                // Trigger close state
                if(state==0) {

                    subNavEl.css({
                        'max-height'    : 0,
                        'transition'    : 'max-height 0.15s ease-in'
                    });

                    // In this case wait for animation to finish before assigning display:none
                    setTimeout(function() {
                        subNavEl.css({
                            'max-height'    : subNavHeight + 'px',
                            'display'       : 'none',
                            'transition'    : 'none'
                        });
                    },155);
                }

                return false;

            };


            // Gets relevant callback data of this object
            this.getData = function() {
                return {
                    "navHeight"         : bignav_elem.height(), 
                    "scrollBarWidth"    : $this.getScrollBarWidth()
                }
            };
            
            // Update the settings
            this.update = function(new_settings) {
                
                // If no settings defined
                if(typeof settings === "undefined") {
                    return;
                }

                // Close menu if open
                $this.closeClick();

                // Merge with existing settings
                settings = $.extend(settings, new_settings);

                // Return object
                return bignav_elem.bigNav(settings);
            };

            /*******
             * HELPER FUNCTIONS
             *
             */

            /**
             * Gets the width of the browser scrollbar
             * @returns {number}
             */
            this.getScrollBarWidth = function() {
                var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                    widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
                $outer.remove();
                return 100 - widthWithScroll;
            };

        }

        /**
         * Bind object methods to target element
         */
        $.extend( bignav_elem, new BigNav() );

        return bignav_elem.init();

    };
}(jQuery));

