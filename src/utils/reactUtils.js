import React from 'react';

export function h(...args) {
  const p = args[1];
  if (typeof p === 'string' || typeof p === 'number' || Array.isArray(p) || React.isValidElement(p)) {
    args.splice(1, 0, null);
  }
  return React.createElement(...args);
}

export function classNames(names) {
  return Object.keys(names).filter(key => names[key]).join(' ');
}
