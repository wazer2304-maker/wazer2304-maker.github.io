Object.defineProperty(String.prototype, 'cap', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });


function a() {
 l = document.getElementById('la');
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    let text = '';


    rubrik = inputs[0].value;
    if(rubrik == "") {
        rubrik = "Laborationsrapport";
    }
    text += "<h1>"+rubrik.cap() + '</h1>\n';
    kurs = inputs[6].value;
    
    if(!(inputs[6].value == "")) {
    text += "<h2>Laborationsrapport för "+kurs.toLowerCase() + ".</h2>\n";
    }

    if(!(inputs[1].value == "")) {
    text += "<h3>Laborant: "+inputs[1].value + '</h3>\n';
    }
    if(!(inputs[2].value == "")) {
    text += "<h3>Medlaborant/er: "+inputs[2].value + '</h3>\n';
    }
    if(!(inputs[3].value == "")) {
    text += "<h3>Klass: "+inputs[3].value + '</h3>\n';
    }
    if(!(inputs[4].value == "")) {
    text += "<h3>Skola: "+inputs[4].value + '</h3>\n';
    }
    if(!(inputs[5].value == "")) {
    text += "<h3>Laboration utförd "+inputs[5].value + '</h3>\n';
    }
    text += `\n\n<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n\n`;
    
    
    text += "<br><br><br><h1>Inledning</h1>\n";
    
    if(!(textareas[0].value == "")) {
    text += "<h2>Bakgrund</h2>\n";
    text += textareas[0].value;
    }
    if(!(textareas[1].value == "")){
    text += "<h2>Syfte</h2>\n";
    text += textareas[1].value;
}
    if(!(textareas[2].value == "")){
    text += "<h2>Frågeställning</h2>\n";
    text += textareas[2].value;
}
    if(!(textareas[3].value == "")){
    text += "<br> " + textareas[3].value;
}
    
    
    
    text += "<br><br><br><h1>Metod</h1>\n";
    
    if(!(textareas[4].value == "")){
    text += "<h2>Materiel </h2>\n";
    text += textareas[4].value;
}
    if(!(textareas[5].value == "")){
    text += "<h2>Kemikalier</h2>\n";
    text += textareas[5].value;
}
    if(!(textareas[6].value == "")){
    text += "<h2>Genomförande</h2>\n";
    text += textareas[6].value;   
}
    
    text += "<br><br><br><h1>Resultat</h1>\n";
    
    if(!(textareas[7].value == "")){
    text += "<h2>Tabell</h2>\n";
    text += textareas[7].value;
}
    
    if(!(textareas[8].value == "")){
    text += "<h2>Diagram</h2>\n";
    text += textareas[8].value;
}
    
    if(!(textareas[9].value == "")){
    text += "<h2>Beräkningar och Resultat</h2>\n";
    text += textareas[9].value;
}
    
    text += "<br><br><br><h1>Diskussion</h1>\n";

    if(!(textareas[10].value == "")){
    text += "<h2>Besvarande</h2>\n";
    text += textareas[10].value;
}
    
    if(!(textareas[11].value == "")){
    text += "<h2>Felkälla (1)</h2>\n";
    text += textareas[11].value;
}
    
    if(!(textareas[12].value == "")){
    text += "<h2>Felkälla (2)</h2>\n";
    text += textareas[12].value;
}
    if(!(textareas[13].value == "")){
    text += "<h2>Felkälla (3)</h2>\n";
    text += textareas[13].value;
}
    if(!(textareas[14].value == "")){
    text += "<h2>Resultatets trovärdighet</h2>\n";
    text += textareas[14].value;
}
    if(!(textareas[15].value == "")){
    text += "<h2>Vad som kan förbättras</h2>\n";
    text += textareas[15].value;
}
    if(!(textareas[16].value == "")){
    text += "<h2>Sammanfattning</h2>\n";
    text += textareas[16].value;
}
    if(!(textareas[17].value == "")){
    text += "<br><br><br><h1>Referenser & Källor</h1>\n"; 
    text += textareas[17].value;
}
    
    l.innerHTML = text;
}
