export class VendorMasterModel {
  id?: number;
  vendor_type: string;
  vendor_name: string;
  vendor_code: string;
  ref_code: string;
  address_line1: string;
  address_line2: string;
  country: string;
  city: string;
  state: string;
  state_code: string;
  zip_code: string;
  phone_number: string;
  alternate_phone_no: string;
  fax_number: string;
  tax_number: string;
  email: string;
  note: string;
  pan_no: string;
  cin_no: string;
  reference_no: string;
  payment_terms: string;
  payment_method: string;
  remarks: string;
  bank_details: BankDetail[];
  poc_details: PocDetail[];
}

export class BankDetail {
  bank_name: string;
  branch_name: string;
  account_name: string;
  account_number: string;
  swift_code: string;
  routing_code: string;
}

export class PocDetail {
  name: string;
  designation: string;
  email: string;
  phone_number: string;
}
