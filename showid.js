var ws = null;
var id = null;
var pos = [];

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    this.oldSend(m);
    if (!ws){
        ws = this;
        socketFound(this);
    }
};

function socketFound(socket){
    socket.addEventListener('message', function(e){
        handleMessage(e);
    });
}

function handleMessage(e){
    var m = e.data;
    if (!m.startsWith(`42["2",`) && !m.startsWith(`42["3",`) && !m.startsWith(`42["5",`) && !m.startsWith(`42["6",`)) displayID();
    if (m.startsWith(`42["1",`)){
        id = /(42\[\"1\",)([0-9]+)\]/.exec(m)[2];
    }else if (m.startsWith(`42["3",`)){
        var packet = m.replace(`42["3",`, "");
        packet = packet.substr(0, packet.length - 1);
        var data = JSON.parse(packet);
        for (var i = 0, len = data.length / 13; i < len; i++){
            if (id == data[0 + i * 13]){
                pos[0] = data[1 + i * 13];
                pos[1] = data[2 + i * 13];
            }
        }
    }
}

function displayID(){
    var t = document.getElementById("ageText");
    var age = /AGE [0-9]+/.exec(t.innerHTML);
    t.innerHTML = `${age && age[0]} (${id}) [${pos.join(", ")}]`;
}