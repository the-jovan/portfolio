export const classNames = (...args: (string | boolean)[]) =>
  args.filter(Boolean).join(" ");
