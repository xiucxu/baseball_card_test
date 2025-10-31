import { LightningElement, track } from 'lwc';

export default class App2 extends LightningElement {
    // Combobox options
    desktopOptions = [
        { label: 'Desktop', value: 'Desktop' },
        { label: 'Tablet', value: 'Tablet' },
        { label: 'Mobile', value: 'Mobile' }
    ];

    viewOptions = [
        { label: 'Shrink To View', value: 'Shrink To View' },
        { label: 'Fit To Width', value: 'Fit To Width' },
        { label: 'Actual Size', value: 'Actual Size' }
    ];

    // Data Space options for the properties panel
    dataSpaceOptions = [
        { label: 'default', value: 'default' },
        { label: 'Finance Service', value: 'finance-service' },
        { label: 'Marketing', value: 'marketing' }
    ];

    // Unified Object options for the properties panel
    unifiedObjectOptions = [
        { label: 'Unified Individual', value: 'unified-individual' },
        { label: 'Unified Individual - fuzzy', value: 'unified-individual-fuzzy' }
    ];

    // Section menu states
    showProfileMenu = false;
    showContactMenu = false;
    showInsightsMenu = false;

    // Modal properties
    showProfileModal = false;
    showContactModal = false;
    showAddSectionModal = false;
    showAddInsightModal = false;
    
    // Section visibility
    showInsightsSection = false;
    
    // Profile configuration data
    profileConfig = {
        basicFields: {
            showPhoto: true,
            showFullName: true,
            showLocation: true
        },
        additionalFields: []
    };
    
    // Contact configuration data
    contactConfig = {
        basicFields: {
            showEmail: true,
            showPhone: true,
            showAddress: false
        }
    };
    
    // Insights configuration data
    insightsConfig = {
        additionalFields: []
    };

    get hasInsightFields() {
        return this.insightsConfig.additionalFields && this.insightsConfig.additionalFields.length > 0;
    }

    // Prototype switcher getters - Prototype 2 is always active
    get prototype1TabClass() {
        return 'prototype-tab';
    }

    get prototype2TabClass() {
        return 'prototype-tab active';
    }

    get prototype3TabClass() {
        return 'prototype-tab';
    }

    // Component items for the panel
    componentItems = [
        { id: '1', label: 'Actions & Recommendations', icon: 'standard:action_list_component' },
        { id: '2', label: 'Activities', icon: 'standard:record' },
        { id: '3', label: 'Chatter', icon: 'standard:social' },
        { id: '4', label: 'Chatter Feed', icon: 'standard:feed' },
        { id: '5', label: 'Company Hierarchy', icon: 'standard:hierarchy' },
        { id: '6', label: 'Data Cloud Unified Profile', icon: 'standard:contact' },
        { id: '7', label: 'Dynamic Action Bar', icon: 'standard:dynamic_record_choice' },
        { id: '8', label: 'Event Insights', icon: 'standard:event' },
        { id: '9', label: 'Flow', icon: 'standard:flow' },
        { id: '11', label: 'List View', icon: 'standard:list_email' },
        { id: '12', label: 'Path', icon: 'standard:sales_path' },
        { id: '13', label: 'Quip Associated Documents', icon: 'standard:quip_sheet' },
        { id: '14', label: 'Recent Items', icon: 'standard:recent' },
        { id: '16', label: 'Record Detail', icon: 'standard:record' },
        { id: '17', label: 'Related List - Single', icon: 'standard:related_list' },
        { id: '18', label: 'Related List Quick Link', icon: 'standard:link' },
        { id: '19', label: 'Related Lists', icon: 'standard:related_list' },
        { id: '20', label: 'Related Record', icon: 'standard:record' },
        { id: '21', label: 'Rich Text', icon: 'standard:text_template' },
        { id: '22', label: 'Salesforce Anywhere Messages', icon: 'standard:sms' },
        { id: '23', label: 'Topics', icon: 'standard:topic' },
        { id: '24', label: 'Trending Topics', icon: 'standard:topic2' }
    ];

    // Event handlers
    handleDesktopChange(event) {
        console.log('Desktop view changed to:', event.detail.value);
    }

    handleViewChange(event) {
        console.log('View mode changed to:', event.detail.value);
    }

    handleAnalyze() {
        console.log('Analyze button clicked');
    }

    handleActivation() {
        console.log('Activation button clicked');
    }

    handleSave() {
        console.log('Save button clicked');
    }

