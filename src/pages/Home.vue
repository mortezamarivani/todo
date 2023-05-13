<template>
    <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <!-- title component -->
        <Title title="To do List"/> 


        <!-- panel for search  -->
        <div class="accordion header-Style" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   Serarch in (title ,priority,dueDate )
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="mb-3">
                    <!-- search  -->
                    <input type="text" class="form-control" id="exampleFormControlInput1"
                        v-model="searchItem"
                     placeholder="Please enter value for search in title , priority , dueDate ">
                     
                     <hr>
                     <!-- sort dosnt work right!  -->
                     <select class="form-select" v-model="itemSort" aria-label="Default select example">
                        <option selected>Sort by DueDate</option>
                        <option value="1">Asc</option>
                        <option value="2">Dsc</option>
                     </select>

                     <hr>
                    <!-- enable fields for show   -->
                     <div class="form-check checkBox-Style">
                    <input class="form-check-input" type="checkbox" v-model="showTitle" >
                    <label class="form-check-label" for="defaultCheck1">
                        ShowTitle
                    </label>
                    </div>

                    <div class="form-check checkBox-Style">
                    <input class="form-check-input" type="checkbox" v-model="showDescription" >
                    <label class="form-check-label" for="defaultCheck1">
                        ShowDescription
                    </label>
                    </div>

                    <div class="form-check checkBox-Style">
                    <input class="form-check-input" type="checkbox" v-model="showDuedate" >
                    <label class="form-check-label" for="defaultCheck1">
                        ShowDuedate
                    </label>
                    </div>

                    <div class="form-check checkBox-Style">
                    <input class="form-check-input" type="checkbox" v-model="showPriority" >
                    <label class="form-check-label " for="defaultCheck1" >
                        ShowPriority
                    </label>
                    </div>


                    </div>

                </div>
                </div>
            </div>
        </div>

        <!-- generate cards -->
        <div class="row g-3">
            <div  class="col-md-4" v-for="(item) in filterGetLocalStorage" :key="item.title" :id="'card-'+item.title">
                <div class="card">
                <div class="card-header header-card-Style" v-show="showTitle">
                    <!-- <span v-show="isToday(item.dueDate)" style="color: red;" class="material-icons">verified</span> -->
                    <span>
                        <span class="material-icons" :id="item.title" @click.prevent="edit(item.title)">create</span>
                        <span class="material-icons" :id="item.title" @click.prevent="removeTodo(item.title)">delete</span>
                    </span>
                    <span >{{ item.title }}
                     <span style="color: red;" v-show="isToday(item.dueDate)" 
                     @click="showInfo"
                     class="material-icons">verified</span>
                    </span>
                </div>
                <ul class="list-group list-group-flush">
                    <li v-show="showPriority" class="list-group-item">Priority : {{ item.priority }} 
                        ({{ getPriorityValue(item.priority) }})</li>
                    <li v-show="showDuedate" class="list-group-item">Duedate : {{ item.dueDate }}</li>
                    
                    <li v-show="showDescription" class="list-group-item card-text" style="display: flex;">Description : 
                        <span class="d-inline-block text-truncate" style="max-width: 150px;">
                            {{ item.description }}
                        </span>
                    </li>
                </ul>
                </div>
            </div>
        </div>
       
        <!-- table -->
      <!--   <table class="table table-hover">

        <thead>
            <tr class="header-tbl-Style">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Duedate</th>
            <th scope="col">Periority</th>
            <th scope="col">Description</th>
            <th scope="col">...</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in todoList" :key="item.title">
            <th scope="row"  >{{ index+1 }}</th>
            <td>{{ item.title}}</td>
            <td>{{ item.dueDate}}</td>
            <td>{{ item.priority}}</td>
            <td>{{ item.description}}</td>
            <td>...</td>
            </tr>
        </tbody>
        </table>
 -->

    </div>
  </template>
  
  <script setup>
  import { reactive,ref, computed  } from 'vue';
  import { useRouter } from 'vue-router'
  import { getTodoItemFromLocalStorage,deleteItem } from '../composables/useCommon.js'
  import  Title from '../components/Title.vue'

  let todoList = reactive(getTodoItemFromLocalStorage());
  let searchItem=ref('');
  let itemSort=ref(1);
  let showTitle=ref(true)
  let showPriority=ref(true)
  let showDuedate=ref(true)
  let showDescription=ref(true)


  

  const router = useRouter();

  function edit(pi_value){
      router.push({ name: 'todolistWithParams', params: { title: pi_value } })
  }

  // is today
  function isToday(pi_value) {
    let currentDate = new Date().toJSON().slice(0, 10);

    if(pi_value ==currentDate) 
        return true;
    
    return false;
  }


  function showInfo(){
    swal("this task is for today  :  ", `your task is ready for today`);
  }

  //delete Todo
  function removeTodo(pi_value){
        if(getTodoItemFromLocalStorage().find(({ title }) => title == pi_value) != undefined){
                if (confirm(`do you want to delete this title : ${pi_value}`) == true) {
                  deleteItem(pi_value);
                  //todoList.filter(({ title }) => title != pi_value)
                  document.getElementById("card-"+pi_value).remove();
                  alert(`'${pi_value}' successful deleted`)
                }
            }
  }

  function getPriorityValue(pi_value){
    if(pi_value == "1") return "Top"
    if(pi_value == "2") return "Mid"
    if(pi_value == "3") return "Low"

    return pi_value
  }

  const filterGetLocalStorage = computed(() => {
        return todoList.filter(el => 
            el.title.toUpperCase().match(searchItem.value.toUpperCase())
            ||el.priority==searchItem.value.toUpperCase()
            ||el.dueDate.toUpperCase().match(searchItem.value.toUpperCase())
        );
    })

  </script>
  
  <style scoped>
    .checkBox-Style {
        font-size: medium;
    }
    .header-Style{
        margin-bottom: 0.5rem;
    }
    .header-card-Style{
        font-size: large;
        font-style: oblique;
        font-family: 'circular';
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;

    }
  </style>