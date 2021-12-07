import clearForm from "./clearForm.js";
export default function openModal  (button,form,modal) {
    const 
    close = modal.querySelector('.close');
    modal.classList.add('hiden');

    button.addEventListener('click',(e)=>{
        e.preventDefault();
        modal.classList.add('hiden');


    });

    close.addEventListener('click',()=>{
        modal.classList.remove('hiden');
        clearForm(form);

});
}





 