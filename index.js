#! /usr/bin/env node

const program = require("commander");

const version = require("./src/version");
const showData = require("./src/main");

program
  .option("-v, --version", "show version", version, "")
  .option("-D, --debug", "output extra debugging")
  .option("-d, --date <type>", "search by date (defaults to today)");

program.parse(process.argv);
const options = program.opts();

(async () => {
  await showData({
    debug: options.debug,
    date: options.date || "today",
  });
})();
