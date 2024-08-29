document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
       items: [
        { id: 1, name: 'Robusta Brazil', img: '1.jpeg', price: 20400},
        { id: 2, name: 'Americano', img: '2.jpeg', price: 33500},
        { id: 3, name: 'Primo Passo', img: '3.jpeg', price: 35100},
        { id: 4, name: 'Aceh Gayo', img: '4.jpeg', price: 25430},
        { id: 5, name: 'Sumatra Mandheling', img: '5.jpeg', price: 18000},

       ], 
    }));



    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / cart masih kosong
            if(!cartItem){

                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            }else{
                // jika barang sudah ada, cek apakah barang beda atau sama

                this.items = this.items.map((item) => {
                    // jika barang berbeda 
                    if(item.id !== newItem.id){
                        return item;
                    }else{
                        // jika barang sudah ada, tambah quantity dan subtotal
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
                // cek barang beda atau sama
                
            }
        },
        remove(id){
            // ambil item berdasarkan idnya
            const cartItem = this.items.find((item) => item.id === id);

            if(cartItem.quantity > 1){
                // telusuri 
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id){
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            }else if(cartItem.quantity === 1){
                // jika barangnya satu
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;

            }

            
        }
    });
});

// konversi rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
}