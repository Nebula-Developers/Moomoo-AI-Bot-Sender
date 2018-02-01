const io = require("socket.io-client");
const request = require("request");
const http = require("http");
const url = require("url");
const fs = require("fs");
const {spawn} = require("child_process");

if (!fs.existsSync(`${__dirname}/lastUpdated.txt`) || Date.now() - parseInt(fs.readFileSync(`${__dirname}/lastUpdated.txt`, "utf8")) > 43200000){
  spawn("node", [`${__dirname}/autoupdate.js`], {
    stdio: "ignore",
    shell: true,
    detached: true
  });
}

var computer = null;

try {
	require.resolve("robotjs");
	computer = require("robotjs");
}catch(e){
	console.error("Robot.js was not installed correctly. Follow mouse function is disabled.");
}

const screen = computer && computer.getScreenSize();

var args = parseFlags(process.argv.slice(2).join(" "), ["--num", "--link", "--tribe", "--name", "--randNames", "--randSkins", "--chat", "--ai", "--probeTribe", "--probeName", "--autoHeal"]);

const httpServer = http.createServer((req, res) => {
  const args = url.parse(req.url, true).query;
  if (args.ownerID){
    ownerID = args.ownerID;
    console.log(`Set owner ID to ${args.ownerID}`);
  }
  res.writeHead(204);
  res.end();
});
httpServer.on("listening", () => {
  console.log(`Http server ready at ${Date.now()}`);
});
httpServer.listen(15729);

var ownerID = null;
var followID = null;

var attackFollowedPlayer = false;
var stay = false;

var goto = {x: null, y: null};

var mousePos = {x: 0, y: 0};
var followMouse = false;
var getMouseInputInterval = null;
if (computer){
	getMouseInputInterval = setInterval(() => {
  	mousePos = computer.getMousePos();
	}, 200);
}

function get(url){
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err){
        reject(err);
        return;
      }
      if (body){
        resolve(body);
      }
    });
  });
}

function parseFlags(string, flags_array){
	if (!Array.isArray(flags_array)){
		return {error: "Array of flags not found."};
	}
	var return_object = {};
	var flag_locations = [[-1, "null", []]];
	var string_array = string.split(' ');
	for (var i = 0; i < string_array.length; i++){
		if (flags_array.indexOf(string_array[i]) > -1){
			flag_locations.push([i, string_array[i], []]);
		}else{
			flag_locations[flag_locations.length - 1][2].push(string_array[i]);
		}
	}
	for (var i = 0; i < flag_locations.length; i++){
		return_object[flag_locations[i][1].replace(/^(-*)/g, '')] = {};
		return_object[flag_locations[i][1].replace(/^(-*)/g, '')].flagLocation = flag_locations[i][0];
		return_object[flag_locations[i][1].replace(/^(-*)/g, '')].value = flag_locations[i][2].join(' ');
	}
	return return_object;
}

