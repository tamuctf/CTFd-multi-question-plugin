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
    var key = `<div class="row">
                <div class="col-md-8">
                    <label for="key">Key
                        <i class="fa fa-question-circle gray-text" data-toggle="tooltip" data-placement="right" title="This is the flag/solution for the challenge."></i>
                    </label>
                    <input type="text" class="form-control" name="key_name[` + count + `]" placeholder="Enter Key Name">
                    <input type="text" class="form-control" name="key_solution[` + count + `]" placeholder="Enter Key Solution">
                </div>
                <div class="form-vertical">
                    <div class="col-md-2">
                        <div class="radio">
                            <label>
                                <input type="radio" name="key_type[` + count + `]" value="static" checked>
                                Static
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="key_type[` + count + `]" value="regex">
                                Regex
                            </label>
                        </div>
                    </div>
                </div>
            </div>`

    $('#key-list').append(key);
    count += 1;
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
