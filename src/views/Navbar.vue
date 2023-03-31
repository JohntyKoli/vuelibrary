<template>
    <div class="container fixed-top">

        <nav class="navbar  navbar-expand-lg  navcolor">
            <router-link class="navbar-brand primary-font-color" to="/">
                <h2>VUE Library</h2>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse nav justify-content-end" id="navbarSupportedContent">

   
                <form class="mx-2 my-auto d-inline w-50">
                    <input type="text" class="form-control  transparent-input"
                        placeholder="Search for title, author, genre, publisher ..." v-model="search" @keyup="searchData">
                </form>

                <ul class="navbar-nav mr-auto">

                    <li class="nav-item " v-if="isUserLoggedIn">
                        <router-link class="nav-link primary-font-color" to='/add-book'>Add </router-link>
                    </li>
                    <li class="nav-item " v-if="!isUserLoggedIn">
                        <router-link class="nav-link primary-font-color" to='/login'>Sign In</router-link>
                    </li>
                    <li class="nav-item " v-if="isUserLoggedIn">
                        <a class="nav-link primary-font-color" href="javascript:void(0)" @click="logoutuser">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        <hr>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    name: 'Navbar',
    computed: {
        ...mapGetters(['user', 'isUserLoggedIn'])
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
        logoutuser() {
            this.$swal.fire({
                title: 'Do you want to Logout?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    var token = localStorage.getItem('token');
                    const response = await axios.post('/logout', {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log(response.data);
                    console.log(response.data.success);
                    if (response.data.success) {
                        localStorage.removeItem('token')
                        await this.$store.dispatch('checkUserLoggedIn', false)
                        this.$router.push('/')
                        this.$store.dispatch('checkUser')
                        console.log(" Logged Out")
                    } else {
                        this.$swal.fire('Something Went Wrong,Please Try Again')
                    }

                } else if (result.isDenied) {
                    console.log("Not Logged Out")
                }
            })

        },
        searchData() {
            this.$store.dispatch('searchKey', this.search)
        }
    }
}

</script>

<style>

input.transparent-input {
    border: 1px solid #fa7040;
    border-radius: 20px;
}
.navcolor{
    background-color: #dfe3eb;
}

</style>