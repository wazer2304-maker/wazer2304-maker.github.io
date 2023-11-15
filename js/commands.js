var user = "waz";
var capture = false;

const argument_acceptors = {
	"console": ["color", "background", "size", "clear", "reset"],
	"help": [],
	"link": ["url", "links"],
	"name": ["set"],
	"mafy": ["questions", "tpq", "help", "todo"],
	"clear": [],
    "mira": []
}
const links = {
	"saits": "https://saits-vaxjo.se.ist.com/student/",
	"ist": "https://vaxjo-student-learn.se.ist.com/index.html#/app/review",
	"schema": "https://web.skola24.se/timetable/timetable-viewer/vaxjo.skola24.se/Katedralskolan/",
	"mat": "https://mpi.mashie.com/public/app/V%C3%A4xj%C3%B6%20kommun%20ny/6f5fa240"
}

command_exceptions = ["help", "clear", "mafy", "mira"];

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
            .style.color = "lightblue";
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

    if (command_args["links"]) {
            create_line("Available links: ", true, 0);
            for (var key in links) {
                create_line("&nbsp; > " + key, true, 0);
            }
    }
}

    
    
    /* mafy command */
    if (command == "mafy") {
        if (command_args["todo"]) {
            create_line("fysik 2, trigonometri, ekvationer, icke reellt, geo summa ", true, 0);
            return;
        }
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
        create_line("<br>Lycka till!<br><br>", true, 0, "larger correct");
        
        setTimeout(function() {
            create_line(" 3 !::", true, 0, "red");
        }, 3000);
        setTimeout(function() {
            create_line(" 2 !!:", true, 0, "yellow");
        }, 4000);
        setTimeout(function() {
            create_line(" 1 !!!", true, 0, "green");
        }, 5000);

        setTimeout(function() {
            mafy_question();
        }, 6000);


    
    }

    if (command == "mira") {
        clear_console_quick();
        for(i = 0; i < 100; i++) {
            create_line("JAG ÄLSKAR DIG " + (i+1) + "%", true, 0, "larger correct");
        }
    }


} /* --------- End of run() ------------- */






function mafy_img_parse(question) {
    if (question.includes("![](")) {
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
    answer = mafy_img_parse(answer);
    create_line("<br><br>Ditt svar: " + value, true, 0, "answer_larger");
    create_line("Rätt svar: " + answer, true, 0, "answer_larger correct");
    create_line("<br><br>Tryck på enter för att fortsätta.", true, 0, "larger");
    create_line("Rätt: " + document.correct + " Fel: " + document.wrong + " Totalt: " + document.total, true, 0);
    document.mafy_revealed = true;
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
