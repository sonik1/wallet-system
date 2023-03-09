<template>
<div>
      <h4 class="text-center mt-20">
       <small>
         <!-- <button class="btn btn-success" v-on:click="navigate()"> Dashboard </button> -->
       </small>
    </h4>
        <div class="col-md-12 form-wrapper">
          <h2> Transaction </h2>
          <form id="edit-post-form" @submit.prevent="editPost">
            <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="title" v-model="post.name" name="title" class="form-control" placeholder="Enter Name" disabled>
            </div>
            <div class="form-group col-md-12">
                <label for="description"> Balance </label>
                <input type="text" id="description" v-model="balance" name="description" class="form-control" placeholder="Enter Balance">
            </div>
            <div class="form-group col-md-12">
              <label for="description"> Transaction Type </label>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="debit" v-model="txnType" name="flexRadioDefault" id="flexRadioDefault1" checked>
                <label class="form-check-label" for="flexRadioDefault1">
                  Debit
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="credit" v-model="txnType" name="flexRadioDefault" id="flexRadioDefault2">
                <label class="form-check-label" for="flexRadioDefault2">
                  Credit
                </label>
              </div>
            </div>
            <!-- <div class="form-group col-md-12">
                <label for="body"> Write Content </label>
                <textarea id="body" cols="30" rows="5" v-model="post.body" class="form-control"></textarea>
            </div>
            <div class="form-group col-md-12">
                <label for="author"> Author </label>
                <input type="text" id="author" v-model="post.author" name="author" class="form-control">
            </div> -->

            <div class="form-group col-md-4 pull-right">
                <button class="btn btn-success" type="submit"> Submit </button>
            </div>
          </form>
        </div>
    </div>
</template>

<script>
import { server } from "../../utils/helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      post: {},
      txnType: "credit",
      balance: "",
      walletBalance:0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPost();
  },
  methods: {
    editPost() {
      let postData = {
        title: this.post.title,
        description: this.post.description,
        body: this.post.body,
        author: "",
        date_posted: this.post.date_posted,
        balance: this.balance,
        type: this.txnType,
        walletId: this.$route.params.id
      };

      axios
        .put(`${server.baseURL}/transact?walletId=${this.id}`, postData)
        .then(data => {
          console.log(data);
          router.push({ name: "home" });
        });
    },
    getPost() {
      axios
        .get(`${server.baseURL}/wallet/${this.id}`)
        .then(data => {
          (this.post = data.data.walletDetails)
        });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

