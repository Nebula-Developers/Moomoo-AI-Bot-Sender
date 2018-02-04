// ==UserScript==
// @name         Moomoo Bot Utilities
// @namespace    https://discord.gg/Uj3GWPy
// @version      1.1
// @description  Shows your internal ID and position.
// @author       Mega_Mewthree
// @match        *://moomoo.io/*
// @match        *://45.77.0.81/*
// @match        *://dev.moomoo.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

let showidScript = {};

var showidScript.ws = null;
var showidScript.id = null;
var showidScript.pos = [];

WebSocket = class extends WebSocket {
    constructor(...arg) {
        super(...arg);
        showidScript.ws = this;
        this.addEventListener('message', function(e){
            handleMessage(e);
        });
    }
};

function handleMessage(e){
    let m = e.data;
    if (!m.startsWith(`42["2",`) && !m.startsWith(`42["3",`) && !m.startsWith(`42["5",`) && !m.startsWith(`42["6",`)) displayID();
    if (m.startsWith(`42["1",`)){
        showidScript.id = /(42\[\"1\",)([0-9]+)\]/.exec(m)[2];
        const req = new XMLHttpRequest();
        req.open("POST", `http://localhost:15729/?ownerID=${id}`, true);
        req.send();
    }else if (m.startsWith(`42["3",`)){
        let packet = m.replace(`42["3",`, "");
        packet = packet.substr(0, packet.length - 1);
        let data = JSON.parse(packet);
        for (let i = 0, len = data.length / 13; i < len; i++){
            if (showidScript.id == data[0 + i * 13]){
                showidScript.pos[0] = data[1 + i * 13];
                showidScript.pos[1] = data[2 + i * 13];
            }
        }
    }
}

function displayID(){
    let t = document.getElementById("ageText");
    let age = /AGE [0-9]+/.exec(t.innerHTML);
    t.innerHTML = `${age && age[0]} (${showidScript.id}) [${showidScript.pos.join(", ")}]`;
}

setInterval(() => {
    if (showidScript.id){
        const req = new XMLHttpRequest();
        req.open("POST", `http://localhost:15729/?ownerID=${showidScript.id}`, true);
        req.send();
    }
}, 5000);
