{
    const tasks = [
        {
            content: "Pojechać na spotkanie",
            done: false,
        },
        {
            content: "Masaż",
            done: true,
        },
    ];

    const addNewTask = () => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };


    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

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


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
                `<li class="list__task">
          <button class="button__done js-done">
          ${task.done ? "✓" : ""}
          </button>
          <span class="list__text ${task.done ? "list__task--done" : ""}>
          ${task.content}
          </span>
          <button class="button__remove js-remove">🗑</button>
          </li>
          `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}