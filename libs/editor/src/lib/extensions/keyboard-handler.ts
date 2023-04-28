import { Extension } from '@tiptap/core';

export const KeyboardHandler = Extension.create({
  name: 'keyboardHandler',
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
      'Mod-Enter': () => true,
      'Shift-Enter': ({ editor }) => {
        return editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          // () => commands.splitListItem('listItem'),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]);
      },
      ArrowUp: ({ editor }) => {
        // if current in mention node then disable default up arrow behavior
        return !editor.isActive('mention');
      },
      ArrowDown: ({ editor }) => {
        // if current in mention node then disable default down arrow behavior
        return !editor.isActive('mention');
      },
      Tab: ({ editor }) => {
        // if current in mention node then disable default tab behavior
        return !editor.isActive('mention');
      },
    };
  },
});
