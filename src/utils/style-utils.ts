/** Provides intellisense for Tailwind classes declared inside a template literal string */
export const tw = String.raw;

/** Provides intellisense for Tailwind classes declared inside an object */
export const twObject = Object.create as unknown as <const ObjectType extends Record<PropertyKey, string>>(
  o: ObjectType,
) => ObjectType;

export const twConsumeCssVar = <CssVar extends `--${string}` = never>(
  className: `${string}var(${NoInfer<CssVar>})${string}`,
) => className;
