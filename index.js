var path = new Path();
var data = [];

function onMouseDown(event) {
	var x = event.point.x/innerWidth; // mapping from (0-width) --> (0-1)
    var y = 1-(event.point.y/innerHeight);  // mapping from (0-height) --> (1-0)
    var point = new Point(x,y);
    data.push(point);
    dot();
}

function dot(){
    for (var i=0; i<data.length;i++){
        var x = data[i].x*innerWidth;
        var y = (1-data[i].y)*innerHeight;
        var dot = new Path.Circle(new Point(x, y),3);
        dot.fillColor = 'white';
        if (data.length>1){
        LinearRegression();}
    }
}

function LinearRegression(){
    var xsum = ysum = 0;
    for (var i=0;i<data.length;i++){
        xsum += data[i].x;
        ysum += data[i].y;
    };
    var xmean = xsum/data.length;
    var ymean = ysum/data.length;

    var num = den = 0;
    for (var i=0;i<data.length;i++){
        num += (data[i].x-xmean)*(data[i].y-ymean);
        den += (data[i].x-xmean)*(data[i].x-xmean);
    };
    var m = (num/den)
    var c = ymean-m*xmean;

    // Regression Line
    drawline(m,c);
}

var line = new Path.Line({
    from: new Point(0,0),
    to: new Point(0,0),
    strokeColor: 'red'
});


function drawline(m,c){
    var x1 = 0;
    var y1 = m*x1+c;
    var x2 = 1;
    var y2 = m*x2+c;

    x1 = x1*innerWidth;
    y1 = innerHeight*(1-y1);
    x2 = x2*innerWidth;
    y2 = innerHeight*(1-y2);


    line.segments[0].point = new Point(x1,y1);
    line.segments[1].point = new Point(x2,y2);
}