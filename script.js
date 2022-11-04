document.addEventListener("DOMContentLoaded",function(e) {
var margin={top:10, right:30,bottom:30,left:60}
width= 470 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

//append the contentto the body of the page
var svg = d3.select('body')
.append(svg)
.attr('width',width+ margin.left+ margin.right )
.attr('height', height+ margin.top+ margin.bottom )
.append('g')
.attr('transform', 'translate("+ margin.left +","+ margin.top +")');

//read the content covid data from csv
d3.csv("https://raw.githubusercontent.com/srah99/covidData/main/CovidData%20(1).csv");{
    //add x axis
    var xAxis = d3.scale.linear().domain([0,12000]).range([0,width]);
    svg.append("g").attr("transform","translate(0,"+ height +")")
    .call(d3.axisBottom(xAxis));

    var yAxis = d3.scale.linear().domain([0,600]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(yAxis));

    // Color scale: give me a date, I return a color
    var color = d3.scaleOrdinal()
    .domain(["7/10/2022", "7/24/2022","8/7/2022", "8/21/2022" ])
    .range([ "#C2FFA3", "#B36DCB", "#B1BE25","#CB6DB6",])

    //add scatter dot circles
    svg.append("g").selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("cx",function(d) {return xAxis(d.cases);})
    .attr("cy",function(d) {return yAxis(d.deaths);})
    .attr("r", 1.5)
    .style("fill", function (d) { return color(d.cases + d.deaths) })}

})
