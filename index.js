// global datastore
// * A meal has many customers
// * A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// * A customer has many deliveries
// * A customer has many meals through deliveries
// * A customer belongs to a neighborhood
// * A neighborhood has many deliveries
// * A neighborhood has many customers through deliveries
// * A neighborhood has many meals through deliveries

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let deliveryId = 0;
let customerId = 0;
let mealId = 0;


class Neighborhood {
    constructor (name) {
      this.name=name;
      this.id = neighborhoodId++;
      store.neighborhoods.push(this);
    }
    
    deliveries() {
      let deliveryList=[];
      return this.deliveries.filter(delivery => {
        if ( delivery.neighborhoodId === this.id ) {
          deliveryList.push(delivery);
        }
        return deliveryList.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
      });
    }
    
     customers() {
         return store.customers.filter(customer => {
           return customer.neighborhoodId === this.id;
         });
       }  
  
      // deliveries() {
      //   let allDeliveries = this.customers().map(customer => {
      //     return customer.deliveries();
      //   });
      //   let mergedArr=[].concat.apply([], allDeliveries());
      //   // return mergedArr;
      //   return mergedArr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
      // }
  
    // customers() {
    //   return this.customers.filter(customer => {
    //     return customer.neighborhoodId === this.id;
    //   });
    // }
 
    
  
  
    totalSpent(){
      
    }
 }



 class Customer {
   
    constructor(name, neighborhoodId) {
      this.id = customerId++;
      this.neighborhoodId = neighborhoodId;
      this.name=name;
      store.customers.push(this);
    }
   
   deliveries() {
     let deliveryList=[];
    // return this.deliveries.filter(delivery => {
       if (store.deliveries.customerId === this.id) {
         deliveryList.push(delivery);
       }
       return deliveryList;
    // });
   }
    
   meals () {
     return this.meals.filter(meal => {
       return meals.customerId === this.id;
     });
   }
     
    totalSpent() {
       return this.meals().reduce(function(sum, meal) {
         return sum + meal.price;
         }, 0);
    }	
}
 
 
    class Meal {
      
      constructor(title = {}, price = {}, meal ={}){	  
        this.title = title;	    
        this.price = price;
        this.id = mealId++;
        store.meals.push(this);
       }
       
       deliveries() {
         return store.deliveries.filter( delivery => {
           return delivery.mealId === this.id;
         });
       }
       
      // customers() {
      //   return this.customer.filter( customer => {
      //     return customer.mealId === this.id;
      //   });
      // }
       
       customers() {
          return this.deliveries().map(delivery => {
           return delivery.customer();
    	    });
       }
       
       static byPrice() {
         return store.meals.sort((meal1, meal2) => {
          return meal1.price < meal2.price;
        });
      }	
       
    }

    
    class Delivery {
      
      constructor (mealId, neighborhoodId, customerId) {
         this.mealId = mealId;
         this.neighborhoodId = neighborhoodId;
         this.customerId = customerId;
         this.id = deliveryId++;
         
         store.deliveries.push(this);
       }
       
       meal() {
         return store.meals.find(meal => {
           return meal.id === this.mealId;
         });
       }
       
       customer() {
         return store.customers.find( customer => {
           return customer.id === this.customerId;
          });
        }
       
       neighborhood() {
         return store.neighborhoods.find( neighborhood => {
           return neighborhood.id === this.neighborhoodId;
         });
       }
       
}