Vue.component('table-admin-content',{
    template: `
        <tr v-for="product in products">
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td><img v-bind:src="product.img"></td>
            <td><button>Edit</button><button>Remove</button></td>
        </tr>
    `,
    props: ['products']
})