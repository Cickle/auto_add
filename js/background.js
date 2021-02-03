let username = '';
// chrome.webRequest.onCompleted.addListener((details) => {
//     console.debug(username)
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         console.debug(tabs)
//         console.debug('向content发送消息:'+username)
//         chrome.tabs.sendMessage(tabs[0].id, { username: username }
//             , function (response) {
//                 console.log('来自content的回复：' + response);
//             }
//         );
//     });
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/frameset/setform.jsp*'] })

chrome.webRequest.onBeforeRequest.addListener((details) => {
    username = details.requestBody.formData.username[0];
}, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] }, ["requestBody"])

// chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })

// chrome.webRequest.onSendHeaders.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })

// chrome.webRequest.onHeadersReceived.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })

// chrome.webRequest.onAuthRequired.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })

// chrome.webRequest.onBeforeRedirect.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })

// chrome.webRequest.onResponseStarted.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })

// chrome.webRequest.onErrorOccurred.addListener((details) => {
//     console.debug(details)
// }, { urls: ['http://jcpt.chengdu.gov.cn/cdform/cdmanage/login/login.htm'] })


chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    if (request.method === 'get_article') {
        if (username !== '' && request.date !== '') {
            $.post("http://localhost:8000/get_article", { "username": username, "date": request.date }, (result) => {
                result.status=1;
                callback(result);
            }).fail((error) => {
                error.msg = '查询信息失败:' + username + ';date:' + request.date+';error:'+error.responseText;
                callback(error);
                console.debug(error);

            })
        } else {
            callback({ status: 0, msg: '获取参数失败-username:' + username + ';date:' + request.date });
            console.debug('获取参数失败-username:' + username + ';date:' + request.date)
        }
    }
    return true;
});