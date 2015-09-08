import invariant from 'invariant';
import Immutable from 'immutable';

const incorrectTypeError = '%s is not a valid Map object.';

export default function changes(state1, state2, ...args) {
  // Ensure passed objects are immutable maps so we have to take care of less cases.
  state1 = Immutable.fromJS(state1);
  state2 = Immutable.fromJS(state2);

  invariant(Immutable.Map.isMap(state1), incorrectTypeError, 'state1');
  invariant(Immutable.Map.isMap(state2), incorrectTypeError, 'state2');

  const diff = (a, b, k) => {

    // Return an array with both values if there's a difference.
    if (a.get(k) !== b.get(k)) {
      return [a.get(k), b.get(k)];
    }

    return false;
  };

  if (args.length === 1) {
    return diff(state1, state2, args[0]);
  }

  const keys = args.length > 1 ?
    Immutable.Set(args) :
    Immutable.Set.fromKeys(state1).union(state2.keys());

  return keys
    .reduce((obj, key) => {


      let result;
      if (state1.has(key) || state2.has(key)) {
        // If both objects are missing the key, leave result undefined.
        result = diff(state1, state2, key);
      }

      return obj.set(key, result);

    }, Immutable.Map())
    .toJS();
}

