import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

////////////


export class Customer {

  name?: string;

  /*private id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  // Constructor Shorthand
  constructor(private id: number) {}

  foo(arg: string): number {


    setTimeout(() => {
      console.log('ID', this.id)
    }, 2000)

    return 6;
  }
}


const myCustomer = new Customer(5);





const foo = function (arg: number) {
  return arg + 1;
}

const foox = (arg: number) => arg + 1;



const myCb = () => {
  console.log('sdfgdfg')
}

setTimeout(myCb, 2000);

[1,2,3,4,5].map(arg => arg + 1);
[1,2,3,4,5].map(foox);

const result = foo(5)
