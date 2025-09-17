// Define actions for different buttons
const actions = {
  hideDaznSidebar: function() {
    const sidebar = document.querySelector('[class^="main__player-aside"]');
    if (sidebar) {
      sidebar.remove();
    }
  },
  hideSkinSidebarPlugin: function() {
    // Try multiple selector approaches
    const selectors = [
      '[class*="skin-sidebar-plugin"]',
      '[id*="skin-sidebar-plugin"]',
      '.skin-sidebar-plugin',
      '#skin-sidebar-plugin'
    ];
    
    let found = false;
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      console.log(`Found ${elements.length} elements with selector: ${selector}`);
      elements.forEach(element => {
        console.log('Removing element:', element);
        element.remove();
        found = true;
      });
    });
    
    if (!found) {
      console.log('No elements found with skin-sidebar-plugin in class or id');
      // Let's also log all elements to help debug
      const allElements = document.querySelectorAll('*');
      console.log('Total elements on page:', allElements.length);
    }
  }
  // Add more actions here as needed
};

// Add click listeners to all buttons
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button[data-action]');
  
  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const actionName = button.getAttribute('data-action');
      
      if (actions[actionName]) {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          function: actions[actionName]
        });
      }
    });
  });
});