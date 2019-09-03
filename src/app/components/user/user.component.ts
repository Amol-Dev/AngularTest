import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  noteStr: string;
  userList: IUser[];
  userListTemp: IUser[];
  editText: string;
  IUser: IUser;

  constructor() {
    this.initUserModel();
    this.userList = [];
    this.userListTemp = [];
  }
  initUserModel() {
    this.IUser = {
      userEmail: '',
      userId: 0,
      userName: '',
      userPassword: ''
    };
  }

  ngOnInit() {
   // localStorage.clear();
    const userList = JSON.parse(localStorage.getItem('userList'));
    if (userList) {
      this.userList = userList;
    } else {
      this.userList = [];
    }
  }
  getTotalRecordCount() {
    const userList = JSON.parse(localStorage.getItem('userList'));
    if (userList !== undefined && userList !== null) {
      return userList.length;
    } else {
      return 0;
    }
  }

  createNote() {
    // fuction to get already present record count and incremnet it by 1 so that user id will be as a primary key
    const nextUserId = this.getTotalRecordCount() + 1;
    // increment length by 1
    this.IUser.userId = nextUserId;
    // add inseted user to array list
    this.userList.unshift(this.IUser);
    // get data from local storage
    const oldData = JSON.parse(localStorage.getItem('userList'));
    // for fist time when there is no data is will return null
    if (oldData === null) {
      // if null we are inserting data into local in form of array thats why below line
      const todos = [
        this.IUser
      ];
      // then pushed above array to local
      localStorage.setItem('userList', JSON.stringify(todos));
    } else {
      // if data is already present pusing new data to that data
      oldData.push(this.IUser);
      // push new data list to local
      localStorage.setItem('userList', JSON.stringify(oldData));
    }
    // intialize model
    this.initUserModel();
  }

  deleteNote(user) {
    // getting existing data
    const todos = JSON.parse(localStorage.getItem('userList'));
    // for lopp on data and removing record which matches with user id
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].userId === user.userId) {
        todos.splice(i, 1);
      }
    }
    // Set New data to local
    localStorage.setItem('userList', JSON.stringify(todos));
    // getting latest data from local
    this.userList = JSON.parse(localStorage.getItem('userList'));
  }

  enterEditMode(user) {
    this.IUser = user;
  }

  updateNote(user) {
    this.userListTemp = JSON.parse(localStorage.getItem('userList'));
    this.userListTemp.forEach(element => {
       // finding current record from list
      if (element.userId === this.IUser.userId) {
        // replacing existing with new one
        element = this.IUser;
      }
    });
    // let currentData = this.userListTemp.find(m => m.userId === this.IUser.userId);
    // currentData = this.IUser;
    localStorage.setItem('userList', JSON.stringify(this.userListTemp));
  }



}
