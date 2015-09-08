Changes.js is a helper method designed to solve a recurring pattern often seen when testing for difference between states in React.

## Description

When using React, often times one has to test for differences between current and previous states.

An example for this is the `shouldComponentUpdate` method.

The test pattern usually appears in the form of:

```js
return nextProps.something.attr1 !== this.props.something.attr1 &&
       nextProps.something.attr2 !== this.props.something.attr2;
```

The method tries to improve on that by providing a slightly neater way of accomplishing this:

```js
const diff = changes(nextProps.something, this.props.something, 'attr1', 'attr2', 'attr3');

return diff.attr1 &&
       diff.attr2 &&
       diff.attr3;
```

## Reference

```js
changes(nextProps.something, this.props.something[, key1[, key2, [ … ]]])`
```

For any one key passed, the method will return:

- For different values, an array of the values in each one: `[key in object1, key in object2]`.
- For equal values, `false`.
- If it's non-existant in both objects, `undefined`.

By passing more than one key, an object in the following form will be returned:

```js
> changes(a, b, 'key1', 'key2', …)

{
  key1: …,
  key2: …,
  // etc.
}
```

For passing no keys to the method, the keys from both objects will be used to compare and an object in the above format will be returned.

## Example

```js
import changes from '../utils/changes.js';

const a = {
  a: 1,
  b: 2,
  c: '3',
  d: null
};

const b = {
  a: 2,
  b: 2,
  c: '5',
  e: null
};

console.log(changes(a, b));         // { a: [1, 2], b: false, c: ['3', '5'], d: [null, undefined], e: [undefined, null] }
console.log(changes(a, b, 'a'));    // [1, 2]
console.log(changes(a, b, 'b'));    // false
console.log(changes(a, b, 'c'));    // ['3', '5']
console.log(changes(a, b, 'd'));    // [null, undefined]
console.log(changes(a, b, 'e'));    // [undefined, null]
console.log(changes(a, b, 'a', 'b', 'c', 'f')); // { a: [1, 2], b: false, c: ['3', '5'], f: undefined }
```
