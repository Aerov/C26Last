/* this is the JavaScript file for the Data Visualization Exercise */
    

    $('#kittens')
    .mouseenter(function(){
      $(this).find('span').text('ok, not kittens')
    })
    .mouseleave(function(){
      $(this).find('span').text('maybe kittens');
    });

    function Card(r, s) {
      this.rank = r; 
      this.suit = s;
      this.toHTML = function() {
        return "<li class='card "+ this.suit +" deck1'>" + this.rank +  "</li>";

      } 
    }
    function Deck() {
      var thisDeck = this;
      this.suits = ['H', 'C', 'D', 'S'];
      this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      $.each(thisDeck.suits, function() {
        var suit = this;
        $.each(thisDeck.ranks, function() {
          var rank = this;
          var card = new Card(rank, suit);
          $('#deck').append(card.toHTML());
        });
      });
    }


/*

   var shuffle = function(m) {
      var rand, $rand;
      rand = Math.floor(Math.random() * m--);

      $( 'li:eq(' + m + ')' )
      .after($('li:eq(' + rand + ')'))
      .insertBefore($('li:eq(' + rand + ')'))
      if(m) {
        setTimeout(shuffle, 1, m);
      }
    };



    
    console.log($('.card').length);


    shuffle($('.card').length);

*/
var deck = new Deck();

var shuffleMove = function(m) {
  var rand, $rand, X=2;
  rand = Math.floor(Math.random() * m--);
  console.log($('li.deck1:eq('+rand+')'));
  $rand = $('li.deck1:eq('+ rand +')')
  .remove()
  .prependTo($('ul.deck2'));
  console.log(rand)
  if(m) {
        setTimeout(shuffleMove, 100, m);
      }

};


shuffleMove($('.card').length);
  

