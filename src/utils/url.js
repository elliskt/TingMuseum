// 获取路由参数的方法，传入参数名
export default {
    install(Vue) {
        Vue.prototype.getUrlKey = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            // 得到一个数组，第一个为请求参数和值：xxx=zz，第三个为参数值zz
            var r = encodeURI(window.location.search).substr(1).match(reg);
            if (r != null) { return unescape(r[2]) } else { return 0; }

        }

    }
}