import assert from "node:assert/strict";
import { sanitizeText } from "../lib/security";

assert.equal(sanitizeText("<script>alert(1)</script>hello\u0000"), "alert(1)hello");
assert.equal(sanitizeText("  normal message  "), "normal message");
console.log("PASS security helper tests");
