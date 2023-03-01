import { InViewportDirection } from '../enums';
import { InvalidDirectionException } from '../exceptions';

export class Direction {
  readonly #value: `${InViewportDirection}`;

  constructor(value: `${InViewportDirection}` = InViewportDirection.VERTICAL) {
    if (!Object.values<string>(InViewportDirection).includes(value)) {
      throw new InvalidDirectionException();
    }

    this.#value = value;
  }

  public get value(): `${InViewportDirection}` {
    return this.#value;
  }
}
