import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		info: [
			{
				name: 'Name',
				value: '',
				pattern: /^[a-zA-Z ]{2,30}$/,
				status: false
			},
			{
				name: 'Phone',
				value: '',
				pattern: /^[0-9]{7,14}$/,
				status: false
			},
			{
				name: 'Email',
				value: '',
				pattern: /.+/,
				status: false
			},
			{
				name: 'Some Field 1',
				value: '',
				pattern: /.+/,
				status: false
			},
			{
				name: 'Some Field 2',
				value: '',
				pattern: /.+/,
				status: false
			}
		],
		formProcessed: false,
		formSubmitted: false
	},
	getters: {
		info(state){
			return state.info;
		},
		formProcessed(state){
			return state.formProcessed;
		},
		formSubmitted(state){
			return state.formSubmitted;
		},
		validCnt(state){
			let done = 0;

			for(let i = 0; i < state.info.length; i++){
				if(state.info[i].status){
					done++;
				}
			}

			return done;
		}
	},
	mutations: {
		processForm(state){
			state.formProcessed = true
		},
		submitForm(state){
			state.formProcessed = false
			state.formSubmitted = true			
		},
		updateValue(state, data) {			
			state.info[data.index].value = data.value
		},
		updateStatus(state, data) {
			state.info[data.index].status = data.status
		},
		resetForm(state) {
			state.formSubmitted = false
		}		
	},
	actions: {		
		submitForm(store, data){
			store.commit('processForm')					
			console.log('Отправить на сервер данные клиента и  список продуктов ' + JSON.stringify(data))
					
			setTimeout(() => {
				store.commit('submitForm')
			}, 1000)
		},
		updateValue(store, data) {			
			store.commit('updateValue', data)
		},
		updateStatus(store, data) {
			store.commit('updateStatus', data)
		},
		resetForm(store) {
			store.commit('resetForm')
			store.commit('cart/clearCart', null, { root: true }) // принимают опцию `root` для вызова в глобальном пространстве имён
		}
		
	}
};