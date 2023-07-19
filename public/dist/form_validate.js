function Validator(options) {

    var formElement = document.querySelector(options.form)

    var selectorRules = {}

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage
        var rules = selectorRules[rule.selector]

        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break
        }

        if (errorMessage) {
            showError(errorElement, errorMessage)
        } else {
            showNotError(errorElement)
        }

        return !errorMessage
    }

    function showError(errorElement, errorMessage) {
        errorElement.innerText = errorMessage
    }
    function showNotError(errorElement) {
        errorElement.innerText = ''
    }


    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault()

            var isFormValid = true

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)

                if (!isValid) {
                    isFormValid = false
                }
            })

            if (isFormValid) {

            } else {

            }
        }


        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = inputElement.parentElement.querySelector('.form-message')

            // Lưu rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                inputElement.oninput = function () {
                    showNotError(errorElement)
                }
            }
        })

    }

}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    }
}

Validator.isRequiredWithMessage = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message
        }
    }
}

Validator.isPositive = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            value = Number(value)
            return value > 0 ? undefined : 'Số người phải là số dương'
        }
    }
}

Validator.isValidatedDate = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return Date.parse(value) > Date.now() ? undefined : 'Vui lòng nhập ngày hợp lệ'
        }
    }
}


