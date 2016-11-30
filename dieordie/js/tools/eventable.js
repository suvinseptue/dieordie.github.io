/**
 * Created by suvin on 2016/11/10.
 * so far, the event driven module Emit is what I can only find on the Internet.There is no doubt Emit is very useful,but the resource
 * of Emit's Example are all dependent of 'require'.So... I implement one simply event driven util.
 */
var Eventable = function () {
    this.events = {};

    this.on = function (evtName, callback) {
        this.events[evtName] = this.events[evtName] || [];
        this.events[evtName].push(callback);
    };
    this.emit = function (evtName, arg) {
        var calls = this.events[evtName] || [];
        calls.forEach(function (e) {
            e(arg);
        });
    }
};


