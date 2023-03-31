<template>
    <div class="container mt-2 ">

        <nav class="navbar navbar-expand-lg  navbar-transparent">
            <router-link class="navbar-brand " to="/">
                <h2>VUE Library</h2>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse nav justify-content-end" id="navbarSupportedContent">

                <!-- <div class="form-inline my-2 my-lg-0" >
                <input class="form-control mr-sm-5" type="search" placeholder="Search" aria-label="Search"  
                v-model="search" @keyup="searchData">
            </div> -->
                <form class="mx-2 my-auto d-inline w-50">
                    <input type="text" class="form-control border border-right-0 transparent-input "
                        placeholder="Search for title, author, genre, publisher ..." v-model="search" @keyup="searchData">
                </form>

                <ul class="navbar-nav mr-auto">
                    <!-- <li class="nav-item">
                    <router-link class="nav-link" to='/'>Home</router-link>
                </li> -->
                    <li class="nav-item" v-if="isUserLoggedIn">
                        <router-link class="nav-link" to='/add-book'>Add</router-link>
                    </li>
                    <li class="nav-item" v-if="!isUserLoggedIn">
                        <router-link class="nav-link" to='/login'>Login</router-link>
                    </li>
                    <li class="nav-item" v-if="isUserLoggedIn">
                        <a class="nav-link" href="javascript:void(0)" @click="logoutuser">Logout</a>
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
    background-color: transparent !important;

}
</style>