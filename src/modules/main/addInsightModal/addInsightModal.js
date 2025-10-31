import { LightningElement, api, track } from 'lwc';

export default class AddInsightModal extends LightningElement {
    @api isOpen = false;
    
    @track additionalFields = [];
    @track isEditMode = false;
    nextFieldId = 1;

    get allowBackdropClose() {
        return true;
    }

    get modalTitle() {
        return this.isEditMode ? 'Edit Insight Section' : 'Add Section';
    }

    get hasAdditionalFields() {
        return this.additionalFields.length > 0; // Show fields list if any fields exist
    }

    get canAddMoreFields() {
        return this.additionalFields.length < 2; // Allow up to 2 insight fields
    }

    get isAddFieldDisabled() {
        return this.additionalFields.length >= 2; // Disable button when 2 or more fields
    }

    // Calculated Insight Name options
    get calculatedInsightNameOptions() {
        return [
            { label: 'Lifetime Value', value: 'lifetime_value' },
            { label: 'Purchase Propensity', value: 'purchase_propensity' }
        ];
    }

    // Field name options for insights - depends on calculated insight name
    getFieldNameOptionsForInsight(calculatedInsightName) {
        if (calculatedInsightName === 'purchase_propensity') {
            return [
                { label: 'Likelihood to Purchase', value: 'likelihood_to_purchase' }
            ];
        } else if (calculatedInsightName === 'lifetime_value') {
            return [
                { label: 'LTV', value: 'ltv' }
            ];
        }
        return [];
    }

    // Icon options
    get iconOptions() {
        return [
            { label: 'Cart', value: 'utility:cart' },
            { label: 'Shopping Bag', value: 'utility:shopping_bag' }
        ];
    }

    @api
    open(insightData = {}, editMode = false) {
        // Set edit mode
        this.isEditMode = editMode;
        
        // Initialize additional fields
        this.additionalFields = insightData.additionalFields ? [...insightData.additionalFields] : [];
        this.nextFieldId = this.additionalFields.length > 0 ? Math.max(...this.additionalFields.map(f => f.id)) + 1 : 1;
        
        this.updateFieldActions();
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


    handleAddField() {
        // Allow adding up to 2 fields
        if (this.canAddMoreFields) {
            const newField = {
                id: this.nextFieldId++,
                order: this.additionalFields.length + 1,
                calculatedInsightName: '',
                fieldName: '',
                displayLabel: '',
                icon: '',
                fieldNameOptions: []
            };
            this.additionalFields = [...this.additionalFields, newField];
            this.updateFieldActions();
        }
    }

    handleCalculatedInsightNameChange(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const selectedValue = event.detail.value;
        
        this.additionalFields = this.additionalFields.map(field => {
            if (field.id === fieldId) {
                // Update calculated insight name and reset dependent fields
                const updatedField = {
                    ...field,
                    calculatedInsightName: selectedValue,
                    fieldName: '', // Reset field name when insight changes
                    displayLabel: '', // Reset display label
                    fieldNameOptions: this.getFieldNameOptionsForInsight(selectedValue)
                };
                return updatedField;
            }
            return field;
        });
    }

    handleFieldNameChange(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const selectedValue = event.detail.value;
        
        this.additionalFields = this.additionalFields.map(field => {
            if (field.id === fieldId) {
                // Auto-populate display label based on field name
                const selectedOption = field.fieldNameOptions.find(option => option.value === selectedValue);
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
        const newValue = event.detail.value;
        
        this.additionalFields = this.additionalFields.map(field => {
            if (field.id === fieldId) {
                return { ...field, displayLabel: newValue };
            }
            return field;
        });
    }

    handleIconChange(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const selectedValue = event.detail.value;
        
        this.additionalFields = this.additionalFields.map(field => {
            if (field.id === fieldId) {
                return { ...field, icon: selectedValue };
            }
            return field;
        });
    }

    handleMoveFieldUp(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const currentIndex = this.additionalFields.findIndex(field => field.id === fieldId);
        
        if (currentIndex > 0) {
            const newFields = [...this.additionalFields];
            [newFields[currentIndex], newFields[currentIndex - 1]] = [newFields[currentIndex - 1], newFields[currentIndex]];
            
            // Update order values
            newFields.forEach((field, index) => {
                field.order = index + 1;
            });
            
            this.additionalFields = newFields;
            this.updateFieldActions();
        }
    }

    handleMoveFieldDown(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        const currentIndex = this.additionalFields.findIndex(field => field.id === fieldId);
        
        if (currentIndex < this.additionalFields.length - 1) {
            const newFields = [...this.additionalFields];
            [newFields[currentIndex], newFields[currentIndex + 1]] = [newFields[currentIndex + 1], newFields[currentIndex]];
            
            // Update order values
            newFields.forEach((field, index) => {
                field.order = index + 1;
            });
            
            this.additionalFields = newFields;
            this.updateFieldActions();
        }
    }

    handleRemoveField(event) {
        const fieldId = parseInt(event.target.dataset.fieldId);
        this.additionalFields = this.additionalFields.filter(field => field.id !== fieldId);
        
        // Update order values
        this.additionalFields.forEach((field, index) => {
            field.order = index + 1;
        });
        
        this.updateFieldActions();
    }

    updateFieldActions() {
        this.additionalFields = this.additionalFields.map((field, index) => ({
            ...field,
            canMoveUp: index > 0,
            canMoveDown: index < this.additionalFields.length - 1,
            calculatedInsightNameId: `calculated-insight-name-${field.id}`,
            fieldNameId: `field-name-${field.id}`,
            displayLabelId: `display-label-${field.id}`,
            iconId: `icon-${field.id}`,
            fieldNameOptions: field.fieldNameOptions || this.getFieldNameOptionsForInsight(field.calculatedInsightName)
        }));
    }

    handleBack() {
        // Dispatch back event to parent to show step 1
        this.dispatchEvent(new CustomEvent('back'));
        this.close();
    }

    handleCancel() {
        // Close modal without saving
        this.close();
        this.dispatchEvent(new CustomEvent('modalclose'));
    }

    handleSave() {
        // Dispatch save event with form data
        const insightData = {
            additionalFields: [...this.additionalFields]
        };
        
        this.dispatchEvent(new CustomEvent('save', {
            detail: insightData
        }));
        
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }
}
