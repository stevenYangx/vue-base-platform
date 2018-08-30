
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    getHistory:function(key){
      let returnPreList = JSON.parse(sessionStorage.getItem(key));
      return returnPreList;
    },
    putHistory:function(key,value){
      let returnPreList = JSON.parse(sessionStorage.getItem(key));
      if (returnPreList) {//有返回数据
        returnPreList.push(value);
        sessionStorage.setItem(key,JSON.stringify(returnPreList));
      }else {
        let chainData = [value];
        sessionStorage.setItem(key,JSON.stringify(chainData));
      }
    },
    resetHistory:function(key,data){
      sessionStorage.removeItem(key);
      if (data && data.length>0) {
        sessionStorage.setItem(key,JSON.stringify(data));
      }
    },
    drawImage:function(iconstants,iwidth, iheight) {
      let minwidth = 0;
      let minheight = 0;
      if (iwidth >= iheight) {//宽大
        if (iheight>=iconstants) {//高大于等于148
          minwidth = iconstants;
          minheight = Math.round((minwidth/iwidth)*iheight);
        }else {//高小于148
          if (iwidth>=iconstants) {//宽大于等于148
            minwidth = iconstants;
            minheight = Math.round((minwidth/iwidth)*iheight);
          }else {
            minwidth = iwidth;
            minheight = iheight;
          }
        }
      }else {//高大
        if (iwidth>=iconstants) {//宽大于最大值
          minheight = iconstants;
          minwidth = Math.round((minheight/iheight)*iwidth);
        }else {//宽小于最大值
          if (iheight>=iconstants) {//高大于等于最大值
            minheight = iconstants;
            minwidth = Math.round((minheight/iheight)*iwidth);
          }else {//宽高都小于最大值
            minwidth = iwidth;
            minheight = iheight;
          }
        }
      }
      let avatarStyle = 'width:'+minwidth+'px;height:'+minheight+'px;';
      return avatarStyle;
      // console.log('minwidth:'+minwidth+' minheight：'+minheight);
      // console.log('style=width:'+minwidth+'px;height:'+minheight+'px;');
    },
    fmoney:function(s, n){
      // n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      let l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
      let t = "";
      for(var i = 0; i < l.length; i ++ ){
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      if (r){
        return t.split("").reverse().join("") + "." + r;
      }else {
        return t.split("").reverse().join("");
      }
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }
    },
    diffDate:{
      getAll:function(stratDate,endDate){    //sDate1和sDate2是2006-12-18格式
        let allDate = [];
        var start = Date.parse(stratDate);
        var end =  Date.parse(endDate);
        for (var k = start; k <= end;) {
          let date = new Date(parseInt(k));
           allDate.push(date);
           k = k + 24 * 60 * 60 * 1000;
        }
        return  allDate;
      }
  },
  getMonthDays:function (year, month) {
      //本月第一天 1-31
      var relativeDate = new Date(year, month, 1);
      //获得当前月份0-11
      var relativeMonth = relativeDate.getMonth();
      //获得当前年份4位年
      var relativeYear = relativeDate.getFullYear();
      //当为12月的时候年份需要加1
      //月份需要更新为0 也就是下一年的第一个月
      if (relativeMonth == 11) {
          relativeYear++;
          relativeMonth = 0;
      } else {
          //否则只是月份增加,以便求的下一月的第一天
          relativeMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //下月的第一天
      var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
      //返回得到上月的最后一天,也就是本月总天数
      return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
  },
  getPriorSeasonFirstDay:function(year, month){
    var quarterMonthStart = 0;
    var spring = 0; //春
    var summer = 3; //夏
    var fall = 6;   //秋
    var winter = 9; //冬
    //月份从0-11
    if (spring<=month && month<summer) {
      //如果是第一季度则应该到去年的冬季
      year--;
      month = winter;
    }else if (summer<=month && month<fall) {
      month = spring;
    }else if (fall<=month && month<winter) {
      month = summer;
    }else {
      month = fall;
    }
    // switch (month) {//季度的其实月份
    //     case spring<=month<summer:
    //         //如果是第一季度则应该到去年的冬季
    //         year--;
    //         month = winter;
    //         break;
    //     case summer<=month<fall:
    //         month = spring;
    //         break;
    //     case fall<=month<winter:
    //         month = summer;
    //         break;
    //     case winter<=month:
    //         month = fall;
    //         break;
    // };
    return new Date(year, month, 1);
  },
  getPreviousSeason:function () {
      //起止日期数组
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //上季度的第一天
      var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear,currentMonth);
      //上季度的最后一天
      var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
      //添加至数组
      startStop.push(priorSeasonFirstDay);
      startStop.push(priorSeasonLastDay);
      return startStop;
  }

};
