#!/usr/bin/env node
const primitives = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
};

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};

const cases = [
  [undefined, undefined, 0],
  [' ', undefined, 1],
  ['|-', 1, 2],
  ['|-', 2, 3],
  [' ', 3, 4],
  ['...', undefined, 5],
];

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const arrayValue = Object.entries(currentValue);
    const lines = arrayValue.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    const result = [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');

    return result;
    // return [...result].join('');
  };

  return iter(value, 1);
};

stringify(primitives);
stringify(nested);
stringify(cases);

// console.log('primitives: ', stringify(primitives));
// console.log('--------------');
console.log('nested: ', stringify(nested));
// console.log('=================');
// console.log('cases: ', stringify(cases));
