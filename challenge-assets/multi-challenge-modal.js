$('#submit-key0').unbind('click');
$('#submit-key0').click(function (e) {
    e.preventDefault();
    console.log(e);
    submitkey($('#chalid').val(), $('#answer-input0').val(), $('#nonce').val())
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

function submitkeynew(chal, key, nonce, count, keyname) {
    console.log(count);

    $('#submit-key' + count).addClass("disabled-button");
    $('#submit-key' + count).prop('disabled', true);
    $.post(script_root + "/chal/" + chal, {
        keyname: keyname,
        key: key,
        nonce: nonce
    }, function (data) {
        var result = $.parseJSON(JSON.stringify(data));

        var result_message = $('#result-message' + count);
        var result_notification = $('#result-notification' + count);
        var answer_input = $("#answer-input" + count);
        result_notification.removeClass();
        result_message.text(result.message);

        if (result.status == -1){
          window.location = script_root + "/login?next=" + script_root + window.location.pathname + window.location.hash
          return
        }
        else if (result.status == 0){ // Incorrect key
            result_notification.addClass('alert alert-danger alert-dismissable text-center');
            result_notification.slideDown();

            answer_input.removeClass("correct");
            answer_input.addClass("wrong");
            setTimeout(function () {
                answer_input.removeClass("wrong");
            }, 3000);
        }
        else if (result.status == 1){ // Challenge Solved
            result_notification.addClass('alert alert-success alert-dismissable text-center');
            result_notification.slideDown();

            $('.chal-solves').text((parseInt($('.chal-solves').text().split(" ")[0]) + 1 +  " Solves") );

            answer_input.val("");
            answer_input.removeClass("wrong");
            answer_input.addClass("correct");
        }
        else if (result.status == 2){ // Challenge already solved
            result_notification.addClass('alert alert-info alert-dismissable text-center');
            result_notification.slideDown();

            answer_input.addClass("correct");
        }
        else if (result.status == 3){ // Keys per minute too high
            result_notification.addClass('alert alert-warning alert-dismissable text-center');
            result_notification.slideDown();

            answer_input.addClass("too-fast");
            setTimeout(function() {
                answer_input.removeClass("too-fast");
            }, 3000);
        }
        marksolves();
        updatesolves();
        setTimeout(function(){
          $('.alert').slideUp();
          $('#submit-key' + count).removeClass("disabled-button");
          $('#submit-key' + count).prop('disabled', false);
        }, 3000);
    })
}

$.get("/keynames/"+$('#chalid').val(), function(data) {
    console.log(data);

    for(i = 0; i < data.length; i++) {
        key = `
        <div class="row submit-row">
            <div class="col-md-9" style="padding-right:0px;padding-left:10px;">
                <span class="input">
                    <input class="input-field" type="text" name="answer" id="answer-input` + i + `" placeholder="` + data[i] + `" />
                </span>
            </div>
            <div class="col-md-3 key-submit">
                <button name="` + i + `" type="submit" id="submit-key` + i + `" tabindex="5" class="btn btn-md btn-theme btn-outlined pull-right" style="height:46.375px">Submit</button>
            </div>
        </div>
        <div class="row notification-row">
            <div id="result-notification` + i + `" class="alert alert-dismissable text-center" role="alert" style="display: none;">
              <strong id="result-message` + i + `"></strong>
            </div>
        </div>`


        $("#keylist").append(key);

        $('#submit-key' + i).unbind('click');
        $('#submit-key' + i).click(function (e) {
            e.preventDefault();
//            console.log(this.name);
//            console.log(i);
            j = this.name;
            submitkeynew($('#chalid').val(), $('#answer-input' + j).val(), $('#nonce').val(), j, $('#answer-input' + j).placeholder);
        });
    }

});

