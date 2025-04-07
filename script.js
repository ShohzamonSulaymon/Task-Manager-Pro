document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const categoryInput = document.getElementById("categoryInput");
    const taskDate = document.getElementById("taskDate");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".filter-btn");
    let currentFilter = "all";

    const categoryColors = {
        work: "#f28b82",
        personal: "#aecbfa",
        study: "#ccff90",
        default: "#e0e0e0"
    };

    loadTasks();

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

    function addTask() {
        const taskText = taskInput.value.trim();
        const category = categoryInput.value.trim().toLowerCase();
        const taskTime = taskDate.value;
        if (!taskText || !category || !taskTime) return;

        const color = categoryColors[category] || categoryColors["default"];

        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <div class="task-content">
                <span class="category" style="background-color: ${color}">${category}</span>
                <span>${taskText}</span>
                <div class="task-time">${new Date(taskTime).toLocaleString().slice(0, -3)}</div>
            </div>
            <button class="deleteTask">✖</button>
        `;
        taskList.appendChild(li);
        saveTasks();
        filterTasks();
        taskInput.value = "";
        categoryInput.value = "";
        taskDate.value = "";
    }

    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteTask")) {
            e.target.parentElement.remove();
            saveTasks();
            filterTasks();
        }
        if (e.target.classList.contains("task-checkbox")) {
            e.target.parentElement.classList.toggle("done");
            saveTasks();
            filterTasks();
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            filterTasks();
        });
    });

    function filterTasks() {
        Array.from(taskList.children).forEach(task => {
            const isDone = task.classList.contains("done");
            task.style.display = currentFilter === "all" ? "flex" :
                                currentFilter === "active" ? (isDone ? "none" : "flex") :
                                currentFilter === "done" ? (isDone ? "flex" : "none") : "flex";
        });
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector("span:not(.category)").textContent,
            time: li.querySelector(".task-time").textContent,
            category: li.querySelector(".category").textContent,
            done: li.classList.contains("done")
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach(task => {
            const color = categoryColors[task.category] || categoryColors["default"];
            const li = document.createElement("li");
            if (task.done) li.classList.add("done");
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.done ? "checked" : ""}>
                <div class="task-content">
                    <span class="category" style="background-color: ${color}">${task.category}</span>
                    <span>${task.text}</span>
                    <div class="task-time">${task.time}</div>
                </div>
                <button class="deleteTask">✖</button>
            `;
            taskList.appendChild(li);
        });
        filterTasks();
    }
});
