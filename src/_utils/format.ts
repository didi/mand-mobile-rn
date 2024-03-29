export function formatValueByGapRule (
  gapRule: string,
  value: string,
  gap = ' ',
  range: number,
  isAdd = 1
) {
  const arr = value ? value.split('') : [];
  let showValue = '';
  const rule: number[] = [];
  gapRule.split('|').some((n, i) => {
    rule[i] = +n + (rule[i - 1] ? +rule[i - 1] : 0);
    return true;
  });
  let j = 0;
  arr.some((n, i) => {
    // Remove the excess part
    if (i > rule[rule.length - 1] - 1) {
      return true;
    }
    if (i > 0 && i === rule[j]) {
      showValue = showValue + gap + n;
      j++;
    } else {
      showValue = showValue + '' + n;
    }
    return true;
  });
  let adapt = 0;
  rule.some((n, i) => {
    if (range === +n + 1 + i) {
      adapt = 1 * isAdd;
    }
    return true;
  });
  range =
    typeof range !== 'undefined'
      ? range === 0
        ? 0
        : range + adapt
      : showValue.length;
  return { value: showValue, range };
}

export function formatValueByGapStep (
  step: number,
  value: string,
  gap = ' ',
  direction = 'right',
  range: number,
  isAdd = 1,
  oldValue = ''
) {
  if (value.length === 0) {
    return { value, range };
  }

  const arr: string[] = value ? value.split('') : [];
  let _range = range;
  let showValue = '';

  if (direction === 'right') {
    for (let j = arr.length - 1, k = 0; j >= 0; j--, k++) {
      const m = arr[j];
      showValue =
        k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue;
    }
    if (isAdd === 1) {
      // 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === -2) {
        _range = range + 1;
      }
    } else {
      // 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === 2) {
        _range = range - 1;
      }
      // 删除到最开始，range 保持 0
      if (_range <= 0) {
        _range = 0;
      }
    }
  } else {
    arr.some((n, i) => {
      showValue =
        i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n;
      return true;
    });
    const adapt = range % (step + 1) === 0 ? 1 * isAdd : 0;
    _range =
      typeof range !== 'undefined'
        ? range === 0
          ? 0
          : range + adapt
        : showValue.length;
  }

  return { value: showValue, range: _range };
}

export function trimValue (value: string, gap = ' ') {
  value = typeof value === 'undefined' ? '' : value;
  const reg = new RegExp(gap, 'g');
  value = value.toString().replace(reg, '');
  return value;
}
