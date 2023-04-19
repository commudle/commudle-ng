import { ValidatorFn } from '@angular/forms';
import { Editor } from '@tiptap/core';

export function required(editor: Editor): ValidatorFn {
  return () => (editor.isEmpty ? { required: true } : null);
}

export function length(editor: Editor, min?: number, max?: number): ValidatorFn {
  return () => {
    const length = editor.storage['characterCount'].characters();

    if (min !== undefined && max !== undefined) {
      return length < min || length > max ? { length: true } : null;
    }

    if (min !== undefined) {
      return length < min ? { length: true } : null;
    }

    if (max !== undefined) {
      return length > max ? { length: true } : null;
    }

    return null;
  };
}

export function whitespace(editor: Editor): ValidatorFn {
  return () => (editor.getText().trim().length ? null : { whitespace: true });
}
