/**
 * Generates a range of numbers from `start` to `end`, in increments of 1 or `step` value if provided.
 *
 * @param start start of range
 * @param end end of range (inclusive)
 * @param step value of increments
 */
export function range(start: number, end?: number, step = 1): number[] {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}

/**
 * Waits a set amount of time(`wait`) before calling `func` again. Good for hitting rate limited APIs and performance improvements.
 *
 * @param func
 * @param  wait
 */
export function debounce(func: Function, wait: number = 0) {
  let timeoutID: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeoutID ?? undefined);

    timeoutID = setTimeout(function () {
      // thisArg is the current context
      // apply takes array for args (a***y very similar) (Call takes them individually, so call for single arg, apply for multiple)
      func.apply(context, args);
    }, wait);
  };
}
