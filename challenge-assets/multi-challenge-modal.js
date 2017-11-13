$('#submit-key').unbind('click');
$('#submit-key').click(function (e) {
    e.preventDefault();
    submitkey($('#chal-id').val(), $('#answer-input').val(), $('#nonce').val())
});

$("#answer-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit-key").click();
    }
});

$(".input-field").bind({
    focus: function() {
        $(this).parent().addClass('input--filled' );
        $label = $(this).siblings(".input-label");
    },
    blur: function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('input--filled' );
            $label = $(this).siblings(".input-label");
            $label.removeClass('input--hide' );
        }
    }
});
var content = $('.chal-desc').text();
var decoded = $('<textarea/>').html(content).val()

$('.chal-desc').html(marked(content, {'gfm':true, 'breaks':true}));


$.get("/keynames/"+$('#chalid').val(), function(data) {
    console.log(data);
    var key = `<div class="row submit-row">
                                    <div class="col-md-9" style="padding-right:0px;padding-left:10px;">
                                        <span class="input">
                                            <input class="input-field" type="text" name="answer" id="answer-input" placeholder="Key4" />
                                        </span>

                                        <input id="chal-id" type="hidden" value="{{id}}">
                                    </div>
                                    <div class="col-md-3 key-submit">
                                        <button type="submit" id="submit-key" tabindex="5" class="btn btn-md btn-theme btn-outlined pull-right" style="height:46.375px">Submit</button>
                                    </div>
                                </div>
                                <div class="row notification-row">
                                    <div id="result-notification" class="alert alert-dismissable text-center" role="alert" style="display: none;">
                                      <strong id="result-message"></strong>
                                    </div>
                                </div>`
    for(i = 0; i < data.length; i++) {
        key = `
<div class="row submit-row">
<div class="col-md-9" style="padding-right:0px;padding-left:10px;">
<span class="input">
            <input class="input-field" type="text" name="answer" id="answer-input" placeholder="` + data[i] + `" />
        </span>

        <input id="chal-id" type="hidden" value="{{id}}">
    </div>
    <div class="col-md-3 key-submit">
        <button type="submit" id="submit-key" tabindex="5" class="btn btn-md btn-theme btn-outlined pull-right" style="height:46.375px">Submit4</button>
    </div>
</div>
<div class="row notification-row">
    <div id="result-notification" class="alert alert-dismissable text-center" role="alert" style="display: none;">
      <strong id="result-message"></strong>
    </div>
</div>`


        $("#keylist").append(key);
    }

});
