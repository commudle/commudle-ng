import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SuggestionBoxComponent } from 'libs/shared/modules/src/lib/mention/components/suggestion-box/suggestion-box.component';
import { MentionService } from 'libs/shared/modules/src/lib/mention/service/mention.service';
import { getCaretCoordinates } from 'libs/shared/modules/src/lib/mention/utils/textarea-caret-position';

@Directive({
  selector: '[commudleMention]',
})
export class MentionDirective implements OnDestroy {
  componentRef: ComponentRef<SuggestionBoxComponent>;
  triggerCharacter = null;
  nativeElement: HTMLTextAreaElement | HTMLInputElement;
  taggableEntities: any[] = [];
  selectedEntity: any;
  subscriptions: Subscription[] = [];
  clickedOnBox = false;
  private coords: { top: number; left: number } = { top: 0, left: 0 };

  constructor(
    private inputElementRef: ElementRef,
    public _viewContainerRef: ViewContainerRef,
    // TODO: Refactor this
    private _componentResolver: ComponentFactoryResolver,
    private mentionService: MentionService,
  ) {
    this.nativeElement = this.inputElementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  onItemHover(entity: any) {
    if (this.componentRef) {
      this.componentRef.instance.selectedEntity = entity;
      this.selectedEntity = entity;
    }
  }

  onItemClicked(entity: any) {
    this.autoComplete(entity);
    this.nativeElement.focus();
    this.selectedEntity = '';
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  @HostListener('blur', ['$event']) //if text area gets out of focus remove autocomplete box
  onOutOfFocus() {
    if (!this.clickedOnBox && this.componentRef) {
      this.componentRef.destroy();
    }
    this.clickedOnBox = false;
  }

  @HostListener('keydown', ['$event'])
  currentKey(event: KeyboardEvent) {
    if (this.componentRef) {
      switch (event.key) {
        case 'Enter': {
          if (this.selectedEntity) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            this.autoComplete(this.selectedEntity);
            this.nativeElement.focus();
            this.componentRef.destroy();
            this.selectedEntity = ''; // alert here

            if (this.nativeElement instanceof HTMLTextAreaElement) {
              return false;
            }
          }

          break;
        }
        case 'ArrowUp': {
          const currentSelectedIndex = this.taggableEntities.indexOf(this.selectedEntity);
          if (currentSelectedIndex === 0) {
            this.componentRef.instance.selectedEntity = this.taggableEntities[this.taggableEntities.length - 1];
            this.selectedEntity = this.taggableEntities[this.taggableEntities.length - 1];
          } else {
            this.componentRef.instance.selectedEntity = this.taggableEntities[currentSelectedIndex - 1];
            this.selectedEntity = this.taggableEntities[currentSelectedIndex - 1];
          }

          break;
        }
        case 'ArrowDown': {
          const currentSelectedIndex = this.taggableEntities.indexOf(this.selectedEntity);
          if (currentSelectedIndex === this.taggableEntities.length - 1) {
            this.componentRef.instance.selectedEntity = this.taggableEntities[0];
            this.selectedEntity = this.taggableEntities[0];
          } else {
            this.componentRef.instance.selectedEntity = this.taggableEntities[currentSelectedIndex + 1];
            this.selectedEntity = this.taggableEntities[currentSelectedIndex + 1];
          }

          break;
        }
      }

      setTimeout(() => this.scrollSelectedIntoView(), 1);
    }
  }

  autoComplete(entity: any) {
    const currentWordTyped = this.getCurrentWord();

    let entityName: string;
    if (entity.type === 'users') {
      entityName = this.triggerCharacter + entity.username;
    } else {
      entityName = entity.name;
    }

    if (entityName.length >= currentWordTyped.value.slice(1).length) {
      const currentTextInputValue = this.nativeElement.value;

      let newTextInputValue: string;

      let addText: string = entityName;

      switch (entity.type) {
        case 'users': {
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
          break;
        }

        case 'channels': {
          addText = `<a href="https://commudle.com/communities/${entity.kommunity_slug}/channels/app/${entity.id}">${entityName}</a>`;
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
          break;
        }

        case 'events': {
          addText = `<a href="https://commudle.com/communities/${entity.kommunity_slug}/events/${entity.slug}">${entityName}</a>`;
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
          break;
        }

        default: {
          addText = `<a href="https://commudle.com/${entity.type}/${entity.slug}">${entityName}</a>`;
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
        }
      }

      const newCursorPosition = currentWordTyped.startIndex + addText.length + 1;

      this.nativeElement.value = newTextInputValue;
      this.nativeElement.selectionStart = newCursorPosition;
      this.nativeElement.selectionEnd = newCursorPosition;

      //updates angular binding
      const event = new Event('input', {
        bubbles: true,
        cancelable: false,
      });
      this.nativeElement.dispatchEvent(event);
    }
  }

  newTextInput(text: string, currentTextInputValue: string, currentWordTyped: TypedWord): string {
    return (
      currentTextInputValue.slice(0, currentWordTyped.startIndex) +
      text +
      ' ' +
      currentTextInputValue.slice(currentWordTyped.endIndex + 1)
    );
  }

  @HostListener('input', ['$event'])
  currentString() {
    const wordBeingTyped = this.getCurrentWord().value.toLowerCase();

    this.setTriggerCharacter(wordBeingTyped);

    if (wordBeingTyped.startsWith(this.triggerCharacter)) {
      const query = wordBeingTyped.slice(1);

      if (query.length) {
        switch (this.triggerCharacter) {
          case '@': {
            this.subscriptions.push(
              this.mentionService.getUsers(query).subscribe((data: any) => {
                this.displayComponent(data);
              }),
            );
            break;
          }

          case '!': {
            this.subscriptions.push(
              this.mentionService.getOthers(query).subscribe((data: any) => {
                this.displayComponent(data);
              }),
            );
            break;
          }

          default: {
            return (this.taggableEntities = []);
          }
        }
      }
    } else {
      setTimeout(() => {
        if (this.componentRef) {
          this.componentRef.destroy();
        }
      }, 500);

      if (this.selectedEntity) {
        this.selectedEntity = '';
      }
    }
  }

  displayComponent(data: any) {
    const results: any[] = [];

    for (const entity in data) {
      for (const index in data[entity]) {
        data[entity][index]['type'] = entity;
        results.push(data[entity][index]);
      }
    }

    this.taggableEntities = results;

    if (this.taggableEntities.length) {
      this.loadComponent();
      window.requestAnimationFrame(() => this.checkBounds());
      this.componentRef.instance.taggableEntities = this.taggableEntities;
    } else {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }
  }

  checkBounds() {
    let left = this.coords.left,
      top = this.coords.top;
    const boundsHorizontal = this.componentRef.location.nativeElement.firstChild.getBoundingClientRect();
    const boundsVertical = this.componentRef.location.nativeElement.firstChild.firstChild.getBoundingClientRect();
    const navbarHeight = 56;

    let dropUp = true;
    let lineHeight = 0;

    //If it goes off up or down
    if (boundsVertical.bottom - navbarHeight < boundsVertical.height) {
      top += boundsVertical.height;
      dropUp = false;
      const parentStyles = window.getComputedStyle(this.nativeElement);
      lineHeight = parseFloat(parentStyles.lineHeight);
    }

    //if it goes off on right side
    if (boundsHorizontal.left + boundsHorizontal.width > document.documentElement.clientWidth) {
      left -= boundsHorizontal.left + boundsHorizontal.width - document.documentElement.clientWidth + 10;
    }

    this.positionElement(left, top, dropUp, lineHeight);
  }

  setTriggerCharacter(word: string) {
    switch (word.charAt(0)) {
      case '@': {
        this.triggerCharacter = '@';
        break;
      }

      case '!': {
        this.triggerCharacter = '!';
        break;
      }

      default: {
        this.triggerCharacter = null;
      }
    }
  }

  getCurrentWord(): TypedWord {
    const cursorLocation = this.nativeElement.selectionStart;

    const text = this.nativeElement.value;

    let word = '';

    let i: number;
    for (i = cursorLocation - 1; i >= 0 && text[i] !== ' '; i--) {
      word += text[i];
    }

    word = word.split('').reverse().join('');

    const startIndex = i + 1; //'@' position
    const endIndex = cursorLocation - 1; // last character position

    if (word.includes('\n')) {
      //word contains new line character
      word = word.trim();
    }

    return {
      value: word,
      startIndex,
      endIndex,
    };
  }

  scrollSelectedIntoView() {
    const listElement = this.componentRef.location.nativeElement.firstChild.firstChild.querySelector('.selected');
    if (listElement) {
      this.scrollIntoView(this.componentRef.location.nativeElement.firstChild.firstChild, listElement, 0, 0);
    }
  }

  scrollIntoView(container: HTMLUListElement, listItem: HTMLLIElement, extraBottom: number, extraTop: number) {
    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;

    const eTop = listItem.offsetTop;
    const eBottom = eTop + listItem.clientHeight;

    if (eTop < cTop) {
      container.scrollTop -= cTop - eTop + extraBottom;
    } else if (eBottom > cBottom) {
      container.scrollTop += eBottom - cBottom + extraTop;
    }
  }

  loadComponent() {
    const componentFactory = this._componentResolver.resolveComponentFactory(SuggestionBoxComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<SuggestionBoxComponent>(componentFactory);

    this.coords = getCaretCoordinates(this.nativeElement, this.nativeElement.selectionStart);
    this.coords.top += this.nativeElement.offsetTop - this.nativeElement.scrollTop + 5;
    this.coords.left += this.nativeElement.offsetLeft - this.nativeElement.scrollLeft + 5;
    this.positionElement(this.coords.left, this.coords.top);

    this.componentRef.instance.selectedEntity = this.taggableEntities[0]; // 1st item will be automatically highlighted
    this.selectedEntity = this.taggableEntities[0];

    this.subscriptions.push(
      this.componentRef.instance.itemClick.subscribe(() => {
        this.clickedOnBox = true;
      }),
    );

    this.subscriptions.push(
      this.componentRef.instance.selectedItemEvent.subscribe((data: any) => {
        if (data.eventType === 'click') {
          this.onItemClicked(data.entity);
        } else if (data.eventType === 'hover') {
          this.onItemHover(data.entity);
        }
      }),
    );
  }

  positionElement(left: number, top: number, dropUp: boolean = true, lineHeight: number = 0) {
    top += dropUp ? 0 : lineHeight;
    this.componentRef.location.nativeElement.firstChild.style.position = 'absolute';
    this.componentRef.location.nativeElement.firstChild.style.left = left + 'px';
    this.componentRef.location.nativeElement.firstChild.style.top = top + 'px';
  }
}

interface TypedWord {
  value: string;
  startIndex: number;
  endIndex: number;
}
