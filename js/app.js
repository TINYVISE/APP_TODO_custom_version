/*
TYNYVISE.COM
----------------------------------------------------
Auteur: Juan C Gutierrez
Date:   Août 2018
----------------------------------------------------
*/

var TINYVISE = TINYVISE || {};

TINYVISE.app = ( function( doc ) {

    var taskInputForm   = doc.getElementById( 'taskInputForm' ),
        taskInput       = doc.getElementById( 'taskInput' ),
        taskList        = doc.getElementById( 'taskList' ),
        clearAll        = doc.getElementById( 'clearAll' ),
        modal           = doc.getElementById( 'modal' ),
        popup           = doc.getElementById( 'popup' ),
        wrapper         = doc.getElementById( 'wrapper' ),
        confirmYes      = doc.getElementById( 'confirmYes' ),
        confirmNo       = doc.getElementById( 'confirmNo' ),
        filterBox       = doc.getElementById( 'filterBox' ),
        footer          = doc.querySelector( 'footer' );

    //--------------------------------------------------

    function _setEvents() {

        taskInputForm.addEventListener( 'submit', _taskInputFormFunc );
        taskList.addEventListener( 'click', _removeTast );
        clearAll.addEventListener( 'click', _clearAllFunc );
        confirmYes.addEventListener( 'click', _confirmYesFunc );
        confirmNo.addEventListener( 'click', _closePopup );
    }

    //--------------------------------------------------

    var _centerElem = function( el, centerTo ) {
        
        var marginTop = parseInt( el.clientHeight, 10 ) / 2,
            marginLeft = parseInt( el.clientWidth, 10 ) / 2;

        var theLeft = ( parseInt( centerTo.clientWidth, 10 ) / 2 ) - marginLeft;
        var theTop = ( parseInt( centerTo.clientHeight, 10 ) / 2 ) - marginTop;

        el.style.top = theTop + 'px';
        el.style.left = theLeft + 'px';
    };

    //--------------------------------------------------

    function _taskInputFormFunc( e ) {

        e.preventDefault();

        if( taskInput.value === '' ) {
            alert( 'type something' );
            return;
        }

        let li      = doc.createElement( 'li' );
        let div     = doc.createElement( 'div' );
        let span    = doc.createElement( 'span' );
        let i       = doc.createElement( 'i' );
        let txt     = doc.createTextNode( taskInput.value );

        span.appendChild( txt )
        div.appendChild( span );
        div.appendChild( i );
        li.appendChild( div );
        taskList.appendChild( li );

        taskInput.value = '';
        
        _fullListShowElements();
    }

    //--------------------------------------------------

    var liToRemove;

    function _removeTast( e ) {

        liToRemove = e.target.parentElement.parentElement;

        if( e.target.nodeName === 'I' ) {

            _popup();
        }
    }

    function _popup() {

        modal.setAttribute( 'class', 'blur' );
        popup.style.display = 'block';
        _centerElem( popup, wrapper ); 
    }

    function _confirmYesFunc() {

        liToRemove.remove();
        _closePopup();
    }

    function _closePopup() {

        modal.removeAttribute( 'class' );
        popup.style.display = 'none';

        _emptyListHideElements();
    }

    //--------------------------------------------------

    function _fullListShowElements() {

        filterBox.style.display = 'block'; 
        clearAll.style.display = 'block';
        taskList.style.display = 'block';
        footer.style.display = 'block';
    }

    //--------------------------------------------------

    function _emptyListHideElements() {

        if( !taskList.hasChildNodes() ) {

            taskInput.value = '';
            filterBox.style.display = 'none'; 
            clearAll.style.display = 'none'; 
            taskList.style.display = 'none';
            footer.style.display = 'none';
        }
    }

    //--------------------------------------------------

    function _clearAllFunc( e ) {

        while( taskList.firstChild ) {

            taskList.removeChild( taskList.firstChild );
        }

        _emptyListHideElements();
    }

    //--------------------------------------------------

    function _init() {

        _setEvents();
    }

    //--------------------------------------------------

    return {
        init: _init
    }

})( document );

TINYVISE.app.init();