"use strict";(self.webpackChunkwm_ui_web_app=self.webpackChunkwm_ui_web_app||[]).push([["src_app_components_store-list_store-list_component_ts"],{9899:(S,c,o)=>{o.r(c),o.d(c,{StoreListComponent:()=>R});var _=o(177),t=o(4438),m=o(9417),p=o(6294),d=o(4842),r=o(6701),g=o(6344),u=o(9847),f=o(3993),E=o(3920),v=o(1727),O=o(5779),D=o(1141);const M=e=>({"border-top-1 border":e});function C(e,i){1&e&&(t.j41(0,"div",5),t.nrm(1,"p-dataViewLayoutOptions",6),t.k0s())}function L(e,i){if(1&e){const n=t.RV6();t.j41(0,"div",10)(1,"div",11)(2,"div",12)(3,"div",13)(4,"div",14),t.EFF(5),t.k0s()(),t.j41(6,"div",15)(7,"button",16),t.bIt("click",function(){const l=t.eBV(n).$implicit,a=t.XpG(2);return t.Njj(a.onStoreSelect(l))}),t.k0s()()()()()}if(2&e){const n=i.$implicit,s=i.first;t.R7$(),t.Y8G("ngClass",t.eq3(3,M,!s)),t.R7$(4),t.JRh(n.store_name),t.R7$(2),t.Y8G("label","Select")}}function P(e,i){if(1&e&&(t.j41(0,"sanadi-scroll",7)(1,"div",8),t.DNE(2,L,8,5,"div",9),t.k0s()()),2&e){const n=i.$implicit;t.Y8G("scrollVariant","2"),t.R7$(2),t.Y8G("ngForOf",n)}}function x(e,i){if(1&e){const n=t.RV6();t.j41(0,"div",18)(1,"div",19)(2,"div",20)(3,"div",14),t.EFF(4),t.k0s()(),t.j41(5,"div",21)(6,"button",16),t.bIt("click",function(){const l=t.eBV(n).$implicit,a=t.XpG(2);return t.Njj(a.onStoreSelect(l))}),t.k0s()()()()}if(2&e){const n=i.$implicit;t.R7$(4),t.JRh(n.store_name),t.R7$(2),t.Y8G("label","Select")}}function T(e,i){if(1&e&&(t.j41(0,"sanadi-scroll",7)(1,"div",8),t.DNE(2,x,7,2,"div",17),t.k0s()()),2&e){const n=i.$implicit;t.Y8G("scrollVariant","2"),t.R7$(2),t.Y8G("ngForOf",n)}}let R=(()=>{class e{constructor(){this.title="",this.storeList=(0,t.vPA)(new Array),this.apiService=(0,t.WQX)(g.G),this.router=(0,t.WQX)(p.Ix)}ngOnInit(){this.apiService.get("/warehouse/stores/").subscribe(n=>{n?.results&&this.storeList.set(n?.results)})}onStoreSelect(n){this.router.navigate(["/home"])}static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["sanadi-store-list"]],inputs:{title:"title"},standalone:!0,features:[t.aNF],decls:5,vars:3,consts:[["dv",""],["layout","grid",3,"value","rows","paginator"],["pTemplate","header"],["pTemplate","list"],["pTemplate","grid"],[1,"flex","justify-content-end"],["layout","grid"],[3,"scrollVariant"],[1,"grid","grid-nogutter"],["class","col-12",4,"ngFor","ngForOf"],[1,"col-12"],[1,"flex","flex-column","xl:flex-row","xl:align-items-start","p-4","gap-4",3,"ngClass"],[1,"flex","flex-column","sm:flex-row","justify-content-between","align-items-center","xl:align-items-start","flex-1","gap-4"],[1,"flex","flex-column","align-items-center","sm:align-items-start","gap-3"],[1,"text-2xl","font-bold"],[1,"flex","sm:flex-column","align-items-center","sm:align-items-end","gap-3","sm:gap-2"],["pButton","",1,"md:align-self-end","mb-2","primary",3,"click","label"],["class","col-12 sm:col-6 lg:col-12 xl:col-4 p-2",4,"ngFor","ngForOf"],[1,"col-12","sm:col-6","lg:col-12","xl:col-4","p-2"],[1,"p-4","border-1","border","card","border-round"],[1,"flex","flex-column","align-items-center","gap-3","py-5"],[1,"flex","align-items-center","justify-content-center"]],template:function(s,l){1&s&&(t.j41(0,"p-dataView",1,0),t.DNE(2,C,2,0,"ng-template",2)(3,P,3,2,"ng-template",3)(4,T,3,2,"ng-template",4),t.k0s()),2&s&&t.Y8G("value",l.storeList())("rows",10)("paginator",!0)},dependencies:[_.MD,_.YU,_.Sq,f.T,r.KQ,r.U$,O.Ei,r.Ks,v.X,u.N,D._f,d.h,E.M,m.YN]})}return e})()}}]);