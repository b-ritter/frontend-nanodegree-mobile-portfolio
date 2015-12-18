## Instructions

To view the site, run `gulp browser-sync`. You will be able to test the site at
[PageSpeedInsights](https://developers.google.com/speed/pagespeed/insights/) by entering pizza.localtunnel.me.

## Critical Rendering Path Overview

I did the easy optimizations first. I resized and optimized pizzeria.jpg and
just optimized profilepic.jpg. I made a separate, resized file for the pizzeria
image used on the index.html page.

I then set what was clearly analytics code not necessary for the page to run to
asynchronously. That way, these scripts will not be render blocking.

Because there really wasn't much css, I just inlined it all. I also eliminated
the 'Open Sans' web font because I couldn't get the page score into an adequate
range, even when using the [web font loader](https://github.com/typekit/webfontloader).

Note: I tried [Ilya Grigorik's script](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery)
on the pizza.html page, but it did seem to work properly. Since the project
callded for page speed testing only on index.html, I left the styles linked as
in the default file.

## Pizza Optimization Overview

First, I reduced the amount of background pizzas that were being generated. Looking
at the sample timeline provided, I made 15 pizzas. I then used the Chrome
timeline inspector to analyze the timeline. I saw that there were expensive
JavaScript calls in the animation of the background pizzas and the resizing of
the pizzas with the slider. I also saw just by looking at the code that the pizzas
were being animated by changing their 'left' css property. I knew we could do
better by setting the 'transform' property instead.

In background animation, one further optimization was achieved by saving the array
of pizza images to animate. Instead of querying the DOM on each step of the iteration,
this list could just be referenced each time.

Likewise, the resizing of the pizzas queried the DOM for each of the 100 pizzas.
Clearly, this was overkill. I made another array to store all of the images of
the pizzas and just referenced that each time the slider was changed. In addition,
each time the resize function was called, I just calculated the new width once
instead of once per pizza.

These optimizations seem to make the animation render smoothly, but it still
appears that my fps is not quite hitting 60.

## Notes on Resubmission

### Overview

Most of the critical changes I had to make were in the code to animate the little
pizzas in the background. During my initial optimization, I made several changes
to the code that broke the original intent of the design. Based on the suggestions
from the reviewer, I restored those original values.

The reviewer also suggested a number of further optimizations. Many of these were
to replace the more inefficient `querySelectorAll()` with less expensive queries.
I also made fundamental changes to the `updatePositions` code, which runs for
each pizza item as the page scrolls. Taking the phase calculation out of the loop
saves a lot of expensive calculations.

* In the `resizePizzas` function, `querySelectorAll()` calls were replaced by
`getElementById()`

* My first version used `querySelectorAll()` to construct a list of all the pizza
images. `getElementsByClassName()` is now used instead to boost performance.

* Changes to `updatePositions`:
  * Move the phase calculation outside of the loop. Now, an array of five phase
  values is calculated before entering the loop. Within the loop, a simpler counter
  keeps track of which of the values to reference.
  * Store the length of the array in variable `itemsLength` to improve for-loop
  performance
  * Remove `translateY` and `scale` from the transform list

* `DOMContentLoaded` callback
  * Restore default vertical position and size styles
  * Declare the `elem` variable outside the loop
  * Add 'px' to the left position style to preserve position in `translateX` calculation

### Other Changes

* I modified the gulpfile a bit to autoprefix the css in the pizza file.
* I removed the '/' before the optimized thumbnail pizza image so that it now
has a relative path.
