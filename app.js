const submit = document.getElementById("submit");
const list = document.querySelector("ul");
const todoList = [];



class Todo_Class{
    constructor(ul){
        this.list = ul;
        todoList.concat(JSON.parse(localStorage.getItem("localTODO")));
    }
    
    add(){
        const todoInput = document.getElementById("inputbox").value;
        if(todoInput == ""){
            alert("Field is empty")
        }
        else{
            //create todo object
            const todoObject = {
                id: todoList.length,
                todoText: todoInput
            }
            todoList.unshift(todoObject);

            this.saveStorage();
            this.display();
        }

        document.getElementById("inputbox").value = "";
    }

    deleteElement(itemIndex){
        const deleteItemIndex = todoList.findIndex( (element) => element.id = itemIndex);
        todoList.splice(deleteItemIndex, 1);

        this.saveStorage();
        this.display();
    }

    display(){        
        //clear screen
        this.list.innerHTML = "";
        
        this.getStorage();

        todoList.forEach( (element) => {
            //create list item
            let todoItem = document.createElement("li");
            todoItem.innerHTML = element.todoText;
            todoItem.id = element.id;
            this.list.append(todoItem);

            //create delete button
            let deleteButton = document.createElement("img");
            deleteButton.src = "trash.png"
            deleteButton.className = "delete";
            todoItem.append(deleteButton);

            //add event listener to remove button
            deleteButton.addEventListener("click", () => {
                this.deleteElement(element.id);
            });
        });
    }

    getStorage(){
        if (localStorage.getItem("localTODO") != ""){
            todoList.concat(JSON.parse(localStorage.getItem("localTODO")));
        }
    }

    saveStorage(){
        localStorage.setItem("localTODO", JSON.stringify(todoList));
    }
} 

todoAction = new Todo_Class(list);
todoAction.display();

submit.addEventListener("click", () => {
    todoAction.add();
});
