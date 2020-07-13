$(document).ready(function () {

    let arr = [];
    let strToBeDeleted = "";
    $('input[type=checkbox]').change(function(){
        if($(this).is(':checked')) {
            strToBeDeleted = $(this).next()[0].innerText;
          arr.push(strToBeDeleted);
        }
        else {
            const index = arr.indexOf(strToBeDeleted);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
    });

    $("#form").submit(function (e){
        $("<input />").attr("type","hidden")
            .attr('name', "deleted-item")
            .attr('value', arr)
            .appendTo(this);
        return true;
    })
  });
