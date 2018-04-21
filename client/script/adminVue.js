new Vue({
    el: '#appAdmin',
    data: {
        products:[],
        itemname: '',
        itemimg: null,
        price: '',
        productId: '',
    },
    created: function() {
        this.reset();
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
                let tempArr = itemData.data.data;
                tempArr.forEach(function(items){
                    self.products.push(items);
                })
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
            let img = this.formdata

            axios.post('http://localhost:3000/item/add', 
            {
                itemname: name,
                price: prc,
                img: img
            })
            .then(function(response){
                // alert(response.message)
                console.log('Berhasil! ===========', response)
            })
            .catch(function(err){
                console.log(err)
            })
            this.reset()
        },
        onFilePicked: function(event){
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <=0){
                alert('Invalid file input!')
            }
            
            console.log(files[0]);
            this.itemimg = files[0];
            // this.
            // const fileReader = new FileReader()
            // fileReader.addEventListener('load', () => {
            //     this.itemimg = fileReader.result
            // })
            // fileReader.readAsDataURL(files[0])
            // console.log(typeof(fileReader.result));
        },
        updateItem(){
            let name = this.itemname
            let prc = this.price
            let img = this.formdata
            let id = this.productId

            axios.put(`http://localhost:3000/item/update/${id}`, {
                itemname: name,
                price: prc,
                img: img
            })
            .then(function(response){
                console.log(response)
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
                self.reset;
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
        reset(){
            this.products = [];
            this.getAllProducts();
        },
        sendToModal(product){
            this.itemname = product.item_name;
            this.itemimg = product.item_img;
            this.price = product.item_price;
            this.productId = product._id
        }
    }
})