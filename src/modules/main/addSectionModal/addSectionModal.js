import { LightningElement, api, track } from 'lwc';

export default class AddSectionModal extends LightningElement {
    @api isOpen = false;
    
    @track selectedSection = 'insights'; // Pre-select Insights as shown in Figma

    get allowBackdropClose() {
        return true;
    }

    get isAddButtonDisabled() {
        return !this.selectedSection;
    }

    // Available section options with metadata (4 sections as shown in Figma)
    get sectionOptions() {
        return [
            {
                value: 'profile',
                label: 'Profile',
                description: 'Displays information about the individual or account from the unified profile object.'
            },
            {
                value: 'contact',
                label: 'Contact',
                description: 'List contact point information from different sources and channels of selection.'
            },
            {
                value: 'insights',
                label: 'Insights',
                description: 'Shows calculated insights metrics about the unified profile object with chart.'
            },
            {
                value: 'custom',
                label: 'Custom',
                description: 'Choose any fields from the connected Data Cloud objects via the unified profile object.'
            }
        ];
    }

    @api
    open() {
        // Set default selection to Insights as shown in Figma
        this.selectedSection = 'insights';
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

    handleSectionChange(event) {
        this.selectedSection = event.target.value;
        console.log('Selected section:', this.selectedSection);
        
        // Update visual state
        this.updateSectionCards();
    }

    handleSectionClick(event) {
        const sectionValue = event.currentTarget.dataset.value;
        if (sectionValue) {
            this.selectedSection = sectionValue;
            
            // Update the radio button
            const radioButton = this.template.querySelector(`input[value="${sectionValue}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }
            
            // Update visual state
            this.updateSectionCards();
        }
    }

    updateSectionCards() {
        // Remove all selected states
        const allCards = this.template.querySelectorAll('.section-card');
        allCards.forEach(card => {
            card.classList.remove('section-card--selected');
        });

        // Add selected state to current selection
        if (this.selectedSection) {
            const selectedCard = this.template.querySelector(`[data-value="${this.selectedSection}"]`);
            if (selectedCard) {
                selectedCard.classList.add('section-card--selected');
            }
        }
    }

    handleCancel() {
        this.close();
        // Dispatch close event to parent
        this.dispatchEvent(new CustomEvent('modalclose'));
    }

    handleNext() {
        if (this.selectedSection) {
            // Find the selected section details
            const sectionDetails = this.sectionOptions.find(option => option.value === this.selectedSection);
            
            // Dispatch add section event with selected section data
            this.dispatchEvent(new CustomEvent('addsection', {
                detail: {
                    sectionType: this.selectedSection,
                    sectionData: sectionDetails
                }
            }));
            
            console.log('Adding section:', sectionDetails);
            
            this.close();
            // Dispatch close event to parent
            this.dispatchEvent(new CustomEvent('modalclose'));
        }
    }

    handleAddSection() {
        if (this.selectedSection) {
            // Find the selected section details
            const sectionDetails = this.sectionOptions.find(option => option.value === this.selectedSection);
            
            // Dispatch add section event with selected section data
            this.dispatchEvent(new CustomEvent('addsection', {
                detail: {
                    sectionType: this.selectedSection,
                    sectionData: sectionDetails
                }
            }));
            
            console.log('Adding section:', sectionDetails);
            this.close();
            // Dispatch close event to parent
            this.dispatchEvent(new CustomEvent('modalclose'));
        }
    }
}
