#! /usr/bin/env node

import { Command } from "commander";

import main from "./main";
import version from "./version";

const cli = new Command();

interface InterfaceCLI {
  debug?: boolean;
  date?: string;
}

cli
  .option("-v, --version", "show version", version, "")
  .option("-D, --debug", "output extra debugging")
  .option("-d, --date <type>", "search by date (defaults to today)");

cli.parse(process.argv);
const options: InterfaceCLI = cli.opts();

void (async () => {
  await main({
    debug: !!options.debug,
    date: options.date || "today",
  });
})();
