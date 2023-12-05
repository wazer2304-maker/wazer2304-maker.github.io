window.onload = function () { // when the page loads
	document.capture = false;
	input = document.getElementById("input");
	input.onkeyup = function (e) {
		var ev = e || event;
		if (ev.keyCode == 13) {
			if (document.capture==false) {
				interpret(input.value.toLowerCase());
			} else {
				captured_input(input.value);
			}
			input.value = "";
		}
	}
};

function append(element) {
    document.getElementById("output").appendChild(element);
}

function scroll_to_latest(lines) {
	document.getElementById("line" + lines)
		.scrollIntoView();
}

function create_line(text, system, option, class_name) {
	var line = document.createElement("p");
	if (option == 2) {
		text = '<i class="fa-solid fa-rectangle-xmark"></i>' + " ERROR: " + text;
		line.className = "console_error";
	}
	else
	if (option == 1) {
		text = '<i class="fa-solid fa-shield"></i>' + " WARNING: " + text;
		line.className = "console_warning";
	}
	if (system == true) {
		line.className = line.className + " console_output";
	}
	else {
		text = user + "&gt; " + text;
	}
	lines = document.getElementById("output")
		.childNodes.length;
	line.id = "line" + lines;
	line.innerHTML = text;
	line.className = line.className + " " + class_name;
	document.getElementById("output")
		.appendChild(line);
	scroll_to_latest(lines);
}

function clear_console() {
create_line("Console cleared.", true, 0);
setTimeout(function() {
	document.getElementById("output")
	.innerHTML = "";
}, 600);
}

function clear_console_quick() {
		document.getElementById("output")
		.innerHTML = "";
}

function reload_math() {
	MathJax.Hub.Typeset();
}

function captured_input(value) {
	if (value == "-stop") {
		document.capture = false;
		document.writecapture = false;
		document.mafycapture = false;
		clear_console_quick();
		create_line("Exited capture mode.", true, 0);
	} else {
		if (document.mafycapture == true) {
			mafy_capture(value);
		}
		if (document.writecapture == true) {
			write_capture(value);
		}
	}
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function get_args(data) { // returns a json object of the arguments
	args = {};
	deconstruct_input = data.split(" ");
	for (var i = 0; i < deconstruct_input.length; i++) {
		obj = deconstruct_input[i];
		if (obj[0] == "/") {
			obj = obj.replace("/", "");
			add_term = [];
			for (var n = i + 1; n < i + 20; n++) {
				if (deconstruct_input[n] == null || deconstruct_input[n].replace(" ", "") == "" || deconstruct_input[n][0] == "/") {
					break;
				}
				term = deconstruct_input[n];
				add_term.push(term);
			}
			args[obj] = add_term;
		}
	}
	json_args = JSON.stringify(args);
	return json_args;
}

function get_command(data) { // returns the command
	command = data.split(" ")[0];
	return command;
}

function get_uninterpreted(data, command, command_args) { // returns the uninterpreted input
	uninterpreted = data.split(" ");
	uninterpreted.shift();
	uninterpreted = uninterpreted.join(" ");
	return uninterpreted;
}

function containsObject(obj, list) {
	var i;
	len = list.length;
	for (i = 0; i < len; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}

function check_for_redundant_arguments(command, command_args) { // checks for redundant arguments
	available = argument_acceptors[command];
	redundant_arguments = [];
	command_args = JSON.parse(command_args);
	red = Object.keys(command_args);
	for (var i = 0; i < red.length; i++) {
		if (!containsObject(red[i], available)) {
			redundant_arguments.push(red[i]);
		}
	}
	return redundant_arguments;
}

function does_command_exist(command) { // checks if the command exists
	if (command in argument_acceptors) {
		return true;
	}
	else {
		return false;
	}
}

function interpret(input) { // interprets the input
	create_line(input, false, 0);
	command = get_command(input);
	command_args = get_args(input);
	does_exist = does_command_exist(command);
	if (does_exist == true) {
		/*uninterpreted = get_uninterpreted(input, command, command_args);
		console.log("4) uninterpreted: " + uninterpreted);*/
		redundant_arguments = check_for_redundant_arguments(command, command_args);
		if (redundant_arguments[0]) {
			create_line("Redundant arguments: " + redundant_arguments, true, 1);
			default_arg(command);
		}
		execute(command, JSON.parse(command_args));
	}
	else {
		create_line("Command does not exist, Type 'help' for available commands.", true, 2)
	}
}

function available_arguments(command) { // returns the available argument/s
	args = argument_acceptors[command];
	format = "<br>&nbsp;";
	if (args[0] == null) {
		args = format + " <span class='dehance'>(None)</span>";
		len = 0;
	} else {
		len = args.length;
		args = format + " &gt; /" + args.join(format+" &gt; /") + " "; 
	}
	return args, ("(" + len + ")");
}

function default_arg(command) {
	args, length = available_arguments(command);
	create_line("Available arguments: " + length + args, true, 0);
}

function default_help() {
	create_line("Available commands: ", true, 0);
	for (var i = 0; i < Object.keys(argument_acceptors).length; i++) {
		command = Object.keys(argument_acceptors)[i];
		args, length = available_arguments(command);
		create_line("  " + command.toUpperCase() + " " + length + args, true, 0);
	}
}

function execute(command, command_args) { // executes the command
	command = command.toLowerCase();
	try {
		document.title = input.value;
		run(command, command_args);
	}
	catch (err) {
		create_line(err, true, 2);
	}
}
