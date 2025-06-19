function addtodo(event){
    const column = event.target.closest(".columns");
    const input = column.querySelector("input");
    const value = input.value.trim();
    if (value === "") return;

    const task = document.createElement("div"); 
    task.setAttribute("class" , "taskdiv");
    task.setAttribute("draggable", "true"); 
    task.id = "task-" + Date.now();

    task.addEventListener("dragstart", (e) => {
       e.dataTransfer.setData("text/plain", task.id);
    });

    const task1 = document.createElement("p"); 
    task1.innerHTML = value;

    const deletebutton = document.createElement("button");
    deletebutton.innerHTML="Delete";
    deletebutton.setAttribute("class" , "task");

    deletebutton.onclick = () => task.remove();

    task.appendChild(task1);
    task.appendChild(deletebutton);
    column.appendChild(task);

    input.value = "";
}

// Set up drag and drop for each column
document.querySelectorAll('.columns').forEach(column => {
  column.addEventListener('dragover', (e) => e.preventDefault());
  column.addEventListener('drop', (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);
    if (task && column !== task.parentNode) {
      column.appendChild(task);
    }
  });
});
