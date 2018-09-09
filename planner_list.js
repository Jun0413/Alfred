/**
 * name serves as the id of image in planner list
 */
function newPlanner(name, avatar_path) {
    var $planner;
    $planner = $($('.planner_template').clone().html());

    $('.planner_list').find('ul').append($planner);

    $image = $planner.find('img');

    $image.attr('src', avatar_path);
    $image.parent().attr('id', name);

    $wave = $($('.wave_template').clone().html());
    $wave.find('.water').css("top", 90+"%");
    $image.parent().append($wave);

    $image.fadeIn(2000);
}

function removePlanner(name) {
    $('#' + name).fadeOut(2000, function() {
        $(this).remove();
        // $(this).remove();
    });
    // $('#' + name).child().fadeOut(2000, function() {
    //     $(this).remove();
    //     // $(this).remove();
    // });
}
var perc=[100,10,10,10];
function changeCapacity(name, percentage) {
    $('#' + name).find('.water').css("top", (100 - percentage)+"%");
}