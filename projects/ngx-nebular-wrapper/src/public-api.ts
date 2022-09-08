/*
 * Public API Surface of ngx-nebular-wrapper
 */

// export * from './lib/ngx-nebular-wrapper.service';
// export * from './lib/ngx-nebular-wrapper.component';

// export * from '@nebular/theme';
// export * from '@nebular/eva-icons';

export * from '@nebular/eva-icons';

import {
  NbTriggerValues,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBase,
  NbClickTriggerStrategy,
  NbHoverTriggerStrategy,
  NbHintTriggerStrategy,
  NbFocusTriggerStrategy,
  NbNoopTriggerStrategy,
  NbTriggerStrategyBuilderService,

} from './lib/com-theme/components/cdk/overlay/overlay-trigger';

/**
 * We are using explicit re-export for each module
 */

export * from '@nebular/theme';

export {
  // overlay
  NbTriggerValues,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBase,
  NbClickTriggerStrategy,
  NbHoverTriggerStrategy,
  NbHintTriggerStrategy,
  NbFocusTriggerStrategy,
  NbNoopTriggerStrategy,
  NbTriggerStrategyBuilderService,
};

// export {
//   // accordion
//   NbAccordionComponent,
//   NbAccordionItemComponent,
//   NbAccordionItemHeaderComponent,
//   NbAccordionItemBodyComponent,
//   NbAccordionModule,

//   // actions
//   NbActionComponent,
//   NbActionsComponent,
//   NbActionsModule,

//   // alert
//   NbAlertComponent,
//   NbAlertModule,

//   // autocomplete
//   NbAutocompleteComponent,
//   NbAutocompleteDirective,
//   NbOptionModule,
//   NbAutocompleteModule,

//   // badge
//   NbBadgeComponent,
//   NbBadgeModule,

//   // buttongroup
//   NbButtonGroupComponent,
//   NbButtonToggleDirective,
//   NbButtonGroupModule,

//   // button
//   NbButtonComponent,
//   NbButtonModule,

//   // calendarkit
//   NbCalendarViewModeComponent,
//   NbCalendarPageableNavigationComponent,
//   NbCalendarDaysNamesComponent,
//   NbCalendarYearPickerComponent,
//   NbCalendarMonthPickerComponent,
//   NbCalendarDayPickerComponent,
//   NbCalendarDayCellComponent,
//   NbCalendarActionsComponent,
//   NbCalendarMonthCellComponent,
//   NbCalendarYearCellComponent,
//   NbCalendarPickerRowComponent,
//   NbCalendarPickerComponent,
//   NbCalendarWeekNumberComponent,
//   NbDateService,
//   NbNativeDateService,
//   NbCalendarMonthModelService,
//   NbCalendarYearModelService,
//   NbCalendarTimeModelService,
//   NbCalendarKitModule,

//   // basecalendar
//   NbBaseCalendarComponent,
//   NbBaseCalendarModule,

//   // calendar range
//   NbCalendarRangeComponent,
//   NbCalendarRangeModule,

//   // calendar
//   NbCalendarComponent,
//   NbCalendarModule,

//   // card
//   NbCardComponent,
//   NbCardBodyComponent,
//   NbCardFooterComponent,
//   NbCardHeaderComponent,
//   NbRevealCardComponent,
//   NbFlipCardComponent,
//   NbCardFrontComponent,
//   NbCardBackComponent,
//   NbCardModule,

