const KEY_CODES = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'ins',
  46: 'del',
  91: 'meta',
  66: 'b',
  93: 'meta',
  224: 'meta',
};

const ALIASES = {
  option: 'alt',
  command: 'meta',
  return: 'enter',
  escape: 'esc',
  delete: 'del',
  plus: '+',
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl',
};


function normalizeCombo(combo) {
  return combo
    .split('+')
    .map(key => (ALIASES[key] ? ALIASES[key] : key))
    .sort()
    .join('+');
}


function normaliseHandlerKeys(handlers) {
  return Object.keys(handlers).reduce((acc, combo) => {
    acc[normalizeCombo(combo)] = handlers[combo];
    return acc;
  }, {});
}

export function getKeyFromEvent(event) {
  const code = event.type === 'keypress' ? event.charCode : event.keyCode;
  if (KEY_CODES[code]) {
    return KEY_CODES[code];
  }
  return String.fromCharCode(code).toLowerCase();
}

export function isModifierKey(event) {
  const key = getKeyFromEvent(event);
  return key === 'shift' || key === 'ctrl' || key === 'alt' || key === 'meta';
}

export function getComboFromEvent(event) {
  let pressedCombo = [];

  if (!isModifierKey(event)) {
    if (event.shiftKey) {
      pressedCombo.push('shift');
    }
    if (event.altKey) {
      pressedCombo.push('alt');
    }
    if (event.ctrlKey) {
      pressedCombo.push('ctrl');
    }
    if (event.metaKey) {
      pressedCombo.push('meta');
    }
  }

  pressedCombo.push(getKeyFromEvent(event));
  pressedCombo = pressedCombo.sort().join('+');
  return pressedCombo;
}

export default function handleKeys(handlers) {
  const handlerMap = normaliseHandlerKeys(handlers);
  return event => {
    const pressedCombo = getComboFromEvent(event);
    if (handlerMap[pressedCombo]) {
      const handler = handlerMap[pressedCombo];

      if (typeof handler === 'function') {
        handler();
        return true;
      } else if (typeof handler === 'object' && handler.callback) {
        if (handler.preventDefault) {
          event.preventDefault();
        }
        if (handler.stopPropagation) {
          event.stopPropagation();
        }
        handler.callback();
        return true;
      }

      throw new Error('No callback specified for key handler');
    }

    return false;
  };
}
