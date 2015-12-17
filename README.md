## Instructions

To view the site, run `gulp browser-sync`. You will be able to test the site at
[PageSpeedInsights](https://developers.google.com/speed/pagespeed/insights/) by entering pizza.localtunnel.me.

## Critical Rendering Path Overview

I did the easy optimizations first. I resized and optimized pizzeria.jpg and
just optimized profilepic.jpg. I made separate, resized file for the pizzeria
image used on the index.html page.

I then set what was clearly analytics code not necessary for the page to run to
async. That way, these scripts will not be render blocking.

Because there really wasn't much css, I just inlined it all. I also eliminated
the 'Open Sans' web font because I couldn't get the page score into an adaquate
range, even when using the [web font loader](https://github.com/typekit/webfontloader). 
