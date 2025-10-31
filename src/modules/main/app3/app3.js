import { LightningElement, track } from 'lwc';

export default class App3 extends LightningElement {
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

    // Prototype 3 doesn't use modals - removed modal properties
    
    // Section visibility
    showInsightsSection = false;
    
    // Accordion state - Manage Sections open by default
    @track activeAccordionSection = 'customizeSections';
    
    // Profile configuration data
    profileConfig = {
        basicFields: {
            showPhoto: true,
            showFullName: true,
            showLocation: true
        },
        additionalFields: [],
        additionalSections: [] // Section 1 maps to Contact Section, not additional sections
    };
    
    // Contact configuration data
    contactConfig = {
        basicFields: {
            showEmail: true,
            showPhone: true,
            showAddress: false
        },
        additionalFields: [] // No additional fields since Section 1 field count is disabled
    };
    
    // Insights configuration data
    insightsConfig = {
        additionalFields: []
    };

    // Field configuration state
    @track selectedFieldId = '';
    @track selectedSectionId = '';
    @track isFieldConfigMode = false;
    @track fieldConfigData = {
        objectName: '',
        fieldName: '',
        displayLabel: '',
        icon: '',
        fieldType: 'text'
    };

    // Popover-style field configuration (copied from Prototype 2)
    @track editingFieldId = '';
    @track configObjectName = '';
    @track configFieldName = '';
    @track configDisplayLabel = '';
    @track configIcon = '';

    // Card selection state
    @track isCardSelected = true; // Card is selected by default

    get hasInsightFields() {
        return this.insightsConfig.additionalFields && this.insightsConfig.additionalFields.length > 0;
    }

    // Computed classes for selection border and handles
    get selectionBorderClass() {
        const className = this.isCardSelected ? 'selection-border' : 'selection-border-hidden';
        console.log('selectionBorderClass computed:', className, 'isCardSelected:', this.isCardSelected);
        return className;
    }

    get resizeHandleTopClass() {
        return this.isCardSelected ? 'resize-handle resize-handle-top' : 'resize-handle-hidden';
    }

    get resizeHandleBottomClass() {
        return this.isCardSelected ? 'resize-handle resize-handle-bottom' : 'resize-handle-hidden';
    }


    // Prototype switcher getters - Prototype 3 is active
    get prototype1TabClass() {
        return 'prototype-tab';
    }

    get prototype2TabClass() {
        return 'prototype-tab';
    }

    get prototype3TabClass() {
        return 'prototype-tab active';
    }

    // Profile Section Configuration (from Prototype 2)
    basicProfileFieldOptions = [
        { label: 'Show Photo', value: 'showPhoto' },
        { label: 'Show Full Name / Account Name', value: 'showFullName' },
        { label: 'Show Location', value: 'showLocation' }
    ];

    selectedBasicFields = ['showPhoto', 'showFullName', 'showLocation'];
    additionalProfileFields = [
        {
            id: 'section1',
            displayName: 'Section 1',
            apiName: 'Section1__c',
            fieldCount: 2,
            isVisible: true,
            hasFieldCountError: false,
            fieldCountErrorMessage: '',
            get visibilityMenuLabel() {
                return this.isVisible ? 'Set as Invisible' : 'Set as Visible';
            }
        }
    ];

    get isAddFieldButtonDisabled() {
        return this.additionalProfileFields.length >= 3; // Disable when 3 sections reached
    }

    // Object name options for combobox
    objectNameOptions = [
        { label: 'Contact Point Address', value: 'ContactPointAddress' },
        { label: 'Contact Point Email', value: 'ContactPointEmail' },
        { label: 'Contact Point Phone', value: 'ContactPointPhone' },
        { label: 'Individual', value: 'Individual' },
        { label: 'Lifetime Value', value: 'LifetimeValue' },
        { label: 'Purchase Propensity', value: 'PurchasePropensity' }
    ];

    // Field name options for combobox (populated based on selected object)
    @track fieldNameOptions = [];

