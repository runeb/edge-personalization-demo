export const decode = (encodedString: string): Record<string, any> => {
  try {
    return JSON.parse(Buffer.from(encodedString, "base64").toString("utf-8"));
  } catch (err) {
    return {};
  }
};

// NOTE: this won't work with nested objects
export const encode = (params: Record<string, any>) => {
  return Buffer.from(
    JSON.stringify(params, Object.keys(params).sort())
  ).toString("base64");
};
