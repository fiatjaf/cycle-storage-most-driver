This is a driver for all your [pure-most Cycle apps](https://github.com/cyclejs/most-run) (think [Motorcycle](https://github.com/motorcyclejs/core#merging-with-cyclejs)) that needs a router only for the client.

### Install

```
npm install --save cycle-storage-most-driver
```


### Use

```javascript
import most from 'most'
import Cycle from '@cycle/most-run'
import {makeDOMDriver, h} from '@motorcycle/dom'
import {makeStorageDriver} from 'cycle-storage-most-driver'

Cycle.run(app, {
  DOM: makeDOMDriver('#container'),
  STORAGE: makeStorageDriver(window.sessionStorage)
})

function app ({DOM, STORAGE}) {
  let vtree$ = STORAGE.all$
    .map(storage =>
      h('div', [
        h('span', `key 'somekey' has value ${storage['somekey']} stored.`),
        h('form', [
          h('input'),
          h('button', `set value at 'somekey`)
        ])
      ])
    )

  return {
    DOM: vtree$,
    STORAGE: DOM.select('form').events('submit')
      .tap(e => e.preventDefault())
      .map(e => ({
        'somekey': e.target.querySelector('input').value
      }))
  }
}
```
