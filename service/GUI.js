import { Task } from "../models/Task.js"
import { TaskList } from "../models/TaskList.js"
import { StorageManager } from "./StorageManager.js"

export class GUI {
    #list = document.querySelector("ul")
    #newTask = document.getElementById("new-item")
    #form = document.querySelector("form")
    #warning = document.querySelector(".warning-wrapper")

    #taskList = new TaskList()
    #storage = new StorageManager()

    constructor () {
        this.#form.addEventListener("submit", (event) => {
            event.preventDefault()
            const taskName = this.newTaskNameCapture()
            if(taskName !== "") {
                if(!this.#taskList.doesTaskAlreadyExist(taskName)) {
                    console.log("tarefa cadastrada com sucesso!")
                    this.buildTask(taskName)
                } else {
                    alert("Essa tarefa já existe na lista!")
                }
                
            } else {
                alert("Insira um nome para a nova tarefa!")
            }
            
        })
        this.#warning.querySelector("button").addEventListener("click", () => {
            this.#warning.style.display = "none"
        })

        this.rememberSavedTasks()

        console.log("Storage: " + this.#storage.fetchItems())
        console.log("Task List: " + this.#taskList.getTasks())
    }

    buildTask (taskName) {
        const li = this.createTaskElement(taskName)
        const task = new Task(taskName)
        this.#taskList.addTask(task)
        this.checkboxEngine(li, task)
        this.#list.append(li)
        this.#storage.saveItems(this.#taskList)
    }

    checkboxEngine (li , task) {
        const checkbox = li.querySelector("input[type='checkbox']")
        checkbox.addEventListener("change", () => {
            if(checkbox.checked) {
                task.setCheck(1)
                console.log(task)
            } else {
                task.setCheck(0)
                console.log(task)
            }
            this.#storage.saveItems(this.#taskList)
        })
    }

    createTaskElement (taskName) {
        document.createElement("li")
        const li = document.createElement("li");
        li.classList.add("task")
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const checkImage = document.createElement("span");
        checkImage.classList.add("check-image");
        const checkWrapper = document.createElement("span");
        checkWrapper.classList.add("check-wrapper");
        checkWrapper.append(checkbox, checkImage);
        const p = document.createElement("p");
        p.textContent = taskName;
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            this.deleteTask(li,taskName)
        })
        li.append(checkWrapper, p, button);
        return li
    }

    newTaskNameCapture () {
        const taskName = this.#newTask.value
        this.#newTask.value = ""
        return taskName
    }

    deleteTask (li, taskName) {
        const warning = confirm("Tem certeza que deseja excluir a tarefa?")
        if (warning) {
            li.remove()
            this.#taskList.removeTask(taskName)
            this.#storage.saveItems(this.#taskList)
            this.#warning.style.display = "flex"
            console.log("Tarefa excluída da lista com sucesso!")
        }
    }


    rememberSavedTasks () {
        const storageTasks = this.#storage.fetchItems()
        storageTasks.forEach(element => {
            const name = element[0]
            const check = element[1]
            const date = element[2]
            const task = new Task(name, check, date)
            this.#taskList.addTask(task)
            console.log(task)
        });

        const taskList = this.#taskList.getTasks()
        taskList.forEach((task) => {
           const li = this.createTaskElement(task.getName())
           
           this.checkboxEngine(li, task)

           const checkbox = li.querySelector("input[type='checkbox']")
           if (task.isChecked() == true) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }
           this.#list.append(li)
        })

    }

    clearTaskList() {
        this.#taskList.setTasks([])
        this.#storage.saveItems(this.#taskList)
    }
}