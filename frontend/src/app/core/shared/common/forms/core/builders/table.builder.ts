import { FormField } from '../form-builder';

export class TableBuilder extends FormField {
  override type?: string = 'table';
  override fields?: FormField[] = new Array<FormField>();

  private schema: any;
  private colSchema: any;
  private dataKey: any;
  private dataSource: any;
  private formInitialization: any;
  private footerRows: any;
  private isFooterEnabled: any;

  private onValueChange: any;
  private updateTableFooter: any;
  private tableCaption: boolean = false;
  private tableCaptionLabel: string = '';
  private tableCaptionDialogButton: boolean = false;
  private tableCaptionDialogButtonLabel: string = '';
  private exportTableData: boolean = false;
  private dialog: any;
  private dialogConfig: any;
  private tableField: any;

  constructor(translate, name?: string, label?: string) {
    super(translate);
    this.name = name;
    this.label = label;
  }

  formInitialise<T>(initialise: T) {
    this.formInitialization = initialise;
    return this;
  }

  columnSchema(colSchema) {
    this.colSchema = colSchema;
    return this
  }

  formSchema<T>(schema: T) {
    this.schema = schema
    return this;
  }

  getDatasource<T>(id: string, list: T) {
    this.dataKey = id;
    this.dataSource = list;
    return this
  }

  enableFooter(isEnabled) {
    this.isFooterEnabled = isEnabled;
    return this;
  }

  onChange(onValueChange: Function) {
    this.onValueChange = onValueChange.bind(this);
    return this;
  }

  footerInitialise(rows) {
    this.footerRows = rows;
    return this;
  }



  addDialog(dialog, config) {
    this.dialog = dialog
    this.dialogConfig = config;
    return this;
  }


  setOnValueChange(onValueChange: any): TableBuilder {
    this.onValueChange = onValueChange;
    return this;
  }

  setTableCaption(tableCaption: boolean): TableBuilder {
    this.tableCaption = tableCaption;
    return this;
  }

  setTableCaptionLabel(tableCaptionLabel: string): TableBuilder {
    this.tableCaptionLabel = tableCaptionLabel;
    return this;
  }

  setTableCaptionDialogButton(tableCaptionDialogButton: boolean): TableBuilder {
    this.tableCaptionDialogButton = tableCaptionDialogButton;
    return this;
  }

  setTableCaptionDialogButtonLabel(tableCaptionDialogButtonLabel: string): TableBuilder {
    this.tableCaptionDialogButtonLabel = tableCaptionDialogButtonLabel;
    return this;
  }

  setExportTableData(exportTableData: boolean): TableBuilder {
    this.exportTableData = exportTableData;
    return this;
  }

  setDialog(dialog: any): TableBuilder {
    this.dialog = dialog;
    return this;
  }

  setField(field: OverlayPanelBuilder) {
    this.tableField = field;
    return this;
  }


  build() {
    return {
      type: this.type,
      name: this.name,
      label: this.label,
      tableGridlines: "p-datatable-gridlines",
      scrollHeight: "30rem",
      formInitialise: this.formInitialization,
      columnSchema: this.colSchema,
      formSchema: this.schema,
      dataKey: this.dataKey,
      dataSource: this.dataSource,
      tableFooter: this.isFooterEnabled,
      footerInitialise: this.footerRows,
      onValueChange: this.onValueChange,
      updateTableFooter: this.updateTableFooter,

      // table popup
      tableCaption: this.tableCaption,
      tableCaptionLabel: this.tableCaptionLabel,
      tableCaptionDialogButton: this.tableCaptionDialogButton,
      tableCaptionDialogButtonLabel: this.tableCaptionDialogButtonLabel,
      exportTableData: this.exportTableData,
      dialog: this.dialog,
      config: this.dialogConfig,
      field: this.tableField,


    }
  }


}



