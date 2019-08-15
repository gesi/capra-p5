import { createBrowserHistory } from 'history';
import { loadP5, removeP5 } from './utils';
import './styles.css';

const sketches = require('./sketches/*.js', { mode: 'list' });

const history = createBrowserHistory({ forceRefresh: true });

const loadSketchFromLocation = function(location) {
  const { hash } = location;

  if (hash === '') {
    return sketches[0].module;
  }

  const val = hash.substr(1);
  const idx = Number(val);
  if (isNaN(idx) === false) {
    return sketches[idx].module;
  }

  const hit = sketches.find(s => s.name === val);
  if (hit) {
    console.log(hit);
    return hit.module;
  }

  throw new Error('Valid sketch index or name pls');
};

const fns = [];

const init = async () => {
  removeP5();
  fns.filter(fn => {
    window[fn] = undefined;
    return false;
  });
  const sketch = loadSketchFromLocation(history.location);

  Object.keys(sketch).forEach(key => {
    if (typeof sketch[key] === 'function') {
      fns.push(key);
      window[key] = sketch[key];
    }
  });
  await loadP5();
};

history.listen(() => {
  init();
});

if (history.location.hash === '') {
  history.replace('/#0');
} else {
  init();
}

function goto(idx) {
  history.push(`/#${idx}`);
}

window.addEventListener('keydown', ({ keyCode }) => {
  let idx = Number(history.location.hash.substr(1));
  //back
  if (keyCode === 37) {
    goto(Math.max(0, idx - 1));
  }
  // forward
  if (keyCode === 39) {
    goto(Math.min(sketches.length - 1, idx + 1));
  }
});
