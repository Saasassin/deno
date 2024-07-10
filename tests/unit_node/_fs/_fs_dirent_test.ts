// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { assert, assertEquals, assertThrows } from "@std/assert/mod.ts";
import { Dirent } from "node:fs";
import { NodeDirentType } from "ext:deno_node/_fs/_fs_dirent.ts";

Deno.test({
  name: "Directories are correctly identified",
  fn() {
    const entry = new Dirent("foo", "parent", NodeDirentType.Directory);
    assert(entry.isDirectory());
    assert(!entry.isFile());
    assert(!entry.isSymbolicLink());
  },
});

Deno.test({
  name: "Files are correctly identified",
  fn() {
    const entry = new Dirent("foo", "parent", NodeDirentType.File);
    assert(!entry.isDirectory());
    assert(entry.isFile());
    assert(!entry.isSymbolicLink());
  },
});

Deno.test({
  name: "Symlinks are correctly identified",
  fn() {
    const entry = new Dirent("foo", "parent", NodeDirentType.Symlink);
    assert(!entry.isDirectory());
    assert(!entry.isFile());
    assert(entry.isSymbolicLink());
  },
});

Deno.test({
  name: "File name is correct",
  fn() {
    const entry = new Dirent("my_file", "parent", NodeDirentType.Symlink);
    assertEquals(entry.name, "my_file");
  },
});

Deno.test({
  name: ".parentPath and .path are correct",
  fn() {
    const entry = new Dirent("my_file", "parent", NodeDirentType.Symlink);
    assertEquals(entry.parentPath, "parent");
    assertEquals(entry.path, "parent");
  },
});

Deno.test({
  name: "Socket and FIFO pipes aren't yet available",
  fn() {
    const entry = new Dirent("my_file", "parent", NodeDirentType.File);
    assertThrows(
      () => entry.isFIFO(),
      Error,
      "does not yet support",
    );
    assertThrows(
      () => entry.isSocket(),
      Error,
      "does not yet support",
    );
  },
});

Deno.test({
  name: "Path and parent path is correct",
  fn() {
    const entry = new Dirent("my_file", "/home/user", NodeDirentType.Symlink);
    assertEquals(entry.name, "my_file");
    assertEquals(entry.path, "/home/user");
    assertEquals(entry.parentPath, "/home/user");
  },
});
