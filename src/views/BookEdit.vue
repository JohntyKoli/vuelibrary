<template>
    <div>
        <div class="container">
            <button class=" btn border border-info float-right" @click="goBack"> {{'<<<'}}</button>
        </div>
        <div class="container">
            
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="card">
            <div class="card-header"> Edit Book</div>
            <div class="card-body">
                <form v-on:submit.prevent>
                    <div class="mb-3">
                        <label for="title" class="form-label">Title </label>
                        <input type="text" class="form-control" id="title" aria-describedby="emailHelp" v-model="title">
                        <p :style="{ color: 'red' }" v-if="this.errors.title">{{ this.errors.title[0] }}</p>
                    </div>
                    <div class="mb-3">
                        <label for="author" class="form-label">Author</label>
                        <input type="text" class="form-control" id="author" aria-describedby="emailHelp" v-model="author">
                        <p :style="{ color: 'red' }" v-if="this.errors.author">{{ this.errors.author[0] }}</p>

                    </div>
                    <div class="mb-3">
                        <label for="genre" class="form-label">Genre</label>
                        <input type="text" class="form-control" id="login" aria-describedby="emailHelp" v-model="genre">
                        <p :style="{ color: 'red' }" v-if="this.errors.genre">{{ this.errors.genre[0] }}</p>

                    </div>
                    <div class="mb-3">
                        <label for="Description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" aria-describedby="emailHelp"
                            v-model="description">
                        <p :style="{ color: 'red' }" v-if="this.errors.description">{{ this.errors.description[0] }}</p>
                    </div>
                    <div class="mb-3">
                        <label for="isbn" class="form-label">isbn </label>
                        <input type="number" class="form-control" id="isbn" aria-describedby="emailHelp" v-model="isbn">
                        <p :style="{ color: 'red' }" v-if="this.errors.isbn">{{ this.errors.isbn[0] }}</p>
                    </div>
                    <div class="mb-3">
                        <label for="url" class="form-label">Image Url </label>
                        <input type="text" class="form-control" id="url" aria-describedby="emailHelp" v-model="url">
                        <p :style="{ color: 'red' }" v-if="this.errors.image">{{ this.errors.image[0] }}</p>
                    </div>
                    <div class="mb-3">
                        <label for="publisher" class="form-label">Publisher </label>
                        <input type="text" class="form-control" id="publisher" aria-describedby="emailHelp"
                            v-model="publisher">
                        <p :style="{ color: 'red' }" v-if="this.errors.publisher">{{ this.errors.publisher[0] }}</p>

                    </div>
                    <div class="mb-3">
                        <label for="published" class="form-label">Published Date </label>
                        <input type="date" class="form-control" id="published" aria-describedby="emailHelp"
                            v-model="published">
                        <p :style="{ color: 'red' }" v-if="this.errors.published">{{ this.errors.published[0] }}</p>

                    </div>

                    <button type="button" @click="editBook" class="btn btn-primary">Save</button>
                </form>
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
            "title": '',
            "author": '',
            'genre': '',
            'description': '',
            'isbn': '',
            'url': '',
            'publisher': '',
            'published': '',
            'errors': []

        };
    },

    async created() {
        try {
            this.id = this.$route.params.id
            var token = localStorage.getItem('token');
            const response = await axios.get('/books/' + this.id,{
                headers:{
                    'Authorization': `Bearer ${token}` 
                }
            })
            this.book = response.data.data
            this.title = response.data.data.title
            this.author = response.data.data.author
            this.genre = response.data.data.genre
            this.description = response.data.data.description
            this.isbn = response.data.data.isbn
            this.url = response.data.data.image
            this.publisher = response.data.data.publisher
            this.published = response.data.data.published

        } catch (error) {
                await this.$swal.fire('Book Not Found')
                this.$router.push('/')
        }

    },
    methods: {
        async editBook() {
            const postData = {
                title: this.title,
                author: this.author,
                genre: this.genre,
                description: this.description,
                isbn: this.isbn,
                image: this.url,
                publisher: this.publisher,
                published: this.published
            }
            var token = localStorage.getItem('token');
            const response = await axios.put('/books/' + this.id, postData,{
                headers:{
                    'Authorization': `Bearer ${token}` 
                }
            })
            if (!response.data.success && response.data.message == 'Validation failed') {
                this.errors = response.data.data;
            }
            console.log("success " + response.data.success)
            if (response.data.success) {
                await this.$swal.fire('Book Updated Successfully')
                this.$router.push('/')
            }
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

