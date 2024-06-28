import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';
import { DynamicFormGeneratorModule } from 'src/app/sanadi-library/dynamic-form-generator/dynamic-form-generator.module';

class DemoModel {
  country: string = 'in';
  gender: string = 'm';
  isHeadOffice: boolean = true;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
}
@Component({
  selector: 'app-form-playground',
  templateUrl: './form-playground.component.html',
  styleUrls: ['./form-playground.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
  ],
  standalone: true,
})
export class FormPlaygroundComponent implements OnInit {
  public vm: DemoModel = new DemoModel();

  public fields: any[] = [];

  fields2: any[] = [];

  fields3: any[] = [];

  fields4: any = [
    {
      type: 'card',
      headerText: 'Card Header',
      footerText: '',
      fillScreen: '',
      fields: [
        {
          type: 'text',
          name: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          value: '',
          validation: {
            required: true,
            minlength: 5,
            maxlength: 10,
          },
          prefixGroupBy: true,
          prefixGroupByIcon: 'pi-user',
          errorText: {
            required: 'First name is required',
            minlength: 'First name min 5',
            maxlength: 'First name max 10',
          },
        },
        {
          type: 'text',
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Last Name',
          value: '',
          validation: {
            required: true,
          },
          prefixGroupBy: true,
          prefixGroupByText: 'Mr',
          errorText: {
            required: 'Last name is required',
          },
        },
      ],
    },
    // {
    //   type: 'fieldset',
    //   headerText: 'Header Text',
    //   fillScreen: false,
    //   fields: [
    //     {
    //       type: 'dropdown',
    //       name: 'country',
    //       label: 'Country',
    //       placeholder: 'Enter Country',
    //       value: 'in',
    //       validation: {
    //         required: true,
    //       },
    //       options: [
    //         { id: 'in', name: 'India' },
    //         { id: 'us', name: 'USA' },
    //       ],
    //       optionLabel: 'name',
    //       optionValue: 'id',
    //     },
    //     {
    //       type: 'text',
    //       name: 'City',
    //       label: 'City',
    //       placeholder: 'City',
    //       value: '',
    //       validation: {
    //         required: true,
    //       },
    //       prefixGroupBy: true,
    //       prefixGroupByIcon: 'pi-user',
    //       errorText: {
    //         required: 'First name is required',
    //       },
    //     },
    //   ],
    // },
    {
      type: 'table',
      name: 'billingAddress',
      label: 'Billing Address',
      formInitialise: {
        code: '',
        name: '',
        inventoryStatus: '',
        price: '',
      },
      columnSchema: [
        'companyNameLabel_TC',
        'pinCodeLabel_TC',
        'cityLabel_TC',
        'stateNameLabel_TC',
      ],
      formSchema: [
        {
          name: 'code',
          type: 'input',
        },
        {
          name: 'name',
          type: 'input',
        },
        {
          name: 'inventoryStatus',
          type: 'dropdown',
          placeholder: 'Enter status',
          options: [
            { name: 'In Stock', id: 'INSTOCK' },
            { name: 'Low Stock', id: 'LOWSTOCK' },
            { name: 'Out of Stock', id: 'OUTOFSTOCK' },
          ],
          optionLabel: 'name',
          optionValue: 'id',
        },
        {
          name: 'price',
          type: 'input',
        },
      ],
      dataKey: 'id',
      dataSource: [
        {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
        {
          id: '1001',
          code: 'nvklal433',
          name: 'Black Watch',
          description: 'Product Description',
          image: 'black-watch.jpg',
          price: 72,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'INSTOCK',
          rating: 4,
        },
        {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Blue Band',
          description: 'Product Description',
          image: 'blue-band.jpg',
          price: 79,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 3,
        },
        {
          id: '1003',
          code: '244wgerg2',
          name: 'Blue T-Shirt',
          description: 'Product Description',
          image: 'blue-t-shirt.jpg',
          price: 29,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
        {
          id: '1004',
          code: 'h456wer53',
          name: 'Bracelet',
          description: 'Product Description',
          image: 'bracelet.jpg',
          price: 15,
          category: 'Accessories',
          quantity: 73,
          inventoryStatus: 'INSTOCK',
          rating: 4,
        },
        {
          id: '1005',
          code: 'av2231fwg',
          name: 'Brown Purse',
          description: 'Product Description',
          image: 'brown-purse.jpg',
          price: 120,
          category: 'Accessories',
          quantity: 0,
          inventoryStatus: 'OUTOFSTOCK',
          rating: 4,
        },
        {
          id: '1006',
          code: 'bib36pfvm',
          name: 'Chakra Bracelet',
          description: 'Product Description',
          image: 'chakra-bracelet.jpg',
          price: 32,
          category: 'Accessories',
          quantity: 5,
          inventoryStatus: 'LOWSTOCK',
          rating: 3,
        },
        {
          id: '1007',
          code: 'mbvjkgip5',
          name: 'Galaxy Earrings',
          description: 'Product Description',
          image: 'galaxy-earrings.jpg',
          price: 34,
          category: 'Accessories',
          quantity: 23,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
        {
          id: '1008',
          code: 'vbb124btr',
          name: 'Game Controller',
          description: 'Product Description',
          image: 'game-controller.jpg',
          price: 99,
          category: 'Electronics',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 4,
        },
        {
          id: '1009',
          code: 'cm230f032',
          name: 'Gaming Set',
          description: 'Product Description',
          image: 'gaming-set.jpg',
          price: 299,
          category: 'Electronics',
          quantity: 63,
          inventoryStatus: 'INSTOCK',
          rating: 3,
        },
      ],
    },
    {
      type: 'table',
      name: 'sellingAddress',
      label: 'Selling Address',
      formInitialise: {
        code: '',
        name: '',
        inventoryStatus: '',
        price: '',
      },
      columnSchema: [
        'companyNameLabel_TC',
        'pinCodeLabel_TC',
        'cityLabel_TC',
        'stateNameLabel_TC',
      ],
      formSchema: [
        {
          name: 'code',
          type: 'input',
        },
        {
          name: 'name',
          type: 'input',
        },
        {
          name: 'inventoryStatus',
          type: 'dropdown',
          placeholder: 'Enter status',
          options: [
            { name: 'In Stock', id: 'INSTOCK' },
            { name: 'Low Stock', id: 'LOWSTOCK' },
            { name: 'Out of Stock', id: 'OUTOFSTOCK' },
          ],
          optionLabel: 'name',
          optionValue: 'id',
        },
        {
          name: 'price',
          type: 'input',
        },
      ],
      dataKey: 'id',
      dataSource: [
        {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
        {
          id: '1001',
          code: 'nvklal433',
          name: 'Black Watch',
          description: 'Product Description',
          image: 'black-watch.jpg',
          price: 72,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'INSTOCK',
          rating: 4,
        },
        {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Blue Band',
          description: 'Product Description',
          image: 'blue-band.jpg',
          price: 79,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 3,
        },
        {
          id: '1003',
          code: '244wgerg2',
          name: 'Blue T-Shirt',
          description: 'Product Description',
          image: 'blue-t-shirt.jpg',
          price: 29,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
      ],
    },
    {
      type: 'table',
      name: 'shippingAddress',
      label: 'Shipping Address',
      formInitialise: {
        code: '',
        name: '',
        inventoryStatus: '',
        price: '',
      },
      columnSchema: [
        'companyNameLabel_TC',
        'pinCodeLabel_TC',
        'cityLabel_TC',
        'stateNameLabel_TC',
      ],
      formSchema: [
        {
          name: 'code',
          type: 'input',
        },
        {
          name: 'name',
          type: 'input',
        },
        {
          name: 'inventoryStatus',
          type: 'dropdown',
          placeholder: 'Enter status',
          options: [
            { name: 'In Stock', id: 'INSTOCK' },
            { name: 'Low Stock', id: 'LOWSTOCK' },
            { name: 'Out of Stock', id: 'OUTOFSTOCK' },
          ],
          optionLabel: 'name',
          optionValue: 'id',
        },
        {
          name: 'price',
          type: 'input',
        },
      ],
      dataKey: 'id',
      dataSource: [
        {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
        {
          id: '1001',
          code: 'nvklal433',
          name: 'Black Watch',
          description: 'Product Description',
          image: 'black-watch.jpg',
          price: 72,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'INSTOCK',
          rating: 4,
        },
        {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Blue Band',
          description: 'Product Description',
          image: 'blue-band.jpg',
          price: 79,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 3,
        },
        {
          id: '1003',
          code: '244wgerg2',
          name: 'Blue T-Shirt',
          description: 'Product Description',
          image: 'blue-t-shirt.jpg',
          price: 29,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'INSTOCK',
          rating: 5,
        },
        {
          id: '1004',
          code: 'h456wer53',
          name: 'Bracelet',
          description: 'Product Description',
          image: 'bracelet.jpg',
          price: 15,
          category: 'Accessories',
          quantity: 73,
          inventoryStatus: 'INSTOCK',
          rating: 4,
        },
      ],
    },
  ];

  showCompanyModifier: boolean = false;
  showCompanyModifier2: boolean = false;
  showCompanyModifier3: boolean = false;

  showMultiFormModifier: boolean = false;
  showMultiFormModifier2: boolean = false;
  showMultiFormModifier3: boolean = false;

  public form: UntypedFormGroup;
  unsubcribe: any;

  constructor() {
    this.form = new UntypedFormGroup({
      fields: new UntypedFormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  ngOnInit(): void {}

  getFields() {
    return this.fields;
  }

  getFields2() {
    return this.fields2;
  }

  getFields3() {
    return this.fields3;
  }

  getMultiFields() {
    return this.fields4;
  }

  getMultiFields2() {
    return this.fields4;
  }

  getMultiFields3() {
    return this.fields4;
  }

  formSubmission(e: any) {
    console.log('working', e);
  }

  onUpload(e: any) {
    console.log(e);
  }

  onClick(e: any) {
    console.log(e);
  }

  // ngOnDestroy() {
  //   this.unsubcribe.unsubcribe();
  // }
  clearFields() {
    // Call setfield
  }

  // form: UntypedFormGroup | any;

  onCityChange(prevValue: any, value: any, formValue: any) {
    let newData: DemoModel = new DemoModel();

    newData.isHeadOffice = false;
    newData.firstName = 'Vishnu';
    newData.lastName = 'K';
    newData.email = 'vishnuk@sanaditechnologies.com';
    newData.gender = "m"
    console.log(this.vm);
    // formValue.gender = 'f'

    return newData;
  }
}
