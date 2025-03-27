function init() {
    //? Load Data
    console.log("Initializing the application...");

    //? Hook Events
    $("#btnSave").click(save);
}

function save() {
    //? Get values from form inputs using jQuery
    const project = {
        title: $('#txtTitle').val(),
        description: $('#txtDescription').val(),
        color: $('#txtColor').val(),
        status: $('#txtStatus').val(),
        date: $('#txtDate').val(),
        budget: $('#txtBudget').val()
    };
    
    //? Validate inputs
    if(!project.title || !project.description) {
        alert('Please fill in at least the title and description!');
        return;
    }
    
    //? Create a new list
    const listItem = `
        <li class="list-group-item" style="border-left: 5px solid ${project.color}">
            <h5 class="mb-1">${project.title}</h5>
            <p class="mb-1">${project.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Status: ${project.status}</small>
                <small class="text-muted">Date: ${project.date}</small>
                <small class="text-muted">Budget: $${project.budget}</small>
            </div>
        </li>
    `;
    
    //? Add the new project to the list
    $('.list-group').append(listItem);
    
    //? Clear the form
    $('#txtTitle').val('');
    $('#txtDescription').val('');
    $('#txtColor').val('#000000');
    $('#txtStatus').val('In Progress');
    $('#txtDate').val('');
    $('#txtBudget').val('');
}

//? Initialize when the window loads
window.onload = init;