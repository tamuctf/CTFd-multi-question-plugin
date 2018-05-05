window.challenge.renderer = new markdownit({
    html: true,
});

window.challenge.preRender = function(){
};

window.challenge.render = function(markdown){
    return window.challenge.renderer.render(markdown);
};

window.challenge.postRender = function(){
    $.get("/keynames/"+$('#chal-id').val(), function(data) {

        console.log(data);

        data.sort();

        for(i = 0; i < data.length; i++) {
            key = `<div class="row submit-row">
                        <div class="col-md-9 form-group">
                            <input class="form-control" type="text" name="answer" id="answer-input` + i +`" placeholder="` + data[i] + `" />
                        </div>
                        <div class="col-md-3 form-group key-submit">
                            <button  name="` + i + `" type="submit" id="submit-key` + i + `" tabindex="5" class="btn btn-md btn-outline-secondary float-right">Submit</button>
                        </div>
                    </div>
                    <div class="row notification-row">
                        <div class="col-md-12">
                            <div id="result-notification` + i + `" class="alert alert-dismissable text-center w-100" role="alert" style="display: none;">
                              <strong id="result-message` + i + `"></strong>
                            </div>
                        </div>
                    </div>`
            $("#keylist").append(key);

            $('#submit-key' + i).unbind('click');
            $('#submit-key' + i).click(function (e) {
                e.preventDefault();
                j = this.name;

                submitkeynew($('#chal-id').val(), $('#answer-input' + j).val(), $('#nonce').val(), j, $('#answer-input' + j).attr('placeholder'));
            });
        }

    });

};

function submitkeynew(chal, key, nonce, count, keyname) {
    console.log(count);
    console.log(keyname);
    $('#submit-key' + count).addClass("disabled-button");
    $('#submit-key' + count).prop('disabled', true);
    $.post(script_root + "/chal/" + chal, {
        key: key,
        nonce: nonce,
        keyname: keyname,
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
