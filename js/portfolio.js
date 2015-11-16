require.config({baseUrl:"js",paths:{jquery:"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",react:"https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react",bootstrap:"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",underscore:"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",lazyload:"lib/jquery.lazyload"},shim:{bootstrap:{deps:["jquery"]},react:{exports:"react"},lazyload:{exports:"lazyload",deps:["jquery"]}}}),requirejs(["jquery","bootstrap"],function(){}),requirejs(["jquery","app/lazyload/lazyloadApp"],function(a,b){a(function(){b()})}),requirejs(["jquery","underscore","react","app/portfolio/PortfolioListBox"],function(a,b,c){a.ajax({url:"https://spreadsheets.google.com/feeds/list/1GDTX8ohqU_0_HNJtUv5xLN7BNFfRy7dnQcZmWLDaqjI/1/public/values?alt=json",dataType:"json",cache:!1,success:function(d){a("#portfolioWrap").removeClass("loading");var e=b.map(d.feed.entry,function(a){var c={};return b.each(a,function(b,d){if(-1!=d.indexOf("gsx$")){var e=d.split("gsx$")[1];c[e]=a[d].$t}}),c});e=b.filter(e,function(a){return""!=a.open}),c.render(c.createElement(PortfolioListBox,{data:e}),document.getElementById("jsxPortfolio"))},error:function(a,b,c){}})});