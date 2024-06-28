import { ItemCategoryModel } from "./item-category.model";
import { ItemSubCategoryModel } from "./item-subcategory.model";

export class ItemCreationModel {
  id: number;
  created_at: string;
  asset_code: string;
  asset_name: string;
  asset_serial_number: string;
  asset_description: string;
  asset_type: string;
  asset_status: string;
  asset_hs_code: string;
  asset_purchase_cost: any;
  asset_purchase_date: any;
  asset_manufacturing_date: any;
  asset_lifecycle: any;
  asset_value_type: any;
  depreciation_incremental_percent_per_year: any;
  depreciation_incremental_value_cost: any;
  is_active: boolean;
  qr_code: string;
  barcode: string;
  store: any;
  asset_category: ItemCategoryModel = new ItemCategoryModel();
  asset_subcategory:ItemSubCategoryModel = new ItemSubCategoryModel();
  asset_category_name: string;
  asset_subcategory_name: string;
}



// import { ItemCategoryModel } from "./item-category.model";
// import { ItemSubCategoryModel } from "./item-subcategory.model";

// export class ItemCreationModel {
//   id?: number;
//   created_at?: string;
//   asset_code?: string="ASSET001";
//   asset_name?: string="Laptop";
//   asset_serial_number?: string="SN123456";
//   asset_description?: string="High-performance laptop for development tasks";
//   asset_type?: string="physical";
//   asset_status?: string = "new";
//   asset_hs_code?: string="123456";
//   asset_purchase_cost?: any = 1200.50;
//   asset_purchase_date?: any = "2023-01-15";
//   asset_manufacturing_date?: any = "2022-12-01";
//   asset_lifecycle?: any = "P365D";
//   asset_value_type?: any = "depreciating";
//   depreciation_incremental_percent_per_year?: any = 5.00;
//   depreciation_incremental_value_cost?: any = 60.25;
//   is_active?: boolean = true;
//   qr_code?: string;
//   barcode?: string;
//   store?: any;
//   asset_category?: any = 6//ItemCategoryModel;
//   asset_subcategory?: any = 1//ItemSubCategoryModel;
//   asset_category_name?: string;
//   asset_subcategory_name?: string;
// }
