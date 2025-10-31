import { LightningElement, api } from 'lwc';

export default class BaseModal extends LightningElement {
    @api isOpen = false;
    @api title = '';
    @api closeOnBackdropClick = false;

    @api
    open() {
        this.isOpen = true;
        // Add body class to prevent scrolling when modal is open
        document.body.classList.add('slds-modal-open');
    }

    @api
    close() {
        this.isOpen = false;
        // Remove body class to restore scrolling
        document.body.classList.remove('slds-modal-open');
        // Dispatch close event for parent component
        this.dispatchEvent(new CustomEvent('modalclose'));
    }

    handleClose() {
        this.close();
    }

    handleBackdropClick() {
        if (this.closeOnBackdropClick) {
            this.close();
        }
    }

    // Handle ESC key to close modal
    connectedCallback() {
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.boundHandleKeyDown);
    }

    disconnectedCallback() {
        if (this.boundHandleKeyDown) {
            document.removeEventListener('keydown', this.boundHandleKeyDown);
        }
        document.body.classList.remove('slds-modal-open');
    }

    handleKeyDown(event) {
        if (event.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }
}
