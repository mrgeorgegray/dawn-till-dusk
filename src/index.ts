#! /usr/bin/env node

import * as yargs from "yargs";

import main from "./main";

const args = yargs
  .usage("Usage: dtd <command> [options]")
  .command("dtd", "Display sunrise & sunset times")
  .example(
    "dtd -d '2021-08-12'",
    "display sunrise & sunset times for a given day"
  )
  .alias("version", "v")
  .option("help", {
    alias: "h",
    type: "boolean",
    description: "Show help",
    default: false,
  })
  .option("clean", {
    alias: "c",
    type: "boolean",
    description: "Clear data cache",
    default: false,
  })
  .option("date", {
    alias: "d",
    type: "string",
    description: "Search by date",
    default: "today",
  })
  .option("logging", {
    alias: "l",
    type: "boolean",
    description: "Output extra logging info",
    default: false,
  }).argv;

void (async () => {
  try {
    const output = await main({
      clean: args.clean,
      date: args.date,
      debug: args.logging,
    });
    console.log(output);
  } catch (error) {
    console.log(error);
  }
})();
