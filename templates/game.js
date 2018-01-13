var globals = {
 	score: 0,
 	dimensions: {x: 200, y: 200, },
};

var gen_convex_polygon = function(dimensions) {
	// TODO
	return [{x:50, y:50,}, {x:100, y:100,}, {x:150, y:50},]
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
	$('#shape0').data('points', gen_convex_polygon());
	draw_shape($('#shape0'));

	$('#shape1').data('dimensions', globals.dimensions);
	$('#shape1').data('points', gen_convex_polygon());
	draw_shape($('#shape1'));
}

var which_is_bigger = function(points0, points1) {
	// TODO
	return 1;
}

var guess = function(answer) {
	var correct_answer = which_is_bigger(
		$('#shape0').data('points'), $('#shape1').data('points')
	);
	if (answer === correct_answer) {
		globals.score += 1;
	} else {
		globals.score = 0;
	}
	show_score();
	show_polygons();
}

show_score();
show_polygons();