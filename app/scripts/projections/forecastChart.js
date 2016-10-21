import d3 from 'd3';

export default function(element, data){
  // element size
  var width = element.offsetWidth,
      height = element.offsetHeight;

  var data = data.slice(0).reverse();

  // scale definitions
  var y = d3.scale.linear()
      .range([0,height]);

  var xPercipitation = d3.scale.linear()
      .range([width, 0]);

  var xWind = d3.scale.linear()
      .range([width, 0]);

  // rain area functions
  var areaPercipitation = d3.svg.area()
      .y1(function(d, i) { return xPercipitation(d.precipIntensity); })
      .y0(width)
      .x(function(d, i) { return y(i); });

  // wind area functions
  var areaWind = d3.svg.area()
      .y1(function(d, i) {
        return xWind(d.windSpeed);
      })
      .y0(width)
      .x(function(d, i) { return y(i); });


  // SVG container
  var svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio','xMaxYMax meet')
      .attr('viewBox', '0 0 '+ (width) +' '+ (height))

  // using bar pattern for wind area
  svg.html('<defs><pattern id="windPattern" patternUnits="userSpaceOnUse" width="5" height="5"> \
      <image xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScgLz4KICA8cmVjdCB4PScwJyB5PScwJyB3aWR0aD0nMScgaGVpZ2h0PScxMCcgZmlsbD0nYmxhY2snIC8+Cjwvc3ZnPg=="\
        x="0" y="0" width="5" height="5"></image>\
      </pattern></defs>')

  // perciptation
  xPercipitation.domain([0, 60]);
  //Light rain — when the precipitation rate is < 2.5 mm (0.098 in) per hour
  //Moderate rain — when the precipitation rate is between 2.5 mm (0.098 in) - 7.6 mm (0.30 in) or 10 mm (0.39 in) per hour[105][106]
  //Heavy rain — when the precipitation rate is > 7.6 mm (0.30 in) per hour,[105] or between 10 mm (0.39 in) and 50 mm (2.0 in) per hour[106]
  //Violent rain — when the precipitation rate is > 50 mm (2.0 in) per hour[106]

  // wind scale
  xWind.domain([0, 50]);
  // meters per second (hurricane +/- 24)

  // y scale for 48 hours
  y.domain([0, 48]);


  svg.append('path')
      .datum(data)
      .attr('class', 'areaWind')
      .attr('d', areaWind);

  svg.append('path')
      .datum(data)
      .attr('class', 'areaPercipitation')
      .attr('d', areaPercipitation);
}
