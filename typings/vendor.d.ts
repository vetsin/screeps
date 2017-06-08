/* tslint:disable */
// Put shims and extensions to installed modules and typings here

// add objects to `global` here
declare namespace NodeJS {
  interface Global {
    log: any;
    //b3: any;
    Queen: any;
    tree: any;
    blackboard: any;
  }
}

// shim uglify-js for webpack
declare module "uglify-js" {
  export interface MinifyOptions {}
}
