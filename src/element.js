/**
 * Created by yih8306 on 2016/3/30.
 */
(function () {
    function Element (tagName, props, children) {
        this.tagName = tagName
        this.props = props
        this.children = children
    }

    Element.prototype.render = function (that) {
        var el = document.createElement(this.tagName) // 根据tagName构建
        var props = this.props

        for (var propName in props) { // 设置节点的DOM属性
            var propValue = props[propName]
            switch (propName) {
                case 'onclick':
                    el.onclick = props[propName].bind(that);
                    break;
                default:
                    el.setAttribute(propName, propValue);
                    break;
            }
        }

        var children = this.children || []

        children.forEach(function (child) {
            var childEl = (child instanceof Element)
                ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
                : document.createTextNode(child) // 如果字符串，只构建文本节点
            el.appendChild(childEl)
        })

        return el
    };

    R = {
        setState : function (json) {
            for(v in json) {
                this.state[v] = json[v]
            }
            this.oldvd = this.vd;
            this.vd = new Element(tagName, props, children);

            this.checkvd(this.vd, this.oldvd);

        },
        createClass : function (item) {
            for(v in item) {
                switch (v) {
                    case 'render' :
                        return item['render'].call(this).render(this);
                        break;
                    case 'getInitialState' :
                        item[v].call(this);
                        break;
                    default :
                        this[v] = item[v];
                        //item[v].bind(this);
                        break;
                }
            }
        },
        createElement : function (tagName, props, children) {
            this.vd = new Element(tagName, props, children);
            return this.vd;
        },
        render : function (str,parent) {
            parent.appendChild(str);
        },
        checkvd : function (old,now) {

        }
    };
    return  R;
})();


/*
var a =

console.log(JSON.parse(a))*/
