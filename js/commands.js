var user = "user";
var capture = false;

const argument_acceptors = {
	"console": ["color", "size", "clear", "reset"],
	"help": [],
	"link": ["url", "links"],
	"name": ["set"],
	"mafy": ["questions", "tpq", "help"],
	"clear": [],
    "write": [],
    "lopenzo": ["lopenzo"],
    "labb": [],
    "mira": [],
    "whoami": []
}

const argument_descriptions = {
    "console": {
        "color": "color",
        "size": "100%",
        "clear": "*",
        "reset": "*"
    },
    "help": {},
    "link": {
        "url": "abc.com",
        "links": "*"
    },
    "name": {
        "set": "name"
    },
    "mafy": {
        "questions": "1-999",
        "tpq": "1-999  - Minutes per question",
        "help": "*"
    },
    "clear": {},
    "write": {},
    "lopenzo": {
        "lopenzo": "text"
    },
    "labb": {},
    "mira": {},
    "whoami": {}
}

const links = {
	"saits": "https://saits-vaxjo.se.ist.com/student/",
	"ist": "https://vaxjo-student-learn.se.ist.com/index.html#/app/review",
	"schema": "https://web.skola24.se/timetable/timetable-viewer/vaxjo.skola24.se/Katedralskolan/",
	"mat": "https://mpi.mashie.com/public/app/V%C3%A4xj%C3%B6%20kommun%20ny/6f5fa240"
}

command_exceptions = [];
for (var key in argument_acceptors) {
    if (argument_acceptors[key].length == 0) {
        command_exceptions.push(key);
    }
}

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
    if (command_args["size"]) {
        document.getElementById("output")
            .style.fontSize = command_args["size"];
        create_line("Font size changed to " + command_args["size"], true, 0);
    }
    if (command_args["clear"]) {
        clear_console();
    }
    if (command_args["reset"]) {
        window.location.reload();
    }
}

if (command == "lopenzo") {
    split = command_args["lopenzo"];
    construct="";
    for (i = 0; i < split.length; i++) {
        construct += split[i] + " lopenzo";
        if (i%2 == 0) {
            construct+= "! ";
        }
        else {
            construct+= "? ";
        }
    }
    create_line(construct, true, 0, "larger");
}


/* Help command */
if (command == "help") {
    default_help();
}

/* Clear command */
if (command == "clear") {
    clear_console();
}

if (command == "labb") {
    window.open("https://sharppointed.com/labb.html");
    create_line("Opening /labb ...", true, 0);
}

if (command == "whoami") {
    create_line("You are " + user + ".", true, 0, "list_side");
}

/* Name command */
if (command == "name") {
    if (command_args["set"]) {
        user = command_args["set"];
        for (i = 0; i < document.getElementsByClassName("username").length; i++) {
            document.getElementsByClassName("username")[i].textContent = user + "> ";
        }
        create_line("You are now '" + user + "'.", true, 0, "list_side");
    }
}

if (command == "mira") {
    clear_console_quick();
    create_line("Jag älskar Mira. ", true, 0, "larger");
    create_line("<3 <3 <3", true, 0, "larger red");
    /*delay*/
    setTimeout(function() {
    clear_console_quick();
    create_line("Jag älskar Mira. ", true, 0, "larger red");
    create_line("<3 <3 <3", true, 0, "larger red");
    }, 300);
    setTimeout(function() {
    clear_console_quick();
    create_line("Jag älskar Mira. ", true, 0, "larger");
    create_line("<3 <3 <3", true, 0, "larger red");
    }, 600);
    setTimeout(function() {
    clear_console_quick();
    create_line("Jag älskar Mira. ", true, 0, "larger red");
    create_line("<3 <3 <3", true, 0, "larger red");
    }, 900);
    setTimeout(function() {
    clear_console_quick();
    create_line("Jag älskar Mira. ", true, 0, "larger");
    create_line("<3 <3 <3", true, 0, "larger red");
    }, 1200);
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

    if (command_args["links"]) {
            create_line("Available links: ", true, 0, "list_side");
            for (var key in links) {
                create_line("&nbsp; * " + key, true, 0, "list_side");
            }
    }
}

    
    
    /* mafy command */
    if (command == "mafy") {
        if (command_args["questions"]) {
            number_questions = command_args["questions"];
        } else {
            number_questions = 10000;
        }
        
        if (command_args["help"]) {
            create_line("<br>Mafy är ett program som hjälper dig att träna på matematik och fysikprovet.", true, 0);
            create_line("Du kan använda kommandot -r för att markera rätt och -f för att markera fel.", true, 0);
            create_line("Du kan också använda #-tecknet för att kommentera eller skriva beräkningar.", true, 0);
            create_line("Du kan också använda -stop för att avsluta omgången.<br>", true, 0);
            create_line("Du kan också använda /tpq för att sätta tiden (minuter) per fråga.", true, 0);
            create_line("Exempel: 'mafy /questions 75 /tpq 4' för ett riktigt prov-exempel", true, 0);
            return;
        }

        
        if (command_args["tpq"]) {
            tpq = command_args["tpq"];
            time = tpq * number_questions * 60 + 6;
            original_time = time;
            mafy_time(time);
        }
        
        document.total = 0;
        document.correct = 0;
        document.wrong = 0;

        clear_console_quick();
        
        create_line("'#' används för kommentarer/beräkningar, <br>-stop för att avsluta omgången, <br>-r för att markera rätt och <br>-f för att markera fel.", true, 0, "larger");
        create_line("<br>Lycka till!<br><br>", true, 0, "larger");
        
        setTimeout(function() {
            create_line(" 3 ", true, 0);
        }, 3000);
        setTimeout(function() {
            create_line(" 2 ", true, 0);
        }, 4000);
        setTimeout(function() {
            create_line(" 1 ", true, 0);
        }, 5000);

        setTimeout(function() {
            mafy_question();
        }, 6000);


    
    }
    

    if (command == "write") {
        clear_inputhistory();
        document.capture = true;
        document.writecapture = true;
        clear_console_quick();
        create_line("Use '-stop' to escape. Use '-copy' to copy contents.", true, 0, "mini_comment");
    }

} /* --------- End of run() ------------- */





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
    
    create_line("Fråga " + questionNum + ".", true, 0);
    create_line(question, true, 0, "larger question");
    reload_math();
    
    document.title = "Fråga " + questionNum;
    input = document.getElementById("input");
}

