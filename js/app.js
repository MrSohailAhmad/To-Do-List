// CODE EXPLAINED channel


// select the Element

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


//  classes names for add and remove classes

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "lineThrough";

// Variables 
let LIST, id;


// get item from localstorage
let data = localStorage.getItem("TODO");

// if data is not empty
// if (data) {
//     LIST = JSON.parse(data);
//     id = LIST.length; // set the id to the last one in a array
//     loadList(LIST); // load list to the user interfacce

// } else {
//     LIST = [];
//     id = 0;
// }

// load to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// add item to localstorage
// (this code must be add every where the list array)

localStorage.setItem("TODO", JSON.stringify(LIST));

// show today date in interface
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)


// 

function addToDo(todo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINETHROUGH : "";

    const item = `
    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE} ">${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// addToDo("drink Coffee");


// add item on list user enter the key

document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        const todo = input.value;
        // if input is not empty
        if (todo) {
            addToDo(todo);
            LIST.push({
                name: todo,
                id: id,
                done: false,
                trash: false
            });
            // add item to localstorage
            // (this code must be add every where the list array)

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;

        }
        input.value = "";
    }
})


// function to remove

const completeToDo = (element) => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


const removeTodo = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamicly

list.addEventListener("click", (event) => {
    const element = event.target; // return the get element inside lsit
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }
    // add item to localstorage
    // (this code must be add every where the list array)

    localStorage.setItem("TODO", JSON.stringify(LIST));
})