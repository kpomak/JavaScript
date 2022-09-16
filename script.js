"use strict";

const cartIcon = document.querySelector('.cartIconWrap');
const basketDiv = document.querySelector('div.basket');
const itemsList = document.querySelectorAll('.featuredItem');
const featuredItems = document.querySelector('.featuredItems');
const basketTotal = document.querySelector('.basketTotal');

class Cart {
	constructor() {
		this.list = [];
		this.total = 0;
		this.number = 0;
	}

	addToCart(item) {
		cartIcon.lastElementChild.textContent = ++this.number;
		if (!this.list.includes(item)) {
			this.list.push(item);
			item.count++;
			item.total += item.price;
			this.renderNewProduct(item);
			return;
		}
		this.list.forEach((el) => {
			if (el !== item) return;
			item.count++;
			item.total += item.price;
			item.renderProductRow();
		});
	}

	renderNewProduct(item) {
		const productRow = `
			<div class="basketRow ${item.name}">
				<div>${item.name}</div>
				<div>${item.count} шт.</div>
				<div>$ ${item.price}</div>
				<div>$ ${item.total}</div>
			</div>
			`;
		basketTotal.insertAdjacentHTML("beforebegin", productRow);
	}

	calculateCart(price) {
		this.total += price;
		basketTotal.lastElementChild.textContent = this.total;
	}
}

class Product {
	constructor(name, price) {
		this.name = name;
		this.count = 0;
		this.price = price;
		this.total = 0;
	}

	renderProductRow() {
		const productRow = document.querySelector(`.${this.name} div`)
		productRow.nextElementSibling.textContent = `${this.count} шт.`;
		productRow.parentNode.lastElementChild.textContent = `$ ${this.total}`;
	}
}

cartIcon.addEventListener('click', () => {
	basketDiv.classList.toggle('hidden');
});

const productsList = {};
itemsList.forEach(item => {
	const label = item.querySelector('.featuredName').innerText;
	productsList[label] = new Product(label,
		parseFloat(item.querySelector('.featuredPrice').innerText.slice(1)));
	item.dataset.name = label;
});

const cart = new Cart();

featuredItems.addEventListener('click', ({ target }) => {
	if (!target.closest('button')) return;
	const product = productsList[target.closest('.featuredItem').dataset.name];
	cart.addToCart(product);
	cart.calculateCart(product.price);
});
