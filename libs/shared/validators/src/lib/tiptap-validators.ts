import { Editor } from '@tiptap/core';

export function required(editor: Editor): boolean {
  return editor.isEmpty;
}

export function minLength(editor: Editor, min: number): boolean {
  return editor.storage['characterCount'].characters() < min;
}

export function maxLength(editor: Editor, max: number): boolean {
  return editor.storage['characterCount'].characters() > max;
}

export function noWhitespace(editor: Editor): boolean {
  return editor.getText().trim().length === 0;
}
