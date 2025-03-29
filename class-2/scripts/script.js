//? Initialize the application
function init() {
    //* Load Data
    console.log("Initializing the application...");
    loadTasks();

    //* Hook Events
    $("#btnSave").click(save);
}

//? ajax request to get the tasks
function getTasks() {
    $.ajax({
        type: 'GET',
        url: 'https://fsdiapi.azurewebsites.net',
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    })
}

//? Save the project
function save() {
    console.log("Saving the project...");
    //* Get values from form inputs using jQuery
    let title = $('#txtTitle').val();
    let description = $('#txtDescription').val();
    let color = $('#txtColor').val();
    let status = $('#txtStatus').val();
    let date = $('#txtDate').val();
    let budget = $('#txtBudget').val();

    //* Create a new task
    let task = new Task(title, description, color, status, date, budget);

    //* Generate a unique ID for the task
    task.id = Date.now();

    //* Validate inputs
    if(!validateInputs()) {
        return;
    }

    //? send the task to the server
    $.ajax({
        type: 'POST',
        url: 'https://fsdiapi.azurewebsites.net/api/tasks/',
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            //* Display the task only after successful save
            displayTask(task);
        },
        error: function(error) {
            console.log(error);
            alert('Error saving task. Please try again.');
        }
    });
}

//? function to validate inputs
function validateInputs() {
    //* Get values from form inputs using jQuery
    let title = $('#txtTitle').val();
    let description = $('#txtDescription').val();
    let color = $('#txtColor').val();
    let status = $('#txtStatus').val();
    let date = $('#txtDate').val();
    let budget = $('#txtBudget').val();

    //* Create an array to store our error messages
    let errorMessages = [];

    //* Check each field and add error messages if needed
    if (!title) {
        errorMessages.push('Title is required');
    }
    if (!description) {
        errorMessages.push('Description is required');
    }
    if (!color) {
        errorMessages.push('Color is required');
    }
    if (!status) {
        errorMessages.push('Status is required');
    }
    if (!date) {
        errorMessages.push('Date is required');
    }
    if (!budget) {
        errorMessages.push('Budget is required');
    } else if (budget < 0) {
        errorMessages.push('Budget cannot be negative');
    }

    //* If we have any error messages, show them all at once
    if (errorMessages.length > 0) {
        //* Join all error messages with a new line
        alert(errorMessages.join('\n'));
        return false;
    }

    //* If we get here, everything is valid
    return true;
}

//? Load tasks from server and display them
function loadTasks() {
    //* Get tasks from server
    $.ajax({
        type: 'GET',
        url: 'https://fsdiapi.azurewebsites.net/api/tasks',
        success: function(response) {
            console.log(response);
            let data = JSON.parse(response);

            //* Use forEach instead of traditional for loop for better readability
            data.forEach(task => {
                if(task.name === "Isai") {
                    displayTask(task);
                }
            });
        },
        error: function(error) {
            console.log('Error loading tasks:', error);
            alert('Error loading tasks. Please try again.');
        }
    });
}

//? Displays the Task in the ul
function displayTask(task) {
    //* Create a new list
    const listItem = `
        <li class="list-group-item" data-id="${task.id}" style="border-left: 5px solid ${task.color}">
            <h3 class="mb-1">${task.title}</h3>
            <p class="mb-1">${task.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Status: ${task.status}</small>
                <small class="text-muted">Date: ${task.date}</small>
                <small class="text-muted">Budget: $${task.budget}</small>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                <button class="btn btn-warning" onclick="editTask(${task.id})">Edit</button>
            </div>
        </li>
    `;
    
    //* Create jQuery object and add it to the list with fade effect
    const $newItem = $(listItem).hide();
    $('.list-group').append($newItem);
    $newItem.fadeIn(300);
    
    //* Clear the form
    $('#txtTitle').val('');
    $('#txtDescription').val('');
    $('#txtColor').val('#000000');
    $('#txtStatus').val('In Progress');
    $('#txtDate').val('');
    $('#txtBudget').val('');
}

//? Delete the task
function deleteTask(id) {
    console.log("Deleting task with ID:", id);
    
    //* Find and remove the task element with the matching ID
    $(`li[data-id="${id}"]`).fadeOut(300, function() { //* fadeOut is used to make the task disappear smoothly
        $(this).remove();
    });
}

//? Delete all tasks
function deleteAllTasks() {
    console.log("Deleting all tasks");
    
    //* Select all list items and fade them out
    $('.list-group li').fadeOut(300, function() {
        $(this).remove();
    });
} 
$('#btnDelete').click(deleteAllTasks);

//? Edit the task
function editTask(id) {
    console.log("Editing task with ID:", id);
    
    //* Find the task element
    const taskElement = $(`li[data-id="${id}"]`);
    
    //* Get the task data from the element
    const title = taskElement.find('h3').text();
    const description = taskElement.find('p').text();
    const color = taskElement.css('border-left-color');
    const status = taskElement.find('small:contains("Status:")').text().replace('Status: ', '');
    const date = taskElement.find('small:contains("Date:")').text().replace('Date: ', '');
    const budget = taskElement.find('small:contains("Budget:")').text().replace('Budget: $', '');
    
    //* Populate the form with the task data
    $('#txtTitle').val(title);
    $('#txtDescription').val(description);
    $('#txtColor').val(color);
    $('#txtStatus').val(status);
    $('#txtDate').val(date);
    $('#txtBudget').val(budget);
    
    //* Remove the old task
    deleteTask(id);
}

//? Dark Mode
function darkMode() {
    console.log("Dark Mode");
    $('body').toggleClass('dark-mode');
}
$('#darkMode').click(darkMode);

//? Initialize when the window loads
window.onload = init;

/**
    //? function to validate inputs
    function validateInputs() {
        //* Get values from form inputs using jQuery
        const formData = {
            title: $('#txtTitle').val(),
            description: $('#txtDescription').val(),
            color: $('#txtColor').val(),
            status: $('#txtStatus').val(),
            date: $('#txtDate').val(),
            budget: $('#txtBudget').val()
        };

        //* Define validation rules and their corresponding error messages
        const validationRules = { //! Study this to use it in the future
            title: { isValid: value => !!value, message: 'Title is required' },
            description: { isValid: value => !!value, message: 'Description is required' },
            color: { isValid: value => !!value, message: 'Color is required' },
            status: { isValid: value => !!value, message: 'Status is required' },
            date: { isValid: value => !!value, message: 'Date is required' },
            budget: { 
                isValid: value => !!value && Number(value) >= 0, 
                message: value => !value ? 'Budget is required' : 'Budget cannot be negative'
            }
        };

        //* Collect all validation errors
        const errors = [];
        Object.entries(validationRules).forEach(([field, rule]) => { //! Study this to use it in the future
            const value = formData[field];
            if (!rule.isValid(value)) {
                errors.push(typeof rule.message === 'function' ? rule.message(value) : rule.message);
            }
        });

        //* If there are any errors, show them all at once and return false
        if (errors.length > 0) { //! Study this to use it in the future
            alert(errors.join('\n'));
            return false;
        }

        return true;
    }
 **/