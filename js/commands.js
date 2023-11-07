command_exceptions = ["help", "todo", "clear"];

function run(command, command_args) {
    
    if (!command_exceptions.includes(command)) {
    if (command_args["help"] || Object.keys(command_args)[0] == null) {
        default_arg(command);
        return
    }
    } 




/* Console command */
if (command == "console") {
    if (command_args["color"]) {
        document.getElementById("output")
            .style.color = command_args["color"];
        create_line("Color changed to " + command_args["color"], true, 0);
    }
    if (command_args["background"]) {
        document.getElementById("output")
            .style.background = command_args["background"];
        create_line("Background changed to " + command_args["background"], true, 0);
    }
    if (command_args["size"]) {
        document.getElementById("output")
            .style.fontSize = command_args["size"];
        create_line("Font size changed to " + command_args["size"], true, 0);
    }
    if (command_args["clear"]) {
        clear_console();
    }
    if (command_args["reset"]) {
        document.getElementById("output")
            .style.color = "white";
        document.getElementById("output")
            .style.background = "none";
        document.getElementById("output")
            .style.fontSize = "17px";
        create_line("Console reset.", true, 0);
    }
}





/* Help command */
if (command == "help") {
    default_help();
}

/* Clear command */
if (command == "clear") {
    clear_console();
}

/* Todo command */
if (command == "todo") {
    create_line("Fixa uninterpreted, skapa server för fetchning av mat, läxor, länkar, fixa gränser för argument (namn kan inte vara ''), skapa mafy ", true, 0);
}


/* Name command */
if (command == "name") {
    if (command_args["set"]) {
        user = command_args["set"];
        create_line("Name changed to '" + user + "'", true, 0);
    }
}




/* Link command */
if (command == "link") {
    if (command_args["url"]) {
        if (command_args["url"] in links) {
            window.open(links[command_args["url"]]);
            create_line("Opening " + links[command_args["url"]], true, 0);
        }
        else {
            if (command_args["url"] == "") {
                create_line("Invalid URL.", true, 2);
            }
            else {
                if (command_args["url"].indexOf("http") == -1) {
                    command_args["url"] = "https://" + command_args["url"];
                }
                if (command_args["url"].indexOf(".") == -1) {
                    command_args["url"] = command_args["url"] + ".com";
                }
                window.open(command_args["url"]);
                create_line("Opening " + command_args["url"], true, 0);
            }
        }
    }
    if (command_args["add"]) {
        if (command_args["add"] in links) {
            create_line("Shortcut already exists.", true, 1);
        }
        else {
            /*send to server, not implemented*/
            create_line("Shortcut added.", true, 0);
        }
    }
    if (command_args["remove"]) {
        if (command_args["remove"] in links) {
            /*send to server, not implemented*/
            create_line("Shortcut removed.", true, 0);
        }
        else {
            create_line("Shortcut does not exist.", true, 1);
        }
    }
}


/* mafy command */
if (command == "mafy") {
    random_number = Math.floor(Math.random() * 100);
    create_line(random_number, true, 0);
}






}