export class OverlayPanelBuilder {
  private overlayPanelColumnSchema: any = null;
  private overlayPanelList: any[] = [];
  private overlayPanelSelectionMode: string = 'single';
  private overlayPanelRows: number = 10;
  private dialogScrollHeight: string = '55vh';
  private overlayPanelFormInitialise: string[] = [];
  private overlayPanelPaginator: boolean = true;
  private scrollable: boolean = true;
  private lazy: boolean = true;
  private fontSize: string = '14px';
  private queryParams: any = {};
  private disabledField: string = 'false';
  private urls: any;
  private tableName: string;
  private onUpdateRows: any;
  constructor() { }

  setOverlayPanelColumnSchema(overlayPanelColumnSchema: any): OverlayPanelBuilder {
    this.overlayPanelColumnSchema = overlayPanelColumnSchema;
    return this;
  }

  setOverlayPanelList(overlayPanelList: any): OverlayPanelBuilder {
    this.overlayPanelList = overlayPanelList;
    return this;
  }

  setOverlayPanelSelectionMode(overlayPanelSelectionMode: string): OverlayPanelBuilder {
    this.overlayPanelSelectionMode = overlayPanelSelectionMode;
    return this;
  }

  setOverlayPanelRows(overlayPanelRows: number): OverlayPanelBuilder {
    this.overlayPanelRows = overlayPanelRows;
    return this;
  }

  setDialogScrollHeight(dialogScrollHeight: string): OverlayPanelBuilder {
    this.dialogScrollHeight = dialogScrollHeight;
    return this;
  }

  setOverlayPanelFormInitialise(overlayPanelFormInitialise: string[]): OverlayPanelBuilder {
    this.overlayPanelFormInitialise = overlayPanelFormInitialise;
    return this;
  }

  setOverlayPanelPaginator(overlayPanelPaginator: boolean): OverlayPanelBuilder {
    this.overlayPanelPaginator = overlayPanelPaginator;
    return this;
  }

  setScrollable(scrollable: boolean): OverlayPanelBuilder {
    this.scrollable = scrollable;
    return this;
  }

  setLazy(lazy: boolean): OverlayPanelBuilder {
    this.lazy = lazy;
    return this;
  }

  setFontSize(fontSize: string): OverlayPanelBuilder {
    this.fontSize = fontSize;
    return this;
  }

  setQueryParams(queryParams: any): OverlayPanelBuilder {
    this.queryParams = queryParams;
    return this;
  }

  setDisabledField(disabledField: string): OverlayPanelBuilder {
    this.disabledField = disabledField;
    return this;
  }

  setUrls(urls: any) {
    this.urls = urls;
    return this;
  }

  setTableName(tableName: string) {
    this.tableName = tableName
    return this;
  }

  setOnUpdateRows(onUpdateRows: any) {
    this.onUpdateRows = onUpdateRows;
    return this;
  }



  build(): any {
    return {
      overlayPanelColumnSchema: this.overlayPanelColumnSchema,
      overlayPanelList: this.overlayPanelList,
      overlayPanelSelectionMode: this.overlayPanelSelectionMode,
      overlayPanelRows: this.overlayPanelRows,
      dialogScrollHeight: this.dialogScrollHeight,
      overlayPanelFormInitialise: this.overlayPanelFormInitialise,
      overlayPanelPaginator: this.overlayPanelPaginator,
      scrollable: this.scrollable,
      lazy: this.lazy,
      fontSize: this.fontSize,
      queryParams: this.queryParams,
      disabledField: this.disabledField,
      url: this.urls,
      tableName: this.tableName,
      updateRows: this.onUpdateRows
    };
  }
}

// Example Usage:
// const overlayPanelSettings = new OverlayPanelBuilder()
//   .setOverlayPanelColumnSchema(null)
//   .setOverlayPanelList([{}, {}, {}, {}, {}])
//   .setOverlayPanelSelectionMode('single')
//   .setOverlayPanelRows(10)
//   .setDialogScrollHeight('55vh')
//   .setOverlayPanelFormInitialise(['productName', 'kit_no'])
//   .setOverlayPanelPaginator(true)
//   .setScrollable(true)
//   .setLazy(true)
//   .setFontSize('14px')
//   .setQueryParams({})
//   .setDisabledField('false')
//   .build();
