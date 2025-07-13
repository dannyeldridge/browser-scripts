// Define actions for different buttons
const actions = {
  hideDaznSidebar: function() {
    const sidebar = document.querySelector('[class^="main__player-aside"]');
    if (sidebar) {
      sidebar.remove();
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