function RgCalendar(options){
    this._options = $.extend(true,{
        startTime:null,
        endTime:null,
        parentNode:$('body'),
        eventsDate:[],
        showSTAll:false,
        isfocus:true,
        startMonthDay:1,
        eventClass:'event',
        isExtended:false,
        focusTime:null//初始时间,不传默认为当前日期
    },options);
    this._init();
}

RgCalendar.prototype = {
    _init:function(){//初始化
        var mon = '一';
        var tue = '二';
        var wed = '三';
        var thur = '四';
        var fri = '五';
        var sat = '六';
        var sund = '日';
        var options = this._options;
        this.nowTime = options.focusTime ? new Date(options.focusTime) : new Date();
        if (options.startTime && options.endTime ) {
            var start = new Date(options.startTime);
                options.startYear = start.getFullYear();
                options.startMon = start.getMonth() + 1;
                options.startDay = start.getDate();
            var end = new Date(options.endTime);
                options.endYear = end.getFullYear();
                options.endMon = end.getMonth() + 1;
                options.endDay = end.getDate();
        }
        if (options.startTime && options.endTime && options.isExtended) {
            this._options.toggle = false;
            this.startTime = new Date(options.startTime);
            this.endTime = new Date(options.endTime);
            var startMon = this.startTime.getMonth() + 1;
            var startYear = this.startTime.getFullYear();
            var endMon = this.endTime.getMonth() + 1;
            var endYear = this.endTime.getFullYear();
            options.parentNode.empty();
            for(var yearIndex = startYear; yearIndex>=startYear && yearIndex <= endYear;yearIndex++){
                if (yearIndex == startYear) {
                    for(var monIndex = startMon;monIndex <= 12 ;monIndex ++){
                        this.setMonth(monIndex, mon, tue, wed, thur, fri, sat, sund,yearIndex);
                    };
                }else if (yearIndex == endYear){
                    for(var monIndex = 1;monIndex <= endMon ;monIndex ++){
                        this.setMonth(monIndex, mon, tue, wed, thur, fri, sat, sund,yearIndex);
                    };
                }else{
                    for(var monIndex = 1;monIndex <= 12 ;monIndex ++){
                        this.setMonth(monIndex, mon, tue, wed, thur, fri, sat, sund,yearIndex);
                    };
                }
            };
        }else{
            this._options.toggle = true;
            var yearNumber = this.nowTime.getFullYear();
            var monthNumber = this.nowTime.getMonth() + 1;
            options.parentNode.empty();
            this.setMonth(monthNumber, mon, tue, wed, thur, fri, sat, sund,yearNumber);
            this.toggleEvent(monthNumber, mon, tue, wed, thur, fri, sat, sund,yearNumber);
        }
    },
    toggleEvent:function(monthNumber, mon, tue, wed, thur, fri, sat, sund,yearNumber){//绑定切换事件
        var _this = this;
        var options = _this._options;
        options.parentNode.on('click','.btn-next', function(e) {
            var monthNumber =  options.parentNode.find('.month').attr('data-month');
            if (options.endTime && yearNumber >= options.endYear && parseInt(monthNumber) + 1 > options.endMon ) {
                options.parentNode.find('.btn-next').addClass('disabled');
                alert("ss");
                return;
            }
            if (monthNumber > 11) {
                options.parentNode.find('.month').attr('data-month', '0');
                var monthNumber =  options.parentNode.find('.month').attr('data-month');
                yearNumber = yearNumber + 1;
                options.parentNode.empty();
                _this.setMonth(parseInt(monthNumber) + 1, mon, tue, wed, thur, fri, sat, sund,yearNumber);
            } else {
                options.parentNode.empty();
                _this.setMonth(parseInt(monthNumber) + 1, mon, tue, wed, thur, fri, sat, sund,yearNumber);
            };
        });

        options.parentNode.on('click','.btn-prev', function(e) {
            var monthNumber = options.parentNode.find('.month').attr('data-month');
            if (options.startTime && yearNumber <= options.startYear && parseInt(monthNumber) - 1 < options.startMon ) {
                options.parentNode.find('.btn-prev').addClass('disabled');
                return;
            }
            if (monthNumber < 2) {
                options.parentNode.find('.month').attr('data-month', '13');
                var monthNumber = options.parentNode.find('.month').attr('data-month');
                yearNumber = yearNumber - 1;
                options.parentNode.empty();
                _this.setMonth(parseInt(monthNumber) - 1, mon, tue, wed, thur, fri, sat, sund,yearNumber);
            } else {
                options.parentNode.empty();
                _this.setMonth(parseInt(monthNumber) - 1, mon, tue, wed, thur, fri, sat, sund,yearNumber);
            };
        });
    },
    GetMonthName:function(monthNumber){//获取月份的名字
        var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            return months[monthNumber - 1];
    },
    setMonth:function(monthNumber, mon, tue, wed, thur, fri, sat, sund, yearNumber){//设置月份 年份显示
        var wrapper = $('<div class="one-canlendar"  data-month="'+ monthNumber +'" date-year="' + yearNumber + '"></div>');
        if (this._options.toggle) {
            var header = $('<header class="ym">'+
                '<h2 class="month"></h2>'+
                '<a class="btn-prev fontawesome-angle-left" href="#"></a>'+
                '<a class="btn-next fontawesome-angle-right" href="#"></a>'+
                '</header>');
        }else{
            var header = $('<header class="ym">'+
                '<h2 class="month"></h2>'+
                '</header>');
        };
        wrapper.append(header);
        header.find('.month').text(this.GetMonthName(monthNumber) + ' ' + yearNumber);
        header.find('.month').attr('data-month', monthNumber);
        this.printDateNumber(monthNumber, mon, tue, wed, thur, fri, sat, sund, yearNumber,wrapper);
    },
    printDateNumber:function(monthNumber, mon, tue, wed, thur, fri, sat, sund, yearNumber,wrapper){//输出日期内容
        var _this = this;
        var options = _this._options;
        var table = $('<table class="cal-table"></table>');
        var tbody = $('<tbody class="event-calendar" data-month="'+ monthNumber +'" date-year="' + yearNumber + '"></tbody>');
        var td = '';

        _this.setDaysInOrder(mon, tue, wed, thur, fri, sat, sund, yearNumber, table);//设置星期

        var daysArr = _this.getDaysInMonth(monthNumber - 1, yearNumber);
        $(daysArr).each(function(index) {
            var monthDay = daysArr[index].getDay();
            var day = daysArr[index].getDate();
                monthDay = monthDay == 0 ? 7 : monthDay ;
            var starMD = options.startMonthDay;
            if (monthDay != starMD && index == 0) {
                var tr = $('<tr calss="tr tr-index1"></tr>');
                var gap = monthDay - starMD;
                var tdIndex = gap > 0 ? gap : (7 + gap);
                for(var i = 0;i < tdIndex ; i++){
                    td += '<td></td>';
                }
                tr.append(td);
                tbody.append(tr);
            }

            if (monthDay == starMD) {
                var trIndex = tbody.find('tr').length + 1;
                var tr = $('<tr calss="event-calendar tr-index' + trIndex + '"></tr>');
                    tbody.append(tr);
            }

            var insertTrIndex = tbody.find('tr').length - 1;
            var insertTr = tbody.find('tr').eq(insertTrIndex);
            insertTr.append('<td date-month="' + monthNumber + '" date-day="' + day + '" date-year="' + yearNumber + '">' + day + '</td>');
        });

            table.append(tbody);
            wrapper.append(table);
            options.parentNode.append(wrapper);
            if (options.isfocus) {
                var month = this.nowTime.getMonth() + 1;
                var thisyear = this.nowTime.getFullYear();
                _this.setCurrentDay(month, thisyear, yearNumber);
            };
            if (this._options.toggle) {
                if (options.endTime && yearNumber >= options.endYear && monthNumber >= options.endMon ) {
                    options.parentNode.find('.btn-next').addClass('disabled');
                    if (yearNumber == options.endYear && monthNumber == options.endMon) {
                        options.parentNode.find('tbody.event-calendar[data-month="'+ options.endMon +'"][date-year="' + options.endYear + '"] tr td[date-month="' + options.endMon + '"][date-day="' + options.endDay + '"]').addClass('endDay');
                    }
                }else{
                    options.parentNode.find('.btn-next').removeClass('disabled');
                }

                if (options.startTime && yearNumber <= options.startYear && monthNumber <= options.startMon ) {
                    if (yearNumber == options.startYear && monthNumber == options.startMon) {
                        options.parentNode.find('tbody.event-calendar[data-month="'+ options.startMon +'"][date-year="' + options.startYear + '"] tr td[date-month="' + options.startMon + '"][date-day="' + options.startDay + '"]').addClass('startDay');
                    }
                    options.parentNode.find('.btn-prev').addClass('disabled');
                }else{
                    options.parentNode.find('.btn-prev').removeClass('disabled');
                }
            }
            

            _this.setEvent();
    },
    getDaysInMonth:function(month, year){//获取某年某月的所以天数的对象
        // Since no month has fewer than 28 days
        var day = 1;
        if (!this._options.showSTAll) {
            if (this.startTime && this.endTime) {
                var startDay = this.startTime.getDate();
                var startMon = this.startTime.getMonth();
                var startYear = this.startTime.getFullYear();
                var endDay = this.endTime.getDate();
                var endMon = this.endTime.getMonth();
                var endYear = this.endTime.getFullYear();
                if (year == startYear && month == startMon) {
                    day = startDay;
                }else if (year == endYear && month == endMon) {
                    var date = new Date(year, month, day);
                    var days = [];
                    while (date.getMonth() === month && date.getDate() <= endDay) {
                        days.push(new Date(date));
                        date.setDate(date.getDate() + 1);
                    }
                    return days;
                };
            }
        };
        var date = new Date(year, month, day);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    },
    setDaysInOrder:function(mon, tue, wed, thur, fri, sat, sund,yearNumber, node){//设置星期
        var options = this._options;
        var tr = $('<thead class="event-days" data-month="'+ mon +'" date-year="' + yearNumber + '"><tr></tr></thead>');
            var monthDay = options.startMonthDay;
            if (monthDay == 2) {
                tr.append('<td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td>');
            } else if (monthDay == 3) {
                tr.append('<td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td>');
            } else if (monthDay == 4) {
                tr.append('<td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td>');
            } else if (monthDay == 5) {
                tr.append('<td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td>');
            } else if (monthDay == 6) {
                tr.append('<td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td>');
            } else if (monthDay == 7) {
                tr.append('<td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td>');
            }else{
                tr.append('<td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td>');
            }
            node.append(tr);
    },
    setCurrentDay:function(month, year, yearNumber){//设置当天日期
        var options = this._options;
        options.parentNode.find('tbody.event-calendar[data-month="'+ month +'"][date-year="' + year + '"] td[date-day="' + this.nowTime.getDate() + '"]').addClass('current-day');
    },
    setEvent:function(){//设置标识
        var options = this._options;
        var eventsDate = this._options.eventsDate;
        if (eventsDate.length >= 1) {
            $(eventsDate).each(function(i) {
                try{
                    var date = new Date(eventsDate[i]);
                    var eventMonth = date.getMonth() + 1;
                    var eventDay = date.getDate();
                    var eventYear = date.getFullYear();
                    var eventClass = options.eventClass;
                     options.parentNode.find('tbody.event-calendar[data-month="'+ eventMonth +'"][date-year="' + eventYear + '"] tr td[date-month="' + eventMonth + '"][date-day="' + eventDay + '"]').addClass(eventClass);
                }catch(e){
                    console.log(e);
                }
            });
        };
    }
}


