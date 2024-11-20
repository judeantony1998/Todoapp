// Login functionality
document.getElementById("loginButton").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Validation
    if (username === "admin" && password === "12345") {
        // Callback function to navigate to main page
        redirectToMainPage();
    } else {
        alert("Invalid login credentials. Please try again.");
    }
});

// Redirect to the main page
function redirectToMainPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
    loadTodos();
}

// Logout functionality
document.getElementById("logoutLink").addEventListener("click", function() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
});

// Fetch and display Todos
function loadTodos() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(function(response) {
            const todos = response.data;
            let todoListHTML = '';

            todos.forEach(todo => {
                todoListHTML += `
                    <li class="list-group-item">
                        <input type="checkbox" class="markComplete" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                        ${todo.title}
                    </li>
                `;
            });

            document.getElementById("todoList").innerHTML = todoListHTML;

            // Add event listener for marking todos as complete
            document.querySelectorAll('.markComplete').forEach(checkbox => {
                checkbox.addEventListener('change', function(event) {
                    handleTodoCompletion(event.target);
                });
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Handle task completion
let completedCount = 0;

function handleTodoCompletion(checkbox) {
    const isChecked = checkbox.checked;
    if (isChecked) {
        completedCount++;
    } else {
        completedCount--;
    }

    if (completedCount === 5) {
        new Promise((resolve, reject) => {
            resolve('Congrats. 5 Tasks have been Successfully Completed');
        })
        .then(message => {
            alert(message);
        });
    }
}