    // Field mappings for each object type
    objectFieldMappings = {
        'ContactPointAddress': [
            { label: 'Address', value: 'Address' },
            { label: 'Geo Latitude', value: 'GeoLatitude' },
            { label: 'Geo Longitude', value: 'GeoLongitude' },
            { label: 'Postal Code', value: 'PostalCode' }
        ],
        'ContactPointEmail': [
            { label: 'Best Time To Contact End Time', value: 'BestTimeToContactEndTime' },
            { label: 'Best Time To Contact Start', value: 'BestTimeToContactStart' },
            { label: 'Email Address', value: 'EmailAddress' }
        ],
        'ContactPointPhone': [
            { label: 'Best Time To Contact End Time', value: 'BestTimeToContactEndTime' },
            { label: 'Best Time To Contact Start', value: 'BestTimeToContactStart' },
            { label: 'Phone Number', value: 'PhoneNumber' }
        ],
        'Individual': [
            { label: 'Customer Id', value: 'CustomerId' },
            { label: 'Loyalty Member Tier', value: 'LoyaltyMemberTier' }
        ],
        'LifetimeValue': [
            { label: 'LTV', value: 'LTV' }
        ],
        'PurchasePropensity': [
            { label: 'Likelihood to Purchase', value: 'LikelihoodToPurchase' }
        ]
    };

