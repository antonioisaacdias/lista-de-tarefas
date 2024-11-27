export class Task {
    #check
    #name
    #date

    constructor (name, check = 0, date = new Date()) {
        this.#name = name
        this.#date = date

        if (check == 0) {
            this.#check = false
        } if (check == 1) {
            this.#check = true
        } 
    }

    getName () {
        const name = this.#name
        return this.#name
    }

    getDate () {
        const date = this.#date
        return date
    }

    isChecked () {
        const check = this.#check
        return check
    }

    getCheck () {
        if (this.#check == true) {
            return 1
        } else {
            return 0
        }
    }

    setCheck (check) {
        if (check == 1) {
            this.#check = true
        } if (check == 0) {
            this.#check = false
        }
    }


    
}