function end_mafy() {
    clear_console_quick();
    create_line("Du fick " + document.correct + " rätt av " + document.total + " frågor. (" + Math.round((document.correct/document.total)*100) + "%)", true, 0, "larger");
    document.capture = false;
    document.mafycapture = false;
    document.title = "Mafy Klart.";
    godkänt = 30/75;
    if (document.correct/document.total >= godkänt) {
        create_line("Du fick godkänt! Gräns: 40%", true, 0, "correct");
    } else {
        create_line("Du fick underkänt. Gräns: 40%", true, 0, "wrong");
    }
    create_line("<br><br>", true, 0);
    reload_math();
}

function mafy_capture(value) {
    if (value[0] == "#") {
        create_line(value.substring(1), true, 0, "mini_comment");
        reload_math();
        return;
    }
    if (value[0] == "-") {
        if (value[1] == "r") {
            document.correct = document.correct + 1;
            create_line("+1 Rätt", true, 0, "correct");
        } else {
            document.wrong = document.wrong + 1;
            create_line("+1 Fel", true, 0, "wrong");
        }
        document.total = document.total + 1;
        
        return;
    }
    if (value == "" && document.mafy_revealed == true) {
        document.mafy_revealed = false;
        if (document.total < number_questions) {
            mafy_question();
        } else {
            end_mafy();
        }
        return;
    }
    create_line("<br><br>Tryck på enter för att fortsätta.", true, 0, "larger thicker");
    create_line("Verifiera: https://www.matematik-och-fysikprovet.se/tidigare-prov/", true, 0, "thicker");
    create_line("Rätt: " + document.correct + " Fel: " + document.wrong + " Totalt: " + document.total, true, 0, "thicker");
    document.mafy_revealed = true;
    create_line("<br><br>Ditt svar: " + value, true, 0, "answer_larger");
    create_line("Rätt svar: " + answer, true, 0, "answer_larger correct");
    reload_math();
}

function mafy_time(time){
    m = Math.round(time/0.6)/100;
    if (document.capture == false && time < original_time - 10) {
        return;
    }
    if (time == 0) {
        document.title = "Slut på tid!";
        return;
    }
    if (m == 1) {
        document.title = "1 minut kvar.";
    } else {
        document.title = m + " minuter kvar.";
    }
    setTimeout(function() {
        mafy_time(time - 1);
    }, 1000);
}

/*ADD: change text: arrow up -> get content of last,then upper line, 
        -> enter with that -> change content, same id*/
function write_capture(value) {
    if (value == "-copy") {
        lines = document.getElementById("output")
		.childNodes.length;
        construct = "";
        for(i=1;i<lines;i++) {
            line_content = document.getElementById("output").childNodes[i].textContent + "\n";
            construct += line_content;
        }
        navigator.clipboard.writeText(construct);
        alert("Copied");
        return
    }
    if (value[0] == "#") {
        value = "$" + value.substring(1) + "$";
    }
    create_line(value, true, 0, "clean");
    reload_math();
}