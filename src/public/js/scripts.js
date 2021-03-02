
$('#post-comment').hide();
$('#btn-toggle-comment').click(e =>{
    e.preventDefault();
    $('#post-comment').slideToggle();
});

$('#btn-like').click(function(e){
    e.preventDefault();
    let imgId = $(this).data('id');

    $.post('/images/' + imgId + '/like')
        .done(data => {
            $('.likes-count').text(data.likes);
        });
});

$('#btn-delete').click(function(e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('La imagen se eliminara ¿Estas Seguro?');
    if (response) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
        .done(function (result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Eliminado!</span>');
        });
    }
});