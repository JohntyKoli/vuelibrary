<template>
    <div>
        <div class="container mt-5">
            <button class=" btn border border-info float-right" @click="goBack"> {{'<<<'}}</button>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="view-card card">
                        
                        <img :src="book.image" class="view-card-img-top ">
                        <div class="card-body">
                            <h5 class="card-title text-center">{{ book.title }}</h5>
                            <p class="card-subtitle mb-0 text-muted text-center "> by {{ book.author }}</p>

                            <p class="card-text">{{ book.description }}</p>

                            <hr class="m-1">
                            <p class="m-0 text-muted"> Published at {{ book.published }} </p>
                            <p class="m-0 text-muted">By {{ book.publisher }}</p>
                            <p class="m-0 text-muted">Genre : {{ book.genre }}</p>

                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => {
        return {
            id: null,
            book: null,
        };
    },

    async created() {
        try {
            this.id = this.$route.params.id
            var token = localStorage.getItem('token');
            const response = await axios.get('/books/' + this.id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            this.book = response.data.data

        } catch (error) {
            await this.$swal.fire('Book Not Found')
            // this.$router.push('/')
        }

    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>


<style>
.view-card {
  float: left;
  width: 100%;
  padding: .75rem;
  height: 100%;
  margin-bottom: 2rem;
  border: 0;
  box-shadow: 0px 0px 8px 0.3px rgba(0, 0, 0, 1);
}

.view-card-img-top {
  height: 30rem;
  width: 100%;
  object-fit: cover;
}

.custom-border {
  border-radius: 15px;
}
</style>