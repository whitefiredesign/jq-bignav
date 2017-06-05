# jq-bignav - A simple jQuery navigation solution for all screen sizes

## Install
### There is a bower package
```javascript
bower install jq-bignav
```

## To initialise 
```javascript
$('.bignav').bigNav()`
```

## Settings
```javascript
navButtonClass    : 'bignav-trigger',   // The button used to open the navigation
navTextOpen       : 'Open',             // Text inside the button nav when closed
navTextClose      : 'Close',            // Text inside the button nav when opened
subNavTextOpen    : '+',                // Text inside sub nav trigger when closed
subNavTextClose   : '-',                // Text inside sub nav trigger when opened
subtractHeight    : 100,                // Subtracts this amount in pixels from default window.height
offsetTop         : 0                   // Menu opens this many pixels from top (adds this value to subtractHeight)
onOpen            : function(obj) {}    // onOpen callback
beforeOnClose     : function(obj) {}    // beforeOnClose callback
onClose           : function(obj) {}    // onClose callback             
```

## Using
```html
    <!-- bignav -->
    <div class="example">
        <div class="bignav-container">
            <!-- Nav in here -->
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Services</a>
                        <ul class="sub-nav">
                            <li><a href="">Design</a></li>
                            <li><a href="">Build</a></li>
                            <li><a href="">Support</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
```

## Useful features
### Auto open
```html
<ul class="sub-nav auto-open">
...
```

### Force no transition on sub nav
```html
<ul class="sub-nav no-transition">
...
```

### Update settings on-the-fly
```javascript
// Init bigNav on element
var bigNav = $('.example').bigNav();

// Change bigNav settings on-the-fly
$(window).resize(_.debounce(function() {
	// Once window resized - update! 
	bigNav.update({
		offsetTop : $('header.site-header').height()
   	});
}, 500));

```

## Development
To run the watch process type

```
grunt
```

To build for production type

```
grunt build
```


## Version
0.1.6
Added option for no transition on sub navs

0.1.5
Added sub-sub nav possibility

0.1.4
Ensure sub navigation sections open when manually specified

0.1.3
Fix issue - https://github.com/whitefiredesign/jq-bignav/issues/5
Fix issue - https://github.com/whitefiredesign/jq-bignav/issues/4

0.1.2
Added `preventDefault()` to trigger
Updated default classes to ensure consistency
Added `onOpen`, `beforeOnClose` and `onClose` parameter callbacks
Clean-up base stylesheet

0.1.1
Added dynamic height support for sub navigation blocks

0.1.0 
First commit

## Licence
### The MIT License (MIT)
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
