import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { minLength, noWhitespace, required } from '@commudle/shared-validators';
import { Editor, Extensions } from '@tiptap/core';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Document } from '@tiptap/extension-document';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { History } from '@tiptap/extension-history';
import { Link } from '@tiptap/extension-link';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Text } from '@tiptap/extension-text';
import { KeyboardHandler } from '../../extensions/keyboard-handler';
import { CustomMention } from '../../extensions/mention';
import { IEditorValidator } from '../../models/editor-validator.model';
import { NbButtonAppearance, NbComponentStatus } from '@commudle/theme';

@Component({
  selector: 'commudle-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() showMenu = false;
  @Input() editable = true;
  @Input() clearOnSubmit = true;
  @Input() content = '';
  @Input() placeholder = 'Type here...';
  @Input() extensions: Extensions = [];
  @Input() validators: IEditorValidator = {};
  @Input() status: NbComponentStatus = 'basic';
  @Input() appearance: NbButtonAppearance = 'filled';
  @Input() addAttachment = false;
  @Input() mentionParams: { parent_type: string; parent_id: number } = { parent_type: '', parent_id: 0 };

  @Output() contentChange = new EventEmitter<string>();
  @Output() uploadImages = new EventEmitter<any>();

  injector = inject(Injector);

  editor: Editor;
  extensionsCollection: { [key: string]: Extensions };
  isValid: boolean;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && !changes['content'].isFirstChange()) {
      // Update the content of the editor if content input changes dynamically
      if (this.editor) {
        this.editor.commands.setContent(this.content);
      }
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
        // added .configure() because tiptap creates a global instance for each extension
        CharacterCount.configure(),
        Gapcursor,
        History,
        Link,
        KeyboardHandler,
        CustomMention(this.injector, this.mentionParams),
      ],
      viewer: [Document, Text, Paragraph, Link, CustomMention(this.injector, this.mentionParams)],
    };
  }

  initEditor(): void {
    this.editor = new Editor({
      extensions: [...this.coreExtensions, ...this.extensions],
      editable: this.editable,
      content: this.content,
      // TODO: maybe below can be a plugin?
      editorProps: {
        handleDOMEvents: {
          keydown: (view, event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              this.onClick();
            }
            return false;
          },
        },
      },
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
    // if (this.validators.maxLength && maxLength(this.editor, this.validators.maxLength)) {
    //   this.isValid = false;
    // }
    if (this.validators.noWhitespace && noWhitespace(this.editor)) {
      this.isValid = false;
    }
  }

  onClick(): void {
    if (this.isValid) {
      this.contentChange.emit(this.editor.getHTML());
      if (this.clearOnSubmit) {
        this.editor.commands.clearContent(true);
      }
    }
  }

  onEmojiSelect(event): void {
    this.editor.chain().focus().insertContent(event.emoji.native).run();
    // this.showEmojiPicker$.next(false);
  }
  uploadAttachment(event) {
    this.uploadImages.emit(event.target.files);
  }
}
