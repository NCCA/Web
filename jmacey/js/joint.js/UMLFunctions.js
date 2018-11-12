var uml = joint.shapes.uml;
var graph = new joint.dia.Graph();

var paper;
function initUML(_element='#paper', _w=1024, _h=800, _interactive='true')
{

  paper = new joint.dia.Paper({
      el: $(_element),
      width: _w,
      height: _h,
      gridSize: 10,
      model: graph,
      interactive: _interactive

  });

}

function addToGraph(_data)
{
  _.each(_data, function(c) { graph.addCell(c); });
}

function addText( _x ,  _y,   _string, _fontSize=30)
{

var rect =  new joint.shapes.basic.Rect({
        position: { x: _x, y: _y },
        attrs: { rect: { fill: 'white', 'visibility': 'hidden' }, 
        text: { text: _string , fill: 'black' ,'font-size': _fontSize} }
    })

return rect;
}

function createClass(_name, _x, _y, _w, _h, _attr, _methods)
{

  var umlClass= new uml.Class({
        position: { x: _x  , y: _y },
        size: { width: _w, height: _h },
        name: _name,
        attributes: _attr,
        methods: _methods,
        title : "a class",
       attrs: {
          '.uml-class-name-rect' : { fill : '#f2f2f2'},
          '.uml-class-attrs-rect' : { fill : '#ffffff'},
          '.uml-class-methods-rect' : { fill : '#ffffff'},          
        }

    });
    return umlClass;
}

function createAbstractClass(_name, _x, _y, _w, _h, _attr, _methods)
{

  var umlClass= new uml.Abstract({
        position: { x: _x  , y: _y },
        size: { width: _w, height: _h },
        name: _name,
        attributes: _attr,
        methods: _methods,
        title : "a class",
       attrs: {
          '.uml-class-name-rect' : { fill : '#f2f2f2'},
          '.uml-class-attrs-rect' : { fill : '#ffffff'},
          '.uml-class-methods-rect' : { fill : '#ffffff'},          
        }

    });
    return umlClass;
}


function createRectangle(_name,_x, _y, _w, _h, _text)
{
  return new joint.shapes.basic.Rect({
    name: _name,
    position: { x: _x, y: _y },
    size: { width: _w, height: _h },
    attrs: { rect: { fill: 'white' } , text: { text: _text, fill: 'black' } }
    
    
});
}

function addGeneralization(_class1, _class2)
{
   return new uml.Generalization({ source: { id: _class1 }, target: { id: _class2 }});

}

function addImplementation(_class1, _class2)
{
   return new uml.Implementation({ source: { id: _class1 }, target: { id: _class2 }});
}

function addAggregation(_class1, _class2)
{
   return new uml.Aggregation({ source: { id: _class1 }, target: { id: _class2 }});

}

function addComposition(_class1, _class2)
{
   return new uml.Composition({ source: { id: _class1 }, target: { id: _class2 }});

}


function createCodeDiv(_id, _title, _source)
{
  var div = document.createElement('div');
  var source="<pre><code class='c++'  >"
  source+=_source;
  source+="</pre></code>";
  div.innerHTML = source;
  
// better to use CSS though - just set class
div.setAttribute('id', _id); // and make sure myclass has some styles in css
div.setAttribute('title', _title); // and make sure myclass has some styles in css

document.body.appendChild(div);
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function createCodeDivFromFile(_id, _title,_codeBlockName, _file)
{
  //console.log(_codeBlockName);
  var div = document.createElement('div');
  div.setAttribute('id', _id); // set id which should be used later for hiding
  div.setAttribute('title', _title);  // shown in the dialog as using jQuery

  var source="<pre id="+_codeBlockName+"></pre>";
  div.innerHTML = source;
  
  document.body.appendChild(div);
$.ajax({
  url: _file,
  success: function(data) {
    data=escapeHtml(data);
    var code = $("<code >" + data + "</code>");
    $("#"+_codeBlockName).html(code);
  hljs.highlightBlock(document.getElementById(_codeBlockName));

  }
})
 
}
