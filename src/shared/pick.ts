const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (
      obj &&
      Object.keys(obj).some(
        (objKey) => objKey.toLowerCase() === key.toString().toLowerCase()
      )
    ) {
      const matchingKey = Object.keys(obj).find(
        (objKey) => objKey.toLowerCase() === key.toString().toLowerCase()
      );
      if (matchingKey) {
        finalObj[key] = obj[matchingKey] as T[K];
      }
    }
  }
  return finalObj;
};

export default pick;
