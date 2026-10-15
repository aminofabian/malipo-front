import assert from "node:assert/strict";
import test from "node:test";
import {
  EXAMPLE_CODE,
  LONG_CODE_LENGTH,
  MAX_CODE_LENGTH,
  assessBarcodeCode,
  barcodeFileName,
  canEncodeBarcode,
} from "./barcode-label.ts";

test("treats blank input as empty", () => {
  assert.deepEqual(assessBarcodeCode("   "), { code: "", state: "empty" });
  assert.equal(canEncodeBarcode("empty"), false);
});

test("accepts a normal product code", () => {
  const assessed = assessBarcodeCode(`  ${EXAMPLE_CODE}  `);
  assert.equal(assessed.state, "ready");
  assert.equal(assessed.code, EXAMPLE_CODE);
  assert.equal(canEncodeBarcode(assessed.state), true);
});

test("flags a long code without blocking it", () => {
  const code = "A".repeat(LONG_CODE_LENGTH + 1);
  const assessed = assessBarcodeCode(code);
  assert.equal(assessed.state, "long");
  assert.equal(canEncodeBarcode(assessed.state), true);
});

test("rejects codes past the shelf-label limit", () => {
  const assessed = assessBarcodeCode("B".repeat(MAX_CODE_LENGTH + 1));
  assert.equal(assessed.state, "too-long");
  assert.equal(canEncodeBarcode(assessed.state), false);
});

test("rejects characters a till scanner cannot read as Code 128", () => {
  assert.equal(assessBarcodeCode("café").state, "invalid");
  assert.equal(assessBarcodeCode("A\nB").state, "invalid");
});

test("builds a safe svg file name", () => {
  assert.equal(barcodeFileName("KIOSK-001"), "kioskpay-kiosk-001.svg");
  assert.equal(barcodeFileName("***"), "kioskpay-barcode.svg");
  assert.equal(barcodeFileName("A".repeat(80)).length < 60, true);
});
