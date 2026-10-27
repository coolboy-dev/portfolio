// Port of github.com/coolboy-dev/bill-check (bill_check.py) for the live demo.
const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const OCR_SWAPS = { "0": "O", O: "0", "1": "I", I: "1", "5": "S", S: "5",
  "8": "B", B: "8", "2": "Z", Z: "2", "6": "G", G: "6" };
const TOL = 1.0;
const MAX_AGE_DAYS = 30;
const DAY = 86400000;

function gstinOk(g) {
  if (!GSTIN_RE.test(g)) return false;
  let s = 0;
  for (let i = 0; i < 14; i++) {
    const p = CHARS.indexOf(g[i]) * (i % 2 ? 2 : 1);
    s += Math.floor(p / 36) + (p % 36);
  }
  return CHARS[(36 - (s % 36)) % 36] === g[14];
}

function repairGstin(g) {
  const fixes = [];
  for (let i = 0; i < g.length; i++)
    if (OCR_SWAPS[g[i]]) fixes.push(g.slice(0, i) + OCR_SWAPS[g[i]] + g.slice(i + 1));
  const good = fixes.filter(gstinOk);
  return good.length === 1 ? good[0] : null;
}

export function checkBill(bill, seen, today) {
  today = today || new Date().toISOString().slice(0, 10);
  const hard = [], soft = [];
  let g = (bill.gstin || "").toUpperCase().replace(/ /g, "");
  if (!gstinOk(g)) {
    const fixed = repairGstin(g);
    if (fixed) { soft.push(`GSTIN ${g} looks misread, ${fixed} passes the check digit`); g = fixed; }
    else hard.push(`GSTIN ${g || "(none)"} fails the check digit`);
  }
  const items = bill.items || [];
  for (const it of items)
    if (Math.abs(it.qty * it.rate - it.amount) > TOL)
      soft.push(`${it.name}: ${it.qty} x ${it.rate} != ${it.amount}`);
  const itemsSum = items.reduce((a, it) => a + it.amount, 0);
  if (Math.abs(itemsSum - bill.subtotal) > TOL)
    hard.push(`items add up to ${itemsSum.toFixed(2)}, bill says subtotal ${bill.subtotal}`);

  const cgst = bill.cgst || 0, sgst = bill.sgst || 0, igst = bill.igst || 0;
  if (Math.abs(cgst - sgst) > TOL) hard.push(`CGST ${cgst} != SGST ${sgst}, they are always equal`);
  if (igst && (cgst || sgst)) hard.push("IGST and CGST/SGST on the same bill");
  const net = bill.subtotal - (bill.discount || 0);
  if (Math.min(Math.abs(net + cgst + sgst + igst - bill.total), Math.abs(net - bill.total)) > TOL)
    hard.push(`subtotal, discount and tax don't reconcile with total ${bill.total}, total may be edited`);

  const days = Math.round((Date.parse(today) - Date.parse(bill.date)) / DAY);
  if (days < 0) hard.push(`dated in the future (${bill.date})`);
  else if (days > MAX_AGE_DAYS) soft.push(`${days} days old`);

  const key = [g, bill.bill_no || "", bill.date, Math.round(bill.total)].join("|");
  if (seen.has(key)) hard.push("same GSTIN, bill no, date and total already uploaded");

  const verdict = hard.length ? "reject" : soft.length ? "review" : "approve";
  if (verdict !== "reject") seen.add(key);
  return [verdict, hard.concat(soft)];
}

