class Alert{
    constructor(){

        this.body = document.getElementsByTagName('body')[0];

        this.alertModalContainer = document.createElement('div')
        this.alertModalContainer.className = "alertModalContainer";

        this.alertModal = document.createElement('div')
        this.alertModal.className = "alertModal";

        this.alertModal__header = document.createElement('div');
        this.alertModal__header.className = "alertModal__header";

        this.alertModal__body = document.createElement('div');
        this.alertModal__body.className = "alertModal__body";

        this.alertModal__actions = document.createElement('div');
        this.alertModal__actions.className = "alertModal__actions";

    }

    header(titleMessage){

        const title = document.createElement('div');
        title.className = "alertModal_headerContent";
        title.innerHTML = `<p>${titleMessage}</p>`;

        const closeIcon = document.createElement('div');
        closeIcon.className = "alertModal__closeIcon";

        const closetIcon__span = document.createElement('span');
        closetIcon__span.classList.add('alertCloseBtn');

        closetIcon__span.innerHTML = "<i class='fa fa-times'></i>";

        this.alertModal__header.appendChild(title);
        this.alertModal__header.appendChild(closetIcon__span);

        this.alertModal.appendChild(this.alertModal__header);

    }

    message(successMsg){
        const message = document.createElement('p');
        message.textContent = successMsg;

        const button = document.createElement('button');
        button.classList.add('btn', 'alertCloseBtn');
        button.textContent = "Okay";

        this.alertModal__actions.appendChild(message);
        this.alertModal__actions.appendChild(button);

        this.alertModal__body.appendChild(this.alertModal__actions);

    }

    footer(){

    }

    alert(alertOptions){

        if("title"  in alertOptions){
            this.header(alertOptions.title)
        }

        if("message"  in alertOptions){
            this.message(alertOptions.message)
        }

        this.alertModal.appendChild(this.alertModal__body);
        this.alertModalContainer.appendChild(this.alertModal);
        this.body.appendChild(this.alertModalContainer);

    }

}

document.addEventListener('click',function(e){
    if(e.target && e.target.classList.contains('alertCloseBtn')){
        removeModal();
    }
});


const removeModal = () => {
    const alertModalContainer = document.getElementsByClassName('alertModalContainer')[0];
    alertModalContainer.remove();
}


// const alert = new Alert();
// alert.alert({
//     title: "Success",
//     message: "Book updated successfully"
// });