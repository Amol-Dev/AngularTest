import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/models/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  iEmployee: IEmployee;
  iEmployeeColl: IEmployee[];
  iEmployeeCollTemp: IEmployee[];
  constructor() {
    this.initModel();
    this.iEmployeeColl = [];
    this.iEmployeeCollTemp = [];
  }

  initModel() {
    this.iEmployee = {
      about: '',
      certificationName: '',
      compnay: '',
      coreExpertise: '',
      designation: '',
      fName: '',
      id: 0,
      isCertification: false,
      lName: '',
      skills: '',
      technology: ''
    };
  }

  ngOnInit() {
    this.loadGrid();
  }
  loadGrid() {
    const fromStorage = JSON.parse(localStorage.getItem('empData'));
    if (fromStorage !== null) {
      this.iEmployeeColl = fromStorage;
    }
  }
  getNewId() {
    return this.iEmployeeColl.length + 1;
  }
  addEmployee() {

    const oldData = this.getOldData();
    this.iEmployee.id = this.getNewId();
    if (oldData === null) {
      const data = [
        this.iEmployee
      ];
      localStorage.setItem('empData', JSON.stringify(data));
    } else {
      this.iEmployeeCollTemp = oldData;
      this.iEmployeeCollTemp.push(this.iEmployee);
      localStorage.setItem('empData', JSON.stringify(this.iEmployeeCollTemp));

      this.iEmployeeCollTemp = [];
    }
    this.initModel();
    this.loadGrid();
  }
  getRecordForEdit(id) {
    this.initModel();
    const oldData = this.getOldData();
    if (oldData !== null) {
      this.iEmployeeCollTemp = oldData;
      this.iEmployee = this.iEmployeeCollTemp.find(m => m.id === id);
    }
  }
  getOldData() {
    return JSON.parse(localStorage.getItem('empData'));
  }
  updateEmployee() {
    const oldData = this.getOldData();
    if (oldData !== null) {
      this.iEmployeeCollTemp = oldData;
      for (let i = 0; i < this.iEmployeeCollTemp.length; i++) {
        if (this.iEmployeeCollTemp[i].id === this.iEmployee.id) {
          this.iEmployeeCollTemp.splice(i, 1);
        }
      }
      this.iEmployeeCollTemp.push(this.iEmployee);
      localStorage.setItem('empData', JSON.stringify(this.iEmployeeCollTemp));
      this.loadGrid();
      this.iEmployeeCollTemp = [];
      this.initModel();
    }
  }
  deleteEmployee(item: IEmployee) {
    const oldData = this.getOldData();
    if (oldData !== null) {
      this.iEmployeeCollTemp = oldData;
      for (let i = 0; i < this.iEmployeeCollTemp.length; i++) {
        if (this.iEmployeeCollTemp[i].id === item.id) {
          this.iEmployeeCollTemp.splice(i, 1);
        }
      }
      localStorage.setItem('empData', JSON.stringify(this.iEmployeeCollTemp));
      this.initModel();
      this.loadGrid();
    }
  }

}
