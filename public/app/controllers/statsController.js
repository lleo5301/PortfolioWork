


app.controller('statsController', ['$scope', '$http', function($scope, $http){
	//start with preloader
	$scope.loading = true;

	//get icon links
	// $http.get('api/icons').then(function(res){
	// 	$scope.icons = res.data;
	// })
	//get simple data //chain
	$http.get('http://leoqz.me:8446/api/aggregate/byProduct').then(function(res){
		// console.log(res.data);
		$scope.byProduct = res.data;
		return res.data;
	}).then(createChart).then(function(){
		//get year data
		$http.get('http://leoqz.me:8446/api/aggregate/byyear').then(function(res){
			$scope.byYear = res.data;
			return res.data;
		}).then(createLine);
	}).then(function(){
		$http.get('http://leoqz.me:8446/api/aggregate/byyearandproduct').then(function(res){
			$scope.byYearP = res.data;
			return res.data;
		}).then(createMultiSeries);
	}).then(removePreloader);

	

	function removePreloader(){
		$scope.loading=false;
	}


	function createChart(data){
		// console.log(data);
		//d3 functions
		var margin = {top:20, right:0, bottom:150, left:100},
			width = 1080 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(20);

		var svg = d3.select("#products").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x.domain(data.map(function(d){return d.product}));
		y.domain([0, d3.max(data, function(d){return d.total;})]);

		// append x axis
		svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .attr("text-anchor", "end")
	      .call(xAxis)
	      	.selectAll("text")
	      	.style("text-anchor", "end")
	      	.attr("transform", "rotate(-45)");


		//append y axis
		svg.append("g")
			.attr("class", "x axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Total");

		//create bars
		svg.selectAll('.bar')
		   .data(data)
		   .enter().append("rect")
		   .attr('class', 'bar')
		   .attr('x', function(d){return x(d.product);})
		   .attr('width', x.rangeBand())
		   .attr('y', function(d){return y(d.total);})
		   .attr('height',function(d){return height - y(d.total);});
		   $scope.yearProduct = "Total Complaints by product 2011 - 2015(partial) **Aggregated by product"			
		}

	function createLine(data){
		
		var margin = {top: 100, right: 20, bottom: 30, left: 100},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y").parse;

		var x = d3.time.scale()
			.range([0, width]);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(data.length)

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(20);

		var line = d3.svg.line()
			.x(function(d) {return x(d.year);})
			.y(function(d) {return y(d.total);});

		var svg = d3.select('#years').append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height +  margin.top + margin.bottom)
		  .append("g")
		  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 data.forEach(function(d){
		 	// console.log(parseDate(d.year.toString()));
		 	// var date = d.year;
		 	// console.log(date);
		 	// console.log(parseDate(date.toString()));
		 	d.year = parseDate(d.year.toString());
		 	d.total = d.total;
		 	console.log(d);
		 });

		 x.domain(d3.extent(data, function(d){return d.year}));
		 y.domain(d3.extent(data, function(d){return d.total;}));

		 svg.append("g")
		 	.attr("class", "x axis")
		 	.attr("transform", "translate(0," + height + ")")
		 	.call(xAxis);

		 svg.append("g")
		 	.attr("class", "y axis")
		 	.call(yAxis)
		  .append("text")
		 	.attr("transform", "rotate(-90)")
		 	.attr("y", 6)
		 	.attr("dy", ".71em")
		 	.style("text-anchor", "end")
		 	.text("Total")


		 svg.append("path")
		 	.datum(data)
		 	.attr("class", "line")
		 	.attr("d", line);

		// svg.append("text")
		// 	.attr("x", (width / 2))             
		// 	.attr("y", 0 - (margin.top / 2))
		// 	.attr("text-anchor", "middle")  
		// 	.style("font-size", "16px") 
		// 	.style("text-decoration", "underline")  
		// 	.text("Consumer Complaints by Year");
		$scope.year = "Total Complaints Aggregated Per/Year 2011 - 2015(partial)"
	}

	function createMultiSeries(data){
		console.log('this is being called')
		var margin = {top: 100, right: 20, bottom: 30, left: 100},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;
	    
		var parseDate = d3.time.format("%Y").parse;
		    bisectDate = d3.bisector(function(d) { return d.date; }).left;

		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);


		var color = d3.scale.category10();
		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(20);

		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.total); });

		var svg = d3.select("#series").append("svg")
		    .attr("width", "100%")
		    .attr("height", height + margin.top + margin.bottom)
		  	.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	 	
	 	//get domain 
	 	var domain = [];
	 	//create product index
	 	data.map(function(year){
	 	 	year.products.map(function(product){
	 	 		if(domain.indexOf(product.product) < 0)
	 	 			domain.push(product.product);
	 	 	})
	 	});		
	 	color.domain(domain);
	 	
	 	data.forEach(function(d){
	 		d.date = parseDate(d.year.toString());
	 	});

	 	//get the products
	 	var products = color.domain().map(function(name){
	 		return{
	 			name : name,
	 			values: data.map(function(d){
	 				var toReturn = {
	 					date: d.date,
	 					total: 0 
	 				}
	 				//get total
	 				var p_i = d.products.map(function(x) {return x.product;}).indexOf(name);
	 				// console.log(productIndex);
	 				if(p_i >= 0){
	 					toReturn.total = d.products[p_i].total;
	 				}
	 				return toReturn;
	 			})
	 		}
	 	});
	 	// console.log(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

	 	x.domain(d3.extent(data, function(d){return d.date;}));

	 	y.domain([
	 		d3.min(products, function(c){return d3.min(c.values, function(v){return v.total})}),
	 		d3.max(products, function(c){return d3.max(c.values, function(v){return v.total})})
	 	]);

	 	svg.append("g")
	 		.attr("class", "x axis")
	 		.attr("transform", "translate(0," +  height + ")")
	 		.call(xAxis);

	  	svg.append("g")
	  		.attr("class", "y axis")
	  		.call(yAxis)
	  	  .append("text")
	  	  	.attr("transform", "rotate(-90)")
	  	  	.attr("y",8)
	  	  	.attr("dy", ".71em")
	  	  	.style("text-anchor", "end")
	  	  	.text("Total Complaints")

	  	var product = svg.selectAll(".product")
	  				 .data(products)
	  				.enter().append("g")
	  				 .attr("class", "product")

	  	product.append("path")
	  			.attr("class", "line")
	  			.attr("d", function(d){ return line(d.values); })
	  			.style("stroke", function(d){return color(d.name);});


	  	product.append("text")
	  			.datum(function(d){
	  				return {
	  					name:d.name,
	  					value: d.values[d.values.length - 1]
	  				}
	  			})
	  			.attr("transform", function(d){return "translate(" +
	  												   x(d.value.date) + 
	  												   "," +  y(d.value.total) 
	  												   + "),rotate(-25)";})
	  			.attr("x", 3)
	  			.attr("dy", ".70em")
	  			.text(function(d){return d.name;});
	  			
	  			 var focus = svg.append("g")                                // **********
    						.style("display", "none");   

    			 domain.map(function(c, i){
    			 	 console.log(i);
    			 	 focus.append("circle")                                 // **********
			        .attr("id", "y" + i)                                // **********
			        .style("fill", "none")                             // **********
			        .style("stroke", "blue")                           // **********
			        .attr("r", 4);        
    			 })

    			 $scope.yearAndProduct = "Total Complaints Aggregated Per/Year 2011 - 2015(partial) per/year and product";
				 

	  // 			  svg.append("rect")                                     // **********
			//         .attr("width", width)                              // **********
			//         .attr("height", height)                            // **********
			//         .style("fill", "none")                             // **********
			//         .style("pointer-events", "all")                    // **********
			//         .on("mouseover", function() { focus.style("display", null); })
			//         .on("mouseout", function() { focus.style("display", "none"); })
			//         .on("mousemove", mousemove);     

			//   //mouse move
			//   function mousemove() {

			// 	var x0 = x.invert(d3.mouse(this)[0]);
			// 	var i = bisectDate(data, x0, 1); // gives index of element which has date higher than x0
			// 	var d0 = data[i - 1], d1 = data[i];
			// 	var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
			// 	// console.log(d);
			// 	var products = d.products.map(function(a){return a.total});
			// 	console.log(products);
			// 	var close = d3.max(products);
			// 	console.log(close);

			// 	focus.select("circle.y")
			// 	.attr("transform", "translate(" + x(d.date) + "," + y(close) + ")");

			// 	focus.select("line.y")
			// 		.attr("y2",height - y(close))
			// 		.attr("transform", "translate(" + x(d.date) + "," 
			// 			+ y(close) + ")");

			// 	focus.select("line.x")
			// 	.attr("x2",x(d.date))
			// 	.attr("transform", "translate(0," 
			// 		+ (y(close)) + ")");

			// };

	}

}])