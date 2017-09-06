$( document ).ready(function() {

    // Variables
    const newListsContainer = $(".newListsContainer ul");

    newListsContainer.html(localStorage.getItem('listItems'));

    /*----------- Functions -----------*/

    /*---- Add item function ----*/
    var addItem = function(){
        var listItem = $("#newListInput"),
            listItemVal = listItem.val();
        if(listItemVal){
    			newListsContainer.append(`<li><input class="checkBox" type="checkbox"><p>${listItemVal}</p><div class="removeBtn">&#10006;</div></li>`);
    			localStorage.setItem('listItems', newListsContainer.html());
    		}
    }
    /*----------------------------*/

    /*---- Input handler ----*/
    function inputFun(){
      const inputVar = $("#newListInput");
      if( !inputVar.val() == "" ){
        addItem();
        inputVar.val("")
        inputVar.focus();
      }
    }
    /*-----------------------*/

    /*----------- /Functions -----------*/

    /*---- Local storage support checking ----*/
    if(typeof(Storage)!=="undefined"){

      /*---- Add new list button & key event ----*/
      $("#toDoBtn").on("click", function(){
        inputFun();
      });
      $('#newListInput').keyup(function(e){
          if (e.keyCode === 13) { inputFun(); }
      });
      /*----------------------------------------*/

      /*---- checkbox change ----*/
      $(document).on('change', '.checkBox', function(){
        if($(this).attr('checked')){
          $(this).removeAttr('checked');
        }
        else{
          $(this).attr('checked', 'checked');
        }
        $(this).parent().toggleClass('done');
        localStorage.setItem('listItems', newListsContainer.html());
      });
      /*--------------------------*/

      /*---- Remove list button event ----*/
      $(document).on('click', '.removeBtn', function(){
        $(this).parent().addClass("remove");
        setTimeout( () => {
          $(this).parent().remove();
          localStorage.setItem('listItems', newListsContainer.html());
        }, 350);
      });
      /*-----------------------------------*/
    }
    else{ newListsContainer.append("Sorry! No Web Storage support"); }
    /*---- /Local storage support checking ----*/

    console.log( "ready!" );
});
