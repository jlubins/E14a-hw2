
var data, txt, svg, x, y, bins, bar;
var formatCount = d3.format(",.0f");

d3.json("/load_data", function (error, json_data) {

  if(!error){
     data = json_data['users'];
     map = data.map(function(d,i){ return parseFloat(d.age); })
     createVis(map)
  }

  else{
    console.log("Data not loaded!!!")
  }

});

function createVis(map){
   
    // visualize the total number of users
    // use txt variable defined above

    txt = d3.select("#total_users_text")
      .append("text").text(map.length);

    // Part 1  

    // ------ YOUR CODE GOES HERE --------

    // into .text attribute pass the lenghts of the data

    txt  
      .style("text-anchor", "start")
      .style("font-size", "30px")
      .style("font-style", "italic")
      .attr("fill", "#888")
      .attr("y", 440)
      .attr("x", 10);

    svg = d3.select("#barChart")
        margin = {top: 0, right: 45, bottom: 45, left: 0},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g")
               .attr("transform",
                     "translate(" + margin.left + "," + margin.top + ")");

    // Part 2  

    // ------ YOUR CODE GOES HERE -------- 

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([d3.min(map),d3.max(map)+1]);

    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(13))
        (map);


    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, 55]);

    var bar = g.selectAll(".bar")
        .data(bins)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .style('fill', "#8b2323");

    bar.append("rect")
        .attr("width", x(bins[0].x1) - x(bins[0].x0))
        .attr("height", function(d) { return height - y(d.length); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", -10)
        .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.length); });



    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom()
            .scale(x)
            .tickValues([20,25,30,35,40])
            );



    // a. Create x and y scale

    // b. Create bins and histogram

    // Generate a histogram using twenty uniformly-spaced bins.

    // c. Create bars (rect)


    // d. Create bar labels

    // e. Call Axes

    // f. Create Axes label

}
