import { Directive, ElementRef, HostListener, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SuggestionBoxComponent } from '../../components/suggestion-box/suggestion-box.component';
import { MentionService } from '../../service/mention.service';
import { IUser } from 'projects/shared-models/user.model';
@Directive({
  selector: '[appMention]'
})
export class MyMentionDirective {

  componentRef: any;
  triggerCharacter = null;
  nativeElement: HTMLTextAreaElement;
  taggableEntities: any[] = [];
  selectedEntity: any;

  constructor(
    private inputElementRef: ElementRef,
    public _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver,
    private mentionService: MentionService
  ) {
    this.nativeElement = inputElementRef.nativeElement;
  }

  // @HostListener('blur') //if text area gets out of focus remove autocomplete box
  // onOutOfFocus(){
  //   if(this.componentRef){
  //     this.componentRef.destroy();
  //   }
  // }

  @HostListener('input', ['$event'])
  currentString() {

    let wordBeingTyped = this.getCurrentWord().value.toLowerCase();

    this.setTriggerCharacter(wordBeingTyped);

    if (wordBeingTyped.startsWith(this.triggerCharacter)) {

      const query = wordBeingTyped.slice(1);

      switch (this.triggerCharacter) {

        case '#': {

          this.mentionService.getUsers(query).subscribe((data: any) => {

            this.taggableEntities = data.users;

            if (this.taggableEntities) {
              this.loadComponent();
              this.componentRef.instance.taggableEntities = this.taggableEntities;
            }
          })

          break;
        }

        case '!': {

          this.mentionService.getOthers(query).subscribe((data: any) => {

            console.log(data)

            const results : any[] = []

            for( const build in data.builds ){
              data.builds[build]["type"] = "build"
              results.push(data.builds[build])
            }

            for( const channel in data.channels ){
              data.channels[channel]["type"] = "channel"
              results.push(data.channels[channel])
            }

            for( const community in data.communities ){
              data.communities[community]["type"] = "community"
              results.push(data.communities[community])
            }

            for( const event in data.events ){
              data.events[event]["type"] = "event"
              results.push(data.events[event])
            }

            for( const lab in data.labs ){
              data.labs[lab]["type"] = "lab"
              results.push(data.labs[lab])
            }

            console.log(results)

            this.taggableEntities = results;

            if (this.taggableEntities) {
              this.loadComponent();
              this.componentRef.instance.taggableEntities = this.taggableEntities;
            }
          })

          break;
        }

        default: {
          return this.taggableEntities = []
        }

      }

    }
    else {
      if (this.componentRef) {
        console.log('destroyed')
        this.componentRef.destroy()
      }
    }

  }

  setTriggerCharacter(word: string) {

    switch (word.charAt(0)) {

      case '#': {
        this.triggerCharacter = '#';
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

  onItemHover(entity: any) {
    if (this.componentRef) {
      this.componentRef.instance.selectedEntity = entity;
      this.selectedEntity = entity;
    }
  }

  onItemClicked(entity: any) {
    this.autoComplete(entity.name);
    this.nativeElement.focus();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  autoComplete(entity: string) {

    let currentWordTyped = this.getCurrentWord();

    if (entity.length >= currentWordTyped.value.slice(1).length) {

      let currentTextInputValue = this.nativeElement.value;
      let newTextInputValue = currentTextInputValue.slice(0, currentWordTyped.startIndex)
        + this.triggerCharacter + entity + currentTextInputValue.slice(currentWordTyped.endIndex + 1);

      this.nativeElement.value = newTextInputValue;

      let newCursorPosition = currentWordTyped.startIndex + entity.length + 2;

      this.nativeElement.selectionStart = newCursorPosition;
      this.nativeElement.selectionEnd = newCursorPosition;

    }

  }

  getCurrentWord(): TypedWord {

    let cursorLocation = this.nativeElement.selectionStart;
    let text = this.nativeElement.value;

    let word: string = "";

    let i: number;
    for (i = cursorLocation - 1; i >= 0 && text[i] !== ' '; i--) {
      word += text[i];
    }

    word = word.split("").reverse().join("");

    let startIndex = i + 1; //'#' position
    let endIndex = cursorLocation - 1; // last character position

    return {
      value: word,
      startIndex,
      endIndex
    }
  }

  @HostListener('keydown', ['$event'])
  currentKey(event: KeyboardEvent) {

    if (this.componentRef) {

      if (event.key === "ArrowUp") {

        let currentSelectedIndex = this.taggableEntities.indexOf(this.selectedEntity);
        if (currentSelectedIndex === 0) {
          this.componentRef.instance.selectedEntity = this.taggableEntities[this.taggableEntities.length - 1];
          this.selectedEntity = this.taggableEntities[this.taggableEntities.length - 1];
        }
        else {
          this.componentRef.instance.selectedEntity = this.taggableEntities[currentSelectedIndex - 1];
          this.selectedEntity = this.taggableEntities[currentSelectedIndex - 1];
        }

        event.preventDefault();

      }
      else if (event.key === "ArrowDown") {

        let currentSelectedIndex = this.taggableEntities.indexOf(this.selectedEntity);
        if (currentSelectedIndex === this.taggableEntities.length - 1) {
          this.componentRef.instance.selectedEntity = this.taggableEntities[0];
          this.selectedEntity = this.taggableEntities[0];
        }
        else {
          this.componentRef.instance.selectedEntity = this.taggableEntities[currentSelectedIndex + 1];
          this.selectedEntity = this.taggableEntities[currentSelectedIndex + 1];
        }

        event.preventDefault();

      }

      setTimeout(() => this.scrollSelectedIntoView(), 1);

    }

  }

  scrollSelectedIntoView() {
    const listElement = this.componentRef.location.nativeElement.firstChild.firstChild.querySelector('.selected');
    if (listElement) {
      this.scrollIntoView(this.componentRef.location.nativeElement.firstChild.firstChild, listElement, 2, 2);
    }
  }

  scrollIntoView(container: HTMLUListElement, listItem: HTMLLIElement, extraBottom: number, extraTop: number) {
    let cTop = container.scrollTop;
    let cBottom = cTop + container.clientHeight;

    let eTop = listItem.offsetTop;
    let eBottom = eTop + listItem.clientHeight;

    if (eTop < cTop) {
      container.scrollTop -= (cTop - eTop) + extraBottom;
    }
    else if (eBottom > cBottom) {
      container.scrollTop += (eBottom - cBottom) + extraTop;
    }
  }

  @HostListener('keyup', ['$event'])
  onEnterKey(event: KeyboardEvent) {

    if (event.key === "Control") {

      if (this.componentRef && this.selectedEntity) {
        this.autoComplete(this.selectedEntity.name);
        this.nativeElement.focus();
        this.componentRef.destroy()
      }

    }

  }

  loadComponent() {
    const componentFactory = this._componentResolver.resolveComponentFactory(SuggestionBoxComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<SuggestionBoxComponent>(componentFactory);

    this.componentRef.instance.selectedEntity = this.taggableEntities[0]; // 1st item will be automatically highlighted
    this.selectedEntity = this.taggableEntities[0];

    this.componentRef.instance.selectedItemEvent.subscribe((data: any) => {
      if (data.eventType === "click") {
        this.onItemClicked(data.entity);
      }
      else if (data.eventType === "hover") {
        this.onItemHover(data.entity);
      }
    });
  }

}

interface TypedWord {
  value: string;
  startIndex: number;
  endIndex: number;
}
