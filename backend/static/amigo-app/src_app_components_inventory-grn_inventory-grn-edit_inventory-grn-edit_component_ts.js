"use strict";(self.webpackChunkwm_ui_web_app=self.webpackChunkwm_ui_web_app||[]).push([["src_app_components_inventory-grn_inventory-grn-edit_inventory-grn-edit_component_ts"],{2142:(R,h,i)=>{i.r(h),i.d(h,{InventoryGrnEditComponent:()=>C});var e=i(4438),o=i(9417),_=i(4842),m=i(7586),f=i(2637),u=i(1141),c=i(9903),v=i(4945),p=i(9958),n=i(4957),l=i(9673),D=i(8187),g=i(3993),F=i(1004),b=i(4772),E=i(2021),M=i(3492);const w=()=>[M.S];function z(d,y){if(1&d&&e.nrm(0,"dropdown",6),2&d){const t=e.XpG();e.Y8G("form",t.form)("field",t.formFields().purchase_order)}}function P(d,y){if(1&d&&e.nrm(0,"table-field",10),2&d){const t=e.XpG();e.Y8G("form",t.form)("columnSchema",null==t.tableField?null:t.tableField.columnSchema)("field",t.tableField)("formName",null==t.tableField?null:t.tableField.name)("formSchema",null==t.tableField?null:t.tableField.formSchema)("dataSource",null==t.tableField?null:t.tableField.dataSource)("formInitialise",null==t.tableField?null:t.tableField.formInitialise)("dataKey",null==t.tableField?null:t.tableField.dataKey)("scrollHeight",null==t.tableField?null:t.tableField.scrollHeight)("hideButton",null==t.tableField?null:t.tableField.hideButton)("hideFrozenColumn",null==t.tableField?null:t.tableField.hideFrozenColumn)}}let C=(()=>{class d extends D.L{constructor(t){super(t),this.translate=t,this.form=new o.gE({[n.z.grn_no]:new o.MJ,[n.z.grn_date]:new o.MJ(null,{validators:[o.k0.required]}),[n.z.source]:new o.MJ(null,{validators:[o.k0.required]}),[n.z.vendor_bill]:new o.MJ,[n.z.vendor_bill_date]:new o.MJ,[n.z.vendor_address]:new o.MJ,[n.z.vendor]:new o.MJ(null,{validators:[o.k0.required]}),[n.z.other_ref_no]:new o.MJ,[n.z.note]:new o.MJ,[n.z.batch_no]:new o.MJ,[n.z.arrive_date]:new o.MJ,[n.z.exit_date]:new o.MJ,[n.z.vehicle_no]:new o.MJ,[n.z.remarks]:new o.MJ,[n.z.grn_items]:new o.MJ}),this.formFields=(0,e.vPA)(null),this.tabIndex=(0,e.vPA)(null),this.poDropDownData=(0,e.vPA)(null),this.vendorDropDownData=(0,e.vPA)(null),this.sourceDropdownOptions=(0,e.vPA)([{key:"direct",value:"Direct"},{key:"purchase_order",value:"Purchase Order"}]),this.isPoDropDownVisible=(0,e.vPA)(!1),this.inventoryService=(0,e.WQX)(p.c)}ngOnInit(){this.loadGrnFormData()}loadGrnFormData(){this.formFields.set(this.getFormFields()),this.inventoryService.getGrnData(this.form).subscribe(t=>{this.tableField=this.inventoryService.getTableFeilds()})}saveForm(){this.inventoryService.updateGrnForm(this.form.value)}cancel(){this.inventoryService.cancel()}sourceDropdownChangeHandler(t,a,r){"purchase_order"===a?(this.form.addControl(n.z.purchase_order,new o.MJ),this.isPoDropDownVisible.set(!0)):(this.form.get(n.z.vendor).enable(),this.isPoDropDownVisible.set(!1),this.form.removeControl(n.z.purchase_order))}vendorDropdownHandler(t,a,r){}poDropdownHandler(t,a,r){const s=this.form.get(n.z.vendor);s.disable();let I=this.inventoryService.poDropDownData()?.find(O=>O.key===a);s.setValue(I.key)}onGrnDateChange(t,a,r){return r.grn_date=m(r?.grn_date).format("YYYY-MM-DD"),r}onVendorBillDateChange(t,a,r){return r.vendor_bill_date=m(r?.vendor_bill_date).format("YYYY-MM-DD"),r}getFormFields(){return{[n.z.grn_no]:this.getInputField(n.z.grn_no,new l.$),[n.z.source]:this.getDropDownField(n.z.source,new l.$,this.sourceDropdownChangeHandler.bind(this),this.sourceDropdownOptions),[n.z.purchase_order]:this.getDropDownField(n.z.purchase_order,new l.$,this.poDropdownHandler.bind(this),this.inventoryService.poDropDownData),[n.z.grn_date]:this.getDateField(n.z.grn_date,new l.$,this.onGrnDateChange.bind(this)),[n.z.vendor]:this.getDropDownField(n.z.vendor,new l.$,this.vendorDropdownHandler.bind(this),this.inventoryService.vendorDropDownData),[n.z.vendor_bill]:this.getInputField(n.z.vendor_bill,new l.$),[n.z.vendor_bill_date]:this.getDateField(n.z.vendor_bill_date,new l.$,this.onVendorBillDateChange.bind(this)),[n.z.vendor_address]:this.getInputField(n.z.vendor_address,new l.$),[n.z.other_ref_no]:this.getInputField(n.z.other_ref_no,new l.$),[n.z.batch_no]:this.getInputField(n.z.batch_no,new l.$),[n.z.note]:this.getInputField(n.z.note,new l.$),[n.z.vehicle_no]:this.getInputField(n.z.vehicle_no,new l.$),[n.z.arrive_date]:this.getDateField(n.z.arrive_date,new l.$,this.onVendorBillDateChange.bind(this)),[n.z.exit_date]:this.getDateField(n.z.exit_date,new l.$,this.onVendorBillDateChange.bind(this)),[n.z.remarks]:this.getInputField(n.z.remarks,new l.$)}}static#e=this.\u0275fac=function(a){return new(a||d)(e.rXU(_.c$))};static#n=this.\u0275cmp=e.VBU({type:d,selectors:[["sanadi-inventory-grn-edit"]],standalone:!0,features:[e.Jv_([p.c]),e.Vt3,e.aNF],decls:43,vars:41,consts:[[3,"formGroup"],[1,"h-full","flex","flex-column","px-3","justify-content-between"],[3,"header"],[3,"activeIndex"],[1,"flex","flex-column","gap-3"],[1,"flex","flex-row","justify-content-between","gap-3"],[1,"flex-grow-1",3,"form","field"],[1,"flex","flex-row","justify-content-between","py-5"],["pButton","","label","Cancel",1,"secondary",3,"click"],["pButton","","label","Save",1,"primary",3,"click"],[3,"form","columnSchema","field","formName","formSchema","dataSource","formInitialise","dataKey","scrollHeight","hideButton","hideFrozenColumn"]],template:function(a,r){1&a&&(e.j41(0,"form",0)(1,"div",1)(2,"div")(3,"p-tabView")(4,"p-tabPanel",2),e.nI1(5,"translate"),e.j41(6,"div")(7,"p-accordion",3)(8,"p-accordionTab",2),e.nI1(9,"translate"),e.j41(10,"div",4)(11,"div",5),e.nrm(12,"sanadi-input",6)(13,"date",6)(14,"dropdown",6),e.DNE(15,z,1,2,"dropdown",6),e.k0s(),e.j41(16,"div",5),e.nrm(17,"sanadi-input",6)(18,"date",6)(19,"sanadi-input",6),e.k0s(),e.j41(20,"div",5),e.nrm(21,"sanadi-input",6)(22,"sanadi-input",6)(23,"sanadi-input",6),e.k0s()()(),e.j41(24,"p-accordionTab",2),e.nI1(25,"translate"),e.j41(26,"div",4)(27,"div",5),e.nrm(28,"sanadi-input",6)(29,"sanadi-input",6)(30,"sanadi-input",6)(31,"sanadi-input",6),e.k0s()()()()()(),e.j41(32,"p-tabPanel",2),e.nI1(33,"translate"),e.j41(34,"div"),e.DNE(35,P,1,11),e.nv$(36,35,w),e.g25(),e.k0s()()()(),e.j41(38,"div",7),e.nrm(39,"div"),e.j41(40,"div")(41,"button",8),e.bIt("click",function(){return r.cancel()}),e.k0s(),e.j41(42,"button",9),e.bIt("click",function(){return r.saveForm()}),e.k0s()()()()()),2&a&&(e.Y8G("formGroup",r.form),e.R7$(4),e.FS9("header",e.bMT(5,33,"grn_details_TC")),e.R7$(3),e.Y8G("activeIndex",0),e.R7$(),e.FS9("header",e.bMT(9,35,"grn_Info_TC")),e.R7$(4),e.Y8G("form",r.form)("field",r.formFields().grn_no),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().grn_date),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().source),e.R7$(),e.vxM(15,r.isPoDropDownVisible()?15:-1),e.R7$(2),e.Y8G("form",r.form)("field",r.formFields().vendor_bill),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().vendor_bill_date),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().vendor_address),e.R7$(2),e.Y8G("form",r.form)("field",r.formFields().other_ref_no),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().batch_no),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().note),e.R7$(),e.FS9("header",e.bMT(25,37,"vehicle_details_TC")),e.R7$(4),e.Y8G("form",r.form)("field",r.formFields().vehicle_no),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().arrive_date),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().exit_date),e.R7$(),e.Y8G("form",r.form)("field",r.formFields().remarks),e.R7$(),e.FS9("header",e.bMT(33,39,"addProducts_TC")))},dependencies:[g.T,F.P,b.S,E.g,u.tm,u._f,c.bG,v.fd,v.JQ,v.Kp,f.h6,f.nD,f.gV,o.X1,o.qT,o.cb,o.j4,o.YN,_.h,_.D9]})}return d})()}}]);