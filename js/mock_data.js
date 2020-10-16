/**
 * mock劫持接口请求
 */

Mock.mock('/login', 'post', function (option) {
    // 这里的option是请求的相关参数
    console.log(option)
    let userID, userPwd, resMag
    userID = option.body.split("&")[0].split("=")[1]
    userPwd = option.body.split("&")[1].split("=")[1]
    console.log(userPwd)

    if (userID === "123" && userPwd === "123456") {
        resMag = "ok"
    } else {
        resMag = "fali"
    }

    return Mock.mock({
        status: 200,
        message: resMag,
        data: userID
    })
})

Mock.mock('/test/getQuestions', 'get', {
    status: 200,
    message: '获取试题列表成功',
    q_title: '@cword(10,20)',
    'data|5-10': [{ // 5-10随机生成5~10个数据
        'id|+1': 0,
        question: '@cword(20,60)', // 生成中文汉字，word生成英文汉字
        "options|4-6": [{
            "optionsID|+1": 0,
            content: '@cword(10,30)'
        }],
        "isRadio|1": [true, false]
    }]
})


Mock.mock('/test/postAns', 'post', function (option) {
    // 这里的option是请求的相关参数
    let ansList = JSON.parse(option.body)
    ansList.forEach(element => {
        console.log(element)
    });

    return Mock.mock({
        status: 200,
        "message|1": ['回答正确！！！', '回答错误！！！'],
        "score|1-100": 100
    })
})


Mock.mock('/test/add', 'post', function (option) {
    // 这里的option是请求的相关参数
    console.log(option)
    return Mock.mock({
        status: 200,
        message: "resMag"
    })
})


// 通过Mock.mock函数模拟get请求
Mock.mock('/api/goodslist', 'get', {
    status: 200,
    message: '获取商品列表成功',
    'data|5-10': [{ // 5-10随机生成5~10个数据
        'id|+1': 0,
        name: '@cword(2,3)', // 生成中文汉字，word生成英文汉字
        price: 10,
        count: 200,
        img: 'https://raw.githubusercontent.com/moon-ice/Typora-source/master/typora202005/15/163649-643563.png'
    }]
})

// 通过Mock.mock函数模拟url带参数的请求
// 方法一：new RegExp('/api/getgoods/.*')作为mock的第一个参
// 方法二：写url正则的时候不需要括号，/\/api\/getgoods/作为mock的第一个参数
Mock.mock(/\/api\/getgoods/, 'get', function (option) {
    console.log(option)

    const res = /\/api\/getgoods\/(\d+)/.exec(option.url)
    //res[0]为/\/api\/getgoods\/(\d+)/，整条url
    return Mock.mock({
        status: 200,
        message: '获取商品列表成功',
        data: {
            id: res[1],
            name: '@food()',
            price: 0.1,
            count: 100,
            img: '@dataImage(78x78)'
        }
    })
})


Mock.mock('/demo1', 'post', function (option) {
    // 这里的option是请求的相关参数
    console.log(option)

    return Mock.mock({
        status: 200,
        message: '@cword(2)',
        data: option.body
    })
})