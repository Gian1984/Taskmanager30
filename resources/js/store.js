import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {

        user: '',
        team: '',
        errorLog: '',
        tasks: '',
        taskStatus: ''

    },

    mutations: {

        login(state, user) {
            state.user = user

        },

        auth_error(state, error) {
            state.errorLog = error
        },

        getTeam(state, team) {
            state.team = team
        },

        getLoggedUser(state, user) {
            state.user = user
        },

        updateUser(state, user) {
            state.user = user
        },

        deleteUser(state) {
            state.user = ''
        },

        resetValidation(state) {
            state.errorLog = ''
        },

        getTaskList(state, tasks) {
            state.tasks = tasks;
        },

        updateTask(state, status) {
            state.taskStatus = status
        },

        addTask(state, task) {
            state.tasks.push(task)
        }

    },

    actions: {

        login({ commit }, user) {
            axios.post('api/login', user.user).then(response => {
                commit('login', response.data)
                this.$router.push({ path: "/" });

            }).catch((error) => {
                commit('auth_error', error.response.data.errors.email[0])
            })
        },



        getTeam({ commit }) {
            axios.get('/api/index ').then(response => {
                    commit('getTeam', response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        },

        getLoggedUser({ commit }) {
            axios.get('/api/user').then(response => {
                    commit('getLoggedUser', response.data)
                })
                .catch(error => {
                    console.log(error);
                })

        },

        updateUser({ commit }, user) {
            axios.put('/api/update/' + user.user.id, user.user).then(response => {
                commit('updateUser', user.user)
            })

            .catch(error => {
                console.log(error);
            })


        },

        deleteUser({ commit }, user) {
            axios.get('/api/delete/' + user.user.id).then(response => {
                commit('deleteUser', user.user)
            })

            .catch(error => {
                console.log(error);
            })
        },

        getTaskList({ commit }) {
            axios.get('api/tasks').then(response => {
                commit('getTaskList', response.data)
            }, (error) => {
                console.log(error);
            })
        },

        updateTask({ commit }, taskID) {
            axios.put('/api/tasks/' + taskID.taskID, taskID.status).then(response => {
                commit('updateTask', taskID.status)
            })

            .catch(error => {
                console.log(error);
            })
        },

        addTask({ commit }, task) {
            axios.post('/api/tasks', task.task).then(response => {
                commit('addTask', task.task)
            }).catch((error) => {
                console.log(error)
            })
        }

    },

    getters: {


    }

})

export default store;