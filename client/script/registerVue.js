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

            if(confirm != password){
                alert('Password and Confirm Password is not the same');
            }else{
                axios.post('http://localhost:3000/user/register', {username: username, password: password})
                .then(function(response){
                    alert(response.data.message);
                    axios.post('http://localhost:3000/user/login', {
                        username: username,
                        password: password
                    })
                    .then(function(response){
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('role', response.data.role);
                        window.location.href = 'index.html'
                    })
                })
                .catch(function(err){
                    alert('Something went wrong! Please check your input again') 
                    console.log(err)
                })
            }
        },
        goBackToIndex(){
            window.location.href = 'index.html'
        }
    }
})