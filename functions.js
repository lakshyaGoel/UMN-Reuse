/**
 * Created by reiven on 2017/10/17.
 */

module.exports.hbsHelper = function(){
    var hbs = require('express-hbs');

    hbs.registerHelper("input", function(name, type, options){
        /**
         * input helper
         *
         * @param {string} name - label name and the base of id/name attribute value
         * @type: {string} type - input type="text" or "textarea"
         * @options {object} - I did not decide yet. But for the future, maybe we need validation. That time we use this
         *
         *
         * basic usage
         * {{input {text name of the item} {form type}["text"|"textarea"] [required={required label}[true|false]] [placeHolder={placeholder text}] }}
         *
         * property
         * - required
         * - placeHolder
         * - isNum(validate number) # not added this feature but add in the future
         * - notBlank # not added this feature but add in the future
         *
         * usage example(try it if you are tired to read following code)
         *
         * {{input "name" "text" required=false}}
         * {{input "Phone Number" "text" required=true placeHolder="123-4567-8900"}}
         * {{input "Message" "textarea"  placeHolder=""}}
         */

        if(typeof(name) == "string"){
            var label = name.replace(/\s+/, "_");

            console.log("options: ",options.hash.num);

            var requiredText = "";
            if(options.hash.required){
                requiredText = '<p class="help is-danger">' +
                    'This field is required' +
                    '</p>';
            }

            var placeHolder = options.hash.placeHolder;
            if(placeHolder){
                placeHolder = 'placeholder="' + placeHolder + '"';
            }else{
                placeHolder = "";
            }

            var input = '<input class="input" type="text" id="' + label + '" '+ 'name="' + label + '"' + placeHolder + '>';
            if(type == "textarea"){
                input = '<textarea class="textarea" id="' + label + '" '+ placeHolder + '></textarea>';
            }

            return new hbs.SafeString(
                '<div class="field is-horizontal">' +
                '<div class="field-label is-normal">' +
                '<label class="label">'+
                name +
                '</label>' +
                '</div>' +
                '<div class="field-body">' +
                '<div class="field">' +
                '<div class="control">' +
                input +
                '</div>' +
                requiredText +
                '</div>' +
                '</div>' +
                '</div>');
        }else{
            return "";
        }
    });
};