"use strict";(self.webpackChunkwm_ui_web_app=self.webpackChunkwm_ui_web_app||[]).push([["src_app_core_shared_components_form-playground_form-playground_component_ts"],{7071:(S,d,o)=>{o.r(d),o.d(d,{FormPlaygroundComponent:()=>C});var c=o(177),l=o(9417),u=o(6294),p=o(9847),_=o(3993),e=o(4438),g=o(790),y=o(1141),b=o(5875),f=o(491),h=o(563);class m{constructor(){this.country="in",this.gender="m",this.isHeadOffice=!0,this.firstName="",this.lastName="",this.email=""}}let C=(()=>{class a{constructor(){this.vm=new m,this.fields=[],this.fields2=[],this.fields3=[],this.fields4=[{type:"card",headerText:"Card Header",footerText:"",fillScreen:"",fields:[{type:"text",name:"firstName",label:"First Name",placeholder:"First Name",value:"",validation:{required:!0,minlength:5,maxlength:10},prefixGroupBy:!0,prefixGroupByIcon:"pi-user",errorText:{required:"First name is required",minlength:"First name min 5",maxlength:"First name max 10"}},{type:"text",name:"lastName",label:"Last Name",placeholder:"Last Name",value:"",validation:{required:!0},prefixGroupBy:!0,prefixGroupByText:"Mr",errorText:{required:"Last name is required"}}]},{type:"table",name:"billingAddress",label:"Billing Address",formInitialise:{code:"",name:"",inventoryStatus:"",price:""},columnSchema:["companyNameLabel_TC","pinCodeLabel_TC","cityLabel_TC","stateNameLabel_TC"],formSchema:[{name:"code",type:"input"},{name:"name",type:"input"},{name:"inventoryStatus",type:"dropdown",placeholder:"Enter status",options:[{name:"In Stock",id:"INSTOCK"},{name:"Low Stock",id:"LOWSTOCK"},{name:"Out of Stock",id:"OUTOFSTOCK"}],optionLabel:"name",optionValue:"id"},{name:"price",type:"input"}],dataKey:"id",dataSource:[{id:"1000",code:"f230fh0g3",name:"Bamboo Watch",description:"Product Description",image:"bamboo-watch.jpg",price:65,category:"Accessories",quantity:24,inventoryStatus:"INSTOCK",rating:5},{id:"1001",code:"nvklal433",name:"Black Watch",description:"Product Description",image:"black-watch.jpg",price:72,category:"Accessories",quantity:61,inventoryStatus:"INSTOCK",rating:4},{id:"1002",code:"zz21cz3c1",name:"Blue Band",description:"Product Description",image:"blue-band.jpg",price:79,category:"Fitness",quantity:2,inventoryStatus:"LOWSTOCK",rating:3},{id:"1003",code:"244wgerg2",name:"Blue T-Shirt",description:"Product Description",image:"blue-t-shirt.jpg",price:29,category:"Clothing",quantity:25,inventoryStatus:"INSTOCK",rating:5},{id:"1004",code:"h456wer53",name:"Bracelet",description:"Product Description",image:"bracelet.jpg",price:15,category:"Accessories",quantity:73,inventoryStatus:"INSTOCK",rating:4},{id:"1005",code:"av2231fwg",name:"Brown Purse",description:"Product Description",image:"brown-purse.jpg",price:120,category:"Accessories",quantity:0,inventoryStatus:"OUTOFSTOCK",rating:4},{id:"1006",code:"bib36pfvm",name:"Chakra Bracelet",description:"Product Description",image:"chakra-bracelet.jpg",price:32,category:"Accessories",quantity:5,inventoryStatus:"LOWSTOCK",rating:3},{id:"1007",code:"mbvjkgip5",name:"Galaxy Earrings",description:"Product Description",image:"galaxy-earrings.jpg",price:34,category:"Accessories",quantity:23,inventoryStatus:"INSTOCK",rating:5},{id:"1008",code:"vbb124btr",name:"Game Controller",description:"Product Description",image:"game-controller.jpg",price:99,category:"Electronics",quantity:2,inventoryStatus:"LOWSTOCK",rating:4},{id:"1009",code:"cm230f032",name:"Gaming Set",description:"Product Description",image:"gaming-set.jpg",price:299,category:"Electronics",quantity:63,inventoryStatus:"INSTOCK",rating:3}]},{type:"table",name:"sellingAddress",label:"Selling Address",formInitialise:{code:"",name:"",inventoryStatus:"",price:""},columnSchema:["companyNameLabel_TC","pinCodeLabel_TC","cityLabel_TC","stateNameLabel_TC"],formSchema:[{name:"code",type:"input"},{name:"name",type:"input"},{name:"inventoryStatus",type:"dropdown",placeholder:"Enter status",options:[{name:"In Stock",id:"INSTOCK"},{name:"Low Stock",id:"LOWSTOCK"},{name:"Out of Stock",id:"OUTOFSTOCK"}],optionLabel:"name",optionValue:"id"},{name:"price",type:"input"}],dataKey:"id",dataSource:[{id:"1000",code:"f230fh0g3",name:"Bamboo Watch",description:"Product Description",image:"bamboo-watch.jpg",price:65,category:"Accessories",quantity:24,inventoryStatus:"INSTOCK",rating:5},{id:"1001",code:"nvklal433",name:"Black Watch",description:"Product Description",image:"black-watch.jpg",price:72,category:"Accessories",quantity:61,inventoryStatus:"INSTOCK",rating:4},{id:"1002",code:"zz21cz3c1",name:"Blue Band",description:"Product Description",image:"blue-band.jpg",price:79,category:"Fitness",quantity:2,inventoryStatus:"LOWSTOCK",rating:3},{id:"1003",code:"244wgerg2",name:"Blue T-Shirt",description:"Product Description",image:"blue-t-shirt.jpg",price:29,category:"Clothing",quantity:25,inventoryStatus:"INSTOCK",rating:5}]},{type:"table",name:"shippingAddress",label:"Shipping Address",formInitialise:{code:"",name:"",inventoryStatus:"",price:""},columnSchema:["companyNameLabel_TC","pinCodeLabel_TC","cityLabel_TC","stateNameLabel_TC"],formSchema:[{name:"code",type:"input"},{name:"name",type:"input"},{name:"inventoryStatus",type:"dropdown",placeholder:"Enter status",options:[{name:"In Stock",id:"INSTOCK"},{name:"Low Stock",id:"LOWSTOCK"},{name:"Out of Stock",id:"OUTOFSTOCK"}],optionLabel:"name",optionValue:"id"},{name:"price",type:"input"}],dataKey:"id",dataSource:[{id:"1000",code:"f230fh0g3",name:"Bamboo Watch",description:"Product Description",image:"bamboo-watch.jpg",price:65,category:"Accessories",quantity:24,inventoryStatus:"INSTOCK",rating:5},{id:"1001",code:"nvklal433",name:"Black Watch",description:"Product Description",image:"black-watch.jpg",price:72,category:"Accessories",quantity:61,inventoryStatus:"INSTOCK",rating:4},{id:"1002",code:"zz21cz3c1",name:"Blue Band",description:"Product Description",image:"blue-band.jpg",price:79,category:"Fitness",quantity:2,inventoryStatus:"LOWSTOCK",rating:3},{id:"1003",code:"244wgerg2",name:"Blue T-Shirt",description:"Product Description",image:"blue-t-shirt.jpg",price:29,category:"Clothing",quantity:25,inventoryStatus:"INSTOCK",rating:5},{id:"1004",code:"h456wer53",name:"Bracelet",description:"Product Description",image:"bracelet.jpg",price:15,category:"Accessories",quantity:73,inventoryStatus:"INSTOCK",rating:4}]}],this.showCompanyModifier=!1,this.showCompanyModifier2=!1,this.showCompanyModifier3=!1,this.showMultiFormModifier=!1,this.showMultiFormModifier2=!1,this.showMultiFormModifier3=!1,this.form=new l.J3({fields:new l.hs(JSON.stringify(this.fields))}),this.unsubcribe=this.form.valueChanges.subscribe(r=>{console.log(r),this.fields=JSON.parse(r.fields)})}ngOnInit(){}getFields(){return this.fields}getFields2(){return this.fields2}getFields3(){return this.fields3}getMultiFields(){return this.fields4}getMultiFields2(){return this.fields4}getMultiFields3(){return this.fields4}formSubmission(r){console.log("working",r)}onUpload(r){console.log(r)}onClick(r){console.log(r)}clearFields(){}onCityChange(r,s,i){let t=new m;return t.isHeadOffice=!1,t.firstName="Vishnu",t.lastName="K",t.email="vishnuk@sanaditechnologies.com",t.gender="m",console.log(this.vm),t}static#e=this.\u0275fac=function(s){return new(s||a)};static#i=this.\u0275cmp=e.VBU({type:a,selectors:[["app-form-playground"]],standalone:!0,features:[e.aNF],decls:33,vars:22,consts:[[1,"page"],[1,"col-sm-12"],[1,"card"],[1,"card-header"],[1,"card-body"],["pButton","","pRipple","","label","Panel Example","icon","pi pi-plus",1,"p-button-success","p-mr-2",3,"click"],[3,"visibleChange","onHide","visible","fullScreen","baseZIndex"],[2,"font-weight","normal"],[3,"onSubmit","fields"],["position","right",3,"visibleChange","onHide","visible","baseZIndex"],[3,"onSubmit","fields","fullScreen"],[1,"flex-column","flex-grow-1"]],template:function(s,i){1&s&&(e.j41(0,"div",0)(1,"p-card")(2,"div",1)(3,"div",2)(4,"div",3),e.EFF(5,"Multiple Forms"),e.k0s(),e.j41(6,"div",4)(7,"button",5),e.bIt("click",function(){return i.showMultiFormModifier3=!0}),e.k0s()()()()()(),e.j41(8,"p-sidebar",6),e.mxI("visibleChange",function(n){return e.DH7(i.showCompanyModifier,n)||(i.showCompanyModifier=n),n}),e.bIt("onHide",function(){return i.clearFields()}),e.j41(9,"h1",7),e.EFF(10,"Sample Forms"),e.k0s(),e.j41(11,"dynamic-form-builder",8),e.bIt("onSubmit",function(n){return i.formSubmission(n)}),e.k0s()(),e.j41(12,"p-sidebar",6),e.mxI("visibleChange",function(n){return e.DH7(i.showCompanyModifier2,n)||(i.showCompanyModifier2=n),n}),e.bIt("onHide",function(){return i.clearFields()}),e.j41(13,"h1",7),e.EFF(14,"Sample Forms 2"),e.k0s(),e.j41(15,"dynamic-form-builder",8),e.bIt("onSubmit",function(n){return i.formSubmission(n)}),e.k0s()(),e.j41(16,"p-sidebar",9),e.mxI("visibleChange",function(n){return e.DH7(i.showCompanyModifier3,n)||(i.showCompanyModifier3=n),n}),e.bIt("onHide",function(){return i.clearFields()}),e.j41(17,"h1",7),e.EFF(18,"Sample Forms 3"),e.k0s(),e.j41(19,"dynamic-form-builder",10),e.bIt("onSubmit",function(n){return i.formSubmission(n)}),e.k0s()(),e.j41(20,"p-sidebar",6),e.mxI("visibleChange",function(n){return e.DH7(i.showMultiFormModifier,n)||(i.showMultiFormModifier=n),n}),e.bIt("onHide",function(){return i.clearFields()}),e.j41(21,"div",11)(22,"h1",7),e.EFF(23,"Sample Forms 2"),e.k0s()()(),e.j41(24,"p-sidebar",6),e.mxI("visibleChange",function(n){return e.DH7(i.showMultiFormModifier2,n)||(i.showMultiFormModifier2=n),n}),e.bIt("onHide",function(){return i.clearFields()}),e.j41(25,"h1",7),e.EFF(26,"Sample Forms 2"),e.k0s(),e.EFF(27," Comming Soon "),e.k0s(),e.j41(28,"p-sidebar",6),e.mxI("visibleChange",function(n){return e.DH7(i.showMultiFormModifier3,n)||(i.showMultiFormModifier3=n),n}),e.bIt("onHide",function(){return i.clearFields()}),e.j41(29,"h1",7),e.EFF(30,"Sample Forms 2"),e.k0s(),e.EFF(31," Comming Soon "),e.j41(32,"dynamic-form-builder",8),e.bIt("onSubmit",function(n){return i.formSubmission(n)}),e.k0s()()),2&s&&(e.R7$(8),e.R50("visible",i.showCompanyModifier),e.Y8G("fullScreen",!0)("baseZIndex",1e4),e.R7$(3),e.Y8G("fields",i.getFields()),e.R7$(),e.R50("visible",i.showCompanyModifier2),e.Y8G("fullScreen",!0)("baseZIndex",1e4),e.R7$(3),e.Y8G("fields",i.getFields2()),e.R7$(),e.R50("visible",i.showCompanyModifier3),e.Y8G("baseZIndex",1e4),e.R7$(3),e.Y8G("fields",i.getFields3())("fullScreen",!1),e.R7$(),e.R50("visible",i.showMultiFormModifier),e.Y8G("fullScreen",!0)("baseZIndex",1e4),e.R7$(4),e.R50("visible",i.showMultiFormModifier2),e.Y8G("fullScreen",!0)("baseZIndex",1e4),e.R7$(4),e.R50("visible",i.showMultiFormModifier3),e.Y8G("fullScreen",!0)("baseZIndex",1e4),e.R7$(4),e.Y8G("fields",i.getMultiFields3()))},dependencies:[c.MD,l.YN,l.X1,u.iI,_.T,g.$,p.N,y._f,b.B,f.Z,h.n],styles:["button[_ngcontent-%COMP%]{margin:2%}"]})}return a})()}}]);