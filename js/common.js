var _baseUrl = "http://www.360lzy.com/markethelper/lanyu_sport";
//var _baseUrl = "http://localhost:8080";

var _user_token = "user_token";
var _user_nickname = "user_nickname";

var _topic_id = "topic_id";

function formatDateTime(datetime) {
	var current_date = new Date().getTime();
	var _date = datetime.split(" ")[0];
	var _time = datetime.split(" ")[1];
	var date = new Date();
	date.setFullYear(_date.split("-")[0]);
	date.setMonth(_date.split("-")[1] - 1);
	date.setDate(_date.split("-")[2]);
	date.setHours(_time.split(":")[0]);
	date.setMinutes(_time.split(":")[1]);
	date.setSeconds(_time.split(":")[2]);
	var mul = current_date - date.getTime();
	var time = parseInt(mul / 1000);
	if (time < 60) {
		return "刚刚"
	} else if (time < 3600) {
		return parseInt(time / 60) + " 分钟前"
	} else if (time < 86400) {
		return parseInt(time / 3600) + " 小时前"
	} else if (time < 604800) {
		return parseInt(time / 86400) + " 天前"
	} else if (time < 2592000) {
		return parseInt(time / 604800) + " 周前"
	} else if (time < 31536000) {
		return parseInt(time / 2592000) + " 个月前"
	} else {
		return parseInt(time / 31536000) + " 年前"
	}
	return datetime
}

function topic_detail(tid) {
	plus.storage.setItem(_topic_id, tid);
	mui.openWindow({
		id: 'detail',
		url: 'topic-detail.html'
	});
}

function getTopicTab(_data) {
	var span_content;
	if ((_data.good == 1 && _data.top == 1) || (_data.good == 0 && _data.top == 1)) {
		span_content = "置顶";
	} else if (_data.top == 0 && _data.good == 1) {
		span_content = "精华";
	} else if (_data.top == 0 && _data.good == 0) {
		if (_data.tab == "gs") {
			span_content = "灌水";
		} else if (_data.tab == "news") {
			span_content = "资讯";
		} else if (_data.tab == "ask") {
			span_content = "问答";
		} else if (_data.tab == "blog") {
			span_content = "博客";
		}
	}
	return span_content;
}

function trim(str) {　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}

function isLogin() {
	var userToken = plus.storage.getItem(_user_token);
	if (userToken && userToken != "") {
		return true;
	} else {
		return false;
	}
}
