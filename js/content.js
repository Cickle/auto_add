// let username = '';
const classID = $("[name='ClassID']");

function injectCustomJs(jsPath) {
	// debugger;
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function () {
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(temp);
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	console.debug('收到来自background的消息：')
// 	console.debug(request)
// 	// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
// 	if (request.username !== '') {
// 		username = request.username
// 	}
// 	sendResponse('收到消息：' + request.username);
// });
$(() => {
	injectCustomJs();
	if (classID.length > 0 && (classID[0].getAttribute('value') === '3001050207' || classID[0].getAttribute('value') == "3002090507")) {
		$("#_edit").parent().append(`<div>
		<table id="auto_add_btn" 
		border="0" 
		width="50" 
		cellpadding="0" 
		cellspacing="0" 
		class="x-btn-wrap x-btn" 
		onmousemove="this.className='x-btn-wrap x-btn x-btn-over';"
		onmouseout="this.className='x-btn-wrap';" 
		onmousedown="this.className='x-btn-wrap x-btn x-btn-over x-btn-click';" 
		onmouseup="this.className='x-btn-wrap x-btn x-btn-over';" 
		style="float:left;margin:1px;" onclick="start_submit()">
		<tbody>
		<tr>
		<td class="x-btn-left">
		<i></i>
		</td>
		<td id="auto_add_btn_text" class="x-btn-center" style="color:#000000;padding-top:2px;">自动添加</td>
		<td class="x-btn-right"><i></i></td></tr></tbody></table></div>`)
	}
})
window.addEventListener("message", function (e) {
	if ($("#auto_add_btn_text").text()==='自动添加') {
		$("#auto_add_btn_text").text('停止添加')
		chrome.runtime.sendMessage({
			method: 'get_article',
			date: getLastDay().substr(0,7)
		}, function (response) {
			if (response.status === 1) {
				console.debug(response)
			}else{
				alert(response.msg)
				$("#auto_add_btn_text").text('自动添加')
			}
			// $.post("/uycyw/SupplyAndDemand/save.jsp", {
			// 	"ClassID": classID[0].getAttribute('value'),
			// 	"id": "",
			// 	"sw": "",
			// 	"p": "",
			// 	"UnitNo": "",
			// 	"TITLE": response.title,
			// 	"TEL": "",
			// 	"EMAIL": "",
			// 	"ADDRESS": "",
			// 	"ID": "",
			// 	"ENDTIME": getLastDay(),
			// 	"IMAGEPATH": "",
			// 	"USERTYPE": "1",
			// 	"Content": response.Content,
			// }, (result) => {
			// 	console.debug(result)
			// })
		});
	}else{
		$("#auto_add_btn_text").text('自动添加')
	}
}, false);

function getLastDay() {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();//<10?'0'+(now.getMonth() + 1):now.getMonth() + 1;
	const day = new Date(year, month + 1, 0).getDate();
	return `${year}-${(month + 1) < 10 ? '0' + (month + 1) : month + 1}-${day}`
}