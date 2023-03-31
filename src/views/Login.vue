<template>
    <div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">


                    <div class=" card">
                        <div class="card-header"> Login</div>
                        <div class="card-body">
                            <form @click.submit.prevent>
                                <div class="mb-3">
                                    <label for="login" class="form-label">Login Id</label>
                                    <input type="text" class="form-control" id="login" aria-describedby="emailHelp"
                                        v-model="login">

                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" v-model="password">
                                </div>
                                <p :style="{ color: 'red' }" v-if="this.error">{{ this.error }}
                                    </p>
                                <button type="submit" class="btn border-rounded border-info primary-button" @click="loginsubmit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',

    data: () => {
        return {
            login: "",
            password: "",
            error:''

        };
    },
    methods: {

        async loginsubmit() {
            const postData = {
                email: this.login,
                password: this.password,
            }
            const response = await axios.post('/login', postData)
            localStorage.setItem('token', response.data.data.token)
            if (response.data.success) {
                this.$store.dispatch('checkUserLoggedIn', response.data.success)
                this.$router.push('/')
            }else{
                this.error =response.data.data.error
            }


        }

    }
}
</script>