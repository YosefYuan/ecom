export default{
    formRule:{
        username: {
            rule:/@/g,
            txt: '不包含@'
        },
        password: {
            rule:/^\w{1,6}$/g,
            txt: '密码不是1-6位'
        },
        globalError: '部分选项未通过'
    }
}