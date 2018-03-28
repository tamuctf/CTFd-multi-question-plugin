// Markdown Preview
$('#desc-edit').on('shown.bs.tab', function (event) {
    if (event.target.hash == '#desc-preview'){
        $(event.target.hash).html(marked($('#desc-editor').val(), {'gfm':true, 'breaks':true}));
    }
});
$('#new-desc-edit').on('shown.bs.tab', function (event) {
    if (event.target.hash == '#new-desc-preview'){
        $(event.target.hash).html(marked($('#new-desc-editor').val(), {'gfm':true, 'breaks':true}));
    }
});
$('#solve-attempts-checkbox').change(function() {
    if(this.checked) {
        $('#solve-attempts-input').show();
    } else {
        $('#solve-attempts-input').hide();
        $('#max_attempts').val('');
    }
});

var count = 1;
$("#add-new-question").click(function () {
    var key = `<div class="form-group">
        <label>Flag
            <i class="far fa-question-circle text-muted cursor-help" data-toggle="tooltip" data-placement="right" title="This is the flag or solution for your challenge. You can choose whether your flag is a static string or a regular expression."></i>
        </label>
        <input type="text" class="form-control" name="key_name[` + count + `]" placeholder="Enter Key Name">
        <input type="text" class="form-control" name="key_solution[` + count + `]" placeholder="Enter Key Solution">
    </div>
        <div class="form-group">
            <select class="custom-select" name="key_type[` + count + `]">
                <option value="static">Static</option>
                <option value="regex">Regex</option>
            </select>
        </div>
    </div>`

    $('#key-list').append(key);
    count += 1;
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
