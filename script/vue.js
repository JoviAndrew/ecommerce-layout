new Vue({
    el: '#app',
    data:{
        navbars: ['Handphone dan Tablet', 'Komputer dan Laptop', 'Peralatan Elektronik', 'Mainan', 'Pakaian', 'Makanan', 'Home and Living'],
        products: 
        [
            {
                id: 1,
                img: "./image/289487_fda676ca-c94c-11e4-9fb4-4ef84908a8c2.jpg",
                name: "Super Mie",
                price: 2000,
            },
            {
                id: 2,
                img: "./image/ipad-pro-10in-wifi-select-silver-201706.png",
                name: "Ipad 2017",
                price: 10000000,
            },
            {
                id: 3,
                img: "./image/p102-2000.jpg",
                name: "Hammer",
                price: 275000,
            },
            {
                id: 4,
                img: "./image/tokowow-net-tv-baju-86.png",
                name: "Shirt",
                price: 150000,
            },
            {
                id: 5,
                img: "./image/product-image-413387377_1024x1024.jpg",
                name: "Mona Lisa",
                price: 100000000,
            }
        ],
        carts:[],
        banners: [
            {
                url: './image/25618007_478517e3-3067-476c-b405-d1b32927af58.png',
                class: 'carousel-item active'
            },
            {
                url: './image/25618007_997a6147-d616-4857-8877-03975659230c.png',
                class: 'carousel-item'
            },
            {
                url: './image/25618007_6639c477-b1ba-4df9-8d84-917011d51348.jpg',
                class: 'carousel-item'
            }
        ]
    },
    methods:{
        addToCart(product){
            let indexProduct = 0;
            let exists = false;
            for(let index=0; index<this.carts.length; index++){
                if(this.carts[index].name == product.name){
                    indexProduct = index;
                    exists = true;
                }
            }

            if(exists){
                let newProduct = this.carts[indexProduct];
                newProduct.qty += 1
                this.carts.splice(indexProduct, 1, newProduct)
            }else{
                product.qty = 1;
                this.carts.push(product);
            }
        },
        getPrice(qty, price){
            return qty * price;
        },
        getTotalPrice(){
            let totalPrice = 0;
            for(let index=0; index<this.carts.length; index++){
                let price = this.carts[index].qty * this.carts[index].price
                totalPrice += price
            }

            return `Rp. ${totalPrice}`;
        }
    }
})