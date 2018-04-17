function store_annotations() {
  for (var key in annotations_map) {
    var username = firebase.auth().currentUser.email.split('@')[0];
    console.log(key);
    firebase.database().ref('users/' + username + '/' + key).set(annotations_map[key])
  }
}

function display_annotations() {
  //var ref = firebase.database().ref('users/');
  var ref = firebase.database().ref('users/');
  ref.on('value', function(snapshot) {
    console.log(snapshot);
  });
}

function store_data(passForm) {
  var data = document.getElementById("resp").value;
  var exportLink = document.createElement('a');
  exportLink.download = 'answers_ipcrowd.csv';
  exportLink.setAttribute('href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(data));

  var event = new MouseEvent('click');
  exportLink.dispatchEvent(event);
}

function get_points() {
  console.log("hiiiiii");
  var results = 0;
  var username = firebase.auth().currentUser.email.split('@')[0];
  var currentPoints = firebase.database().ref('users/' + username);
  currentPoints.on('value', function(snapshot) {
      var value = snapshot.val();
      results = value.points;

  });
  return results;

}

function write_points(value, username) {
  firebase.database().ref('users/' + username).set(value);
}

function update_points() {
  var runs = 0;
  var username = firebase.auth().currentUser.email.split('@')[0];
  var currentPoints = firebase.database().ref('users/' + username);
  currentPoints.on('value', function(snapshot) {
    if (runs == 0){
      var value = snapshot.val();
      value.points += 1;
      runs += 1
      write_points(value, username)
    }

  });

  // console.log(currentPoints)
  // var newPoints = currentPoints + 1;

  // console.log("HELLO THERE")
}

function store_csv() {
  var a = [['x','y','width','height']];
  var b = ['text'];
  for (var i = 0; i < annotations.length; i++) {
    a.push([annotations[i].x, annotations[i].y, annotations[i].width, annotations[i].height]);
    b.push(txts[i]);
  }

  var csvRows = []
  for (var i = 0; i < a.length; i++) {
    csvRows.push(a[i] + ',' + b[i]);
  }

  var csvVals = csvRows.join("\n");
  console.log(csvVals);
  var annos = document.createElement('a');
  annos.download = 'annotations_ipcrowd.csv';
  annos.setAttribute('href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csvVals));

  var event = new MouseEvent('click');
  annos.dispatchEvent(event);
}

var annotations_map = new Object()

function generate_id(annotation) {
  var id = annotation.text.substring(0,1) + annotation.text.length;
  var randint = Math.floor(Math.random() * 10000);
  id += randint + annotation.text.substring(annotation.text.length - 1, annotation.text.length);
  return id;
}

function handle_data() {
  anno.addHandler('onAnnotationCreated', function(annotation) {
    var geometry = annotation.shapes[0].geometry;
    console.log(annotation);
    unique_id = generate_id(annotation);
    annotations_map[unique_id] = annotation;
    console.log(annotations_map);
  });
  anno.addHandler('onAnnotationRemoved', function(annotation) {
    var del_id = 0;
    var found = false;
    for (var key in annotations_map) {
      console.log(annotations_map);
      console.log(key);
      if (annotations_map[key].shapes[0].geometry == annotation.shapes[0].geometry) {
        found = true;
        del_id = i;
      }
    }
    if (del_id > -1 && found) {
      delete annotations_map[del_id];
    }
  });
  anno.addHandler('onAnnotationUpdated', function(annotation) {
    var update_id = 0;
    var found = false;
    for (var key in annotations_map) {
      if (annotations_map[key].shapes[0].geometry == annotation.shapes[0].geometry) {
        found = true;
        update_id = i;
      }
    }
    if (update_id > -1 && found) {
      annotations_map[update_id] = annotation;
    }
  });
}
