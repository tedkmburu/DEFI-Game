// var mongo = require('mongodb'),
//   Server = mongo.Server,
//   Db = mongo.Db;
// var server = new Server('localhost', 27017, {
//   auto_reconnect: true
// });
// var db = new Db('euro2012', server);
// var onErr = function(err, callback) {
//   db.close();
//   callback(err);
// };
// exports.teamlist = function(gname, callback) {
//   db.open(function(err, db) {
//     if (!err) {
//       db.collection('teams', function(err, collection) {
//         if (!err) {
//           collection.find({
//             'GroupName': gname
//           }).toArray(function(err, docs) {
//             if (!err) {
//               db.close();
//               var intCount = docs.length;
//               if (intCount > 0) {
//                 var strJson = "";
//                 for (var i = 0; i < intCount;) {
//                   strJson += '{"country":"' + docs[i].country + '"}'
//                   i = i + 1;
//                   if (i < intCount) {
//                     strJson += ',';
//                   }
//                 }
//                 strJson = '{"GroupName":"' + gname + '","count":' + intCount + ',"teams":[' + strJson + "]}"
//                 callback("", JSON.parse(strJson));
//               }
//             } else {
//               onErr(err, callback);
//             }
//           }); //end collection.find 
//         } else {
//           onErr(err, callback);
//         }
//       }); //end db.collection
//     } else {
//       onErr(err, callback);
//     }
//   }); // end db.open
// };



// // [
// //   {
// //     "_id": "1f704bc5-5055-43eb-a851-c87b6b0bf7b9",
// //     "class_name": "PHYS101-1",
// //     "access_code": "adsf",
// //     "devices": [
// //       {
// //         "_id": "1f704bc5-5055-43eb-a851-c87b6b0bf7b9",
// //         "student_name": "string",
// //         "attempts": [
// //           {
// //             "_id": "1f704bc5-5055-43eb-a851-c87b6b0bf7b9",
// //             "level": "string",
// //             "track": "string",
// //             "stars_collected": 0,
// //             "score": 0,
// //             "time": 0,
// //             "timestamp": "2019-08-24"
// //           }
// //         ]
// //       }
// //     ]
// //   }
// // ]

//line segment intersection math
/*
General Variables:
  x = x-value
  y = y-value
  ep = endpoint (indexed 1 & 2)
  p = point
  t = proportion along line segment (0 <= t <= 1)
Equation of line segment:
  p = ep1 + t(ep2 - ep1)
  px = s1[0].x + t(s1[1].x - s1[0].x)
  py = s1[0].y + t(s1[1].y - s1[0].y)
Specific Variables:
  Line segment 1 (s1)-
    [0] = endpoint 1
    [1] = endpoint 2
    t[0] = proportion along s1 (0 <= t[0] <= 1)
  Line segment 2 (s2)-
    [0] = endpoint 1
    [1] = endpoint 2
    t[1] = proportion along s2 (0 <= t[1] <= 1)
Find Intersection:
--> Intersect @ p where:
      ep1 + t[0](ep2 - ep1) = ep3 + t[1](ep4 - ep3)
    as long as:
      0 <= t[0], t[1] <= 1
    if (t[0], t[1] > 1) || (t[0], t[1] < 0) => they would intersect if full lines
                                       rather than segments
    if t[0], t[1] cannot be determined => they either intersect 0 or infinitely
                                      many times
    Solve for t[0] & t[1]
      s1[0].x + t[0](s1[1].x - s1[0].x) = s2[0].x + t[1](s2[1].x - s2[0].x)
      s1[0].y + t[0](s1[1].y - s1[0].y) = s2[0].y + t[1](s2[1].y - s2[0].y)
      ...
      s1[0].x - s2[0].x = t[1](s2[1].x - s2[0].x) - t[0](s1[1].x - s1[0].x)
      s1[0].y - s2[0].y = t[1](s2[1].y - s2[0].y) - t[0](s1[1].y - s1[0].y)
      ...
      |‾ (s1[0].x - s2[0].x) ‾| _ |‾ (s2[1].x - s2[0].x), -(s1[1].x - s1[0].x) ‾||‾ t[1] ‾|
      |_ (s1[0].y - s2[0].y) _| ‾ |_ (s2[1].y - s2[0].y), -(s1[1].y - s1[0].y) _||_ t[0] _|
      ...
      |‾ t[1] ‾| _ |‾ (s2[1].x - s2[0].x)  (s1[0].x - s1[1].x) ‾|-1|‾ (s1[0].x - s2[0].x) ‾|
      |_ t[0] _| ‾ |_ (s2[1].y - s2[0].y)  (s1[0].y - s1[1].y) _|  |_ (s1[0].y - s2[0].y) _|
      Compute Inverse:
        A = |‾ a  b ‾|
            |_ c  d _|
        det(A) = ad-bc
        A^(-1) = (___1̲___)|‾ d  -b ‾|
                 ( det(A))|_ -c  a _|
      |‾ t[1] ‾| _ (_______________________________________1̲_______________________________________)|‾ (s1[0].y - s1[1].y)  (s1[1].x - s1[0].x) ‾||‾ (s1[0].x - s2[0].x) ‾|
      |_ t[0] _| ‾ ((s2[1].x - s2[0].x)(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)(s2[1].y - s2[0].y))|_ (s2[0].y - s2[1].y)  (s2[1].x - s2[0].x) _||_ (s1[0].y - s2[0].y) _|
      ...
    Solution:
    var t[0] =  ((s2[0].y - s2[1].y)*(s1[0].x - s2[0].x) + (s2[1].x - s2[0].x)*(s1[0].y - s2[0].y))/
              ((s2[1].x - s2[0].x)*(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)*(s2[1].y - s2[0].y)),
        t[1] =  ((s1[0].y - s1[1].y)*(s1[0].x - s2[0].x) + (s1[1].x - s1[0].x)*(s1[0].y - s2[0].y))/
              ((s2[1].x - s2[0].x)*(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)*(s2[1].y - s2[0].y));
*/

