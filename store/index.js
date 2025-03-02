// 我们组装模块并导出 store 的地方
import {
	createStore
} from 'vuex'
const store = createStore({
	state: { //存放状态
		"username": "foo",
		"age": 18,
		todos: [{
				id: 1,
				text: '我是内容一',
				done: true
			},
			{
				id: 2,
				text: '我是内容二',
				done: false

			}
		],
		count: 1
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		},
		doneTodosCount: (state, getters) => {
			//state ：可以访问数据
			//getters：访问其他函数，等同于 store.getters
			return getters.doneTodos.length
		},
		getTodoById: (state) => (id) => {
			return state.todos.find(todo => todo.id === id)
		}
	},
	// Mutation 必须是同步函数,类似于事件: 类型 (type) 和 回调函数 (handler),会接受 state 作为第一个参数
	mutations: {
		add(state) {
			state.count += 2
		},
		// add(state, n) {
		// 	state.count += n
		// },
		// add(state, payload) {
		// 	state.count += payload.amount
		// }
	},
	// action 提交的是 mutation，通过 mutation 来改变 state ，而不是直接变更状态。可以包含任意异步操作
	actions: {
		addCountAction(context) { //与 store 实例具有相同方法和属性的 context 对象
			context.commit('add') //提交一个 mutation
			// context.state 和 context.getters 来获取 state 和 getters
		}
		//参数解构
		// addCountAction({commit}) {
		// 	commit('add')
		// }
		// addCountAction(context, payload) {
		// 	context.commit('add', payload)
		// }
		//异步操作
		// addCountAction(context) {
		// 	//在执行累加的时候，会等待两秒才执行
		// 	setTimeout(function() {
		// 		context.commit('add')
		// 	}, 2000)
		// }
		// actionA({
		// 	commit
		// }) {
		// 	return new Promise((resolve, reject) => {
		// 		setTimeout(() => {
		// 			commit('someMutation')
		// 			resolve()
		// 		}, 1000)
		// 	})
		// }
		// actionB({
		// 	dispatch,
		// 	commit
		// }) {
		// 	return dispatch('actionA').then(() => {
		// 		commit('someOtherMutation')
		// 	})
		// }
		// async actionA({
		// 	commit
		// }) {
		// 	commit('gotData', await getData())
		// },
		// async actionB({
		// 	dispatch,
		// 	commit
		// }) {
		// 	await dispatch('actionA') // 等待 actionA 完成
		// 	commit('gotOtherData', await getOtherData())
		// }
	}
})

export default store