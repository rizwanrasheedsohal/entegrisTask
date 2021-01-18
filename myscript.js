window.onload = function () {
  display_tasks();
  document.getElementById("btn_add_task").onclick = add_task;
  document.getElementById("modal_update").onclick = update_task;
};

function display_tasks() {
  // localStorage.clear();

  //calculating Number of completed tasks
  var counnt = 0;
  for (var i = 0; i < localStorage.length; i++) {
    var object = JSON.parse(localStorage.getItem(i));
    if (object.isComplete == "1") {
      console.log("working");
      counnt++;
    }
  }
  document.getElementById("count").innerHTML = "(" + counnt + ")";

  //Reading tasks from local storage and display it on web
  for (var i = 0; i < localStorage.length; i++) {
    //Read a string object from local storage and convert it to Json object
    var object = JSON.parse(localStorage.getItem(i));

    if (object.isComplete == 0) {
      var list = document.getElementsByClassName("list-group")[0];

      // Div
      var div = document.createElement("div");
      div.className = "list-group-item list-group-item-action";

      // Checkbox
      var input = document.createElement("input");
      input.type = "checkbox";
      input.id = "checkbox";
      input.onclick = task_complete;

      //heading
      var heading = document.createElement("span");
      heading.innerHTML = object.task;
      heading.style.fontWeight = "bold";
      heading.style.marginLeft = "1%";

      //btn_detail
      var iframe = document.createElement("i");
      iframe.className = "far fa-edit";
      var btn_detail = document.createElement("a");
      btn_detail.href = "#";
      btn_detail.onclick = edit_details;
      btn_detail.className = "float-right";
      btn_detail.appendChild(iframe);

      //details
      var detail_div = document.createElement("div");
      var details = document.createElement("span");
      details.innerHTML = object.description;
      details.style.fontSize = "13px";

      detail_div.style.marginLeft = "2%";
      detail_div.appendChild(details);

      div.appendChild(input);
      div.appendChild(heading);
      div.appendChild(btn_detail);
      div.appendChild(detail_div);

      list.appendChild(div);
    }
  }
}

//Add a new task
function add_task() {
  var task_name = document.getElementById("task_name").value;
  document.getElementById("task_name").value = "";
  var list = document.getElementsByClassName("list-group")[0];

  if (task_name.length > 0) {
    // Div
    var div = document.createElement("div");
    div.className = "list-group-item list-group-item-action";

    // Checkbox
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "checkbox";
    input.onclick = task_complete;

    //heading
    var heading = document.createElement("span");
    heading.id = "task";
    heading.innerHTML = task_name;
    heading.style.fontWeight = "bold";
    heading.style.marginLeft = "1%";

    //btn_detail
    var iframe = document.createElement("i");
    iframe.className = "far fa-edit";
    var btn_detail = document.createElement("a");
    btn_detail.href = "#";
    btn_detail.onclick = edit_details;
    btn_detail.className = "float-right";
    btn_detail.appendChild(iframe);

    //details
    var detail_div = document.createElement("div");
    var details = document.createElement("span");
    details.id = "description";
    details.innerHTML = "";
    details.style.fontSize = "13px";

    detail_div.style.marginLeft = "2%";
    detail_div.appendChild(details);

    div.appendChild(input);
    div.appendChild(heading);
    div.appendChild(btn_detail);
    div.appendChild(detail_div);

    list.appendChild(div);
  } else {
    alert("Enter Text");
  }

  //counter for local storage
  for (var i = 0; i < localStorage.length; i++) {
    continue;
  }

  //Json object to store task data
  const task = {
    task: task_name,
    description: "",
    isComplete: 0, // To check weather a task is complete or not
  };

  //store data to local storage in string format
  localStorage.setItem(String(i), JSON.stringify(task));
}

function edit_details(event) {
  //Getting the desired span element on click event
  var task_span = event.target.parentNode.parentNode.childNodes[1];
  var description_span =
    event.target.parentNode.parentNode.childNodes[3].childNodes[0];

  document.getElementById("modal_task").value = task_span.innerHTML;
  document.getElementById("modal_description").value =
    description_span.innerHTML;

  // document.getElementById("model").showModal();
  $("#model").modal("show");

  document.getElementById("modal_update").onclick = function () {
    update_task(task_span, description_span);
  };
}

function update_task(task_span, description_span) {
  var updated_task = document.getElementById("modal_task").value;
  var updated_description = document.getElementById("modal_description").value;

  // console.log(task_span,description_span);
  for (var i = 0; i < localStorage.length; i++) {
    json_object = JSON.parse(localStorage.getItem(i));
    // console.log(task_span.innerHTML,json_object.task);
    if (json_object.task == task_span.innerHTML) {
      json_object.task = updated_task;
      json_object.description = updated_description;
      localStorage.setItem(String(i), JSON.stringify(json_object));
    }
  }
  task_span.innerHTML = updated_task;
  description_span.innerHTML = updated_description;
  $("#model").modal("hide");
}

function task_complete(event) {
  var task = event.target.parentNode.childNodes[1].innerHTML;

  console.log("complete count", parseInt(localStorage.getItem("count")));

  for (var i = 0; i < localStorage.length; i++) {
    json_object = JSON.parse(localStorage.getItem(i));
    // console.log(task_span.innerHTML,json_object.task);
    if (json_object.task == task) {
      json_object.isComplete = 1;
      localStorage.setItem(String(i), JSON.stringify(json_object));
    }
  }
  event.target.parentNode.remove();
}
