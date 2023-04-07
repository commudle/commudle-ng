import { Injector, Type } from '@angular/core';
// TODO: Remove after angular 15 upgrade
import type { DecorationWithType } from '@tiptap/core';
import {
  Editor,
  NodeView,
  NodeViewProps,
  NodeViewRenderer,
  NodeViewRendererOptions,
  NodeViewRendererProps,
} from '@tiptap/core';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { Decoration } from 'prosemirror-view';
import { AngularNodeViewComponent } from '../components/node-view.component';
import { AngularRenderer } from './AngularRenderer';

interface AngularNodeViewRendererOptions extends NodeViewRendererOptions {
  update?: ((node: ProseMirrorNode, decorations: Decoration[]) => boolean) | null;
  injector: Injector;
}

class AngularNodeView extends NodeView<Type<AngularNodeViewComponent>, Editor, AngularNodeViewRendererOptions> {
  renderer!: AngularRenderer<AngularNodeViewComponent, NodeViewProps>;
  contentDOMElement!: HTMLElement | null;

  override get dom() {
    return this.renderer.dom;
  }

  override get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }

    this.maybeMoveContentDOM();
    return this.contentDOMElement;
  }

  override mount() {
    const injector = this.options.injector as Injector;

    const props: NodeViewProps = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    };

    // create renderer
    this.renderer = new AngularRenderer(this.component, injector, props);

    // Register drag handler
    if (this.extension.config.draggable) {
      this.renderer.elementRef.nativeElement.ondragstart = (e: DragEvent) => {
        this.onDragStart(e);
      };
    }

    this.contentDOMElement = this.node.isLeaf ? null : document.createElement(this.node.isInline ? 'span' : 'div');

    if (this.contentDOMElement) {
      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = 'inherit';

      // Required for editable node views
      // The content won't be rendered if `editable` is set to `false`
      this.renderer.detectChanges();
    }
  }

  update(node: ProseMirrorNode, decorations: DecorationWithType[]): boolean {
    if (this.options.update) {
      return this.options.update(node, decorations);
    }

    if (node.type !== this.node.type) {
      return false;
    }

    if (node === this.node && this.decorations === decorations) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    this.renderer.updateProps({ node, decorations });
    this.maybeMoveContentDOM();

    return true;
  }

  selectNode() {
    this.renderer.updateProps({ selected: true });
  }

  deselectNode() {
    this.renderer.updateProps({ selected: false });
  }

  destroy() {
    this.renderer.destroy();
  }

  private maybeMoveContentDOM(): void {
    const contentElement = this.dom.querySelector('[data-node-view-content]');

    if (this.contentDOMElement && contentElement && !contentElement.contains(this.contentDOMElement)) {
      contentElement.appendChild(this.contentDOMElement);
    }
  }
}

export const AngularNodeViewRenderer = (
  ViewComponent: Type<AngularNodeViewComponent>,
  options: Partial<AngularNodeViewRendererOptions>,
): NodeViewRenderer => {
  return (props: NodeViewRendererProps) => {
    return new AngularNodeView(ViewComponent, props, options);
  };
};
