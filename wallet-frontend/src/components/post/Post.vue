<template>
    <div class="text-center">
        <div class="col-sm-12">
      <!-- <h4 style="margin-top: 30px;"><small><button class="btn btn-success" v-on:click="navigate()"> Dashboard </button></small></h4> -->
      <hr>
      <div class="offset">
        <h5 class="text-left">Wallet Details</h5>
      </div>
      
      <h5><span class="glyphicon glyphicon-time"></span> Wallet Owner : {{wallet.walletDetails.name}}.</h5>
      <h5><span class="glyphicon glyphicon-time"></span> Wallet Created : {{wallet.walletDetails.date_posted}}.</h5>
      <h5><span class="glyphicon glyphicon-time"></span> Wallet Balance : {{wallet.balance}}.</h5>
      
      <div class="offset">
        
        <h5 class="text-left">Transaction Details <button class="btn btn-default float-right" v-if="displayedPosts.length" @click="downloadFile()">Export</button></h5>
        <table id="txnTable" class="table table-bordered" v-if="displayedPosts.length">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="p in displayedPosts" :key="p._id">
            <td>{{p.balance}}</td>
            <td><span v-if="p.type == 'credit'" class="credit">{{p.type}}</span><span v-if="p.type == 'debit'" class="debit">{{p.type}}</span></td>
            <td>{{getFormattedDate(p.date_posted)}}</td>
          </tr>
          </tbody>
        </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
              </li>
              <li class="page-item">
                <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
              </li>
              <li class="page-item">
                <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
              </li>
            </ul>
          </nav>	
          <h5 class="text-center" v-if="!displayedPosts.length">No transactions found</h5>
        </div>
  
    </div>
    </div>
</template>

<script>
import { server } from "../../utils/helper";
import axios from "axios";
import router from "../../router";
import exportFromJSON from "export-from-json";
import moment from 'moment';
export default {
  data() {
    return {
      id: 0,
      post: {},
      posts : [''],
			page: 1,
			perPage: 9,
			pages: [],
      wallet:{},
      exportData:[]	
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPost();
    this.getWalletDetails();
  },
  methods: {
    getFormattedDate(date) {
            return moment(date).format("YYYY-MM-DD")
        },
    downloadFile() {
      const data = this.displayedPosts;
      const fileName = "transactions";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },    
    getPost() {
      axios
        .get(`${server.baseURL}/transactions?walletId=${this.id}&skip=0&limit=25`)
        .then(data => {
          (this.posts = data.data.post)
          console.log(this.posts)
        });
    },
    navigate() {
      router.go(-1);
    }, 
		setPages () {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  posts.slice(from, to);
		},
    getWalletDetails() {
      axios
        .get(`${server.baseURL}/wallet/${this.id}`)
        .then(data => {
          (this.wallet = data.data)
        });
    }
  },
	computed: {
		displayedPosts () {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts () {
			this.setPages();
		}
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	}
};
</script>
<style scoped>
button.page-link {
	display: inline-block;
}
button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;  
}
.credit {
  color:green;
}
.debit{
  color: red;
}
</style>

