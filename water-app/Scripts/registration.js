function openModal()
{
    var first_name = document.getElementById('first');
    var last_name = document.getElementById('last');
    var username = document.getElementById('usr');
    var password = document.getElementById('pwd');
    var confirm = document.getElementById('cpwd');

    password.onkeyup = function()
    {
        console.log("hello");
        var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
        var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
        var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
        var minLength = 8; // : Change the minimum length to what what it needs to be in the question

        if(password.value.match(lowerCaseLetters))
        {
            password.style.borderColor = "Green";
        }
        else
        {
            password.style.borderColor = "RED";
        }

        if(password.value.match(upperCaseLetters))
        {
            password.style.borderColor = "Green";
        }
        else
        {
            password.style.borderColor = "RED";
        }

        if(password.value.match(numbers))
        {
            password.style.borderColor = "Green";
        }
        else
        {
            password.style.borderColor = "RED";
        }
        if(password.value.match(minLength))
        {
            password.style.borderColor = "Green";
        }
        else
        {
            password.style.borderColor = "RED";
        }




    }



}