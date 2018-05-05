// Markdown Preview
$('#desc-edit').on('shown.bs.tab', function (event) {
    var md = window.markdownit({
        html: true,
    });
    if (event.target.hash == '#desc-preview'){
        var editor_value = $('#desc-editor').val();
        $(event.target.hash).html(
            md.render(editor_value)
        );
    }
});

$('#new-desc-edit').on('shown.bs.tab', function (event) {
    var md = window.markdownit({
        html: true,
    });
    if (event.target.hash == '#new-desc-preview'){
        var editor_value = $('#new-desc-editor').val();
        $(event.target.hash).html(
            md.render(editor_value)
        );
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
