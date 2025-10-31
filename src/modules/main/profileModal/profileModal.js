import { LightningElement, api, track } from 'lwc';

export default class ProfileModal extends LightningElement {
    @api isOpen = false;
    
    @track basicFields = {
        showPhoto: true,
        showFullName: true,
        showLocation: true
    };
    
    @track additionalFields = [];
    
    nextFieldId = 1;

    // Field and Icon options
    get fieldNameOptions() {
        return [
            { label: 'Customer Id', value: 'customer_id' },
            { label: 'Loyalty Member Tier', value: 'loyalty_member_tier' }
        ];
    }

    get iconOptions() {
        return [
            { label: 'Ribbon', value: 'utility:ribbon' },
            { label: 'User', value: 'utility:user' }
        ];
    }

    get allowBackdropClose() {
        return true;
    }

    get hasAdditionalFields() {
        return this.additionalFields.length > 0;
    }

    @api
    open(profileData = {}) {
        // Initialize with existing data if provided
        this.basicFields = {
            showPhoto: profileData.basicFields?.showPhoto !== undefined ? profileData.basicFields.showPhoto : true,
            showFullName: profileData.basicFields?.showFullName !== undefined ? profileData.basicFields.showFullName : true,
            showLocation: profileData.basicFields?.showLocation !== undefined ? profileData.basicFields.showLocation : true
        };
        this.additionalFields = profileData.additionalFields ? [...profileData.additionalFields] : [];
        this.nextFieldId = this.additionalFields.length > 0 ? Math.max(...this.additionalFields.map(f => f.id)) + 1 : 1;
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

    handleAddField() {
        // Allow adding up to 2 fields
        if (this.additionalFields.length < 2) {
            const newField = {
                id: this.nextFieldId++,
                order: this.additionalFields.length + 1,
                fieldName: '',
                displayLabel: '',
                icon: ''
            };
            this.additionalFields = [...this.additionalFields, newField];
        }
    }

    handleFieldNameChange(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const selectedValue = event.detail.value;
        
        this.additionalFields = this.additionalFields.map(field => {
            if (field.id === fieldId) {
                // Auto-populate display label based on field name
                const selectedOption = this.fieldNameOptions.find(option => option.value === selectedValue);
                return {
                    ...field,
                    fieldName: selectedValue,
                    displayLabel: selectedOption ? selectedOption.label : ''
                };
            }
            return field;
        });
    }

    handleDisplayLabelChange(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const newValue = event.target.value;
        this.additionalFields = this.additionalFields.map(field => 
            field.id === fieldId ? { ...field, displayLabel: newValue } : field
        );
    }

    handleIconChange(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const newValue = event.target.value;
        this.additionalFields = this.additionalFields.map(field => 
            field.id === fieldId ? { ...field, icon: newValue } : field
        );
    }

    handleMoveFieldUp(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const currentIndex = this.additionalFields.findIndex(field => field.id === fieldId);
        
        if (currentIndex > 0) {
            const fields = [...this.additionalFields];
            [fields[currentIndex - 1], fields[currentIndex]] = [fields[currentIndex], fields[currentIndex - 1]];
            
            // Update order numbers
            fields.forEach((field, index) => {
                field.order = index + 1;
            });
            
            this.additionalFields = fields;
        }
    }

    handleMoveFieldDown(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const currentIndex = this.additionalFields.findIndex(field => field.id === fieldId);
        
        if (currentIndex < this.additionalFields.length - 1) {
            const fields = [...this.additionalFields];
            [fields[currentIndex], fields[currentIndex + 1]] = [fields[currentIndex + 1], fields[currentIndex]];
            
            // Update order numbers
            fields.forEach((field, index) => {
                field.order = index + 1;
            });
            
            this.additionalFields = fields;
        }
    }

    handleRemoveField(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        this.additionalFields = this.additionalFields.filter(field => field.id !== fieldId);
        
        // Update order numbers after removal
        this.additionalFields.forEach((field, index) => {
            field.order = index + 1;
        });
    }

    handleCancel() {
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }

    handleSave() {
        // Dispatch save event with form data
        const profileData = {
            basicFields: { ...this.basicFields },
            additionalFields: [...this.additionalFields]
        };
        
        this.dispatchEvent(new CustomEvent('save', {
            detail: profileData
        }));
        
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }
}
