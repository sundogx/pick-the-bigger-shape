var globals = {
 	score: 0,old_score:0
 	dimensions: {x: 200, y: 200, },
};

var gen_convex_polygon = function(dimensions) {
	// TODO
	var num_points = 5;
    var edges =[];
    var sum_vec = {x:0,y:0,};
    for(var i = 0;i<num_points;i++){
        edges.push({x:Math.random(),y:Math.random()});
        sum_vec.x+=edges[edges.length-1].x;
        sum_vec.y+=edges[edges.length-1].y;
    }
    sum_vec.x/=num_points;
    sum_vec.y/=num_points;
    
    for(var i = 0;i<num_points;i++){
        edges[i].x-=sum_vec.x;
        edges[i].y-=sum_vec.y;
    }
    edges.sort(function(pt1,pt2){
        return Math.atan2(pt1.x,pt1.y)-Math.atan2(pt2.x,pt2.y);
    });
    
    var points = [];
    var min_x = 0;
    var min_y = 0;
    var max_x = 0;
    var max_y = 0;
    points.push({x:0,y:0,});
    for(var i = 1;i<num_points;i++){
        points.push( {x:points[i-1].x + edges[i].x, y:points[i-1].y + edges[i].y,});
        min_x = Math.min(min_x, points[i].x);
        min_y = Math.min(min_y, points[i].y);
        max_x = Math.max(max_x, points[i].x);
        max_y = Math.max(max_y, points[i].y);
    }
    for(var i  = 0;i<num_points;i++){
        points[i].x = dimensions.x*(points[i].x-min_x)/(max_x-min_x);
        points[i].y = dimensions.y*(points[i].y-min_y)/(max_y-min_y);
    }
    return points;

}

var twice_area = function(points){
	var ans = 0;
	for(var i = 0;i<points.length;i++){
		ans+=points[i].x*points[(i+1)%points.length].y;
		ans-=points[i].y*points[(i+1)%points.length].x;
	}
	return Math.abs(ans);

}
var shape_html = function(dimensions, points) {
    var points_stringify = "'";
    for (var i=0; i<points.length; i++) {
        points_stringify += points[i].x + "," + points[i].y + " "
    }
    points_stringify += "'";

    var html = "";
    html += "<svg height="+dimensions.x+" width="+dimensions.y+">";
    html += "<polygon points=" +points_stringify + "style='border: 1px solid #808080'"
    html += "</svg>"
    return html
}

var draw_shape = function(shape) {
	var html = shape_html(shape.data('dimensions'), shape.data('points'));
	shape.html(html);
}

var show_score = function() {
	$('#score_field').text('Your score is: '+globals.score);
}

var show_polygons = function() {
	$('#shape0').data('dimensions', globals.dimensions);
	$('#shape0').data('points', gen_convex_polygon(globals.dimensions));
	draw_shape($('#shape0'));

	$('#shape1').data('dimensions', globals.dimensions);
	$('#shape1').data('points', gen_convex_polygon(globals.dimensions));
	draw_shape($('#shape1'));
}

var which_is_bigger = function(points0, points1) {
	// TODO
	if(twice_area(points0)>twice_area(points1)){
		return 0;
	}
	else{
		return 1;
	}
}

var guess = function(answer) {
	var correct_answer = which_is_bigger(
		$('#shape0').data('points'), $('#shape1').data('points')
	);
	if (answer === correct_answer) {
		globals.score += 1;
	} else {
        $('#score').text(globals.score);
        globals.old_score = globals.score;
		globals.score = 0;
        
	}
	show_score();
	show_polygons();
}

show_score();
show_polygons();