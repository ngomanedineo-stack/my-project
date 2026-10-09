// Lists every [[placeholder]] left in content/ so nothing ships unfinished.
import { readFileSync, readdirSync } from "node:fs";
let n = 0;
for (const f of readdirSync("content")) {
  readFileSync(`content/${f}`, "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\[\[([^\]]+)\]\]/g)) {
      n++;
      console.log(`content/${f}:${i + 1}  ${m[1]}`);
    }
  });
}
console.log(`\n${n} placeholder(s) to fill in.`);
process.exit(0);
