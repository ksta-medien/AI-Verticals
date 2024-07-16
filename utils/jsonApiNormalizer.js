export function normalize(data, ignoreAttributes = []) {
  const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';
  const isArray = (data) => Object.prototype.toString.call(data) === '[object Array]';

  const flatten = (data) => {
    if (!data.attributes) return data;

    return {
      id: data.id,
      ...data.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item) => normalize(item, ignoreAttributes));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      if (key === 'categories' && data[key] != null && typeof data[key] == 'string') {
        data[key] = JSON.parse(data[key]);
      }
      if (!ignoreAttributes.includes(key)) {
        data[key] = normalize(data[key], ignoreAttributes);
      }
    }

    return data;
  }

  return data;
}