    handleSearch(event) {
        const searchTerm = event.target.value;
        console.log('Search term:', searchTerm);
        // Filter component items based on search term
        if (searchTerm) {
            this.componentItems = this.componentItems.filter(item => 
                item.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            // Reset to full list when search is cleared
            this.resetComponentItems();
        }
    }

    resetComponentItems() {
        this.componentItems = [
            { id: '1', label: 'Actions & Recommendations', icon: 'standard:action_list_component' },
            { id: '2', label: 'Activities', icon: 'standard:record' },
            { id: '3', label: 'Chatter', icon: 'custom:custom112' },
            { id: '4', label: 'Chatter Feed', icon: 'standard:feed' },
            { id: '5', label: 'Company Hierarchy', icon: 'standard:hierarchy' },
            { id: '6', label: 'Data Cloud Unified Profile', icon: 'standard:contact' },
            { id: '7', label: 'Dynamic Action Bar', icon: 'standard:actions_and_buttons' },
            { id: '8', label: 'Event Insights', icon: 'standard:iot_orchestrations' },
            { id: '9', label: 'Flow', icon: 'standard:flow' },
            { id: '11', label: 'List View', icon: 'standard:picklist_type' },
            { id: '12', label: 'Path', icon: 'standard:sales_path' },
            { id: '13', label: 'Quip Associated Documents', icon: 'standard:quip' },
            { id: '14', label: 'Recent Items', icon: 'standard:recent' },
            { id: '16', label: 'Record Detail', icon: 'standard:record' },
            { id: '17', label: 'Related List - Single', icon: 'standard:related_list' },
            { id: '18', label: 'Related List Quick Link', icon: 'standard:related_list' },
            { id: '19', label: 'Related Lists', icon: 'standard:related_list' },
            { id: '20', label: 'Related Record', icon: 'standard:record' },
            { id: '21', label: 'Rich Text', icon: 'standard:display_rich_text' },
            { id: '22', label: 'Salesforce Anywhere Messages', icon: 'standard:messaging_conversation' },
            { id: '23', label: 'Topics', icon: 'standard:topic' },
            { id: '24', label: 'Trending Topics', icon: 'standard:topic2' }
        ];
    }

    // Section menu handlers
    handleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
        this.showContactMenu = false; // Close other menus
        this.showInsightsMenu = false;
    }

    handleContactMenu() {
        this.showContactMenu = !this.showContactMenu;
        this.showProfileMenu = false; // Close other menus
        this.showInsightsMenu = false;
    }

    handleProfileEdit() {
        console.log('Edit profile section');
        this.showProfileMenu = false;
        this.showProfileModal = true;
        
        // Pass current profile configuration to modal
        const modal = this.template.querySelector('main-profile-modal');
        if (modal) {
            modal.open(this.profileConfig);
        }
    }

    handleProfileSetInvisible() {
        console.log('Set profile as invisible');
        this.showProfileMenu = false;
    }

    handleProfileDelete() {
        console.log('Delete profile section');
        this.showProfileMenu = false;
    }

    handleContactEdit() {
        console.log('Edit contact section');
        this.showContactMenu = false;
        this.showContactModal = true;
        
        // Pass current contact configuration to modal
        const modal = this.template.querySelector('main-contact-modal');
        if (modal) {
            modal.open(this.contactConfig);
        }
    }

    handleContactSetInvisible() {
        console.log('Set contact as invisible');
        this.showContactMenu = false;
    }

    handleContactDelete() {
        console.log('Delete contact section');
        this.showContactMenu = false;
    }

    // Profile name click handler
    handleProfileNameClick() {
        console.log('Opening profile modal');
        this.showProfileModal = true;
        
        // Pass current profile configuration to modal
        const modal = this.template.querySelector('main-profile-modal');
        if (modal) {
            modal.open(this.profileConfig);
        }
    }

    // Contact name click handler
    handleContactNameClick() {
        console.log('Opening contact modal');
        this.showContactModal = true;
        
        // Pass current contact configuration to modal
        const modal = this.template.querySelector('main-contact-modal');
        if (modal) {
            modal.open(this.contactConfig);
        }
    }

    // Modal event handlers
    handleProfileModalClose() {
        console.log('Closing profile modal');
        this.showProfileModal = false;
    }

    handleProfileSave(event) {
        const profileData = event.detail;
        console.log('Profile saved:', profileData);
        
        // Update the profile configuration with saved data
        this.profileConfig = {
            basicFields: { ...profileData.basicFields },
            additionalFields: [...profileData.additionalFields]
        };
        
        console.log('Updated profile config:', this.profileConfig);
        this.showProfileModal = false;
    }

    // Contact modal event handlers
    handleContactModalClose() {
        console.log('Closing contact modal');
        this.showContactModal = false;
    }

    handleContactSave(event) {
        const contactData = event.detail;
        console.log('Contact saved:', contactData);
        
        // Update the contact configuration with saved data
        this.contactConfig = {
            basicFields: { ...contactData.basicFields }
        };
        
        console.log('Updated contact config:', this.contactConfig);
        this.showContactModal = false;
    }

    // Add Section modal event handlers
    handleAddSectionClick() {
        console.log('Opening add section modal');
        this.showAddSectionModal = true;
        
        // Open the modal
        const modal = this.template.querySelector('main-add-section-modal');
        if (modal) {
            modal.open();
        }
    }

    handleAddSectionModalClose() {
        console.log('Closing add section modal');
        this.showAddSectionModal = false;
    }

    handleAddSection(event) {
        const sectionData = event.detail;
        console.log('Selected section for step 2:', sectionData);
        
        // Close step 1 modal and open step 2 (insight configuration)
        this.showAddSectionModal = false;
        this.showAddInsightModal = true;
        
        // Pass the selected section data to step 2
        const insightModal = this.template.querySelector('main-add-insight-modal');
        if (insightModal) {
            insightModal.open();
        }
    }

    // Add Insight modal event handlers
    handleAddInsightModalClose() {
        console.log('Closing add insight modal');
        this.showAddInsightModal = false;
    }

    handleAddInsightBack() {
        console.log('Going back to step 1');
        // Close step 2 and reopen step 1
        this.showAddInsightModal = false;
        this.showAddSectionModal = true;
        
        // Reopen step 1 modal
        const sectionModal = this.template.querySelector('main-add-section-modal');
        if (sectionModal) {
            sectionModal.open();
        }
    }

