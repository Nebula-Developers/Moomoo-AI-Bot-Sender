// ==UserScript==
// @name         Moomoo Bot Utilities
// @namespace    https://discord.gg/Uj3GWPy
// @version      1.4.0
// @description  Shows your internal ID and position.
// @author       Mega_Mewthree
// @match        *://moomoo.io/*
// @match        *://45.77.0.81/*
// @match        *://dev.moomoo.io/*
// @grant        none
// @require      https://cdn.rawgit.com/creationix/msgpack-js-browser/9117d0f8/msgpack.js
// @run-at       document-start
// ==/UserScript==

(() => {
    var ws = null;
    var id = null;
    var pos = [];

    WebSocket = class extends WebSocket {
        constructor(...arg) {
            super(...arg);
            ws = this;
            this.addEventListener("message", function(e){
                handleMessage(e);
            });
            this._send = this.send;
            this.send = function (){
                if (typeof arguments[0] !== "string"){
                    try {
                        const sent = msgpack.decode(arguments[0].slice(1));
                        if (sent[0] === "1"){
                            const req = new XMLHttpRequest();
                            req.open("POST", `http://localhost:15729/?spawned=true`, true);
                            req.send();
                        }
                    }catch (e){
                        console.error(e);
                    }
                }
                this._send.apply(this, arguments);
            };
        }
    };

    function handleMessage(e){
        var m = e.data;
        if (typeof m === "string") return;
        m = msgpack.decode(m.slice(1)).data;
        if (m[0] !== "2" && m[0] !== "3" && m[0] !== "5" && m[0] !== "6") displayID();
        if (m[0] === "1"){
            id = m[1];
            const req = new XMLHttpRequest();
            req.open("POST", `http://localhost:15729/?ownerID=${id}`, true);
            req.send();
        }else if (m[0] === "3"){
            for (var i = 0, len = m[1].length / 13; i < len; i++){
                if (id === m[1][i * 13]){
                    pos[0] = m[1][1 + i * 13];
                    pos[1] = m[1][2 + i * 13];
                }
            }
        }
    }

    function displayID(){
        var t = document.getElementById("ageText");
        var age = /AGE [0-9]+/.exec(t.innerHTML);
        t.innerHTML = `${age && age[0]} (${id}) [${pos.join(", ")}]`;
    }

    setInterval(() => {
        if (id){
            const req = new XMLHttpRequest();
            req.open("POST", `http://localhost:15729/?ownerID=${id}`, true);
            req.send();
        }
    }, 5000);
})();
