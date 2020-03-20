// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners()
{
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from Local Storage
function getTasks()
{
    let tasks = checkIfTaskIsInLS();

    tasks.forEach(function(task)
    {
        createLiElement(task);
    });
}


// Add task
function addTask(e)
{
    if(taskInput.value === '')
    {
        alert('Please add a task');
    }
    
    createLiElement(taskInput.value);

    // Store in LS
    storeTaskInLocalStorage(task.value);

    // Clear input
    taskInput.value = '';
    
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task)
{
    tasks = checkIfTaskIsInLS();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e)
{
    if(e.target.parentElement.parentElement.classList.contains('collection-item'))
    {
        if(confirm('Are you sure you want to delete?'))
        {
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem)
{
    let tasks = checkIfTaskIsInLS();

    tasks.forEach(function(task, index)
    {
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1); // The splice() gets the index of the text if matched and then removes it
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
// There are two ways to clear tasks. One is by innerHTML and the another is by
// looping through each child. Looping through each child is actually more faster than
// innerHTML
function clearTasks()
{
    //innerHTML
    // taskList.innerHTML = '';

    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

// Filter tasks
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task)
        {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1)
            {
                task.style.display = 'block';
            }
            else
            {
                task.style.display = 'none';
            }
        }
    );
}

// Create task li element
function createLiElement(task)
{
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
}

// Check to see if task in the local storage
function checkIfTaskIsInLS()
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}