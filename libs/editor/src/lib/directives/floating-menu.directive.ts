import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import { FloatingMenuPlugin, FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';

@Directive({
  selector: 'tiptap-floating-menu[editor], [tiptapFloatingMenu][editor]',
})
export class FloatingMenuDirective implements OnInit, OnDestroy {
  @Input() pluginKey: FloatingMenuPluginProps['pluginKey'] = 'TiptapFloatingMenu';
  @Input() editor!: Editor;
  @Input() tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};
  @Input() shouldShow: FloatingMenuPluginProps['shouldShow'] = null;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('Required: Input `editor`');
    }

    this.editor.registerPlugin(
      FloatingMenuPlugin({
        pluginKey: this.pluginKey,
        editor: this.editor,
        element: this.elRef.nativeElement,
        tippyOptions: this.tippyOptions,
        shouldShow: this.shouldShow,
      }),
    );
  }

  ngOnDestroy(): void {
    this.editor.unregisterPlugin(this.pluginKey);
  }
}