    handleAddInsightSave(event) {
        const insightData = event.detail;
        console.log('Saving insight configuration:', insightData);
        
        // Store the insight configuration
        this.insightsConfig = { ...insightData };
        
        // Show the Insights section
        this.showInsightsSection = true;
        
        this.showAddInsightModal = false;
    }

    // Insights section event handlers
    handleInsightsMenu() {
        this.showInsightsMenu = !this.showInsightsMenu;
        // Close other menus
        this.showProfileMenu = false;
        this.showContactMenu = false;
    }

    handleInsightsNameClick() {
        console.log('Opening insights modal for editing');
        this.showAddInsightModal = true;
        
        // Pass existing configuration to modal in edit mode
        const insightModal = this.template.querySelector('main-add-insight-modal');
        if (insightModal) {
            insightModal.open(this.insightsConfig, true); // true = edit mode
        }
    }

    handleInsightsEdit() {
        console.log('Edit insights section');
        this.showInsightsMenu = false;
        this.handleInsightsNameClick();
    }

    handleInsightsSetInvisible() {
        console.log('Set insights section as invisible');
        this.showInsightsMenu = false;
        // TODO: Implement set invisible functionality
    }

    handleInsightsDelete() {
        console.log('Delete insights section');
        this.showInsightsMenu = false;
        this.showInsightsSection = false;
        this.insightsConfig = { additionalFields: [] };
    }

    // Prototype switcher handlers
    handlePrototype1Click() {
        console.log('Navigating to Prototype 1');
        // Navigate to the original app component
        window.location.href = window.location.origin + '/';
    }

    handlePrototype2Click() {
        console.log('Staying on Prototype 2');
        // Already on Prototype 2, no action needed
    }

    handlePrototype3Click() {
        console.log('Navigating to Prototype 3');
        window.location.href = window.location.origin + '/app3';
    }

    // Profile Section Configuration
    basicProfileFieldOptions = [
        { label: 'Show Photo', value: 'showPhoto' },
        { label: 'Show Full Name / Account Name', value: 'showFullName' },
        { label: 'Show Location', value: 'showLocation' }
    ];

    selectedBasicFields = ['showPhoto', 'showFullName', 'showLocation'];

    additionalProfileFields = [];

    // Contact Section Configuration
    basicContactFieldOptions = [
        { label: 'Show Email', value: 'showEmail' },
        { label: 'Show Phone', value: 'showPhone' },
        { label: 'Show Address', value: 'showAddress' }
    ];

    selectedBasicContactFields = ['showEmail', 'showPhone'];

    additionalContactFields = [];

    // Handle basic contact field changes
    handleBasicContactFieldChange(event) {
        const selectedValues = event.detail.value;
        console.log('Contact fields changed:', selectedValues);
        
        // Update selectedBasicContactFields
        this.selectedBasicContactFields = selectedValues;
        
        // Update contactConfig.basicFields
        this.contactConfig = {
            ...this.contactConfig,
            basicFields: {
                showEmail: selectedValues.includes('showEmail'),
                showPhone: selectedValues.includes('showPhone'),
                showAddress: selectedValues.includes('showAddress')
            }
        };
        
        console.log('Updated contact config:', this.contactConfig);
    }

    // Insight Section Configuration
    additionalInsightFields = [];

    // Accordion state - only one section can be open at a time
    @track activeAccordionSection = '';

    // Popover state
    @track showFieldConfigPopover = false;
    @track editingFieldId = '';
    @track configCalculatedInsightName = '';
    @track configFieldName = '';
    @track configDisplayLabel = '';
    @track configIcon = '';
    @track popoverStyle = '';
    @track popoverNubbinClass = 'slds-nubbin_left';

    // Field configuration options
    fieldNameOptions = [
        { label: 'Customer Id', value: 'customerId' },
        { label: 'Loyalty Member Tier', value: 'loyaltyMemberTier' }
    ];

    // Calculated Insight Name options
    calculatedInsightNameOptions = [
        { label: 'Lifetime Value', value: 'lifetimeValue' },
        { label: 'Purchase Propensity', value: 'purchasePropensity' }
    ];

    // Icon options for Insight section
    insightIconOptions = [
        { label: 'Cart', value: 'cart' },
        { label: 'Shopping Bag', value: 'shopping_bag' }
    ];

    iconOptions = [
        { label: 'Ribbon', value: 'ribbon' },
        { label: 'User', value: 'user' }
    ];

    // Computed properties
    get popoverClasses() {
        return `slds-popover field-config-popover ${this.popoverNubbinClass}`;
    }

    // Conditional metric name options based on calculated insight name
    get metricNameOptions() {
        if (this.configCalculatedInsightName === 'lifetimeValue') {
            return [{ label: 'LTV', value: 'ltv' }];
        } else if (this.configCalculatedInsightName === 'purchasePropensity') {
            return [{ label: 'Likelihood to Purchase', value: 'likelihoodToPurchase' }];
        }
        return []; // No options if no calculated insight name is selected
    }

    // Determine which icon options to use based on field type
    get currentIconOptions() {
        // Check if this is an insight field
        if (this.editingFieldId && this.editingFieldId.startsWith('insightField')) {
            return this.insightIconOptions;
        }
        return this.iconOptions;
    }

