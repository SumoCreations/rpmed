const notBlank = (i: any) => {
  switch (typeof i) {
    case "undefined": return false;
    case "boolean": return true;
    case "string": return i.length > 1;
    case "number": return true;
    case "object": return i !== null;
    default: return i
  }
}

export const filterBlankAttributes = (item: object) => Object.keys(item).filter(k => notBlank(item[k])).reduce((p, k) => ({ ...p, [k]: item[k] }), {})