console.log(
"\x1b[1;32m%s\x1b[0m",
`
                  ▄▄███▄                ▐██████▌
                 ████████▄              ▐██████▌
                 █████████▌             ▐██████▌
                 ███████████▄           ▐██████▌
                 █████████████▄         ▐██████▌
                 ██████▌▀███████▄       ▐██████▌
                 ██████▌  ▀███████▄     ▐██████▌
                 ██████▌    ▀███████▄   ▐██████▌
                 ██████▌      ▀███████▄ ▐██████▌
                 ██████▌        ▀██████▄▐██████▌
                 ██████▌         ▀█████████████▌
                 ██████▌           ▀███████████▌
                 ██████▌             ▀█████████▌
                 ██████▌               ▀███████▌
                 ██████▌                 ▀████▀
`
);
console.log("Checking for updates...");

const AutoUpdater = require("auto-updater");
const fs = require("fs");

const autoupdater = new AutoUpdater({
  pathToJson: "",
  autoupdate: false,
  checkgit: true,
  jsonhost: "raw.githubusercontent.com",
  contenthost: "codeload.github.com",
  progressDebounce: 0,
  devmode: false
});

process.stdin.setEncoding("utf8");

autoupdater.on("check.up-to-date", function (v){
  autoupdater.removeAllListeners("end");
  fs.writeFileSync(`${__dirname}/lastUpdated.txt`, Date.now().toString(), "utf8");
  console.log(`Your version (${v}) is up to date.`);
  setTimeout(process.exit, 2500);
});

autoupdater.on("check.out-dated", function (v_old, v){
  console.log(`Your version (${v_old}) is outdated.\nWould you like to download version ${v}?\n(Y//N)`);
  function askForUpdate(data){
    const reply = data.split(/[\r\n]+/)[0].toUpperCase();
    if (reply === "Y"){
      autoupdater.fire("download-update");
    }else if (reply === "N"){
      console.log("The update will not be downloaded.");
      console.log("You may close this window now.");
    }else{
      console.log("Invalid response.");
      console.log(`Your version (${v_old}) is outdated.\nWould you like to download version ${v}?\n(Y//N)`);
      process.stdin.once("data", askForUpdate);
    }
  }
  process.stdin.once("data", askForUpdate);
});

autoupdater.on("update.downloaded", function (){
  console.log("Update downloaded. Installing...");
  autoupdater.fire("extract");
});
autoupdater.on("update.not-installed", function (){
  console.log("The update has already been downloaded. Installing...");
  autoupdater.fire("extract");
});
autoupdater.on("update.extracted", function (){
  console.log("Update installed successfully!");
  console.log("Check showid.js for any changes and update your Tampermonkey script as necessary");
  console.log("Changes will be stored in changelog.txt.")
  console.log("Please restart the app for changes to take effect!");
});
autoupdater.on("download.start", function (name){
  console.log(`Downloading ${name}...`);
});
autoupdater.on("download.progress", function (name, perc){
  process.stdout.write("Downloading " + perc + "% \033[0G");
});
autoupdater.on("download.end", function (name){
  console.log(`Finished downloading ${name}.`);
});
autoupdater.on("download.error", function (err){
  console.error(`Error when downloading: ${err}`);
});
autoupdater.on("end", function (){
  fs.writeFileSync(`${__dirname}/lastUpdated.txt`, Date.now().toString(), "utf8");
  console.log("===== AUTO UPDATE FINISHED =====");
  console.log(`Newest Updates:\n${fs.readFileSync(`${__dirname}/changelog.txt`, "utf8").split(/\r?\n\r?\n/).slice(0, 3).join("\n\n")}`);
  console.log("Please read the changelog carefully.");
  console.log("You may close this window now.");
});
autoupdater.on("error", function (name, e){
  console.error(name, e);
});

autoupdater.fire("check");

process.stdin.resume();
