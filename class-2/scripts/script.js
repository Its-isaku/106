function init() {
    //? Load Data

    //? Hook Events
    $("#btnSave").click(save);

}

function save() {
    console.log("Save");
}

window.onload = init;