//   // cdk
//   NbFocusTrapFactoryService,
//   NbFocusKeyManagerFactoryService,
//   NbA11yModule,
//   NbViewportRulerAdapter,
//   NbOverlayContainerAdapter,
//   NbBlockScrollStrategyAdapter,
//   NbScrollDispatcherAdapter,
//   NbScrollStrategyOptions,
//   NbCdkAdapterModule,
//   NbScrollStrategies,
//   NbDirectionality,
//   NbBidiModule,
//   NbCdkMappingModule,
//   NbOverlayContainerComponent,
//   NbOverlayModule,
//   NbPositionBuilderService,
//   NbTriggerStrategyBuilderService,
//   NbOverlayService,
//   NbPositionHelper,
//   NbPlatform,
//   NB_TABLE_TEMPLATE,
//   NB_VIEW_REPEATER_STRATEGY,
//   NB_COALESCED_STYLE_SCHEDULER,
//   NB_TABLE_PROVIDERS,
//   NbTable,
//   NbHeaderCellDefDirective,
//   NbHeaderRowDefDirective,
//   NbColumnDefDirective,
//   NbCellDefDirective,
//   NbRowDefDirective,
//   NbFooterCellDefDirective,
//   NbFooterRowDefDirective,
//   NbDataRowOutletDirective,
//   NbHeaderRowOutletDirective,
//   NbFooterRowOutletDirective,
//   NbNoDataRowOutletDirective,
//   NbCellOutletDirective,
//   NbHeaderCellDirective,
//   NbCellDirective,
//   NbFooterCellDirective,
//   NbHeaderRowComponent,
//   NbRowComponent,
//   NbFooterRowComponent,
//   NbTableModule,

//   // chat
//   NbChatComponent,
//   NbChatMessageComponent,
//   NbChatFormComponent,
//   NbChatMessageTextComponent,
//   NbChatMessageFileComponent,
//   NbChatMessageQuoteComponent,
//   NbChatMessageMapComponent,
//   NbChatAvatarComponent,
//   NbChatCustomMessageDirective,
//   NbChatTitleDirective,
//   NbChatModule,
//   NbChatOptions,

//   // checkbox
//   NbCheckboxComponent,
//   NbCheckboxModule,

//   // context-menu
//   NbContextMenuComponent,
//   NbContextMenuDirective,
//   NbContextMenuModule,

//   // datepicker
// } from '@nebular/theme';

// export * from 'node_modules/@nebular/eva-icons/eva-icons.module';

