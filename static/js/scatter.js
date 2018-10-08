d3.json("/load_data", function (data) {

    data = data['users'];
    createScatter(data)
});

function createScatter(data) {
    var svg = d3.select("#scatter");

    margin = {top: 20, right: 10, bottom: 50, left: 20},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var radius = d3.scaleSqrt()
        .range([2, 5]);


    // Part 2

    // ------ YOUR CODE GOES HERE --------

    // a. Create xScale and yScale scales

    var xScale = d3.scaleLinear()
        .range([0, width]);
    var yScale = d3.scaleLinear()
        .range([height, 0]);


    // b. Create axes
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickValues([0, 2, 4]);
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickValues([10, 15, 20, 25]);


    // c. define xScale and yScale domain()
    xScale.domain(d3.extent(data, function (d) {
        return d.experience_yr;
    })).nice();

    yScale.domain(d3.extent(data, function (d) {
        return d.hw1_hrs;
    })).nice();


    // this is radius domain - use it as a hint! :)
    radius.domain(d3.extent(data, function (d) {
        return d.age;
    })).nice();


    // d. call xAxis
    svg.append('g')
        .attr('transform', 'translate(24,' + height + ')')
        .attr('class', 'x axis')
        .call(xAxis);

    // e. call yAxis
    svg.append('g')
        .attr('transform', 'translate(' + 24 + ', 0)')
        .attr('class', 'y axis')
        .call(yAxis);

    // f. use variable "bubble" to store cicrles
    var bubble = svg.selectAll('.bubble')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'bubble')
        .attr('cx', function (d) {
            return xScale(d.experience_yr);
        })
        .attr('cy', function (d) {
            return yScale(d.hw1_hrs);
        })
        .attr('r', function (d) {
            return radius(d.age);
        })
        .style('fill', '#1b7688');

    // ------ YOUR CODE END HERE --------


    bubble.attr("transform", "translate(30,15)scale(0.85)");

    g.append('text')
        .attr("transform", "rotate(-90)")
        .attr('x', -90)
        .attr('y', 15)
        .attr('class', 'label')
        .text('Hours spent on HW1');

    g.append('text')
        .attr('x', (width / 2) + 60)
        .attr('y', height + 35)
        .attr('text-anchor', 'end')
        .attr('class', 'label')
        .text('Programming experience');

    function highlightBrushedCircles() {

        if (d3.event.selection != null) {

            // revert circles to initial style
            bubble.attr("class", "bubble");

            var brush_coords = d3.brushSelection(this);

            // style brushed circles
            bubble.filter(function () {

                var cx = d3.select(this).attr("cx"),
                    cy = d3.select(this).attr("cy");

                return isBrushed(brush_coords, cx, cy);
            })
                .attr("class", "brushed");
        }
    }

    function displayTable() {

        // disregard brushes w/o selections
        // ref: http://bl.ocks.org/mbostock/6232537
        if (!d3.event.selection) return;

        // programmed clearing of brush after mouse-up
        // ref: https://github.com/d3/d3-brush/issues/10
        d3.select(this).call(brush.move, null);

        var d_brushed = d3.selectAll(".brushed").data();

        // populate table if one or more elements is brushed
        if (d_brushed.length > 0) {
            console.log(d_brushed);
            map = d_brushed.map(function(d,i){ return parseFloat(d.age); })

            d3.selectAll("#barChart > *").remove()
            d3.selectAll("#total_users_text > *").remove()
            createVis(map)

            d3.selectAll("#scatter > *").remove()
            createScatter(d_brushed)


        } else {
            clearTableRows();
        }
    }

    var brush = d3.brush()
        .on("brush", highlightBrushedCircles)
        .on("end", displayTable);

    svg.append("g")
        .call(brush);


    function clearTableRows() {

        hideTableColNames();
        d3.selectAll(".row_data").remove();
    }

    function isBrushed(brush_coords, cx, cy) {

        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];

        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

    function hideTableColNames() {
        d3.select("table").style("visibility", "hidden");
    }

    function showTableColNames() {
        d3.select("table").style("visibility", "visible");
    }

    function populateTableRow(d_row) {

        showTableColNames();

        var d_row_filter = [d_row.age, d_row.experience_yr, d_row.first_name, d_row.hw1_hrs, d_row.last_name, d_row.prog_lang, d_row.uid, d_row.username];

        d3.select("table")
            .append("tr")
            .attr("class", "row_data")
            .selectAll("td")
            .data(d_row_filter)
            .enter()
            .append("td")
            .attr("align", (d, i) => i == 0 ? "left" : "right")
            .text(d => d);


    }
}