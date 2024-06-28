import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { InventoryGrnUtil } from '../utils/InventoryGrnUtil';
import { TranslateService } from '@ngx-translate/core';
import { InventoryGrnEnum } from '../shared/common/enum/inventory-grn.enum';
import { ServiceUrlConstants } from '../shared/utils/service-url-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { InventoryGrnModel } from '../shared/common/model/inventory-grn.model';
import { UntypedFormGroup } from '@angular/forms';

@Injectable()
export class InventoryService extends InventoryGrnUtil {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private params = signal<any>(null);
  private tableField = signal<any>(null);

  constructor(private translateService: TranslateService) {
    super(translateService);
    this.getDropdownData();
  }

  getGrnData(form?: UntypedFormGroup) {
    //remove
    return this.activatedRoute.params
      .pipe(
        switchMap((res: any) => {
          this.params.set(res);
          return this.apiService.get(
            `${ServiceUrlConstants.GOODS_RECEIVED_NOTE}${res?.id}/`
          );
        }),
        switchMap((res: any) => {
          this.getDefaultData(res, form);
          this.tableField.set(this.getTableData(res.grn_items));
          return of(this.getTableFeilds)
        })
      )
  }

  getNewTableData() {
    this.tableField.set(this.getTableData());
    return  this.tableField();
  }

  getTableFeilds() {
    return this.tableField();
  }

  getDropdownData() {
    this.apiService
      .get(ServiceUrlConstants.PURCHASE_ORDER)
      .subscribe((res: any) => {
        if (res?.results) {
          let poDropDownList = res.results.map((po)=> ({key:po.id, value:po.po_no}))
          this.poDropDownData.set(poDropDownList);
        }
      });

    this.apiService
      .get(ServiceUrlConstants.VENDOR_MASTER)
      .subscribe((res: any) => {
        if (res?.results) {
          let vendorDpDownList = res.results.map((vendor)=> ({key:vendor.id, value:vendor.vendor_name}))
          this.vendorDropDownData.set(vendorDpDownList);
        }
      });
  }

  updateGrnForm(grnRequest: InventoryGrnModel) {
    this.apiService
      .put(
        `${ServiceUrlConstants.GOODS_RECEIVED_NOTE}${this.params().id}/`,
        grnRequest
      )
      .subscribe((res) => {
        this.router.navigate([`/grn`]);
      });
  }

  saveGrn(grnRequest: InventoryGrnModel) {
    this.apiService
      .post(
        `${ServiceUrlConstants.GOODS_RECEIVED_NOTE}`,
        grnRequest
      )
      .subscribe((res) => {
        this.router.navigate([`/grn`]);
      });
  }

  cancel() {
    this.router.navigate([`/grn`]);
  }
}