    // Check if currently editing an insight field
    get isInsightField() {
        return this.editingFieldId && this.editingFieldId.startsWith('insightField');
    }

    // Dynamic label for Field Name / Metric Name
    get fieldNameLabel() {
        return this.isInsightField ? 'Metric Name' : 'Field Name';
    }

    // Dynamic placeholder for Field Name / Metric Name
    get fieldNamePlaceholder() {
        return this.isInsightField ? 'Select a metric' : 'Select a field';
    }

    // Dynamic options for Field Name / Metric Name
    get fieldNameOptionsToUse() {
        return this.isInsightField ? this.metricNameOptions : this.fieldNameOptions;
    }

    get isDoneButtonDisabled() {
        return !this.configFieldName; // Disable if no field name is selected
    }

    get isAddFieldButtonDisabled() {
        // Only disable if already have 2 fields (allow clicking even when popover is open)
        return this.additionalProfileFields.length >= 2;
    }

    get isAddContactFieldButtonDisabled() {
        // Only disable if already have 2 contact fields (allow clicking even when popover is open)
        return this.additionalContactFields.length >= 2;
    }

    get isAddInsightFieldButtonDisabled() {
        // Only disable if already have 2 insight fields (allow clicking even when popover is open)
        return this.additionalInsightFields.length >= 2;
    }

    // Profile Section Event Handlers
    handleAddProfileField() {
        // Prevent adding more than 2 fields
        if (this.additionalProfileFields.length >= 2) {
            console.log('Cannot add more fields: Maximum of 2 fields allowed');
            return;
        }
        
        // If popover is open for another field, close it first (this will remove unsaved fields)
        if (this.showFieldConfigPopover) {
            console.log('Closing existing popover before adding new profile field');
            this.handleConfigClose();
        }
        
        const newFieldId = `field${Date.now()}`;
        const newField = {
            id: newFieldId,
            displayName: 'New Field',
            apiName: 'NewField__c'
        };
        this.additionalProfileFields = [...this.additionalProfileFields, newField];
        
        // Show popover for the new field
        this.editingFieldId = newFieldId;
        this.configCalculatedInsightName = '';
        this.configFieldName = '';
        this.configDisplayLabel = '';
        this.configIcon = '';
        this.showFieldConfigPopover = true;
        
        // Position popover after DOM update
        setTimeout(() => {
            this.positionPopover();
        }, 100);
    }

    handleEditField(event) {
        console.log('Editing field');
        
        // Get the field ID from the clicked element
        const fieldId = event.currentTarget.dataset.fieldId;
        
        // Check if popover is already open for this field
        if (this.showFieldConfigPopover && this.editingFieldId === fieldId) {
            console.log('Popover already open for this field, ignoring click');
            return;
        }
        
        // If popover is open for a different field, close it first (this will remove unsaved fields)
        if (this.showFieldConfigPopover && this.editingFieldId !== fieldId) {
            console.log('Closing existing popover before opening new one');
            this.handleConfigClose();
        }
        
        // Find the field to edit
        const fieldToEdit = this.additionalProfileFields.find(field => field.id === fieldId);
        if (!fieldToEdit) {
            console.error('Field not found:', fieldId);
            return;
        }
        
        console.log('Editing field:', fieldToEdit);
        
        // Set up for editing this field
        this.editingFieldId = fieldId;
        this.configCalculatedInsightName = fieldToEdit.calculatedInsightName || '';
        this.configFieldName = fieldToEdit.fieldName || '';
        
        // For Display Label: don't pre-fill if it's "New Field" (indicates a new, unconfigured field)
        const isNewUnconfiguredField = fieldToEdit.displayName === 'New Field' || fieldToEdit.displayLabel === 'New Field';
        this.configDisplayLabel = isNewUnconfiguredField ? '' : (fieldToEdit.displayLabel || fieldToEdit.displayName || '');
        
        this.configIcon = fieldToEdit.icon ? fieldToEdit.icon.replace('utility:', '') : '';
        
        // Show the popover
        this.showFieldConfigPopover = true;
        
        // Position the popover after the DOM updates
        setTimeout(() => {
            this.positionPopover();
        }, 100);
    }

    // Handle accordion section clicks - only allows opening different sections
    handleAccordionClick(event) {
        const section = event.target.closest('lightning-accordion-section');
        if (!section) {
            return; // Click was not on a section header
        }
        
        const sectionName = section.name;
        console.log('Accordion section clicked:', sectionName, 'Currently active:', this.activeAccordionSection);
        
        // If clicking a collapsed section (different from currently active) and popover is open, close it
        if (this.activeAccordionSection !== sectionName && this.showFieldConfigPopover) {
            console.log('Closing popover due to clicking collapsed accordion section');
            this.handleConfigClose();
        }
        
        // If clicking the currently open section, do nothing
        if (this.activeAccordionSection === sectionName) {
            console.log('Clicked on already open section, no action taken');
            return;
        }
        
        // Open the clicked section (and close any other)
        this.activeAccordionSection = sectionName;
        console.log('Opened accordion section:', sectionName);
        
        // Always close all dropdown menus when accordion state changes
        this.showProfileMenu = false;
        this.showContactMenu = false;
        this.showInsightsMenu = false;
    }

