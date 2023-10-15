  
    if (activeLink == "/auth/login" || activeLink == "/ru/auth/login" || activeLink == "/en/auth/login") {
        document.querySelector(".login-form").onsubmit = function(e) {
            if (document.querySelector(".form-error-field")) document.querySelector(".form-error-field").remove();
            let block = $('.login-last-div')
            e.preventDefault()
            $.ajax({
                type: "post",
                url: activeLink,
                data: {
                    "email": $('.login-page-email-field').val(),
                    "password": $('.login-page-password-field').val(),
                },
                dataType: 'JSON',
                success: function(data) {
                    console.log(data)
                    window.location.href = data.link
                },
                error: function(data) {
                    block.after(`<div class="form-error-field">${data.responseJSON.message}</div>`)
                    console.warn(data)
                }
            }).done(function() {
                // hide spinner
                $('#loading').hide();
            });
            return false
        }
    }

    if (activeLink == "/auth/register" || activeLink == "/ru/auth/register" || activeLink == "/en/auth/register") {

        // document.querySelector('.private_policy_checkbox').onchange = function() {
        //     if (this.checked) {
        //         document.querySelector('.register_btn').removeAttribute("disabled");
        //     } else document.querySelector('.register_btn').setAttribute("disabled", true);
        // }
        document.querySelector(".register-form").onsubmit = function(e) {
            document.querySelector('.register_btn').setAttribute("disabled", true);
            if (document.querySelector(".form-error-field")) document.querySelector(".form-error-field").remove();
            let block = $('.sign-up-last-block')
            if(!document.querySelector('.private_policy_checkbox').checked){
                let text 
                switch (lang) {
                    case 'uk':
                        text = "Для реєстрації потрібно прийняти Правила користування"
                        break;
                    case 'uk':
                        text = "Для регистрации необходимо принять Правила пользования"
                        break;
                    case 'uk':
                        text = "For registration accept private policy is required"
                        break;
                    default:
                        break;
                }
                block.after(`<div class="form-error-field">${text}</div>`)
                document.querySelector('.register_btn').removeAttribute("disabled");
                e.preventDefault()
                return false
            }
            if (document.querySelector(".form-error-field")) document.querySelector(".form-error-field").remove();
            let name = $('.register-page-name-field').val()
            name = name.split(" ")
            e.preventDefault()
            $.ajax({
                type: "post",
                url: activeLink,
                data: {
                    "first_name": name[0],
                    "last_name": name[1],
                    "email": $('.register-page-email-field').val(),
                    "phone_number": $('.register-page-phone-field').val(),
                    "password": $('.register-page-password-field').val(),
                    "confirm_password": $('.register-page-password-confirm-field').val(),
                },
                dataType: 'JSON',
                success: function(data) {
                    window.location.href = "/auth/register/success"
                    document.querySelector('.register_btn').removeAttribute("disabled");
                },
                error: function(data) {
                    block.after(`<div class="form-error-field">${data.responseJSON.message}</div>`)
                    document.querySelector('.register_btn').removeAttribute("disabled");
                }
            }).done(function() {
                // hide spinner
                $('#loading').hide();
            });
            return false
        }
    }

    if (activeLink == "/auth/recover-password" || activeLink == "/ru/auth/recover-password" || activeLink == "/en/auth/recover-password") {
        document.querySelector(".recover_password_form").onsubmit = function(e) {
            if (document.querySelector(".form-error-field")) document.querySelector(".form-error-field").remove();
            let block = $('.recovery-last-div')
            e.preventDefault()
            $.ajax({
                type: "post",
                url: activeLink,
                data: {
                    "phone": $('.recover_password_phone_field').val(),
                },
                dataType: 'JSON',
                success: function(data) {
                    window.location.href = `/auth/verificationForgotPasswordCode/${data.phone}`
                },
                error: function(data) {
                    block.after(`<div class="form-error-field">${data.responseJSON.message}</div>`)
                    console.warn(data)
                }
            }).done(function() {
                // hide spinner
                $('#loading').hide();
            });
            return false
        }
    }


    if (document.querySelector('.verify_password_recover')) {
        document.querySelector(".verify_password_recover").onsubmit = function(e) {
            if (document.querySelector(".form-error-field")) document.querySelector(".form-error-field").remove();
            let block = $('.verify-last-div')
            e.preventDefault()
            $.ajax({
                type: "post",
                url: "/auth/verificationForgotPasswordCode",
                data: {
                    "code": $('.verify_password_recover_code_field').val(),
                    "phone": $('.verify_password_recover_code_field').data("phone")
                },
                dataType: 'JSON',
                success: function(data) {
                    window.location.href = `/auth/passwordRecovery/${data.phone}/${data.code}`
                },
                error: function(data) {
                    block.after(`<div class="form-error-field">${data.responseJSON.message}</div>`)
                    console.warn(data)
                }
            }).done(function() {
                // hide spinner
                $('#loading').hide();
            });
            return false
        }
    }

    if (document.querySelector('.reset_pass_form')) {
        document.querySelector(".reset_pass_form").onsubmit = function(e) {
            if (document.querySelector(".form-error-field")) document.querySelector(".form-error-field").remove();
            let block = $('.reset-pass-last-block')
            e.preventDefault()
            $.ajax({
                type: "post",
                url: `/auth/passwordRecovery`,
                data: {
                    "code": $('.reset_password_btn').data("code"),
                    "phone": $('.reset_password_btn').data("phone"),
                    "new_password": $('.reset_pass_form_password').val(),
                    "confirm_new_password": $('.reset_confirm_pass_form_password').val()
                },
                dataType: 'JSON',
                success: function(data) {
                    window.location.href = `/auth/passwordRecoverySuccess`
                },
                error: function(data) {
                    block.after(`<div class="form-error-field">${data.responseJSON.message}</div>`)
                    console.warn(data)
                }
            }).done(function() {
                // hide spinner
                $('#loading').hide();
            });
            return false
        }
    }