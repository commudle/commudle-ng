import { Directive, ElementRef, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { SuggestionBoxComponent } from 'projects/shared-modules/mention/components/suggestion-box/suggestion-box.component';
import { MentionService } from 'projects/shared-modules/mention/service/mention.service';
import { Subscription } from 'rxjs';
import { getCaretCoordinates } from 'projects/shared-modules/mention/utils/textarea-caret-position';

@Directive({
  selector: '[appMention]'
})
export class MentionDirective {

  componentRef: ComponentRef<SuggestionBoxComponent>;
  triggerCharacter = null;
  nativeElement: HTMLTextAreaElement;
  taggableEntities: any[] = [];
  selectedEntity: any;
  subscriptions: Subscription[] = [];

  constructor(
    private inputElementRef: ElementRef,
    public _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver,
    private mentionService: MentionService
  ) {
    this.nativeElement = inputElementRef.nativeElement;
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
    this.selectedEntity = null;
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  // @HostListener('blur', ['$event']) //if text area gets out of focus remove autocomplete box
  // onOutOfFocus(event : any){
  //   if(this.componentRef && !this.selectedEntity){
  //     this.componentRef.destroy();
  //   }
  // }

  @HostListener('keyup', ['$event'])
  onEnterKey(event: KeyboardEvent) {

    if (event.key === "Control") {

      if (this.componentRef && this.selectedEntity) {
        this.autoComplete(this.selectedEntity);
        this.nativeElement.focus();
        this.componentRef.destroy()
        this.selectedEntity = null;// alert here
      }

    }

  }

  autoComplete(entity: any) {

    let currentWordTyped = this.getCurrentWord();

    let entityName: string;
    if (entity.type === 'users') {
      entityName = this.triggerCharacter + entity.username;
    }
    else {
      entityName = entity.name;
    }

    if (entityName.length >= currentWordTyped.value.slice(1).length) {

      let currentTextInputValue = this.nativeElement.value;

      let newTextInputValue = "";
      let newCursorPosition = 0;

      let addText: string = entityName;

      switch(entity.type){
        case 'users':{
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
          break;
        }

        case 'channels':{
          addText = `<a href="https://commudle.com/communities/${entity.kommunity_slug}/channels/app/${entity.id}">${entityName}</a>`;
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
          break;
        }

        case 'events':{
          addText = `<a href="https://commudle.com/communities/${entity.kommunity_slug}/events/${entity.slug}">${entityName}</a>`;
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
          break;
        }

        default:{
          addText = `<a href="https://commudle.com/${entity.type}/${entity.slug}">${entityName}</a>`;
          newTextInputValue = this.newTextInput(addText, currentTextInputValue, currentWordTyped);
        }
      }

      newCursorPosition = currentWordTyped.startIndex + addText.length + 1;

      this.nativeElement.value = newTextInputValue;
      this.nativeElement.selectionStart = newCursorPosition;
      this.nativeElement.selectionEnd = newCursorPosition;
    }

  }

  newTextInput(text : string, currentTextInputValue : string, currentWordTyped : TypedWord) : string {
    return currentTextInputValue.slice(0, currentWordTyped.startIndex) + text + currentTextInputValue.slice(currentWordTyped.endIndex + 1);
  }

  @HostListener('input', ['$event'])
  currentString() {

    let wordBeingTyped = this.getCurrentWord().value.toLowerCase();

    this.setTriggerCharacter(wordBeingTyped);

    if (wordBeingTyped.startsWith(this.triggerCharacter)) {

      const query = wordBeingTyped.slice(1);

      if (query.length) {
        switch (this.triggerCharacter) {

          case '@': {
            this.subscriptions.push(
              this.mentionService.getUsers(query).subscribe((data: any) => {
                this.displayComponent(data);
              })
            );
            break;
          }

          case '!': {
            this.subscriptions.push(
              this.mentionService.getOthers(query).subscribe((data: any) => {
                this.displayComponent(data);
              })
            );
            break;
          }

          default: {
            return this.taggableEntities = []
          }

        }
      }

    }
    else {
      setTimeout(() => {
        if (this.componentRef) {
          this.componentRef.destroy()
        }
      }, 500)
    }

  }

  displayComponent(data : any){

    const results : any[] = [];

    for (const entity in data) {
      for (const index in data[entity]) {
        data[entity][index]["type"] = entity;
        results.push(data[entity][index])
      }
    }

    this.taggableEntities = results;

    if (this.taggableEntities.length) {
      this.loadComponent();
      this.componentRef.instance.taggableEntities = this.taggableEntities;
    }
    else {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }

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

    let cursorLocation = this.nativeElement.selectionStart;
    let text = this.nativeElement.value;

    let word: string = "";

    let i: number;
    for (i = cursorLocation - 1; i >= 0 && text[i] !== ' '; i--) {
      word += text[i];
    }

    word = word.split("").reverse().join("");

    let startIndex = i + 1; //'@' position
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
      this.scrollIntoView(this.componentRef.location.nativeElement.firstChild.firstChild, listElement, 0, 0);
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

  loadComponent() {
    const componentFactory = this._componentResolver.resolveComponentFactory(SuggestionBoxComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<SuggestionBoxComponent>(componentFactory);

    const { top, left } = getCaretCoordinates(this.nativeElement, this.nativeElement.selectionStart);
    this.componentRef.location.nativeElement.style = `position:absolute; top:${top}px; left:${left}px`;

    this.componentRef.instance.selectedEntity = this.taggableEntities[0]; // 1st item will be automatically highlighted
    this.selectedEntity = this.taggableEntities[0];

    this.subscriptions.push(
      this.componentRef.instance.selectedItemEvent.subscribe((data: any) => { 
        if (data.eventType === "click") {
          this.onItemClicked(data.entity);
        }
        else if (data.eventType === "hover") {
          this.onItemHover(data.entity);
        }
      })
    )
  }

}

interface TypedWord {
  value: string;
  startIndex: number;
  endIndex: number;
}
