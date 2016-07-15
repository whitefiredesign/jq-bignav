# jQuery.bigNav - A simple jQuery navigation solution for all screen sizes

## To initialise 
````
$('.bignav').bigNav()`
````

## Settings
````
navButtonClass    : 'bignav-trigger',   // The button used to open the navigation
navTextOpen       : 'Open',             // Text inside the button nav when closed
navTextClose      : 'Close',            // Text inside the button nav when opened
subNavTextOpen    : '+',                // Text inside sub nav trigger when closed
subNavTextClose   : '-',                // Text inside sub nav trigger when opened
subtractHeight    : 100                 // Subtracts this amount in pixels from default window.height
````

## Using
````
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
````

## Licence
### The MIT License (MIT)
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.