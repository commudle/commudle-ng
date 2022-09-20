import { fromEvent, Observable, of } from 'rxjs';
import { filter, map, mergeMap, tap, throttleTime } from 'rxjs/operators';
import {
  IInfiniteScrollAction,
  IPositionStats,
  IScroller,
  IScrollerDistance,
  IScrollParams,
  IScrollRegisterConfig,
} from '../models/infinite-scroll';
import { AxisResolver } from './axis-resolver';
import { shouldTriggerEvents } from './event-trigger';
import { resolveContainerElement } from './ngx-ins-utils';
import { calculatePoints, createResolver } from './position-resolver';
import * as ScrollResolver from './scroll-resolver';
import { ScrollState } from './scroll-state';

export function createScroller(config: IScroller) {
  const { scrollContainer, scrollWindow, element, fromRoot } = config;

  const resolver = createResolver({
    axis: new AxisResolver(!config.horizontal),
    windowElement: resolveContainerElement(scrollContainer, scrollWindow, element, fromRoot),
  });

  const scrollState = new ScrollState({
    totalToScroll: calculatePoints(element, resolver),
  });

  const options: IScrollRegisterConfig = {
    container: resolver.container,
    throttle: config.throttle,
  };

  const distance = {
    up: config.upDistance,
    down: config.downDistance,
  };

  return attachScrollEvent(options).pipe(
    mergeMap(() => of(calculatePoints(element, resolver))),
    map((positionStats: IPositionStats) =>
      toInfiniteScrollParams(scrollState.lastScrollPosition, positionStats, distance),
    ),
    tap(({ stats }: IScrollParams) => scrollState.updateScroll(stats.scrolled, stats.totalToScroll)),
    filter(({ fire, scrollDown, stats: { totalToScroll } }: IScrollParams) =>
      shouldTriggerEvents(config.alwaysCallback, fire, scrollState.isTriggeredScroll(totalToScroll, scrollDown)),
    ),
    tap(({ scrollDown, stats: { totalToScroll } }: IScrollParams) => {
      scrollState.updateTriggeredFlag(totalToScroll, scrollDown);
    }),
    map(toInfiniteScrollAction),
  );
}

export function attachScrollEvent(options: IScrollRegisterConfig): Observable<{}> {
  let obs = fromEvent(options.container, 'scroll');

  if (options.throttle) {
    obs = obs.pipe(throttleTime(options.throttle));
  }

  return obs;
}

export function toInfiniteScrollParams(
  lastScrollPosition: number,
  stats: IPositionStats,
  distance: IScrollerDistance,
): IScrollParams {
  const { scrollDown, fire } = ScrollResolver.getScrollStats(lastScrollPosition, stats, distance);

  return {
    scrollDown,
    fire,
    stats,
  };
}

export const InfiniteScrollActions = {
  DOWN: '[IS] DOWN',
  UP: '[IS] UP',
};

export function toInfiniteScrollAction(response: IScrollParams): IInfiniteScrollAction {
  const {
    scrollDown,
    stats: { scrolled: currentScrollPosition },
  } = response;

  return {
    type: scrollDown ? InfiniteScrollActions.DOWN : InfiniteScrollActions.UP,
    payload: {
      currentScrollPosition,
    },
  };
}
