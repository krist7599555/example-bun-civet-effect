import type { Plugin } from "vite";
import { compile } from "@danielx/civet";
import * as fs from "node:fs";
import * as path from "node:path";

function exists(path_str: string) {
  try {
    return fs.existsSync(path_str);
  } catch {
    return false;
  }
}

function id2absPath(id: string, ssr = false) {
  return ssr ? process.cwd() + id : id;
}

export function civet() {
  return {
    name: "vite-plugin-civet",
    enforce: "pre",
    resolveId(source, importer, opt) {
      if (source.includes("node_modules")) return;
      let source_abs = importer
        ? path.resolve(importer, "../", source)
        : id2absPath(source, opt.ssr);
      let source_wo_ext = source_abs.replace(/\.civet$/, ""); // force implicit import without extension
      if (exists(source_wo_ext + ".civet")) {
        return source_wo_ext + ".ts?civet";
      }
    },
    async load(id, opt) {
      if (id.endsWith(".ts?civet")) {
        const abs_id = id2absPath(id, opt?.ssr);
        const civet_id = abs_id.replace(".ts?civet", ".civet");

        if (exists(civet_id)) {
          const code = fs.readFileSync(civet_id, { encoding: "utf-8" });
          const ts_code = compile(code, { js: false });
          return { code: ts_code };
        }
      }
    },
  } satisfies Plugin;
}
