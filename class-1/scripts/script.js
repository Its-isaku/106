function sayHello() {
    console.log("Hello there!");
}

function init() {
    console.log("Hello im the init");
    sayHello();
}

window.onload = init; //? wait for the page to load before running the init function