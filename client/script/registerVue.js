new Vue({
    el: '#appRegis',
    data: {
        username: '',
        password: '',
        confirm: '',
    },
    created () {
        this.resetInput
    },
    methods: {
        resetInput(){
            this.username = '';
            this.password = '';
            this.confirm = '';
        },
        doRegister(){
            let username = this.username;
            let password = this.password;
            let confirm = this.confirm;
            var regexUsername = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if(!username){
                swal({
                    title: "Error",
                    text: 'Username must be filled!',
                    icon: "warning"
                })
            }else if(!regexUsername.test(username)){
                swal({
                    title: "Error",
                    text: 'Username must be email!',
                    icon: "warning"
                })
            }
            else if(password.length < 6){
                swal({
                    title: "Error",
                    text: 'Password must be a minimum of 6 characters long',
                    icon: "warning"
                })
            }else if(confirm != password){
                swal({
                    title: "Error",
                    text: 'Password and Confirm Password is not the same',
                    icon: "warning"
                })
            }else{
                axios.post('http://localhost:3000/user/register', {username: username, password: password})
                .then(function(response){
                    if(response.data.message != 'Success login'){
                        swal({
                            title: "Error",
                            text: response.data.message,
                            icon: "warning"
                        })
                    }else{
                        axios.post('http://localhost:3000/user/login', {
                            username: username,
                            password: password
                        })
                        .then(function(response){
                            swal({
                                title: "Success",
                                text: response.data.message,
                                icon: "success"
                            })
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('role', response.data.role);
                            window.location.href = 'index.html'
                        })
                        .catch(function(err){
                            swal({
                                title: "Error",
                                text: 'Something went wrong! Please check your input again',
                                icon: "warning"
                            })
                            console.log(err)
                        })
                    }
                })
                .catch(function(err){
                    swal({
                        title: "Error!",
                        text: response.data.message,
                        icon: "warning"
                    })
                })
                
            }
        },
        goBackToIndex(){
            window.location.href = 'index.html'
        }
    }
})