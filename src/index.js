// Gender id Extracting 
let male = document.getElementById('optMale');
let female = document.getElementById('optFemale');
let age = 0;
let height ="feet";
let feet = 0;
let inch = 0;
let cm = 0;
let weight = 0;
let preweight =0;
let meters;

function validateNumericInput(inputElement) {
    // Remove non-numeric characters from the input value
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
    
}

function validateNumericInputInch(inputElement) {
    // Remove non-numeric characters from the input value
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    // Ensure the value does not exceed 12
    if (parseInt(inputElement.value) > 12) {
        inputElement.value = '12';
    }
}

function genderCheck(){
    if(male.checked) {
        document.getElementById("gender-body").style.display="block";
        document.getElementById("img-gender").src = "/public/images/boy.jpg";
    } 
    if(female.checked) {
        document.getElementById("gender-body").style.display="block";
        document.getElementById("img-gender").src = "/public/images/girl.jpg";
    } 
}

function CentimeterClick(){
    document.getElementById('height-cms').style.display="block";
    document.getElementById('height-feet').style.display="none";  
    height = "cm"; 
}
function InchClick(){
    document.getElementById('height-cms').style.display="none";
    document.getElementById('height-feet').style.display="block";   
    height = "feet"; 
}


function HeightMeter() {
    if (height === 'feet') {
        feet = document.getElementById('txtFt').value;
        inch = document.getElementById('txtIn').value;
        meters = (feet * 0.3048) + (inch * 0.0254);

        // Call the animation function
        animateMeterIncrease(0, meters);
    } else if (height === 'cm') {
        cm = document.getElementById('txtCm').value;
        meters = cm / 100;

        // Call the animation function
        animateMeterIncrease(0, meters);
    }
}

