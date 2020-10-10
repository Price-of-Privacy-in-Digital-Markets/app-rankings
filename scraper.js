"use strict";

const yargs = require("yargs")
const gplay = require("google-play-scraper")
const appstore = require("app-store-scraper")


function pretty_json_stdout(json) {
    console.log(JSON.stringify(json, (key, value) => {
        if (value instanceof Date) {
            return value.toUTCString();
        }
        return value;
    }, 2));
}

yargs
    .command(
        "play_store <collection>",
        "Scrape rankings from the Google Play Store",
        (yargs) => {
            yargs
                .positional("collection", {
                    type: "string",
                    choices: Object.keys(gplay.collection),
                    require: true
                })
                .option("category", {
                    type: "string",
                    choices: Object.keys(gplay.category)
                })
                .option("country", {
                    type: "string",
                    default: "us"
                })
                .option("language", {
                    type: "string",
                    default: "en"
                })
                .option("num", {
                    type: "number",
                    default: 200
                })
        },
        (argv) => {
            (async() => {
                const apps = await gplay.list({
                    category:  gplay.category[argv.category],
                    collection: gplay.collection[argv.collection],
                    lang: argv.language,
                    country: argv.country,
                    num: argv.num
                })
                pretty_json_stdout(apps)
            })().catch(err => {
                console.log(err.stack)
                process.exitCode = 1
            })
        }
    )
    .command(
        "app_store <collection>",
        "Scrape rankings from the Apple App Store",
        (yargs) => {
            yargs
                .positional("collection", {
                    type: "string",
                    choices: Object.keys(appstore.collection),
                    require: true
                })
                .option("category", {
                    type: "string",
                    choices: Object.keys(appstore.category)
                })
                .option("country", {
                    type: "string",
                    default: "us"
                })
                .option("num", {
                    type: "number",
                    default: 200
                })
        },
        (argv) => {
            (async() => {
                const apps = await appstore.list({
                    category:  appstore.category[argv.category],
                    collection: appstore.collection[argv.collection],
                    country: argv.country,
                    num: argv.num
                })
                pretty_json_stdout(apps)
            })().catch(err => {
                console.log(err.stack)
                process.exitCode = 1
            })
        }
    )
    .help()
    .strict()
    .argv