// export * from 'node_modules/@nebular/theme/theme.options';
// export * from '@nebular/theme/theme.module';
// export * from '@nebular/theme/services/theme.service';
// export * from '@nebular/theme/services/spinner.service';
// export * from '@nebular/theme/services/breakpoints.service';
// export * from '@nebular/theme/services/color.helper';
// export * from '@nebular/theme/services/direction.service';
// export * from '@nebular/theme/services/scroll.service';
// export * from '@nebular/theme/services/ruler.service';
// export * from '@nebular/theme/services/status.service';
// export * from '@nebular/theme/services/js-themes-registry.service';
// export * from '@nebular/theme/services/js-themes/corporate.theme';
// export * from '@nebular/theme/services/js-themes/cosmic.theme';
// export * from '@nebular/theme/services/js-themes/default.theme';
// export * from '@nebular/theme/services/js-themes/dark.theme';
// export * from '@nebular/theme/services/js-themes/theme.options';
// export * from '@nebular/theme/components/component-size';
// export * from '@nebular/theme/components/component-shape';
// export * from '@nebular/theme/components/component-status';
// export * from 'node_modules/@nebular/theme/components/card/card.module';
// export * from 'node_modules/@nebular/theme/components/card/card.component';
// export * from 'node_modules/@nebular/theme/components/card/flip-card/flip-card.component';
// export * from 'node_modules/@nebular/theme/components/card/reveal-card/reveal-card.component';
// export * from 'node_modules/@nebular/theme/components/card/shared/shared.component';
// export * from '@nebular/theme/components/calendar/calendar.module';
// export * from '@nebular/theme/components/calendar/calendar.component';
// export * from '@nebular/theme/components/calendar/calendar-range.module';
// export * from '@nebular/theme/components/calendar/calendar-range.component';
// /* eslint-disable max-len */
// export { NbCalendarDayCellComponent } from '@nebular/theme/components/calendar-kit/components/calendar-day-picker/calendar-day-cell.component';
// export { NbDateTimePickerComponent } from '@nebular/theme/components/datepicker/date-timepicker.component';
// export { NbCalendarYearPickerComponent } from '@nebular/theme/components/calendar-kit/components/calendar-year-picker/calendar-year-picker.component';
// export {
//   NbCalendarMonthPickerComponent,
//   MONTHS_IN_VIEW,
//   MONTHS_IN_COLUMN,
// } from '@nebular/theme/components/calendar-kit/components/calendar-month-picker/calendar-month-picker.component';
// export { NbCalendarDayPickerComponent } from '@nebular/theme/components/calendar-kit/components/calendar-day-picker/calendar-day-picker.component';
// export { NbCalendarViewModeComponent } from '@nebular/theme/components/calendar-kit/components/calendar-navigation/calendar-view-mode.component';
// export { NbCalendarPageableNavigationComponent } from '@nebular/theme/components/calendar-kit/components/calendar-navigation/calendar-pageable-navigation.component';
// export { NbCalendarDaysNamesComponent } from '@nebular/theme/components/calendar-kit/components/calendar-days-names/calendar-days-names.component';
// export { NbCalendarWeekNumberComponent } from '@nebular/theme/components/calendar-kit/components/calendar-week-number/calendar-week-number.component';
// export { NbCalendarMonthCellComponent } from '@nebular/theme/components/calendar-kit/components/calendar-month-picker/calendar-month-cell.component';
// export { NbCalendarYearCellComponent } from '@nebular/theme/components/calendar-kit/components/calendar-year-picker/calendar-year-cell.component';
// export { NbCalendarPickerRowComponent } from '@nebular/theme/components/calendar-kit/components/calendar-picker/calendar-picker-row.component';
// export { NbCalendarPickerComponent } from '@nebular/theme/components/calendar-kit/components/calendar-picker/calendar-picker.component';
// export { NbCalendarActionsComponent } from '@nebular/theme/components/calendar-kit/components/calendar-actions/calendar-actions.component';
// /* eslint-enable max-len */
// export * from '@nebular/theme/components/calendar/base-calendar.component';
// export * from '@nebular/theme/components/calendar/base-calendar.module';
// export * from '@nebular/theme/components/calendar/base-calendar-range-cell';
// export * from '@nebular/theme/components/calendar/calendar-range-day-cell.component';
// export * from '@nebular/theme/components/calendar/calendar-range-month-cell.component';
// export * from '@nebular/theme/components/calendar/calendar-range-year-cell.component';
// export { NbCalendarMonthModelService } from '@nebular/theme/components/calendar-kit/services/calendar-month-model.service';
// export * from '@nebular/theme/components/calendar-kit/services/calendar-year-model.service';
// export * from '@nebular/theme/components/calendar-kit/services/calendar-time-model.service';
// export { NbNativeDateService } from '@nebular/theme/components/calendar-kit/services/native-date.service';
// export { NbDateService, NbDayPeriod } from '@nebular/theme/components/calendar-kit/services/date.service';
// export * from '@nebular/theme/components/calendar-kit/model';
// export * from '@nebular/theme/components/calendar-kit/calendar-kit.module';
// export * from '@nebular/theme/components/layout/layout.module';
// export * from '@nebular/theme/components/layout/layout.component';
// export * from '@nebular/theme/components/layout/layout-direction.directive';
// export * from '@nebular/theme/components/layout/restore-scroll-top.service';
// export * from '@nebular/theme/components/menu/menu.module';
// export { NbMenuService, NbMenuItem, NbMenuBag } from '@nebular/theme/components/menu/menu.service';
// export * from '@nebular/theme/components/menu/menu.component';
// export * from '@nebular/theme/components/route-tabset/route-tabset.module';
// export * from '@nebular/theme/components/route-tabset/route-tabset.component';
// export * from '@nebular/theme/components/sidebar/sidebar.module';
// export { NbSidebarService } from '@nebular/theme/components/sidebar/sidebar.service';
// export * from '@nebular/theme/components/sidebar/sidebar.component';
// export * from '@nebular/theme/components/tabset/tabset.module';
// export * from '@nebular/theme/components/datepicker/date-timepicker.component';
// export * from '@nebular/theme/components/datepicker/calendar-with-time.component';
// export * from '@nebular/theme/components/tabset/tabset.component';
// export * from '@nebular/theme/components/tabset/tab-content.directive';
// export * from '@nebular/theme/components/tabset/tab-title.directive';
// export * from '@nebular/theme/components/user/user.module';
// export * from '@nebular/theme/components/user/user.component';
// export * from '@nebular/theme/components/actions/actions.module';
// export * from '@nebular/theme/components/actions/actions.component';
// export * from '@nebular/theme/components/search/search.module';
// export * from '@nebular/theme/components/search/search.service';
// export * from '@nebular/theme/components/search/search.component';
// export * from '@nebular/theme/components/checkbox/checkbox.component';
// export * from '@nebular/theme/components/checkbox/checkbox.module';
// export * from '@nebular/theme/components/badge/badge.component';
// export * from '@nebular/theme/components/badge/badge.module';
// export * from '@nebular/theme/components/popover/popover.directive';
// export * from '@nebular/theme/components/popover/popover.module';
// export * from '@nebular/theme/components/popover/popover.component';
// export * from '@nebular/theme/components/context-menu/context-menu.directive';
// export * from '@nebular/theme/components/context-menu/context-menu.component';
// export * from '@nebular/theme/components/context-menu/context-menu.module';
// export * from '@nebular/theme/components/progress-bar/progress-bar.component';
// export * from '@nebular/theme/components/progress-bar/progress-bar.module';
// export * from '@nebular/theme/components/alert/alert.component';
// export * from '@nebular/theme/components/alert/alert.module';
// export * from '@nebular/theme/components/chat/chat.component';
// export * from '@nebular/theme/components/chat/chat-message.component';
// export * from '@nebular/theme/components/chat/chat-message-map.component';
// export * from '@nebular/theme/components/chat/chat-message-file.component';
// export * from '@nebular/theme/components/chat/chat-message-quote.component';
// export * from '@nebular/theme/components/chat/chat-message-text.component';
// export * from '@nebular/theme/components/chat/chat-form.component';
// export * from '@nebular/theme/components/chat/chat.module';
// export * from '@nebular/theme/components/chat/chat.options';
// export * from '@nebular/theme/components/chat/chat-avatar.component';
// export * from '@nebular/theme/components/chat/chat-custom-message.directive';
// export * from '@nebular/theme/components/chat/chat-custom-message.service';
// export * from '@nebular/theme/components/chat/chat-title.directive';
// export * from '@nebular/theme/components/spinner/spinner.component';
// export * from '@nebular/theme/components/spinner/spinner.directive';
// export * from '@nebular/theme/components/spinner/spinner.module';
// export * from '@nebular/theme/components/stepper/stepper-tokens';
// export * from '@nebular/theme/components/stepper/stepper.component';
// export * from '@nebular/theme/components/stepper/step.component';
// export * from '@nebular/theme/components/stepper/stepper-button.directive';
// export * from '@nebular/theme/components/stepper/stepper.module';
// export * from '@nebular/theme/components/accordion/accordion.component';
// export * from '@nebular/theme/components/accordion/accordion-item.component';
// export * from '@nebular/theme/components/accordion/accordion-item-body.component';
// export * from '@nebular/theme/components/accordion/accordion-item-header.component';
// export * from '@nebular/theme/components/accordion/accordion.module';
// export * from '@nebular/theme/components/button/base-button';
// export * from '@nebular/theme/components/button/button.component';
// export * from '@nebular/theme/components/button/button.module';
// export * from '@nebular/theme/components/button-group/button-group.component';
// export * from '@nebular/theme/components/button-group/button-group.module';
// export * from '@nebular/theme/components/button-group/button-toggle.directive';
// export * from '@nebular/theme/components/button-group/button-group-injection-tokens';
// export * from '@nebular/theme/components/list/list.component';
// export * from '@nebular/theme/components/list/list.module';
// export * from '@nebular/theme/components/list/list-page-tracker.directive';
// export * from '@nebular/theme/components/list/infinite-list.directive';
// export * from '@nebular/theme/components/input/input.directive';
// export * from '@nebular/theme/components/input/input.module';
// export * from '@nebular/theme/components/cdk/overlay/overlay.module';
// export * from '@nebular/theme/components/cdk/overlay/overlay-service';
// export * from '@nebular/theme/components/cdk/overlay/overlay-position';
// export * from '@nebular/theme/components/cdk/overlay/overlay-container';
// export * from '@nebular/theme/components/cdk/overlay/overlay-trigger';
// export * from '@nebular/theme/components/cdk/overlay/mapping';
// export * from '@nebular/theme/components/cdk/overlay/position-helper';
// export * from '@nebular/theme/components/cdk/overlay/dynamic/dynamic-overlay';
// export * from '@nebular/theme/components/cdk/overlay/dynamic/dynamic-overlay-handler';
// export * from '@nebular/theme/components/cdk/platform/platform-service';
// export * from '@nebular/theme/components/cdk/a11y/a11y.module';
// export * from '@nebular/theme/components/cdk/a11y/focus-trap';
// export * from '@nebular/theme/components/cdk/a11y/focus-key-manager';
// export * from '@nebular/theme/components/cdk/adapter/adapter.module';
// export * from '@nebular/theme/components/cdk/adapter/block-scroll-strategy-adapter';
// export * from '@nebular/theme/components/cdk/adapter/overlay-container-adapter';
// export * from '@nebular/theme/components/cdk/adapter/scroll-dispatcher-adapter';
// export * from '@nebular/theme/components/cdk/adapter/viewport-ruler-adapter';
// export * from '@nebular/theme/components/cdk/bidi/bidi-service';
// export * from '@nebular/theme/components/cdk/bidi/bidi.module';
// export * from '@nebular/theme/components/cdk/table/cell';
// export * from '@nebular/theme/components/cdk/table/data-source';
// export * from '@nebular/theme/components/cdk/table/row';
// export * from '@nebular/theme/components/cdk/table/table.module';
// export * from '@nebular/theme/components/dialog/dialog-config';
// export * from '@nebular/theme/components/dialog/dialog-ref';
// export * from '@nebular/theme/components/dialog/dialog.service';
// export * from '@nebular/theme/components/dialog/dialog.module';
// export * from '@nebular/theme/components/toastr/toastr.module';
// export * from '@nebular/theme/components/toastr/toastr.service';
// export * from '@nebular/theme/components/toastr/model';
// export * from '@nebular/theme/components/toastr/toast.component';
// export * from '@nebular/theme/components/toastr/toastr-config';
// export * from '@nebular/theme/components/toastr/toastr-container.component';
// export * from '@nebular/theme/components/tooltip/tooltip.module';
// export * from '@nebular/theme/components/tooltip/tooltip.directive';
// export * from '@nebular/theme/components/tooltip/tooltip.component';
// export * from '@nebular/theme/components/select/select.module';
// // export * from '@nebular/theme/components/select-with-autocomplete/select-with-autocomplete.module';
// export * from '@nebular/theme/components/select/select.component';
// // export * from '@nebular/theme/components/select-with-autocomplete/select-with-autocomplete.component';
// export * from '@nebular/theme/components/option/option-list.module';
// export * from '@nebular/theme/components/option/option.component';
// export * from '@nebular/theme/components/option/option-group.component';
// export * from '@nebular/theme/components/option/option-list.component';
// export * from '@nebular/theme/components/select/select-injection-tokens';
// export * from '@nebular/theme/components/autocomplete/autocomplete.module';
// export * from '@nebular/theme/components/autocomplete/autocomplete.component';
// export * from '@nebular/theme/components/autocomplete/autocomplete.directive';
// export * from '@nebular/theme/components/window/window.module';
// export * from '@nebular/theme/components/window/window.service';
// export * from '@nebular/theme/components/window/window-ref';
// export * from '@nebular/theme/components/window/window.options';
// export * from '@nebular/theme/components/window/window.component';
// export * from '@nebular/theme/components/window/windows-container.component';
// export * from '@nebular/theme/components/timepicker/timepicker.module';
// export * from '@nebular/theme/components/timepicker/model';
// export * from '@nebular/theme/components/timepicker/timepicker.component';
// export * from '@nebular/theme/components/timepicker/timepicker.directive';
// export * from '@nebular/theme/components/timepicker/timepicker-cell.component';
// export * from '@nebular/theme/components/datepicker/datepicker.module';
// export * from '@nebular/theme/components/datepicker/datepicker.directive';
// export * from '@nebular/theme/components/datepicker/datepicker-adapter';
// export * from '@nebular/theme/components/datepicker/datepicker-container.component';
// export * from '@nebular/theme/components/datepicker/datepicker.component';
// export * from '@nebular/theme/components/dialog/dialog-container';
// export * from '@nebular/theme/components/radio/radio.module';
// export * from '@nebular/theme/components/radio/radio-group.component';
// export * from '@nebular/theme/components/radio/radio.component';
// export * from '@nebular/theme/components/tag/tag.module';
// export * from '@nebular/theme/components/tag/tag.component';
// export * from '@nebular/theme/components/tag/tag-list.component';
// export * from '@nebular/theme/components/tag/tag-input.directive';
// export * from '@nebular/theme/components/tree-grid/tree-grid.module';
// export * from '@nebular/theme/components/tree-grid/tree-grid.component';
// export * from '@nebular/theme/components/tree-grid/tree-grid-row.component';
// export * from '@nebular/theme/components/tree-grid/tree-grid-injection-tokens';
// export * from '@nebular/theme/components/tree-grid/tree-grid-sort.component';
// export * from '@nebular/theme/components/tree-grid/tree-grid-row-toggle.component';
// export * from '@nebular/theme/components/tree-grid/tree-grid-column-def.directive';
// export * from '@nebular/theme/components/tree-grid/tree-grid-cell.component';
// export * from '@nebular/theme/components/tree-grid/tree-grid-def.component';
// export * from '@nebular/theme/components/tree-grid/tree-grid-filter';
// export * from '@nebular/theme/components/tree-grid/tree-grid-row-toggle.directive';
// export * from '@nebular/theme/components/tree-grid/data-source/tree-grid.model';
// export * from '@nebular/theme/components/tree-grid/data-source/tree-grid-data-source';
// export * from '@nebular/theme/components/tree-grid/data-source/tree-grid-data.service';
// export * from '@nebular/theme/components/tree-grid/data-source/tree-grid-filter.service';
// export * from '@nebular/theme/components/tree-grid/data-source/tree-grid.service';
// export * from '@nebular/theme/components/tree-grid/data-source/tree-grid-sort.service';
// export * from '@nebular/theme/components/tree-grid/tree-grid-columns.service';
// export * from '@nebular/theme/components/icon/icon.module';
// export * from '@nebular/theme/components/icon/icon.component';
// export * from '@nebular/theme/components/icon/icon';
// export * from '@nebular/theme/components/icon/icon-pack';
// export * from '@nebular/theme/components/icon/icon-libraries';
// export * from '@nebular/theme/components/toggle/toggle.module';
// export * from '@nebular/theme/components/toggle/toggle.component';
// export * from '@nebular/theme/components/form-field/form-field.module';
// export * from '@nebular/theme/components/form-field/form-field.component';
// export * from '@nebular/theme/components/form-field/prefix.directive';
// export * from '@nebular/theme/components/form-field/suffix.directive';
// export * from '@nebular/theme/components/form-field/form-field-control';
