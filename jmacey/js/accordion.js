var lectureNumber=1;

function resetLectureCounter()
{
  lectureNumber=1;
}

function createAccordion(id,name)
{
  var current=document.getElementById('contentText');
  var btn = document.createElement("BUTTON");        // Create a <button> element
  btn.className='accordion';
  var text="<B>Lecture"+lectureNumber+"</B> ";
  lectureNumber++;
  btn.innerHTML=text+name;
  current.appendChild(btn);
  var div= document.createElement("div");
  div.id=id;
  div.className='panel';
  current.appendChild(div);  
}

function createSimpleAccordion(id,name)
{
  var current=document.getElementById('contentText');
  var btn = document.createElement("BUTTON");        // Create a <button> element
  btn.className='accordion';
  btn.innerHTML=name;
  current.appendChild(btn);
  var div= document.createElement("div");
  div.id=id;
  div.className='panel';
  current.appendChild(div);  
}


function appendTabs(parent,tabs,text)
{
  //<div id="tabs" class="tabs">
  var current=document.getElementById(parent);
  var div= document.createElement("div");
  div.id="tabs";
  div.className="tabs";
  //<ul>
 var list=document.createElement("ul");
 var index=0;
  _.each(tabs, function(c) { 
    var item=document.createElement("li");
    var link = "#tabs-"+index;
    index++;
    var element = document.createElement("a");
    element.setAttribute("href", link);
    element.innerHTML = c;
    item.appendChild(element);
    list.appendChild(item);

  });

  div.appendChild(list);
  current.appendChild(div);

  index=0;
  _.each(text, function(c) { 
    var childDiv=document.createElement("div");
    childDiv.id="tabs-"+index;
    index++;
    //console.log(childDiv.id);
    childDiv.innerHTML=c;
    div.appendChild(childDiv);
    
  });

}


function createAccordions()
{
  var acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) 
  {
      acc[i].onclick = function()
      {
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("show");
      }
  }

  acc = document.getElementsByClassName("tabs");
  for (i = 0; i < acc.length; i++) 
  {
    $(acc[i]).tabs();
    $(acc[i]).tabs("option", "active", 0);

  }

}