var canvas, ctx, mx, my;
var color = "#000000";
var poly1, poly2;

function load() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize();

  setInterval(draw, 50);
}
function resize() {
  canvas.height = window.innerHeight;
  canvas.width = document.body.offsetWidth;
}

window.addEventListener('mousemove', function(event) {
  mx = event.clientX;
  my = event.clientY;
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  poly1 = polygon(canvas.width/2,canvas.height/2,80,8);
  poly2 = polygon(mx,my,25,6);
  if(collide(poly1,poly2)) {
    color = "#ff0000";
  }
  else {
    color = "#000000";
  }
  ctx.fillText(mx + ", " + my, 10, 10);
}

function polygon(x,y,r,s) {
  var a = Math.PI*3/2;
  var points = [];
  var sides = []; // [[{x,y},{x,y}], ...]
  var max = {x:0,y:0};
  var min = {x:Infinity,y:Infinity};
  ctx.beginPath();
  for(var i = 0; i <= s; i++) {
    var px = x + r*Math.cos(a), py = y + r*Math.sin(a);
    if(i === 0) {
      ctx.moveTo(px,py);
    }
    else {
      ctx.lineTo(px,py);
      sides.push([{x: points[i-1].x, y: points[i-1].y},{x: px, y: py}])
    }
    if(px > max.x) {max.x = px;}
    if(py > max.y) {max.y = py;}
    if(px < min.x) {min.x = px;}
    if(py < min.y) {min.y = py;}
    points.push({x: px,y:py});
    a += Math.PI*2/s;
  }
  points.pop();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  return {p:points, s:sides,max,min};
}

function collide(p1,p2) {
  for(var i in p1.s) {
    for(var j in p2.s) {
      var t = intersect(p1.s[i],p2.s[j]);
      if(t === 'collinear') {continue;}
      if(t[0] <= 1 && t[0] >= 0 && t[1] <= 1 && t[1] >= 0) {
        return true;
      }
    }
  }
  return false;
}
function intersect(s1,s2) {
  if(((s2[1].x - s2[0].x)*(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)*(s2[1].y - s2[0].y)) === 0) {
    return 'collinear';
  }
  var tA =  ((s2[0].y - s2[1].y)*(s1[0].x - s2[0].x) + (s2[1].x - s2[0].x)*(s1[0].y - s2[0].y))/
            ((s2[1].x - s2[0].x)*(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)*(s2[1].y - s2[0].y)),
      tB =  ((s1[0].y - s1[1].y)*(s1[0].x - s2[0].x) + (s1[1].x - s1[0].x)*(s1[0].y - s2[0].y))/
            ((s2[1].x - s2[0].x)*(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)*(s2[1].y - s2[0].y));
  return [tA, tB];
}