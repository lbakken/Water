function button()
{

    var first_name = document.getElementById('first');
    var last_name = document.getElementById('last');
    var username = document.getElementById('usr');
    var password = document.getElementById('pwd');
    var confirm = document.getElementById('cpwd');

    first_name.onkeyup = function()
    {
        if (username.value.length > 1)
        {
            username.style.borderColor = "Green"

        }
        else {
            username.style.borderColor = "Red"


        }
    };
    last_name.onkeyup = function()
    {
        if (username.value.length > 1)
        {
            username.style.borderColor = "Green"

        }
        else {
            username.style.borderColor = "Red"


        }
    };

    username.onkeyup = function () {
        if (username.value.length > 5)
        {
            username.style.borderColor = "Green"

        }
        else {
            username.style.borderColor = "Red"


        }
    };




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




    };
    confirm.onkeyup = function () {
        var pa = password.value;
        var cc = confirm.value;
        var number = cc.localeCompare(pa);

        if(number == 0) {
            confirm.style.borderColor = "Green";
            enablebutton();
        }
        else
        {
            confirm.style.borderColor = "Red";

        }

    };
    function enablebutton()
    {
        var button = document.getElementById('Reg');
        button.disabled = false;
    };
    }