var user = "user";
var capture = false;

const argument_acceptors = {
	"console": ["color", "background", "size", "clear", "reset"],
	"help": [],
	"link": ["url", "add", "remove"],
	"name": ["set"],
	"mafy": [],
	"clear": []
}
const links = {
	"saits": "https://saits-vaxjo.se.ist.com/student/",
	"ist": "https://vaxjo-student-learn.se.ist.com/index.html#/app/review",
	"schema": "https://web.skola24.se/timetable/timetable-viewer/vaxjo.skola24.se/Katedralskolan/",
	"mat": "https://mpi.mashie.com/public/app/V%C3%A4xj%C3%B6%20kommun%20ny/6f5fa240"
}

command_exceptions = ["help", "clear", "mafy"];

function run(command, command_args) {
    
    if (!command_exceptions.includes(command)) {
    if (Object.keys(command_args)[0] == null) {
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


/* Name command */
if (command == "name") {
    if (command_args["set"]) {
        user = command_args["set"];
        clear_console_quick();
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
        mafy_question();
    }


}



function mafy_img_parse(question) {
    if (question.includes("![](")) {
        alert("148");
        url = question.split("![](")[1].split(")")[0];
        question = question.split("![](")[0];
        append(img(url));
    }
    return question;
}

function mafy_question() {
    clear_console_quick();
    document.capture=true;
    document.mafycapture=true;
    
    var amount_questions = Object.keys(questions).length;
    choice = Math.floor(Math.random() * amount_questions);
    
    m = questions[choice];
    
    questionNum = m["questionNum"];
    answer = m["answer"];

    question = m["question"];
    question = mafy_img_parse(question);
    
    create_line(questionNum + ". <hr><span class='larger'>" + question + "</span>", true, 0);
    reload_math();
    
    input = document.getElementById("input");
}


function mafy_capture(value) {
    if (document.mafy_revealed == true) {
        document.mafy_revealed = false;
        mafy_question();
        return;
    }
    answer = mafy_img_parse(answer);
    create_line("<br><br><span class='answer_larger'>Ditt svar: " + value + "</span>", true, 0);
    create_line("<span class='answer_larger'>Rätt svar: " + answer + "</span>", true, 0);
    document.mafy_revealed = true;
    reload_math();
}