import { Component, inject, signal } from '@angular/core';
import { LocationEnum } from 'src/app/core/shared/common/enum/location.enum';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { ServiceUrlConstants } from 'src/app/core/shared/utils/service-url-constants';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-location',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationConfig = signal({
    formName: 'location',
    pageTitle: 'Location',
    tableHeaders: [
      {
        label: 'location_name_TC',
        field: LocationEnum.location_name,
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'site_TC',
        field: LocationEnum.site,
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'floor_TC',
        isFilterRequired: true,
      },
      {
        label: 'room_name_TC',
        isFilterRequired: true,
      },
      {
        label: 'room_number_TC',
        isFilterRequired: true,
      },
      {
        label: 'location_incharge_TC',
        isFilterRequired: true,
      }
    ],
    tableBody: [LocationEnum.location_name, LocationEnum.site, LocationEnum.floor, LocationEnum.room_name, LocationEnum.room_number, LocationEnum.location_incharge],
    editable: true,
    url: {
      post: ServiceUrlConstants.ASSET_LOCATION_CRUD,
      get: ServiceUrlConstants.ASSET_LOCATION_CRUD,
      delete: ServiceUrlConstants.ASSET_LOCATION_CRUD,
      UPDATE: '',
    },
    actions: [
      {
        label: '',
        icon: 'pencil',
        actionType: 'EDIT',
      },
      {
        label: '',
        icon: 'trash',
        actionType: 'DELETE',
      },
    ],
    dialogData: {},
    dialogConfig: {
      height: '75%',
      width: '50%'
    },
    isShowDialog: true,
  });

  
  locationForm = signal(null);

  private readonly locationFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.locationForm.set(this.locationFormConfig.getForm()['location'])
  }
}
