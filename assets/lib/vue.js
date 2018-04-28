/*
 * @Author: 大明冯 
 * @Date: 2018-04-28 14:35:38 
 * @Last Modified by: 大明冯
 * @Last Modified time: 2018-04-28 18:33:33
 */

function Vue(options){
  this._init(options);
}

Vue.prototype._init = function (options){
  this.$options = options;
  this.$el = document.querySelector(options.el);
  this.$data = options.data;
  this.$methods = options.methods;

  this._obverse(this.$data)
}

Vue.prototype._obverse = function (obj) {
  var value;
  for (key in obj) {
    if(obj.hasOwnProperty(key)) {
      value = obj[key];
      if (typeof value === 'object') {
        this._obverse(value);
      }

      Object.defineProperty(this.$data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
          console.log(`获取${value}`)
          return value;
        },
        set: function (newVal) {
          console.log(`更新${newVal}`)
          if (value !== newVal) {
            value = newVal;
          }
        }
      })
    }
  }
}

Vue.prototype._complie = function (root) {
  var _this = this;
  var nodes = root.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children.length) {
      this._complie(node);
    }

    if (node.hasAttribute('v-click')) {
      
    }
  }
}

function Watcher(name, el, vm, exp, attr) {
  this.name = name;
  this.el = el;
  this.vm = vm;
  this.exp = exp;
  this.attr = attr;

  this.update();
}
   
Watcher.prototype.update = function () {
  this.el[this.attr] = this.vm.$data[this.exp];
}
