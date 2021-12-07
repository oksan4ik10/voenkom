export default function clearForm  (form) {
    form.querySelectorAll('input').forEach((item) => {
        item.value='';
    });
};

