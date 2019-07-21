export function noop () {}
/**
 * Mix properties into target object.
 */
export function extend (to: any, _from: any) {
  // @ts-ignore
  for (const key in _from) {
    if (_from.hasOwnProperty(key)) {
      to[key] = _from[key];
    }
  }
  return to;
}

/**
 * Multiple Array traversal
 * @return 1 continue
 * @return 2 break
 */
export function traverse (data: any[], childrenKeys = [], fn = noop) {
  if (!data) {
    return;
  }
  if (typeof childrenKeys === 'function') {
    fn = childrenKeys;
    childrenKeys = [];
  }
  let level = 0; // current level
  let indexs: any[] = []; // index set of all levels
  const walk = (curData: any[]) => {
    for (let i = 0, len = curData.length; i < len; i++) {
      const isArray = Array.isArray(curData[i]);
      const key = Array.isArray(childrenKeys)
        ? childrenKeys[level]
        : childrenKeys;
      if (isArray || (curData[i] && curData[i][key])) {
        level++;
        indexs.push(i);
        walk(isArray ? curData[i] : curData[i][key]);
      } else if (level >= childrenKeys.length) {
        // @ts-ignore
        const res = fn(curData[i], level, [...indexs, i]);
        // @ts-ignore
        if (res === 1) {
          continue;
          // @ts-ignore
        } else if (res === 2) {
          break;
        }
      } else {
        continue;
      }
    }
    level = 0;
    indexs = [];
  };
  walk(data);
}
/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject (arr: any[]) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray (list: any[], start?: number) {
  start = start || 0;
  let i = list.length - start;
  const ret = [];
  while (i--) {
    ret.unshift(list[i + start]);
  }
  return ret;
}

/**
 * whether item is in list or list equal item
 */
export function inArray (list: any[], item: any) {
  return Array.isArray(list) ? !!~list.indexOf(item) : item === list;
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber (val: any) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Convert a value to a string
 */
export function toString (val: any) {
  return val == null
    ? ''
    : typeof val === 'object'
    ? JSON.stringify(val, null, 2)
    : String(val);
}

/**
 * Determine whether the two objects are equal or not shallowly
 */

export function compareObjects (object0: any, object1: any) {
  let ret = true;

  if (!object0 || !object1) {
    ret = false;
  } else if (typeof object0 !== 'object' || typeof object1 !== 'object') {
    ret = false;
  } else if (JSON.stringify(object0) !== JSON.stringify(object1)) {
    ret = false;
  }

  return ret;
}

/**
 * Check object is empty
 */
export function isEmptyObject (obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
