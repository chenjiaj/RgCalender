
本插件件可以用来简单的展示一个活动时间段，将这个活动时间段的日记全部列出；也可以在日历上标记一些特殊日期，例如：用于展示一个活动的签到
[参考示例](http://chenjiaj.github.io/RgCalender/)

## 使用方法

1.在[github](https://github.com/chenjiaj/RgCalender)下载代码

2.在使用的页面引入zepto.min.js或jquery、rgcalendar.js、rgcalendar.css

3.可以再rgcalendar.css中修改插件样式

4.实例化插件对象，如下：

    var calendar = new RgCalendar({
            startTime:null,
            endTime:null,
            showSTAll:false,
            isfocus:true,
            focusTime:endTime,
            eventsDate:[time1,time2,time3],
            parentNode:$('.rg-calendar-wrapper1'),
            startMonthDay:1,
            eventClass:'event',
            isExtended:false
        });

可以传入一下参数，改变默认日历样子：

1.`startTime`：默认为null;
活动开始时间，当isExtended为true时，必须同时传入endTime才生效，传入后按活动时间段展示，当isExtended为false时，只显示一个月，通过切换按钮切换显示月份，传入startTime后，点击上一个月，当上一个月小于startTime后将按钮置为disabled，可以设置.ym .disabled的样式,可以通过.calendar .startDay给活动开始的日期设置样式,开始日期当月在开始日期前的日期可以通过.calendar .beforStartDay 设置样式

接收格式：可以为2016-02-1、毫秒数等其它可以传入new Date()的参数

2.`endTime`：默认为null;
活动结束时间，当isExtended为true时，必须同时传入endTime才生效，传入后按活动时间段展示，当isExtended为false时，只显示一个月，通过切换按钮切换显示月份，传入endTime后，点击下一个月，当下一个月大于于endTime后将按钮置为disabled，可以设置.ym .disabled的样式，可以通过.calendar .endDay给活动结束的日期设置样式，结束日期当月在结束日期后的日期可以通过.calendar .afterEndDay 设置样式

接收格式：可以为2016-02-1、毫秒数等其它可以传入new Date()的参数

3.`showSTAll`：默认为false;
当传入startTime、endTime参数设置为才生效(按活动时间段展示,只从开始日期显示到结束日期),设置为false，开始、结束时间当月其他日期不显示，设置为ture则显示开始、结束时间当月的其他日期

4.`isfocus`:默认为true;当值为true时，标记初始化聚焦日期，设置初始化聚焦日期的class为current-day,设置为false，则不标记聚焦日期，传入focusTime也不生效

5.`focusTime`:默认值null,当isfocus值为true时才生效，不传此值，默认为当天

接收格式：可以为2016-02-1、毫秒数等其它可以传入new Date()的参数

6.`eventsDate`:默认为[]，此参数表示要标记的日期,将会个标记的日期加上class,默认为event,可以通过参数eventClass改变

接收格式：接收一个数组，数组的每一个值可以为2016-02-1、毫秒数等其它可以传入new Date()的参数

7.`parentNode`:默认为$('body'),此参数为日历的父容器

8.`startMonthDay`:默认为1,表示日历从星期一开始从左往右展示

接收格式：可以为1,2,3,4,5,6,7

9.`eventClass`:默认为event，此参数表示标记的日记的class的名字

10.`isExtended`:默认为false，此参数表示是按照时间段显示还是按照传统日历插件的样式显示（只显示一个月，通过切换按钮切换显示月份）,当值为true时，必须同时传入startTime和endTime才生效

接收格式：true 或 false

#### 说明

此插件基于插件 [jquery.simple-event-calendar](https://github.com/philipehsing/jQuery.Simple-Event-Calendar)修改，jquery.simple-event-calendar插件可以显示标记的日历事件
