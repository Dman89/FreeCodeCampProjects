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

      // Draw Main SVG for Graph (a.k.a Box)
      let mySVG = d3.select(".bar")
                      .style({"border": "red 5px solid", "height": top + "px", "width": bottom + "px", "margin": "50px auto 0", "display": "block"})
                      .append('svg')
                      .attr("height", top)
                      .attr("width", bottom)
      // TODO: Create Bars
      let createBar = () => {
        mySVG.append('line')
                .style({"stroke": "black", "stroke-width": width})

      }
      // Makes the Max Range for X Axis
      let makeXRange = (start, end, width) => {
        return d3.time.scale().domain([start, end]).range([0, width])
      }
      // Makes the Max Range for Y Axis
      let makeYRange = (height, data) => {
        return d3.scale.linear().domain([0, d3.max(data, (req) => {
          return req[1]
        })]).range([height, 0])
      }
      // Make X Axis
      let makeXAxis = (x) => {
        d3.svg
          .axis()
          .scale(x)
          .orient("bottom")
          .ticks(d3.time.years, 5)
      }
      // Make Y Axis
      let makeYAxis = (y) => {
        d3.svg
          .axis()
          .scale(y)
          .orient("left")
          .ticks(20, "")
      }

      // Making Y & X
      let y;
      let x;

      // Binds Description to the Bottom of the Screen
      let bindDescription = (text) => {
        d3.select(".description").style({"font-size": "12px", "text-align": "center", "color": "gray", "margin": "20px auto", "padding": "0px 40px"}).append("text").text(text);
      }
      // Produce Actual graph

      let generate = (data, x, barWidth) => {
        let graphManifest = d3.select(".graph")
                                .attr({"width": width, "height": height})
                                .append("txt")
        graphManifest.append("txt")
          .attr({"class": "xAxis axis", "transform": "translate(0," +height+")"})
          .call(x)
        graphManifest.append("txt")
          .attr({"class": "yAxis axis", "transform": "rotate(-90)", "y": 13, "dy": "0.777em"})
          .append("text")
          .text("Gross Domestic Product in the USA")
          .style("text-anchor", "end")

        // Make Graph With Data
        graphManifest.selectAll(".graphBar")
          .data(data)
          .enter()
          .append("rect")
          .attr({"class": "graphBar", "x": (req) => {
            return x(new Date(req[0]));
          }, "y": (req) => {
            return y(req[1])
          }, "height": (req) => {
            return height - y(req[1])
          }, "width": barWidth})
      }


      // Binds CSS to Main Title
      d3.select("h1")
        .style({"color": "skyblue", "font-size": "40px", "text-align": "center"})

      let data = res.data;
      let minDate = new Date(data[0][0]);
      let maxDate = new Date(data[data.length - 1][0]);
      const barWidth = Math.ceil(bottom / data.lenth);
      y = makeYRange(height, data);
      x = makeXRange(minDate, maxDate, width)
      bindDescription(res.description)
      generate(data, x, barWidth)



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
