import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import BarChart from 'react-d3';

// Make Axis (Y, X)
// Make Bars
// Create Mouse Overs

export default class Application extends React.Component {
  componentDidMount () {
    var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    $.getJSON(url).success((res) => {
      // Sets Dimensions
      let top = 600;
      let bottom = 600;
      let height = top;
      let width = bottom;
      let data = res.data;
      let minDate = new Date(data[0][0]);
      let maxDate = new Date(data[data.length - 1][0]);
      const barWidth = Math.ceil(bottom / data.lenth);
      // Binds Description to the Bottom of the Screen
      d3.select(".description").style({"font-size": "12px", "text-align": "center", "color": "gray", "margin": "20px auto", "padding": "0px 40px"}).append("text").text(res.description);

      // Binds CSS to Main Title
      d3.select("h1")
        .style({"color": "skyblue", "font-size": "40px", "text-align": "center"})

      // Draw Main SVG for Graph (a.k.a Box)
      let mySVG = d3.select(".graph")
                      // .style({"border": "red 5px solid", "height": top + "px", "width": bottom + "px", "margin": "50px auto 0", "display": "block"})
                      .append('svg')
                      .attr({"height": top, "width": bottom, "id": "visual"})

      let bars = mySVG.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")

      bars.attr({"height": (d) => {
        return Math.abs(d[1])
      }, "width": barWidth, "x1": 50, "y1": 50, "x1": 55, "y1": 55})
        .style("stroke", "red")









      // Logging JSON
      console.log(res)
    })
  }
  render () {
    return (
      <div className="notecard">
        <h1>Gross Domestic Product</h1>
        <div className="graph">
        </div>
        <div className="description">
        </div>
      </div>
    )
  }
};
