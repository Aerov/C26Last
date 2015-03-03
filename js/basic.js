/* 
Robert Vets
Feb28, 2015
Code Fellows C26, Final Assignment
this is JavaScript for the Data Visualization Exercise */

var deck;

/*intro*/
$('#kittens')
.mouseenter(function(){
  $(this).find('span').text('maybe kittens')
})
.mouseleave(function(){
  $(this).find('span').text('OK, not kittens');
});
      
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
  $('div#game1').remove();
  $('div#play').css('visibility','visible');
});

$('#play').on('click', function(){
  console.log('take that');
  playHand();
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
  /*console.log($('li.deck1:eq('+ rand +')'));*/
  $rand = $('li.card:eq('+ rand +')')
  .remove()
  .prependTo($('ul.deck2'));
  console.log(rand)
  if(m) {
    setTimeout(shuffleMove, 10, m);
  }
}

var dealCards = function(){
  /* dealCards deals the dealt cards to two player, one at the right side, one on the left
  the cards are drawn from the back of the deck*/
  var $dealto, m;
  m = ($('.card').length) - 1;
  console.log('ive been called ' + m);
  for (var i = m ; i >= 0; i -= 2){
    console.log(i);
    $dealto = $('.deck2 li:eq('+ i +')')
    .remove()
    .prependTo($('ul.handR'));
    console.log($('li #deck:eq('+ i +')'));
  };
}

var playHand = function(){
  console.log('cmon granny play');
  var $lhCsuit, $rhCsuit;
  $lhCsuit = $('ul.handR li:eq(0)').text();
  $rhCsuit = $('ul.deck2 li:eq(0)').text();
  console.log($lhCsuit,$rhCsuit);
  throwCard();
  checkHand($lhCsuit, $rhCsuit);

  /* Need to check if the game is over or Not */
}

var throwCard = function(){
  var $rhCard, $lhCard;
  $lhCard = $('ul.handR li:eq(0)')
  .remove()
  .addClass('inplay')
  .prependTo($('#table'));
  $rhCard = $('ul.deck2 li:eq(0)')
  .remove()
  .addClass('inplay')
  .prependTo($('#table'));
  console.log('take that!');
}

/* this is an array of simple objects */
var values = [
{ rank: 'A', value: 14 },
{ rank: 'K', value: 13 },
{ rank: 'Q', value: 12 },
{ rank: 'J', value: 11 },
{ rank: '10', value: 10 },
{ rank: '9', value: 9 },
{ rank: '8', value: 8 },
{ rank: '7', value: 7 },
{ rank: '6', value: 6 },
{ rank: '5', value: 5 },
{ rank: '4', value: 4 },
{ rank: '3', value: 3 },
{ rank: '2', value: 2 },
{ rank: '1', value: 1 },
]

var checkHand = function(lhCard,rhCard){
  console.log(lhCard);
  var $theTake,lhVal, rhVal;
  var m = values.length;  
  for (var i = 0; i<m; i++){
    var check = values[i].rank;
    if(lhCard == values[i].rank){
      lhVal = values[i].value;
      console.log(lhVal);
    }
    if(rhCard == values[i].rank){
      rhVal = values[i].value;
      console.log(rhVal);
    }
  };
  if (lhVal - rhVal > 0){
    console.log('granny took it');
    $theTake = $('#table .inplay')
    .remove()
    .removeClass('.inplay')
    .prependTo($('ul.handR'));
  };
  if (lhVal - rhVal < 0){
    console.log('you took it');
    $theTake = $('#table .inplay')
    .remove()
    .removeClass('.inplay')
    .prependTo($('ul.deck2'));
  };
  if (lhVal - rhVal == 0){
    console.log('WAR');
    WAR();
  };
}

var WAR = function (){
    throwCard();
    throwCard();
    throwCard();
    playHand();
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

