import { Injector } from '@angular/core';
import { map } from 'rxjs';
import tippy from 'tippy.js';
import { MentionsListComponent } from '../components/mentions-list/mentions-list.component';
import { Mention } from '../extensions/mention';
import { MentionsService } from '../services/mentions.service';
import { AngularRenderer } from '../utils/AngularRenderer';

export function CustomMention(injector: Injector) {
  const mentionService = injector.get(MentionsService);

  return Mention(injector).configure({
    HTMLAttributes: {
      class: 'mention',
    },
    suggestion: {
      // @ts-ignore
      items: ({ query }) => {
        return mentionService
          .getMentions(query)
          .pipe(map((res) => res.results))
          .toPromise();
      },
      render: () => {
        let renderer: AngularRenderer<MentionsListComponent, MentionsListComponent>;
        let popup: any;

        return {
          onStart: (props) => {
            renderer = new AngularRenderer(MentionsListComponent, injector, props);

            renderer.updateProps({ props });

            // @ts-ignore
            popup = tippy('body', {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: renderer.dom,
              showOnCreate: true,
              interactive: true,
              trigger: 'manual',
              placement: 'bottom-start',
            });
          },
          onUpdate(props) {
            renderer.updateProps({ props });

            popup[0].setProps({ getReferenceClientRect: props.clientRect });
          },
          onKeyDown(props): any {
            renderer.instance.onKeyDown(props);
          },
          onExit() {
            popup[0].destroy();
            renderer.destroy();
          },
        };
      },
    },
  });
}
