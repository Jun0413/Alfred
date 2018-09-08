/**
 * Try the api /query of DialogFlow
 */
var xhr = new XMLHttpRequest();
xhr.open("POST", yourUrl, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    value: value
}));