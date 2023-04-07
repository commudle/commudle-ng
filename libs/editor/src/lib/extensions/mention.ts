import { Injector } from '@angular/core';
import { mergeAttributes, Node } from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { PluginKey } from '@tiptap/pm/state';
import { Suggestion, SuggestionOptions } from '@tiptap/suggestion';
import { MentionsNodeComponent } from '../components/mentions-node/mentions-node.component';
import { AngularNodeViewRenderer } from '../utils/NodeViewRenderer';

export type MentionOptions = {
  HTMLAttributes: Record<string, any>;
  renderLabel: (props: { options: MentionOptions; node: ProseMirrorNode }) => string;
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

export const MentionPluginKey = new PluginKey('mention');

export const Mention = (injector: Injector): Node => {
  return Node.create<MentionOptions>({
    name: 'mention',

    addOptions() {
      return {
        HTMLAttributes: {},
        renderLabel({ options, node }) {
          return `${options.suggestion.char}${node.attrs['label'] ?? node.attrs['id']}`;
        },
        suggestion: {
          char: '@',
          pluginKey: MentionPluginKey,
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
      const params = ['id', 'label', 'parent'];

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
      return [{ tag: 'mention-node' }];
    },

    renderHTML({ HTMLAttributes }) {
      return ['mention-node', mergeAttributes(HTMLAttributes)];
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
