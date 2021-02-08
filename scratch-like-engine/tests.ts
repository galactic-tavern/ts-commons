import { codeFromXml } from "./src/scratch-like-core";
import { readFileSync } from "fs";


codeFromXml(readFileSync('tests/1.xml').toString());