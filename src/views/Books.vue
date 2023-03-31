<template>
  <div>
    <div class="container mt-5">
      <div>
        <div class="container mt-4">
          <div class="row">

            <div class="col-lg-3  align-items-stretch pb-5" v-for="book in books">
              <div class="card">
                <!-- col-md-4  col-2 col-sm-3 mb-5 col-lg-4 -->
                <!-- style="width: 18rem;" -->
                <img :src="book.image" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title text-center"> 
                    <router-link :to="'/book/view/' + book.id" href="javascript:void(0)" > {{ book.title }}</router-link>
                   </h5>
                  <p class="card-subtitle mb-0 text-muted text-center "> by {{ book.author }}</p>


                  <hr class="m-1">

                  <p class="m-0 text-muted"> Published at {{ book.published }} </p>
                  <p class="m-0 text-muted">By {{ book.publisher }}</p>
                  <p class="m-0 text-muted">Genre : {{ book.genre }}</p>

                  <router-link :to="'/book/edit/' + book.id" class="btn m-0 p-1 border border-rounded border-info"
                    v-if="isUserLoggedIn">
                    <i class="fas fa-link"></i>Edit</router-link>
                  <span class="m-2"></span>
                  <span class="btn  mr-2  m-0 p-1 border border-rounded border-info" v-if="isUserLoggedIn"
                    @click="deleteBook(book.id)">
                    <i class="fas fa-link"></i>Delete</span>
                  <!-- <span class=" border  mb-2   border-info custom-border">Genres : {{ book.genre }}</span> -->
                </div>

              </div>
            </div>

          </div>
        </div>

        <div class="row" v-if="totalBooks>12">
          <nav aria-label="Page navigation example center">
            <ul class="pagination justify-content-center">
              <li class="page-item" v-if="startPage > 1"><a class="page-link" href="javascript:void(0)"
                  @click="switchPage(1)">First</a></li>
              <li class="page-item" v-for="page in paginate"><a class="page-link" href="javascript:void(0)"
                  @click="switchPage(page)">{{ page }}</a></li>

              <li class="page-item" v-if="endPage < totalPage"><a class="page-link" href="javascript:void(0)"
                  @click="switchPage(lastPage)">Last</a></li>
            </ul>
          </nav>
        </div>



        <hr>



      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';


export default {

  data: () => {
    return {
      books: null,
      totalBooks: null,
      booksPerPage: 12,
      pageNo: 1,
      startPage: 1,
      endPage: 1,
      totalPage: null,
      paginate: []

    }
  },

  async created() {
    // const response = await axios.get('/books')
    // console.log(response.data.data.data)
    // this.books = response.data.data.data
    // debugger
    await this.getBooks()
    this.getPage()
  },
  methods: {
    switchPage(pageNo = 1) {
      this.pageNo = pageNo
      this.getBooks(pageNo);
    },
    async getBooks(pageNo = 1, search = '') {
      // debugger
      const response = await axios.get('/books', {
        params: {
          "page": pageNo,
          "search":  this.searchKey
        }
      })
      this.books = response.data.data.data
      this.totalBooks = response.data.data.total
      this.lastPage = response.data.data.last_page
      this.getPage()
    },
    async deleteBook(bookId) {

      this.$swal.fire({
        title: 'Are You Sure You want to Delete?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          var token = localStorage.getItem('token');
          const response = await axios.delete('/books/' + bookId, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          await this.$swal.fire('Book Deleted');
          console.log("Deleted")
          this.getBooks(this.pageNo);
        } else if (result.isDenied) {
          console.log("Not Deleted")
        }
      })
    },
    getPage() {
      this.paginate=[];
      this.totalPage = Math.ceil(this.totalBooks / this.booksPerPage);
      this.startPage = this.pageNo - 2;
      this.endPage = this.pageNo + 2;
      if (this.startPage <= 1) {
        this.startPage = 1
        this.endPage = this.pageNo + 2
      }
      if (this.endPage > this.totalPage) {
        this.startPage = this.pageNo - 2;
        this.endPage = this.totalPage
      }
      for (let index = this.startPage; index <= this.endPage; index++) {
        this.paginate.push(index)
      }
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn', 'searchKey'])
  },
  watch: {
    searchKey() {
      this.getBooks(1, this.searchKey);
    },

  }
}
</script>

<style>
.card {
  float: left;
  width: 100%;
  padding: .75rem;
  height: 100%;
  margin-bottom: 2rem;
  border: 0;
  box-shadow: 0px 0px 8px 0.3px rgba(0, 0, 0, 1);
}

.card-img-top {
  height: 15rem;
  width: 100%;
  object-fit: cover;
}

.custom-border {
  border-radius: 15px;
}
</style>