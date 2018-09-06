function arrangeTask(tasks) {
    tasks.sort(function(a, b){return Date.parse(a.start)> Date.parse(b.start)});
    console.log(tasks);
    return tasks;
}