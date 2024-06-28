import { PocDetail } from "./vendor-master.model";

export class PurchaseOrderModel {
  source: string;
  po_no: string;
  po_date: string;
  vendor: number;
  poc: number;
  poc_name: PocDetail[]
  vendor_quotation_no: string;
  quotation_date: string;
  delivery_terms: DeliveryTermsModel = new DeliveryTermsModel();poc_phone: any;
  poc_email: any;
;
  delivery_preference: string;
  payment_terms: string;
  bill_to_name: string;
  bill_to_address1: string;
  bill_to_address2: string;
  bill_to_tax_no: string;
  bill_to_country: string;
  bill_to_city: string;
  bill_to_zip_code: string;
  bill_to_state: string;
  ship_to_name: string;
  ship_to_address1: string;
  ship_to_address2: string;
  ship_to_tax_no: string;
  ship_to_country: string;
  ship_to_city: string;
  ship_to_zipcode: string;
  ship_to_state: string;
  sub_total: number;
  discount: number;
  tax_amount: number;
  total_amount: number;
  payment_type: string;
  note: string;
  terms_conditions: string;
  purchase_order_items: PurchaseOrderItem[] = new Array<PurchaseOrderItem>();
}

export class PurchaseOrderItem {
  asset: number;
  mfr: string;
  delivery_date: Date;
  qty: number;
  uom: string;
  unit_price: number;
  discount: number;
  discount_amount: number;
  tax: number;
  tax_amount: number;
  total_amount: number;
  asset_code: string;
  asset_description: string;
  asset_name: string;
}

export class DeliveryTermsModel {
  id?: number = 0;
  delivery_terms?: string = ''
}

export class PaymentTermsModel {
  id?: number = 0;
  payment_terms?: string = ''
}