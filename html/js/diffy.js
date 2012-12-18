var Diffy = function Diffy(diffString) {
  var metadata = /^(---|\+\+\+|\\\\)/;
  var linesData = /^@@/;
  var diff = "^diff --git a/*(.*) b";
  var pointers = /^index ([0-9a-zA-z]+)..([0-9a-zA-z]+)/;
  var added = /^\+(\w|\s|$)/;
  var deleted = /^\-(\w|\s|$)/;

  var data = diffString.split("\n");
  var files = {};
  var fileNumber = 0;

  for(var i = 0; i < data.length; i++) {
    var line = data[i];

    switch(true) {
      case !!line.match(diff):
        var fileName = line.match(diff)[1];
        files[fileName] = [];
        break;

      case !!line.match(pointers):
      case !!line.match(metadata):
        break;

      case !!line.match(linesData):
        files[fileName].push( "<pre class='metadata'>" + line + "</pre>");
        break;

      case !!line.match(added):
        files[fileName].push( "<pre class='added'>" + line + "</pre>");
        break;

      case !!line.match(deleted):
        files[fileName].push( "<pre class='deleted'>" + line + "</pre>");
        break;

      default:
        files[fileName].push( "<pre class='unchanged'>" + line + "</pre>");
        break;
    }
  }

  console.info(files);
  return files;
};

Diffy.File = function DiffyFile() {};

Diffy.prototype = {
  each: function(fn) {},
}
