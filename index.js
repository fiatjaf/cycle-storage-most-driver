/* global localStorage */

import most from 'most'

export function makeStorageDriver (storage = localStorage) {
  return function storageDriver (request$) {
    request$.observe(r => {
      for (let k in r) {
        if (!r[k]) {
          storage.removeItem(k)
        } else {
          storage.setItem(k, r[k])
        }
      }
    })

    var update$ = request$
      .flatMap(r => most.from(Object.keys(r).map(k => ({
        key: k,
        value: storage.getItem(k)
      }))))

    update$.get = function (k) {
      return update$
        .filter(({key}) => key === k)
        .map(({value}) => value)
        .startWith(storage.getItem(k))
    }

    update$.all$ = update$
      .constant(storage)
      .startWith(storage)

    return update$
  }
}
