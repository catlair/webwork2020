(async ()=>{
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');
    const loginWrap =  document.querySelector('.index-login-wrap');
    const commentBtn = document.querySelector('.fank_left');

    if (!loginWrap){
        return;
    }


    const loginWrapCen = `<a href="./login.html">登录</a>
                           <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                           <a href="./reg.html">注册</a>`

    if (token){
        loginWrap.innerHTML = `<a>${username}</a>
                                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <a href="javascript:void 0;" class="logout-btn">退出登录</a>`
    }else {

    }

    function commentBtnHandle(){
        if (commentBtn){
           const btn =  commentBtn.querySelector('button')
            btn.disabled = true;
           btn.innerText = '登录才能评论哦'
        }
    }

    const logout = document.querySelector('.logout-btn');
    if (logout){
        logout.addEventListener('click',()=>{
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('user_id');
            loginWrap.innerHTML = loginWrapCen;
            commentBtnHandle();
        })
    }
})()
