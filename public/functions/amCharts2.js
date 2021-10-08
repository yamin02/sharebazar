$("#controls").html(`
<div style="float: right; margin-right: 15px;">
Zoom:
    <button id="b1m" class="amcharts-input">1m</button>
    <button id="b3m" class="amcharts-input">3m</button>
    <button id="b6m" class="amcharts-input">6m</button>
    <button id="b1y" class="amcharts-input">1y</button>
    <button id="bytd" class="amcharts-input">YTD</button>
    <button id="bmax" class="amcharts-input">MAX</button>
</div>
`)

am4core.useTheme(am4themes_dark);
// am4core.useTheme(am4themes_animated);
// Themes end

// Create chart
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(0, 15, 0, 15);
chart.tooltip.label.width =300

// Load data
chart.dataSource.url = "https://www.amcharts.com/wp-content/uploads/assets/stock/MSFT.csv";
chart.dataSource.parser = new am4core.CSVParser();
chart.dataSource.parser.options.useColumnNames = true;
chart.dataSource.parser.options.reverse = true;

// the following line makes value axes to be arranged vertically.
chart.leftAxesContainer.layout = "vertical";

// uncomment this line if you want to change order of axes
//chart.bottomAxesContainer.reverseOrder = true;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.ticks.template.length = 8;
dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.renderer.ticks.template.disabled = false;
dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
dateAxis.renderer.minLabelPosition = 0.01;
dateAxis.renderer.maxLabelPosition = 0.99;
dateAxis.keepSelection = true;
dateAxis.minHeight = 30;
dateAxis.groupData = true;
dateAxis.minZoomCount = 5;

// these two lines makes the axis to be initially zoomed-in
// dateAxis.start = 0.7;
// dateAxis.keepSelection = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.zIndex = 1;
valueAxis.renderer.baseGrid.disabled = true;
// height of axis
valueAxis.height = am4core.percent(60);

valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.verticalCenter = "bottom";
valueAxis.renderer.labels.template.padding(2, 2, 2, 2);

//valueAxis.renderer.maxLabelPosition = 0.95;
valueAxis.renderer.fontSize = "0.8em"

var series = chart.series.push(new am4charts.CandlestickSeries());
series.dataFields.dateX = "Date";
series.dataFields.openValueY = "Open";
series.dataFields.valueY = "Close";
series.dataFields.lowValueY = "Low";
series.dataFields.highValueY = "High";
series.clustered = false;
series.tooltipText = "open: {openValueY.value}\nlow: {lowValueY.value}\nhigh: {highValueY.value}\nclose: {valueY.value}";
series.tooltip.label.fontSize = 12;
series.name = "MSFT";
series.defaultState.transitionDuration = 0;

var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis2.tooltip.disabled = true;
// height of axis
valueAxis2.height = am4core.percent(40);
valueAxis2.zIndex = 3
// this makes gap between panels
valueAxis2.marginTop = 30;
valueAxis2.renderer.baseGrid.disabled = true;
valueAxis2.renderer.inside = true;
valueAxis2.renderer.labels.template.disabled = true;
// valueAxis2.renderer.labels.template.verticalCenter = "bottom";
// valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
// //valueAxis.renderer.maxLabelPosition = 0.95;
// valueAxis2.renderer.fontSize = "0.8em"

valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.dateX = "Date";
series2.clustered = false;
series2.dataFields.valueY = "Volume";
series2.yAxis = valueAxis2;
series2.tooltipText = "{valueY.value}";
series2.tooltip.label.fontSize = 12;
series2.name = "Series 2";
// volume should be summed
series2.groupFields.valueY = "sum";
series2.defaultState.transitionDuration = 0;

chart.cursor = new am4charts.XYCursor();

if($(window).width() < 700){
  chart.cursor.behavior = "none";
}

var scrollbarX = new am4charts.XYChartScrollbar();


/**
 * Set up external controls
 */

// Date format to be used in input fields

document.getElementById("b1m").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "month", -1);
  zoomToDates(date);
});

document.getElementById("b3m").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "month", -3);
  zoomToDates(date);
});

document.getElementById("b6m").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "month", -6);
  zoomToDates(date);
});

document.getElementById("b1y").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "year", -1);
  zoomToDates(date);
});

document.getElementById("bytd").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.round(date, "year", 1);
  zoomToDates(date);
});

document.getElementById("bmax").addEventListener("click", function() {
  var min = dateAxis.groupMin["day1"];
  var date = new Date(min);
  zoomToDates(date);
});


function zoomToDates(date) {
  var min = dateAxis.groupMin["day1"];
  var max = dateAxis.groupMax["day1"];
  dateAxis.keepSelection = true;
  //dateAxis.start = (date.getTime() - min)/(max - min);
  //dateAxis.end = 1;

  dateAxis.zoom({start:(date.getTime() - min)/(max - min), end:1});
}