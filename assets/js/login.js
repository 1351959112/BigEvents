$(function () {
    // 点击 去注册账号 的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 去登录 的链接
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    let form = layui.form
    let layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则\
    form.verify({
        // 自定义一个叫做pwd 校验规格
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function (value) {
            // 选择类名为 reg-box元素 包裹的 name属性为password
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起Ajax 的POST请求
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message)
            $('#link-login').click()
        })
    })
    // 发起登录请求
    $('#form-login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将登录成功得到的 token 字符串 保存到localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '../../index.html'
            }
        })
    })
})