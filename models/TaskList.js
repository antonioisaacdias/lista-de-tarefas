export class TaskList {
    #tasks = []
    constructor (){

    }

    addTask (task){
        this.#tasks.push(task)
    }

    removeTask (taskName){
        const indice = this.#tasks.findIndex(item => item.getName() === taskName)
        if (indice !== -1) {
            this.#tasks.splice(indice, 1)
        }
    }
    
    doesTaskAlreadyExist (taskName) {
        const exist = this.#tasks.some(task => task.getName() === taskName)
        return exist
    }

    getTasks (){
        const tasks = this.#tasks
        return tasks
    }

    setTasks (tasks){
        this.#tasks = tasks
    }
}