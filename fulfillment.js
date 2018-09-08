function addTrace(agent){
    
    // Add whole sentence content to database
     const content = agent.request_.body.queryResult.queryText;
     const timestamp = agent.request_.body.originalDetectIntentRequest.payload.data.timestamp;
     const userId = agent.request_.body.originalDetectIntentRequest.payload.data.sender.id;
     agent.add(userId);
     
     var ref = admin.database().ref('events').child('sentences').push();
     ref.update({
         userId:userId,
         timestamp:timestamp,
         content:content
     });
}

function createEvent(agent){
    const eventName = agent.parameters.event;
    const date = agent.parameters.date;
    addTrace();
    agent.add('Start setting...');

      return admin.database().ref('events').transaction((event)=> {
        if(event !== null){
            if(eventName || eventName !=='') event.eventName = eventName;
            if(date || date !=='') event.eventDate = date;
            event.numOfTask = 0;

           // if (content || content !== '') event.sentences.$userId.$content = content;
           // if (userId || userId !== '') event.sentences.$userId.$timestamp = content;
            agent.add('Event setting success');
        }
        return event;
    });
  }

function createTask(eventRef,taskName,actor,start_date,duration){

  if(!actor) actor="Default actor";
  if(!start_date) start_date="Default start_date";
  if(!duration) duration="Default duration";
  eventRef.child("numOfTask").once('value', function(snapshot){
    var index = snapshot.val()+1;
    eventRef.update({
        numOfTask:snapshot.val()+1
    });
    var newTask = eventRef.child(taskName);
    newTask.set({
      action:taskName,
      actor:actor,
      start_date:start_date,
      duration:duration,
      index:index,
      progress:0,
      dependency:0
    });
  });

}

 

function updateTask(eventRef,taskName,actor,start_date,duration,progress){
  return eventRef.child(taskName).transaction((task)=> {
    if(task !== null){
        if(actor || actor !=='') task.actor = actor;
        if(start_date || start_date !=='') task.start_date = start_date;
        if(duration || duration !=='') task.duration = duration;
        if(progress || progress !=='') task.progress = progress;
        
        agent.add('Setting success');
    }
    return task;
    }) ;

}


function createOrUpdateTask(agent){
      const taskName = agent.parameters.task.action+'_'+agent.parameters.task.things;
      const actor = agent.parameters.person_in_charge;
      const start_date = agent.parameters.starting_date;
      const duration = agent.parameters.duration.amount;


      agent.add('Start setting...');
      var eventRef = admin.database().ref('events');
      eventRef.child(taskName).once('value', function(snapshot) {
      if(snapshot.exists())return updateTask(eventRef,taskName,actor,start_date,duration);
      else createTask(eventRef,taskName,actor,start_date,duration);
         });
  }
  
// function modifyTask(agent){
//       const eventName = agent.parameters.event;
//       const date = agent.parameters.date;

//       agent.add('Start setting...');
//       return admin.database().ref('events').transaction((event)=> {
//     if(event !== null){
//         if(eventName || eventName !=='') event.eventName = eventName;
//         else agent.add('Missing event name');
//         if(date || date !=='') event.eventDate = date;
//         else agent.add('Missing event date');
        
//         agent.add('Setting success');
//     }
//     return event;      
//     });
//   }

function addDependency(agent){
     const task1Name = agent.parameters.task1.action+'_'+agent.parameters.task1.things;
     const task2Name = agent.parameters.task2.action+'_'+agent.parameters.task2.things;

     var task1Index = admin.database().ref('events/'+task1Name+'/index').once('value', function(snapshot) {return snapshot.val();};
     //var task2Index = admin.database().ref('events/'+task2Name+'/index').once('value', function(snapshot) {return snapshot.val();};
      agent.add(task1Index);
      //agent.add(task2Index);

     agent.add('add dependency...');
     return admin.database().ref('events/'+task2Name).transaction((task)=> {
      if(task !== null){
        var originalDependency = task.dependency;
        task.dependency = originalDependency+',task1Index';
        agent.add('Setting success');
      }
      return task;
      }) ;

}

function addCakeDependency(agent){
     const task1Name = 'order_cake';
     const task2Name = 'pick up_cake';

     var task1Index = admin.database().ref('events/'+task1Name+'/index').once('value', function(snapshot) {return snapshot.val();};
     //var task2Index = admin.database().ref('events/'+task2Name+'/index').once('value', function(snapshot) {return snapshot.val();};
      agent.add(task1Index);
      //agent.add(task2Index);

     agent.add('add dependency...');
     return admin.database().ref('events/'+task2Name).transaction((task)=> {
      if(task !== null){
        var originalDependency = task.dependency;
        task.dependency = originalDependency+',task1Index';
        agent.add('Setting success');
      }
      return task;
      }) ;

}

// @sys.date 
// $starting-date
//   @sys.given-name 
// $person-in-charge
//   @sys.date 
// $end-date
//   @task 
// $task
//   @task-component 
// $task-component
//   @crud


//  task1 task2