    // Accordion toggle event handler (for standard accordion behavior)
    handleAccordionToggle(event) {
        const openSections = event.detail.openSections;
        console.log('Accordion toggled, open sections:', openSections);
        
        // Update active section based on what's actually open
        if (openSections && openSections.length > 0) {
            this.activeAccordionSection = openSections[0]; // Only keep the first one open
        } else {
            this.activeAccordionSection = '';
        }
        
        // Always close all dropdown menus when any accordion section state changes
        this.showProfileMenu = false;
        this.showContactMenu = false;
        this.showInsightsMenu = false;
        
        console.log('All dropdown menus closed (Profile, Contact, Insights)');
    }

    // Popover positioning and event handlers
    positionPopover() {
        if (!this.showFieldConfigPopover || !this.editingFieldId) {
            console.log('Popover positioning skipped - not visible or no editing field');
            return;
        }

        const pill = this.template.querySelector(`[data-field-id="${this.editingFieldId}"]`);
        const propertiesPanel = this.template.querySelector('.properties-panel');
        const propertiesBody = this.template.querySelector('.properties-body');
        
        if (!pill || !propertiesPanel || !propertiesBody) {
            console.log('Popover positioning skipped - elements not found', { pill, propertiesPanel, propertiesBody });
            return;
        }

        const pillRect = pill.getBoundingClientRect();
        const panelRect = propertiesPanel.getBoundingClientRect();
        const bodyRect = propertiesBody.getBoundingClientRect();
        
        console.log('Positioning popover:', {
            pillRect,
            panelRect,
            bodyRect,
            editingFieldId: this.editingFieldId,
            bodyScrollTop: propertiesBody.scrollTop
        });
        
        // Calculate position relative to the properties panel
        // Since the panel is fixed positioned, we need to account for the scrollable body
        const pillRelativeTop = pillRect.top - panelRect.top;
        const pillRelativeLeft = pillRect.left - panelRect.left;
        
        console.log('Relative position:', { pillRelativeTop, pillRelativeLeft });
        
        // Popover dimensions (matching Figma design)
        const popoverWidth = 277;  // From Figma: w-[277px]
        const popoverHeight = 265; // From Figma: h-[265px]
        
        // Position to the RIGHT of the pill (as shown in Figma)
        // The popover should appear to the right with left-pointing nubbin
        let left = pillRelativeLeft + pillRect.width + 12; // 12px gap from pill
        let top = pillRelativeTop + (pillRect.height / 2) - (popoverHeight / 2); // Center align vertically
        let nubbinClass = 'slds-nubbin_left'; // Left-pointing nubbin as shown in Figma
        
        // Ensure popover stays within the panel bounds
        if (left + popoverWidth > panelRect.width - 16) {
            // If doesn't fit on the right, position to the left
            left = pillRelativeLeft - popoverWidth - 12;
            nubbinClass = 'slds-nubbin_right';
        }
        
        // Ensure popover stays within vertical bounds of the panel
        if (top < 16) {
            top = 16;
        } else if (top + popoverHeight > panelRect.height - 16) {
            top = panelRect.height - popoverHeight - 16;
        }
        
        console.log('Final popover position:', { left, top, nubbinClass });
        
        this.popoverNubbinClass = nubbinClass;
        this.popoverStyle = `position: absolute; left: ${left}px; top: ${top}px; z-index: 9999;`;
    }

    handleCalculatedInsightNameChange(event) {
        this.configCalculatedInsightName = event.target.value;
        
        // Clear the metric name when calculated insight name changes
        this.configFieldName = '';
        
        // Auto-select the only available metric option
        if (this.metricNameOptions.length === 1) {
            this.configFieldName = this.metricNameOptions[0].value;
            
            // Always auto-fill Display Label with the selected metric name
            this.configDisplayLabel = this.metricNameOptions[0].label;
        }
    }

    handleFieldNameConfigChange(event) {
        this.configFieldName = event.target.value;
        
        // Always auto-populate display label with the selected field name label
        // For insight fields, use metric name options
        if (this.editingFieldId && this.editingFieldId.startsWith('insightField')) {
            const selectedOption = this.metricNameOptions.find(opt => opt.value === event.target.value);
            if (selectedOption) {
                this.configDisplayLabel = selectedOption.label;
            }
        } else {
            // For other fields, use regular field name options
            const selectedOption = this.fieldNameOptions.find(opt => opt.value === event.target.value);
            if (selectedOption) {
                this.configDisplayLabel = selectedOption.label;
            }
        }
    }

    handleDisplayLabelConfigChange(event) {
        this.configDisplayLabel = event.target.value;
    }

    handleIconConfigChange(event) {
        this.configIcon = event.target.value;
    }