function animateMeterIncrease(startValue, targetValue) {
    const duration = 500; // Animation duration in milliseconds
    const startTime = performance.now();

    function update() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        meters = startValue + (targetValue - startValue) * progress;

        document.querySelector('.height').innerHTML = getFormattedHeightText(feet, inch, meters);

        document.getElementById('heightmeter').value = meters;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function getFormattedHeightText(feet, inch, meters) {
    if (height === 'feet') {
        return `${feet} Ft ${inch} In <br>= ${meters.toFixed(2)} m`;
    } else if (height === 'cm') {
        return `${cm} cm = ${meters.toFixed(2)} m`;
    }
}



function WeightMeter() {
    weight = document.getElementById('txtWeight').value;

    // Call the animation function
    animateWeightIncrease(0, weight);

    preweight = weight;
    // Validate and display weight message if needed
    if (!weight) {
        document.getElementById('weight-msg').innerHTML = "Please enter Weight";
        document.getElementById('weight-msg').style.color = 'red';
    } else {
        document.getElementById('weight-msg').innerHTML = "";
    }
}

function animateWeightIncrease(startValue, targetValue) {
    const duration = 1000; // Animation duration in milliseconds
    const startTime = performance.now();

    function update() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        weight = startValue + (targetValue - startValue) * progress;
        weight = parseFloat(weight.toFixed(2)); // Round to 2 decimal places

        document.querySelector('.weight').innerHTML = weight + " KG ";

        document.getElementById('weightmeter').value = weight;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function calculateBMI() {
    feet = document.getElementById('txtFt').value;
    inch = document.getElementById('txtIn').value;
    cm = document.getElementById('txtCm').value;
    weight = document.getElementById('txtWeight').value;
    age = document.getElementById('txtYears').value;


    let BMI = (weight / (meters * meters)).toFixed(2);

    let val = document.querySelector('.display-val');
    let underwight = "<span class='text-secondary fs-1 fw-bolder'>"+BMI+"</span>";
    let normalweight = "<span class='text-success fs-1 fw-bolder'>"+BMI+"</span>";
    let overweight = "<span class='text-warning fs-1 fw-bolder'>"+BMI+"</span>";
    let obseseweight = "<span class='text-danger fs-1 fw-bolder'>"+BMI+"</span>";

    if(!male.checked && !female.checked){
        document.getElementById('gender-msg').innerHTML = "Please select gender";
        document.getElementById('gender-msg').style.color = 'red';
    }
    if(male.checked || female.checked){
        document.getElementById('gender-msg').innerHTML = "";
    }

    if (age < 2) {
        document.getElementById('age-msg').innerHTML = "Age should be above 2 years";
        document.getElementById('age-msg').style.color = 'red';
    }
    if(age <= 0){
        document.getElementById('age-msg').innerHTML = "Please enter valid age";
        document.getElementById('age-msg').style.color = 'red';
    }
    if(age >= 2){
        document.getElementById('age-msg').innerHTML = "above 2 years";
        document.getElementById('age-msg').style.color = 'black';
    }
    if (height == "feet") {
        if (!feet && !inch) {
            document.getElementById('feet-msg').innerHTML = "Please enter height";
            document.getElementById('feet-msg').style.color = 'red';
        } else {
            document.getElementById('feet-msg').innerHTML = ""; 
        }
    } 
    
    if (height == "cm") {
        if (!cm) {
            document.getElementById('cm-msg').innerHTML = "Please enter height";
            document.getElementById('cm-msg').style.color = 'red';
        } else {
            document.getElementById('cm-msg').innerHTML = "";
        }
    }
    
    if (!weight) {
        document.getElementById('weight-msg').innerHTML = "Please enter Weight";
        document.getElementById('weight-msg').style.color = 'red';
    } 
    if (weight) {
        document.getElementById('weight-msg').innerHTML = ""; 
    }

    // this is the calculation for adults(over the age of 20) 
    if(height == "feet") {
        if(age && (feet || inch) && weight){
            if(age > 20) {
                if (BMI < 18.5) {
                    val.innerHTML = underwight;
                    setProgressDefalut();
                    underWeightStyle();
                }
                else if (BMI >= 18.5 && BMI < 25) {
                    val.innerHTML = normalweight;
                    setProgressDefalut();
                    normalWeightStyle();
                }
            
                else if (BMI >= 25 && BMI < 30) {
                    val.innerHTML = overweight;
                    setProgressDefalut();
                    overWeightStyle();
                }
                else if (BMI >= 30) {
                    val.innerHTML = obseseweight;
                    setProgressDefalut();
                    obseseWeightStyle();
                }
            }
            
             // this is the calculation for children(under the age of 20) 
            else if(age <= 20){
                if(male.checked) {
                    // for boys child underwight 5 percentile
                    if (
                        (age == 2 && BMI < 14.7)||
                        (age == 3 && BMI < 14.4)||
                        (age == 4 && BMI < 14)||
                        (age == 5 && BMI < 13.8)||
                        (age == 6 && BMI < 13.75)||
                        (age == 7 && BMI < 13.7)||
                        (age == 8 && BMI < 13.8)||
                        (age == 9 && BMI < 13.93)||
                        (age == 10 && BMI < 14.2)||
                        (age == 11 && BMI < 14.5)||
                        (age == 12 && BMI < 14.99)||
                        (age == 13 && BMI < 15.4)||
                        (age == 14 && BMI < 16)||
                        (age == 15 && BMI < 17)||
                        (age == 16 && BMI < 17.1)||
                        (age == 17 && BMI < 17.7)||
                        (age == 18 && BMI < 18.2)||
                        (age == 19 && BMI < 18.65)||
                        (age == 20 && BMI < 19.17)
                        ){
                            val.innerHTML = underwight;
                            setProgressDefalut();
                            underWeightStyle();
                    }
        
                    // for boys child nrml weight 5-85 percentile
                    if (
                        (age == 2 && BMI >= 14.7 && BMI < 18.2)||
                        (age == 3 && BMI >= 14.4 && BMI < 17.48)||
                        (age == 4 && BMI >= 14 && BMI < 16.9)||
                        (age == 5 && BMI >= 13.8 && BMI < 16.82)||
                        (age == 6 && BMI >= 13.75 && BMI < 17)||
                        (age == 7 && BMI >= 13.7 && BMI < 17.4)||
                        (age == 8 && BMI >= 13.8 && BMI < 17.97)||
                        (age == 9 && BMI >= 13.93 && BMI < 18.6)||
                        (age == 10 && BMI >= 14.2 && BMI < 19.38)||
                        (age == 11 && BMI >= 14.5 && BMI < 20.2)||
                        (age == 12 && BMI >= 14.99 && BMI < 21)||
                        (age == 13 && BMI >= 15.4 && BMI < 21.8)||
                        (age == 14 && BMI >= 16 && BMI < 22.6)||
                        (age == 15 && BMI >= 17 && BMI < 21.4)||
                        (age == 16 && BMI >= 17.1 && BMI < 24.2)||
                        (age == 17 && BMI >= 17.7 && BMI < 24.95)||
                        (age == 18 && BMI >= 18.2 && BMI < 25.6)||
                        (age == 19 && BMI >= 18.65 && BMI < 26.3)||
                        (age == 20 && BMI >= 19.17 && BMI < 27.1)
                        ){
                            val.innerHTML = normalweight;
                            setProgressDefalut();
                            normalWeightStyle();
                    }
        
        
                    // for boys child over weight 85-95 percentile
                    else if (
                        (age == 2 && BMI < 19.3 && BMI >= 18.2)||
                        (age == 3 && BMI < 18.3 && BMI >= 17.48)||
                        (age == 4 && BMI < 17.8 && BMI >= 16.9)||
                        (age == 5 && BMI < 17.97 && BMI >= 16.82)||
                        (age == 6 && BMI < 18.4 && BMI >= 17)||
                        (age == 7 && BMI < 19.18 && BMI >= 17.4)||
                        (age == 8 && BMI < 20 && BMI >= 17.97)||
                        (age == 9 && BMI < 21 && BMI >= 18.6)||
                        (age == 10 && BMI < 22.05 && BMI >= 19.38)||
                        (age == 11 && BMI < 23.2 && BMI >= 20.2)||
                        (age == 12 && BMI < 24.2 && BMI >= 21)||
                        (age == 13 && BMI < 25.2 && BMI >= 21.8)||
                        (age == 14 && BMI < 26 && BMI >= 22.6)||
                        (age == 15 && BMI < 26.8 && BMI >= 23.4)||
                        (age == 16 && BMI < 27.5 && BMI >= 24.2)||
                        (age == 17 && BMI < 28.2 && BMI >= 24.95)||
                        (age == 18 && BMI < 28.9 && BMI >= 25.6)||
                        (age == 19 && BMI < 27.65 && BMI >= 26.3)||
                        (age == 20 && BMI < 30.6 && BMI >= 27.1)
                        ){
                            val.innerHTML = overweight;
                            setProgressDefalut();
                            overWeightStyle();
                    } 
        
                    // for boys child obsese 85-95 percentile
                    else{
                            val.innerHTML = obseseweight;
                            setProgressDefalut();
                            obseseWeightStyle();
                    } 
                }
        
                
                if(female.checked) {
                    // for girls child underwight 5 percentile
                    if (
                        (age == 2 && BMI < 14.4)||
                        (age == 3 && BMI < 14)||
                        (age == 4 && BMI < 13.65)||
                        (age == 5 && BMI < 13.48)||
                        (age == 6 && BMI < 13.4)||
                        (age == 7 && BMI < 13.4)||
                        (age == 8 && BMI < 13.57)||
                        (age == 9 && BMI < 13.78)||
                        (age == 10 && BMI < 14)||
                        (age == 11 && BMI < 14.4)||
                        (age == 12 && BMI < 14.8)||
                        (age == 13 && BMI < 15.3)||
                        (age == 14 && BMI < 15.8)||
                        (age == 15 && BMI < 16.28)||
                        (age == 16 && BMI < 16.75)||
                        (age == 17 && BMI < 17.2)||
                        (age == 18 && BMI < 17.57)||
                        (age == 19 && BMI < 17.8)||
                        (age == 20 && BMI < 17.82)
                        ){
                            val.innerHTML = underwight;
                            setProgressDefalut();
                            underWeightStyle();
                    }
        
                    // for girls child normal weight 5-85 percentile
                    if (
                        (age == 2 && BMI >= 14.4 && BMI < 18) ||
                        (age == 3 && BMI >= 14.0 && BMI < 17.2) ||
                        (age == 4 && BMI >= 13.65 && BMI < 16.8) ||
                        (age == 5 && BMI >= 13.48 && BMI < 16.8) ||
                        (age == 6 && BMI >= 13.4 && BMI < 17.1) ||
                        (age == 7 && BMI >= 13.4 && BMI < 17.6) ||
                        (age == 8 && BMI >= 13.57 && BMI < 18.3) ||
                        (age == 9 && BMI >= 13.78 && BMI < 19.1) ||
                        (age == 10 && BMI >= 14 && BMI < 19.92) ||
                        (age == 11 && BMI >= 14.4 && BMI < 20.8) ||
                        (age == 12 && BMI >= 14.8 && BMI < 21.65) ||
                        (age == 13 && BMI >= 15.3 && BMI < 22.58) ||
                        (age == 14 && BMI >= 15.8 && BMI < 23.36) ||
                        (age == 15 && BMI >= 16.28 && BMI < 24) ||
                        (age == 16 && BMI >= 16.75 && BMI < 24.6) ||
                        (age == 17 && BMI >= 17.2 && BMI < 25.2) ||
                        (age == 18 && BMI >= 17.57 && BMI < 25.6) ||
                        (age == 19 && BMI >= 17.8 && BMI < 26.13) ||
                        (age == 20 && BMI >= 17.82 && BMI < 27.5)
                        ) {
                        val.innerHTML = normalweight;
                        setProgressDefalut();
                        normalWeightStyle();
                    }
        
                    // for girls child over weight 85-95 percentile
                    else if (
                        (age == 2 && BMI < 19.1 && BMI >= 18) ||
                        (age == 3 && BMI < 18.22 && BMI >= 17.2) ||
                        (age == 4 && BMI < 18 && BMI >= 16.8) ||
                        (age == 5 && BMI < 18.2 && BMI >= 16.8) ||
                        (age == 6 && BMI < 18.8 && BMI >= 17.1) ||
                        (age == 7 && BMI < 19.6 && BMI >= 17.6) ||
                        (age == 8 && BMI < 20.6 && BMI >= 18.3) ||
                        (age == 9 && BMI < 21.8 && BMI >= 19.1) ||
                        (age == 10 && BMI < 22.9 && BMI >= 19.92) ||
                        (age == 11 && BMI < 24.1 && BMI >= 20.8) ||
                        (age == 12 && BMI < 25.2 && BMI >= 21.65) ||
                        (age == 13 && BMI < 26.2 && BMI >= 22.58) ||
                        (age == 14 && BMI < 27.2 && BMI >= 23.36) ||
                        (age == 15 && BMI < 28.1 && BMI >= 24) ||
                        (age == 16 && BMI < 28.85 && BMI >= 24.6) ||
                        (age == 17 && BMI < 29.6 && BMI >= 25.2) ||
                        (age == 18 && BMI < 30.3 && BMI >= 25.6) ||
                        (age == 19 && BMI < 31 && BMI >= 26.13) ||
                        (age == 20 && BMI < 31.8 && BMI >= 27.5)
                        ){
                            val.innerHTML = overweight;
                            setProgressDefalut();
                            overWeightStyle();
                    } 
        
                    // for girls child obsese 85-95 percentile
                    else {
                        val.innerHTML = obseseweight;
                        setProgressDefalut();
                        obseseWeightStyle();
                    } 
                }
            }
        }
    }
}

function underWeightStyle(){
    document.getElementById("symbol").style.marginLeft = "11.12%";
    document.getElementById("progress-underweight").className = "progress-bar bg-secondary progress-bar-striped progress-bar-animated";
}
function normalWeightStyle(){
    document.getElementById("symbol").style.marginLeft = "36%";
    document.getElementById("progress-normalweight").className = "progress-bar bg-success progress-bar-striped progress-bar-animated";
}
function overWeightStyle(){
    document.getElementById("symbol").style.marginLeft = "61.5%";
    document.getElementById("progress-overweight").className = "progress-bar bg-warning progress-bar-striped progress-bar-animated";
}
function obseseWeightStyle(){
    document.getElementById("symbol").style.marginLeft = "85.84%";
    document.getElementById("progress-obseseweight").className = "progress-bar bg-danger progress-bar-striped progress-bar-animated";
}
function setProgressDefalut(){
    document.getElementById("progress-underweight").className = "progress-bar bg-secondary";
    document.getElementById("progress-normalweight").className = "progress-bar bg-success";
    document.getElementById("progress-overweight").className = "progress-bar bg-warning";
    document.getElementById("progress-obseseweight").className = "progress-bar bg-danger";
}





