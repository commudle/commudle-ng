import { Extension } from '@tiptap/core';

export const KeyboardHandler = Extension.create({
  name: 'keyboardHandler',
  addKeyboardShortcuts() {
    return {
      'Shift-Enter': ({ editor }) => {
        return editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          // () => commands.splitListItem('listItem'),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]);
      },
      Enter: () => true,
      'Mod-Enter': () => true,
    };
  },
});
