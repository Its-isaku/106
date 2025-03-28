//? Initialize the application
function init() {
    //* Load Data
    console.log("Initializing the application...");

    //* Hook Events
    $("#btnSave").click(save);
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
    if(!task.title || !task.description) {
        alert('Please fill in at least the title and description!');
        return;
    }

    //* Display the task
    displayTask(task);
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
    taskElement.fadeOut(300, function() {
        $(this).remove();
    });
}

//? Dark Mode
function darkMode() {
    console.log("Dark Mode");
    $('body').toggleClass('dark-mode');
}
$('#darkMode').click(darkMode);

//? Initialize when the window loads
window.onload = init;