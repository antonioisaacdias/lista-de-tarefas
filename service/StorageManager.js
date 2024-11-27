export class StorageManager {
    #localStorageDataName = "quicklist"

    saveItems (taskList) {
        const tasks = []
        taskList.getTasks().forEach(element => {
            const name = element.getName()
            const check = element.getCheck()
            const date = element.getDate()
            const task = [name, check, date]
            tasks.push(task)
        });

        localStorage.setItem(this.#localStorageDataName, JSON.stringify(tasks))
    }

    fetchItems () {
        const i = JSON.parse(localStorage.getItem(this.#localStorageDataName))
        if (i != null) {
            return i
        } else {
            return []
        }
        
    }

    deleteItems () {
        localStorage.removeItem(this.#localStorageDataName)
    }

}