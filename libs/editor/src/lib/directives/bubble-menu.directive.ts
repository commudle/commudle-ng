import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import { BubbleMenuPlugin, BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

@Directive({
  selector: 'tiptap-bubble-menu[editor], [tiptapBubbleMenu][editor]',
})
export class BubbleMenuDirective implements OnInit, OnDestroy {
  @Input() pluginKey: BubbleMenuPluginProps['pluginKey'] = 'TiptapBubbleMenu';
  @Input() editor!: Editor;
  @Input() tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
  @Input() shouldShow: BubbleMenuPluginProps['shouldShow'] = null;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('Required: Input `editor`');
    }

    this.editor.registerPlugin(
      BubbleMenuPlugin({
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
