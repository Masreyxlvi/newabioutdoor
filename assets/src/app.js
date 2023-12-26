document.addEventListener('alpine:init', () => {
	Alpine.data('product', () => ({
		tenda: [
			{id: 1, name: 'Big Dome 6 Pro', img: 'tenda1.jpg', price:75000},
			{id: 2, name: 'Easy Dome 2 ', img: 'tenda2.jpg', price:20000},
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
			{id: 10, name: 'Kompor Kotak', img: 'masak1.jpg', price:12000},
			{id: 11, name: 'Kompor Mawar', img: 'masak2.jpg', price:15000},
			{id: 12, name: 'Kompor Koper', img: 'masak3.jpg', price:20000},
			{id: 13, name: 'Cooking Seet 200', img: 'masak4.jpg', price:12000},
			{id: 14, name: 'Cooking Seet 308', img: 'masak5.jpg', price:15000},
			{id: 15, name: 'Gas Portable Refil', img: 'masak6.jpg', price:8000},
		],	
		penerangan: [
			{id: 16, name: 'HeadLamp', img: 'penerangan1.jpg', price:8000},
			{id: 17, name: 'Headlamp Electric', img: 'penerangan2.jpg', price:10000},
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
		],

		}));

		Alpine.store('cart', {
			items: [],
			total: 0,
			quantity: 0,
	
			add(newItem, qty = 1, duration = 1) {
					const cartItem = this.items.find((item) => item.id === newItem.id);
	
					if (!cartItem) {
							this.items.push({
									...newItem,
									quantity: qty,
									total: newItem.price * qty * duration,
									duration: duration
							});
							this.quantity += qty;
							this.total += newItem.price * qty * duration;
					} else {
							this.items = this.items.map((item) => {
									if (item.id !== newItem.id) {
											return item;
									} else {
											item.quantity += qty;
											item.duration += duration;
											item.total = item.price * item.quantity * item.duration;
											this.quantity += qty;
											this.total = this.calculateTotal();
											return item;
									}
							});
					}
			},
	
			
			addQty(item, qty) {
					const cartItem = this.items.find((cartItem) => cartItem.id === item.id);
	
					if (!cartItem) {
							// Handle jika item belum ada di keranjang
							return;
					}
	
					this.items = this.items.map((item) => {
							if (item.id !== cartItem.id) {
									return item;
							} else {
									item.quantity += qty;
									item.total = item.price * item.quantity * item.duration;
									this.quantity += qty;
									this.total = this.calculateTotal();
									return item;
							}
					});
			},
			addDuration(item, duration) {
				this.add(item, 0, duration);
			},
			calculateTotal() {
        return this.items.reduce((acc, item) => acc + item.total, 0);
    	},

			
			remove(id) {
        const cartItem = this.items.find((item) => item.id === id);

        if (cartItem.quantity > 1) {
            this.items = this.items.map((item) => {
                if (item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity * item.duration; // Perbaikan perhitungan total
                    this.quantity--;
                    this.total = this.calculateTotal(); // Hitung ulang total
                    return item;
                }
            });
        } else if (cartItem.quantity === 1) {
            this.items = this.items.filter((item) => item.id !== id);

            this.quantity--;
            this.total = this.calculateTotal(); // Hitung ulang total
        }
    	},
	
			removeDuration(id) {
			const cartItem = this.items.find((item) => item.id === id);

			if (cartItem.duration > 1) {
					this.items = this.items.map((item) => {
							if (item.id !== id) {
									return item;
							} else {
									item.duration--;
									item.total = item.price * item.quantity * item.duration; // Perbaikan perhitungan total
									this.total = this.calculateTotal(); // Hitung ulang total
									return item;
							}
					});
			} else if (cartItem.duration === 1) {
					// Handle jika durasi sama dengan 1
					// ...
			}
			},
		});
	
		
});


const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkout");

form.addEventListener('keyup', function(e) {
	e.preventDefault()
	for (let i = 0; i < form.elements.length; i++) {
		if(form.elements[i].value.length !== 0) {
			checkoutButton.classList.remove('disable');
			checkoutButton.classList.add('disable');
		} else{
			return false;
		}
	}

	checkoutButton.disabled = false;
	checkoutButton.classList.remove('disable');
});


// checkout

checkoutButton.addEventListener('click', function(e) {
	e.preventDefault();
	const formData = new FormData(form);
	const data = new URLSearchParams(formData);
	const objData = Object.fromEntries(data);

	const message = formatMessage(objData);

	window.open('https://wa.me/6287728025262?text=' + encodeURIComponent(message));
});

const formatMessage = (obj) => {
	return `Tanggal Pesanan ${obj.date}

Data Customer
	Nama : ${obj.name}
	Email : ${obj.email}
	No Hp : ${obj.phone}
	 
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.price)})  ${item.duration} Hari = ${rupiah(item.total)} \n`)}
TOTAL : ${rupiah(obj.total)}
Terima Kasih. 
	`;
}

// Konversi Rupiah

const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits:0,
	}).format(number)
}