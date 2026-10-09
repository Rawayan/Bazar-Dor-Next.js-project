
const banglaDigits: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBanglaNumber(value: number | string): string {
  return String(value).replace(
    /\d/g,
    (digit) => banglaDigits[digit] ?? digit
  );
}

export function formatPrice(
  value: number | string | undefined | null
): string {
  if (value === undefined || value === null || value === "") {
    return "দাম নেই";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return `${toBanglaNumber(value)} টাকা`;
  }

  return `${toBanglaNumber(
    numericValue.toLocaleString("en-US")
  )} টাকা`;
}

export function formatPercentage(
  value: number | string | undefined | null
): string {
  if (value === undefined || value === null || value === "") {
    return "০%";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return `${toBanglaNumber(value)}%`;
  }

  const formatted = Math.abs(numericValue)
    .toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

  return `${toBanglaNumber(formatted)}%`;
}