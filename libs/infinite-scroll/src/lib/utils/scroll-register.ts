import { fromEvent, Observable, of } from 'rxjs';
import { filter, map, mergeMap, tap, throttleTime } from 'rxjs/operators';
import { AxisResolver } from './axis-resolver';
import { shouldTriggerEvents } from './event-trigger';
import { resolveContainerElement } from './ins-utils';
import * as Models from './models';
import { calculatePoints, createResolver } from './position-resolver';
import * as ScrollResolver from './scroll-resolver';
import { ScrollState } from './scroll-state';

export function createScroller(config: Models.IScroller) {
  const { scrollContainer, scrollWindow, element, fromRoot } = config;
  const resolver = createResolver({
    axis: new AxisResolver(!config.horizontal),
    windowElement: resolveContainerElement(scrollContainer, scrollWindow, element, fromRoot),
  });
  const scrollState = new ScrollState({
    totalToScroll: calculatePoints(element, resolver),
  });
  const options: Models.IScrollRegisterConfig = {
    container: resolver.container,
    throttle: config.throttle,
  };
  const distance = {
    up: config.upDistance,
    down: config.downDistance,
  };
  return attachScrollEvent(options).pipe(
    mergeMap(() => of(calculatePoints(element, resolver))),
    map((positionStats: Models.IPositionStats) => {
      return toInfiniteScrollParams(scrollState.lastScrollPosition, positionStats, distance);
    }),
    tap(({ stats }: Models.IScrollParams) => scrollState.updateScroll(stats.scrolled, stats.totalToScroll)),
    filter(({ fire, scrollDown, stats: { totalToScroll } }: Models.IScrollParams) => {
      return shouldTriggerEvents(config.alwaysCallback, fire, scrollState.isTriggeredScroll(totalToScroll, scrollDown));
    }),
    tap(({ scrollDown, stats: { totalToScroll } }: Models.IScrollParams) => {
      scrollState.updateTriggeredFlag(totalToScroll, scrollDown);
    }),
    map(toInfiniteScrollAction),
  );
}

export function attachScrollEvent(options: Models.IScrollRegisterConfig): Observable<NonNullable<unknown>> {
  let obs = fromEvent(options.container, 'scroll');
  // For an unknown reason calling `sampleTime()` causes trouble for many users, even with `options.throttle = 0`.
  // Let's avoid calling the function unless needed.
  // Replacing with throttleTime seems to solve the problem
  // See https://github.com/orizens/ngx-infinite-scroll/issues/198
  if (options.throttle) {
    obs = obs.pipe(
      throttleTime(options.throttle, undefined, {
        leading: true,
        trailing: true,
      }),
    );
  }
  return obs as any;
}

export function toInfiniteScrollParams(
  lastScrollPosition: number,
  stats: Models.IPositionStats,
  distance: Models.IScrollerDistance,
): Models.IScrollParams {
  const { scrollDown, fire } = ScrollResolver.getScrollStats(lastScrollPosition, stats, distance);
  return {
    scrollDown,
    fire,
    stats,
  };
}

export const InfiniteScrollActions = {
  DOWN: '[ISE] DOWN',
  UP: '[ISE] UP',
};

export function toInfiniteScrollAction(response: Models.IScrollParams): Models.IInfiniteScrollAction {
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
