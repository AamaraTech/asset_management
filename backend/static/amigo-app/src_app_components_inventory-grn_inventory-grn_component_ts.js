"use strict";(self.webpackChunkwm_ui_web_app=self.webpackChunkwm_ui_web_app||[]).push([["src_app_components_inventory-grn_inventory-grn_component_ts"],{9621:(c,i,n)=>{n.r(i),n.d(i,{InventoryGrnComponent:()=>_});var e=n(4438),o=n(8214),a=n(9389),s=n(1467);let _=(()=>{class t{constructor(){this.grnConfig=(0,e.vPA)({formName:"inventory-grn",pageTitle:"Goods Received Note",tableHeaders:[{label:"grn_no_TC",field:"grn_no",matchModeOptions:[{label:"Starts With",value:"startsWith"},{label:"Ends With",value:"endswith"},{label:"Contains",value:"icontains"},{label:"Equal",value:"iexact"}],isFilterRequired:!0},{label:"grn_date_TC",field:"grn_date",matchModeOptions:[{label:"Starts With",value:"startsWith"},{label:"Ends With",value:"endswith"},{label:"Contains",value:"icontains"},{label:"Equal",value:"iexact"}],isFilterRequired:!0},{label:"vendor_bill_TC",isFilterRequired:!1},{label:"vendor_bill_date_TC",isFilterRequired:!1}],tableBody:["grn_no","grn_date","vendor_bill","vendor_bill_date"],editable:!0,url:{post:a.q.GOODS_RECEIVED_NOTE,get:a.q.GOODS_RECEIVED_NOTE,delete:a.q.GOODS_RECEIVED_NOTE,UPDATE:""},actions:[{label:"",icon:"pencil",actionType:"EDIT"},{label:"",icon:"trash",actionType:"DELETE"}],isShowDialog:!1,parentRoute:"grn",dropdownOptions:{filed:{purchase_order:{IsHidden:!0}}}}),this.grnForm=(0,e.vPA)(null),this.grnFormConfig=(0,e.WQX)(o.l)}ngOnInit(){this.grnForm.set(this.grnFormConfig.getForm()["inventory-grn"])}static#e=this.\u0275fac=function(r){return new(r||t)};static#n=this.\u0275cmp=e.VBU({type:t,selectors:[["sanadi-inventory-grn"]],standalone:!0,features:[e.aNF],decls:1,vars:2,consts:[[3,"config","formConfig"]],template:function(r,l){1&r&&e.nrm(0,"sanadi-table-filter",0),2&r&&e.Y8G("config",l.grnConfig())("formConfig",l.grnForm())},dependencies:[s.E]})}return t})()}}]);