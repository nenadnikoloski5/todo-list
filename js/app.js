var app = (function() {

    'use strict';

    let todos = [];
    let activeTodos = [];
    let completedTodos = [];
    let counter = 0;
    const input = document.querySelector("#js-insert");
    const ul = document.querySelector("#js-list")
    const rowBar = document.querySelector("#js-bar")

    const buttonAllTodos = document.querySelector("#allTodosRender")
    const activeTodosRender = document.querySelector("#activeTodosRender")
    const completedTodosRender = document.querySelector("#completedTodosRender")
    const clearCompletedTodos = document.querySelector("#js-clear-completed")


    input.addEventListener("keypress", addTodo)
    buttonAllTodos.addEventListener("click", renderAllTodos)
    activeTodosRender.addEventListener("click", renderActiveTodos)
    completedTodosRender.addEventListener("click", renderCompletedTodos)
    clearCompletedTodos.addEventListener("click", clearAllCompletedTodos)



    if (JSON.parse(localStorage.getItem("todo") != undefined)) {

        if (JSON.parse(localStorage.getItem("todo")).length != 0) {
            rowBar.attributes[2].value = ""

        }


        let LSTodos = JSON.parse(localStorage.getItem("todo"))
        rowBar.children[0].children[0].textContent = `${LSTodos.length} items left`

        LSTodos.forEach(function(ele) {
            todos.push(ele.text)

            if (ele.isCompleted) {
                completedTodos.push(ele.text)
            }

            if (!ele.isCompleted) {
                activeTodos.push(ele.text)
            }



            let newTodo = document.createElement("li");
            newTodo.textContent = ele;

            if (ele.isCompleted) {

                newTodo.innerHTML = `
        <div class="todo" id="${counter++}">

        <span>${ele.text}</span>
        <div class="squaredThreeChecked">
        <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
        <label for="squaredThree" onclick="app.checkMark(this)"></label>
      </div>
        <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
        <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
        <button class="destroy" onclick="app.deleteTodo(this)"></button>
        </div>`;
            } else {



                newTodo.innerHTML = `
        <div class="todo" id="${counter++}">

        <span>${ele.text}</span>
        <div class="squaredThree">
        <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
        <label for="squaredThree" onclick="app.checkMark(this)"></label>
      </div>
        <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
        <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
        <button class="destroy" onclick="app.deleteTodo(this)"></button>
        </div>`;

            }



            ul.appendChild(newTodo);




        })
    }


    function addTodo(e) {
        if (e.keyCode == 13 && input.value && input.value !== " ") {
            todos.push(input.value)
            renderTodo();
            showHideRow()
            activeTodos.push(input.value)

            if (JSON.parse(localStorage.getItem("todo")) != undefined) {
                let LS = JSON.parse(localStorage.getItem("todo"))

                LS.push({
                    text: input.value,
                    isCompleted: false
                })
                localStorage.setItem("todo", JSON.stringify(LS))
            } else {
                let firstEntry = []
                localStorage.setItem("todo", JSON.stringify(firstEntry))
                let LSnew = JSON.parse(localStorage.getItem("todo"))
                LSnew.push({
                    text: input.value,
                    isCompleted: false
                })
                localStorage.setItem("todo", JSON.stringify(LSnew))

            }

            input.value = "";
            changeItemsLeft()
        }
    }

    function showHideRow() {
        if (todos.length >= 1) {
            rowBar.attributes[2].value = ""
        } else {
            rowBar.attributes[2].value = "display:none"

        }
    }


    function changeItemsLeft() {


        if (event.key == "Enter") {
            event.target.parentElement.nextElementSibling.children[0].textContent = `${todos.length} items left`

        } else {
            rowBar.children[0].textContent = `${todos.length} items left`
        }

    }

    function renderTodo() {

        let newTodo = document.createElement("li");
        newTodo.textContent = todos[todos.length - 1];
        newTodo.innerHTML = `
        <div class="todo" id="${counter++}">

        <span>${newTodo.textContent}</span>
        <div class="squaredThree">
        <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
        <label for="squaredThree" onclick="app.checkMark(this)"></label>
      </div>
        <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
        <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
        <button class="destroy" onclick="app.deleteTodo(this)"></button>
        </div>`;
        ul.appendChild(newTodo);
    }

    function deleteTodo(click) {


        let LSTodos = JSON.parse(localStorage.getItem("todo"))
        LSTodos.forEach(function(ele) {
            if (ele.text == event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent) {


                LSTodos.forEach(function(ele2) {
                    if (ele2.text == event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent) {
                        LSTodos.splice(LSTodos.indexOf(ele2), 1)
                    }
                })




            }
        })

        let index = todos.indexOf(event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        if (index !== -1) {
            todos.splice(index, 1);
        }



        localStorage.setItem("todo", JSON.stringify(LSTodos))
        event.target.parentElement.parentElement.remove();

        showHideRow()
        changeItemsLeft()


    }


    function editTodoShowHide(click) {
        if (event.target.previousElementSibling.attributes[4].value == "display:none") {
            event.target.previousElementSibling.attributes[4].value = "display:block"
        } else {
            event.target.previousElementSibling.attributes[4].value = "display:none"
        }
    }

    function editTodo(click) {
        if (event.code == "Enter") {

            let index = todos.indexOf(event.target.previousElementSibling.previousElementSibling.textContent);
            let eventValue = event.target.value;

            if (index !== -1) {
                todos[index] = eventValue;
            }

            let indexActive = activeTodos.indexOf(event.target.previousElementSibling.previousElementSibling.textContent);

            if (indexActive !== -1) {
                activeTodos[indexActive] = eventValue;


            }


            let indexCompleted = completedTodos.indexOf(event.target.previousElementSibling.previousElementSibling.textContent);

            if (indexCompleted !== -1) {
                completedTodos[indexCompleted] = eventValue;


            }


            let LSTodos = JSON.parse(localStorage.getItem("todo"))
            LSTodos.forEach(function(ele) {
                if (ele.text == event.target.previousElementSibling.previousElementSibling.textContent) {
                    ele.text = eventValue;
                    localStorage.setItem("todo", JSON.stringify(LSTodos))
                }
            })

            event.target.previousElementSibling.previousElementSibling.textContent = eventValue;
            event.target.value = ""
        }

    }



    function checkMark(click) {

        if (event.target.parentElement.attributes[0].value == "squaredThree") {
            event.target.parentElement.attributes[0].value = "squaredThreeChecked";




            if (completedTodos.indexOf(event.target.parentElement.previousElementSibling.textContent) === -1) {
                completedTodos.push(event.target.parentElement.previousElementSibling.textContent)

                let index = completedTodos.indexOf(event.target.parentElement.previousElementSibling.textContent);
                activeTodos.splice(activeTodos.indexOf(event.target.parentElement.previousElementSibling.textContent), 1);


                let LSTodos = JSON.parse(localStorage.getItem("todo"))
                LSTodos.forEach(function(ele) {
                    if (ele.text === event.target.parentElement.previousElementSibling.textContent) {
                        ele.isCompleted = true
                        localStorage.setItem("todo", JSON.stringify(LSTodos))

                    }
                })

            }




        } else {




            event.target.parentElement.attributes[0].value = "squaredThree"




            if (completedTodos.indexOf(event.target.parentElement.previousElementSibling.textContent) !== -1) {
                completedTodos.splice(completedTodos.indexOf(event.target.parentElement.previousElementSibling.textContent), 1);
                activeTodos.push(event.target.parentElement.previousElementSibling.textContent)



                let LSTodos = JSON.parse(localStorage.getItem("todo"))
                LSTodos.forEach(function(ele) {
                    if (ele.text === event.target.parentElement.previousElementSibling.textContent) {
                        ele.isCompleted = false
                        localStorage.setItem("todo", JSON.stringify(LSTodos))
                    }
                })
            }




        }


    }




    function renderAllTodos() {

        let counter = 0;

        activeTodosRender.attributes[1].value = "button"
        buttonAllTodos.attributes[1].value = "button selected"
        completedTodosRender.attributes[1].value = "button"




        let allRenderedTodos = document.querySelectorAll(".todo")
        for (let i = 0; i < allRenderedTodos.length; i++) {
            allRenderedTodos[i].parentElement.remove()
        }

        todos.forEach(function(ele) {



            let newTodo = document.createElement("li");
            newTodo.textContent = ele;

            // if it exists
            if (completedTodos.indexOf(ele) != -1) {

                newTodo.innerHTML = `
            <div class="todo" id="${counter++}">
    
            <span>${ele}</span>
            <div class="squaredThreeChecked">
            <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
            <label for="squaredThree" onclick="app.checkMark(this)"></label>
          </div>
            <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
            <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
            <button class="destroy" onclick="app.deleteTodo(this)"></button>
            </div>`;
            } else {



                newTodo.innerHTML = `
                <div class="todo" id="${counter++}">
        
                <span>${ele}</span>
                <div class="squaredThree">
                <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
                <label for="squaredThree" onclick="app.checkMark(this)"></label>
              </div>
                <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
                <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
                <button class="destroy" onclick="app.deleteTodo(this)"></button>
                </div>`;
            }




            ul.appendChild(newTodo);




        })




        document.querySelector(".col-1-4").textContent = `${todos.length} items left`




    }




    function renderActiveTodos() {
        let counter = 0;

        activeTodosRender.attributes[1].value = "button selected"
        buttonAllTodos.attributes[1].value = "button"
        completedTodosRender.attributes[1].value = "button"




        let allRenderedTodos = document.querySelectorAll(".todo")
        for (let i = 0; i < allRenderedTodos.length; i++) {
            allRenderedTodos[i].parentElement.remove()
        }

        activeTodos.forEach(function(ele) {



            let newTodo = document.createElement("li");
            newTodo.textContent = ele;

            newTodo.innerHTML = `
            <div class="todo" id="${counter++}">
    
            <span>${ele}</span>
            <div class="squaredThree">
            <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
            <label for="squaredThree" onclick="app.checkMark(this)"></label>
          </div>
            <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
            <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
            <button class="destroy" onclick="app.deleteTodo(this)"></button>
            </div>`;
            ul.appendChild(newTodo);




        })


        document.querySelector(".col-1-4").textContent = `${activeTodos.length} items left`




    }




    function renderCompletedTodos() {

        let counter = 0;

        activeTodosRender.attributes[1].value = "button"
        buttonAllTodos.attributes[1].value = "button"
        completedTodosRender.attributes[1].value = "button selected"




        let allRenderedTodos = document.querySelectorAll(".todo")
        for (let i = 0; i < allRenderedTodos.length; i++) {
            allRenderedTodos[i].parentElement.remove()
        }

        completedTodos.forEach(function(ele) {



            let newTodo = document.createElement("li");
            newTodo.textContent = ele;
            newTodo.innerHTML = `
            <div class="todo" id="${counter++}">
    
            <span>${ele}</span>
            <div class="squaredThreeChecked">
            <input type="checkbox" value="None" id="squaredThreeChecked" name="check" checked="" >
            <label for="squaredThree" onclick="app.checkMark(this)"></label>
          </div>
            <input type="text" size="35" class="forEditInput"   placeholder="Edit todo" style="display:none" onkeypress="app.editTodo(this)">
            <button class="forEdit" onclick="app.editTodoShowHide(this)" ></button>
            <button class="destroy" onclick="app.deleteTodo(this)"></button>
            </div>`;
            ul.appendChild(newTodo);




        })


        document.querySelector(".col-1-4").textContent = `${completedTodos.length} items left`


    }




    function clearAllCompletedTodos() {




        let removed = []



        if (document.querySelector("#allTodosRender").attributes[1].value !== "button selected") {
            document.querySelector("#allTodosRender").click()

        }

        for (let i = 0; i <= document.querySelectorAll(".squaredThreeChecked").length + 2; i++) {
            let dg = document.querySelectorAll(".squaredThreeChecked").length;

            let b = completedTodos
            let query = document.querySelector(".squaredThreeChecked")
            let todaos = todos



            if (document.querySelector(".squaredThreeChecked")) {

                removed.push(document.querySelector(".squaredThreeChecked").parentElement.children[0].textContent)
                if (todos.indexOf(document.querySelector(".squaredThreeChecked").previousElementSibling.textContent) != -1) {




                    todos.splice(todos.indexOf(document.querySelector(".squaredThreeChecked").previousElementSibling.textContent), 1);

                    completedTodos.splice(todos.indexOf(document.querySelector(".squaredThreeChecked").previousElementSibling.textContent), 1);


                }




                document.querySelector(".squaredThreeChecked").parentElement.parentElement.remove()
                i = 0;
            }
        }

        completedTodos = []

        if (!todos.length) {
            rowBar.attributes[2].value = "display:none"

        }


        document.querySelector(".col-1-4").textContent = `${todos.length} items left`


        let LSTodos = JSON.parse(localStorage.getItem("todo"))



        for (let i = 0; i < LSTodos.length; i++) {




            removed.forEach(function(ele) {
                if (ele == LSTodos[i].text) {
                    LSTodos.splice(LSTodos.indexOf(LSTodos[i]), 1)
                }
            })


            localStorage.setItem("todo", JSON.stringify(LSTodos))

        }



    }




    function showTodos() {
        return todos
    }

    function showActiveTodos() {
        return activeTodos
    }

    function showCompletedTodos() {
        return completedTodos
    }




    return {
        showTodos: showTodos,
        showActiveTodos: showActiveTodos,
        showCompletedTodos: showCompletedTodos,
        render: renderTodo,
        deleteTodo: deleteTodo,
        editTodoShowHide: editTodoShowHide,
        editTodo: editTodo,
        checkMark: checkMark
    };

})();