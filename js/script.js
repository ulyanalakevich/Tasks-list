{
    let tasks = [
        {
            content: "Spotkanie",
            done: false,
        },
        {
            content: "Masaż",
            done: true,
        },
    ];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent
            },
        ];

        render();
    };


    const removeTask = (index) => {
        tasks = [
            ...tasks.splice(0, index),
            ...tasks.splice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
    render();
};

const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            removeTask(index);
        });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
        toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
        });
    });
};

const renderTasks = () => {
    const taskToHTML = task =>
        `<li class="list__task
        ${task.done && hideDoneTasks ? "list__task--hidden" : ""} ">
          <button class="button button--done js-done">
          ${task.done ? "✓" : ""} 
          </button>
          <span class="list__text ${task.done ? "list__text--done" : ""}">
          ${task.content}
          </span>
          <button class="button button--remove js-remove"> 
          🗑
          </button>
          </li>
          `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
};

const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
        buttonsElement.innerHTML = "";
        return
    }

    buttonsElement.innerHTML = `
    <button class="buttons buttons__button js-toggleHideDoneTasks">
    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button class="buttons buttons__button js-markAllDone"
    ${tasks.every(({ done }) => done) ? "disabled" : ""}>
    Ukończ wszystkie
    </button>
    `;
};


const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
        markAllDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if (toggleHideDoneTasksButton) {
        toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }

};

const render = () => {
    renderTasks();
    renderButtons();


    bindEvents();
    bindButtonsEvents();
};


const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();

    if (newTaskContent === "") {
        return;
    }

    addNewTask(newTaskContent);
    newTask.value = "";
    newTask.focus();
};

const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
};

init();

}
