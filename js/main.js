//This first line just say: "when the html has finished loading, then run the script"
$(function() {

    //Add a vector graphics element to the html page
    var svg = d3.select("body").append("svg")
        .attr("width", 1000)
        .attr("height", 600)
      .append("g")

    //Load the data that definies the geometry of the world map, and a csv file that maps colour -> country  (you can edit this)
    var p1 = $.getJSON("data/world-110m.json")  //Javascrip loads resources asynchronously - this code is non blocking 
    var p2 = $.ajax("data/countries.csv")  //So I'm using promises

    $.when(p1, p2).done(function(worlddata, countrydata) {  // when the data resources have been fetched 

        var worlddata = worlddata[0]
        var countrydata = d3.csv.parse(countrydata[0]) //Parse data from csv

        var country_colour_lookup = _.object(_.map(countrydata, function(d){ return [d.id, d.colour]} ));

        var countries = topojson.feature(worlddata, worlddata.objects.countries).features;

         var projection = d3.geo.mercator()
            .scale(150)
            .translate([490, 300]);

        var path = d3.geo.path()
            .projection(projection);

        svg.append("path")

        var shapes = svg.selectAll(".countrypath")
            .data(countries)

          shapes.enter().append("path")
            .attr("class", function(d) {
                return "subunit " + d.id;
            })
            .attr("class", function(d) {
                return "countrypath";
            })
            .attr("d", path)
            .attr("id", function(d, i) {
                return d.id;
            })
            .attr("name", function(d, i) {
                return d.properties.name;
            })
            .attr("fill", function(d) {
                return country_colour_lookup[d.id]
            })

        var shapes = svg.selectAll(".countrypath")
            .data(countries)


    })

})