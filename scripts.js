const newItem = document.querySelector("#new-item");
const list = document.querySelector("ul");
const form = document.querySelector("form");
const warning = document.querySelector(".warning-wrapper");
const warningBtnClose = document.querySelector(".warning-wrapper button");
const alertBox = document.querySelector(".alert");
const alertBoxBtnClose = document.querySelector(".alert-box button")

document.addEventListener("DOMContentLoaded", function(){
    LIST_LOCAL.refreshItems();
    LIST_LOCAL.showItems();

    LIST_LOCAL.items.forEach(function(item){
        createItemList(item);
    })
});

const LIST_LOCAL = {
    _name: "listLocal",
    _items: [],

    getName () {
        return this.name;
    },

    get Items() {
        return this._items;
    },

    showItems () {
        console.log("Items da sessão atual:")
        console.log(this.items);
        console.log("Items no local Storage:")
        console.log(JSON.parse(localStorage.getItem("listLocal")).items)
    },

    addItem (item) {
        this.items.push(item);
        localStorage.setItem("listLocal", JSON.stringify(this));
    },

    removeItem (item) {
        this.items.splice(this.items.indexOf(item), 1);
        localStorage.setItem("listLocal", JSON.stringify(this));
    },

    refreshItems () {
        const localStorageItems = JSON.parse(localStorage.getItem("listLocal")).items;
        this.items = localStorageItems;
    },

    clearLocalStorage () {
        this.items = [];
        localStorage.setItem("listLocal", JSON.stringify(this));
    }
    
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (newItem.value == "") {
        alertBox.style.display = "flex";
    } else {
        LIST_LOCAL.refreshItems();
        createItemList(newItem.value);
        LIST_LOCAL.addItem(newItem.value);
        LIST_LOCAL.showItems();
        newItem.value = ""; 
    }
});

warningBtnClose.addEventListener("click", function() {
    warning.style.display = "none";
});

alertBoxBtnClose.addEventListener("click", function() {
    alertBox.style.display = "none";
})

function createItemList (itemName) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const checkImage = document.createElement("span");
        checkImage.classList.add("check-image");
        const checkWrapper = document.createElement("span");
        checkWrapper.classList.add("check-wrapper");
        checkWrapper.append(checkbox, checkImage);
        const p = document.createElement("p");
        p.textContent = itemName;
        const button = document.createElement("button");
        button.addEventListener("click", removeItemList);
        li.append(checkWrapper, p, button);
        list.append(li);
}

function removeItemList (event) {
    event.target.parentNode.remove();
    warning.style.display = "flex";
    LIST_LOCAL.removeItem(event.target.previousElementSibling.textContent);
    LIST_LOCAL.showItems();
};






