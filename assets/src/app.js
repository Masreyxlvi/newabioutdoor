document.addEventListener('alpine:init', () => {
	Alpine.data('product', () => ({
		tenda: [
			{id: 1, name: 'Tenda Big Dome 6 Pro', img: 'tenda1.jpg', price:75000},
			{id: 2, name: 'Tenda Easy Dome 2 ', img: 'tenda2.jpg', price:20000},
			{id: 3, name: 'Bespot', img: 'tenda3.jpg', price:35000},
			{id: 4, name: 'Borneo 3', img: 'tenda4.jpg', price:40000},
			{id: 5, name: 'Borneo 4', img: 'tenda5.jpg', price:50000},
		],	
		carrier: [
			{id: 6, name: 'Daypack', img: 'carrier1.jpg', price:10000},
			{id: 7, name: 'Sunature Futura Pro', img: 'carrier2.jpg', price:20000},
			{id: 8, name: 'Deuter Futura 32', img: 'carrier3.jpg', price:35000},
			{id: 9, name: 'Osprey Kestrey 48', img: 'carrier4.jpg', price:40000},
		],	
		masak: [
			{id: 10, name: 'Kompor Portable Kotak', img: 'masak1.jpg', price:12000},
			{id: 11, name: 'Kompor Portable Mawar', img: 'masak2.jpg', price:15000},
			{id: 12, name: 'Kompor Portable Koper', img: 'masak3.jpg', price:20000},
			{id: 13, name: 'Cooking Seet Ds 200', img: 'masak4.jpg', price:12000},
			{id: 14, name: 'Cooking Seet Ds 308', img: 'masak5.jpg', price:15000},
			{id: 15, name: 'Gas Portable Refil', img: 'masak6.jpg', price:8000},
		],	
		penerangan: [
			{id: 16, name: 'HeadLamp', img: 'penerangan1.jpg', price:8000},
			{id: 17, name: 'HeadLamp Electric', img: 'penerangan2.jpg', price:10000},
			{id: 18, name: 'Lampu Tenda', img: 'penerangan3.jpg', price:8000},
		],
		pribadi: [
			{id: 18, name: 'Sleping Bag', img: 'pribadi1.jpg', price:8000},
			{id: 19, name: 'Tracking Pole', img: 'pribadi2.jpg', price:10000},
			{id: 20, name: 'Sarung Tangan', img: 'pribadi3.jpg', price:10000},
			{id: 21, name: 'Sepatu Tracking', img: 'pribadi4.jpg', price:25000},
		],	
		tambahan: [
			{id: 22, name: 'Matras Spons', img: 'tambahan1.jpg', price:5000},
			{id: 23, name: 'Matras Lipat Spons', img: 'tambahan2.jpg', price:10000},
			{id: 24, name: 'Flysheet', img: 'tambahan3.jpg', price:15000},
			{id: 25, name: 'Meja & Kursi Lipat', img: 'tambahan4.jpg', price:15000},
		]	
		}));

		Alpine.store('cart', {
			items: [],
			total: 0,
			quantity: 0,
			add(newItem) {
				// cek apakah ada barang yang sama

				const cartItem  = this.items.find((item) => item.id === newItem.id);

				// jika belum ada / cart masih kosong

				if(!cartItem){
					this.items.push({...newItem, quantity: 1, total: newItem.price});
					this.quantity++;
					this.total += newItem.price;
				}else{
					// jika barang sudah ada, cek apakah barang
					this.items = this.items.map((item) => {

						if (item.id !== newItem.id) {
							return item;
						}else{
							item.quantity++;
							item.total = item.price * item.quantity;
							this.quantity++;
							this.total += item.price;
							return item
						}
					})
				}
			},

			remove(id){
				const cartItem = this.items.find((item) => item.id === id);

				// jika item lebih dari satu

				if(cartItem.quantity >1) {
					this.items = this.items.map((item) => {
						
						if(item.id  !== id) {
							return item;
						} else{
							item.quantity--;
							item.total = item.price * item.quantity;
							this.quantity--;
							this.total -= item.price;
							return item;
						}
					});
				} else if (cartItem.quantity === 1) {
					this.items = this.items.filter((item) => item.id !== id);

					this.quantity--;
					this.total -= cartItem.price;
				}
			}
		});
		
});

// Konversi Rupiah

const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits:0,
	}).format(number)
}