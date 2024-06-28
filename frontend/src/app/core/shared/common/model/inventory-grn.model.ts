export class InventoryGrnModel {
  grn_no: string;
  grn_date: string;
  source: string;
  purchase_order: number;
  vendor_bill: string;
  vendor_bill_date: string;
  vendor: number;
  vendor_address: string;
  batch_no: string;
  note: string;
  other_ref_no: string;
  vehicle_no: string;
  arrive_date: string;
  exit_date: string;
  remarks: string;
  grn_items: GrnItem[];
}

export class GrnItem {
  asset: number;
  asset_code: any;
  asset_description: string;
  asset_serial_number: any;
  hs_code: string;
  uom: string;
  po_qty: number;
  received_qty: number;
  unit_price: number;
  discount: number;
  tax: number;
  reject_qty: number;
  accepted_qty: number;
  balance_qty: number;
  sub_total: number;
  total_amount: number;
  remarks: string;
}

export interface IInventoryGrnEdit {
  saveForm(): void;
  cancel(): void;
  loadGrnFormData(): void;
}
