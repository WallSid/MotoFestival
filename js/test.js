
const firstStepBtn = document.getElementById('first-step-btn');
const secondStepBtn = document.getElementById('second-step-btn');
const thirdStepBtn = document.getElementById('third-step-btn');


// const firstStepContainer = document.querySelector('.first-step__wrapper');
// const secondStepContainer = document.querySelector('.second-step__wrapper');
// const thirdStepContainer = document.querySelector('.third-step__wrapper');



const stepOneFormContainer = document.getElementById('step-one');
const stepTwoFormContainer = document.getElementById('step-two');
const stepThreeFormContainer = document.getElementById('step-three');

const checkBoxContainer = document.getElementById('checkBoxes')



function removeActiveFromAll() {
    containers.forEach(container => {

        if (window.matchMedia('(max-width: 1279px) and (min-width: 992px)').matches || window.matchMedia('(max-width: 479px)').matches) {
            const greyElem = container.querySelector('.grey-arr_mob');
            const greenElem = container.querySelector('.green-arr_mob');
            const stepTextElem = container.querySelector('.step-text');
            
            greyElem.classList.add('active');
            greenElem.classList.remove('active');
            stepTextElem.classList.remove('active');

            } else {
                    const greyElem = container.querySelector('.grey-arr');
                    const greenElem = container.querySelector('.green-arr');
                    const stepTextElem = container.querySelector('.step-text');

                    greyElem.classList.add('active');
                    greenElem.classList.remove('active');
                    stepTextElem.classList.remove('active');
                    }
    });
}

containers.addEventListener('click', function(e) {
    removeActiveFromAll();
    

})

function toggleStyles(container) {
    const greyElem = container.querySelector('.grey-arr');
    const greenElem = container.querySelector('.green-arr');
    const stepTextElem = container.querySelector('.step-text');

    greyElem.classList.toggle('active');
    greenElem.classList.toggle('active');
    stepTextElem.classList.toggle('active');
}


firstStepBtn.addEventListener('click', function() {
    if (form.checkValidity()) {
        toggleStyles(firstStepContainer);
        toggleStyles(secondStepContainer);
        stepOneFormContainer.classList.toggle('hide');
        stepTwoFormContainer.classList.toggle('hide');
    
        firstStepBtn.classList.toggle('hide');
        secondStepBtn.classList.toggle('hide');
    }

    
});

secondStepBtn.addEventListener('click', function() {
    if (phone.checkValidity()) {
        toggleStyles(secondStepContainer);
        toggleStyles(thirdStepContainer);
        
        stepTwoFormContainer.classList.toggle('hide');
        stepThreeFormContainer.classList.toggle('hide');

        secondStepBtn.classList.toggle('hide');
        thirdStepBtn.classList.toggle('hide');

        checkBoxContainer.classList.toggle('hide');
    }
});

const stepsWrapper = document.querySelector('.form-steps__wrapper');
const stepOne = document.getElementById('step-one');
const stepTwo = document.getElementById('step-two');
const stepThree = document.getElementById('step-three');


const firstStepContainer = document.querySelector('.first-step__wrapper');
const secondStepContainer = document.querySelector('.second-step__wrapper');
const thirdStepContainer = document.querySelector('.third-step__wrapper');

const containers = [firstStepContainer, secondStepContainer, thirdStepContainer];

function removeActiveFromAll() {
    containers.forEach(container => {

        if (window.matchMedia('(max-width: 1279px) and (min-width: 992px)').matches || window.matchMedia('(max-width: 479px)').matches) {
            const greyElem = container.querySelector('.grey-arr_mob');
            const greenElem = container.querySelector('.green-arr_mob');
            const stepTextElem = container.querySelector('.step-text');
            
            greyElem.classList.add('active');
            greenElem.classList.remove('active');
            stepTextElem.classList.remove('active');

            } else {
                    const greyElem = container.querySelector('.grey-arr');
                    const greenElem = container.querySelector('.green-arr');
                    const stepTextElem = container.querySelector('.step-text');

                    greyElem.classList.add('active');
                    greenElem.classList.remove('active');
                    stepTextElem.classList.remove('active');
                    }
    });
}

function activateStep(step) {
    if (window.matchMedia('(max-width: 1279px) and (min-width: 992px)').matches || window.matchMedia('(max-width: 479px)').matches) {
        const greyElem = step.querySelector('.grey-arr_mob');
        const greenElem = step.querySelector('.green-arr_mob');
        const stepTextElem = step.querySelector('.step-text');
        
        greyElem.classList.remove('active');
        greenElem.classList.add('active');
        stepTextElem.classList.add('active');
        

        } else {
                const greyElem = step.querySelector('.grey-arr');
                const greenElem = step.querySelector('.green-arr');
                const stepTextElem = step.querySelector('.step-text');

                greyElem.classList.remove('active');
                greenElem.classList.add('active');
                stepTextElem.classList.add('active');
                }
};

stepsWrapper.addEventListener('click', function() {
    if (stepOne.style.display !== 'none') {
        removeActiveFromAll();
        activateStep(firstStepContainer)
    } if (stepTwo.style.display !== 'none') {
        removeActiveFromAll();
        activateStep(secondStepContainer)
    } if (stepThree.style.display !== 'none') {
        removeActiveFromAll();
        activateStep(thirdStepContainer)
    }
})




// Створюємо функцію для перевірки та виконання коду
// function checkDisplayStyle(element) {
//     const styles = getComputedStyle(element);
//     if (styles.display !== 'none') {
//         if (window.matchMedia('(max-width: 1279px) and (min-width: 992px)').matches || window.matchMedia('(max-width: 479px)').matches) {
//             const greyElem = element.querySelector('.grey-arr_mob');
//             const greenElem = element.querySelector('.green-arr_mob');
//             const stepTextElem = element.querySelector('.step-text');
            
//             greyElem.classList.remove('active');
//             greenElem.classList.add('active');
//             stepTextElem.classList.add('active');

//             } else {
//                     const greyElem = element.querySelector('.grey-arr');
//                     const greenElem = element.querySelector('.green-arr');
//                     const stepTextElem = element.querySelector('.step-text');

//                     greyElem.classList.remove('active');
//                     greenElem.classList.add('active');
//                     stepTextElem.classList.add('active');
//                     }
//     }
// }

// // Створюємо Mutation Observer для кожного елемента
// function createObserverForElement(element) {
//     const observer = new MutationObserver(function(mutationsList) {
//         for (const mutation of mutationsList) {
//             if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
//                 checkDisplayStyle(element);
//             }
//         }
//     });

//     observer.observe(element, { attributes: true });
// }

// // Вибираємо елементи, які ви хочете відслідковувати
// const elementsToTrack = document.querySelectorAll('[data-form="step"]');

// // Приклад виклику для кожного елемента
// elementsToTrack.forEach(element => {
//     createObserverForElement(element);
// });
