import { LightningElement, api, track } from 'lwc';

export default class ContactModal extends LightningElement {
    @api isOpen = false;
    
    @track basicFields = {
        showEmail: true,
        showPhone: true,
        showAddress: false
    };

    get allowBackdropClose() {
        return true;
    }

    @api
    open(contactData = {}) {
        // Initialize with existing data if provided
        this.basicFields = {
            showEmail: contactData.basicFields?.showEmail !== undefined ? contactData.basicFields.showEmail : true,
            showPhone: contactData.basicFields?.showPhone !== undefined ? contactData.basicFields.showPhone : true,
            showAddress: contactData.basicFields?.showAddress !== undefined ? contactData.basicFields.showAddress : false
        };
        this.isOpen = true;
    }

    @api
    close() {
        this.isOpen = false;
    }

    handleModalClose() {
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }

    handleBasicFieldChange(event) {
        const fieldName = event.target.name;
        const isChecked = event.target.checked;
        this.basicFields = {
            ...this.basicFields,
            [fieldName]: isChecked
        };
    }


    handleCancel() {
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }

    handleSave() {
        // Dispatch save event with form data
        const contactData = {
            basicFields: { ...this.basicFields }
        };
        
        this.dispatchEvent(new CustomEvent('save', {
            detail: contactData
        }));
        
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }
}
