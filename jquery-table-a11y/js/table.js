(function($){
  function announceCount(){
    var rows = $('#tbl tbody tr:visible').length;
    $('#live').text(rows + ' Ergebnisse');
  }

  $('#q').on('input', function() {
    var t = $(this).val().toString().toLowerCase();
    $('#tbl tbody tr').each(function(){
      var text = $(this).text().toLowerCase();
      $(this).toggle(text.includes(t));
    });
    announceCount();
  });

  $('#tbl').on('keydown', 'td,th', function(e){
    var $cell = $(this);
    var $row = $cell.parent();
    var $rows = $('#tbl tbody tr');
    var colIndex = $cell.index();
    var rowIndex = $rows.index($row);

    var next;
    if (e.key === 'ArrowRight') next = $row.children().eq(Math.min(colIndex+1, $row.children().length-1));
    if (e.key === 'ArrowLeft')  next = $row.children().eq(Math.max(colIndex-1, 0));
    if (e.key === 'ArrowDown')  next = $rows.eq(Math.min(rowIndex+1, $rows.length-1)).children().eq(colIndex);
    if (e.key === 'ArrowUp')    next = $rows.eq(Math.max(rowIndex-1, 0)).children().eq(colIndex);
    if (next && next.length) { next.attr('tabindex', 0).focus(); e.preventDefault(); }
  });

  announceCount();
})(jQuery);