    // Field configuration options
    fieldTypeOptions = [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'Date', value: 'date' },
        { label: 'URL', value: 'url' }
    ];

    fieldIconOptions = [
        { label: 'Info', value: 'utility:info' },
        { label: 'User', value: 'utility:user' },
        { label: 'Email', value: 'utility:email' },
        { label: 'Phone', value: 'utility:call' },
        { label: 'Location', value: 'utility:location' },
        { label: 'Calendar', value: 'utility:event' },
        { label: 'Link', value: 'utility:link' },
        { label: 'Text', value: 'utility:text' }
    ];

    // Computed property for field name disabled state
    get fieldNameDisabled() {
        return !this.fieldConfigData.objectName;
    }

    // Computed properties from Prototype 2
    get isInsightField() {
        return this.editingFieldId && this.editingFieldId.includes('insight');
    }

    get fieldNameLabel() {
        return this.isInsightField ? 'Metric Name' : 'Field Name';
    }

    get fieldNamePlaceholder() {
        return 'Select a field';
    }

    get fieldNameOptionsToUse() {
        return this.isInsightField ? this.metricNameOptions : this.fieldNameOptions;
    }

    get currentIconOptions() {
        return this.isInsightField ? this.insightIconOptions : this.iconOptions;
    }

    // Field configuration options (copied from Prototype 2)
    calculatedInsightNameOptions = [
        { label: 'Lifetime Value', value: 'lifetimeValue' },
        { label: 'Purchase Propensity', value: 'purchasePropensity' }
    ];

    metricNameOptions = [
        { label: 'Customer Id', value: 'customerId' },
        { label: 'Loyalty Member Tier', value: 'loyaltyMemberTier' }
    ];

    insightIconOptions = [
        { label: 'Cart', value: 'cart' },
        { label: 'Shopping Bag', value: 'shopping_bag' }
    ];

    iconOptions = [
        { label: 'cart', value: 'utility:cart' },
        { label: 'email', value: 'utility:email' },
        { label: 'home', value: 'utility:home' },
        { label: 'phone', value: 'utility:call' },
        { label: 'ribbon', value: 'utility:ribbon' },
        { label: 'shopping bag', value: 'utility:shopping_bag' },
        { label: 'user', value: 'utility:user' }
    ];

    // Component items for the panel
    componentItems = [
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

    // Profile handlers - will be modified to not use modals
    handleProfileEdit() {
        console.log('Edit profile section - inline editing for Prototype 3');
        this.showProfileMenu = false;
        // TODO: Implement inline editing instead of modal
    }

    handleProfileSetInvisible() {
        console.log('Set profile as invisible');
        this.showProfileMenu = false;
    }

    handleProfileDelete() {
        console.log('Delete profile section');
        this.showProfileMenu = false;
    }

    // Contact handlers - will be modified to not use modals
    handleContactEdit() {
        console.log('Edit contact section - inline editing for Prototype 3');
        this.showContactMenu = false;
        // TODO: Implement inline editing instead of modal
    }

    handleContactSetInvisible() {
        console.log('Set contact as invisible');
        this.showContactMenu = false;
    }

    handleContactDelete() {
        console.log('Delete contact section');
        this.showContactMenu = false;
    }

    // Profile name click handler - will be modified to not use modals
    handleProfileNameClick() {
        console.log('Profile name clicked - inline editing for Prototype 3');
        // TODO: Implement inline editing instead of modal
    }

    // Contact name click handler - will be modified to not use modals
    handleContactNameClick() {
        console.log('Contact name clicked - inline editing for Prototype 3');
        // TODO: Implement inline editing instead of modal
    }

    // Add Section handlers - will be modified to not use modals
    handleAddSectionClick() {
        console.log('Add section clicked - inline for Prototype 3');
        // TODO: Implement inline section addition instead of modal
    }

    // Insights section event handlers - will be modified to not use modals
    handleInsightsMenu() {
        this.showInsightsMenu = !this.showInsightsMenu;
        // Close other menus
        this.showProfileMenu = false;
        this.showContactMenu = false;
    }

    handleInsightsNameClick() {
        console.log('Insights name clicked - inline editing for Prototype 3');
        // TODO: Implement inline editing instead of modal
    }

    handleInsightsEdit() {
        console.log('Edit insights section - inline editing for Prototype 3');
        this.showInsightsMenu = false;
        // TODO: Implement inline editing instead of modal
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
        window.location.href = window.location.origin + '/';
    }

    handlePrototype2Click() {
        console.log('Navigating to Prototype 2');
        window.location.href = window.location.origin + '/app2';
    }

    handlePrototype3Click() {
        console.log('Staying on Prototype 3');
        // Already on Prototype 3, no action needed
    }

    // Accordion event handler
    handleAccordionToggle(event) {
        const openSections = event.detail.openSections;
        console.log('Accordion toggled, open sections:', openSections);
        
        // Update active section based on what's actually open
        if (openSections && openSections.length > 0) {
            this.activeAccordionSection = openSections[0]; // Keep the first one open
        } else {
            this.activeAccordionSection = '';
        }
        
        // Always close all dropdown menus when any accordion section state changes
        this.showProfileMenu = false;
        this.showContactMenu = false;
        this.showInsightsMenu = false;
        
        console.log('All dropdown menus closed (Profile, Contact, Insights)');
    }

    // Specific handler for Customize Sections toggle
    handleCustomizeSectionToggle(event) {
        console.log('Customize Sections toggled:', event.detail);
        
        // Always close dropdown menus when Customize Sections is toggled
        this.showProfileMenu = false;
        this.showContactMenu = false;
        this.showInsightsMenu = false;
        
        console.log('Dropdown menus closed due to Customize Sections toggle');
    }

    // Profile field management methods (simplified for Prototype 3)
    handleAddProfileField() {
        if (this.additionalProfileFields.length >= 3) {
            console.log('Cannot add more sections: Maximum of 3 sections allowed');
            return;
        }
        
        const sectionNumber = this.additionalProfileFields.length + 1;
        const newFieldId = `section${sectionNumber}`;
        const newField = {
            id: newFieldId,
            displayName: `Section ${sectionNumber}`,
            apiName: `Section${sectionNumber}__c`,
            fieldCount: 2,
            isVisible: true,
            hasFieldCountError: false,
            fieldCountErrorMessage: '',
            get visibilityMenuLabel() {
                return this.isVisible ? 'Set as Invisible' : 'Set as Visible';
            }
        };
        this.additionalProfileFields = [...this.additionalProfileFields, newField];
        
        // Also add a new section to the unified profile card
        this.addNewSectionToProfileCard(newFieldId, `Section ${sectionNumber}`);
        
        console.log('Added new section:', newField);
    }

    addNewSectionToProfileCard(sectionId, sectionName) {
        // Add new section data to profileConfig for display in unified profile card
        const newSection = {
            id: sectionId,
            name: sectionName,
            fields: []
        };
        
        // Add to additional sections array (create if doesn't exist)
        if (!this.profileConfig.additionalSections) {
            this.profileConfig.additionalSections = [];
        }
        this.profileConfig.additionalSections = [...this.profileConfig.additionalSections, newSection];
        
        // Set the initial field count (default is 2 fields)
        this.updateSectionFieldsInProfileCard(sectionId, 2);
        
        console.log('Added new section to profile card:', sectionId);
    }

    removeSectionFromProfileCard(sectionId) {
        // Remove section from unified profile card
        if (this.profileConfig.additionalSections) {
            this.profileConfig.additionalSections = this.profileConfig.additionalSections.filter(
                section => section.id !== sectionId
            );
            console.log('Removed section from profile card:', sectionId);
        }
    }

    handleEditField(event) {
        const fieldId = event.currentTarget.dataset.fieldId;
        console.log('Edit field clicked for field ID:', fieldId);
        // TODO: Implement inline editing for Prototype 3
    }

    handleRemoveField(event) {
        const fieldId = event.currentTarget.dataset.fieldId;
        console.log('handleRemoveField called for:', fieldId);
        
        // Prevent deletion of Section 1 (section1)
        if (fieldId === 'section1') {
            console.log('*** DELETE ACTION BLOCKED FOR SECTION 1 in handleRemoveField ***');
            return;
        }
        
        console.log('Removing section:', fieldId);
        
        // Remove from additionalProfileFields
        this.additionalProfileFields = this.additionalProfileFields.filter(
            field => field.id !== fieldId
        );
        
        // Remove from profileConfig.additionalFields (Unified Profile Card)
        if (this.profileConfig.additionalFields) {
            this.profileConfig.additionalFields = this.profileConfig.additionalFields.filter(
                field => field.id !== fieldId
            );
        }
    }

    handleFieldCountChange(event) {
        const fieldId = event.currentTarget.dataset.fieldId;
        const newValue = parseInt(event.detail.value, 10);
        console.log('Changing field count for section:', fieldId, 'to:', newValue);
        
        // Ignore changes for Section 1
        if (fieldId === 'section1') {
            console.log('Ignoring field count change for Section 1');
            return;
        }
        
        // Validate the value is within bounds
        if (newValue >= 1 && newValue <= 5) {
            // Clear any existing error
            this.clearFieldCountError(fieldId);
            
            // Clear custom validity
            event.target.setCustomValidity('');
            
            // Update the field count in the properties panel
            this.additionalProfileFields = this.additionalProfileFields.map(field => {
                if (field.id === fieldId) {
                    return { ...field, fieldCount: newValue, hasFieldCountError: false, fieldCountErrorMessage: '' };
                }
                return field;
            });
            
            // Update the corresponding section in the unified profile card
            this.updateSectionFieldsInProfileCard(fieldId, newValue);
        }
    }
    
    handleFieldCountBlur(event) {
        const fieldId = event.currentTarget.dataset.fieldId;
        const inputValue = event.target.value;
        const newValue = parseInt(inputValue, 10);
        
        console.log('Field count input lost focus for section:', fieldId, 'value:', inputValue);
        
        // Ignore changes for Section 1
        if (fieldId === 'section1') {
            console.log('Ignoring field count blur for Section 1');
            return;
        }
        
        // Handle empty or invalid input
        if (!inputValue || isNaN(newValue)) {
            console.log('Invalid or empty input, showing error and refocusing');
            this.showFieldCountError(fieldId, event.target);
            return;
        }
        
        // Validate the value is within bounds
        if (newValue >= 1 && newValue <= 5) {
            console.log('Valid field count on blur, updating unified profile card');
            
            // Clear any existing error
            this.clearFieldCountError(fieldId);
            
            // Update the field count in the properties panel
            this.additionalProfileFields = this.additionalProfileFields.map(field => {
                if (field.id === fieldId) {
                    return { ...field, fieldCount: newValue, hasFieldCountError: false, fieldCountErrorMessage: '' };
                }
                return field;
            });
            
            // Update the corresponding section in the unified profile card
            this.updateSectionFieldsInProfileCard(fieldId, newValue);
        } else {
            console.log('Invalid field count on blur:', newValue, 'showing error and refocusing');
            this.showFieldCountError(fieldId, event.target);
        }
    }
    
    showFieldCountError(fieldId, inputElement) {
        console.log('Showing error for field:', fieldId);
        
        // Update the field to show error state
        this.additionalProfileFields = this.additionalProfileFields.map(field => {
            if (field.id === fieldId) {
                return { 
                    ...field, 
                    hasFieldCountError: true, 
                    fieldCountErrorMessage: 'The number should within 1 to 5' 
                };
            }
            return field;
        });
        
        // Set custom validity and show error
        inputElement.setCustomValidity('The number should within 1 to 5');
        inputElement.reportValidity();
        
        // Refocus the input after a brief delay
        setTimeout(() => {
            inputElement.focus();
            inputElement.select(); // Select all text for easy correction
        }, 100);
    }
    
    clearFieldCountError(fieldId) {
        // Clear any existing error state
        this.additionalProfileFields = this.additionalProfileFields.map(field => {
            if (field.id === fieldId) {
                return { 
                    ...field, 
                    hasFieldCountError: false, 
                    fieldCountErrorMessage: '' 
                };
            }
            return field;
        });
    }
    
    updateSectionFieldsInProfileCard(sectionId, fieldCount) {
        console.log('Updating profile card section:', sectionId, 'to have', fieldCount, 'fields');
        
        if (sectionId === 'section1') {
            // Section 1 maps to the Contact Section (Email/Phone area)
            console.log('Updating Contact Section with', fieldCount, 'fields');
            
            // Update contactConfig to control the Contact Section display
            if (!this.contactConfig.additionalFields) {
                this.contactConfig.additionalFields = [];
            }
            
            // Generate the correct number of additional contact fields
            const newContactFields = [];
            for (let i = 1; i <= fieldCount; i++) {
                newContactFields.push({
                    id: `contact_field${i}`,
                    displayLabel: 'New Field',
                    fieldName: 'newField',
                    icon: 'utility:info',
                    displayName: 'New Field'
                });
            }
            
            this.contactConfig.additionalFields = newContactFields;
            console.log('Updated contact config:', this.contactConfig);
        } else {
            // Section 2+ maps to Additional Sections
            this.profileConfig.additionalSections = this.profileConfig.additionalSections.map(section => {
                if (section.id === sectionId) {
                    // Preserve existing fields and adjust the count
                    const existingFields = section.fields || [];
                    const currentCount = existingFields.length;
                    
                    if (fieldCount > currentCount) {
                        // Add new fields while preserving existing ones
                        const fieldsToAdd = fieldCount - currentCount;
                        const newFields = [...existingFields];
                        
                        for (let i = currentCount + 1; i <= fieldCount; i++) {
                            newFields.push({
                                id: `${sectionId}_field${i}`,
                                label: 'New Field',
                                value: 'New Field',
                                icon: '',
                                objectName: '',
                                fieldName: ''
                            });
                        }
                        
                        return {
                            ...section,
                            fields: newFields
                        };
                    } else if (fieldCount < currentCount) {
                        // Remove excess fields while preserving the first fieldCount fields
                        return {
                            ...section,
                            fields: existingFields.slice(0, fieldCount)
                        };
                    } else {
                        // Same count, no changes needed
                        return section;
                    }
                }
                return section;
            });
        }
        
        console.log('Updated profile card sections:', this.profileConfig.additionalSections);
        console.log('Updated contact config:', this.contactConfig);
    }

    // Field interaction handlers
    handleFieldHover(event) {
        const fieldElement = event.currentTarget;
        console.log('Field hover:', fieldElement.dataset.fieldId);
    }

    handleFieldHoverOut(event) {
        const fieldElement = event.currentTarget;
        console.log('Field hover out:', fieldElement.dataset.fieldId);
    }

    handleFieldClick(event) {
        // Prevent event bubbling to card
        event.stopPropagation();
        
        const fieldId = event.currentTarget.dataset.fieldId;
        const sectionId = event.currentTarget.dataset.sectionId;
        
        console.log('Field clicked:', fieldId, 'in section:', sectionId);
        
        // Set field configuration mode and hide card selection
        this.selectedFieldId = fieldId;
        this.selectedSectionId = sectionId;
        this.isFieldConfigMode = true;
        this.isCardSelected = false; // Hide card selection border
        this.editingFieldId = fieldId; // Set for Prototype 2 compatibility
        
        console.log('Field clicked - isCardSelected set to:', this.isCardSelected);
        console.log('Selection border class should be:', this.selectionBorderClass);
        
        // Find the field data
        const section = this.profileConfig.additionalSections.find(s => s.id === sectionId);
        const field = section ? section.fields.find(f => f.id === fieldId) : null;
        
        if (field) {
            // Load current field data into configuration
            this.fieldConfigData = {
                fieldName: field.fieldName || '',
                displayLabel: field.label || 'New Field',
                icon: field.icon || 'utility:info',
                fieldType: field.fieldType || 'text'
            };
            
            // Load Prototype 2 style config data
            this.configObjectName = field.objectName || '';
            this.configFieldName = field.fieldName || '';
            this.configDisplayLabel = field.label || 'New Field';
            this.configIcon = field.icon || '';
            
            // Populate field name options based on object name
            if (this.configObjectName && this.objectFieldMappings[this.configObjectName]) {
                this.fieldNameOptions = [...this.objectFieldMappings[this.configObjectName]];
            } else {
                this.fieldNameOptions = [];
            }
            
            console.log('Loaded field config data:', this.fieldConfigData);
        } else {
            // Clear config data for new field
            this.configObjectName = '';
            this.configFieldName = '';
            this.configDisplayLabel = '';
            this.configIcon = '';
            this.fieldNameOptions = [];
        }
        
        // Update CSS classes for visual feedback
        this.updateFieldSelection();
    }

    updateFieldSelection() {
        // Remove previous selection
        const previousSelected = this.template.querySelectorAll('.field-configurable.selected');
        previousSelected.forEach(el => el.classList.remove('selected'));
        
        // Add selection to current field
        if (this.selectedFieldId) {
            const selectedField = this.template.querySelector(`[data-field-id="${this.selectedFieldId}"]`);
            if (selectedField) {
                selectedField.classList.add('selected');
            }
        }
    }

    // Handle card click to return focus to card level
    handleCardClick(event) {
        // Only handle direct clicks on the card, not on fields
        if (event.target.closest('.field-configurable')) {
            return; // Field was clicked, let field handler manage it
        }
        
        console.log('Card clicked - returning focus to card level');
        
        // Exit field configuration mode and return to card selection
        this.exitFieldConfigMode();
        this.isCardSelected = true; // Show card selection border
        
        console.log('Card clicked - isCardSelected set to:', this.isCardSelected);
    }

    // Exit field configuration mode
    exitFieldConfigMode() {
        this.isFieldConfigMode = false;
        this.selectedFieldId = '';
        this.selectedSectionId = '';
        this.fieldConfigData = {
            objectName: '',
            fieldName: '',
            displayLabel: '',
            icon: '',
            fieldType: 'text'
        };
        
        // Reset Prototype 2 style config data
        this.editingFieldId = '';
        this.configObjectName = '';
        this.configCalculatedInsightName = '';
        this.configFieldName = '';
        this.configDisplayLabel = '';
        this.configIcon = '';
        
        // Reset field name options
        this.fieldNameOptions = [];
        
        // Remove selection styling
        this.updateFieldSelection();
        
        // Return focus to card level
        this.isCardSelected = true;
    }

    // Field configuration form handlers
    handleObjectNameChange(event) {
        const selectedObject = event.target.value;
        this.fieldConfigData = {
            ...this.fieldConfigData,
            objectName: selectedObject,
            fieldName: '' // Reset field name when object changes
        };
        
        // Update field name options based on selected object
        this.updateFieldNameOptions(selectedObject);
    }

    updateFieldNameOptions(objectName) {
        // Mock field options based on object type
        const fieldOptionsByObject = {
            'Contact': [
                { label: 'First Name', value: 'FirstName' },
                { label: 'Last Name', value: 'LastName' },
                { label: 'Email', value: 'Email' },
                { label: 'Phone', value: 'Phone' },
                { label: 'Title', value: 'Title' }
            ],
            'Account': [
                { label: 'Account Name', value: 'Name' },
                { label: 'Industry', value: 'Industry' },
                { label: 'Revenue', value: 'AnnualRevenue' },
                { label: 'Website', value: 'Website' }
            ],
            'Lead': [
                { label: 'Lead Source', value: 'LeadSource' },
                { label: 'Status', value: 'Status' },
                { label: 'Company', value: 'Company' }
            ],
            'Opportunity': [
                { label: 'Stage', value: 'StageName' },
                { label: 'Amount', value: 'Amount' },
                { label: 'Close Date', value: 'CloseDate' }
            ],
            'Case': [
                { label: 'Subject', value: 'Subject' },
                { label: 'Status', value: 'Status' },
                { label: 'Priority', value: 'Priority' }
            ]
        };
        
        this.fieldNameOptions = fieldOptionsByObject[objectName] || [];
    }

    handleFieldNameChange(event) {
        this.fieldConfigData = {
            ...this.fieldConfigData,
            fieldName: event.target.value
        };
    }

    handleDisplayLabelChange(event) {
        this.fieldConfigData = {
            ...this.fieldConfigData,
            displayLabel: event.target.value
        };
    }

    handleFieldTypeChange(event) {
        this.fieldConfigData = {
            ...this.fieldConfigData,
            fieldType: event.detail.value
        };
    }

    handleFieldIconChange(event) {
        this.fieldConfigData = {
            ...this.fieldConfigData,
            icon: event.detail.value
        };
    }

    handleSaveFieldConfig() {
        console.log('Saving field configuration:', this.fieldConfigData);
        
        // Update the field in the section
        this.profileConfig.additionalSections = this.profileConfig.additionalSections.map(section => {
            if (section.id === this.selectedSectionId) {
                const updatedFields = section.fields.map(field => {
                    if (field.id === this.selectedFieldId) {
                        return {
                            ...field,
                            label: this.fieldConfigData.displayLabel || 'New Field',
                            value: this.fieldConfigData.displayLabel || 'New Field',
                            fieldName: this.fieldConfigData.fieldName,
                            fieldType: this.fieldConfigData.fieldType,
                            icon: this.fieldConfigData.icon
                        };
                    }
                    return field;
                });
                
                return {
                    ...section,
                    fields: updatedFields
                };
            }
            return section;
        });
        
        console.log('Updated field in unified profile card');
        
        // Exit field config mode
        this.exitFieldConfigMode();
    }

    handleSectionMenuSelect(event) {
        const fieldId = event.currentTarget.dataset.fieldId;
        const selectedValue = event.detail.value;
        console.log('=== SECTION MENU DEBUG ===');
        console.log('Section menu action:', selectedValue, 'for field:', fieldId);
        console.log('Event target:', event.currentTarget);
        console.log('Event detail:', event.detail);
        
        switch (selectedValue) {
            case 'invisible':
                console.log('Processing invisible action for:', fieldId);
                // Toggle visibility of the section
                this.additionalProfileFields = this.additionalProfileFields.map(field => {
                    if (field.id === fieldId) {
                        return { ...field, isVisible: !field.isVisible };
                    }
                    return field;
                });
                break;
                
            case 'delete':
                console.log('Processing delete action for:', fieldId);
                // Prevent deletion of Section 1 (section1)
                if (fieldId === 'section1') {
                    console.log('*** DELETE ACTION BLOCKED FOR SECTION 1 ***');
                    console.log('Returning early - no deletion will occur');
                    return;
                }
                
                console.log('Proceeding with deletion for:', fieldId);
                // Remove the section from the array
                this.additionalProfileFields = this.additionalProfileFields.filter(
                    field => field.id !== fieldId
                );
                
                // Also remove from unified profile card
                this.removeSectionFromProfileCard(fieldId);
                
                console.log('Deleted section:', fieldId);
                break;
                
            default:
                console.log('Unknown menu action:', selectedValue);
        }
        console.log('=== END SECTION MENU DEBUG ===');
    }

    // Prototype 2 style event handlers
    handleObjectNameConfigChange(event) {
        this.configObjectName = event.target.value;
        
        // Update field name options based on selected object
        if (event.target.value && this.objectFieldMappings[event.target.value]) {
            this.fieldNameOptions = [...this.objectFieldMappings[event.target.value]];
        } else {
            this.fieldNameOptions = [];
        }
        
        // Clear field name, display label, and icon when object changes
        this.configFieldName = '';
        this.configDisplayLabel = '';
        // Don't clear icon - let user keep their icon selection
        
        // Update the field in real-time
        this.updateFieldInProfileCard();
    }

    handleCalculatedInsightNameChange(event) {
        this.configCalculatedInsightName = event.target.value;
    }

    handleFieldNameConfigChange(event) {
        this.configFieldName = event.target.value;
        
        // Auto-populate Display Label when Field Name is selected
        if (event.target.value) {
            // Find the selected option to get the label
            const selectedOption = this.fieldNameOptionsToUse.find(option => option.value === event.target.value);
            if (selectedOption) {
                this.configDisplayLabel = selectedOption.label;
            }
        }
        
        // Update the field in real-time
        this.updateFieldInProfileCard();
    }

    handleDisplayLabelConfigChange(event) {
        this.configDisplayLabel = event.target.value;
        
        // Update the field in real-time
        this.updateFieldInProfileCard();
    }

    handleIconConfigChange(event) {
        this.configIcon = event.target.value;
        
        // Update the field in real-time
        this.updateFieldInProfileCard();
    }

    // Update the field in the profile card in real-time
    updateFieldInProfileCard() {
        if (!this.selectedFieldId || !this.selectedSectionId) {
            return;
        }

        // Update the field in the section
        this.profileConfig.additionalSections = this.profileConfig.additionalSections.map(section => {
            if (section.id === this.selectedSectionId) {
                const updatedFields = section.fields.map(field => {
                    if (field.id === this.selectedFieldId) {
                        return {
                            ...field,
                            objectName: this.configObjectName || field.objectName || '',
                            fieldName: this.configFieldName || field.fieldName || '',
                            label: this.configDisplayLabel || field.label || 'New Field',
                            value: this.configDisplayLabel || field.value || 'New Field',
                            icon: this.configIcon || field.icon || ''
                        };
                    }
                    return field;
                });
                
                return {
                    ...section,
                    fields: updatedFields
                };
            }
            return section;
        });

        console.log('Updated field in profile card:', {
            fieldId: this.selectedFieldId,
            sectionId: this.selectedSectionId,
            objectName: this.configObjectName,
            fieldName: this.configFieldName,
            displayLabel: this.configDisplayLabel,
            icon: this.configIcon
        });
    }
}
