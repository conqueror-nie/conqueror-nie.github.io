/*搜索设置页面js*/
$(function(){
	$( '.operate .save' ).click( function(){
        $( '.save_a' ).show().delay(2000).hide(0)
    })
    $( document).ready( function(){
        $( '.check .tab li').click( function(){
            $( '.check .tab li').removeClass( 'on' );
            $( this).addClass( 'on' )
        })
    })

    
});