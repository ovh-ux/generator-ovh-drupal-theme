"use strict";
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-test");

describe("generator-ovh-drupal-theme:app", () => {
    beforeAll(() => {
        return helpers.run(path.join(__dirname, "../generators/app"))
            .withPrompts({});
    });

    it("creates files", () => {
        assert.file([
            "package.json",
            "gulpfile.js",
            "js/main.js",
            "scss/main.scss"
        ]);
    });
});
