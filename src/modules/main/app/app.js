import { LightningElement, track } from 'lwc';

export default class HelloWorldApp extends LightningElement {
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
    
    // Accordion state - Customize Sections open by default
    @track activeAccordionSection = 'customizeSections';
    
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

    // Prototype switcher getters - Prototype 1 is always active
    get prototype1TabClass() {
        return 'prototype-tab active';
    }

    get prototype2TabClass() {
        return 'prototype-tab';
    }

    get prototype3TabClass() {
        return 'prototype-tab';
    }

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
        console.log('Staying on Prototype 1');
        // Already on Prototype 1, no action needed
    }

    handlePrototype2Click() {
        console.log('Navigating to Prototype 2');
        // Navigate to the separate app2 component
        window.location.href = window.location.origin + '/app2';
    }

    handlePrototype3Click() {
        console.log('Navigating to Prototype 3');
        window.location.href = window.location.origin + '/app3';
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
}