function getIP(link){
  link = link.match(/(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g);
  if (link.length > 0){
    return link[link.length - 1];
  }else{
    return false;
  }
}

function processInput(line){
  var a = line.split(" ");
  var command = a.shift();
  if (command == "setowner"){
    ownerID = a[0];
  }
}

const names = [
  "Wally",
  "Tanika",
  "Lenna",
  "Reid",
  "Joshua",
  "Miguelina",
  "Enda",
  "Ona",
  "Natashia",
  "Matt",
  "Shenika",
  "Tommye",
  "Corrin",
  "Angelyn",
  "Owen",
  "Zachariah",
  "Renata",
  "Shiloh",
  "Joesph",
  "Teresia",
  "Barabara",
  "Bee",
  "Janae",
  "Christel",
  "Tequila",
  "Becki",
  "Jacki",
  "Eboni",
  "Madge",
  "Elizabeth",
  "Ingeborg",
  "Latoyia",
  "Aretha",
  "Cecile",
  "Verdell",
  "Valda",
  "Pandora",
  "Alvina",
  "Tiara",
  "Kristopher",
  "Mikel",
  "Annita",
  "Concetta",
  "Reita",
  "Clarine",
  "Warner",
  "Stephani",
  "Herlinda",
  "Jeraldine",
  "Hunter"
];

const allServers = require("./servers.json");

let bots = [];
let tribes = {};
let players = {};

class Bot {
  constructor(n, ip, name, tribe, chatMsg, ai, probe, autoHeal, randSkins){
    this.number = n;
    this.ip = ip;
    this.name = name || "unknown";
    this.tribe = tribe;
    this.chatMsg = chatMsg;
    this.origChatMsg = chatMsg;
    this.ai = ai;
    this.probe = probe;
    this.autoHeal = autoHeal;
    this.randSkins = randSkins;
    this.pos = {
      x: 0,
      y: 0
    };
		this.chatInterval = undefined;
		this.reqint = undefined;
    this.updateInterval = undefined;
    this.key = null;
    this.id = null;
  }
  async connect(){
	//try {
	//	this.key = /(\\x26\\x6b\\x3d)([a-zA-Z0-9]+)\'}\)\;\}/.exec(await get(`http://${this.ip}:3000/bundle.js`))[2];
	//}catch(e){}
    var sk = this.socket = io.connect(`http://${this.ip}:${5000 + (this.number % 11)}`, {
      reconnection: false,
      query: `man=1`, // &k=${this.key || "none"}
      transportOptions: {
        polling: {
          extraHeaders: {
            "Origin": "http://moomoo.io",
            "Referer": "http://moomoo.io"
          }
        }
      }
    });
    if (this.probe){
      sk.once("disconnect", () => {
        bots.splice(bots.indexOf(this), 1);
        this.socket.removeAllListeners();
  			this.socket = null;
        if (bots.length === 0){
          console.log("Probe finished.");
          process.exit();
        }
  		});
      sk.once("connect", () => {
        bots.push(this);
        this.spawn();
  		});
      // Spawn (id)
      sk.on("1", r => {
  			this.id = r;
        setTimeout(this.socket.disconnect.bind(this.socket), 5000);
      });
      // Leaderboard
      sk.on("5", data => {
        if (probeName && data.indexOf(probeName) > -1){
          console.log(`${this.ip}`);
          sk.disconnect();
        }
      });
      // ID (tribes[name, owner])
      sk.on("id", (data) => {
        data.teams.forEach(t => {
          if (probeTribe && t.sid == probeTribe){
            console.log(`${this.ip}`);
            sk.disconnect();
          }
        });
      });
      return true;
    }else{
      sk.once("disconnect", () => {
        bots.splice(bots.indexOf(this), 1);
        console.log(`${this.number} disconnected`);
  			clearInterval(this.chatInterval);
        clearInterval(this.reqint);
        clearInterval(this.updateInterval);
  			setTimeout(this.connect.bind(this), 2000);
        this.socket.removeAllListeners();
  			this.socket = null;
  		});
  		sk.once("connect", () => {
        console.log(`${this.number} connected`);
        bots.push(this);
        this.spawn();
  		});
      // Spawn (id)
      sk.on("1", r => {
        console.log(`${this.number} spawned`);
  			this.id = r;
  			this.tribe && sk.emit("8", this.tribe);
        if (this.chatMsg) this.chatInterval = setInterval(this.chat.bind(this), 3000);
  			this.tribe && (this.reqint = setInterval(this.join.bind(this), 5000));
        if (this.ai) this.updateInterval = setInterval(this.update.bind(this), 1000);
      });
      // Player Add ([l_id, id, name, x, y, angle, ?, ?, ?, ?], main)
      sk.on("2", (data, main) => {
        if (main){
          this.longId = data[0];
          this.id = data[1];
          this.pos.x = data[3];
          this.pos.y = data[4];
          this.angle = data[5];
        }
        players[data[1]] = {
          longID: data[0],
          name: data[2],
          x: data[3],
          y: data[4],
          angle: data[5],
          lastUpdated: Date.now()
        };
      });
      // Player Update ([id, x, y, angle, ?, ?, ?, tribe, ?, ?, ?, ?, ?])
      sk.on("3", (data) => {
        for (var i = 0, len = data.length / 13; i < len; i++){
          if (this.id == data[0 + i * 13]){
            this.pos.x = data[1 + i * 13];
            this.pos.y = data[2 + i * 13];
            this.angle = data[3 + i * 13];
          }
          if (!players[data[0 + i * 13]]){
            players[data[0 + i * 13]] = {
              x: data[1 + i * 13],
              y: data[2 + i * 13],
              angle: data[3 + i * 13],
              lastUpdated: Date.now()
            };
          }else{
            var p = players[data[0 + i * 13]];
            p.x = data[1 + i * 13];
            p.y = data[2 + i * 13],
            p.angle = data[3 + i * 13],
            p.lastUpdated = Date.now()
          }
        }
        this.update();
      });
      // Player Remove (l_id)
      sk.on("4", (longID) => {
        if (this === bots[0]){
          for (var k in players){
            if (this === bots[0]){
              if (players[k].longID == longID) delete players[k];
            }
          }
        }
      });
      // Damaged
      if (this.autoHeal){
	sk.on("10", (id, health) => {
		if (id == this.id && health < 100) {
			setTimeout(this.heal.bind(this), 75 + (Math.random() / 10) | 0);
		}
	});
      }
      // Death
      sk.on("11", () => {
        console.log(`${this.number} died`);
        clearInterval(this.chatInterval);
        clearInterval(this.reqint);
        clearInterval(this.updateInterval);
  			setTimeout(this.spawn.bind(this), 20);
  		});
      // Tribe Delete (name)
      sk.on("ad", (name) => {
        if (this === bots[0]){
          if (tribes[name]) delete tribe[name];
        }
      });
      // Tribe add request ({sid, owner})
      sk.on("ac", (data) => {
        tribes[name] = {owner: data.owner, players: []};
      });
      // Tribe join request (id, name)
      sk.on("an", (id, name) => {
        sk.emit("11", id, 1);
        if (players[id]){
          players[id].inMainTribe = true;
        }else{
          players[id] = {inMainTribe: true};
        }
      });
      // Chat (id, name)
      sk.on("ch", (id, msg) => {
        if (id != ownerID) return;
        if (!msg.startsWith("!")) return;
        const args = msg.slice(1).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (command === "fme"){
          goto.x = goto.y = null;
          stay = false;
          followID = ownerID;
          attackFollowedPlayer = false;
          followMouse = false;
        }else if (command === "id"){
          var a = [];
          for (var k in players){
            if (players[k].name === args.join(" ")) a.push(k);
          }
          if (a.length > 0){
            this.chatMsg = a.join(", ").slice(0, 30);
          }else{
            this.chatMsg = "Player not in memory.";
          }
          clearInterval(this.chatInterval);
          setTimeout(this.chat.bind(this), 1000);
        }else if (command === "fid"){
          goto.x = goto.y = null;
          stay = false;
          followID = parseInt(args[0]);
          attackFollowedPlayer = false;
          followMouse = false;
        }else if (command === "atkid"){
          goto.x = goto.y = null;
          stay = false;
          followID = parseInt(args[0]);
          attackFollowedPlayer = true;
          followMouse = false;
        }else if (command === "s"){
          goto.x = goto.y = null;
          stay = true;
          followID = null;
          attackFollowedPlayer = false;
          followMouse = false;
        }else if (command === "r"){
          goto.x = goto.y = null;
          stay = false;
          followID = null;
          attackFollowedPlayer = false;
          followMouse = false;
        }else if (command === "fm" && computer){
          goto.x = goto.y = null;
          stay = false;
          followID = null;
          attackFollowedPlayer = false;
          followMouse = true;
        }
      });
      // ID (tribes[name, owner])
      sk.on("id", (data) => {
        if (this === bots[0]){
          data.teams.forEach(t => {
            tribes[t.sid] = {owner: t.owner, players: []};
          });
        }
      });
      // Tribe Update [id_1, name_1, ...]
      sk.on("sa", (data) => {
        if (tribes[this.tribe]){
          tribes[this.tribe].players = [];
          for (var i = 0, len = data.length; i < len; i += 2){
            tribes[this.tribe].players.push({id: data[i], name: data[i + 1]});
          }
        }
      });
      // Tribe Start (name, owner)
      sk.on("st", (name, owner) => {
        if (this === bots[0]){
          tribes[name] = {owner: owner, players: []};
        }
      });
      sk.on("p", (x, y) => {
        goto.x = x;
        goto.y = y;
      });
      return true;
    }
  }
  disconnect(){
		this.socket.disconnect();
  }
  spawn(){
    this.socket && this.socket.emit("1", {name: this.name, moofoll: true, skin: this.randSkins ? Math.round(Math.random() * 5) : 0});
		this.socket && this.socket.emit("7", 1);
  }
  join(){
    this.socket && this.tribe && this.socket.emit("10", this.tribe);
  }
  heal(){
    this.socket.emit("5", 0, null);
    this.socket.emit("4", 1, null);
    this.socket.emit("5", 0, true);
  }
  chat(){
    this.socket.emit("ch", this.chatMsg);
    this.chatMsg = this.origChatMsg;
    if (this.origChatMsg && !this.chatInterval){
      this.chatInterval = setInterval(this.chat.bind(this), 3000);
    }
  }
  update(){
    if (!this.ai) return;
    if (stay){
      this.socket.emit(3, null);
    }else if (followMouse){
      const p = players[ownerID];
      if (p && p.x){
        var targetX = p.x + (mousePos.x - screen.width / 2);
        var targetY = p.y + (mousePos.y - screen.height / 2);
        if (Math.pow(this.pos.x - targetX, 2) + Math.pow(this.pos.y - targetY, 2) < 20000){
          this.socket.emit(2, p.angle);
          this.socket.emit(3, null);
        }else{
          this.socket.emit(2, Math.atan2(targetY - this.pos.y, targetX - this.pos.x));
          this.socket.emit(3, Math.atan2(targetY - this.pos.y, targetX - this.pos.x));
        }
      }
    }else if (followID && players[followID]){
      const p = players[followID];
      if (p && p.x){
        if (!attackFollowedPlayer){
          if (Math.pow(this.pos.x - p.x, 2) + Math.pow(this.pos.y - p.y, 2) < 20000){
            this.socket.emit(2, p.angle);
            this.socket.emit(3, null);
          }else{
            this.socket.emit(2, Math.atan2(p.y - this.pos.y, p.x - this.pos.x));
            this.socket.emit(3, Math.atan2(p.y - this.pos.y, p.x - this.pos.x));
          }
        }
      }
    }else if (goto.x && goto.y){
      if (Math.pow(this.pos.x - goto.x, 2) + Math.pow(this.pos.y - goto.y, 2) < 40000){
        this.socket.emit(2, 0);
        this.socket.emit(3, null);
      }else{
        this.socket.emit(2, Math.atan2(goto.y - this.pos.y, goto.x - this.pos.x));
        this.socket.emit(3, Math.atan2(goto.y - this.pos.y, goto.x - this.pos.x));
      }
      return;
    }else{
      this.socket.emit(3, null);
    }
  }
}

var numBots = (args.num && parseInt(args.num.value)) || 0;
var link = (args.link && getIP(args.link.value)) || null;
var name = (args.randNames && args.randNames.value.toLowerCase() != "false" && args.randNames.value != 0) ? true : ((args.name && args.name.value) || "unknown");
var tribe = (args.tribe && args.tribe.value) || null;
var chat = (args.chat && args.chat.value) || null;
var ai = args.ai && args.ai.value.toLowerCase() != "false" && args.ai.value.toLowerCase() != "0";
var probeTribe = args.probeTribe && args.probeTribe.value;
var probeName = args.probeName && args.probeName.value;
var probe = probeTribe || probeName;
var autoHeal = !args.autoHeal || (args.autoHeal.value.toLowerCase() != "false" && args.autoHeal.value.toLowerCase() != "0");
var randSkins = args.randSkins && args.randSkins.value.toLowerCase() != "false" && args.randSkins.value.toLowerCase() != "0";
typeof name === "string" && (name = name.slice(0, 16));
tribe && (tribe = tribe.slice(0, 6));
chat && (chat = chat.slice(0, 30));

if (probe){
  console.log(`Initiating probe for${probeTribe ? ` tribe ${probeTribe}` : ""}${probeName ? ` player ${probeName}` : ""}.`);
  (function connectBots(i){
    if (i <= 0) return;
    var promises = [];
    for (var j = i; (j > i - 8) && (j > 0); j--){
      promises.push(new Bot(j, allServers[j - 1], "PROBE", tribe, chat, ai, probe, autoHeal, randSkins).connect())
    }
    Promise.all(promises).then(() => {
      connectBots(i - 8);
    }).catch(console.error);
  })(allServers.length);
}else{
  (function connectBots(i){
    if (i <= 0) return;
    var promises = [];
    for (var j = i; (j > i - 8) && (j > 0); j--){
      promises.push(new Bot(j, link, name === true ? names[(Math.random() * names.length) | 0] : name, tribe, chat, ai, probe, autoHeal, randSkins).connect())
    }
    Promise.all(promises).then(() => {
      connectBots(i - 8);
    }).catch(console.error);
  })(numBots);
}

process.stdin.setEncoding("utf8");
process.stdin.on("data", data => {
  data.split(/[\r\n]+/).forEach(l => {
    processInput(l.trim());
  });
});
process.stdin.resume();
