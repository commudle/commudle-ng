import { isFunction, isNil, uniqueId } from 'lodash-es';
import { Config } from './config';

export interface InViewportCheckFnOptions {
  force: boolean;
  config: Config;
}

export interface InViewportCheckFn<T = never> {
  (entry: IntersectionObserverEntry | undefined, options: InViewportCheckFnOptions): T;
}

const ids = new WeakMap<InViewportCheckFn<unknown>, string>();
const fallbackId = 'in-viewport-empty-check-fn';

export class CheckFn<T = never> {
  readonly #value: InViewportCheckFn<T> | undefined;

  readonly #id: string;

  constructor(value: InViewportCheckFn | undefined) {
    this.#value = isFunction(value) ? value : undefined;

    let id = (value && ids.get(value)) ?? fallbackId;

    if (!isNil(value) && !ids.has(value)) {
      ids.set(value, (id = uniqueId('in-viewport-check-fn-')));
    }

    this.#id = id;
  }

  public get value(): InViewportCheckFn<T> | undefined {
    return this.#value;
  }

  public get id(): string {
    return this.#id;
  }
}
