import { InViewportDirection } from 'libs/in-viewport/src/lib/enums';

export class InvalidDirectionException extends TypeError {
  constructor() {
    const values = Object.values(InViewportDirection).join('|');

    super(`The provided value for the direction is incorrect. The value must be any of \`${values}\`.`);
  }
}
