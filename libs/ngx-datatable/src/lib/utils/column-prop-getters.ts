import { TableColumnProp } from '../types/table-column.type';

// maybe rename this file to prop-getters.ts

export type ValueGetter = (obj: any, prop: TableColumnProp) => any;

/**
 * Always returns the empty string ''
 */
export function emptyStringGetter(): string {
  return '';
}

/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
export function getterForProp(prop: TableColumnProp): ValueGetter {
  if (prop == null) {
    return emptyStringGetter;
  }

  if (typeof prop === 'number') {
    return numericIndexGetter;
  } else {
    // deep or simple
    if (prop.indexOf('.') !== -1) {
      return deepValueGetter;
    } else {
      return shallowValueGetter;
    }
  }
}

/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns any or '' if invalid index
 */
export function numericIndexGetter(row: any[], index: number): any {
  if (row == null) {
    return '';
  }
  // mimic behavior of deepValueGetter
  if (!row || index == null) {
    return row;
  }

  const value = row[index];
  if (value == null) {
    return '';
  }
  return value;
}

/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 */
export function shallowValueGetter(obj: any, fieldName: string): any {
  if (obj == null) {
    return '';
  }
  if (!obj || !fieldName) {
    return obj;
  }

  const value = obj[fieldName];
  if (value == null) {
    return '';
  }
  return value;
}

/**
 * Returns a deep object given a string. zoo['animal.type']
 */
export function deepValueGetter(obj: any, path: string): any {
  if (obj == null) {
    return '';
  }
  if (!obj || !path) {
    return obj;
  }

  // check if path matches a root-level field
  // { "a.b.c": 123 }
  let current = obj[path];
  if (current !== undefined) {
    return current;
  }

  current = obj;
  const split = path.split('.');

  if (split.length) {
    for (let i = 0; i < split.length; i++) {
      current = current[split[i]];

      // if found undefined, return empty string
      if (current === undefined || current === null) {
        return '';
      }
    }
  }

  return current;
}
