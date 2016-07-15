(function ( $ ) {
    $.fn.bigNav = function (options) {

        var settings = $.extend({
            'navButtonClass'    : 'bignav-trigger', // Class for Nav Button Trigger
            'navTextOpen'       : 'Open',           // Text inside Nav Button when nav closed
            'navTextClose'      : 'Close',          // Test inside Nav Button when nav open
            'subNavTextOpen'    : '+',              
            'subNavTextClose'   : '-',
            'subtractHeight'    : 0                 // Subtract height of nav in pixels 
                                                    // Useful when using fixed header/footer and have to offset nav
        }, options);

        /**
         * Convert bignav to jQ element
         */
        var bignav_elem = $(this.selector);

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

                // Select the trigger
                var trigger = $('.'+settings.navButtonClass);

                // Remove hidden class from trigger
                trigger
                    .removeClass('hidden');

                // Add default state trigger
                trigger
                    .html(settings.navTextOpen)
                    .addClass('bignav-closed');


                // Bind trigger events
                trigger.on('click', function() {
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

                return false;
            };

            /**
             * On open click
             */
            this.openClick = function () {
                bignav_elem.addClass('bignav-open');

                // Hide document scrollbar when nav open
                $('html').css({
                    overflow : 'hidden'
                });

                // Set the height of bignav_elem
                $this.setHeight();

                return false;
            };

            /**
             * On close click
             */
            this.closeClick = function () {
                bignav_elem.removeClass('bignav-open');

                // Restore document scrollbar when nav closed
                $('html').css({
                    overflow : default_doc_overflow
                })

                return false;
            };

            /**
             * Set height of nav (default 100% which is window.height)
             */
            this.setHeight = function() {

                // Check for subtractHeight setting
                if(settings.subtractHeight!==0) {

                    // Reset height
                    bignav_elem.css({
                        'height' : '100%' // sets bignav_elem to window.height in pixels
                    });

                    // gets bignav_elem height in pixels
                    // which should be equal to window.height
                    var bignav_height = bignav_elem.height();

                    // set new height of bignav
                    bignav_elem.css({
                        'height' : (bignav_height - settings.subtractHeight) + 'px'
                    })
                }

                return false;
            };

            /**
             * Sub navs
             */
            this.subNavs = function() {
                // Get all sub nav uls
                var sub_navs = bignav_elem.find('ul.sub-nav');

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
                        } else {
                            $(this).html(settings.subNavTextOpen);
                        }
                    });
                });

                return false;
            }
        }

        /**
         * Bind object methods to target element
         */
        $.extend( bignav_elem, new BigNav() );

        bignav_elem.init();

    };
}(jQuery));