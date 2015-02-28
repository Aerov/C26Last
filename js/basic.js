/* this is the JavaScript file for the Data Visualization Exercise */
/*


  */

var deck;

$('#kittens')
.mouseenter(function(){
  $(this).find('span').text('ok, not kittens')
})
.mouseleave(function(){
  $(this).find('span').text('maybe kittens');
});
/*
$(document).ready(function(){ -----  });
  */
     
$('#start').on('click', function(){
  deck = new Deck(); 
  $('#start')
  .attr({id:'other'})
  .addClass('newst')
  .off('click');
  $('div#introstep').remove();
  $('div#shufflestep').css('visibility','visible');
});

$('#shffl').on('click', function(){
  console.log('ive been clicked dang it');
  shuffleMove($('.card').length);
  $('div#shufflestep').remove();
  $('div#game1').css('visibility','visible');
});

$('#deal').on('click', function(){
  console.log('dealin with the shizzle');
  dealCards($('.card').length);
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
  console.log('newdeck');
}

var shuffleMove = function(m) {
  var rand, $rand;
  rand = Math.floor(Math.random() * m--);
  console.log($('li.deck1:eq('+ rand +')'));
  $rand = $('li.deck1:eq('+ rand +')')
  .remove()
  .prependTo($('ul.deck2'));
  console.log(rand)
  if(m) {
    setTimeout(shuffleMove, 10, m);
  }
};
/*
var dealCards = function(m) {
  console.log('more shizzle')
  var $deal;
  for (var i = 1; i <= m; i +2 ){
    $deal = $('li.deck2:eq('+ i +')')
    .remove()
    .prependTo($('ul.deck1'));
  };
}
/* this is the shuffle code from class....
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
    var deck = new Deck();
    console.log($('.card').length);
    shuffle($('.card').length);
*/

