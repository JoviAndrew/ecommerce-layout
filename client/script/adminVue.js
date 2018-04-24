new Vue({
    el: '#appAdmin',
    data: {
        products:[],
        itemname: '',
        itemimg: null,
        price: '',
        productId: '',
        formData: new FormData(),
        image_url: ''
    },
    created: function() {
        this.getAllProducts()
        let role = localStorage.getItem('role');
        if(role != 'admin'){
            window.location.href = 'index.html'
        }
    },
    methods: {
        getAllProducts: function(){
            let self = this
            axios.get('http://localhost:3000/item/show')
            .then(function(itemData){
                self.products = itemData.data.data;
            })
            .catch(function(err){
                console.log(err);
            })
        },
        resetVue: function(itemData){
            this.itemname = ''
            this.itemimg = ''
            this.price = ''
        },
        addProduct: function(){
            let name = this.itemname
            let prc = this.price
            let self = this

            axios.post('http://localhost:3000/item/upload', this.formData)
            .then(function(response){
                let link = response.data.link
                axios.post('http://localhost:3000/item/add', 
                {
                    name: name,
                    price: prc,
                    img: link
                })
                .then(function(response){
                    alert(response.data.message);
                    console.log(response)
                    self.getAllProducts()
                })
            })
            .catch(function(err){
                console.log(err)
            })
        },
        onFilePicked (event) {
            let files = event.target.files
            console.log(files[0])
            this.createImage(files[0])
            this.formData.set('img', files[0])
        },
        createImage(file){
            var reader = new FileReader()
            reader.onload = (e) => {
                this.image_url = e.target.result;
            };
            reader.readAsDataURL(file) 
        },
        updateItem(){
            let name = this.itemname
            let prc = this.price
            let id = this.productId
            let self = this

            axios.post('http://localhost:3000/item/upload', this.formData)
            .then(function(response){
                let link = response.data.link
                axios.put(`http://localhost:3000/item/update/${id}`, {
                    name: name,
                    price: prc,
                    img: link
                })
                .then(function(response){
                    alert(response.data.message)
                    console.log(response)
                    self.getAllProducts()
                })
            })
            .catch(function(err){
                console.log(err);
            })
        },
        deleteItem(id){
            let self = this
            axios.delete(`http://localhost:3000/item/delete/${id}`)
            .then(function(response){
                alert(response.data.message);
                self.getAllProducts();
            })
            .catch(function(err){
                alert('Something went wrong!');
                console.log(err);
            })
        },
        doLogout(){
            alert('Successfully Logged out')
            localStorage.clear();
            window.location.href = 'index.html'
        },
        sendToModal(product){
            this.itemname = product.item_name;
            this.itemimg = product.item_img;
            this.price = product.item_price;
            this.productId = product._id
        }
    }
})