    handleConfigDone() {
        // Validate that a field name is selected
        if (!this.configFieldName) {
            console.log('Cannot save: No field name selected');
            return; // Don't allow saving without a field name
        }
        
        // Create the new field configuration
        const newField = {
            id: this.editingFieldId,
            displayLabel: this.configDisplayLabel || 'New Field',
            fieldName: this.configFieldName,
            calculatedInsightName: this.configCalculatedInsightName,
            icon: `utility:${this.configIcon}`, // Add utility prefix for SLDS icons
            displayName: this.configDisplayLabel || 'New Field'
        };

        // Determine field type based on ID prefix
        const isContactField = this.editingFieldId.startsWith('contactField');
        const isInsightField = this.editingFieldId.startsWith('insightField');
        
        if (isContactField) {
            // Update the local additionalContactFields for the properties panel
            this.additionalContactFields = this.additionalContactFields.map(field => {
                if (field.id === this.editingFieldId) {
                    return newField;
                }
                return field;
            });

            // Add the new field to contactConfig.additionalFields to show in the Unified Profile Card
            if (!this.contactConfig.additionalFields) {
                this.contactConfig.additionalFields = [];
            }
            
            // Check if field already exists in contactConfig, if not add it
            const existingFieldIndex = this.contactConfig.additionalFields.findIndex(
                field => field.id === this.editingFieldId
            );
            
            if (existingFieldIndex >= 0) {
                // Update existing field
                this.contactConfig.additionalFields[existingFieldIndex] = newField;
            } else {
                // Add new field
                this.contactConfig.additionalFields = [...this.contactConfig.additionalFields, newField];
            }
            
            console.log('Updated contact config with new field:', this.contactConfig);
        } else if (isInsightField) {
            // Update the local additionalInsightFields for the properties panel
            this.additionalInsightFields = this.additionalInsightFields.map(field => {
                if (field.id === this.editingFieldId) {
                    return newField;
                }
                return field;
            });

            // Add the new field to insightsConfig.additionalFields to show in the Unified Profile Card
            if (!this.insightsConfig) {
                this.insightsConfig = { additionalFields: [] };
            }
            if (!this.insightsConfig.additionalFields) {
                this.insightsConfig.additionalFields = [];
            }
            
            // Check if field already exists in insightsConfig, if not add it
            const existingFieldIndex = this.insightsConfig.additionalFields.findIndex(
                field => field.id === this.editingFieldId
            );
            
            if (existingFieldIndex >= 0) {
                // Update existing field
                this.insightsConfig.additionalFields[existingFieldIndex] = newField;
            } else {
                // Add new field
                this.insightsConfig.additionalFields = [...this.insightsConfig.additionalFields, newField];
            }
            
            console.log('Updated insights config with new field:', this.insightsConfig);
        } else {
            // Update the local additionalProfileFields for the properties panel
            this.additionalProfileFields = this.additionalProfileFields.map(field => {
                if (field.id === this.editingFieldId) {
                    return newField;
                }
                return field;
            });

            // Add the new field to profileConfig.additionalFields to show in the Unified Profile Card
            if (!this.profileConfig.additionalFields) {
                this.profileConfig.additionalFields = [];
            }
            
            // Check if field already exists in profileConfig, if not add it
            const existingFieldIndex = this.profileConfig.additionalFields.findIndex(
                field => field.id === this.editingFieldId
            );
            
            if (existingFieldIndex >= 0) {
                // Update existing field
                this.profileConfig.additionalFields[existingFieldIndex] = newField;
            } else {
                // Add new field
                this.profileConfig.additionalFields = [...this.profileConfig.additionalFields, newField];
            }
            
            console.log('Updated profile config with new field:', this.profileConfig);
        }
        
        // Close popover
        this.showFieldConfigPopover = false;
        this.editingFieldId = '';
        
        // Reset form values
        this.configCalculatedInsightName = '';
        this.configFieldName = '';
        this.configDisplayLabel = '';
        this.configIcon = '';
    }

    handleConfigClose() {
        // Determine field type based on ID prefix
        const isContactField = this.editingFieldId.startsWith('contactField');
        const isInsightField = this.editingFieldId.startsWith('insightField');
        
        // Check if this is a new field (not yet saved to config) or existing field
        let isNewField;
        if (isContactField) {
            isNewField = !this.contactConfig.additionalFields || 
                        !this.contactConfig.additionalFields.some(field => field.id === this.editingFieldId);
        } else if (isInsightField) {
            isNewField = !this.insightsConfig || !this.insightsConfig.additionalFields || 
                        !this.insightsConfig.additionalFields.some(field => field.id === this.editingFieldId);
        } else {
            isNewField = !this.profileConfig.additionalFields || 
                        !this.profileConfig.additionalFields.some(field => field.id === this.editingFieldId);
        }
        
        if (isNewField) {
            // For new fields: remove the pill from the properties panel
            console.log('Canceling new field creation, removing pill');
            if (isContactField) {
                this.additionalContactFields = this.additionalContactFields.filter(
                    field => field.id !== this.editingFieldId
                );
            } else if (isInsightField) {
                this.additionalInsightFields = this.additionalInsightFields.filter(
                    field => field.id !== this.editingFieldId
                );
            } else {
                this.additionalProfileFields = this.additionalProfileFields.filter(
                    field => field.id !== this.editingFieldId
                );
            }
        } else {
            // For existing fields: just cancel the edit (no changes needed)
            console.log('Canceling field edit, no changes made');
        }
        
        // Close popover without saving changes
        this.showFieldConfigPopover = false;
        this.editingFieldId = '';
        
        // Reset form values
        this.configCalculatedInsightName = '';
        this.configFieldName = '';
        this.configDisplayLabel = '';
        this.configIcon = '';
    }

