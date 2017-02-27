"use strict";

const ImageData = require("../lib/ImageData");
const test      = require("ava");

test("Build output path", t => {
    const image = new ImageData("a/b/c/key.png", "bucket", "data", {});

    // No directory
    t.is(image.combineWithDirectory(undefined), "a/b/c/key.png");

    // Empty directory
    t.is(image.combineWithDirectory(""), "key.png");

    // Relative directory
    t.is(image.combineWithDirectory("./d"), "a/b/c/d/key.png");

    // Internal directory
    t.is(image.combineWithDirectory("./d/e"), "a/b/c/d/e/key.png");

    // External directory
    t.is(image.combineWithDirectory(".."), "a/b/key.png");

    // External internal directory
    t.is(image.combineWithDirectory("../d"), "a/b/d/key.png");

    // Root directory
    t.is(image.combineWithDirectory("d"), "d/key.png");

    // Root internal directory
    t.is(image.combineWithDirectory("d/e"), "d/e/key.png");

    // With prefix
    t.is(image.combineWithDirectory("d/e", "prefix-"), "d/e/prefix-key.png");

    // With suffix
    t.is(image.combineWithDirectory("d/e", "", "-suffix"), "d/e/key-suffix.png");

    // With prefix and suffix
    t.is(image.combineWithDirectory("d/e", "prefix-", "_suffix"), "d/e/prefix-key_suffix.png");
});

test("Build output path with template", t => {
    const image = new ImageData("a/b/c/key.png", "bucket", "data", {});

    // No directory
    t.is(image.combineWithDirectory({}), "a/b/c/key.png");
    t.is(image.combineWithDirectory({template: {}}), "a/b/c/key.png");
    t.is(image.combineWithDirectory({template: {pattern: "", output: ""}}), "a/b/c/key.png");

    // Empty directory
    t.is(image.combineWithDirectory({template: {pattern: "*", output: ""}}), "key.png");

    // Relative directory
    t.is(image.combineWithDirectory({template: {pattern: "*path", output: "*path/d"}}), "a/b/c/d/key.png");

    // Internal directory
    t.is(image.combineWithDirectory({template: {pattern: "*path", output: "*path/d/e"}}), "a/b/c/d/e/key.png");

    // External directory
    t.is(image.combineWithDirectory({template: {pattern: "*path/c", output: "*path"}}), "a/b/key.png");

    // External internal directory
    t.is(image.combineWithDirectory({template: {pattern: "*path/c", output: "*path/d"}}), "a/b/d/key.png");

    // Root directory
    t.is(image.combineWithDirectory({template: {pattern: "*", output: "d"}}), "d/key.png");

    // Root internal directory
    t.is(image.combineWithDirectory({template: {pattern: "*", output: "d/e"}}), "d/e/key.png");

    // With prefix
    t.is(image.combineWithDirectory({template: {pattern: "*", output: "d/e"}}, "prefix-"), "d/e/prefix-key.png");

    // With suffix
    t.is(image.combineWithDirectory({template: {pattern: "*", output: "d/e"}}, "", "-suffix"), "d/e/key-suffix.png");

    // With prefix and suffix
    t.is(image.combineWithDirectory({template: {pattern: "*", output: "d/e"}}, "prefix-", "_suffix"), "d/e/prefix-key_suffix.png");
});
