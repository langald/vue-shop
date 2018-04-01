<template>
	<div>
		<h1>Order now</h1>
		<hr>
		<form @submit.prevent="onSubmitForm" v-if="!formSubmitted">
			<div v-if="!cnt" class="alert alert-danger">Ваша корзина пуста!</div>
			<div class="progress">
				<div class="progress-bar" :style="progressWidth"></div>
			</div>
			<div>
				<app-input v-for="(item, index) in  info"
							:name="item.name"
							:value="item.value"
							:pattern="item.pattern"
							:key="index"
							@update:value="onUpdateValue(index, $event)"
							@changeStatus="onChangeData(index, $event)"
				>
				</app-input>
			</div>
			<button class="btn btn-primary" :disabled="validCnt < info.length || !cnt">
				{{formProcessed ? 'Sending' : 'Send Data'}}				
			</button>
		</form>
		<div v-else>
			<div class="alert alert-success">Заказ успешно оформлен!</div>
			<table class="table table-bordered">
				<tbody>
					<tr v-for="(item, index) in  info">
						<td>{{ item.name }}</td>
						<td>{{ item.value }}</td>
					</tr>
					<tr>
						<td>Ordered</td>						
						<td>
							<ul class="list-group">
								<li v-for="(orderedProduct, orderedProductIndex) in orderedProducts"
									:key="orderedProductIndex"
									class="list-group-item"
									>
									{{orderedProduct.title}}
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
			<router-link :to="{name: 'products'}"
						tag="button"
						class="btn btn-success"
			>
				На главную
			</router-link>			
		</div>
	</div>
</template>

<script>
	import AppInput from './Input';
	import { mapGetters, mapActions } from 'vuex'

	export default {		
		computed: {
			...mapGetters('client', [
				'info',
				'validCnt',
				'formProcessed',
				'formSubmitted'
			]),
			...mapGetters('cart', [				
				'products',
				'cnt'
			]),
			...mapGetters('products', [				
				'items'
			]),
			progressWidth(){
				return {
					width: (this.validCnt / this.info.length * 100) + '%'
				}
			},
			orderedProducts(){				
				return this.items.filter((item) => {
					return this.products.indexOf(item.id_product) !== -1					
				})
			}
		},
		methods: {
			...mapActions('client', [
				'submitForm',
				'updateValue',
				'updateStatus',
				'resetForm'
			]),
			onUpdateValue(index, value) {
				this.updateValue({
					index,
					value
				})				
			},
			onChangeData(index, status){				
				this.updateStatus({
					index,
					status
				})					
			},
			onSubmitForm(){
				
				let data = this.info.map((item) => {
					return {
						name: item.name,
						value: item.value
					}
				})
				
				data.push({
					name: 'Order',
					value: this.products
				})
				
				this.submitForm	(data)			
			}
		},
		components: {
			AppInput
		},
		beforeRouteLeave (to, from , next) {
			this.resetForm()
			next()
		}		
	}
</script>