    handleRemoveField(event) {
        // Get the field ID from the clicked element
        const fieldId = event.currentTarget.dataset.fieldId;
        
        console.log('Removing field:', fieldId);
        
        // Remove from additionalProfileFields (properties panel)
        this.additionalProfileFields = this.additionalProfileFields.filter(
            field => field.id !== fieldId
        );
        
        // Remove from profileConfig.additionalFields (Unified Profile Card)
        if (this.profileConfig.additionalFields) {
            this.profileConfig.additionalFields = this.profileConfig.additionalFields.filter(
                field => field.id !== fieldId
            );
        }
        
        console.log('Updated profile config after removal:', this.profileConfig);
        
        // If the popover is open for this field, close it
        if (this.editingFieldId === fieldId) {
            this.showFieldConfigPopover = false;
            this.editingFieldId = '';
            this.configCalculatedInsightName = '';
            this.configFieldName = '';
            this.configDisplayLabel = '';
            this.configIcon = '';
        }
    }

    // Contact Section Event Handlers
    handleAddContactField() {
        // Prevent adding more than 2 fields
        if (this.additionalContactFields.length >= 2) {
            console.log('Cannot add more contact fields: Maximum of 2 fields allowed');
            return;
        }
        
        // If popover is open for another field, close it first (this will remove unsaved fields)
        if (this.showFieldConfigPopover) {
            console.log('Closing existing popover before adding new contact field');
            this.handleConfigClose();
        }
        
        const newFieldId = `contactField${Date.now()}`;
        const newField = {
            id: newFieldId,
            displayName: 'New Field',
            apiName: 'NewField__c'
        };
        this.additionalContactFields = [...this.additionalContactFields, newField];
        
        // Show popover for the new field
        this.editingFieldId = newFieldId;
        this.configCalculatedInsightName = '';
        this.configFieldName = '';
        this.configDisplayLabel = '';
        this.configIcon = '';
        this.showFieldConfigPopover = true;
        
        // Position popover after DOM update
        setTimeout(() => {
            this.positionPopover();
        }, 100);
    }

    handleEditContactField(event) {
        console.log('Editing contact field');
        
        // Get the field ID from the clicked element
        const fieldId = event.currentTarget.dataset.fieldId;
        
        // Check if popover is already open for this field
        if (this.showFieldConfigPopover && this.editingFieldId === fieldId) {
            console.log('Popover already open for this contact field, ignoring click');
            return;
        }
        
        // If popover is open for a different field, close it first (this will remove unsaved fields)
        if (this.showFieldConfigPopover && this.editingFieldId !== fieldId) {
            console.log('Closing existing popover before opening new contact field popover');
            this.handleConfigClose();
        }
        
        // Find the field to edit
        const fieldToEdit = this.additionalContactFields.find(field => field.id === fieldId);
        if (!fieldToEdit) {
            console.error('Contact field not found:', fieldId);
            return;
        }
        
        console.log('Editing contact field:', fieldToEdit);
        
        // Set up for editing this field
        this.editingFieldId = fieldId;
        this.configCalculatedInsightName = fieldToEdit.calculatedInsightName || '';
        this.configFieldName = fieldToEdit.fieldName || '';
        
        // For Display Label: don't pre-fill if it's "New Field" (indicates a new, unconfigured field)
        const isNewUnconfiguredField = fieldToEdit.displayName === 'New Field' || fieldToEdit.displayLabel === 'New Field';
        this.configDisplayLabel = isNewUnconfiguredField ? '' : (fieldToEdit.displayLabel || fieldToEdit.displayName || '');
        
        this.configIcon = fieldToEdit.icon ? fieldToEdit.icon.replace('utility:', '') : '';
        
        // Show the popover
        this.showFieldConfigPopover = true;
        
        // Position the popover after the DOM updates
        setTimeout(() => {
            this.positionPopover();
        }, 100);
    }

    handleRemoveContactField(event) {
        // Get the field ID from the clicked element
        const fieldId = event.currentTarget.dataset.fieldId;
        
        console.log('Removing contact field:', fieldId);
        
        // Remove from additionalContactFields (properties panel)
        this.additionalContactFields = this.additionalContactFields.filter(
            field => field.id !== fieldId
        );
        
        // Remove from contactConfig.additionalFields (Unified Profile Card)
        if (this.contactConfig.additionalFields) {
            this.contactConfig.additionalFields = this.contactConfig.additionalFields.filter(
                field => field.id !== fieldId
            );
        }
        
        console.log('Updated contact config after removal:', this.contactConfig);
        
        // If the popover is open for this field, close it
        if (this.editingFieldId === fieldId) {
            this.showFieldConfigPopover = false;
            this.editingFieldId = '';
            this.configCalculatedInsightName = '';
            this.configFieldName = '';
            this.configDisplayLabel = '';
            this.configIcon = '';
        }
    }

    // Insight Section Event Handlers
    handleAddInsightField() {
        console.log('handleAddInsightField called - this should be for Insight section');
        
        // Prevent adding more than 2 fields
        if (this.additionalInsightFields.length >= 2) {
            console.log('Cannot add more insight fields: Maximum of 2 fields allowed');
            return;
        }
        
        // If popover is open for another field, close it first (this will remove unsaved fields)
        if (this.showFieldConfigPopover) {
            console.log('Closing existing popover before adding new insight field');
            this.handleConfigClose();
        }
        
        const newFieldId = `insightField${Date.now()}`;
        console.log('Generated insight field ID:', newFieldId);
        
        const newField = {
            id: newFieldId,
            displayName: 'New Field',
            apiName: 'NewField__c'
        };
        this.additionalInsightFields = [...this.additionalInsightFields, newField];
        
        console.log('Created insight field:', newField);
        
        // Show popover for the new field
        this.editingFieldId = newFieldId;
        this.configCalculatedInsightName = '';
        this.configFieldName = '';
        this.configDisplayLabel = '';
        this.configIcon = '';
        this.showFieldConfigPopover = true;
        
        // Position popover after DOM update
        setTimeout(() => {
            this.positionPopover();
        }, 100);
    }

