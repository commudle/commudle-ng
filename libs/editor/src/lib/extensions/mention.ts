import { Injector } from '@angular/core';
import { mergeAttributes, Node } from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { PluginKey } from '@tiptap/pm/state';
import { Suggestion, SuggestionOptions } from '@tiptap/suggestion';
import { map } from 'rxjs';
import tippy from 'tippy.js';
import { MentionsListComponent } from '../components/mentions-list/mentions-list.component';
import { MentionsNodeComponent } from '../components/mentions-node/mentions-node.component';
import { MentionsService } from '../services/mentions.service';
import { AngularRenderer } from '../utils/AngularRenderer';
import { AngularNodeViewRenderer } from '../utils/NodeViewRenderer';

export type MentionOptions = {
  HTMLAttributes: Record<string, any>;
  renderLabel: (props: { options: MentionOptions; node: ProseMirrorNode }) => string;
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

const MentionPluginKey = new PluginKey('mention');

const Mention = (injector: Injector): Node => {
  return Node.create<MentionOptions>({
    name: 'mention',

    addOptions() {
      return {
        HTMLAttributes: {},
        renderLabel({ options, node }) {
          return `${options.suggestion.char}${node.attrs['label'] ?? node.attrs['id']}`;
        },
        suggestion: {
          pluginKey: MentionPluginKey,
          char: '@',
          allowSpaces: true,
          command: ({ editor, range, props }) => {
            // increase range.to by one when the next node is of type "text"
            // and starts with a space character
            const nodeAfter = editor.view.state.selection.$to.nodeAfter;
            const overrideSpace = nodeAfter?.text?.startsWith(' ');

            if (overrideSpace) {
              range.to += 1;
            }

            editor
              .chain()
              .focus()
              .insertContentAt(range, [
                { type: this.name, attrs: props },
                { type: 'text', text: ' ' },
              ])
              .run();

            window.getSelection()?.collapseToEnd();
          },
          allow: ({ state, range }) => {
            // const $from = state.doc.resolve(range.from);
            // const type = state.schema.nodes[this.name];

            // return !!$from.parent.type.contentMatch.matchType(type);
            return true;
          },
        },
      };
    },

    group: 'inline',

    inline: true,

    selectable: false,

    atom: true,

    addAttributes: function () {
      const params = ['id', 'label', 'model', 'slug1'];

      return params.reduce((acc: any, param) => {
        acc[param] = {
          default: null,
          parseHTML: (element: any) => element.getAttribute(`data-${param}`),
          renderHTML: (attributes: any) => {
            if (!attributes[param]) return {};

            return {
              [`data-${param}`]: attributes[param],
            };
          },
        };
        return acc;
      }, {});
    },

    parseHTML() {
      return [{ tag: 'mention' }];
    },

    renderHTML({ node, HTMLAttributes }) {
      return [
        'mention',
        mergeAttributes(
          {
            'data-type': this.name,
            'data-model': node.attrs['model'],
            'data-slug1': node.attrs['slug1'],
          },
          this.options.HTMLAttributes,
          HTMLAttributes,
        ),
        this.options.renderLabel({ options: this.options, node }),
      ];
    },

    addNodeView() {
      return AngularNodeViewRenderer(MentionsNodeComponent, { injector });
    },

    renderText({ node }) {
      return this.options.renderLabel({ options: this.options, node });
    },

    addKeyboardShortcuts() {
      return {
        Backspace: () => {
          return this.editor.commands.command(({ tr, state }) => {
            let isMention = false;
            const { selection } = state;
            const { empty, anchor } = selection;

            if (!empty) return false;

            state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
              if (node.type.name === this.name) {
                isMention = true;
                tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize);

                return false;
              }

              return true;
            });

            return isMention;
          });
        },
      };
    },

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          ...this.options.suggestion,
        }),
      ];
    },
  });
};

export function CustomMention(injector: Injector) {
  const mentionService = injector.get(MentionsService);

  return Mention(injector).configure({
    HTMLAttributes: {
      class: 'mention',
    },
    suggestion: {
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

            popup = tippy('body', {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: renderer.dom,
              showOnCreate: true,
              interactive: true,
              trigger: 'manual',
              placement: 'top-start',
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
