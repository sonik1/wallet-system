<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Setup Wallet </h2>
          <form id="create-post-form" @submit.prevent="createPost">
               <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="title" v-model="name" name="title" class="form-control" placeholder="Enter Name">
               </div>
              <div class="form-group col-md-12">
                  <label for="description"> Balance </label>
                  <input type="text" id="description" v-model="balance" name="description" class="form-control" placeholder="Enter Initial Balance">
              </div>
              <!-- <div class="form-group col-md-12">
                  <label for="body"> Write Content </label>
                  <textarea id="body" cols="30" rows="5" v-model="body" class="form-control"></textarea>
              </div>
              <div class="form-group col-md-12">
                  <label for="author"> Author </label>
                  <input type="text" id="author" v-model="author" name="author" class="form-control">
              </div> -->

              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
export default {
  data() {
    return {
      title: "",
      description: "",
      body: "",
      author: "",
      date_posted: "",
      name:"",
      balance:""
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    createPost() {
      let postData = {
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author,
        date_posted: this.date_posted,
        name: this.name,
        balance: this.balance
      };
      this.__submitToServer(postData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/setup`, data).then(data => {
        console.log(data);
        router.push({ name: "home" });
      });
    }
  }
};
</script>

