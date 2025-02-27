/*
require.js for rhino JS Engine
© 2020 Dark Tornado, All rights reserved.
Import JS module from "/sdcard/Module/" directory via require(moduleName); or require(fileName);


MIT License

Copyright (c) 2020 Dark Tornado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function require(moduleName) {
    let module = {};
    module.exports = {};
    let exports = module.exports;

    let sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
    let path = sdcard + "/Modules/" + moduleName;
    let isRelative = moduleName.startsWith('.');
    if (isRelative) {
        path = new java.io.File(moduleName + '.js').getAbsolutePath()
    }
    let file = new java.io.File(path);
    if (!file.exists() && !isRelative) {
        path = sdcard + "/Modules/" + moduleName + ".js";
        file = new java.io.File(path);
    }
    if (file.isDirectory()) {
        file = new java.io.File(path + '/index.js')
    }
    if (!file.exists()) throw new Error("Cannot find module '" + moduleName + "'");
    let fis = new java.io.FileInputStream(file);
    let isr = new java.io.InputStreamReader(fis);
    let br = new java.io.BufferedReader(isr);
    let str = br.readLine();
    let line = "";
    while ((line = br.readLine()) != null) {
        str += "\n" + line;
    }
    fis.close();
    isr.close();
    br.close();
    eval(str + "");

    return module.exports;
}

