export class ServiceUrlConstants {
  // Authentication URL
  public static SIGN_IN = '/security/token/';
  public static REFRESH_TOKEN = '/security/v1/token/refresh/';
  public static SIGN_UP = '/security/v1/usermanager/';
  public static PERMISSION = '/security/v1/get_user_permissions';
  public static USERGROUPS = '/security/v1/get_user_groups';
  public static TUTORIALLINKS = '/security/v1/tutorial_videos/';
  public static MEDIALINKS = '/media/tutorials/';

  // Security
  // USER URL
  public static USER_CRUD = '/security/api/v1/usermanager/';

  // Company
  // App settings URL
  public static APP_SETTINGS_CRUD = '/company/api/v1/AppSettings/';
  // Company URL
  public static COMPANY_CRUD = '/company/api/v1/Company/';
  // Company User URL
  public static COMPANY_USER_CRUD = '/company/api/v1/CompanyUser/';
  // Department URL
  // public static DEPARTMENT_CRUD = '/company/api/v1/Department/';

  // Master
  public static UNIT_MASTER_CRUD = '/master/api/v1/UnitMaster/';
  public static DIE_MASTER_CRUD = '/master/api/v1/DieMaster/';
  public static SHOPCENTER_MASTER_CRUD = '/master/api/v1/ShopCenterMaster/';
  public static TOOLS_MASTER_CRUD = '/master/api/v1/ToolsMaster/';
  public static TRADESMAN_MASTER_CRUD = '/master/api/v1/TradesManMaster/';

  public static PRODUCTMASTER_CRUD = '/master/api/v1/ProductMaster/';
  public static PROCESSMASTER_CRUD = '/master/api/v1/ProcessMaster/';
  public static PARTY_MASTER_CRUD = '/master/api/v1/PartyMaster/';

  // REPORT ENGINE
  public static REPORT_ENGINE_CRUD =
    '/ReportEngineMain/api/v1/ReportEngineMain/';
  // REPORT ENGINE BY ID
  public static REPORT_ENGINE_ID_CRUD = '/ReportEngineMain/api/v1/get_report';
  public static REPORT_ENGINE_FILTER_CRUD =
    '/ReportEngineMain/api/v1/get_report_by_filter';
  public static REPORT_PDF_CRUD = '/ReportEngineMain/api/v1/get_report_pdf';
  public static REPORT_EXCEL_CRUD = '/ReportEngineMain/api/v1/get_report_excel';

  /**
   * Warehouse creation API
   */
  public static WAREHOUSE_CREATION_CRUD =
    '/warehouse/api/v1/WareHouseCreation/';


  /**
   * Employee Master API
   */
  public static EMPLOYEE_MASTER_CRUD = '/master/employee-master/';

  /**
   * Designation API
   */
  public static DESIGNATION_CRUD = '/master/designation/';

  /**
 * Department API
 */
  public static DEPARTMENT_CRUD = '/master/department/';

  /**
   * Asset Location API
   */
  public static ASSET_LOCATION_CRUD = '/asset/asset-location/';

  public static GOODS_RECEIVED_NOTE = '/inventory/grn/';

  public static VENDOR_MASTER = "/master/vendor/";

  public static APP_ENUMS = "/warehouse/AppEnums/";

  /**
   * Asset API's
   */

  public static CATEGORY_CRUD = "/asset/categories/";

  public static ASSET = "/asset/";
  public static SUBCATEGORY_CRUD = "/asset/subcategories/";

  public static PURCHASE_ORDER = "/purchase/purchase-order/";
}
