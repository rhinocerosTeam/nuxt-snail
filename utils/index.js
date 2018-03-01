import _ from 'lodash'

/**
 * Created by VULCAN on 2017/12/11.
 */
export default class Utils {


    static format(dateStr, fmt) {

        var d = new Date(parseInt(dateStr));

        var o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            "S": d.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 时间戳转化为日期格式
     **/
    static formatDate(d) {
        if (typeof d == 'number' || typeof d == 'string') {
            d = new Date(parseInt(d))
        }
        return d.getFullYear() + "-" + this.repairTime(this.getMonth1(d.getMonth()))
            + "-" + this.repairTime(d.getDate()) + " " + this.repairTime(d.getHours())
            + ":" + this.repairTime(d.getMinutes()) + ":" + this.repairTime(d.getSeconds());
    }

    /**
     * 获取当前月份
     **/
    static getMonth1(m) {
        m++;
        if (m < 10)
            return "0" + m.toString();
        return m.toString();
    }

    /**
     * 补齐时间两位数
     **/
    static repairTime(d) {
        return d.toString().length > 1 ? d : '0' + d;
    }

    /**
     * 编辑最后编辑的时间，转化为...时间前
     * @oldTime 时间戳
     **/
    static getPostTime(oldTime) {
        oldTime = parseInt(oldTime)
        let newTime = new Date().getTime() - oldTime;

        let timeArr = [],
            timeStrArr = ['年前', '月前', '天前', '小时前', '分钟前'],
            returnTime = '';


        timeArr.push(Math.floor(newTime / 1000 / 60 / 60 / 24 / 365));
        timeArr.push(Math.floor(newTime / 1000 / 60 / 60 / 24 / 30));
        timeArr.push(Math.floor(newTime / 1000 / 60 / 60 / 24));
        timeArr.push(Math.floor(newTime / 1000 / 60 / 60));
        timeArr.push(Math.floor(newTime / 1000 / 60));
        timeArr.find((item, index) => {
            if (item > 0) return returnTime = item + timeStrArr[index];
        })

        return returnTime;
    }

    /**
     * 富文本和markdown 转化成 纯文本
     * */
    static ToText(content) {

        content = content.replace(/<[^>]+>/g, "");

        content = content.replace(/[\\\`\*\_\[\]\#\+\-\!\>]/g, "");

        return content

    }

    /**
     * 判断用户删除文章权限
     **/
    static removePowers(getUser, item = {}) {
        let powers = false;
        if (getUser) {
            if (getUser.authority > 0) {
                powers = true;
            } else if (item.userid && getUser._id == item.userid._id) {
                powers = true;
            }
        }

        return powers;
    }


    static formateMarkName(marks = [], markId, markKey) {

        if (marks.length == 0) {
            return ''
        }
        var keyName = null
        let mark = marks.find((obj) => {
            return obj._id == markId
        })

        if (mark) {
            if (mark.key == markKey) {
                keyName = mark.name
                return keyName
            } else {
                keyName = this.findMarkKey(mark.child, markKey, keyName)
                return keyName
            }

        }

    }

    static findMarkKey(marks = [], mkey, keyName) {
        if (keyName) {
            return keyName
        }
        for (let obj of marks) {
            if (obj.key == mkey) {
                keyName = obj.name
                return keyName
            } else {
                if (obj.child && obj.child.length > 0) {
                    this.findMarkKey(obj.child, mkey, keyName)
                }
            }
        }
    }


}