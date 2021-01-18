window.onload = function () {
  display_tasks();
};

function display_tasks() {
  //   localStorage.clear();

  console.log("number of tasks", localStorage.length);

  for (var i = 0; i < localStorage.length; i++) {
    var object = JSON.parse(localStorage.getItem(i));

    if (object.isComplete == 1) {
      var list = document.getElementsByClassName("container")[0];
      console.log("inside if statement", list);

      // Div
      var div = document.createElement("div");
      div.className = "list-group-item list-group-item-action";

      // Checkbox
      var fa = document.createElement("i");
      fa.className = "fas fa-check primary";

      //   input.onclick = task_complete;

      //heading
      var heading = document.createElement("span");
      heading.innerHTML = object.task;
      heading.style.fontWeight = "bold";
      heading.style.marginLeft = "1%";

      //details
      var detail_div = document.createElement("div");
      var details = document.createElement("span");
      details.innerHTML = object.description;
      details.style.fontSize = "13px";

      detail_div.style.marginLeft = "2%";
      detail_div.appendChild(details);

      div.appendChild(fa);
      div.appendChild(heading);
      div.appendChild(detail_div);

      console.log("DIV is ready to insert", div);

      list.appendChild(div);
      console.log(typeof list);
    }
  }
}
