type CsvCell = string | number | boolean | null | undefined;

function escapeCell(value: CsvCell) {
  return `"${String(value ?? "").replace(/"/g, "\"\"")}"`;
}

export function downloadCsv(filename: string, headers: string[], rows: CsvCell[][]) {
  const content = [headers.join(","), ...rows.map((row) => row.map(escapeCell).join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
