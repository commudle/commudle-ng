import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { ScrollerComponent } from './components/body/scroller.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableComponent } from './components/datatable.component';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { VisibilityDirective } from './directives/visibility.directive';
import { ColumnChangesService } from './services/column-changes.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ScrollbarHelper } from './services/scrollbar-helper.service';

@NgModule({
  imports: [CommonModule],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
  declarations: [
    DataTableFooterTemplateDirective,
    VisibilityDirective,
    DraggableDirective,
    ResizeableDirective,
    OrderableDirective,
    LongPressDirective,
    ScrollerComponent,
    DatatableComponent,
    DataTableColumnDirective,
    DataTableHeaderComponent,
    DataTableHeaderCellComponent,
    DataTableBodyComponent,
    DataTableFooterComponent,
    DataTablePagerComponent,
    ProgressBarComponent,
    DataTableBodyRowComponent,
    DataTableRowWrapperComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableBodyCellComponent,
    DataTableSelectionComponent,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective,
    DataTableSummaryRowComponent,
  ],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent,
    DatatableGroupHeaderTemplateDirective,
  ],
})
export class NgxDatatableModule {
  /**
   * Configure global configuration via INgxDatatableConfig
   * @param configuration
   */
  static forRoot(
    configuration: INgxDatatableConfig
  ): ModuleWithProviders<NgxDatatableModule> {
    return {
      ngModule: NgxDatatableModule,
      providers: [{ provide: 'configuration', useValue: configuration }],
    };
  }
}

/**
 * Interface definition for INgxDatatableConfig global configuration
 */
export interface INgxDatatableConfig {
  messages: {
    emptyMessage: string; // Message to show when array is presented, but contains no values
    totalMessage: string; // Footer total message
    selectedMessage: string; // Footer selected message
  };
}
