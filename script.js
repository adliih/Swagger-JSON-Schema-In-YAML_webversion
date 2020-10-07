/**
 * Created by Bikram Pandit on 8/18/2018.
 */
function submit() {
    resetOutput();
    parse(parseJson(), '')
}

function submitAsReponseSchema() {
    resetOutput();
    write("description: ''");
    write("schema:");
    let json = parseJson();
    parse(json, '  ');
    write('examples:');
    write('  application/json:');
    writeLines(JSON.stringify(json, null, '  ').split('\n'), '    ');
}

function parseJson() {
    return JSON.parse(document.getElementById("json_data").value);
}

function resetOutput() {
    document.getElementById('yaml_out').value = '';
}

function isWithExample() {
    return document.getElementById("is_with_example").checked;
}

function isEmpty(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

function parse(s, indent) {
    if (Array.isArray(s)) {
        write(indent + 'type: array');
        write(indent + 'items:');
        if (s.length !== 0) {
            parse(s[0], indent + '  ');
        } else {
            write(indent + '  type: object');
        }
    } else if (s === null) {
        write(indent + 'type: string');
    } else if (typeof s === 'object') {
        write(indent + 'type: object');
        if (isEmpty(s)) {
            return;
        }
        write(indent + 'properties:');
        for (let key in s) {
            write(indent + '  ' + key + ':');
            if(s.hasOwnProperty(key)){
                parse(s[key], indent + '    ');
            }
        }
    } else {
        write(indent + 'type: ' + (typeof s));
        if (isWithExample()) {
            write(indent + 'example: ' + s);
        }
    }
}

function write(s) {
    // console.log(s);
    document.getElementById('yaml_out').value += s + "\n";
}

function writeLines(lines, indent) {
    lines.forEach(line => {
        write(indent + line);
    });
}