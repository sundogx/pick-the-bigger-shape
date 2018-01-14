var globals = {
    score: 0,
    active: false,
    dimensions: {x: 200, y: 200, },
};
var add = function(first_point, second_point){
    return {x:first_point.x+second_point.x,y:first_point.y+second_point.y,};
}
var signed_twice_area = function(points){

    var ans = 0;
    for(var i = 0;i<points.length;i++){
        ans+=points[i].x*points[(i+1)%points.length].y;
        ans-=points[i].y*points[(i+1)%points.length].x;
    }
    return ans;
}

var gen_sides = function(num_points){
    var edges = [];
    var edge_sum = {x:0,y:0,};
    for(var i = 0;i<num_points;i++){
        edges.push({x:Math.random(),y:Math.random()});
        edge_sum = add(edge_sum,edges[edges.length-1]);
    }
    edge_sum.x/=num_points;
    edge_sum.y/=num_points;
    for(var i = 0;i<num_points;i++){
        edges[i].x-=edge_sum.x;
        edges[i].y-=edge_sum.y;
    }
    return edges;
}
var valid_polygon = function(edges){
    var pos = [{x:0,y:0,}];
    for(var i = 0;i<edges.length-1;i++){
        pos.push(add(pos[i],edges[i]));
    }
    //pos[0] = (0,0)
    //pos[1] = (0,0)+edges[0]
    for(var i = 0;i<edges.length;i++){
        for(var j = i+2;j<edges.length;j++){
            if((Math.abs(i-j)%edges.length)==1) continue;
            if(edge_intersect(pos[i],edges[i],pos[j],edges[j])){
                return false;
            }
        }
    }
    return true;
}
var edge_intersect = function(first_pos, first_edge, second_pos,second_edge){
    var first_begin = first_pos;
    var first_end = add(first_pos,first_edge);
    var second_begin = second_pos;
    var second_end = add(second_pos,second_edge);
    if(signed_twice_area([first_begin,second_begin,second_end])*signed_twice_area([first_end,second_begin,second_end])>0) return false;
    if(signed_twice_area([second_begin,first_begin,first_end])*signed_twice_area([second_end,first_begin,first_end])>0) return false;
    return true;
}
var gen_convex_polygon = function(dimensions, concave = false) {
    var num_points = 5;
    var concave_tries = 1000;
    if(concave){
        while(concave_tries>0){
            edges = gen_sides(num_points);
            if(valid_polygon(edges)){
                break;
            }
            concave_tries--;
        }
        if(concave_tries==0){
            edges = gen_sides(num_points);
            edges.sort(function(pt1,pt2){
                return Math.atan2(pt1.x,pt1.y)-Math.atan2(pt2.x,pt2.y);
            });
        }
    }
    else{
        edges = gen_sides(num_points);
        edges.sort(function(pt1,pt2){
            return Math.atan2(pt1.x,pt1.y)-Math.atan2(pt2.x,pt2.y);
        });

    }
    var points = [];
    var min_x = 0;
    var min_y = 0;
    var max_x = 0;
    var max_y = 0;
    points.push({x:0,y:0,});
    for(var i = 1;i<num_points;i++){
        points.push( {x:points[i-1].x + edges[i-1].x, y:points[i-1].y + edges[i-1].y,});
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
    return Math.abs(signed_twice_area(points));
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

var show_polygons = function(concave) {
    $('#shape0').data('dimensions', globals.dimensions);
    $('#shape0').data('points', gen_convex_polygon(globals.dimensions,concave));
    draw_shape($('#shape0'));

    $('#shape1').data('dimensions', globals.dimensions);
    $('#shape1').data('points', gen_convex_polygon(globals.dimensions,concave));
    draw_shape($('#shape1'));
}

var which_is_bigger = function(points0, points1) {
    if(twice_area(points0)>twice_area(points1)){
        return 0;
    } else{
        return 1;
    }
}

var guess = function(answer, concave) {
    var correct_answer = which_is_bigger(
        $('#shape0').data('points'), $('#shape1').data('points')
    );
    if (answer === correct_answer) {
        globals.score += 1;
    } else {
        end_game();
    }
    if(globals.score>=10){
        concave=true
    }
    show_score();
    show_polygons(concave);
}

var start_game = function() {
    globals.score = 0;
    globals.active = true;
    $('#start-game').addClass('hidden-xl-down');
    $('#game').removeClass('hidden-xl-down');
    show_score();
    show_polygons();
}
$('#start-button').click(start_game);

var end_game = function() {
    globals.active = false;
    $('#score').text(globals.score);
    $('#game').addClass('hidden-xl-down');
    $('#game-over').removeClass('hidden-xl-down');
}

var submit_form = function(){
    var name = $('#name').val();
    var score = $('#score').text();
    $.post("score",{name: name, score: score});
    $('#name').val('');
    $('#game-over').addClass('hidden-xl-down');
    $('#start-game').removeClass('hidden-xl-down');
    start_game();
}
$('#submit-name').click(submit_form);
$('#name').keypress(function(event) {
    if (event.keyCode === 13) { // return
        submit_form();
    }
});

$(document).on("keydown", function (e) {
    if (!globals.active) {
        return;
    }
    if (e.which === 37) {
        guess(0);
    } else if (e.which === 39) {
        guess(1);
    }
});