    handleEditInsightField(event) {
        console.log('Editing insight field');
        
        // Get the field ID from the clicked element
        const fieldId = event.currentTarget.dataset.fieldId;
        
        // Check if popover is already open for this field
        if (this.showFieldConfigPopover && this.editingFieldId === fieldId) {
            console.log('Popover already open for this insight field, ignoring click');
            return;
        }
        
        // If popover is open for a different field, close it first (this will remove unsaved fields)
        if (this.showFieldConfigPopover && this.editingFieldId !== fieldId) {
            console.log('Closing existing popover before opening new insight field popover');
            this.handleConfigClose();
        }
        
        // Find the field to edit
        const fieldToEdit = this.additionalInsightFields.find(field => field.id === fieldId);
        if (!fieldToEdit) {
            console.error('Insight field not found:', fieldId);
            return;
        }
        
        console.log('Editing insight field:', fieldToEdit);
        
        // Set up for editing this field
        this.editingFieldId = fieldId;
        this.configCalculatedInsightName = fieldToEdit.calculatedInsightName || '';
        this.configFieldName = fieldToEdit.fieldName || '';
        
        // For Display Label: don't pre-fill if it's "New Field" (indicates a new, unconfigured field)
        const isNewUnconfiguredField = fieldToEdit.displayName === 'New Field' || fieldToEdit.displayLabel === 'New Field';
        this.configDisplayLabel = isNewUnconfiguredField ? '' : (fieldToEdit.displayLabel || fieldToEdit.displayName || '');
        
        this.configIcon = fieldToEdit.icon ? fieldToEdit.icon.replace('utility:', '') : '';
        
        
        // Show the popover
        this.showFieldConfigPopover = true;
        
        // Position the popover after the DOM updates
        setTimeout(() => {
            this.positionPopover();
        }, 100);
    }

    handleRemoveInsightField(event) {
        // Get the field ID from the clicked element
        const fieldId = event.currentTarget.dataset.fieldId;
        
        console.log('Removing insight field:', fieldId);
        
        // Remove from additionalInsightFields (properties panel)
        this.additionalInsightFields = this.additionalInsightFields.filter(
            field => field.id !== fieldId
        );
        
        // Remove from insightsConfig.additionalFields (Unified Profile Card)
        if (this.insightsConfig && this.insightsConfig.additionalFields) {
            this.insightsConfig.additionalFields = this.insightsConfig.additionalFields.filter(
                field => field.id !== fieldId
            );
        }
        
        console.log('Updated insights config after removal:', this.insightsConfig);
        
        // If the popover is open for this field, close it
        if (this.editingFieldId === fieldId) {
            this.showFieldConfigPopover = false;
            this.editingFieldId = '';
            this.configCalculatedInsightName = '';
            this.configFieldName = '';
            this.configDisplayLabel = '';
            this.configIcon = '';
        }
    }

    // Lifecycle methods for scroll/resize tracking
    connectedCallback() {
        // Add scroll listeners to all potential scrollable areas
        setTimeout(() => {
            const propertiesPanel = this.template.querySelector('.properties-panel');
            const propertiesBody = this.template.querySelector('.properties-body');
            
            // Add listeners to both panel and body to catch any scrolling
            if (propertiesPanel) {
                propertiesPanel.addEventListener('scroll', this.handleScroll.bind(this));
            }
            if (propertiesBody) {
                propertiesBody.addEventListener('scroll', this.handleScroll.bind(this));
            }
            
            // Also add listener to the accordion section content
            const accordionContent = this.template.querySelector('.profile-section-content');
            if (accordionContent) {
                accordionContent.addEventListener('scroll', this.handleScroll.bind(this));
            }
        }, 100);
        
        // Add resize listener to window
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    disconnectedCallback() {
        // Remove event listeners
        const propertiesPanel = this.template.querySelector('.properties-panel');
        const propertiesBody = this.template.querySelector('.properties-body');
        const accordionContent = this.template.querySelector('.profile-section-content');
        
        if (propertiesPanel) {
            propertiesPanel.removeEventListener('scroll', this.handleScroll.bind(this));
        }
        if (propertiesBody) {
            propertiesBody.removeEventListener('scroll', this.handleScroll.bind(this));
        }
        if (accordionContent) {
            accordionContent.removeEventListener('scroll', this.handleScroll.bind(this));
        }
        
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    handleScroll() {
        if (this.showFieldConfigPopover) {
            console.log('Scroll detected, repositioning popover');
            // Throttle scroll updates
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            this.scrollTimeout = setTimeout(() => {
                this.positionPopover();
            }, 16); // ~60fps
        }
    }

    handleResize() {
        if (this.showFieldConfigPopover) {
            // Throttle resize updates
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }
            this.resizeTimeout = setTimeout(() => {
                this.positionPopover();
            }, 100);
        }
    }

}
