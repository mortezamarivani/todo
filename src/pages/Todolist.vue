<template>
 <!-- title component -->
 <Title title="Create Todo"/>  

 <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">

  <div class="col-md-12">
        <!-- title -->
       <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          v-model.lazy.trim="form.title"
        />
        <div class="form-text text-danger">
          {{ form.titleErrorText }}
        </div>
      </div>

      <!-- duedate -->
      <div class="mb-3">
        <label class="form-label">DueDate</label>
        <input
          type="date"
          class="form-control"
          v-model="form.dueDate"
        />
        <div class="form-text text-danger">
          {{ form.dueDateErrorText }}
        </div>
      </div>

      <!-- priority -->
      <div class="mb-3">
        <label class="form-label">Priority</label>
        <div class="priority-style">
          <input
          type="number"
          min="1"
          max="3"
          class="form-control"
          v-model="form.priority"
        />
          <select class="form-select" v-model="form.priority" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">Top</option>
          <option value="2">Mid</option>
          <option value="3">Low</option>
        </select>
        </div>
       
        <div class="form-text text-danger">
          {{ form.priorityErrorText }}
        </div>
      </div>

 


      <!-- description -->
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea class="form-control" v-model.lazy.trim="form.description"></textarea>
        <div class="form-text text-danger">
          {{ form.descriptionErrorText }}
        </div>
      </div>


      <button  @click.prevent="validate" class="btn btn-success" >Create Todo</button>
      <button  @click.prevent="updateTodo" class="btn btn-warning btn-update-style" >Update Todo</button>

    <!-- </form> -->
  </div>
    
 </div>
</template>

  
  <script setup>
    import { reactive, ref } from "vue";
    import { getTodoItemFromLocalStorage,deleteItem } from '../composables/useCommon.js'
    import { useRoute } from 'vue-router'
    import  Title from '../components/Title.vue'
    import swal from 'sweetalert';


    const route = useRoute();


    const form = reactive({
      title: "",
      titleErrorText: "",
      description: "",
      descriptionErrorText: "",
      dueDate: "",
      dueDateErrorText: "",
      priority: "",
      priorityErrorText: "",
    });

    function getTodo(){
      if(route.params.title == undefined)
        return;

      let retobj = getTodoItemFromLocalStorage().find(({ title }) => title == route.params.title);
      form.title = retobj.title;
      form.description = retobj.description;
      form.dueDate = retobj.dueDate;
      form.priority = retobj.priority;
    }
    getTodo();

    function validate() {
        form.title === "" ? form.titleErrorText = "title is required":form.titleErrorText = "";
        form.dueDate === "" ? form.dueDateErrorText = "dueDate is required":form.dueDateErrorText = "";
        form.priority === "" ? form.priorityErrorText = "priority is required":form.priorityErrorText = "";

        if(form.priority > 3 || form.priority < 1)
            form.priorityErrorText = "priority must be between 1-3 "

        if (form.title !== "" && form.dueDate !=="" && form.priority != " "){
            
            const isDuplicate = getTodoItemFromLocalStorage().find(({ title }) => title == form.title);
            
            if(isDuplicate != undefined )
              swal("Please read this alarm :  ", `title is duplicate`);
            else{
              const todo = { 
                title : form.title,
                dueDate:form.dueDate,
                priority:form.priority,
                description:form.description=="" ? null :form.description 
              }
              addTodo(todo);
            }
        }
    }
    
    function isEmpty(pi_value,pi_fileName){
      if(pi_value ==""){
          swal("Please read this alarm :  ", `please enter the ${pi_fileName}!`);
          return true;
        }
        return false;
    }

    //update record
    function updateTodo(){
           if (isEmpty(form.title,'title'))
            return;
            
          if (isEmpty(form.dueDate,'dueDate'))
            return;

         if(getTodoItemFromLocalStorage().filter(({ title }) => title == form.title) != undefined){
          swal("Are you sure you want to update this item?", {
              buttons: ["No!", "Yes!"],
            });

          if (confirm(`do you want to update this item  :  '${form.title}'`) == true) {
            
           deleteItem(form.title);
            let itemForUpdate={
              title : form.title,
              description : form.description,
              priority : form.priority,
              dueDate : form.dueDate,
            };

            let oldItems = getTodoItemFromLocalStorage();
            oldItems.push(itemForUpdate)
            localStorage.setItem('todos', JSON.stringify(oldItems));
            swal({
              title: "Good ",
              text:  `'${form.title}' successful updated`,
              icon: "success",
              button: "Aww yiss!",
            });

           }
        } 
    }
        
    // Add addTodo
    function addTodo(pi_todo) {
        let todosInStorage=[];
            todosInStorage = getTodoItemFromLocalStorage();
            todosInStorage.push(pi_todo);
            
            localStorage.setItem('todos', JSON.stringify(todosInStorage));
            swal({
              title: "Good ",
              text:  `'${form.title}' successful added`,
              icon: "success",
              button: "Aww yiss!",
            });
    }

  </script>
  
  <style>
  .btn-update-style{
    margin-left: 1rem;
  }
  .priority-style{
    display: flex;
  }
  </style>