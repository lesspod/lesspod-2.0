//this file is supposed to remove error document.exec command is not defined


// Object.defineProperty(document, 'currentScript', {
//     value: document.createElement('script'),
//   });

import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window