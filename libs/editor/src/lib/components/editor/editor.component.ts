import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { maxLength, minLength, noWhitespace, required } from '@commudle/shared-validators';
import { Editor, Extensions } from '@tiptap/core';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Document } from '@tiptap/extension-document';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { History } from '@tiptap/extension-history';
import { Link } from '@tiptap/extension-link';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Text } from '@tiptap/extension-text';
import { BehaviorSubject } from 'rxjs';
import { IEditorValidator } from '../../models/editor-validator.model';
import { CustomMention } from '../../plugins/mention';

@Component({
  selector: 'commudle-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() showMenu = false;
  @Input() editable = true;
  @Input() clearOnSubmit = true;
  @Input() content = '';
  @Input() placeholder = 'Type here...';
  @Input() extensions: Extensions = [];
  @Input() validators: IEditorValidator = {};

  @Output() contentChange = new EventEmitter<string>();

  injector = inject(Injector);

  editor: Editor;
  extensionsCollection: { [key: string]: Extensions };
  isValid: boolean;
  showEmojiPicker$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  get coreExtensions(): Extensions {
    if (!this.editable) {
      return this.extensionsCollection.viewer;
    }

    return this.extensionsCollection.editor;
  }

  ngOnInit(): void {
    this.initExtensions();
    this.initEditor();

    if (this.editable && this.validators) {
      this.editor.on('update', () => this.validate());
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  initExtensions(): void {
    this.extensionsCollection = {
      editor: [
        Document,
        Text,
        Paragraph,
        Placeholder.configure({ placeholder: this.placeholder }),
        CharacterCount,
        Gapcursor,
        History,
        Link,
        CustomMention(this.injector),
      ],
      viewer: [Document, Text, Paragraph, Link, CustomMention(this.injector)],
    };
  }

  initEditor(): void {
    this.editor = new Editor({
      extensions: [...this.coreExtensions, ...this.extensions],
      editable: this.editable,
      content: this.content,
    });
  }

  validate(): void {
    this.isValid = true;

    if (this.validators.required && required(this.editor)) {
      this.isValid = false;
    }
    if (this.validators.minLength && minLength(this.editor, this.validators.minLength)) {
      this.isValid = false;
    }
    if (this.validators.maxLength && maxLength(this.editor, this.validators.maxLength)) {
      this.isValid = false;
    }
    if (this.validators.noWhitespace && noWhitespace(this.editor)) {
      this.isValid = false;
    }
  }

  onClick(): void {
    this.contentChange.emit(this.editor.getHTML());
    if (this.clearOnSubmit) {
      this.editor.commands.setContent('', true);
    }
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker$.next(!this.showEmojiPicker$.getValue());
  }

  onEmojiSelect(event): void {
    this.editor.chain().focus().insertContent(event.emoji.native).run();
    this.showEmojiPicker$.next(false);
  }
}
